"use client";

import { useState, useMemo, useEffect } from "react";
import { FileText, Check, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/badge";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; 

interface Documento {
  id: number;
  titulo: string;
  autores: string;
  anio: number;
  link_pdf: string;
  materia: string; 
  coleccion?: string; 
}

const YEARS = [2026, 2025, 2024, 2023, 2022];
const SCHOOLS = [
  "Enfermería", "Sistemas y Computación", "Administración de Empresas",
  "Diseño Gráfico", "Comercio Exterior", "Contabilidad y Auditoría",
  "Ciencias de la Educación", "Gestión Ambiental", "Hotelería y Turismo", "Derecho"
];
const TYPES = ["Tesis", "Artículo", "Libro", "Maestría"];
const ITEMS_PER_PAGE = 10; 

export default function SearchResults({ resultados }: { resultados: Documento[] }) {
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") || ""; 

  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showAllSchools, setShowAllSchools] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const normalize = (str: string) => str ? str.toLowerCase().trim() : "";

  // FILTRADO CON PROTECCIÓN CONTRA TYPEERROR
  const filteredResults = useMemo(() => {
    // Si 'resultados' no es un array (por un error de API o BD), devolvemos lista vacía
    if (!Array.isArray(resultados)) {
      return [];
    }

    return resultados.filter((doc) => {
      const yearMatch = selectedYears.length === 0 || 
        (selectedYears.includes(doc.anio) || (selectedYears.includes(-1) && doc.anio < 2022));
      const schoolMatch = selectedSchools.length === 0 || 
        selectedSchools.some(s => normalize(doc.materia).includes(normalize(s)));
      const col = normalize(doc.coleccion || "");
      const typeMatch = selectedTypes.length === 0 || selectedTypes.some(t => {
            if(t === "Tesis") return col.includes("tesis") && !col.includes("maestría");
            if(t === "Maestría") return col.includes("maestría") || col.includes("posgrado");
            if(t === "Artículo") return col.includes("artículo") || col.includes("revista");
            if(t === "Libro") return col.includes("libro") || col.includes("digital");
            return false;
        });
      return yearMatch && schoolMatch && typeMatch;
    });
  }, [resultados, selectedYears, selectedSchools, selectedTypes]);

  // PAGINACIÓN
  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentResults = filteredResults.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => { setCurrentPage(1); }, [selectedYears, selectedSchools, selectedTypes]);
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleYear = (year: number) => setSelectedYears(prev => prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]);
  const toggleSchool = (school: string) => setSelectedSchools(prev => prev.includes(school) ? prev.filter(s => s !== school) : [...prev, school]);
  const toggleType = (type: string) => setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);

  // Pantalla de carga o sin resultados
  if (!Array.isArray(resultados) || resultados.length === 0) {
    return <div className="text-center p-10 text-muted-foreground">No se encontraron resultados o hubo un problema con la conexión.</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside className="lg:col-span-1 space-y-6">
        <div className="border-b pb-4">
          <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Año de Publicación</h3>
          <div className="space-y-2">
            {YEARS.map(year => (
              <label key={year} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedYears.includes(year) ? "bg-blue-900 border-blue-900" : "border-gray-300 group-hover:border-blue-500"}`}>
                   {selectedYears.includes(year) && <Check className="w-3 h-3 text-white" />}
                </div>
                <input type="checkbox" className="hidden" onChange={() => toggleYear(year)} />
                <span className="text-sm text-gray-600 group-hover:text-blue-900">{year}</span>
              </label>
            ))}
             <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedYears.includes(-1) ? "bg-blue-900 border-blue-900" : "border-gray-300 group-hover:border-blue-500"}`}>
                   {selectedYears.includes(-1) && <Check className="w-3 h-3 text-white" />}
                </div>
                <input type="checkbox" className="hidden" onChange={() => toggleYear(-1)} />
                <span className="text-sm text-gray-600 group-hover:text-blue-900">Archivo Histórico</span>
            </label>
          </div>
        </div>
        
        <div className="border-b pb-4">
          <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Carrera / Facultad</h3>
          <div className="space-y-2">
            {SCHOOLS.slice(0, showAllSchools ? SCHOOLS.length : 5).map(school => (
              <label key={school} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedSchools.includes(school) ? "bg-blue-900 border-blue-900" : "border-gray-300 group-hover:border-blue-500"}`}>
                   {selectedSchools.includes(school) && <Check className="w-3 h-3 text-white" />}
                </div>
                <input type="checkbox" className="hidden" onChange={() => toggleSchool(school)} />
                <span className="text-sm text-gray-600 group-hover:text-blue-900">{school}</span>
              </label>
            ))}
          </div>
          <button onClick={() => setShowAllSchools(!showAllSchools)} className="text-xs text-blue-600 font-semibold mt-3 flex items-center hover:underline">
            {showAllSchools ? (<>Ver menos <ChevronUp className="w-3 h-3 ml-1" /></>) : (<>Ver más carreras <ChevronDown className="w-3 h-3 ml-1" /></>)}
          </button>
        </div>

         <div>
          <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Tipo de Documento</h3>
          <div className="space-y-2">
            {TYPES.map(type => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedTypes.includes(type) ? "bg-blue-900 border-blue-900" : "border-gray-300 group-hover:border-blue-500"}`}>
                   {selectedTypes.includes(type) && <Check className="w-3 h-3 text-white" />}
                </div>
                <input type="checkbox" className="hidden" onChange={() => toggleType(type)} />
                <span className="text-sm text-gray-600 group-hover:text-blue-900">{type}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      <main className="lg:col-span-3">
        <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Mostrando <span className="font-bold text-gray-900">{filteredResults.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredResults.length)}</span> de <span className="font-bold text-gray-900">{filteredResults.length}</span> resultados
            </p>
        </div>

        <div className="space-y-4">
            {currentResults.map((doc) => (
            <Card key={doc.id} className="hover:border-blue-300 hover:shadow-md transition-all border-gray-200">
                <CardContent className="p-5">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2 flex-1">
                        <Badge variant="secondary" className="mb-1">{doc.materia}</Badge>
                        <Link 
                          href={`/documento/${doc.id}?q=${encodeURIComponent(currentQuery)}`} 
                          className="block group"
                        >
                          <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-[#004B85] group-hover:underline cursor-pointer transition-colors">
                            {doc.titulo}
                          </h3>
                        </Link>
                        <div className="text-sm text-gray-500"><span className="font-medium text-gray-700">{doc.autores}</span> • {doc.anio}</div>
                    </div>
                    <div className="flex items-start">
                        <Button variant="outline" size="sm" className="text-blue-700 border-blue-200 hover:bg-blue-50 hover:text-blue-800" onClick={() => window.open(doc.link_pdf, "_blank")}>
                            <FileText className="w-4 h-4 mr-2" />PDF
                        </Button>
                    </div>
                </div>
                </CardContent>
            </Card>
            ))}
            
            {filteredResults.length === 0 && (
                <div className="text-center py-10 border-2 border-dashed rounded-lg bg-gray-50">
                    <p className="text-gray-500">No hay documentos que coincidan con estos filtros.</p>
                    <Button variant="link" onClick={() => { setSelectedYears([]); setSelectedSchools([]); setSelectedTypes([]); }}>Limpiar filtros</Button>
                </div>
            )}
             {filteredResults.length > ITEMS_PER_PAGE && (
              <div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t">
                <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center gap-1">
                  <ChevronLeft className="w-4 h-4" /> Anterior
                </Button>
                <span className="text-sm font-medium text-gray-600">Página {currentPage} de {totalPages}</span>
                <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center gap-1">
                  Siguiente <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
        </div>
      </main>
    </div>
  );
}