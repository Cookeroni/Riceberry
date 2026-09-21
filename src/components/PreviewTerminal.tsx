import { ROLE_ORDER } from "@/types/palette";

const INFO: [string, string][] = [
  ["OS", "Arch Linux x86_64"],
  ["Kernel", "6.9.3-arch1-1"],
  ["Uptime", "3 hours, 12 mins"],
  ["Packages", "847 (pacman)"],
  ["Shell", "zsh 5.9"],
  ["WM", "Zenplify"],
  ["Terminal", "kitty"],
  ["CPU", "AMD Ryzen 5 5600"],
  ["Memory", "3891MiB / 15997MiB"],
];

const LOGO = ` 
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣷⣤⣙⢻⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⡿⠛⠛⠿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠙⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⠿⣆⠀⠀⠀⠀
⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀
⠀⢀⣾⣿⣿⠿⠟⠛⠋⠉⠉⠀⠀⠀⠀⠀⠀⠉⠉⠙⠛⠻⠿⣿⣿⣷⡀⠀
⣠⠟⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⣄

`;

export function PreviewTerminal() {
  return (
    <div
      className="overflow-hidden rounded-lg border shadow-xl backdrop-blur-md"
      style={{
        backgroundColor: "color-mix(in srgb, var(--rb-background) 88%, transparent)",
        borderColor: "color-mix(in srgb, var(--rb-foreground) 20%, transparent)",
      }}
    >
      {/* title bar */}
      <div
        className="flex items-center gap-1.5 px-2 py-1"
        style={{ backgroundColor: "color-mix(in srgb, var(--rb-background) 95%, transparent)" }}
      >
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--rb-primary)" }} />
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--rb-accent)" }} />
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--rb-secondary)" }} />
        <span className="ml-2 text-[9px]" style={{ color: "var(--rb-muted)" }}>
          rice@berry: ~
        </span>
      </div>

      {/* body */}
      <div className="flex gap-3 p-3 font-mono text-[9px] leading-snug sm:text-[10px]">
        <pre className="whitespace-pre" style={{ color: "var(--rb-accent)" }}>
          {LOGO}
        </pre>

        <div style={{ color: "var(--rb-foreground)" }}>
          <div>
            <span style={{ color: "var(--rb-primary)" }}>rice</span>
            <span>@</span>
            <span style={{ color: "var(--rb-accent)" }}>berry</span>
          </div>
          <div style={{ color: "var(--rb-muted)" }}>-----------</div>

          {INFO.map(([k, v]) => (
            <div key={k}>
              <span style={{ color: "var(--rb-primary)" }}>{k}</span>
              <span style={{ color: "var(--rb-muted)" }}>: </span>
              <span>{v}</span>
            </div>
          ))}

          {/* color test row — one block per role, the clearest live-retheme demo */}
          <div className="mt-1.5 flex gap-1">
            {ROLE_ORDER.map((role) => (
              <span
                key={role}
                className="h-2.5 w-3.5 rounded-sm"
                style={{ backgroundColor: `var(--rb-${role})` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}