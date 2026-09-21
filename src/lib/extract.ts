// src/lib/extract.ts
import { Vibrant } from "node-vibrant/browser";
import {
  type Palette,
  type ColorRole,
  ROLE_ORDER,
  DEFAULT_PALETTE,
} from "@/types/palette";

/**
 * Which named Vibrant swatch feeds each of our six roles.
 * node-vibrant returns: Vibrant, Muted, DarkVibrant, DarkMuted,
 * LightVibrant, LightMuted — each of which may be null for a given image.
 * This mapping targets a dark ricing theme (dark base, light text).
 */
const ROLE_TO_SWATCH: Record<ColorRole, string> = {
  background: "DarkMuted",
  foreground: "LightMuted",
  primary: "Vibrant",
  secondary: "DarkVibrant",
  accent: "LightVibrant",
  muted: "Muted",
};

/** Normalize any hex to lowercase "#rrggbb" to match the Swatch contract. */
function normalizeHex(hex: string): string {
  return hex.trim().toLowerCase();
}

/**
 * Extract a fresh palette from an image source (URL or same-origin path).
 * Every returned swatch is unlocked. Missing Vibrant swatches fall back
 * to the corresponding DEFAULT_PALETTE color so we always return all 6 roles.
 */
export async function extractPalette(src: string): Promise<Palette> {
  const vibrantPalette = await Vibrant.from(src).getPalette();

  // Build up the result role by role so the output is always complete.
  const result = {} as Palette;
  for (const role of ROLE_ORDER) {
    const swatchName = ROLE_TO_SWATCH[role];
    const swatch = vibrantPalette[swatchName];
    result[role] = {
      hex: swatch ? normalizeHex(swatch.hex) : DEFAULT_PALETTE[role].hex,
      locked: false,
    };
  }
  return result;
}

/**
 * Merge a fresh extraction into the current palette, preserving locked swatches.
 * Use this for the "re-extract / regenerate" button so locks are respected.
 */
export function applyExtraction(current: Palette, extracted: Palette): Palette {
  const result = {} as Palette;
  for (const role of ROLE_ORDER) {
    result[role] = current[role].locked
      ? current[role] // locked: keep exactly as-is
      : { hex: extracted[role].hex, locked: false };
  }
  return result;
}