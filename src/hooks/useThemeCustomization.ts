
import { useState, useEffect } from 'react';

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  borderColor: string;
  textColor: string;
  backgroundColor: string;
  fontFamily: string;
}

const defaultTheme: ThemeConfig = {
  primaryColor: '#6366f1', // Indigo
  secondaryColor: '#ec4899', // Pink
  accentColor: '#22c55e', // Green
  borderColor: '#e2e8f0', // Slate
  textColor: '#0f172a', // Dark slate
  backgroundColor: '#ffffff', // White
  fontFamily: 'Inter'
};

export const useThemeCustomization = () => {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);

  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '0 0 0';
    
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    
    return `${r} ${g} ${b}`;
  };

  const updateTheme = (newTheme: Partial<ThemeConfig>) => {
    setTheme(prev => ({ ...prev, ...newTheme }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    
    // Update CSS custom properties
    root.style.setProperty('--custom-primary', hexToRgb(theme.primaryColor));
    root.style.setProperty('--custom-secondary', hexToRgb(theme.secondaryColor));
    root.style.setProperty('--custom-accent', hexToRgb(theme.accentColor));
    root.style.setProperty('--custom-border', hexToRgb(theme.borderColor));
    root.style.setProperty('--custom-text', hexToRgb(theme.textColor));
    root.style.setProperty('--custom-bg', hexToRgb(theme.backgroundColor));
    
    // Update font family
    const fontMap: { [key: string]: string } = {
      'Inter': "'Inter', sans-serif",
      'Playfair Display': "'Playfair Display', serif",
      'Roboto': "'Roboto', sans-serif",
      'Open Sans': "'Open Sans', sans-serif"
    };
    
    root.style.setProperty('--custom-font-family', fontMap[theme.fontFamily] || fontMap['Inter']);
  }, [theme]);

  return {
    theme,
    updateTheme,
    resetTheme
  };
};
