const WORKSPACES = [1, 2, 3, 4, 5];
const ACTIVE = 2;

export function PreviewBar() {
  return (
    <div
      className="flex items-center justify-between px-[1.1em] py-[0.5em] text-[1em] font-medium backdrop-blur-sm"
      style={{
        backgroundColor: "color-mix(in srgb, var(--rb-background) 78%, transparent)",
        color: "var(--rb-foreground)",
      }}
    >
      <div className="flex items-center gap-[0.4em]">
        {WORKSPACES.map((n) => {
          const active = n === ACTIVE;
          return (
            <span
              key={n}
              className="flex h-[1.6em] w-[1.6em] items-center justify-center rounded-full text-[0.85em]"
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

      <div className="font-semibold" style={{ color: "var(--rb-primary)" }}>
        14:32 · Mon 21
      </div>

      <div className="flex items-center gap-[0.7em] font-mono">
        <span style={{ color: "var(--rb-secondary)" }}>cpu 12%</span>
        <span style={{ color: "var(--rb-accent)" }}>ram 38%</span>
        <span style={{ color: "var(--rb-foreground)" }}>bat 89%</span>
      </div>
    </div>
  );
}