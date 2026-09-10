import { useState, type JSX } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  Check,
  Dumbbell,
  Flame,
  Gauge,
  ShieldCheck,
  Smartphone,
  Trophy,
  Users,
  Video,
  Watch,
} from "lucide-react";
import { Reveal, Section, SectionHeading } from "./ui/section";
import { cn } from "../lib/cn";

type FocusKey = "technical" | "physical" | "tactical";

type Focus = {
  key: FocusKey;
  label: string;
  icon: typeof Gauge;
  projected: number;
  bars: readonly number[];
  caption: string;
};

const FOCUSES: readonly Focus[] = [
  {
    key: "technical",
    label: "Technical",
    icon: Gauge,
    projected: 86,
    bars: [58, 64, 61, 70, 76, 81, 86],
    caption: "Weak-foot drills and constrained rondos, 4x weekly.",
  },
  {
    key: "physical",
    label: "Physical",
    icon: Dumbbell,
    projected: 81,
    bars: [55, 59, 66, 68, 72, 77, 81],
    caption: "Repeat-sprint blocks with 48h recovery gaps.",
  },
  {
    key: "tactical",
    label: "Tactical",
    icon: Activity,
    projected: 89,
    bars: [52, 60, 67, 72, 79, 84, 89],
    caption: "Film review on scanning frequency before receiving.",
  },
] as const;

const CONSISTENCY: readonly { day: string; value: number }[] = [
  { day: "M", value: 72 },
  { day: "T", value: 88 },
  { day: "W", value: 45 },
  { day: "T", value: 94 },
  { day: "F", value: 66 },
  { day: "S", value: 100 },
  { day: "S", value: 38 },
] as const;

const BENCHMARKS: readonly { label: string; you: number; peers: number }[] = [
  { label: "Pass completion", you: 84, peers: 71 },
  { label: "Duels won", you: 62, peers: 68 },
  { label: "Distance covered", you: 91, peers: 74 },
] as const;

const SOURCES: readonly { label: string; icon: typeof Watch }[] = [
  { label: "Wearables", icon: Watch },
  { label: "Match film", icon: Video },
  { label: "Phone logs", icon: Smartphone },
  { label: "Coach notes", icon: Users },
  { label: "Private by default", icon: ShieldCheck },
] as const;

type CellProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

function Cell({ children, className, delay = 0 }: CellProps): JSX.Element {
  return (
    <Reveal delay={delay} className={cn("h-full", className)}>
      <motion.article
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-violet-500/40"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-600/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="relative flex h-full flex-col">{children}</div>
      </motion.article>
    </Reveal>
  );
}

function CellTitle({ title, body }: { title: string; body: string }): JSX.Element {
  return (
    <>
      <h3 className="text-lg font-bold text-slate-50">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{body}</p>
    </>
  );
}

function AttributeLab(): JSX.Element {
  const [active, setActive] = useState<FocusKey>("technical");
  const focus = FOCUSES.find((f) => f.key === active) ?? FOCUSES[0];

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <CellTitle
          title="Model the next 8 weeks"
          body="Pick a focus and see the projected rating before you commit a single session."
        />
      </div>

      <div
        role="tablist"
        aria-label="Training focus"
        className="mt-6 inline-flex flex-wrap gap-1 rounded-xl border border-slate-800/80 bg-slate-950/60 p-1"
      >
        {FOCUSES.map((f) => {
          const Icon = f.icon;
          const selected = f.key === active;
          return (
            <motion.button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(f.key)}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors duration-200",
                selected
                  ? "bg-violet-600 text-white"
                  : "text-slate-400 hover:text-slate-100",
              )}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {f.label}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-1 items-end gap-6">
        <div className="flex-1">
          <div className="flex h-32 items-end gap-2" aria-hidden="true">
            {focus.bars.map((value, i) => (
              <motion.div
                key={`${focus.key}-${i}`}
                initial={{ height: 0 }}
                animate={{ height: `${value}%` }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: "easeOut" }}
                className={cn(
                  "flex-1 rounded-t-md",
                  i === focus.bars.length - 1
                    ? "bg-gradient-to-t from-violet-600 to-cyan-400"
                    : "bg-slate-700/70",
                )}
              />
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">{focus.caption}</p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Projected
          </p>
          <motion.p
            key={focus.projected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="text-5xl font-extrabold tabular-nums text-slate-50"
          >
            {focus.projected}
          </motion.p>
          <p className="mt-1 text-xs font-semibold text-emerald-400">
            +{focus.projected - 78} pts
          </p>
        </div>
      </div>
    </>
  );
}

export default function BentoFeatures(): JSX.Element {
  return (
    <Section id="features" labelledBy="features-heading">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[900px] -translate-x-1/2 rounded-full bg-violet-700/10 blur-3xl"
      />

      <SectionHeading
        id="features-heading"
        eyebrow="The system"
        title={
          <>
            Everything you need to
            <br className="hidden sm:block" /> train with intent
          </>
        }
        subtitle="Six connected surfaces that turn raw effort into a measurable, honest picture of your game."
      />

      <div className="mt-16 grid auto-rows-auto grid-cols-1 gap-4 md:grid-cols-2 lg:grid-flow-row-dense lg:grid-cols-3 lg:auto-rows-[minmax(0,13.5rem)]">
        <Cell className="md:col-span-2 lg:col-span-2 lg:row-span-2">
          <AttributeLab />
        </Cell>

        <Cell delay={0.05}>
          <Flame className="h-5 w-5 text-violet-400" aria-hidden="true" />
          <div className="mt-4">
            <CellTitle
              title="Consistency streak"
              body="Volume lies. Rhythm doesn't."
            />
          </div>
          <div className="mt-auto flex items-end justify-between gap-1.5 pt-6" aria-hidden="true">
            {CONSISTENCY.map((d, i) => (
              <div key={`${d.day}-${i}`} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-16 w-full items-end rounded bg-slate-800/50">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${d.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.05 * i, ease: "easeOut" }}
                    className="w-full rounded bg-gradient-to-t from-violet-700 to-violet-400"
                  />
                </div>
                <span className="text-[10px] font-medium text-slate-600">{d.day}</span>
              </div>
            ))}
          </div>
        </Cell>

        <Cell delay={0.1}>
          <Trophy className="h-5 w-5 text-cyan-400" aria-hidden="true" />
          <div className="mt-4">
            <CellTitle title="Earned, not given" body="Badges unlock on verified evidence only." />
          </div>
          <ul className="mt-auto space-y-2 pt-6">
            {["Two-footed", "90th percentile stamina", "12-week streak"].map((badge, i) => (
              <li
                key={badge}
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium",
                  i === 2
                    ? "border-slate-800/60 text-slate-600"
                    : "border-violet-500/25 bg-violet-500/[0.06] text-slate-200",
                )}
              >
                {i === 2 ? (
                  <span className="h-3 w-3 rounded-full border border-slate-700" aria-hidden="true" />
                ) : (
                  <Check className="h-3 w-3 text-violet-400" aria-hidden="true" />
                )}
                {badge}
              </li>
            ))}
          </ul>
        </Cell>

        <Cell delay={0.15} className="md:col-span-2 lg:col-span-2">
          <BarChart3 className="h-5 w-5 text-cyan-400" aria-hidden="true" />
          <div className="mt-4">
            <CellTitle
              title="Benchmarked against your level"
              body="Percentile context from players in your age band and position — including where you're behind."
            />
          </div>
          <ul className="mt-auto space-y-3 pt-6">
            {BENCHMARKS.map((b, i) => (
              <li key={b.label}>
                <div className="flex items-baseline justify-between text-xs">
                  <span className="font-medium text-slate-300">{b.label}</span>
                  <span
                    className={cn(
                      "font-bold tabular-nums",
                      b.you >= b.peers ? "text-cyan-400" : "text-amber-400",
                    )}
                  >
                    {b.you}
                    <span className="ml-1.5 font-medium text-slate-600">vs {b.peers}</span>
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-800/70">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${b.you}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.08 * i, ease: "easeOut" }}
                    className={cn(
                      "h-full rounded-full",
                      b.you >= b.peers ? "bg-cyan-400" : "bg-amber-400",
                    )}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Cell>

        <Cell delay={0.2}>
          <Gauge className="h-5 w-5 text-violet-400" aria-hidden="true" />
          <div className="mt-4">
            <CellTitle title="Load guardrails" body="Flags overtraining before your body does." />
          </div>
          <div className="mt-auto pt-6">
            <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.06] p-3">
              <p className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
                Caution
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                Acute load 38% above your 4-week baseline. Take a deload day.
              </p>
            </div>
          </div>
        </Cell>

        <Cell delay={0.25} className="md:col-span-2 lg:col-span-3 lg:row-span-1">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-sm">
              <CellTitle
                title="Plugs into what you already use"
                body="No manual spreadsheets. Connect a source once and it keeps flowing."
              />
            </div>
            <ul className="flex flex-wrap gap-2">
              {SOURCES.map((s) => {
                const Icon = s.icon;
                return (
                  <li
                    key={s.label}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-800/80 bg-slate-950/60 px-3 py-2 text-xs font-medium text-slate-300 transition-colors duration-200 hover:border-violet-500/40 hover:text-slate-50"
                  >
                    <Icon className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                    {s.label}
                  </li>
                );
              })}
            </ul>
          </div>
        </Cell>
      </div>
    </Section>
  );
}