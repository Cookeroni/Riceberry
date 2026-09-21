"use client";
import { useMemo, useState } from "react";
import { type Palette } from "@/types/palette";
import { EXPORT_FORMATS } from "@/lib/exporters";

export function ExportPanel({ palette }: { palette: Palette }) {
  const [activeId, setActiveId] = useState(EXPORT_FORMATS[0].id);
  const [copied, setCopied] = useState(false);

  const active = EXPORT_FORMATS.find((f) => f.id === activeId) ?? EXPORT_FORMATS[0];
  const output = useMemo(() => active.generate(palette), [active, palette]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* clipboard may be blocked; fail quietly */
    }
  }

  function download() {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = active.filename;
    a.click();
    URL.revokeObjectURL(url); // Blob URLs must be revoked or they leak
  }

  return (
    <div className="rounded-xl border border-line bg-surface">
      <div className="flex flex-wrap gap-1 border-b border-line p-2">
        {EXPORT_FORMATS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActiveId(f.id)}
            className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
              f.id === activeId ? "bg-raised text-fg" : "text-dim hover:text-fg"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between px-4 py-2">
        <span className="font-mono text-xs text-dim">{active.filename}</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={copy}
            className="rounded-md border border-line px-3 py-1.5 text-xs text-dim transition-colors hover:border-accent/50 hover:text-fg"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            type="button"
            onClick={download}
            className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-ink transition-opacity hover:opacity-90"
          >
            Download
          </button>
        </div>
      </div>

      <pre className="max-h-80 overflow-auto border-t border-line bg-ink px-4 py-3 font-mono text-xs leading-relaxed text-fg">
        {output}
      </pre>
    </div>
  );
}