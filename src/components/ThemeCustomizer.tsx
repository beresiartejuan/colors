
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Palette, RotateCcw, Settings, X, Code, Copy, Check, Share } from 'lucide-react';
import { useThemeCustomization, ThemeConfig } from '@/hooks/useThemeCustomization';

const ThemeCustomizer: React.FC = () => {
  const { theme, updateTheme, resetTheme, generateShareableUrl } = useThemeCustomization();
  const [isOpen, setIsOpen] = useState(false);
  const [isCssOpen, setIsCssOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleColorChange = (key: keyof ThemeConfig, value: string) => {
    updateTheme({ [key]: value });
  };

  const generateCSSConfig = () => {
    const fontMap: { [key: string]: string } = {
      'Inter': "'Inter', sans-serif",
      'Playfair Display': "'Playfair Display', serif",
      'Roboto': "'Roboto', sans-serif",
      'Open Sans': "'Open Sans', sans-serif"
    };

    return `:root {
  /* Theme Colors */
  --color-primary: ${theme.primaryColor};
  --color-secondary: ${theme.secondaryColor};
  --color-accent: ${theme.accentColor};
  --color-border: ${theme.borderColor};
  --color-text: ${theme.textColor};
  --color-background: ${theme.backgroundColor};

  /* Typography */
  --font-family: ${fontMap[theme.fontFamily] || fontMap['Inter']};
}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateCSSConfig());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  const copyShareableLink = async () => {
    try {
      const shareableUrl = generateShareableUrl();
      await navigator.clipboard.writeText(shareableUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Error copying link to clipboard:', err);
    }
  };

  const presetThemes = [
    {
      name: 'Ocean Blue',
      config: {
        primaryColor: '#0ea5e9',
        secondaryColor: '#06b6d4',
        accentColor: '#22d3ee',
        borderColor: '#e0f2fe',
        textColor: '#0c4a6e',
        backgroundColor: '#f0f9ff'
      }
    },
    {
      name: 'Sunset Orange',
      config: {
        primaryColor: '#ea580c',
        secondaryColor: '#f97316',
        accentColor: '#fb923c',
        borderColor: '#fed7aa',
        textColor: '#9a3412',
        backgroundColor: '#fff7ed'
      }
    },
    {
      name: 'Forest Green',
      config: {
        primaryColor: '#059669',
        secondaryColor: '#10b981',
        accentColor: '#34d399',
        borderColor: '#d1fae5',
        textColor: '#064e3b',
        backgroundColor: '#ecfdf5'
      }
    },
    {
      name: 'Royal Purple',
      config: {
        primaryColor: '#7c3aed',
        secondaryColor: '#8b5cf6',
        accentColor: '#a78bfa',
        borderColor: '#e9d5ff',
        textColor: '#581c87',
        backgroundColor: '#faf5ff'
      }
    }
  ];

  return (
    <TooltipProvider>
      {/* Floating Buttons Container */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-3">
        {/* CSS Config Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsCssOpen(true)}
              className="bg-custom-accent text-custom-bg shadow-lg hover:opacity-90 rounded-full w-12 h-12 sm:w-14 sm:h-14 p-0"
            >
              <Code className="w-6 h-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-custom-text text-custom-bg border-custom-border">
            <p>Ver configuración CSS</p>
          </TooltipContent>
        </Tooltip>

        {/* Theme Customizer Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsOpen(true)}
              className="bg-custom-primary text-custom-bg shadow-lg hover:opacity-90 rounded-full w-12 h-12 sm:w-14 sm:h-14 p-0"
            >
              <Settings className="w-6 h-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-custom-text text-custom-bg border-custom-border">
            <p>Personalizar colores de la página</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* CSS Config Panel */}
      {isCssOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-custom-bg border-l border-custom-border shadow-2xl overflow-y-auto">
            <Card className="h-full rounded-none border-0">
              <CardHeader className="border-b border-custom-border bg-custom-bg sticky top-0 z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-custom-text flex items-center gap-2 text-lg md:text-xl">
                    <Code className="w-5 h-5" />
                    Configuración CSS
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCssOpen(false)}
                    className="text-custom-text/70 hover:bg-custom-border/30"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-4 md:p-6 space-y-6 bg-custom-bg">
                <div>
                  <Label className="text-sm font-semibold text-custom-text mb-3 block">
                    Variables CSS Actuales
                  </Label>
                  <div className="bg-custom-border/20 border border-custom-border rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="whitespace-pre-wrap text-custom-text">
                      {generateCSSConfig()}
                    </pre>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={copyToClipboard}
                    className="w-full bg-custom-accent text-custom-bg hover:opacity-90"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        ¡CSS Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar Configuración CSS
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={copyShareableLink}
                    variant="outline"
                    className="w-full border-custom-primary text-custom-primary hover:bg-custom-primary/10"
                  >
                    {linkCopied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        ¡Link Copiado!
                      </>
                    ) : (
                      <>
                        <Share className="w-4 h-4 mr-2" />
                        Copiar Link Compartible
                      </>
                    )}
                  </Button>
                </div>

                <div className="text-xs text-custom-text/60 bg-custom-border/20 p-3 rounded-lg">
                  <p className="font-medium mb-1">Link actual:</p>
                  <p className="break-all text-custom-text/70">{generateShareableUrl()}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Customizer Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-custom-bg border-l border-custom-border shadow-2xl overflow-y-auto">
            <Card className="h-full rounded-none border-0">
              <CardHeader className="border-b border-custom-border bg-custom-bg sticky top-0 z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-custom-text flex items-center gap-2 text-lg md:text-xl">
                    <Palette className="w-5 h-5" />
                    Personalizar Colores
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-custom-text/70 hover:bg-custom-border/30"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-4 md:p-6 space-y-6 bg-custom-bg">
                {/* Preset Themes */}
                <div>
                  <Label className="text-sm font-semibold text-custom-text mb-3 block">
                    Temas Predefinidos
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {presetThemes.map((preset) => (
                      <Button
                        key={preset.name}
                        variant="outline"
                        size="sm"
                        onClick={() => updateTheme(preset.config)}
                        className="text-xs h-auto p-2 border-custom-border text-custom-text/80 hover:bg-custom-border/20 text-center"
                      >
                        {preset.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Color Controls */}
                <div className="space-y-4">
                  <Label className="text-sm font-semibold text-custom-text">
                    Colores Personalizados
                  </Label>
                  
                  {[
                    { key: 'primaryColor', label: 'Color Primario' },
                    { key: 'secondaryColor', label: 'Color Secundario' },
                    { key: 'accentColor', label: 'Color de Acento' },
                    { key: 'borderColor', label: 'Color de Bordes' },
                    { key: 'textColor', label: 'Color de Texto' },
                    { key: 'backgroundColor', label: 'Color de Fondo' }
                  ].map(({ key, label }) => (
                    <div key={key} className="space-y-2">
                      <Label className="text-xs text-custom-text/70">
                        {label}
                      </Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={theme[key as keyof ThemeConfig] as string}
                          onChange={(e) => handleColorChange(key as keyof ThemeConfig, e.target.value)}
                          className="w-10 md:w-12 h-8 rounded border border-custom-border cursor-pointer flex-shrink-0"
                        />
                        <input
                          type="text"
                          value={theme[key as keyof ThemeConfig] as string}
                          onChange={(e) => handleColorChange(key as keyof ThemeConfig, e.target.value)}
                          className="flex-1 px-3 py-1 text-sm border border-custom-border rounded bg-custom-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-custom-primary/50 min-w-0"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Font Family */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-custom-text">
                    Tipografía
                  </Label>
                  <Select
                    value={theme.fontFamily}
                    onValueChange={(value) => updateTheme({ fontFamily: value })}
                  >
                    <SelectTrigger className="border-custom-border bg-custom-bg text-custom-text">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-custom-bg border-custom-border">
                      <SelectItem value="Inter">Inter (Sans-serif)</SelectItem>
                      <SelectItem value="Playfair Display">Playfair Display (Serif)</SelectItem>
                      <SelectItem value="Roboto">Roboto (Sans-serif)</SelectItem>
                      <SelectItem value="Open Sans">Open Sans (Sans-serif)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Reset Button */}
                <Button
                  onClick={resetTheme}
                  variant="outline"
                  className="w-full border-custom-border text-custom-text/80 hover:bg-custom-border/20"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restablecer Tema
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </TooltipProvider>
  );
};

export default ThemeCustomizer;
