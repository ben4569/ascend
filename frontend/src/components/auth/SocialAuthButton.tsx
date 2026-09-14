import type { JSX, ReactNode } from "react";

type SocialAuthButtonProps = {
  provider: "Google" | "Apple" | "Facebook";
  icon: ReactNode;
  onClick?: () => void;
};

export default function SocialAuthButton({
  provider,
  icon,
  onClick,
}: SocialAuthButtonProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group flex w-full items-center justify-center gap-3
        rounded-xl border border-slate-800
        bg-slate-900/70 px-4 py-3.5
        text-sm font-semibold text-slate-200
        transition-all duration-200
        hover:border-slate-700
        hover:bg-slate-800/80
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-violet-500/70
        active:scale-[0.99]
      "
    >
      <span className="flex h-5 w-5 items-center justify-center">
        {icon}
      </span>

      <span>Continue with {provider}</span>
    </button>
  );
}