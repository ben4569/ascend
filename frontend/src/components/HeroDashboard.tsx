import { useEffect, useState, type JSX } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { Compass, Flame, Target, TrendingUp, Zap } from "lucide-react";
import { cn } from "../lib/cn";

type Stat = {
  label: string;
  value: string;
  delta: string;
  icon: typeof Target;
  tone: "data" | "accent" | "neutral";
};

const STATS: readonly Stat[] = [
  { label: "First touch", value: "82", delta: "+6", icon: Target, tone: "data" },
  { label: "Stamina", value: "74", delta: "+3", icon: Flame, tone: "accent" },
  { label: "Decisions", value: "68", delta: "+9", icon: Zap, tone: "neutral" },
] as const;

const TREND: readonly number[] = [42, 46, 44, 51, 55, 53, 61, 66, 64, 72, 78] as const;
const RATING = 78;
const INSIGHT =
  "Your weak foot conversion dropped 12% under pressure. Add 3 constrained rondos this week.";

const TONE_STYLES: Record<Stat["tone"], string> = {
  data: "text-cyan-400",
  accent: "text-violet-400",
  neutral: "text-slate-300",
};

function RatingRing({ value }: { value: number }): JSX.Element {
  const reduce = useReducedMotion();
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const count = useMotionValue(reduce ? value : 0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (reduce) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 1.6, ease: "easeOut" });
    return () => controls.stop();
  }, [count, reduce, value]);

  return (
    <div className="relative grid h-32 w-32 shrink-0 place-items-center">
      <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="rgb(30 41 59)"
          strokeWidth="8"
        />
        <motion.circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: reduce ? circumference * (1 - value / 100) : circumference }}
          animate={{ strokeDashoffset: circumference * (1 - value / 100) }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="ringGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(139 92 246)" />
            <stop offset="100%" stopColor="rgb(34 211 238)" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute flex flex-col items-center">
        <motion.span className="text-4xl font-extrabold tabular-nums text-slate-50">
          {rounded}
        </motion.span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          Rating
        </span>
      </div>
    </div>
  );
}

function Sparkline(): JSX.Element {
  const reduce = useReducedMotion();
  const max = Math.max(...TREND);
  const min = Math.min(...TREND);
  const points = TREND.map((v, i) => {
    const x = (i / (TREND.length - 1)) * 100;
    const y = 40 - ((v - min) / (max - min)) * 34 - 3;
    return `${x},${y}`;
  });
  const path = `M ${points.join(" L ")}`;

  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-16 w-full">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(34 211 238)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="rgb(34 211 238)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${path} L 100,40 L 0,40 Z`}
        fill="url(#sparkFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 1.1, duration: 0.6 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke="rgb(34 211 238)"
        strokeWidth="1.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: reduce ? 0 : 0.5, duration: 1.4, ease: "easeInOut" }}
      />
    </svg>
  );
}

function InsightCard(): JSX.Element {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState<string>(reduce ? INSIGHT : "");

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(INSIGHT.slice(0, i));
      if (i >= INSIGHT.length) window.clearInterval(id);
    }, 22);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="rounded-xl border border-violet-500/25 bg-violet-500/[0.06] p-4">
      <div className="flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-violet-500/15">
          <Compass className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
        </span>
        <span className="text-[11px] font-bold uppercase tracking-widest text-violet-300">
          Compass AI
        </span>
      </div>
      <p className="mt-3 min-h-[3.5rem] text-sm leading-relaxed text-slate-300">
        {typed}
        {!reduce && typed.length < INSIGHT.length && (
          <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-violet-400" />
        )}
      </p>
    </div>
  );
}

export default function HeroDashboard(): JSX.Element {
  return (
    <div
      role="img"
      aria-label="Compass player dashboard showing an overall rating of 78, three attribute cards, a rising 11-week trend, and one Compass AI recommendation."
      className="mx-auto max-w-5xl"
    >
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-2 shadow-2xl shadow-slate-950/80 backdrop-blur-xl">
        {/* Window chrome */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
          </div>
          <div className="ml-2 flex-1 rounded-md border border-slate-800/70 bg-slate-950/60 px-3 py-1 text-[11px] text-slate-500">
            compass.app/players/aryan-j
          </div>
          <span className="hidden items-center gap-1.5 rounded-md bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-400 sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Live
          </span>
        </div>

        <div className="rounded-xl border border-slate-800/70 bg-slate-950/70 p-5 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[auto_1fr_20rem] lg:items-center">
            <div className="flex items-center gap-5">
              <RatingRing value={RATING} />
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                  Week 11
                </p>
                <h3 className="mt-1 truncate text-xl font-bold text-slate-50">
                  Aryan J.
                </h3>
                <p className="mt-0.5 text-sm text-slate-500">Midfielder · U19</p>
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                  <TrendingUp className="h-3 w-3" aria-hidden="true" />
                  +36 since week 1
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-4 transition-colors duration-200 hover:border-violet-500/40"
                  >
                    <div className="flex items-center justify-between">
                      <Icon
                        className={cn("h-4 w-4", TONE_STYLES[stat.tone])}
                        aria-hidden="true"
                      />
                      <span className="text-[11px] font-bold text-emerald-400">
                        {stat.delta}
                      </span>
                    </div>
                    <p className="mt-4 text-2xl font-bold tabular-nums text-slate-50">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}

              <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-4 sm:col-span-3">
                <div className="flex items-baseline justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                    Rating trend
                  </p>
                  <p className="text-xs font-medium text-cyan-400">11 weeks</p>
                </div>
                <Sparkline />
              </div>
            </div>

            <InsightCard />
          </div>
        </div>
      </div>
    </div>
  );
}