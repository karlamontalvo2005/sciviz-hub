"use client";

import { TrendingUp, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const queries = [
  "Visualización de datos genómicos del cáncer",
  "Análisis de series temporales climáticas",
  "Modelado 3D de proteínas",
  "Datos de telescopios espaciales",
  "Simulaciones de física cuántica",
];

export default function SearchSuggestions() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-accent" />
          Búsquedas Populares
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-1">
          {queries.map((query, index) => (
            <button
              key={index} // mejor usar index para evitar conflictos de Next
              type="button"
              className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/50 transition-colors duration-200 text-left group"
            >
              <Search className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors flex-1">
                {query}
              </span>
              <span className="text-xs text-muted-foreground/50">
                {index + 1}
              </span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
