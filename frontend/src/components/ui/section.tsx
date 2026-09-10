import type { JSX, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/cn";

type SectionProps = {
  id: string;
  labelledBy: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, labelledBy, children, className }: SectionProps): JSX.Element {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative overflow-hidden py-24 md:py-32", className)}
    >
      <div className="relative mx-auto max-w-7xl px-6">{children}</div>
    </section>
  );
}

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className }: RevealProps): JSX.Element {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  align?: "center" | "left";
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps): JSX.Element {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-4 text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-400">{subtitle}</p>
    </Reveal>
  );
}