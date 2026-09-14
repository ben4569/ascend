import { useEffect, useState, type JSX } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Compass, Menu, X } from "lucide-react";
import { cn } from "../lib/cn";

type NavLink = {
  label: string;
  href: string;
};

const NAV_LINKS: readonly NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Compass AI", href: "#compass-ai" },
  { label: "Pricing", href: "#pricing" },
] as const;

export default function Navbar(): JSX.Element {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:text-slate-50"
      >
        Skip to content
      </a>

      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6"
      >
        <a
          href="#"
          className="group flex items-center gap-2 rounded-lg text-slate-50"
          aria-label="ASCEND home"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-slate-800 bg-slate-900/80 transition-colors duration-200 group-hover:border-violet-500/50">
            <Compass className="h-4 w-4 text-violet-400" aria-hidden="true" />
          </span>
          <span className="text-[15px] font-bold tracking-tight">ASCEND</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors duration-150 hover:text-slate-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <motion.a
            href="#login"
            whileTap={{ scale: 0.98 }}
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition-colors duration-150 hover:bg-slate-900/70 hover:text-slate-50"
          >
            Log in
          </motion.a>
          <motion.a
            href="/signup"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-950/50 transition-colors duration-150 hover:bg-violet-500"
          >
            Get started
          </motion.a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 place-items-center rounded-xl border border-slate-800/80 bg-slate-900/60 text-slate-300 transition-colors duration-150 hover:border-violet-500/40 hover:text-slate-50 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-t border-slate-800/60 bg-slate-950/95 backdrop-blur-xl md:hidden"
          >
            <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-slate-300 transition-colors duration-150 hover:bg-slate-900/80 hover:text-slate-50"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="mt-3 flex flex-col gap-2">
                <a
                  href="#login"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-slate-800/80 px-4 py-3 text-center text-sm font-medium text-slate-200"
                >
                  Log in
                </a>
                <a
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-violet-600 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Get started
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}