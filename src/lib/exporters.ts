import { type Palette, ROLE_ORDER } from "@/types/palette";

export type ExportFormat = {
  id: string;
  label: string;
  filename: string;
  generate: (palette: Palette) => string;
};

/** strip a leading "#" — some formats want bare hex */
const bare = (hex: string) => hex.replace(/^#/, "");

// ---------- generators (each is a pure palette → string) ----------

function toCss(p: Palette): string {
  const lines = ROLE_ORDER.map((r) => `  --${r}: ${p[r].hex};`);
  return `:root {\n${lines.join("\n")}\n}\n`;
}

function toJson(p: Palette): string {
  const obj: Record<string, string> = {};
  for (const r of ROLE_ORDER) obj[r] = p[r].hex;
  return JSON.stringify(obj, null, 2) + "\n";
}

function toHyprland(p: Palette): string {
  const lines = ROLE_ORDER.map((r) => `$${r} = rgb(${bare(p[r].hex)})`);
  return (
    "# Riceberry palette for Hyprland\n" +
    "# Use like: col.active_border = $primary\n" +
    lines.join("\n") +
    "\n"
  );
}

function toKitty(p: Palette): string {
  return `# Riceberry palette for kitty
background            ${p.background.hex}
foreground            ${p.foreground.hex}
cursor                ${p.foreground.hex}
cursor_text_color     ${p.background.hex}
selection_background  ${p.primary.hex}
selection_foreground  ${p.background.hex}
url_color             ${p.accent.hex}
active_border_color   ${p.primary.hex}
inactive_border_color ${p.muted.hex}
`;
}

function toAlacritty(p: Palette): string {
  // NB: Alacritty's own "[colors.primary]" means base bg/fg —
  // unrelated to this palette's `primary` role.
  return `# Riceberry palette for Alacritty (alacritty.toml)
[colors.primary]
background = "${p.background.hex}"
foreground = "${p.foreground.hex}"

[colors.cursor]
cursor = "${p.foreground.hex}"
text = "${p.background.hex}"

[colors.selection]
background = "${p.primary.hex}"
text = "${p.background.hex}"
`;
}

function toZenplify(p: Palette): string {
  // Structural + text colors are themed from the palette.
  // `primary` has no Zenplify slot; it stays in the CSS/JSON exports.
  return `pragma Singleton
import Quickshell
import QtQuick

Singleton {
    readonly property string fontFamily: "Terminess Nerd Font Propo"

    readonly property color pillBg:        "${p.background.hex}"

    readonly property color textPrimary:   "${p.foreground.hex}"
    readonly property color textMuted:     "${p.muted.hex}"
    readonly property color textSecondary: "${p.secondary.hex}"
    readonly property color textAccent:    "${p.accent.hex}"
}
`;
}

// ---------- registry: add a format = add a line here ----------

export const EXPORT_FORMATS: ExportFormat[] = [
  { id: "css",       label: "CSS",              filename: "riceberry.css",            generate: toCss },
  { id: "json",      label: "JSON",             filename: "riceberry.json",           generate: toJson },
  { id: "qml",       label: "Quickshell (QML)", filename: "Theme.qml",                generate: toZenplify },
  { id: "hyprland",  label: "Hyprland",         filename: "riceberry.conf",           generate: toHyprland },
  { id: "kitty",     label: "kitty",            filename: "riceberry-kitty.conf",     generate: toKitty },
  { id: "alacritty", label: "Alacritty",        filename: "riceberry-alacritty.toml", generate: toAlacritty },
];