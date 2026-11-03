import { useEffect } from 'react';
import { useSearch } from 'wouter';
import { applyThemeToDom, useThemeStore } from '@/hooks/useThemeCustomization';
import { parseShareParams } from '@/lib/shareLink';

/**
 * Single place that (1) writes the active theme to CSS variables, so every
 * route is themed even without a customizer, and (2) picks up `?c=…&f=…`
 * share links, previewing them without overwriting the visitor's own theme.
 */
const ThemeSync = () => {
  const theme = useThemeStore((s) => s.theme);
  const applySharedTheme = useThemeStore((s) => s.applySharedTheme);
  const search = useSearch();

  useEffect(() => {
    applyThemeToDom(theme);
  }, [theme]);

  useEffect(() => {
    const shared = parseShareParams(search);
    if (shared) applySharedTheme(shared);
  }, [search, applySharedTheme]);

  return null;
};

export default ThemeSync;
