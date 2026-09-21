"use client";
import { useRef, useState } from "react";
import { extractPalette } from "@/lib/extract";
import { type Palette } from "@/types/palette";

const MAX_BYTES = 15 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

type Props = {
  onPalette: (p: Palette) => void;
  onImage: (src: string) => void;
};

export function Uploader({ onPalette, onImage }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError(null);
    if (!ACCEPTED.includes(file.type)) {
      setError("Use a JPEG, PNG, or WebP image.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("That image is over 15 MB. Try a smaller one.");
      return;
    }
    const src = URL.createObjectURL(file);
    onImage(src);
    setBusy(true);
    try {
      onPalette(await extractPalette(src));
    } catch {
      setError("Couldn't read colors from that image.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
        className="cursor-pointer rounded-lg border-2 border-dashed border-line bg-surface/40 px-6 py-8 text-sm text-dim transition-colors hover:border-berry/60 hover:text-berry"
      >
        {busy ? "Reading colors…" : "Click or drop a wallpaper"}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}