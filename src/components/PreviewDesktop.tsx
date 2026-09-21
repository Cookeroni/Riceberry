"use client";
import { type CSSProperties } from "react";
import { type Palette, ROLE_ORDER } from "@/types/palette";
import { PreviewBar } from "./PreviewBar";
import { PreviewTerminal } from "./PreviewTerminal";

type Props = {
  palette: Palette;
  wallpaperSrc: string | null;
};

export function PreviewDesktop({ palette, wallpaperSrc }: Props) {
  const vars: CSSProperties = {};
  for (const role of ROLE_ORDER) {
    (vars as Record<string, string>)[`--rb-${role}`] = palette[role].hex;
  }

  return (
    <div
      style={vars}
      className="relative aspect-video min-h-[390px] w-full overflow-hidden rounded-xl border border-line shadow-xl shadow-black/40"
    >
      {/* wallpaper — or a themed solid background before any upload */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundColor: "var(--rb-background)",
          backgroundImage: wallpaperSrc ? `url("${wallpaperSrc}")` : undefined,
        }}
      />

      {/* content layer: bar in flow at top, terminal centered in the space below */}
      <div className="relative flex h-full flex-col">
        <PreviewBar />
        <div className="flex flex-1 items-center justify-center overflow-hidden p-4">
          <div className="w-[72%] max-w-md">
            <PreviewTerminal />
          </div>
        </div>
      </div>
    </div>
  );
}