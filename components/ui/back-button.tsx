"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link"; // Usamos Link de Next.js

interface BackButtonProps {
  searchQuery?: string;
}

export default function BackButton({ searchQuery }: BackButtonProps) {
  
  // Si tenemos una búsqueda (ej: "estudiante"), creamos el link: /?q=estudiante
  // Esto te lleva OBLIGATORIAMENTE a la página de resultados.
  if (searchQuery) {
    return (
      <Link 
        href={`/?q=${encodeURIComponent(searchQuery)}`}
        className="inline-flex items-center text-sm text-white/80 hover:text-white mb-6 transition-colors font-medium cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver a resultados de "{searchQuery}"
      </Link>
    );
  }

  // Si no hay búsqueda (ej. entraste directo), te manda al inicio.
  return (
    <Link 
      href="/"
      className="inline-flex items-center text-sm text-white/80 hover:text-white mb-6 transition-colors font-medium cursor-pointer"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Volver al buscador
    </Link>
  );
}