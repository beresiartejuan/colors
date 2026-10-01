import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { templates } from '@/templates';
import { ArrowRight, Palette, Layers } from 'lucide-react';

const TemplatesGallery = () => {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-custom-bg to-custom-primary/5 text-custom-text font-custom py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-custom-primary/10 text-custom-primary px-4 py-2 rounded-full mb-4">
            <Layers className="w-4 h-4" />
            <span className="text-sm font-medium">Colección de plantillas</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Galería de plantillas</h1>
          <p className="text-lg text-custom-text/70 max-w-2xl mx-auto">
            Elige una plantilla y observa cómo se adapta a tu paleta actual.
            Cada diseño se renderiza con tus variables de tema en tiempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="group hover:shadow-xl transition-all duration-300 bg-custom-bg border-custom-border"
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-custom-primary to-custom-secondary flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
                  <Palette className="w-7 h-7 text-custom-gradient-contrast" />
                </div>
                <CardTitle className="text-xl text-custom-text">{template.name}</CardTitle>
                <CardDescription className="text-custom-text/70">{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full bg-custom-primary hover:opacity-90 text-custom-primary-contrast"
                  onClick={() => navigate(`/templates/${template.id}`)}
                >
                  Ver en vivo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-custom-text/60">
            ¿Quieres crear tu propia paleta?{' '}
            <Link href="/">
              <span className="text-custom-primary hover:underline font-medium cursor-pointer">
                Volver al inicio
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemplatesGallery;
