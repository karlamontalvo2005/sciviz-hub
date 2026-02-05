"use client";

import { Library, Quote, Filter, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    name: "Búsqueda por Categorías",
    description: "Explora documentos divididos por áreas: Medicina, Ingeniería, Sociales, etc.",
    icon: Library,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    name: "Generador de Citas",
    description: "Obtén referencias en formato APA, IEEE o Vancouver con un solo clic.",
    icon: Quote,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    name: "Filtros Avanzados",
    description: "Refina búsqueda por año, autor, idioma o tipo de documento.",
    icon: Filter,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    name: "Historial y Favoritos",
    description: "Guarda tus artículos más útiles y revisa tus últimas búsquedas.",
    icon: Clock,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
];

export default function FeaturesSection() {
  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground mb-4 text-center">
        Herramientas de Búsqueda
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card
              key={feature.name}
              className="bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-md cursor-pointer group"
            >
              <CardContent className="p-5 text-center">
                <div
                  className={`w-12 h-12 mx-auto rounded-full ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-medium text-foreground mb-2">
                  {feature.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
