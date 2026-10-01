# Colors

Visualizador interactivo de **paletas de colores en plantillas reales**: crea tu paleta en la landing, elige entre 3 plantillas (landing, dashboard SaaS y portfolio creativo), personaliza colores y tipografía en vivo, y comparte tu tema mediante una URL con la paleta serializada en el path.

## Stack

- Vite + React + TypeScript (plugin SWC)
- Tailwind CSS v4 (plugin de Vite, configuración CSS-first)
- shadcn/ui
- wouter (ruteo)
- zustand (estado del tema)
- TanStack Query

## Getting started

Requisitos: Node.js 20+ y pnpm 10.

```sh
# 1. Instalar dependencias
pnpm install

# 2. Levantar el servidor de desarrollo (puerto 8080)
pnpm dev
```

Otros scripts:

```sh
pnpm build       # build de producción en dist/
pnpm preview     # servir el build localmente
pnpm lint        # eslint
pnpm typecheck   # tsc -b --force
```

## CI

GitHub Actions (`.github/workflows/ci.yml`) corre en cada push/PR a `main`:
instala con pnpm (caché incluido) y valida **typecheck + lint + build**.

## Cómo funciona el sistema de temas

El usuario crea su paleta en la landing, navega a la galería de plantillas y ve cómo los colores y la tipografía se aplican al instante en 3 diseños distintos. El tema se persiste en `localStorage`, se puede compartir como URL y exportar como snippet CSS.

El mecanismo está documentado en detalle en [`docs/COLORES_DINAMICOS.md`](docs/COLORES_DINAMICOS.md). Resumen del flujo:

```
updateTheme() (hook useThemeCustomization / zustand store)
  → hexToRgb() serializa cada color a canales RGB crudos ("99 102 241")
  → useEffect escribe --custom-* en document.documentElement
  → Tailwind consume rgb(var(--custom-*)) vía utilidades custom-*
  → el navegador re-pinta sin recargar (transiciones de 300ms en index.css)
```

- **Estado**: zustand store con `persist` en `src/hooks/useThemeCustomization.ts`
- **Persistencia**: `localStorage` (`colors-theme-v1`)
- **Variables CSS**: `:root` en `src/index.css`
- **Panel de personalización**: `src/components/ThemeCustomizer.tsx`
- **Plantillas**: `src/templates/` (DemoTemplate, SaasDashboardTemplate, PortfolioTemplate)
- **Rutas**:
  - `/` — landing para crear la paleta
  - `/templates` — galería de plantillas
  - `/templates/:id` — plantilla en vivo con personalizador
  - `/:colors` — link compartible legacy, formato `/<primary>-<secondary>-<accent>-<text>-<bg>-<border>`

## Deploy

Proyecto SPA configurado para Vercel (`vercel.json` reescribe todas las rutas a `index.html`), necesario para que los links de paletas compartidas resuelvan directo.