import PageTransition from "@/components/page-transition";
import SiteFooter from "@/components/site-footer";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactoPage() {
  return (
    <PageTransition>
      {/* HERO */}
      <section className="relative min-h-[520px] pt-24 md:pt-28 flex items-center justify-center">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#004B85]/90 to-[#5b3fd1]/80" />

        {/* Contenido */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            Contacto
          </h1>
          <p className="text-white/85 max-w-xl mx-auto">
            Ponte en contacto con la Biblioteca Digital de la PUCE Sede
            Esmeraldas para soporte académico o sugerencias institucionales.
          </p>
        </div>
      </section>

      {/* CARDS */}
      <section className="relative z-20 -mt-24 mb-22">
        <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12">
          
          {/* CARD IZQUIERDA */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Phone className="w-6 h-6 text-[#004B85]" />
              <h3 className="text-xl font-semibold">
                Información de contacto
              </h3>
            </div>

            <div className="space-y-2 mb-6">
              <p className="text-[#004B85] font-semibold text-lg">
                (+593) 93 911 7453
              </p>
              <p className="text-[#004B85] font-semibold text-lg">
                (+593) 91 978 4835
              </p>
            </div>

            <div className="flex items-center gap-3 mb-1">
              <Mail className="w-5 h-5 text-[#004B85]" />
              <h4 className="text-lg font-semibold">E-mail</h4>
            </div>
            <p className="text-[#004B85] font-semibold text-lg mb-6">
              bibliotecapuce@puce.edu.ec
            </p>

            <div className="flex items-center gap-3 mb-1">
              <MapPin className="w-5 h-5 text-[#004B85]" />
              <h4 className="text-lg font-semibold">Ubicación</h4>
            </div>
            <p className="text-[#004B85] font-semibold text-lg">
              Espejo y Subida a Santa Cruz
            </p>
          </div>

          {/* CARD DERECHA */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <MessageCircle className="w-8 h-8 text-orange-500 mb-4" />

            <h3 className="text-xl font-semibold mb-2">
              Agregar sugerencia
            </h3>

            <p className="text-muted-foreground mb-6">
              Ayúdanos a mejorar el repositorio con tus ideas o
              recomendaciones.
            </p>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=karladmm2005@gmail.com&su=Sugerencia%20para%20el%20repositorio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Enviar correo
              </Button>
            </a>
          </div>
        </div>
      </section>
      {/* SECCIÓN INFERIOR */} 
      <section className="py-2 bg-background"> 
        <div className="container mx-auto px-4 md:px-1 max-w-3xl text-center"> 
            <p className="text-muted-foreground"> Este repositorio académico preserva y difunde la producción intelectual de la
                 comunidad universitaria de la PUCE Sede Esmeraldas, fomentando el acceso abierto al conocimiento. 
             </p> 
        </div> 
      </section>

      {/* FOOTER */}
      <div className="mt-12">
        <SiteFooter />
      </div>
      
    </PageTransition>
  );
}
