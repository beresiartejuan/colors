# Colors

[![CI](https://github.com/beresiartejuan/colors/actions/workflows/ci.yml/badge.svg)](https://github.com/beresiartejuan/colors/actions/workflows/ci.yml)
[![Demo](https://img.shields.io/badge/demo-colors.beresiarte.xyz-0ea5e9)](https://colors.beresiarte.xyz)
[![pnpm](https://img.shields.io/badge/pnpm-10-f69220?logo=pnpm)](https://pnpm.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Visualizador interactivo de **paletas de color sobre plantillas reales**. Creás una paleta en la landing, elegís entre 3 plantillas, personalizás colores y tipografía en vivo, y compartís el tema con una URL.

**Demo:** [colors.beresiarte.xyz](https://colors.beresiarte.xyz)

## Features

- Editor de paleta en la landing
- 3 plantillas: landing genérica, dashboard SaaS y portfolio creativo
- Personalización en vivo de colores y tipografía
- Links compartibles con la paleta en la URL
- Persistencia del tema en `localStorage`
- Exportación de la paleta como snippet CSS
- SPA con wouter + tema basado en variables CSS y Tailwind v4

## Stack

- [Vite](https://vitejs.dev) + [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [wouter](https://github.com/molefrog/wouter) · [zustand](https://zustand-demo.pmnd.rs) · [TanStack Query](https://tanstack.com/query/latest)
- Deploy en [Vercel](https://vercel.com) (`vercel.json` para SPA)

## Quick start

Requisitos: **Node.js 20+** y **pnpm 10**.

```sh
pnpm install
pnpm dev
```

Abrí [http://localhost:8080](http://localhost:8080).

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Servidor de desarrollo (puerto 8080) |
| `pnpm build` | Build de producción en `dist/` |
| `pnpm preview` | Servir el build localmente |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc -b --force` |

## Estructura

```
.
├── .github/workflows/ci.yml
├── docs/COLORES_DINAMICOS.md   # sistema de temas
├── src/
│   ├── components/             # ThemeCustomizer, Header, secciones…
│   ├── hooks/                  # useThemeCustomization
│   ├── templates/              # Demo, SaaS dashboard, Portfolio
│   ├── pages/                  # Landing, galería, showcase
│   ├── index.css               # variables CSS del tema
│   └── main.tsx
├── vercel.json
└── package.json
```

## Sistema de temas

El usuario arma la paleta, entra a la galería y ve colores/tipografía aplicados al instante. El tema se guarda en `localStorage`, se comparte por URL y se exporta a CSS.

Detalle técnico: [`docs/COLORES_DINAMICOS.md`](docs/COLORES_DINAMICOS.md).

```
updateTheme() (zustand + persist)
  → hexToRgb() → canales RGB ("99 102 241")
  → --custom-* en document.documentElement
  → Tailwind: rgb(var(--custom-*))
  → re-paint sin reload (transiciones ~300ms)
```

- Estado: `src/hooks/useThemeCustomization.ts`
- Panel: `src/components/ThemeCustomizer.tsx`
- Plantillas: `src/templates/`

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Landing para crear la paleta |
| `/templates` | Galería de plantillas |
| `/templates/:templateId` | Plantilla en vivo con personalizador |
| `/:colors` | Link compartible legacy: `/<primary>-<secondary>-<accent>-<text>-<bg>-<border>` |

## CI

GitHub Actions en push/PR a `main`: pnpm install (con caché) + **typecheck + lint + build**.

## License

[MIT](LICENSE)
