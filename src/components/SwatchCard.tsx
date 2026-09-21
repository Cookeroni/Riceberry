"use client";
import { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { type ColorRole, type Swatch, ROLE_LABELS } from "@/types/palette";

type Props = {
  role: ColorRole;
  swatch: Swatch;
  onChange: (hex: string) => void;
  onToggleLock: () => void;
};

export function SwatchCard({ role, swatch, onChange, onToggleLock }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyHex() {
    try {
      await navigator.clipboard.writeText(swatch.hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* clipboard may be blocked; fail quietly */
    }
  }

  return (
    <div className="relative rounded-lg border border-line bg-raised">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="block h-14 w-full rounded-t-lg"
        style={{ backgroundColor: swatch.hex }}
        aria-label={`Edit ${ROLE_LABELS[role]} color`}
      />

      <button
        type="button"
        onClick={onToggleLock}
        aria-pressed={swatch.locked}
        aria-label={swatch.locked ? "Unlock swatch" : "Lock swatch"}
        className="absolute right-1 top-1 rounded bg-black/40 px-1.5 py-0.5 text-xs"
      >
        {swatch.locked ? "🔒" : "🔓"}
      </button>

      <div className="px-2.5 py-2">
        <div className="text-xs font-medium text-fg">{ROLE_LABELS[role]}</div>
        <button
          type="button"
          onClick={copyHex}
          title="Click to copy"
          className="font-mono text-xs text-dim transition-colors hover:text-fg"
        >
          {copied ? "copied!" : swatch.hex}
        </button>
      </div>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-1 w-44 rounded-lg border border-line bg-raised p-2 shadow-xl shadow-black/40">
            <HexColorPicker color={swatch.hex} onChange={onChange} />
            <HexColorInput
              color={swatch.hex}
              onChange={onChange}
              prefixed
              className="mt-2 w-full rounded border border-line bg-ink px-2 py-1 font-mono text-sm text-fg"
            />
          </div>
        </>
      )}
    </div>
  );
}