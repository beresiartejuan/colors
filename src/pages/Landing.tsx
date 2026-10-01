import React, { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useThemeCustomization, ThemeConfig } from '@/hooks/useThemeCustomization';
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
    try {
      await navigator.clipboard.writeText(generateShareableUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error copying link:', err);
    }
  };

  const goToTemplates = () => {
    navigate('/templates');
  };

  return (
    <div className="min-h-screen bg-custom-bg text-custom-text font-custom transition-colors duration-300">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] rounded-full bg-custom-primary/10 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] rounded-full bg-custom-secondary/10 blur-3xl" />
      </div>

      <main className="relative container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 bg-custom-primary/10 text-custom-primary px-4 py-2 rounded-full mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Vista previa en tiempo real</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
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

          <Card className="bg-custom-bg/80 backdrop-blur border-custom-border shadow-xl">
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
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        aria-label={`Selector de color ${label.toLowerCase()}`}
                        value={theme[key] as string}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="h-10 w-12 rounded-md border border-custom-border cursor-pointer flex-shrink-0"
                      />
                      <Input
                        type="text"
                        aria-label={`Código hexadecimal ${label.toLowerCase()}`}
                        value={theme[key] as string}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="flex-1 border-custom-border bg-custom-bg"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
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

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="flex-1 bg-custom-primary text-custom-primary-contrast hover:opacity-90"
                    onClick={goToTemplates}
                  >
                    Ver en 3 plantillas
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 border-custom-primary text-custom-primary hover:bg-custom-primary hover:text-custom-primary-contrast"
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
