import { useLocation } from 'wouter';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeStore } from '@/hooks/useThemeCustomization';

/** Shown while a shared palette is previewed; lets the visitor keep it or go back. */
const SharedThemeBanner = () => {
  const previewing = useThemeStore((s) => s.sharedBackup !== null);
  const keepSharedTheme = useThemeStore((s) => s.keepSharedTheme);
  const restoreOwnTheme = useThemeStore((s) => s.restoreOwnTheme);
  const [location, navigate] = useLocation();

  if (!previewing) return null;

  // Drop `?c=…&f=…` so a refresh doesn't re-apply the shared theme.
  const clearQuery = () => navigate(location, { replace: true });

  return (
    <div
      role="status"
      className="fixed top-3 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-xl border border-custom-border bg-custom-bg/95 p-3 text-custom-text shadow-xl backdrop-blur sm:flex sm:items-center sm:gap-3"
    >
      <p className="flex flex-1 items-center gap-2 text-sm">
        <Share2 className="h-4 w-4 shrink-0 text-custom-primary" />
        Estás viendo una paleta compartida.
      </p>
      <div className="mt-2 flex gap-2 sm:mt-0">
        <Button
          size="sm"
          className="flex-1 bg-custom-primary text-custom-primary-contrast hover:opacity-90"
          onClick={() => {
            keepSharedTheme();
            clearQuery();
          }}
        >
          Guardar como mía
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1 border-custom-border bg-transparent text-custom-text"
          onClick={() => {
            restoreOwnTheme();
            clearQuery();
          }}
        >
          Volver a la mía
        </Button>
      </div>
    </div>
  );
};

export default SharedThemeBanner;
