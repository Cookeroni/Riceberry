"use client";
import { type CSSProperties } from "react";
import { type Palette, ROLE_ORDER } from "@/types/palette";
import { PreviewBar } from "./PreviewBar";
import { PreviewTerminal } from "./PreviewTerminal";

type Props = { palette: Palette; wallpaperSrc: string | null };

export function PreviewDesktop({ palette, wallpaperSrc }: Props) {
  const vars: CSSProperties = {};
  for (const role of ROLE_ORDER) {
    (vars as Record<string, string>)[`--rb-${role}`] = palette[role].hex;
  }

  return (
    <div
      style={vars}
      className="@container relative aspect-video min-h-[200px] w-full overflow-hidden rounded-xl border border-line shadow-xl shadow-black/40 sm:min-h-[340px]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundColor: "var(--rb-background)",
          backgroundImage: wallpaperSrc ? `url("${wallpaperSrc}")` : undefined,
        }}
      />
      {/* This one value drives the whole mock's scale: base font-size in cqi,
          floored/capped so it stays sane at extremes. Every child sizes in em. */}
      <div className="relative flex h-full flex-col text-[clamp(6.5px,1.7cqi,11px)]">
        <PreviewBar />
        <div className="flex flex-1 items-center justify-center overflow-hidden p-[1.4em]">
          <div className="w-[82%]">
            <PreviewTerminal />
          </div>
        </div>
      </div>
    </div>
  );
}