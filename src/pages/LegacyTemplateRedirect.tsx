import { Redirect, useLocation } from 'wouter';
import NotFound from './NotFound';
import { COLOR_ORDER, parseColorsFromPath } from '@/lib/shareLink';

/**
 * Legacy shareable links (`/:colors`) are redirected to the canonical
 * `/templates/demo?c=…` format. Paths that don't match the 6-hex pattern fall
 * through to the 404 page.
 */
const LegacyTemplateRedirect = () => {
  const [location] = useLocation();
  const colors = parseColorsFromPath(location);

  if (!colors) return <NotFound />;

  const c = COLOR_ORDER.map((key) => (colors[key] as string).replace('#', '')).join('-');
  return <Redirect to={`/templates/demo?c=${c}`} replace />;
};

export default LegacyTemplateRedirect;
