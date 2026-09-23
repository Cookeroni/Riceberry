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
      className="overflow-hidden rounded-[0.6em] border shadow-xl backdrop-blur-md text-[0.9em]"
      style={{
        backgroundColor: "color-mix(in srgb, var(--rb-background) 88%, transparent)",
        borderColor: "color-mix(in srgb, var(--rb-foreground) 20%, transparent)",
      }}
    >
      <div
        className="flex items-center gap-[0.5em] px-[0.7em] py-[0.4em]"
        style={{ backgroundColor: "color-mix(in srgb, var(--rb-background) 95%, transparent)" }}
      >
        <span className="h-[0.7em] w-[0.7em] rounded-full" style={{ backgroundColor: "var(--rb-primary)" }} />
        <span className="h-[0.7em] w-[0.7em] rounded-full" style={{ backgroundColor: "var(--rb-accent)" }} />
        <span className="h-[0.7em] w-[0.7em] rounded-full" style={{ backgroundColor: "var(--rb-secondary)" }} />
        <span className="ml-[0.5em] text-[0.85em]" style={{ color: "var(--rb-muted)" }}>
          rice@berry: ~
        </span>
      </div>

      <div className="flex gap-[1.1em] p-[1.1em] font-mono leading-snug">
        <pre className="whitespace-pre text-[0.8em] leading-none" style={{ color: "var(--rb-accent)" }}>
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

          <div className="mt-[0.5em] flex gap-[0.4em]">
            {ROLE_ORDER.map((role) => (
              <span
                key={role}
                className="h-[0.95em] w-[1.3em] rounded-[0.2em]"
                style={{ backgroundColor: `var(--rb-${role})` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}