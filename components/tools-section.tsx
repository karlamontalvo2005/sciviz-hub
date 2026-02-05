"use client";

import { useMemo } from "react";
import { Box, Grid3X3, Network, LineChart, Globe, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tools = [
  { name: "Gráficos 3D interactivos", icon: Box, status: "popular", keywords: ["3d", "graficos", "interactivo"] },
  { name: "Mapas de calor personalizables", icon: Grid3X3, status: "new", keywords: ["mapas", "calor", "heatmap"] },
  { name: "Diagramas de red", icon: Network, status: null, keywords: ["red", "diagramas", "nodos", "conexiones"] },
  { name: "Visualizaciones de series temporales", icon: LineChart, status: "popular", keywords: ["series", "temporales", "tiempo", "lineas"] },
  { name: "Análisis geoespacial", icon: Globe, status: null, keywords: ["geo", "geoespacial", "mapas", "ubicacion"] },
  { name: "Visualización de datos multidimensionales", icon: Layers, status: "new", keywords: ["multidimensional", "capas", "dimensiones"] },
];

interface ToolsSectionProps {
  filter: string;
}

export function ToolsSection({ filter }: ToolsSectionProps) {
  const filteredTools = useMemo(() => {
    if (!filter.trim()) return tools;
    const query = filter.toLowerCase();
    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.keywords.some((k) => k.includes(query))
    );
  }, [filter]);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-foreground">
          Herramientas de Visualización
          {filter && (
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({filteredTools.length})
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {filteredTools.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            No se encontraron herramientas para &quot;{filter}&quot;
          </p>
        ) : (
          <div className="space-y-2">
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.name}
                  type="button"
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 hover:scale-105 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm text-foreground">{tool.name}</span>
                  </div>
                  {tool.status && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        tool.status === "popular"
                          ? "bg-chart-1/20 text-chart-1"
                          : "bg-accent/20 text-accent"
                      }`}
                    >
                      {tool.status === "popular" ? "Popular" : "Nuevo"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
