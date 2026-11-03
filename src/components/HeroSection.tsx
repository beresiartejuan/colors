
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section id="inicio" className="relative bg-custom-bg py-12 md:py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-custom-primary/5 to-custom-secondary/5"></div>
      <div className="absolute top-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-custom-accent/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 md:w-96 md:h-96 bg-custom-secondary/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-custom-primary/10 px-3 md:px-4 py-2 rounded-full mb-6 md:mb-8 animate-fade-in">
            <Star className="w-4 h-4 text-custom-primary fill-current" />
            <span className="text-sm font-medium text-custom-primary">
              Personalización de colores en vivo
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-custom-text mb-4 md:mb-6 leading-tight animate-fade-in px-2">
            Transforma tu{' '}
            <span className="bg-gradient-to-r from-custom-primary to-custom-secondary bg-clip-text text-transparent">
              Experiencia Digital
            </span>{' '}
            con Colores
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-custom-text/70 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in px-4">
            Descubre el poder de la personalización cromática. Crea experiencias únicas 
            que conecten con tu audiencia y hagan destacar tu marca en el mundo digital.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8 md:mb-12 animate-fade-in px-4">
            <Button 
              size="lg" 
              className="bg-custom-primary text-custom-primary-contrast hover:opacity-90 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
            >
              Comenzar Ahora
              <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-custom-text/20 text-custom-text hover:bg-custom-text hover:text-custom-text-contrast px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold w-full sm:w-auto"
            >
              <Play className="mr-2 w-4 md:w-5 h-4 md:h-5" />
              Ver Demo
            </Button>
          </div>

          {/* Social proof */}
          <div className="flex flex-col items-center space-y-4 animate-fade-in px-4">
            <p className="text-custom-text/60 text-sm text-center">
              Construido con tecnologías modernas
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 opacity-60">
              {['React', 'TypeScript', 'Tailwind', 'Vite', 'Radix UI'].map((company) => (
                <div 
                  key={company}
                  className="px-3 md:px-4 py-2 bg-custom-border/30 rounded-lg text-custom-text/70 text-xs md:text-sm font-medium"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
