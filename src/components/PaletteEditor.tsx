import { type Palette, type ColorRole, ROLE_ORDER } from "@/types/palette";
import { SwatchCard } from "./SwatchCard";

type Props = {
  palette: Palette;
  onUpdateSwatch: (role: ColorRole, hex: string) => void;
  onToggleLock: (role: ColorRole) => void;
  onRegenerate: () => void;
  regenerating: boolean;
};

export function PaletteEditor({
  palette,
  onUpdateSwatch,
  onToggleLock,
  onRegenerate,
  regenerating,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-berry">
          Palette
        </h2>
        <button suppressHydrationWarning
          type="button"
          onClick={onRegenerate}
          disabled={regenerating}
          className="rounded-md border border-line px-3 py-1.5 text-xs text-dim transition-colors hover:border-accent/50 hover:text-fg disabled:cursor-not-allowed disabled:opacity-40"
        >
          {regenerating ? "Resetting…" : "Reset"}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {ROLE_ORDER.map((role) => (
          <SwatchCard
            key={role}
            role={role}
            swatch={palette[role]}
            onChange={(hex) => onUpdateSwatch(role, hex)}
            onToggleLock={() => onToggleLock(role)}
          />
        ))}
      </div>
    </div>
  );
}