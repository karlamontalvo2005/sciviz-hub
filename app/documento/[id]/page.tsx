import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
// Mantenemos tu importación correcta del Badge
import { Badge } from "@/components/badge"; 
import { FileText, Calendar, User, BookOpen, Bookmark, University } from "lucide-react";
import SiteFooter from "@/components/site-footer"; 
import PageTransition from "@/components/page-transition"; 
import BackButton from "@/components/ui/back-button"; 
import { Metadata } from "next"; // <--- 1. Importamos Metadata

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// --- NUEVA FUNCIÓN PARA SEO Y TÍTULOS DE PESTAÑA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  // Consultamos solo los datos necesarios para la metadata
  const [rows] = await db.query<any[]>(
    `SELECT titulo, resumen FROM documentos_esmeraldas WHERE id = ?`,
    [id]
  );
  const doc = rows[0];

  if (!doc) {
    return { title: "Documento no encontrado" };
  }

  return {
    title: `${doc.titulo} | SciViz Hub`,
    description: doc.resumen ? doc.resumen.substring(0, 160) + "..." : "Repositorio Académico PUCE Esmeraldas",
  };
}
// ----------------------------------------------------

const formatearFecha = (fecha: Date) => {
  if (!fecha) return "Sin fecha";
  return new Date(fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default async function DocumentoPage({ params, searchParams }: Props) {
  const { id } = await params;
  
  // LEEMOS LO QUE ENVIÓ EL PASO 1
  const sp = await searchParams;
  const q = typeof sp.q === 'string' ? sp.q : undefined;

  const [rows] = await db.query<any[]>(
    `SELECT * FROM documentos_esmeraldas WHERE id = ?`,
    [id]
  );

  const doc = rows[0];

  if (!doc) {
    return notFound();
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-between">
        <div>
          <div className="bg-[#004B85] text-white pt-24 md:pt-32 pb-12 shadow-md">
            <div className="container mx-auto px-4 max-w-6xl">
              
              {/* Le entregamos el dato de búsqueda al botón */}
              <div className="mb-2">
                <BackButton searchQuery={q} />
              </div>
              
              <h1 className="text-2xl md:text-4xl font-bold leading-tight max-w-4xl">
                {doc.titulo}
              </h1>
            </div>
          </div>

          <div className="container mx-auto px-4 max-w-6xl -mt-8 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-24 h-32 bg-gray-50 border-2 border-dashed border-gray-200 rounded flex items-center justify-center mb-3">
                      <FileText className="w-10 h-10 text-gray-400" />
                    </div>
                    <span className="text-sm font-semibold text-gray-600">Documento PDF</span>
                  </div>
                  
                  <a href={doc.pdf_url} target="_blank" rel="noopener noreferrer" className="block w-full">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 text-md shadow-sm transition-all">
                      <FileText className="w-5 h-5 mr-2" />
                      Ver / Descargar
                    </Button>
                  </a>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-5">
                  <h3 className="font-bold text-gray-800 border-b pb-2 mb-2">Detalles del registro</h3>
                  
                  <div>
                    <h4 className="text-xs font-bold text-[#004B85] uppercase tracking-wide flex items-center gap-2 mb-1">
                      <Calendar className="w-3 h-3" /> Fecha de Publicación
                    </h4>
                    <p className="text-gray-700 text-sm">{formatearFecha(doc.fecha)}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#004B85] uppercase tracking-wide flex items-center gap-2 mb-1">
                      <BookOpen className="w-3 h-3" /> Colección / Tipo
                    </h4>
                    <p className="text-gray-700 text-sm">{doc.coleccion || "No especificado"}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#004B85] uppercase tracking-wide flex items-center gap-2 mb-1">
                      <Bookmark className="w-3 h-3" /> URI Permanente
                    </h4>
                    <a href={doc.handle_url} target="_blank" className="text-blue-600 text-xs break-all hover:underline">{doc.handle_url}</a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-8 bg-white p-8 rounded-lg shadow-sm border border-gray-100 mt-0 lg:mt-6">
                <section>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Autor(es)</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#004B85]"><User className="w-6 h-6" /></div>
                    <p className="text-xl font-medium text-gray-900">{doc.autor}</p>
                  </div>
                </section>
                <hr className="border-gray-100" />
                <section>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Facultad / Escuela</h3>
                  <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-3 rounded-md border border-gray-100 inline-flex">
                    <University className="w-4 h-4 text-[#004B85]" />
                    <span className="font-medium">{doc.escuela}</span>
                  </div>
                </section>
                <section>
                  <h3 className="text-lg font-bold text-[#004B85] mb-3 flex items-center gap-2">Resumen</h3>
                  <div className="prose max-w-none text-gray-600 leading-relaxed text-justify bg-gray-50/50 p-6 rounded-xl"><p>{doc.resumen}</p></div>
                </section>
                {doc.palabras_clave && (
                  <section>
                    <h3 className="text-sm font-bold text-gray-900 mb-3">Palabras Clave</h3>
                    <div className="flex flex-wrap gap-2">
                      {doc.palabras_clave.split(/;|:/).map((tag: string, i: number) => {
                        const cleanTag = tag.trim(); if (!cleanTag) return null;
                        return (<Badge key={i} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1 text-sm font-normal border border-blue-100">{cleanTag}</Badge>)
                      })}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
        <SiteFooter />
      </div>
    </PageTransition>
  );
}