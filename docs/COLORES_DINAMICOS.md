# Mecanismo de colores dinámicos con temas personalizados

Este documento describe **cómo funciona** el sistema de temas dinámicos de esta web: cómo un color elegido por el usuario en un panel atraviesa toda la aplicación hasta pintar la interfaz, y cómo un tema se puede compartir mediante una URL.

---

## Visión general del flujo

```
Usuario cambia color (panel ThemeCustomizer)
        │
        ▼
updateTheme() en useThemeCustomization() / zustand store  ──►  URL compartible (hex en path)
        │
        ▼
useEffect escribe variables CSS en <html>
        root.style.setProperty('--custom-primary', '99 102 241') etc.
        │
        ▼
Tailwind v4 consume esas variables (bloque @theme inline de index.css)
        --color-custom-primary: rgb(var(--custom-primary))
        │
        ▼
Las utilidades Tailwind se pintan en vivo
        bg-custom-primary, text-custom-text, from-custom-primary, .../50
        │
        ▼
Persistencia en localStorage (zustand persist)
        keys: colors-theme-v1
```

Todo es **CSS en runtime**: no hay rebuild, ni recarga, ni inyección de hojas de estilo nuevas. Se reescriben variables CSS sobre `document.documentElement` y el navegador re-pinta instantáneamente (con transiciones de 300 ms definidas en `index.css`).

---

## Piezas del sistema (4 capas)

### 1. Fuente de estado: `src/hooks/useThemeCustomization.ts`

Es el corazón del mecanismo: combina un **store de zustand** con wouter para leer la ruta. Define:

- **`ThemeConfig`** — el modelo del tema: 6 colores + tipografía.
  ```ts
  export interface ThemeConfig {
    primaryColor: string;    // #6366f1 (indigo por defecto)
    secondaryColor: string;  // #ec4899 (pink)
    accentColor: string;     // #22c55e (green)
    borderColor: string;     // #e2e8f0
    textColor: string;       // #0f172a
    backgroundColor: string; // #ffffff
    fontFamily: string;      // 'Inter'
  }
  ```
- **`defaultTheme`** — valores iniciales (los mismos que hardcodea `:root` en `index.css`; ambos deben mantenerse sincronizados).
- **`useThemeStore`** — store de **zustand** envuelto con `persist` (`zustand/middleware`). La clave en `localStorage` es `colors-theme-v1` y solo se persiste el objeto `theme`. Expone:
  - `theme` — el objeto de configuración vigente.
  - `updateTheme(partial)` — merge superficial (`{ ...prev, ...newTheme }`); asi el preset de colores no pisa `fontFamily`.
  - `resetTheme()` — vuelve a `defaultTheme`, navega a `/` con wouter y limpia el almacenamiento persistido.
- **`useThemeCustomization()`** — el hook que consumen los componentes: conecta el store con wouter (`useLocation`) y sincroniza el tema con el DOM.

#### Orden de prioridad del tema

Cuando la app arranca, el tema se resuelve así:

1. **URL `/:colors`** — si coincide el patrón de 6 hex, gana y reemplaza lo que haya en storage.
2. **Storage local (`colors-theme-v1`)** — si existe, se rehidrata automáticamente.
3. **`defaultTheme`** — fallback inicial.

#### El truco clave: hex → "tripleta RGB" en crudo

`hexToRgb()` convierte `#6366f1` en la cadena **`"99 102 241"`** (solo números separados por espacios, sin `rgb()`):

```ts
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0 0 0';
  return `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`;
};
```

¿Por qué? Porque es el mismo convenio que usa shadcn/ui con sus variables HSL (`--primary: 222.2 84% 4.9%`). Al guardar el canal de color como valores crudos, Tailwind puede envolverlos y **habilitar modificadores de opacidad** `bg-custom-primary/10`, `text-custom-text/70`, etc., algo imposible si la variable ya fuese un `#hex` o `rgb()` cerrado.

### 2. Inyección en el DOM: `useEffect` mismo archivo

Cada vez que cambia `theme`, un `useEffect` escribe las propiedades CSS personalizadas en la raíz del documento:

```ts
useEffect(() => {
  const root = document.documentElement;
  root.style.setProperty('--custom-primary',   hexToRgb(theme.primaryColor));
  root.style.setProperty('--custom-secondary', hexToRgb(theme.secondaryColor));
  root.style.setProperty('--custom-accent',    hexToRgb(theme.accentColor));
  root.style.setProperty('--custom-border',    hexToRgb(theme.borderColor));
  root.style.setProperty('--custom-text',      hexToRgb(theme.textColor));
  root.style.setProperty('--custom-bg',        hexToRgb(theme.backgroundColor));

  const fontMap = {
    'Inter': "'Inter', sans-serif",
    'Playfair Display': "'Playfair Display', serif",
    'Roboto': "'Roboto', sans-serif",
    'Open Sans': "'Open Sans', sans-serif"
  };
  root.style.setProperty('--custom-font-family', fontMap[theme.fontFamily] || fontMap['Inter']);
}, [theme]);
```

Puntos importantes:

- Las variables se setean **inline sobre `<html>`**, por lo que ganan sobre los valores declarados en `:root` de `index.css` (que actúan como fallback pre-hidratación / primer render).
- `fontFamily` no se guardan como hex: se mapea el nombre lógico a una pila CSS.

### 3. Contrato CSS ↔ Tailwind: `src/index.css` (Tailwind v4, CSS-first)

Desde la migración a Tailwind v4 no existe `tailwind.config.ts`: la configuración vive íntegramente en el CSS. El archivo `src/index.css` tiene tres bloques protagonistas:

**Valores por defecto en `:root`**, en formato "tripleta cruda" (números sin envoltorio):

```css
/* Custom theme variables */
--custom-primary: 99 102 241;
--custom-secondary: 236 72 153;
--custom-accent: 34 197 94;
--custom-border: 226 232 240;
--custom-text: 15 23 42;
--custom-bg: 255 255 255;
--custom-font-family: 'Inter', sans-serif;
```

**El puente a Tailwind en `@theme inline`**, que registra los tokens y genera las utilidades de clase:

```css
@theme inline {
  /* Colores dinámicos personalizables */
  --color-custom-primary:   rgb(var(--custom-primary));
  --color-custom-secondary: rgb(var(--custom-secondary));
  --color-custom-accent:    rgb(var(--custom-accent));
  --color-custom-border:    rgb(var(--custom-border));
  --color-custom-text:      rgb(var(--custom-text));
  --color-custom-bg:        rgb(var(--custom-bg));

  --font-custom: var(--custom-font-family);

  --animate-fade-in: fade-in 0.6s ease-out;
  --animate-slide-in: slide-in 0.5s ease-out;
}
```

**La transición suave** que hace que los cambios "se vean animados" sin JS extra:

```css
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

Notas de la migración a v4:

- Los tokens shadcn estándar (`--background`, `--primary`, etc.) ahora se declaran **con su envoltorio `hsl()` dentro de la variable** (ej: `--primary: hsl(222.2 47.4% 11.2%)`) y se consumen como `var(--primary)` a secas. Las variables `--custom-*` conservan su formato de canales crudos porque el hook las sobreescribe en runtime con números.
- Las animaciones `animate-fade-in` / `animate-slide-in` se definen con `--animate-*` en `@theme` + `@keyframes` en el mismo CSS.
- El contenedor es un `@utility container` propio (v4 eliminó el `theme.container` del config).

Resultado: cada cambio de variable se refleja en TODAS las utilidades `custom-*` presentes en el árbol, sin tocar ningún componente.

> ⚠️ Nota: el dark-mode de shadcn (`.dark`) sobreescribe `--custom-bg`, `--custom-text` y `--custom-border` en `index.css`. Como el hook escribe inline sobre `<html>`, el tema personalizado siempre termina teniendo la última palabra. Son dos fuentes de verdad con prioridad distinta: `.dark` (hoja de estilos) < inline (hook).

### 4. Consumo en la UI (convenios de uso)

Cada plantilla fija el lienzo base con el tema activo:

```tsx
<div className="min-h-screen bg-custom-bg text-custom-text font-custom">
```

Las plantillas actuales son `DemoTemplate`, `SaasDashboardTemplate` y `PortfolioTemplate`, registradas en `src/templates/index.ts`. El resto de secciones combina las utilidades siguiendo estos patrones (ver `Header`, `Footer`, `HeroSection`, etc.):

| Patrón | Ejemplo real |
|---|---|
| Fondo / texto base | `bg-custom-bg`, `text-custom-text` |
| Opacidad sobre el color (posible gracias a la tripleta RGB) | `text-custom-text/70`, `bg-custom-primary/10`, `from-custom-primary/5` |
| Gradientes de marca | `bg-gradient-to-r from-custom-primary to-custom-secondary` |
| Bordes temáticos | `border-custom-border`, `hover:border-custom-primary/50` |
| Tipografía | `font-custom` |
| Texto sobre color sólido | `bg-custom-primary text-custom-primary-contrast` |
| Texto sobre gradiente | `bg-gradient-to-br from-custom-primary to-custom-secondary text-custom-gradient-contrast` |

---

## Temas compartibles por URL

Esta es la segunda mitad del mecanismo: un tema completo viaja **en la propia ruta**, sin query params ni storage.

### Serialización → URL

`generateShareableUrl()` toma los 6 hex, quita el `#`, une con guiones y devuelve:

```
https://<origin>/<primary>-<secondary>-<accent>-<text>-<background>-<border>

Ejemplo: /0ea5e9-06b6d4-22d3ee-0c4a6e-f0f9ff-e0f2fe
         (Ocean Blue preset: primary-secondary-accent-text-bg-border)
```

⚠️ El **orden es fijo**: `primary`, `secondary`, `accent`, `text`, `background`, `border`. `fontFamily` no viaja en la URL.

### Ruteo

En `App.tsx` (con **wouter**):

```tsx
<Switch>
  <Route path="/" component={Landing} />
  <Route path="/templates" component={TemplatesGallery} />
  <Route path="/templates/:templateId" component={TemplateShowcase} />
  {/* Backwards compatibility: old shareable links */}
  <Route path="/:colors" component={LegacyTemplateRedirect} />
  <Route component={NotFound} />
</Switch>
```

`vercel.json` reescribe todo a `index.html` (SPA), así que los links compartidos (`/:colors`) y las rutas de plantillas no dan 404 al abrirse directo:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

### Deserialización

`parseColorsFromPath()` valida con regex **exclusivamente 6 bloques de 6 hex**; si el path no calza, se ignora y sigue el tema actual/por defecto:

```ts
const colorPattern =
  /^\/([a-fA-F0-9]{6})-([a-fA-F0-9]{6})-([a-fA-F0-9]{6})-([a-fA-F0-9]{6})-([a-fA-F0-9]{6})-([a-fA-F0-9]{6})$/;
```

Y un `useEffect` reactivo a la ubicación de wouter re-aplica el tema cada vez que la URL contiene una paleta (esto permite incluso cambiar de tema navegando entre URLs de paletas):

```ts
const [location] = useLocation();

useEffect(() => {
  const colorsFromPath = parseColorsFromPath(location);
  if (colorsFromPath) updateTheme(colorsFromPath);
}, [location, updateTheme]);
```

---

## UI de personalización: `ThemeCustomizer.tsx`

Panel flotante (botones abajo a la derecha) que expone el hook a personas usuarias:

1. **Temas predefinidos** — 4 presets (`Ocean Blue`, `Sunset Orange`, `Forest Green`, `Royal Purple`) que llaman `updateTheme(preset.config)`.
2. **Controles por color** — 6 filas con `input[type=color]` + `input[type=text]` (hex editable a mano) que disparan `updateTheme({ [key]: value })`; por eso el pintado es **en vivo a cada tecla/elección**, no requiere "Aplicar".
3. **Tipografía** — `Select` con 4 fuentes → `updateTheme({ fontFamily })`.
4. **Restablecer** — `resetTheme()` vuelve al default **y** navega a `/` para limpiar la URL.
5. **Panel "Configuración CSS"** — exportación:
   - `generateCSSConfig()` imprime un snippet `:root { --color-primary: ...; }` **copiable al portapapeles** para reutilizar el tema fuera de esta app.
   - `copyShareableLink()` copia la URL con el tema serializado en el path.

> Nota: el estado vive en un store de **zustand** (`useThemeStore`), por lo que es global: cualquier componente que monte `useThemeCustomization()` comparte el mismo tema, sin necesidad de Provider ni Context.

---

## Resumen en una frase

**El mecanismo = store zustand con `persist` en `localStorage` para un `ThemeConfig` → hex serializados como tripletas RGB crudas → `style.setProperty` sobre `<html>` → variables `--custom-*` consumidas por utilidades Tailwind `rgb(var(--custom-*))`, con el tema aplicado a 3 plantillas (`/templates/:id`) y serializable en la ruta `/<6hex>-...-<6hex>` (wouter) para compartirlo.**