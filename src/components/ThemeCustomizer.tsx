
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Palette, RotateCcw, Settings, X } from 'lucide-react';
import { useThemeCustomization, ThemeConfig } from '@/hooks/useThemeCustomization';

const ThemeCustomizer: React.FC = () => {
  const { theme, updateTheme, resetTheme } = useThemeCustomization();
  const [isOpen, setIsOpen] = useState(false);

  const handleColorChange = (key: keyof ThemeConfig, value: string) => {
    updateTheme({ [key]: value });
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
    <>
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 text-sm md:text-base"
        size="sm"
      >
        <Settings className="w-4 h-4 mr-1 md:mr-2" />
        <span className="hidden sm:inline">Personalizar</span>
        <span className="sm:hidden">✨</span>
      </Button>

      {/* Customizer Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white border-l border-gray-200 shadow-2xl overflow-y-auto">
            <Card className="h-full rounded-none border-0">
              <CardHeader className="border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-800 flex items-center gap-2 text-lg md:text-xl">
                    <Palette className="w-5 h-5" />
                    Personalizar Colores
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-600 hover:bg-gray-100"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-4 md:p-6 space-y-6 bg-white">
                {/* Preset Themes */}
                <div>
                  <Label className="text-sm font-semibold text-gray-800 mb-3 block">
                    Temas Predefinidos
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {presetThemes.map((preset) => (
                      <Button
                        key={preset.name}
                        variant="outline"
                        size="sm"
                        onClick={() => updateTheme(preset.config)}
                        className="text-xs h-auto p-2 border-gray-300 text-gray-700 hover:bg-gray-50 text-center"
                      >
                        {preset.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Color Controls */}
                <div className="space-y-4">
                  <Label className="text-sm font-semibold text-gray-800">
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
                      <Label className="text-xs text-gray-600">
                        {label}
                      </Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={theme[key as keyof ThemeConfig] as string}
                          onChange={(e) => handleColorChange(key as keyof ThemeConfig, e.target.value)}
                          className="w-10 md:w-12 h-8 rounded border border-gray-300 cursor-pointer flex-shrink-0"
                        />
                        <input
                          type="text"
                          value={theme[key as keyof ThemeConfig] as string}
                          onChange={(e) => handleColorChange(key as keyof ThemeConfig, e.target.value)}
                          className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 min-w-0"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Font Family */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-800">
                    Tipografía
                  </Label>
                  <Select
                    value={theme.fontFamily}
                    onValueChange={(value) => updateTheme({ fontFamily: value })}
                  >
                    <SelectTrigger className="border-gray-300 bg-white text-gray-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-300">
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
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restablecer Tema
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeCustomizer;
