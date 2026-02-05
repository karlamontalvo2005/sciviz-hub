import PageTransition from "@/components/page-transition";
import SiteFooter from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SobreNosotrosPage() {
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
            Sobre nosotros
          </h1>
          <p className="text-white/85 max-w-xl mx-auto">
            Conoce al equipo académico detrás del repositorio digital de la
            PUCE Sede Esmeraldas.
          </p>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <section className="relative z-20 -mt-24">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm px-8 md:px-16 py-20 space-y-28">

          {/* SECCIÓN SOBRE NOSOTROS */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-semibold text-gray-800 mb-6">
                Nuestro Equipo
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Somos estudiantes de la Universidad PUCE Esmeraldas, de cuarto ciclo de la carrera de Ingeniería en TI. 
                Formamos un equipo de jóvenes con visión tecnológica e interés por la innovación, cualidades que buscamos 
                reflejar en este proyecto, enfocado en optimizar el acceso a la información académica mediante herramientas digitales.
              </p>

              {/* BOTÓN REDIRIGE A CONTACTO */}
              <Link href="/contacto">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Centro de contacto
                </Button>
              </Link>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                alt="Entorno académico"
                className="rounded-2xl w-full object-cover"
              />
            </div>
          </section>

          {/* SECCIÓN NUESTRA MISIÓN */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1516979187457-637abb4f9353"
                alt="Biblioteca universitaria"
                className="rounded-2xl w-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-3xl font-semibold text-gray-800 mb-6">
                Nuestra misión
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nuestra misión es desarrollar un repositorio académico digital
                que permita organizar, preservar y difundir la producción
                intelectual de la comunidad universitaria de la PUCE Sede
                Esmeraldas, facilitando el acceso al conocimiento mediante una
                plataforma clara, intuitiva y técnicamente sólida, que apoye
                tanto el aprendizaje como la investigación académica.
              </p>
            </div>
          </section>

        </div>
      </section>

      {/* FOOTER */}
      <div className="mt-16">
        <SiteFooter />
      </div>
    </PageTransition>
  );
}
