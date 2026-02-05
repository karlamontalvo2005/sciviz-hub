import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";

    // Agregamos 'coleccion' para poder filtrar por Tipo
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
        pdf_url IS NOT NULL 
        AND pdf_url != ''
        AND (
          titulo LIKE ? 
          OR autor LIKE ?
          OR resumen LIKE ?
        )
      ORDER BY fecha DESC
      LIMIT 50
      `,
      [`%${q}%`, `%${q}%`, `%${q}%`]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error al consultar documentos:", error);
    return NextResponse.json(
      { error: "Error al consultar documentos" },
      { status: 500 }
    );
  }
}