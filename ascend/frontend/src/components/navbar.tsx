
import { ArrowRight, TrendingUp } from "lucide-react";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
];

export default function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-slate-800/60 bg-[#090D16]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-500 shadow-lg shadow-violet-500/20">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>

          <span className="text-xl font-bold tracking-[0.2em] text-white">
            ASCEND
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-4 sm:gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="px-2 sm:px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white">
            Login
          </button>

          <button className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all hover:scale-[1.02] hover:shadow-violet-500/30">
            Start Ascending
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </nav>
  );
}