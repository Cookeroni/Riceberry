import { type Palette, ROLE_ORDER, ROLE_LABELS } from "@/types/palette";

export function PaletteDisplay({ palette }: { palette: Palette }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {ROLE_ORDER.map((role) => {
        const { hex } = palette[role];
        return (
          <div key={role} className="overflow-hidden rounded-lg border border-neutral-200">
            <div className="h-16 w-full" style={{ backgroundColor: hex }} />
            <div className="px-3 py-2 text-sm">
              <div className="font-medium">{ROLE_LABELS[role]}</div>
              <div className="font-mono text-neutral-500">{hex}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}