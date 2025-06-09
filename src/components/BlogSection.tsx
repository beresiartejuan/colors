
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, User } from 'lucide-react';

const BlogSection: React.FC = () => {
  const blogPosts = [
    {
      title: 'La Psicología del Color en el Diseño Digital',
      excerpt: 'Descubre cómo los colores influyen en las emociones y decisiones de los usuarios, y aprende a usar esta ciencia para mejorar tus diseños.',
      author: 'Elena Rodríguez',
      date: '15 Mar 2024',
      readTime: '5 min',
      category: 'Diseño',
      image: '🎨'
    },
    {
      title: 'Tendencias de Color 2024: Lo que Está por Venir',
      excerpt: 'Explora las paletas de colores que dominarán el diseño digital este año y cómo implementarlas en tus proyectos.',
      author: 'Marco Silva',
      date: '12 Mar 2024',
      readTime: '7 min',
      category: 'Tendencias',
      image: '🌈'
    },
    {
      title: 'Accesibilidad y Contraste: Guía Completa',
      excerpt: 'Todo lo que necesitas saber sobre contraste de colores y cómo crear diseños accesibles que cumplan con los estándares WCAG.',
      author: 'Carmen López',
      date: '10 Mar 2024',
      readTime: '8 min',
      category: 'Accesibilidad',
      image: '♿'
    },
    {
      title: 'Automatización en el Diseño: Herramientas IA',
      excerpt: 'Cómo la inteligencia artificial está revolucionando la selección y generación de paletas de colores en el diseño moderno.',
      author: 'Alejandro Ruiz',
      date: '8 Mar 2024',
      readTime: '6 min',
      category: 'Tecnología',
      image: '🤖'
    }
  ];

  return (
    <section id="blog" className="py-20 bg-custom-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-custom-text mb-6">
            Últimas{' '}
            <span className="bg-gradient-to-r from-custom-primary to-custom-secondary bg-clip-text text-transparent">
              Publicaciones
            </span>
          </h2>
          <p className="text-xl text-custom-text/70 max-w-3xl mx-auto">
            Mantente al día con las últimas tendencias, tips y técnicas 
            del mundo del diseño y la personalización de colores.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <Card 
              key={index} 
              className="bg-custom-bg border-custom-border hover:border-custom-primary/50 transition-all duration-300 hover:shadow-lg group overflow-hidden"
            >
              <CardHeader className="p-0">
                <div className="h-48 bg-gradient-to-br from-custom-primary/10 to-custom-secondary/10 flex items-center justify-center text-6xl">
                  {post.image}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Category and date */}
                <div className="flex items-center justify-between text-sm text-custom-text/60 mb-3">
                  <span className="bg-custom-primary/10 text-custom-primary px-3 py-1 rounded-full font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-custom-text mb-3 group-hover:text-custom-primary transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-custom-text/70 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Author and read time */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-custom-text/60">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-custom-text/60">{post.readTime} lectura</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-custom-primary hover:text-custom-primary hover:bg-custom-primary/10 p-1"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter subscription */}
        <div className="bg-gradient-to-r from-custom-primary/10 to-custom-secondary/10 rounded-2xl p-8 md:p-12 text-center border border-custom-border">
          <h3 className="text-2xl md:text-3xl font-bold text-custom-text mb-4">
            No te Pierdas Nuestras Actualizaciones
          </h3>
          <p className="text-custom-text/70 mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter y recibe los últimos artículos, tips de diseño 
            y actualizaciones sobre nuevas características directamente en tu bandeja de entrada.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu email aquí..."
              className="w-full px-4 py-3 rounded-lg border border-custom-border bg-custom-bg text-custom-text placeholder-custom-text/50 focus:outline-none focus:ring-2 focus:ring-custom-primary/50"
            />
            <Button className="bg-custom-primary text-white px-8 py-3 font-semibold hover:opacity-90 whitespace-nowrap">
              Suscribirse
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
