# Colors

Demo interactiva de **temas dinámicos**: personaliza colores y tipografía en vivo y comparte tu tema mediante una URL con la paleta serializada en el path.

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

Un usuario abre el panel flotante (esquina inferior derecha), elige colores y fuente, y la interfaz se re-pinta al instante. El tema completo puede copiarse como URL o como snippet CSS.

El mecanismo está documentado en detalle en [`docs/COLORES_DINAMICOS.md`](docs/COLORES_DINAMICOS.md). Resumen del flujo:

```
updateTheme() (hook useThemeCustomization)
  → hexToRgb() serializa cada color a canales RGB crudos ("99 102 241")
  → useEffect escribe --custom-* en document.documentElement
  → Tailwind consume rgb(var(--custom-*)) vía utilidades custom-*
  → el navegador re-pinta sin recargar (transiciones de 300ms en index.css)
```

- **Estado**: zustand store en `src/hooks/useThemeCustomization.ts` (`useThemeStore`)
- **Variables CSS**: `:root` en `src/index.css`
- **Panel de personalización**: `src/components/ThemeCustomizer.tsx`
- **Ruta compartible**: `/:colors` en `App.tsx`, formato `/<primary>-<secondary>-<accent>-<text>-<bg>-<border>`

## Deploy

Proyecto SPA configurado para Vercel (`vercel.json` reescribe todas las rutas a `index.html`), necesario para que los links de paletas compartidas resuelvan directo.