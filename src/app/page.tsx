"use client";
import { useEffect, useState } from "react";
import { type Palette, type ColorRole, DEFAULT_PALETTE } from "@/types/palette";
import { extractPalette, applyExtraction } from "@/lib/extract";
import { Uploader } from "@/components/Uploader";
import { PreviewDesktop } from "@/components/PreviewDesktop";
import { PaletteEditor } from "@/components/PaletteEditor";
import { ExportPanel } from "@/components/ExportPanel";

export default function Home() {
  const [palette, setPalette] = useState<Palette>(DEFAULT_PALETTE);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [regenerating, setRegenerating] = useState(false);

  useEffect(() => {
    return () => {
      if (imageSrc?.startsWith("blob:")) URL.revokeObjectURL(imageSrc);
    };
  }, [imageSrc]);

  function updateSwatch(role: ColorRole, hex: string) {
    setPalette((prev) => ({
      ...prev,
      [role]: { ...prev[role], hex: hex.toLowerCase() },
    }));
  }

  function toggleLock(role: ColorRole) {
    setPalette((prev) => ({
      ...prev,
      [role]: { ...prev[role], locked: !prev[role].locked },
    }));
  }

  async function regenerate() {
    // With an image: re-extract from it. Without one: restore the default.
    // Both paths respect locks (a locked swatch is never overwritten).
    if (imageSrc) {
      setRegenerating(true);
      try {
        const extracted = await extractPalette(imageSrc);
        setPalette((prev) => applyExtraction(prev, extracted));
      } finally {
        setRegenerating(false);
      }
    } else {
      setPalette((prev) => applyExtraction(prev, DEFAULT_PALETTE));
    }
  }

  return (
    <div className="flex min-h-full flex-col overflow-x-hidden">
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        {/* Header: title, description, upload — centered */}
        <header className="mx-auto max-w-xl text-center">
          <h1 className="font-mono text-3xl font-semibold tracking-tight sm:text-4xl">
            Rice<span className="text-berry">Berry</span>
          </h1>
          <p className="mt-2 text-sm text-dim">
            Berry good palettes, freshly picked from your wallpaper.
          </p>
          <div className="mt-6">
            <Uploader onPalette={setPalette} onImage={setImageSrc} />
          </div>
        </header>

        {/* Work area: preview (left, wide) + palette panel (right) */}
        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <section className="lg:col-span-3">
            <PreviewDesktop palette={palette} wallpaperSrc={imageSrc} />
          </section>

          <aside className="flex flex-col gap-5 rounded-xl border border-line bg-surface p-5 pt-3 lg:col-span-2">
            <PaletteEditor
              palette={palette}
              onUpdateSwatch={updateSwatch}
              onToggleLock={toggleLock}
              onRegenerate={regenerate}
              regenerating={regenerating}
            />
          </aside>
        </div>

        <section className="mt-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-berry">
                Export
          </h2>
          <ExportPanel palette={palette} />
        </section>

      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-xs text-dim">
          <span>Made By <span className="text-berry"><b>Cookeroni</b></span></span>

          <a
            href="https://github.com/cookeroni/riceberry"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Riceberry on GitHub"
            className="text-dim transition-colors hover:text-fg"
          >
            <svg
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}