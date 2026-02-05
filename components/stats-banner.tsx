"use client";

import { useEffect, useState, useRef } from "react";
import { FileText, Users, GraduationCap } from "lucide-react";

const stats = [
  { label: "Documentos Digitalizados", value: 3938, icon: FileText },
  { label: "Investigadores", value: 3700, icon: Users },
  { label: "Carreras", value: 14, icon: GraduationCap },
];

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

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

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [end, duration, hasAnimated]);

  return { count, elementRef };
}

function StatItem({ label, value, icon: Icon }: { label: string; value: number; icon: typeof FileText }) {
  const { count, elementRef } = useCountUp(value, 1500);

  return (
    <div ref={elementRef} className="flex items-center gap-4 justify-center">
      <div className="w-12 h-12 rounded-full bg-[#004B85]/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#004B85]" />
      </div>
      <div className="text-left">
        <p className="text-2xl md:text-3xl font-bold text-[#004B85] tabular-nums">
          {count.toLocaleString("es-ES")}
        </p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export default function StatsBanner() {
  return (
    <section className="py-12 bg-secondary/50 border-y border-border">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
