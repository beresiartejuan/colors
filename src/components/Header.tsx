
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Palette, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-custom-bg border-b border-custom-border sticky top-0 z-40 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-custom-primary to-custom-secondary flex items-center justify-center">
              <Palette className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-custom-text">Colors</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#inicio" className="text-custom-text hover:text-custom-primary transition-colors font-medium">
              Inicio
            </a>
            <a href="#caracteristicas" className="text-custom-text hover:text-custom-primary transition-colors font-medium">
              Características
            </a>
            <a href="#testimonios" className="text-custom-text hover:text-custom-primary transition-colors font-medium">
              Testimonios
            </a>
            <a href="#blog" className="text-custom-text hover:text-custom-primary transition-colors font-medium">
              Blog
            </a>
            <a href="#contacto" className="text-custom-text hover:text-custom-primary transition-colors font-medium">
              Contacto
            </a>
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="border-custom-primary text-custom-primary hover:bg-custom-primary hover:text-white"
            >
              Iniciar Sesión
            </Button>
            <Button className="bg-custom-primary text-white hover:opacity-90">
              Comenzar Gratis
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            className="lg:hidden text-custom-text"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-custom-border">
            <div className="flex flex-col space-y-4 pt-4">
              <a 
                href="#inicio" 
                className="text-custom-text hover:text-custom-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </a>
              <a 
                href="#caracteristicas" 
                className="text-custom-text hover:text-custom-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Características
              </a>
              <a 
                href="#testimonios" 
                className="text-custom-text hover:text-custom-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonios
              </a>
              <a 
                href="#blog" 
                className="text-custom-text hover:text-custom-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </a>
              <a 
                href="#contacto" 
                className="text-custom-text hover:text-custom-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacto
              </a>
              <div className="flex flex-col space-y-3 pt-4">
                <Button 
                  variant="outline" 
                  className="border-custom-primary text-custom-primary hover:bg-custom-primary hover:text-white"
                >
                  Iniciar Sesión
                </Button>
                <Button className="bg-custom-primary text-white hover:opacity-90">
                  Comenzar Gratis
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
