"use client";

import { useMemo } from "react";
import Link from "next/link"; // Importamos Link para la navegación
import {
  Stethoscope, // 1. Enfermería
  Cpu,         // 2. Sistemas
  Scale,       // 3. Derecho
  FlaskConical,// 4. Laboratorio Clínico
  Building2,   // 5. Administración
  BookOpen,    // 6. Lingüística
} from "lucide-react";

// Configuramos tus 6 escuelas exactas con los números actualizados
const disciplines = [
  { 
    name: "Enfermería", 
    icon: Stethoscope, 
    articles: 569, // Número actualizado
    keywords: ["enfermeria", "salud", "cuidados", "pacientes"] 
  },
  { 
    name: "Sistemas y Computación", 
    icon: Cpu, 
    articles: 207, // Número actualizado
    keywords: ["sistemas", "software", "programacion", "tecnologia"] 
  },
  { 
    name: "Derecho", 
    icon: Scale, 
    articles: 21, // Número actualizado
    keywords: ["derecho", "leyes", "juridico", "abogacia"] 
  },
  { 
    name: "Laboratorio Clínico", 
    icon: FlaskConical, 
    articles: 62, // Número actualizado
    keywords: ["laboratorio", "analisis", "clinico", "biologia"] 
  },
  { 
    name: "Administración de Empresas", 
    icon: Building2, 
    articles: 246, // Número actualizado
    keywords: ["administracion", "empresas", "negocios", "gestion"] 
  },
  { 
    name: "Lingüística", 
    icon: BookOpen, 
    articles: 84, // Número actualizado
    keywords: ["linguistica", "idiomas", "lenguas", "comunicacion"] 
  },
];

interface DisciplinesSectionProps {
  filter?: string;
}

export default function DisciplinesSection({ filter = "" }: DisciplinesSectionProps) {

  const filteredDisciplines = useMemo(() => {
    if (!filter.trim()) return disciplines;
    const query = filter.toLowerCase();
    return disciplines.filter(
      (d) =>
        d.name.toLowerCase().includes(query) ||
        d.keywords.some((k) => k.includes(query))
    );
  }, [filter]);

  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Explorar por Escuela / Carrera
      </h2>

      {filteredDisciplines.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          No se encontraron escuelas para &quot;{filter}&quot;
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {filteredDisciplines.map((discipline) => {
            const Icon = discipline.icon;
            
            return (
              /* Usamos Link: Al hacer clic, enviamos el nombre de la escuela al buscador automáticamente */
              <Link
                key={discipline.name}
                href={`/?q=${encodeURIComponent(discipline.name)}`}
                className="flex flex-col items-center gap-3 p-5 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-300 text-center group cursor-pointer no-underline"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground leading-tight">
                    {discipline.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {discipline.articles.toLocaleString("es-ES")} artículos
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}