/**
 * Shareable-link helpers: hex validation, URL (de)serialisation and clipboard.
 *
 * Canonical format:  /templates/<id>?c=<primary>-<secondary>-<accent>-<text>-<bg>-<border>&f=<font>
 * Legacy format:     /<primary>-<secondary>-<accent>-<text>-<bg>-<border>   (still parsed)
 */

export type ColorKey =
  | 'primaryColor'
  | 'secondaryColor'
  | 'accentColor'
  | 'textColor'
  | 'backgroundColor'
  | 'borderColor';

export interface SharedTheme extends Partial<Record<ColorKey, string>> {
  fontFamily?: string;
}

/** Order of the colors inside the `c` param (and the legacy path). */
export const COLOR_ORDER: ColorKey[] = [
  'primaryColor',
  'secondaryColor',
  'accentColor',
  'textColor',
  'backgroundColor',
  'borderColor',
];

export const FONT_SLUGS: Record<string, string> = {
  Inter: 'inter',
  'Playfair Display': 'playfair',
  Roboto: 'roboto',
  'Open Sans': 'opensans',
};

const slugToFont = Object.fromEntries(Object.entries(FONT_SLUGS).map(([font, slug]) => [slug, font]));

/** Accepts `#abc`, `abc`, `#AABBCC`… and returns `#aabbcc`, or null when invalid. */
export const normalizeHex = (input: string): string | null => {
  const raw = input.trim().replace(/^#/, '').toLowerCase();
  if (/^[a-f\d]{3}$/.test(raw)) {
    return `#${raw[0]}${raw[0]}${raw[1]}${raw[1]}${raw[2]}${raw[2]}`;
  }
  if (/^[a-f\d]{6}$/.test(raw)) return `#${raw}`;
  return null;
};

const parseColorList = (value: string): Partial<Record<ColorKey, string>> | null => {
  const parts = value.split('-');
  if (parts.length !== COLOR_ORDER.length) return null;
  const result: Partial<Record<ColorKey, string>> = {};
  for (let i = 0; i < parts.length; i++) {
    if (!/^[a-f\d]{6}$/i.test(parts[i])) return null;
    result[COLOR_ORDER[i]] = normalizeHex(parts[i]) as string;
  }
  return result;
};

/** Legacy `/:colors` path. */
export const parseColorsFromPath = (pathname: string): SharedTheme | null =>
  parseColorList(pathname.replace(/^\//, ''));

/** Query string (with or without leading `?`) of a canonical share link. */
export const parseShareParams = (search: string): SharedTheme | null => {
  const params = new URLSearchParams(search);
  const colors = parseColorList(params.get('c') ?? '');
  if (!colors) return null;
  const font = slugToFont[(params.get('f') ?? '').toLowerCase()];
  return font ? { ...colors, fontFamily: font } : colors;
};

export const buildShareUrl = (
  theme: Record<ColorKey, string> & { fontFamily: string },
  templateId?: string
): string => {
  const c = COLOR_ORDER.map((key) => theme[key].replace('#', '').toLowerCase()).join('-');
  const f = FONT_SLUGS[theme.fontFamily] ?? FONT_SLUGS.Inter;
  const path = templateId ? `/templates/${templateId}` : '/templates';
  return `${window.location.origin}${path}?c=${c}&f=${f}`;
};

/** Extracts the template id when the current path is `/templates/:id`. */
export const templateIdFromPath = (pathname: string): string | undefined =>
  /^\/templates\/([^/]+)/.exec(pathname)?.[1];

/** Clipboard write with a legacy fallback for insecure contexts / older browsers. */
export const copyText = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(area);
      return ok;
    } catch {
      return false;
    }
  }
};

/**
 * Uses the native share sheet on touch devices, otherwise copies the link.
 * Resolves to what actually happened so callers can show feedback.
 */
export const shareLink = async (url: string): Promise<'shared' | 'copied' | 'cancelled' | 'failed'> => {
  const isTouch = window.matchMedia?.('(pointer: coarse)').matches;
  if (isTouch && typeof navigator.share === 'function') {
    try {
      await navigator.share({ title: 'Mi paleta en Colors', url });
      return 'shared';
    } catch (err) {
      if ((err as DOMException)?.name === 'AbortError') return 'cancelled';
    }
  }
  return (await copyText(url)) ? 'copied' : 'failed';
};
