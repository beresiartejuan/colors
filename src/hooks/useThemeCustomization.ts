import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  borderColor: string;
  textColor: string;
  backgroundColor: string;
  fontFamily: string;
}

export const defaultTheme: ThemeConfig = {
  primaryColor: '#6366f1', // Indigo
  secondaryColor: '#ec4899', // Pink
  accentColor: '#22c55e', // Green
  borderColor: '#e2e8f0', // Slate
  textColor: '#0f172a', // Dark slate
  backgroundColor: '#ffffff', // White
  fontFamily: 'Inter',
};

const fontMap: { [key: string]: string } = {
  'Inter': "'Inter', sans-serif",
  'Playfair Display': "'Playfair Display', serif",
  'Roboto': "'Roboto', sans-serif",
  'Open Sans': "'Open Sans', sans-serif",
};

const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0 0 0';

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return `${r} ${g} ${b}`;
};

/**
 * Returns the RGB channels for black or white depending on which provides
 * better contrast against the given color. Accepts either a hex string or a
 * space-separated "r g b" string. Used to guarantee readable text on top of
 * arbitrary user-selected primary/secondary/accent colors.
 */
const getContrastRgb = (color: string): string => {
  let r = 0;
  let g = 0;
  let b = 0;

  const trimmed = color.trim();
  if (trimmed.includes(' ')) {
    const parts = trimmed.split(/\s+/).map(Number);
    if (parts.length === 3 && parts.every((n) => !isNaN(n))) {
      [r, g, b] = parts;
    } else {
      return '255 255 255';
    }
  } else {
    const normalized = trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalized);
    if (!result) return '255 255 255';
    r = parseInt(result[1], 16);
    g = parseInt(result[2], 16);
    b = parseInt(result[3], 16);
  }

  // Relative luminance (sRGB)
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.5 ? '0 0 0' : '255 255 255';
};

const averageRgb = (hexA: string, hexB: string): string => {
  const parse = (hex: string) => {
    const normalized = hex.startsWith('#') ? hex : `#${hex}`;
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalized);
    if (!result) return { r: 0, g: 0, b: 0 };
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  };

  const a = parse(hexA);
  const b = parse(hexB);
  return `${Math.round((a.r + b.r) / 2)} ${Math.round((a.g + b.g) / 2)} ${Math.round(
    (a.b + b.b) / 2
  )}`;
};

export const parseColorsFromPath = (pathname: string): Partial<ThemeConfig> | null => {
  const colorPattern =
    /^\/([a-fA-F0-9]{6})-([a-fA-F0-9]{6})-([a-fA-F0-9]{6})-([a-fA-F0-9]{6})-([a-fA-F0-9]{6})-([a-fA-F0-9]{6})$/;
  const match = pathname.match(colorPattern);

  if (match) {
    return {
      primaryColor: `#${match[1]}`,
      secondaryColor: `#${match[2]}`,
      accentColor: `#${match[3]}`,
      textColor: `#${match[4]}`,
      backgroundColor: `#${match[5]}`,
      borderColor: `#${match[6]}`,
    };
  }

  return null;
};

const generateShareableUrl = (themeConfig: ThemeConfig): string => {
  const baseUrl = window.location.origin;
  const colors = [
    themeConfig.primaryColor.replace('#', ''),
    themeConfig.secondaryColor.replace('#', ''),
    themeConfig.accentColor.replace('#', ''),
    themeConfig.textColor.replace('#', ''),
    themeConfig.backgroundColor.replace('#', ''),
    themeConfig.borderColor.replace('#', ''),
  ].join('-');

  return `${baseUrl}/${colors}`;
};

interface ThemeState {
  theme: ThemeConfig;
  updateTheme: (newTheme: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: defaultTheme,
      updateTheme: (newTheme) =>
        set((state) => ({ theme: { ...state.theme, ...newTheme } })),
      // Pure state reset; navigation is handled by the hook (wouter)
      resetTheme: () => set({ theme: defaultTheme }),
    }),
    {
      name: 'colors-theme-v1',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);

export const useThemeCustomization = () => {
  const theme = useThemeStore((s) => s.theme);
  const updateTheme = useThemeStore((s) => s.updateTheme);
  const resetThemeState = useThemeStore((s) => s.resetTheme);

  const [location, navigate] = useLocation();

  // Load theme from URL on mount / path change
  useEffect(() => {
    const colorsFromPath = parseColorsFromPath(location);
    if (colorsFromPath) {
      updateTheme(colorsFromPath);
    }
  }, [location, updateTheme]);

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty('--custom-primary', hexToRgb(theme.primaryColor));
    root.style.setProperty('--custom-secondary', hexToRgb(theme.secondaryColor));
    root.style.setProperty('--custom-accent', hexToRgb(theme.accentColor));
    root.style.setProperty('--custom-border', hexToRgb(theme.borderColor));
    root.style.setProperty('--custom-text', hexToRgb(theme.textColor));
    root.style.setProperty('--custom-bg', hexToRgb(theme.backgroundColor));

    root.style.setProperty('--custom-primary-contrast', getContrastRgb(theme.primaryColor));
    root.style.setProperty('--custom-secondary-contrast', getContrastRgb(theme.secondaryColor));
    root.style.setProperty('--custom-accent-contrast', getContrastRgb(theme.accentColor));
    root.style.setProperty('--custom-text-contrast', getContrastRgb(theme.textColor));
    root.style.setProperty('--custom-bg-contrast', getContrastRgb(theme.backgroundColor));

    root.style.setProperty(
      '--custom-gradient-contrast',
      getContrastRgb(averageRgb(theme.primaryColor, theme.secondaryColor))
    );

    root.style.setProperty(
      '--custom-font-family',
      fontMap[theme.fontFamily] || fontMap['Inter']
    );
  }, [theme]);

  return {
    theme,
    updateTheme,
    resetTheme: () => {
      resetThemeState();
      navigate('/');
      useThemeStore.persist.clearStorage();
    },
    generateShareableUrl: () => generateShareableUrl(theme),
  };
};