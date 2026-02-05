"use client";

import { useEffect, useState } from "react";

type Documento = {
  id: number;
  titulo: string;
  autores: string;
  anio: number;
  link_pdf: string;
  tipo_documento: string;
};

export default function SearchResults() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/documentos")
      .then((res) => res.json())
      .then((data) => {
        setDocumentos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando documentos", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Cargando documentos…</p>;
  }

  return (
    <section className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-semibold mb-6">
        Resultados del Repositorio
      </h2>

      <ul className="space-y-4">
        {documentos.map((doc) => (
          <li
            key={doc.id}
            className="p-4 rounded-lg border bg-white shadow-sm"
          >
            <h3 className="font-medium text-lg">{doc.titulo}</h3>
            <p className="text-sm text-zinc-600">
              {doc.autores} · {doc.anio}
            </p>

            <a
              href={doc.link_pdf}
              target="_blank"
              className="text-sm text-blue-600 hover:underline"
            >
              Ver documento
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
