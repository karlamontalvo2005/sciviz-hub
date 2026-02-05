"use client";
import { useState } from "react";

export default function HeroSection({
  onSearch,
}: {
  onSearch: (q: string) => void;
}) {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/images/esmeraldas-hero.jpg')" }}
      />

      {/* Capa azul */}
      <div className="absolute inset-0 bg-[#004B85]/80 z-10 mix-blend-multiply" />

      {/* Contenido */}
      <div className="relative z-20 text-center text-white px-4 max-w-4xl">
        <p className="uppercase tracking-widest text-sm mb-4 font-bold text-white/70">
          Pontificia Universidad Católica del Ecuador
        </p>

        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
          Repositorio Académico
          <br />
          <span className="text-white/90">Sede Esmeraldas</span>
        </h1>

        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Accede a tesis, artículos científicos y publicaciones académicas
        </p>

        {/* Buscador */}
        <div className="flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-lg shadow-2xl max-w-2xl mx-auto">
          <input
            className="flex-1 px-4 py-3 text-black outline-none rounded-md"
            placeholder="Buscar tesis, artículos, autores..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-[#004B85] px-8 py-3 font-medium rounded-md hover:bg-[#003865] transition-colors"
          >
            Buscar
          </button>
        </div>

        {/* Búsquedas populares */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <span className="text-white/60 text-base">
            Búsquedas populares:
          </span>

          {["Ingeniería", "Educación", "Enfermería", "Comercio"].map(
            (term) => (
              <button
                key={term}
                type="button"
                onClick={() => {
                  setValue(term);
                  onSearch(term);
                }}
                className="text-white/80 text-base hover:text-white underline underline-offset-2 transition-colors"
              >
                {term}
              </button>
            )
          )}
        </div>
      </div>

      {/* Fade inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
}
