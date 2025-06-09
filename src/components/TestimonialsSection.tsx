
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'María González',
      role: 'Directora de Diseño',
      company: 'TechStart',
      content: 'Colors ha revolucionado nuestro flujo de trabajo. La capacidad de personalizar paletas en tiempo real nos ha ahorrado horas de trabajo y mejorado significativamente la consistencia de nuestros diseños.',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'Carlos Ruiz',
      role: 'Desarrollador Frontend',
      company: 'Digital Agency',
      content: 'La integración es perfecta y la documentación excelente. Nuestros clientes están encantados con la capacidad de personalizar la apariencia de sus sitios web de forma intuitiva.',
      rating: 5,
      avatar: '👨‍💻'
    },
    {
      name: 'Ana Fernández',
      role: 'Product Manager',
      company: 'StartupXYZ',
      content: 'Desde que implementamos Colors, hemos visto un aumento del 40% en la satisfacción del usuario. La experiencia de personalización es simplemente increíble.',
      rating: 5,
      avatar: '👩‍🚀'
    },
    {
      name: 'David Martín',
      role: 'UX Designer',
      company: 'Creative Studio',
      content: 'La verificación automática de accesibilidad es un game-changer. Podemos asegurar que todos nuestros diseños cumplen con los estándares sin esfuerzo adicional.',
      rating: 5,
      avatar: '👨‍🎨'
    },
    {
      name: 'Laura Sánchez',
      role: 'CEO',
      company: 'E-commerce Plus',
      content: 'Colors nos ha permitido ofrecer a nuestros clientes una experiencia de marca única. La personalización ha aumentado nuestras conversiones en un 25%.',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'Miguel Torres',
      role: 'Creative Director',
      company: 'Brand Agency',
      content: 'La colaboración en equipo es fantástica. Todos podemos trabajar en las mismas paletas simultáneamente, manteniendo la coherencia visual en todos nuestros proyectos.',
      rating: 5,
      avatar: '👨‍🎨'
    }
  ];

  return (
    <section id="testimonios" className="py-12 md:py-20 bg-gradient-to-b from-custom-bg to-custom-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-custom-text mb-4 md:mb-6 px-2">
            Lo que Dicen{' '}
            <span className="bg-gradient-to-r from-custom-primary to-custom-secondary bg-clip-text text-transparent">
              Nuestros Usuarios
            </span>
          </h2>
          <p className="text-lg md:text-xl text-custom-text/70 max-w-3xl mx-auto px-4">
            Más de 10,000 profesionales confían en Colors para crear 
            experiencias visuales excepcionales. Descubre por qué.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-custom-bg border-custom-border hover:border-custom-primary/50 transition-all duration-300 hover:shadow-lg relative overflow-hidden group"
            >
              <CardContent className="p-4 md:p-6">
                {/* Quote icon */}
                <Quote className="w-6 md:w-8 h-6 md:h-8 text-custom-primary/20 mb-3 md:mb-4" />
                
                {/* Stars */}
                <div className="flex items-center space-x-1 mb-3 md:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-custom-accent fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-custom-text/80 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-gradient-to-r from-custom-primary to-custom-secondary flex items-center justify-center text-white text-lg md:text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-custom-text text-sm md:text-base">
                      {testimonial.name}
                    </div>
                    <div className="text-xs md:text-sm text-custom-text/60">
                      {testimonial.role} en {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12 md:mt-16 px-4">
          <p className="text-base md:text-lg text-custom-text/70 mb-6">
            ¿Listo para unirte a miles de profesionales satisfechos?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-custom-primary text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto">
              Comenzar Gratis
            </button>
            <button className="border border-custom-primary text-custom-primary px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-custom-primary hover:text-white transition-colors w-full sm:w-auto">
              Ver Precios
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
