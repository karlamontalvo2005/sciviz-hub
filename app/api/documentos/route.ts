import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";

    // CONSULTA SIN FILTROS ESTRICTOS
    const [rows] = await db.query(
      `
      SELECT 
        id,
        titulo,
        autor AS autores,          
        YEAR(fecha) AS anio,
        pdf_url AS link_pdf,       
        escuela AS materia,
        coleccion,                
        handle_url                 
      FROM documentos_esmeraldas
      WHERE 
        titulo LIKE ? 
        OR autor LIKE ?
        OR resumen LIKE ?
      ORDER BY fecha DESC
      LIMIT 50
      `,
      [`%${q}%`, `%${q}%`, `%${q}%`]
    );

    // ESTO NOS DIRÁ EN LOS LOGS CUÁNTOS DATOS ENCONTRÓ
    console.log(`✅ Búsqueda ejecutada. Resultados encontrados: ${Array.isArray(rows) ? rows.length : 0}`);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("❌ Error al consultar documentos:", error);
    return NextResponse.json(
      { error: "Error al consultar documentos" },
      { status: 500 }
    );
  }
}