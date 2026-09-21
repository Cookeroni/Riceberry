const WORKSPACES = [1, 2, 3, 4, 5];
const ACTIVE = 2;

export function PreviewBar() {
  return (
    <div
      className="flex items-center justify-between px-3 py-1.5 text-[10px] font-medium backdrop-blur-sm sm:text-xs"
      style={{
        backgroundColor: "color-mix(in srgb, var(--rb-background) 78%, transparent)",
        color: "var(--rb-foreground)",
      }}
    >
      {/* workspaces */}
      <div className="flex items-center gap-1">
        {WORKSPACES.map((n) => {
          const active = n === ACTIVE;
          return (
            <span
              key={n}
              className="flex h-4 w-4 items-center justify-center rounded-full"
              style={
                active
                  ? { backgroundColor: "var(--rb-accent)", color: "var(--rb-background)" }
                  : { color: "var(--rb-muted)" }
              }
            >
              {n}
            </span>
          );
        })}
      </div>

      {/* clock */}
      <div className="font-semibold" style={{ color: "var(--rb-primary)" }}>
        14:32 · Mon 21
      </div>

      {/* indicators */}
      <div className="flex items-center gap-2 font-mono">
        <span style={{ color: "var(--rb-secondary)" }}>cpu 12%</span>
        <span style={{ color: "var(--rb-accent)" }}>ram 38%</span>
        <span style={{ color: "var(--rb-foreground)" }}>bat 89%</span>
      </div>
    </div>
  );
}