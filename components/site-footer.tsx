import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer id="contact" className="bg-[#004B85] text-white">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-30">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6" />
              <span className="font-semibold text-lg">SciViz Hub</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Repositorio académico digital de la Pontificia Universidad Católica del Ecuador, Sede Esmeraldas. 
              Preservando y difundiendo el conocimiento de la comunidad universitaria.
            </p>
          </div>

          <div>
  <div className="md:ml-12">
  <h4 className="font-semibold mb-4 text-white">Enlaces Rápidos</h4>
  <ul className="space-y-2 text-sm">
    <li>
      <a href="#" className="text-white/70 hover:text-white transition-colors">
        Biblioteca Virtual
      </a>
    </li>
    <li>
      <a href="#" className="text-white/70 hover:text-white transition-colors">
        Guía de Uso
      </a>
    </li>
    <li>
      <a href="#" className="text-white/70 hover:text-white transition-colors">
        Políticas de Acceso
      </a>
    </li>
    <li>
      <a href="#" className="text-white/70 hover:text-white transition-colors">
        Preguntas Frecuentes
      </a>
    </li>
  </ul>
</div>
</div>


          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Esmeraldas, Ecuador</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>(06) 272-1459</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>biblioteca@pucese.edu.ec</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>2026 PUCE Sede Esmeraldas. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Términos de uso</a>
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
