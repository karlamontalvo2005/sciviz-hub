import requests
import mysql.connector
from datetime import datetime, date
import time
import re

# =========================
# CONFIGURACIÓN
# =========================

API_URL = "https://repositorio.puce.edu.ec/server/api/discover/search/objects"
TIMEOUT = 60
MAX_REINTENTOS = 3
PAGE_SIZE = 20

headers = {
    "Accept": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

# =========================
# FUENTES
# =========================

FUENTES = [
    ("Administración de Empresas", "Tesis - Escuela de Administración de Empresas", "22dd6bed-b507-4da3-9acd-bf72980f021d"),
    ("Agroindustria", "Tesis - Escuela de Agroindustria", "57056c2e-eb15-40df-aa2b-302b29db6309"),
    ("Ciencias de la Educación", "Tesis - Escuela de Ciencias de la Educación", "d228b244-9f15-4261-9965-5f762e6de421"),
    ("Comercio Exterior", "Tesis - Escuela de Comercio Exterior", "363522f9-577b-4066-90c0-ebec3cfe7230"),
    ("Contabilidad y Auditoría", "Tesis - Escuela de Contabilidad y Auditoría", "f297c392-d1fe-4938-93b1-d28b9835b91f"),
    ("Derecho", "Tesis - Escuela de Derecho", "31aabde6-d3be-4f40-a072-1e6a5bf4672a"),
    ("Diseño Gráfico", "Tesis - Escuela de Diseño Gráfico", "61fd7370-93b6-4169-9515-52dee34578d1"),
    ("Enfermería", "Tesis - Escuela de Enfermería", "9da92c0f-c70f-4739-a3b7-850b77458c90"),
    ("Gestión Ambiental", "Tesis - Escuela de Gestión Ambiental", "52e4d591-eba8-488b-bfdc-576a404214d6"),
    ("Hotelería y Turismo", "Tesis - Escuela de Hotelería y Turismo", "e0e2819b-88e0-4533-b737-6814edbdedb9"),
    ("Laboratorio Clínico", "Tesis - Escuela de Laboratorio Clínico", "746111b3-44a2-4abd-b7c1-8097b928ed14"),
    ("Lingüística", "Tesis - Escuela de Lingüística", "853fbcec-c97d-44cf-95a8-f5f6632777d3"),
    ("Recursos Naturales Renovables", "Tesis - Escuela de Recursos Naturales Renovables", "69d6a7ef-f9e2-499e-bf98-0d04e01917e6"),
    ("Sistemas y Computación", "Tesis - Escuela de Sistemas y Computación", "1d274605-45f7-4f57-864a-417d4dba587c"),
    ("Libros y Revistas", "Documentos Digitales", "04fd3c53-c8d3-4234-9296-1b23dbf5aa35"),
    ("Maestría Gestión del Talento Humano", "Documentos Digitales", "c54e355f-cfa8-49f4-ae79-d88a5d78d3bb"),
    ("Memorias Académicas", "Memoria de Eventos Académicos", "64313145-f62f-455f-892b-d5fd12bcf0ad"),
    ("Posgrado", "Tesis de Maestría Innovación en Educación", "daae9225-7ae1-4719-b51d-aebccafb959b"),
]

# =========================
# MYSQL (CONFIGURACIÓN NUBE)
# =========================

conexion = mysql.connector.connect(
    host="gateway01.us-east-1.prod.aws.tidbcloud.com", #
    user="iXqaGH5LJokAQBN.root",                      #
    password="yKXU8NU0cRibwSWq",                      #
    database="test",                                  #
    port=4000,                                        #
    ssl_disabled=False                                # Solución SSL
)

cursor = conexion.cursor()

# --- PASO CRÍTICO: CREAR TABLA SI NO EXISTE ---
# Esto evita el error "Table doesn't exist"
cursor.execute("""
CREATE TABLE IF NOT EXISTS documentos_esmeraldas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo TEXT NOT NULL,
    autor TEXT,
    resumen LONGTEXT,
    palabras_clave TEXT,
    escuela VARCHAR(150),
    coleccion VARCHAR(150),
    fecha DATE,
    pdf_url TEXT,
    handle_url TEXT
)
""")
conexion.commit()

# Limpiamos la tabla antes de empezar la nueva cosecha
cursor.execute("TRUNCATE TABLE documentos_esmeraldas")
conexion.commit()

sql_insert = """
INSERT INTO documentos_esmeraldas
(titulo, autor, resumen, palabras_clave, escuela, coleccion, fecha, pdf_url, handle_url)
VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
"""

# =========================
# FUNCIONES
# =========================

def meta(md, campo):
    if campo in md and md[campo]:
        return md[campo][0]["value"].strip()
    return ""

def obtener_fecha(md):
    for campo in ["dc.date.issued", "dc.date.created", "dc.date.available", "dc.date"]:
        valor = meta(md, campo)
        if re.match(r"^\d{4}-\d{2}-\d{2}", valor):
            return datetime.strptime(valor[:10], "%Y-%m-%d").date()
        if re.match(r"^\d{4}$", valor):
            return date(int(valor), 1, 1)
    return None

def request_seguro(url, params=None):
    for i in range(MAX_REINTENTOS):
        try:
            r = requests.get(url, headers=headers, params=params, timeout=TIMEOUT)
            if r.status_code == 200:
                return r
            elif r.status_code == 404:
                return None
            elif r.status_code == 429:
                time.sleep(5)
        except:
            time.sleep(2)
    return None

def obtener_pdf(item):
    try:
        url_bundles = item.get("_links", {}).get("bundles", {}).get("href")
        if not url_bundles:
            uuid = item.get("uuid")
            url_bundles = f"https://repositorio.puce.edu.ec/server/api/core/items/{uuid}/bundles"

        r = request_seguro(url_bundles)
        if not r: return ""

        bundles = r.json().get("_embedded", {}).get("bundles", [])
        url_bitstreams = ""
        for b in bundles:
            if b.get("name") == "ORIGINAL":
                url_bitstreams = b.get("_links", {}).get("bitstreams", {}).get("href")
                break
        
        if not url_bitstreams: return ""

        r_bits = request_seguro(url_bitstreams)
        if not r_bits: return ""

        bitstreams = r_bits.json().get("_embedded", {}).get("bitstreams", [])

        for bit in bitstreams:
            nombre = bit.get("name", "").lower()
            if nombre.endswith(".pdf"):
                href = bit.get("_links", {}).get("content", {}).get("href", "")
                return href if href.startswith("http") else "https://repositorio.puce.edu.ec" + href

    except Exception as e:
        print(f" [!] Error buscando PDF: {e}")
    return ""

# =========================
# INICIO COSECHA
# =========================

insertados = 0
sin_pdf = 0

print("--- INICIANDO COSECHA EN LA NUBE ---")

for grupo, coleccion, uuid in FUENTES:
    print(f"\n📚 {grupo}")
    page = 0

    while True:
        r = request_seguro(API_URL, {"scope": uuid, "page": page, "size": PAGE_SIZE})
        if not r: break

        try:
            objetos = r.json().get("_embedded", {}).get("searchResult", {}).get("_embedded", {}).get("objects", [])
        except:
            break

        if not objetos: break

        for obj in objetos:
            try:
                item = obj["_embedded"]["indexableObject"]
                if item.get("type", "").lower() != "item": continue 

                md = item.get("metadata", {})
                titulo = meta(md, "dc.title")
                autor = meta(md, "dc.contributor.author")
                fecha = obtener_fecha(md)

                if not titulo or not autor or not fecha: continue

                pdf_url = obtener_pdf(item)
                if not pdf_url: sin_pdf += 1

                cursor.execute(sql_insert, (
                    titulo, autor, meta(md, "dc.description.abstract"),
                    meta(md, "dc.subject"), grupo, coleccion, fecha,
                    pdf_url,
                    f"https://repositorio.puce.edu.ec/handle/{item['handle']}"
                ))

                insertados += 1
                if insertados % 10 == 0:
                    conexion.commit()
                    print(f" ✅ {insertados} documentos guardados...", end="\r")

            except Exception:
                continue
        page += 1

conexion.commit()
cursor.close()
conexion.close()

print(f"\n\n🎉 ¡COSECHA FINALIZADA! Total: {insertados} registros guardados en TiDB Cloud.")