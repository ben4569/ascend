import type { JSX } from "react";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Compass AI", href: "#compass-ai" },
  ],
  Explore: [
    { label: "Why ASCND", href: "#why-ascnd" },
    { label: "Get started", href: "/signup" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;

export default function Footer(): JSX.Element {
  return (
    <footer className="border-t border-slate-900 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <a
              href="/"
              className="inline-flex items-center gap-2"
              aria-label="ASCND home"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md border border-cyan-400/20 bg-cyan-400/5 font-mono text-[10px] font-black text-cyan-400">
                A
              </span>

              <span className="text-xs font-black tracking-[0.2em] text-slate-100">
                ASCND
              </span>
            </a>

            <p className="mt-3 text-xs leading-5 text-slate-600">
              A personal progression system for turning ambitious goals into
              consistent action.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-3 gap-10 sm:gap-16">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
                  {title}
                </h3>

                <ul className="mt-3 space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-xs text-slate-500 transition-colors hover:text-slate-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-slate-900 pt-5 text-[10px] text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} ASCND. All rights reserved.
          </p>

          <p className="font-mono uppercase tracking-[0.15em]">
            Built for progress.
          </p>
        </div>
      </div>
    </footer>
  );
}