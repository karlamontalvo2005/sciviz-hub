"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, User, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Documento {
  id: number;
  titulo: string;
  autores: string;
  anio: number;
  link_pdf: string;
  materia: string;
  coleccion?: string;
}

export default function PublicationsGrid() {
  const [docs, setDocs] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRandomDocs() {
      try {
        // 1. Traemos los documentos recientes (los mismos 50 o 100 que trae tu API)
        const res = await fetch("/api/documentos?q=");
        const data = await res.json();
        
        if (Array.isArray(data)) {
          // 2. ALGORITMO DE BARAJADO (Fisher-Yates Shuffle)
          // Esto mezcla el array de forma aleatoria instantáneamente
          const shuffled = [...data].sort(() => 0.5 - Math.random());

          // 3. Tomamos los primeros 6 después de barajar
          setDocs(shuffled.slice(0, 6));
        }
      } catch (error) {
        console.error("Error cargando destacados:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRandomDocs();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-background text-center">
        <p className="text-muted-foreground">Cargando publicaciones...</p>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Publicaciones Destacadas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explora una selección aleatoria de investigaciones y trabajos académicos de nuestra comunidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((doc) => (
            <Card
              key={doc.id}
              className="bg-card border-border hover:border-[#004B85]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
            >
              <CardContent className="p-6">
                {/* Tipo de documento */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#004B85]/10 text-[#004B85]">
                    {doc.coleccion || doc.materia || "Documento"}
                  </span>
                </div>

                {/* Título */}
                <Link href={`/documento/${doc.id}`} className="block">
                  <h3 className="font-semibold text-foreground text-lg leading-snug mb-4 group-hover:text-[#004B85] transition-colors line-clamp-2" title={doc.titulo}>
                    {doc.titulo}
                  </h3>
                </Link>

                {/* Autor y Año */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <User className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate" title={doc.autores}>
                        {doc.autores || "Autor desconocido"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{doc.anio}</span>
                  </div>
                </div>

                {/* Botón */}
                {doc.link_pdf ? (
                    <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 bg-transparent hover:bg-[#004B85] hover:text-white hover:border-[#004B85] transition-colors"
                    onClick={() => window.open(doc.link_pdf, "_blank")}
                    >
                    <FileText className="w-4 h-4" />
                    Ver PDF
                    </Button>
                ) : (
                    <Link href={`/documento/${doc.id}`} className="w-full">
                        <Button variant="outline" size="sm" className="w-full">
                            Ver Detalles
                        </Button>
                    </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/?q=">
            <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-[#004B85] text-[#004B85] hover:bg-[#004B85] hover:text-white"
            >
                Ver todas las publicaciones
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}