import type { FC } from 'react';
import { Link } from 'wouter';
import { templates } from '@/templates';
import SiteNav from '@/components/SiteNav';
import { ArrowUpRight, Layers } from 'lucide-react';

/** Miniature, theme-aware sketches so each card hints at its template. */
const previews: Record<string, FC> = {
  demo: () => (
    <div className="h-full p-4 flex flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-custom-primary/10 to-custom-secondary/10">
      <div className="h-2.5 w-3/4 rounded bg-custom-text/80" />
      <div className="h-2.5 w-1/2 rounded bg-gradient-to-r from-custom-primary to-custom-secondary" />
      <div className="h-1.5 w-2/3 rounded bg-custom-text/20" />
      <div className="mt-1.5 flex gap-2">
        <div className="h-5 w-16 rounded bg-custom-primary" />
        <div className="h-5 w-16 rounded border border-custom-text/20" />
      </div>
    </div>
  ),
  saas: () => (
    <div className="h-full p-4 flex gap-3">
      <div className="w-1/5 rounded bg-custom-primary/10 space-y-2 p-2">
        <div className="h-1.5 rounded bg-custom-primary" />
        <div className="h-1.5 rounded bg-custom-text/20" />
        <div className="h-1.5 rounded bg-custom-text/20" />
      </div>
      <div className="flex-1 space-y-2.5">
        <div className="grid grid-cols-3 gap-2">
          <div className="h-8 rounded bg-custom-primary/20" />
          <div className="h-8 rounded bg-custom-secondary/20" />
          <div className="h-8 rounded bg-custom-accent/25" />
        </div>
        <div className="flex items-end gap-1.5 h-14 rounded border border-custom-border px-2 pb-1.5">
          {[40, 65, 50, 85, 60, 95, 70].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-custom-primary" style={{ height: `${h}%`, opacity: 0.45 + i * 0.08 }} />
          ))}
        </div>
      </div>
    </div>
  ),
  portfolio: () => (
    <div className="h-full p-4 grid grid-cols-3 grid-rows-2 gap-2">
      <div className="col-span-2 row-span-2 rounded bg-gradient-to-br from-custom-primary to-custom-secondary" />
      <div className="rounded bg-custom-accent/40" />
      <div className="rounded bg-custom-secondary/30" />
    </div>
  ),
};

const TemplatesGallery = () => {
  return (
    <div className="min-h-screen bg-custom-bg text-custom-text font-custom relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-dot-grid" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full bg-custom-primary/10 blur-3xl" />
      </div>
      <SiteNav />

      <main className="relative container mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="text-center mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 border border-custom-primary/20 bg-custom-primary/10 text-custom-primary px-3.5 py-1.5 rounded-full mb-5">
            <Layers className="w-4 h-4" />
            <span className="text-sm font-medium">Colección de plantillas</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Galería de plantillas</h1>
          <p className="text-lg text-custom-text/70 max-w-2xl mx-auto">
            Elige una plantilla y observa cómo se adapta a tu paleta actual. Cada diseño se
            renderiza con tus variables de tema en tiempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => {
            const Preview = previews[template.id];
            return (
              <Link
                key={template.id}
                href={`/templates/${template.id}`}
                className="group flex flex-col rounded-xl border border-custom-border bg-custom-bg overflow-hidden shadow-sm hover:shadow-xl hover:shadow-custom-primary/10 hover:-translate-y-1 hover:border-custom-primary/40 transition-all duration-300"
              >
                <div className="h-44 border-b border-custom-border bg-custom-text/[0.02]" aria-hidden="true">
                  {Preview && <Preview />}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-semibold">{template.name}</h2>
                    <ArrowUpRight className="w-5 h-5 shrink-0 text-custom-text/40 transition-all group-hover:text-custom-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="mt-1.5 text-sm text-custom-text/70 leading-relaxed">{template.description}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-12 text-center text-sm text-custom-text/60">
          ¿Quieres crear tu propia paleta?{' '}
          <Link href="/" className="text-custom-primary hover:underline font-medium">
            Volver al inicio
          </Link>
        </p>
      </main>
    </div>
  );
};

export default TemplatesGallery;
