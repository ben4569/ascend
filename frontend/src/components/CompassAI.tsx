import { useState, type JSX } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Compass,
  Lightbulb,
  Radio,
  Stethoscope,
} from "lucide-react";
import * as Section from "./ui/section";
import { cn } from "../lib/cn";

type Insight = {
  id: string;
  week: string;
  headline: string;
  signal: string;
  diagnosis: string;
  prescription: string;
  confidence: number;
};

const INSIGHTS: readonly Insight[] = [
  {
    id: "weak-foot",
    week: "Week 09",
    headline: "Your weak foot collapses under pressure",
    signal:
      "Left-foot pass completion falls from 79% to 61% when a defender closes within 2 metres.",
    diagnosis:
      "It isn't a technique gap — your open-play numbers are fine. It's decision latency: you take an extra touch to set up the right foot.",
    prescription:
      "Three constrained rondos per week, two-touch maximum, left foot only. Reassess in 14 days.",
    confidence: 91,
  },
  {
    id: "load",
    week: "Week 10",
    headline: "You're building fitness on a cracked base",
    signal:
      "Sprint volume up 34% while sleep dropped to 6h 12m average across nine nights.",
    diagnosis:
      "Your acute-to-chronic load ratio hit 1.5. Historically your injury flags cluster above 1.3, and recovery — not output — is the limiter.",
    prescription:
      "Cap high-intensity work at two sessions this week. Move the Thursday block to Saturday.",
    confidence: 87,
  },
  {
    id: "scanning",
    week: "Week 11",
    headline: "You stopped scanning before you receive",
    signal:
      "Head-turn frequency in the 6 seconds before receiving dropped from 4.1 to 2.3 across the last four matches.",
    diagnosis:
      "This correlates with your rise in turnovers in the middle third. You're arriving with less information than you did in August.",
    prescription:
      "Fifteen minutes of clipped film per match, plus a shoulder-check cue on every rondo rep.",
    confidence: 94,
  },
] as const;

const LAYERS: readonly { key: keyof Pick<Insight, "signal" | "diagnosis" | "prescription">; label: string; icon: typeof Radio; tone: string }[] = [
  { key: "signal", label: "Signal", icon: Radio, tone: "text-cyan-400" },
  { key: "diagnosis", label: "Diagnosis", icon: Stethoscope, tone: "text-violet-400" },
  { key: "prescription", label: "Prescription", icon: Lightbulb, tone: "text-emerald-400" },
] as const;

export default function CompassAI(): JSX.Element {
  const [index, setIndex] = useState<number>(0);
  const insight = INSIGHTS[index];

  const go = (dir: 1 | -1): void => {
    setIndex((i) => (i + dir + INSIGHTS.length) % INSIGHTS.length);
  };

  return (
    <Section.Section id="compass-ai" labelledBy="compass-heading" className="bg-slate-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-violet-700/15 blur-3xl"
      />

      <div className="grid gap-14 lg:grid-cols-[minmax(0,26rem)_1fr] lg:items-center lg:gap-16">
        <div>
          <Section.SectionHeading
            id="compass-heading"
            align="left"
            eyebrow="Compass AI"
            title={
              <>
                It tells you <span className="text-gradient">why</span>, not just what
              </>
            }
            subtitle="Dashboards hand you numbers and leave the thinking to you. Compass reads the signal, names the cause, and prescribes the fix — every week, in plain language."
          />

          <Section.Reveal delay={0.1}>
            <ul className="mt-8 space-y-3">
              {LAYERS.map((layer) => {
                const Icon = layer.icon;
                return (
                  <li key={layer.key} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-slate-800 bg-slate-900/70">
                      <Icon className={cn("h-3.5 w-3.5", layer.tone)} aria-hidden="true" />
                    </span>
                    <p className="text-sm leading-relaxed text-slate-400">
                      <span className="font-semibold text-slate-100">{layer.label}</span>
                      {layer.key === "signal" && " — the measurement that moved."}
                      {layer.key === "diagnosis" && " — the mechanism behind it, cross-checked against your history."}
                      {layer.key === "prescription" && " — one specific action, sized to your week."}
                    </p>
                  </li>
                );
              })}
            </ul>

            <motion.a
              href="/signup"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="group mt-9 inline-flex items-center gap-2 rounded-xl border border-slate-800/80 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-slate-100 backdrop-blur-xl transition-colors duration-200 hover:border-violet-500/40"
            >
              Get your first insight free
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.a>
          </Section.Reveal>
        </div>

        <Section.Reveal delay={0.15}>
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-2 shadow-2xl shadow-slate-950/80 backdrop-blur-xl">
            <div className="rounded-xl border border-slate-800/70 bg-slate-950/80 p-6 sm:p-8">
              <header className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-violet-500/15">
                    <Compass className="h-4 w-4 text-violet-300" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-violet-300">
                      Weekly read
                    </p>
                    <p className="text-xs text-slate-500">{insight.week}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <p className="text-xs font-medium text-slate-500">
                    Confidence{" "}
                    <span className="font-bold tabular-nums text-slate-200">
                      {insight.confidence}%
                    </span>
                  </p>
                  <div className="flex gap-1">
                    <motion.button
                      type="button"
                      onClick={() => go(-1)}
                      whileTap={{ scale: 0.94 }}
                      aria-label="Previous insight"
                      className="grid h-8 w-8 place-items-center rounded-lg border border-slate-800/80 text-slate-400 transition-colors duration-150 hover:border-violet-500/40 hover:text-slate-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => go(1)}
                      whileTap={{ scale: 0.94 }}
                      aria-label="Next insight"
                      className="grid h-8 w-8 place-items-center rounded-lg border border-slate-800/80 text-slate-400 transition-colors duration-150 hover:border-violet-500/40 hover:text-slate-50"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </header>

              <div aria-live="polite" className="mt-7 min-h-[22rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <h3 className="text-xl font-bold leading-snug text-slate-50 sm:text-2xl">
                      {insight.headline}
                    </h3>

                    <ol className="mt-6 space-y-4">
                      {LAYERS.map((layer, i) => {
                        const Icon = layer.icon;
                        return (
                          <motion.li
                            key={layer.key}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.08 * i + 0.1, duration: 0.3 }}
                            className={cn(
                              "rounded-xl border p-4",
                              layer.key === "prescription"
                                ? "border-emerald-500/25 bg-emerald-500/[0.05]"
                                : "border-slate-800/80 bg-slate-900/50",
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <Icon className={cn("h-3.5 w-3.5", layer.tone)} aria-hidden="true" />
                              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                                {layer.label}
                              </span>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-slate-300">
                              {insight[layer.key]}
                            </p>
                          </motion.li>
                        );
                      })}
                    </ol>
                  </motion.div>
                </AnimatePresence>
              </div>

              <footer className="mt-6 flex items-center gap-2 border-t border-slate-800/70 pt-5">
                {INSIGHTS.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show insight ${i + 1}: ${item.headline}`}
                    aria-current={i === index}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === index ? "w-8 bg-violet-500" : "w-4 bg-slate-700 hover:bg-slate-600",
                    )}
                  />
                ))}
                <p className="ml-auto text-[11px] text-slate-600">
                  Insight {index + 1} of {INSIGHTS.length}
                </p>
              </footer>
            </div>
          </div>
        </Section.Reveal>
      </div>
    </Section.Section>
  );
}