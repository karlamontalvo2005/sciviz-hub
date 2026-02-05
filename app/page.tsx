"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import HeroSection from "@/components/hero-section";
import SearchResults from "@/components/search-results";
import SiteFooter from "@/components/site-footer";
import DisciplinesSection from "@/components/disciplines-section";
import PublicationsGrid from "@/components/publications-grid";
import StatsBanner from "@/components/stats-banner";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryFromUrl = searchParams.get("q");

  // CORRECCIÓN CRÍTICA:
  // Inicializamos el estado BASÁNDONOS EN LA URL DIRECTAMENTE.
  // Si hay 'q' en la URL, hasSearched nace como 'true'.
  // Esto evita que se muestre el Hero por error.
  const [hasSearched, setHasSearched] = useState(!!queryFromUrl);
  const [currentQuery, setCurrentQuery] = useState(queryFromUrl || "");
  const [resultados, setResultados] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Efecto: Detecta cambios en la URL (incluyendo al volver atrás)
  useEffect(() => {
    if (queryFromUrl) {
      setHasSearched(true);
      setCurrentQuery(queryFromUrl);
      fetchResultados(queryFromUrl);
    } else {
      setHasSearched(false);
      setCurrentQuery("");
      setResultados([]);
    }
  }, [queryFromUrl]);

  const fetchResultados = async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/documentos?q=${query}`);
      const data = await res.json();
      setResultados(data);
    } catch (error) {
      console.error("Error buscando:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    if (!query) return;
    // Al buscar, cambiamos la URL. El useEffect de arriba se encargará del resto.
    router.push(`/?q=${encodeURIComponent(query)}`);
  };

  const handleClearSearch = () => {
    router.push("/"); // Esto limpiará la URL y el useEffect reseteará el estado
  };

  // VISTA DE RESULTADOS (Si hay búsqueda en URL o estado activo)
  if (hasSearched) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header de Resultados */}
        <div className="pt-24 pb-12 bg-[#004B85] shadow-md">
          <div className="container mx-auto px-4 md:px-8">
            <button
              type="button"
              onClick={handleClearSearch}
              className="text-white/80 hover:text-white text-sm mb-4 underline underline-offset-2 cursor-pointer"
            >
              ← Volver al inicio
            </button>

            <h1 className="text-3xl font-serif font-bold text-white">
              Resultados para{" "}
              <span className="font-sans font-normal text-white/90">
                "{currentQuery}"
              </span>
            </h1>

            <p className="text-white/70 mt-2 text-sm">
              {loading ? "Buscando..." : `Se encontraron ${resultados.length} documentos`}
            </p>
          </div>
        </div>

        {/* Lista de Resultados */}
        <main className="container mx-auto px-4 md:px-8 py-10 flex-grow">
          {loading ? (
             <div className="text-center py-20 text-gray-500">Cargando resultados...</div>
          ) : (
             <SearchResults resultados={resultados} />
          )}
        </main>

        <SiteFooter />
      </div>
    );
  }

  // VISTA INICIAL (HERO)
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Pasamos handleSearch para que actualice la URL */}
      <HeroSection onSearch={handleSearch} />

      <StatsBanner />

      <main className="container mx-auto px-4 md:px-8 py-16 space-y-1">
        <DisciplinesSection filter="" />
        <PublicationsGrid />
      </main>

      <SiteFooter />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SearchPageContent />
    </Suspense>
  );
}