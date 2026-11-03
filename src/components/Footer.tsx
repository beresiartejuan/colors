import { Palette, Mail, Phone, MapPin, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contacto" className="bg-custom-text text-custom-text-contrast py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-custom-primary to-custom-secondary flex items-center justify-center">
                <Palette className="w-4 h-4 text-custom-gradient-contrast" />
              </div>
              <h3 className="text-xl font-bold">Colors</h3>
            </div>
            <p className="text-custom-text-contrast/70 leading-relaxed text-sm md:text-base">
              Transformamos la manera en que las marcas expresan su identidad visual 
              a través de herramientas de personalización innovadoras y potentes.
            </p>
            <div className="flex items-center space-x-4">
              {[Github, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <button 
                  key={index}
                  className="w-8 h-8 rounded-full bg-custom-bg/10 hover:bg-custom-primary hover:text-custom-primary-contrast transition-colors flex items-center justify-center"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div className="space-y-4">
            <h4 className="font-semibold mb-4 text-base md:text-lg">Producto</h4>
            <ul className="space-y-2 text-custom-text-contrast/70 text-sm md:text-base">
              <li><a href="#" className="hover:text-custom-text-contrast transition-colors">Características</a></li>
              <li><a href="#" className="hover:text-custom-text-contrast transition-colors">Precios</a></li>
              <li><a href="#" className="hover:text-custom-text-contrast transition-colors">API</a></li>
              <li><a href="#" className="hover:text-custom-text-contrast transition-colors">Documentación</a></li>
              <li><a href="#" className="hover:text-custom-text-contrast transition-colors">Changelog</a></li>
            </ul>
          </div>

          {/* Company links */}
          <div className="space-y-4">
            <h4 className="font-semibold mb-4 text-base md:text-lg">Empresa</h4>
            <ul className="space-y-2 text-custom-text-contrast/70 text-sm md:text-base">
              <li><a href="#" className="hover:text-custom-text-contrast transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-custom-text-contrast transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-custom-text-contrast transition-colors">Carreras</a></li>
              <li><a href="#" className="hover:text-custom-text-contrast transition-colors">Prensa</a></li>
              <li><a href="#" className="hover:text-custom-text-contrast transition-colors">Partners</a></li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h4 className="font-semibold mb-4 text-base md:text-lg">Contacto</h4>
            <div className="space-y-3 text-custom-text-contrast/70 text-sm md:text-base">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>hola@colors.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+34 900 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Madrid, España</span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="font-medium mb-3 text-sm md:text-base">Newsletter</h5>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="flex-1 px-3 py-2 bg-custom-text-contrast/10 border border-custom-text-contrast/20 rounded text-custom-text-contrast placeholder-custom-text-contrast/50 focus:outline-none focus:border-custom-primary text-sm"
                />
                <button className="bg-custom-primary hover:opacity-90 text-custom-primary-contrast px-4 py-2 rounded transition-opacity text-sm font-medium">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-custom-text-contrast/10 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-custom-text-contrast/60 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Colors. Todos los derechos reservados.
          </p>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-custom-text-contrast/60">
            <a href="#" className="hover:text-custom-text-contrast transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-custom-text-contrast transition-colors">Términos de Servicio</a>
            <a href="#" className="hover:text-custom-text-contrast transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
