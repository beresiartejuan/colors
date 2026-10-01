# 🎨 Colors

[![CI](https://github.com/beresiartejuan/colors/actions/workflows/ci.yml/badge.svg)](https://github.com/beresiartejuan/colors/actions/workflows/ci.yml)
[![pnpm](https://img.shields.io/badge/pnpm-10-f69220?logo=pnpm)](https://pnpm.io)
[![Stack](https://img.shields.io/badge/Vite%20+%20React%2019%20+%20Tailwind%20v4-646CFF?logo=vite)](https://vitejs.dev)

Visualizador interactivo de **paletas de colores en plantillas reales** 🖌️. Crea tu paleta en la landing, elige entre 3 plantillas, personaliza colores y tipografía en vivo, y comparte tu tema mediante una URL con la paleta serializada en el path.

## 🖼️ Demo

Aún no hay un deploy público. Puedes levantar la app localmente con `pnpm dev` y abrir [`http://localhost:8080`](http://localhost:8080).

> 🖼️ *Captura de la landing* — por añadir cuando el proyecto tenga deploy real.

## ✨ Features

- 🎨 **Editor de paleta interactivo** en la landing.
- 🧩 **3 plantillas reales**: landing genérica, dashboard SaaS y portfolio creativo.
- ⚡ **Personalización en vivo** de colores y tipografía.
- 🔗 **Links compartibles** con la paleta serializada en la URL.
- 💾 **Persistencia del tema** en `localStorage`.
- 📤 **Exportación** de la paleta como snippet CSS.
- 🧭 **Ruteo SPA** con wouter.
- 🌙 **Sistema de tema** basado en variables CSS y Tailwind v4.

## 🛠️ Stack

- [Vite](https://vitejs.dev) + [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) (plugin SWC)
- [Tailwind CSS v4](https://tailwindcss.com) (plugin de Vite, configuración CSS-first)
- [shadcn/ui](https://ui.shadcn.com)
- [wouter](https://github.com/molefrog/wouter) (ruteo)
- [zustand](https://zustand-demo.pmnd.rs) (estado del tema, con `persist`)
- [TanStack Query](https://tanstack.com/query/latest)

## 🚀 Quick start

Requisitos: **Node.js 20+** y **pnpm 10**.

```sh
# 1. Instalar dependencias
pnpm install

# 2. Levantar el servidor de desarrollo (puerto 8080)
pnpm dev
```

Abre [`http://localhost:8080`](http://localhost:8080) en tu navegador.

## 📦 Scripts

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Servidor de desarrollo en el puerto 8080 |
| `pnpm build` | Build de producción en `dist/` |
| `pnpm build:dev` | Build en modo development |
| `pnpm preview` | Servir el build localmente |
| `pnpm lint` | Ejecuta ESLint |
| `pnpm typecheck` | Ejecuta `tsc -b --force` |

## 🗂️ Project structure

```
.
├── .github/workflows/ci.yml   # CI con GitHub Actions
├── docs/
│   └── COLORES_DINAMICOS.md   # Documentación técnica del sistema de temas
├── public/                    # Assets estáticos
├── src/
│   ├── components/            # Componentes reutilizables (ThemeCustomizer, Header, Footer...)
│   ├── hooks/                 # Hooks de estado (useThemeCustomization)
│   ├── templates/             # DemoTemplate, SaasDashboardTemplate, PortfolioTemplate
│   ├── pages/                 # Vistas de la SPA (Landing, TemplatesGallery, TemplateShowcase)
│   ├── lib/                   # Utilidades
│   ├── index.css              # Variables CSS y transiciones del tema
│   └── main.tsx               # Punto de entrada
├── vercel.json                # Reescritura de rutas para SPA
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🌈 Theme system

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

## 🧭 Routes

| Ruta | Descripción |
|------|-------------|
| `/` | Landing para crear la paleta |
| `/templates` | Galería de plantillas |
| `/templates/:templateId` | Plantilla en vivo con personalizador |
| `/:colors` | Link compartible legacy, formato `/<primary>-<secondary>-<accent>-<text>-<bg>-<border>` |

## 🔄 CI

GitHub Actions (`.github/workflows/ci.yml`) corre en cada push/PR a `main`: instala con pnpm (caché incluido) y valida **typecheck + lint + build**.

## 🚀 Deploy notes

Proyecto SPA configurado para Vercel (`vercel.json` reescribe todas las rutas a `index.html`), necesario para que los links de paletas compartidas resuelvan directo. Actualmente no hay una URL de producción publicada.

## 📄 License

[MIT](LICENSE)
