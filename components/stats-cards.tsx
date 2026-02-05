"use client";

import { useEffect, useState, useRef } from "react";
import { Database, Users, Activity, FileText } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

const initialStats = [
  { label: "Datasets Activos", value: 12847, icon: Database, color: "text-chart-1" },
  { label: "Investigadores", value: 8392, icon: Users, color: "text-accent" },
  { label: "Visualizaciones", value: 45200, icon: Activity, color: "text-chart-3" },
  { label: "Publicaciones", value: 3156, icon: FileText, color: "text-chart-4" },
];

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = null;
    countRef.current = 0;
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      const currentCount = Math.floor(easeOutQuart * end);
      
      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setCount(currentCount);
      }
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration]);

  return count;
}

function formatNumber(num: number): string {
  return num.toLocaleString("es-ES");
}

function formatNumberAbbreviated(num: number): string {
  if (num >= 1000) {
    const formatted = (num / 1000).toFixed(1);
    return formatted.endsWith(".0") ? `${Math.floor(num / 1000)}K` : `${formatted}K`;
  }
  return num.toLocaleString("es-ES");
}

interface StatCardProps {
  label: string;
  value: number;
  icon: typeof FileText;
  color: string;
  index: number;
  isLive?: boolean;
}

function StatCard({ label, value, icon: Icon, color, index, isLive = false }: StatCardProps) {
  const count = useCountUp(value, 1500 + index * 200);

  if (isLive) {
    return (
      <Card className="bg-card border-border hover:scale-105 transition-transform duration-300 cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-xs text-muted-foreground">{label}</p>
                <span className="flex items-center gap-1 text-xs text-emerald-500 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground tabular-nums">
                {formatNumberAbbreviated(count)}
              </p>
              <p className="text-xs text-emerald-500 mt-1 font-medium">+324 esta semana</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
              <Icon className="w-4 h-4 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border hover:scale-105 transition-transform duration-300 cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <p className="text-3xl font-semibold text-foreground tabular-nums">
              {formatNumber(count)}
            </p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  const [datasetsActivos, setDatasetsActivos] = useState(initialStats[0].value);

  useEffect(() => {
    const interval = setInterval(() => {
      setDatasetsActivos((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {initialStats.map((stat, index) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={stat.label === "Datasets Activos" ? datasetsActivos : stat.value}
          icon={stat.icon}
          color={stat.color}
          index={index}
          isLive={stat.label === "Datasets Activos"}
        />
      ))}
    </div>
  );
}
