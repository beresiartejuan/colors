import React, { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useThemeCustomization, ThemeConfig } from '@/hooks/useThemeCustomization';
import SiteNav from '@/components/SiteNav';
import ColorField from '@/components/ColorField';
import { shareLink } from '@/lib/shareLink';
import { toast } from 'sonner';
import { ArrowRight, Copy, Check, Palette, Sparkles } from 'lucide-react';

const colorFields: { key: keyof ThemeConfig; label: string }[] = [
  { key: 'primaryColor', label: 'Primario' },
  { key: 'secondaryColor', label: 'Secundario' },
  { key: 'accentColor', label: 'Acento' },
  { key: 'textColor', label: 'Texto' },
  { key: 'backgroundColor', label: 'Fondo' },
  { key: 'borderColor', label: 'Borde' },
];

const fontOptions = ['Inter', 'Playfair Display', 'Roboto', 'Open Sans'];

const Landing: React.FC = () => {
  const { theme, updateTheme, generateShareableUrl } = useThemeCustomization();
  const [, navigate] = useLocation();
  const [copied, setCopied] = useState(false);

  const handleColorChange = (key: keyof ThemeConfig, value: string) => {
    updateTheme({ [key]: value } as Partial<ThemeConfig>);
  };

  const copyLink = async () => {
    const result = await shareLink(generateShareableUrl());
    if (result === 'copied' || result === 'shared') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success(result === 'copied' ? 'Link copiado al portapapeles' : 'Link compartido');
    } else if (result === 'failed') {
      toast.error('No se pudo copiar el link. Inténtalo de nuevo.');
    }
  };

  const goToTemplates = () => {
    navigate('/templates');
  };

  return (
    <div className="min-h-screen bg-custom-bg text-custom-text font-custom relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-dot-grid" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-custom-primary/15 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-custom-secondary/10 blur-3xl" />
      </div>
      <SiteNav />

      <main className="relative container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 border border-custom-primary/20 bg-custom-primary/10 text-custom-primary px-3.5 py-1.5 rounded-full mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Vista previa en tiempo real</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-[1.1] tracking-tight text-balance">
              Crea tu paleta y mírala en{' '}
              <span className="bg-gradient-to-r from-custom-primary to-custom-secondary bg-clip-text text-transparent">
                3 plantillas
              </span>{' '}
              en vivo
            </h1>
            <p className="text-lg md:text-xl text-custom-text/70 max-w-2xl mx-auto">
              Elige tus colores, selecciona una tipografía y observa tu paleta aplicada al instante
              en tres plantillas distintas: landing, dashboard SaaS y portfolio creativo.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">
          <Card className="bg-custom-bg/80 backdrop-blur border-custom-border shadow-xl shadow-custom-primary/5">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Palette className="w-6 h-6 text-custom-primary" />
                Personaliza tu paleta
              </CardTitle>
              <CardDescription className="text-custom-text/70">
                Ajusta los 6 colores principales y la tipografía para ver cómo cambian tus 3 plantillas en vivo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {colorFields.map(({ key, label }) => (
                  <div key={key} className="space-y-2">
                    <Label className="text-sm font-medium">{label}</Label>
                    <ColorField
                      label={label}
                      value={theme[key] as string}
                      onChange={(hex) => handleColorChange(key, hex)}
                      swatchClassName="h-10 w-12"
                      inputClassName="h-10 text-base"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_auto] gap-5 items-end">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Tipografía</Label>
                  <Select
                    value={theme.fontFamily}
                    onValueChange={(value) => updateTheme({ fontFamily: value })}
                  >
                    <SelectTrigger className="border-custom-border bg-custom-bg text-custom-text">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map((font) => (
                        <SelectItem key={font} value={font}>
                          {font}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 min-w-0">
                  <Button
                    size="lg"
                    className="sm:flex-1 whitespace-nowrap bg-custom-primary text-custom-primary-contrast hover:opacity-90"
                    onClick={goToTemplates}
                  >
                    Ver en 3 plantillas
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="sm:flex-1 whitespace-nowrap border-custom-primary text-custom-primary hover:bg-custom-primary hover:text-custom-primary-contrast"
                    onClick={copyLink}
                  >
                    {copied ? (
                      <>
                        <Check className="mr-2 w-4 h-4" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 w-4 h-4" />
                        Copiar link
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <aside className="lg:sticky lg:top-20 space-y-4" aria-label="Vista previa">
            <div
              className="rounded-xl border border-custom-border bg-custom-bg shadow-xl shadow-custom-primary/5 overflow-hidden"
              style={{ fontFamily: 'var(--custom-font-family)' }}
            >
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-custom-border">
                <span className="w-2.5 h-2.5 rounded-full bg-custom-text/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-custom-text/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-custom-text/15" />
                <span className="ml-2 text-xs text-custom-text/50">Vista previa</span>
              </div>
              <div className="p-5 space-y-4">
                <div className="h-24 rounded-lg bg-gradient-to-br from-custom-primary to-custom-secondary p-4 flex flex-col justify-end">
                  <p className="text-custom-gradient-contrast font-semibold leading-tight">Tu marca, tus colores</p>
                  <p className="text-custom-gradient-contrast/80 text-xs">Así se verá tu interfaz</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1.5 rounded-md text-xs font-medium bg-custom-primary text-custom-primary-contrast">Primario</span>
                  <span className="px-3 py-1.5 rounded-md text-xs font-medium bg-custom-secondary text-custom-secondary-contrast">Secundario</span>
                  <span className="px-3 py-1.5 rounded-md text-xs font-medium bg-custom-accent text-custom-accent-contrast">Acento</span>
                </div>
                <div className="rounded-lg border border-custom-border p-3 space-y-2">
                  <div className="h-2 w-2/3 rounded bg-custom-text/80" />
                  <div className="h-2 w-full rounded bg-custom-text/20" />
                  <div className="h-2 w-5/6 rounded bg-custom-text/20" />
                </div>
              </div>
            </div>
            <div className="flex h-3 rounded-full overflow-hidden border border-custom-border" aria-hidden="true">
              {colorFields.map(({ key }) => (
                <span key={key} className="flex-1" style={{ backgroundColor: theme[key] as string }} />
              ))}
            </div>
          </aside>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-custom-text/60">
              También puedes{' '}
              <Link href="/templates">
                <span className="text-custom-primary hover:underline font-medium cursor-pointer">
                  explorar la galería de plantillas
                </span>
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
