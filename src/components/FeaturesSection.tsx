
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Zap, Users, Smartphone, Eye, Brush } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Palette,
      title: 'Paletas Inteligentes',
      description: 'Algoritmos avanzados que generan combinaciones de colores perfectas basadas en teoría del color y psicología.',
    },
    {
      icon: Zap,
      title: 'Cambios en Tiempo Real',
      description: 'Ve los cambios instantáneamente mientras ajustas los colores. Sin esperas, sin recargas.',
    },
    {
      icon: Users,
      title: 'Colaboración en Equipo',
      description: 'Comparte paletas de colores con tu equipo y colabora en tiempo real para mantener consistencia.',
    },
    {
      icon: Smartphone,
      title: 'Responsive por Defecto',
      description: 'Todas las personalizaciones se adaptan automáticamente a cualquier dispositivo y tamaño de pantalla.',
    },
    {
      icon: Eye,
      title: 'Accesibilidad Garantizada',
      description: 'Verificación automática de contraste y cumplimiento de estándares WCAG para máxima accesibilidad.',
    },
    {
      icon: Brush,
      title: 'Personalización Completa',
      description: 'Control total sobre tipografías, espaciados, bordes y cada aspecto visual de tu interfaz.',
    },
  ];

  return (
    <section id="caracteristicas" className="py-12 md:py-20 bg-custom-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-custom-text mb-4 md:mb-6 px-2">
            Características que{' '}
            <span className="bg-gradient-to-r from-custom-primary to-custom-secondary bg-clip-text text-transparent">
              Marcan la Diferencia
            </span>
          </h2>
          <p className="text-lg md:text-xl text-custom-text/70 max-w-3xl mx-auto px-4">
            Herramientas poderosas diseñadas para profesionales que buscan 
            crear experiencias visuales excepcionales sin compromiso.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-custom-bg border-custom-border hover:border-custom-primary/50 transition-all duration-300 hover:shadow-lg group"
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-custom-primary to-custom-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg md:text-xl font-semibold text-custom-text group-hover:text-custom-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-custom-text/70 leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { number: '10K+', label: 'Usuarios Activos' },
            { number: '500K+', label: 'Paletas Creadas' },
            { number: '99.9%', label: 'Tiempo Activo' },
            { number: '24/7', label: 'Soporte' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-custom-primary mb-2">
                {stat.number}
              </div>
              <div className="text-custom-text/70 font-medium text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
