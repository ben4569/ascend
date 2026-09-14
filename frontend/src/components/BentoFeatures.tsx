
import { useState, type JSX } from "react";
import {
  ArrowUpRight,
  Brain,
  Check,
  Code2,
  Flame,
  Gauge,
  GraduationCap,
  ListChecks,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { Reveal, Section, SectionHeading } from "./ui/section";
import { cn } from "../lib/cn";

type FocusKey = "study" | "fitness" | "coding";

type Focus = {
  key: FocusKey;
  label: string;
  icon: typeof GraduationCap;
  progress: number;
  bars: readonly number[];
  caption: string;
};

const FOCUSES: readonly Focus[] = [
  {
    key: "study",
    label: "Study",
    icon: GraduationCap,
    progress: 78,
    bars: [42, 48, 51, 59, 63, 71, 78],
    caption: "Consistent deep-work sessions are moving your goal forward.",
  },
  {
    key: "fitness",
    label: "Fitness",
    icon: Gauge,
    progress: 64,
    bars: [38, 44, 47, 53, 56, 61, 64],
    caption: "Small daily actions are building a stronger baseline.",
  },
  {
    key: "coding",
    label: "Coding",
    icon: Code2,
    progress: 86,
    bars: [46, 52, 58, 64, 69, 77, 86],
    caption: "Projects and deliberate practice are compounding quickly.",
  },
];

const MOMENTUM: readonly { day: string; value: number }[] = [
  { day: "M", value: 72 },
  { day: "T", value: 88 },
  { day: "W", value: 56 },
  { day: "T", value: 94 },
  { day: "F", value: 76 },
  { day: "S", value: 100 },
  { day: "S", value: 84 },
];

const PROGRESS: readonly {
  label: string;
  value: number;
  change: string;
}[] = [
  { label: "Study consistency", value: 82, change: "+14%" },
  { label: "Goals completed", value: 67, change: "+21%" },
  { label: "Habit strength", value: 74, change: "+9%" },
];

const SYSTEMS: readonly {
  label: string;
  icon: typeof ListChecks;
}[] = [
  { label: "Goals", icon: Target },
  { label: "Habits", icon: ListChecks },
  { label: "Tasks", icon: Check },
  { label: "Progress", icon: TrendingUp },
  { label: "AI guidance", icon: Brain },
];

type CellProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

function Cell({
  children,
  className,
  delay = 0,
}: CellProps): JSX.Element {
  return (
    <Reveal delay={delay} className={cn("h-full", className)}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-violet-500/40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-600/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="relative flex h-full flex-col">
          {children}
        </div>
      </article>
    </Reveal>
  );
}

function CellTitle({
  title,
  body,
}: {
  title: string;
  body: string;
}): JSX.Element {
  return (
    <>
      <h3 className="text-lg font-bold text-slate-50">{title}</h3>

      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        {body}
      </p>
    </>
  );
}

function RoadmapPreview(): JSX.Element {
  const [active, setActive] = useState<FocusKey>("study");

  const focus =
    FOCUSES.find((item) => item.key === active) ?? FOCUSES[0];

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <CellTitle
            title="Build your roadmap"
            body="ASCND turns your goals into a practical system you can actually follow."
          />
        </div>

        <div className="hidden rounded-lg border border-violet-500/20 bg-violet-500/[0.06] p-2 sm:block">
          <Sparkles
            className="h-4 w-4 text-violet-400"
            aria-hidden="true"
          />
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Roadmap focus"
        className="mt-6 inline-flex max-w-full flex-wrap gap-1 rounded-xl border border-slate-800/80 bg-slate-950/60 p-1"
      >
        {FOCUSES.map((item) => {
          const Icon = item.icon;
          const selected = item.key === active;

          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(item.key)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-[background-color,color,transform] duration-200 active:scale-[0.97]",
                selected
                  ? "bg-violet-600 text-white"
                  : "text-slate-400 hover:text-slate-100",
              )}
            >
              <Icon
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />

              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-1 flex-col justify-end gap-6 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1">
          <div
            className="flex h-28 items-end gap-2 sm:h-32"
            aria-hidden="true"
          >
            {focus.bars.map((value, index) => (
              <div
                key={`${focus.key}-${index}`}
                className={cn(
                  "bento-bar flex-1 rounded-t-md",
                  index === focus.bars.length - 1
                    ? "bg-gradient-to-t from-violet-600 to-cyan-400"
                    : "bg-slate-700/70",
                )}
                style={{
                  "--bar-height": `${value}%`,
                  "--bar-delay": `${index * 40}ms`,
                } as React.CSSProperties}
              />
            ))}
          </div>

          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            {focus.caption}
          </p>
        </div>

        <div className="flex shrink-0 items-end justify-between gap-6 sm:block sm:text-right">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Progress
            </p>

            <p
              key={focus.progress}
              className="bento-score-in text-5xl font-extrabold tabular-nums text-slate-50"
            >
              {focus.progress}
            </p>
          </div>

          <p className="text-xs font-semibold text-emerald-400">
            +12 pts
          </p>
        </div>
      </div>
    </>
  );
}

function MomentumCard(): JSX.Element {
  return (
    <>
      <Flame
        className="h-5 w-5 text-violet-400"
        aria-hidden="true"
      />

      <div className="mt-4">
        <CellTitle
          title="Daily momentum"
          body="Consistency beats intensity. Build a rhythm you can sustain."
        />
      </div>

      <div
        className="mt-auto flex items-end justify-between gap-1.5 pt-6"
        aria-hidden="true"
      >
        {MOMENTUM.map((item, index) => (
          <div
            key={`${item.day}-${index}`}
            className="flex flex-1 flex-col items-center gap-2"
          >
            <div className="flex h-16 w-full items-end rounded bg-slate-800/50">
              <div
                className="bento-consistency-bar w-full rounded bg-gradient-to-t from-violet-700 to-violet-400"
                style={{
                  "--bar-height": `${item.value}%`,
                  "--bar-delay": `${index * 50}ms`,
                } as React.CSSProperties}
              />
            </div>

            <span className="text-[10px] font-medium text-slate-600">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

function AchievementCard(): JSX.Element {
  return (
    <>
      <Target
        className="h-5 w-5 text-cyan-400"
        aria-hidden="true"
      />

      <div className="mt-4">
        <CellTitle
          title="Progress you can see"
          body="Turn completed actions into visible momentum."
        />
      </div>

      <ul className="mt-auto space-y-2 pt-6">
        {[
          "Complete your first milestone",
          "Build a 7-day streak",
          "Finish a roadmap phase",
        ].map((item, index) => (
          <li
            key={item}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium",
              index < 2
                ? "border-violet-500/25 bg-violet-500/[0.06] text-slate-200"
                : "border-slate-800/60 text-slate-600",
            )}
          >
            {index < 2 ? (
              <Check
                className="h-3 w-3 text-violet-400"
                aria-hidden="true"
              />
            ) : (
              <span
                className="h-3 w-3 rounded-full border border-slate-700"
                aria-hidden="true"
              />
            )}

            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

function ProgressCard(): JSX.Element {
  return (
    <>
      <TrendingUp
        className="h-5 w-5 text-cyan-400"
        aria-hidden="true"
      />

      <div className="mt-4">
        <CellTitle
          title="See what's actually working"
          body="Track the signals that matter instead of drowning in numbers."
        />
      </div>

      <ul className="mt-auto space-y-3 pt-6">
        {PROGRESS.map((item, index) => (
          <li key={item.label}>
            <div className="flex items-baseline justify-between text-xs">
              <span className="font-medium text-slate-300">
                {item.label}
              </span>

              <span className="font-bold tabular-nums text-cyan-400">
                {item.value}%
                <span className="ml-1.5 font-medium text-emerald-400">
                  {item.change}
                </span>
              </span>
            </div>

            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-800/70">
              <div
                className="bento-benchmark-bar h-full rounded-full bg-cyan-400"
                style={{
                  "--bar-width": `${item.value}%`,
                  "--bar-delay": `${index * 80}ms`,
                } as React.CSSProperties}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function GuardrailsCard(): JSX.Element {
  return (
    <>
      <ShieldCheck
        className="h-5 w-5 text-violet-400"
        aria-hidden="true"
      />

      <div className="mt-4">
        <CellTitle
          title="Protect your momentum"
          body="ASCND should help you improve — not turn every day into a grind."
        />
      </div>

      <div className="mt-auto pt-6">
        <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.06] p-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
            Smart guardrail
          </p>

          <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
            Your workload is trending high. Consider a lighter day before
            pushing harder.
          </p>
        </div>
      </div>
    </>
  );
}

function SystemsCard(): JSX.Element {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="max-w-sm">
        <CellTitle
          title="One system. Every part of your life."
          body="Goals, habits, tasks and progress stay connected instead of living in separate apps."
        />
      </div>

      <ul className="flex flex-wrap gap-2">
        {SYSTEMS.map((system) => {
          const Icon = system.icon;

          return (
            <li
              key={system.label}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-800/80 bg-slate-950/60 px-3 py-2 text-xs font-medium text-slate-300 transition-[border-color,color] duration-200 hover:border-violet-500/40 hover:text-slate-50"
            >
              <Icon
                className="h-3.5 w-3.5 text-slate-500"
                aria-hidden="true"
              />

              {system.label}
            </li>
          );
        })}
      </ul>
    </div>
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
            <br className="hidden sm:block" /> become harder to stop
          </>
        }
        subtitle="ASCND connects your goals, daily actions and progress into one system designed to help you actually follow through."
      />

      <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-flow-row-dense lg:grid-cols-3 lg:auto-rows-[minmax(0,13.5rem)]">
        <Cell className="md:col-span-2 lg:col-span-2 lg:row-span-2">
          <RoadmapPreview />
        </Cell>

        <Cell delay={0.05}>
          <MomentumCard />
        </Cell>

        <Cell delay={0.1}>
          <AchievementCard />
        </Cell>

        <Cell
          delay={0.15}
          className="md:col-span-2 lg:col-span-2"
        >
          <ProgressCard />
        </Cell>

        <Cell delay={0.2}>
          <GuardrailsCard />
        </Cell>

        <Cell
          delay={0.25}
          className="md:col-span-2 lg:col-span-3"
        >
          <SystemsCard />
        </Cell>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-600">
        <ArrowUpRight
          className="h-3.5 w-3.5"
          aria-hidden="true"
        />
        Built to turn intention into action.
      </div>
    </Section>
  );
}
