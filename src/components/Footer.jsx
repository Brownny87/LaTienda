import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold font-heading text-white mb-4">Brownny Store</h3>
            <p className="text-sm leading-relaxed mb-6">
              Tu destino número uno para ropa personalizada de alta calidad. Expresa tu estilo único con nosotros.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" className="hover:text-primary-400 transition-colors"><Instagram size={20} /></a>
              <a href="https://facebook.com" className="hover:text-primary-400 transition-colors"><Facebook size={20} /></a>
              <a href="https://twitter.com" className="hover:text-primary-400 transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-primary-400 transition-colors">Inicio</Link></li>
              <li><Link to="/personalizar" className="hover:text-primary-400 transition-colors">Personalizar</Link></li>
              <li><Link to="/productos" className="hover:text-primary-400 transition-colors">Productos</Link></li>
              <li><Link to="/login" className="hover:text-primary-400 transition-colors">Mi Cuenta</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary-400 shrink-0" />
                <span>Calle 123, Ciudad Moda, Colombia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-primary-400 shrink-0" />
                <span>+57 310 512 8801</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-primary-400 shrink-0" />
                <span>contacto@brownnystore.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter (Simulado) */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Boletín</h4>
            <p className="text-sm mb-4">Suscríbete para recibir ofertas exclusivas.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Tu correo" 
                className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg transition-colors text-white">
                OK
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Brownny Store. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
  