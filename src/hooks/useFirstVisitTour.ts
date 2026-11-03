import { useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const STORAGE_KEY = 'colors-tour-seen-v1';

const hasSeenTour = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return true; // storage blocked: don't nag on every visit
  }
};

const markTourSeen = () => {
  try {
    localStorage.setItem(STORAGE_KEY, '1');
  } catch {
    /* ignore */
  }
};

/**
 * Shows a one-time guided tour pointing at the floating action buttons the
 * first time the user lands on any template. Persisted in localStorage.
 */
export const useFirstVisitTour = (enabled = true) => {
  useEffect(() => {
    if (!enabled || hasSeenTour()) return;

    let tour: ReturnType<typeof driver> | undefined;
    // Wait for the template to paint so the buttons are positioned.
    const timer = window.setTimeout(() => {
      tour = driver({
        popoverClass: 'colors-tour',
        showProgress: true,
        allowClose: true,
        overlayOpacity: 0.55,
        stagePadding: 8,
        stageRadius: 28,
        nextBtnText: 'Siguiente',
        prevBtnText: 'Atrás',
        doneBtnText: 'Entendido',
        progressText: '{{current}} de {{total}}',
        onDestroyed: markTourSeen,
        steps: [
          {
            element: '#tour-css-button',
            popover: {
              title: 'Copia el código de tu tema',
              description:
                'Este botón muestra el CSS con tu paleta y tipografía, listo para copiar y pegar en tu proyecto.',
              side: 'left',
              align: 'center',
            },
          },
          {
            element: '#tour-theme-button',
            popover: {
              title: 'Personaliza los colores',
              description:
                'Abre el panel de configuración para cambiar colores y fuente, probar presets y copiar el link para compartir tu tema.',
              side: 'left',
              align: 'center',
            },
          },
        ],
      });
      tour.drive();
    }, 800);

    return () => {
      window.clearTimeout(timer);
      tour?.destroy();
    };
  }, [enabled]);
};
