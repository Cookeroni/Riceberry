// src/types/palette.ts

/** The six semantic color roles every theme is built from. */
export type ColorRole =
  | "background"
  | "foreground"
  | "primary"
  | "secondary"
  | "accent"
  | "muted";

/** A single color slot in the palette. */
export interface Swatch {
  /** Hex string, always "#rrggbb" (lowercase, no alpha). */
  hex: string;
  /** When true, re-extraction leaves this swatch untouched. */
  locked: boolean;
}

/** The whole theme: one swatch per role. This is the single source of truth. */
export type Palette = Record<ColorRole, Swatch>;

/** Stable order for rendering swatches in the UI and in exports. */
export const ROLE_ORDER: ColorRole[] = [
  "background",
  "foreground",
  "primary",
  "secondary",
  "accent",
  "muted",
];

/** Human-readable labels for the UI. */
export const ROLE_LABELS: Record<ColorRole, string> = {
  background: "Background",
  foreground: "Foreground",
  primary: "Primary",
  secondary: "Secondary",
  accent: "Accent",
  muted: "Muted",
};

/** Fallback palette shown before any image is loaded (Catppuccin Mocha-ish, so it looks intentional). */
export const DEFAULT_PALETTE: Palette = {
  background: { hex: "#1e1e2e", locked: false },
  foreground: { hex: "#cdd6f4", locked: false },
  primary:    { hex: "#89b4fa", locked: false },
  secondary:  { hex: "#f5c2e7", locked: false },
  accent:     { hex: "#a6e3a1", locked: false },
  muted:      { hex: "#6c7086", locked: false },
};