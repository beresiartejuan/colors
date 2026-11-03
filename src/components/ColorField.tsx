import React, { useEffect, useState } from 'react';
import { normalizeHex } from '@/lib/shareLink';
import { cn } from '@/lib/utils';

interface ColorFieldProps {
  label: string;
  value: string;
  onChange: (hex: string) => void;
  swatchClassName?: string;
  inputClassName?: string;
}

/**
 * Color picker + hex text input. The text is kept as a local draft so partial
 * typing is allowed; only valid hex values (3 or 6 digits) reach the theme.
 */
const ColorField: React.FC<ColorFieldProps> = ({ label, value, onChange, swatchClassName, inputClassName }) => {
  const [draft, setDraft] = useState(value);

  useEffect(() => setDraft(value), [value]);

  const invalid = normalizeHex(draft) === null;

  const handleText = (text: string) => {
    setDraft(text);
    const hex = normalizeHex(text);
    if (hex) onChange(hex);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        aria-label={`Selector de color ${label.toLowerCase()}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn('h-8 w-10 md:w-12 rounded border border-custom-border cursor-pointer flex-shrink-0', swatchClassName)}
      />
      <input
        type="text"
        aria-label={`Código hexadecimal ${label.toLowerCase()}`}
        aria-invalid={invalid}
        value={draft}
        spellCheck={false}
        onChange={(e) => handleText(e.target.value)}
        onBlur={() => setDraft(value)}
        className={cn(
          'flex-1 min-w-0 px-3 py-1 text-sm border rounded bg-custom-bg text-custom-text focus:outline-none focus:ring-2',
          invalid
            ? 'border-destructive focus:ring-destructive/40'
            : 'border-custom-border focus:ring-custom-primary/50',
          inputClassName
        )}
      />
    </div>
  );
};

export default ColorField;
