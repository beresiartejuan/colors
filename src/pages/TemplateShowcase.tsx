import { Link, useParams } from 'wouter';
import { Button } from '@/components/ui/button';
import { templates } from '@/templates';
import NotFound from './NotFound';
import ThemeCustomizer from '@/components/ThemeCustomizer';
import { ChevronLeft, ChevronRight, Grid3X3 } from 'lucide-react';

const TemplateShowcase = () => {
  const { templateId } = useParams<{ templateId?: string }>();
  const template = templates.find((t) => t.id === templateId);

  if (!template) {
    return <NotFound />;
  }

  const currentIndex = templates.findIndex((t) => t.id === templateId);
  const prevTemplate = templates[(currentIndex - 1 + templates.length) % templates.length];
  const nextTemplate = templates[(currentIndex + 1) % templates.length];

  const TemplateComponent = template.component;

  return (
    <div className="relative font-custom">
      <TemplateComponent />

      <ThemeCustomizer />

      <div className="fixed bottom-6 left-6 z-50 flex flex-wrap items-center gap-2">
        <Link href={`/templates/${prevTemplate.id}`}>
          <Button
            variant="outline"
            size="icon"
            aria-label="Plantilla anterior"
            className="bg-custom-bg/90 text-custom-text border-custom-border hover:bg-custom-primary/10 hover:text-custom-primary"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </Link>

        <span className="hidden sm:inline-flex items-center px-3 py-1.5 text-sm font-medium bg-custom-bg/90 text-custom-text border border-custom-border rounded-md shadow-sm">
          {template.name}
        </span>

        <Link href={`/templates/${nextTemplate.id}`}>
          <Button
            variant="outline"
            size="icon"
            aria-label="Siguiente plantilla"
            className="bg-custom-bg/90 text-custom-text border-custom-border hover:bg-custom-primary/10 hover:text-custom-primary"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>

        <Link href="/templates">
          <Button
            variant="outline"
            size="sm"
            className="ml-1 bg-custom-bg/90 text-custom-text border-custom-border hover:bg-custom-primary/10 hover:text-custom-primary"
            aria-label="Volver a la galería de plantillas"
          >
            <Grid3X3 className="w-4 h-4 mr-2" />
            Galería
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TemplateShowcase;
