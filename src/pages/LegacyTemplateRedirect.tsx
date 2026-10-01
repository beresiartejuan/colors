import { useLocation } from 'wouter';
import DemoTemplate from '@/templates/DemoTemplate';
import NotFound from './NotFound';
import ThemeCustomizer from '@/components/ThemeCustomizer';
import { parseColorsFromPath } from '@/hooks/useThemeCustomization';

/**
 * Backwards compatibility route for legacy shareable links (`/:colors`).
 *
 * Instead of redirecting, we render the demo template directly so the URL
 * remains valid and shareable. `ThemeCustomizer` mounts `useThemeCustomization`,
 * which parses the color segments from the current path and applies the theme.
 *
 * If the path does not match the legacy 6-hex-color format we fall back to
 * the 404 page so arbitrary single-segment URLs are not mistaken for a valid
 * theme preview.
 */
const LegacyTemplateRedirect = () => {
  const [location] = useLocation();
  const colorsFromPath = parseColorsFromPath(location);

  if (!colorsFromPath) {
    return <NotFound />;
  }

  return (
    <div className="relative">
      <DemoTemplate />
      <ThemeCustomizer />
    </div>
  );
};

export default LegacyTemplateRedirect;
