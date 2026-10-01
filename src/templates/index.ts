import type { FC } from 'react';
import DemoTemplate from './DemoTemplate';
import PortfolioTemplate from './PortfolioTemplate';
import SaasDashboardTemplate from './SaasDashboardTemplate';

export interface Template {
  id: string;
  name: string;
  description: string;
  component: FC;
}

export const templates: Template[] = [
  {
    id: 'demo',
    name: 'Landing / Demo',
    description: 'Plantilla base de landing page para mostrar cómo reaccionan los componentes al tema.',
    component: DemoTemplate,
  },
  {
    id: 'saas',
    name: 'SaaS Dashboard',
    description: 'Dashboard minimalista con métricas, progreso y tabla de transacciones.',
    component: SaasDashboardTemplate,
  },
  {
    id: 'portfolio',
    name: 'Portfolio Creativo',
    description: 'Portfolio personal con hero, grid de proyectos, sobre mí y formulario de contacto.',
    component: PortfolioTemplate,
  },
];

export { DemoTemplate, PortfolioTemplate, SaasDashboardTemplate };
