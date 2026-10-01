# Mecanismo de colores dinámicos con temas personalizados

Este documento describe **cómo funciona** el sistema de temas dinámicos de esta web: cómo un color elegido por el usuario en un panel atraviesa toda la aplicación hasta pintar la interfaz, y cómo un tema se puede compartir mediante una URL.

---

## Visión general del flujo

```
Usuario cambia color (panel ThemeCustomizer)
        │
        ▼
setState en useThemeCustomization()  ──►  genera URL compartible (hex en el path)
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
```

Todo es **CSS en runtime**: no hay rebuild, ni recarga, ni inyección de hojas de estilo nuevas. Se reescriben variables CSS sobre `document.documentElement` y el navegador re-pinta instantáneamente (con transiciones de 300 ms definidas en `index.css`).

---

## Piezas del sistema (4 capas)

### 1. Fuente de estado: `src/hooks/useThemeCustomization.ts`

Es el corazón del mecanismo. Define:

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
- **Estado React** `useState<ThemeConfig>(defaultTheme)`.

API pública del hook:

| Función | Qué hace |
|---|---|
| `updateTheme(partial)` | Merge superficial sobre el tema actual (`{ ...prev, ...newTheme }`). Así el preset de colores no pisa `fontFamily`. |
| `resetTheme()` | Vuelve a `defaultTheme` **y** hace `navigate('/')` (limpia la URL con colores). |
| `generateShareableUrl()` | Serializa el tema a una URL (ver sección de URL). |
| `theme` | El objeto de configuración vigente. |

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

Los componentes de página (`Index.tsx`, `ColorPalette.tsx`) fijan el lienzo base:

```tsx
<div className="min-h-screen bg-custom-bg text-custom-text font-custom">
```

Y el resto de secciones combina las utilidades siguiendo estos patrones (ver `HeroSection`, `Header`, `FeaturesSection`, `TestimonialsSection`, `BlogSection`, `Footer`):

| Patrón | Ejemplo real |
|---|---|
| Fondo / texto base | `bg-custom-bg`, `text-custom-text` |
| Opacidad sobre el color (posible gracias a la tripleta RGB) | `text-custom-text/70`, `bg-custom-primary/10`, `from-custom-primary/5` |
| Gradientes de marca | `bg-gradient-to-r from-custom-primary to-custom-secondary` |
| Bordes temáticos | `border-custom-border`, `hover:border-custom-primary/50` |
| Tipografía | `font-custom` (o `style={{ fontFamily: 'var(--custom-font-family)' }}`) |
| Texto sobre color | `bg-custom-primary text-white` (se asume blanco fijo como foreground) |

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

En `App.tsx`:

```tsx
<Route path="/" element={<Index />} />
<Route path="/:colors" element={<ColorPalette />} />
<Route path="*" element={<NotFound />} />
```

`vercel.json` reescribe todo a `index.html` (SPA), así que un link compartido no da 404 al abrirlo directo.

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

### Deserialización

`parseColorsFromPath()` valida con regex **exclusivamente 6 bloques de 6 hex**; si el path no calza, se ignora y sigue el tema actual/por defecto:

```ts
const colorPattern =
  /^\/([a-fA-F0-9]{6})-([a-fA-F0-9]{6})-([a-fA-F0-9]{6})-([a-fA-F0-9]{6})-([a-fA-F0-9]{6})-([a-fA-F0-9]{6})$/;
```

Y un `useEffect` reactivo al `location.pathname` re-aplica el tema cada vez que la URL contiene una paleta (esto permite incluso cambiar de tema navegando entre URLs de paletas):

```ts
useEffect(() => {
  const colorsFromPath = parseColorsFromPath(location.pathname);
  if (colorsFromPath) setTheme(prev => ({ ...prev, ...colorsFromPath }));
}, [location.pathname]);
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

> Nota: cada invocación de `useThemeCustomization()` crea su propio estado (no es contexto global). En la práctica funciona porque `ThemeCustomizer` y las páginas montan el hook en el mismo árbol y el segundo `useEffect` escribe en `document.documentElement`, que es global por naturaleza. Si se quiere reutilizar en más lugares o sincronizar instancias, el paso natural es envolverlo en un Context/Provider.

---

## Resumen en una frase

**El mecanismo = estado React de un `ThemeConfig` → hex serializados como tripletas RGB crudas → `style.setProperty` sobre `<html>` → variables `--custom-*` consumidas por utilidades Tailwind `rgb(var(--custom-*))`, con el mismo tema serializable en la ruta `/<6hex>-...-<6hex>` para compartirlo.**