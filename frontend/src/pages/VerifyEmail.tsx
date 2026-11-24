
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ArrowLeft,
  Mail,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState, type JSX } from "react";
import { Link, useSearchParams } from "react-router-dom";

type VerificationStatus =
  | "checking"
  | "success"
  | "expired"
  | "invalid"
  | "used";

export default function VerifyEmail(): JSX.Element {
  const reduceMotion = useReducedMotion();
  const [searchParams] = useSearchParams();

  const [status, setStatus] =
    useState<VerificationStatus>("checking");

  const [email, setEmail] = useState("");
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [resendError, setResendError] = useState("");

  useEffect(() => {
    const urlStatus = searchParams.get("status");
    const urlEmail = searchParams.get("email");

    if (urlEmail) {
      setEmail(urlEmail);
    }

    if (
      urlStatus === "success" ||
      urlStatus === "expired" ||
      urlStatus === "invalid" ||
      urlStatus === "used"
    ) {
      setStatus(urlStatus);
      return;
    }

    /*
     * No verification result means the user arrived here
     * directly after signup.
     */
    setStatus("checking");
  }, [searchParams]);

  async function handleResend(): Promise<void> {
    if (!email || resending) {
      return;
    }

    setResending(true);
    setResendMessage("");
    setResendError("");

    try {
      const response = await fetch("/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          email,
        }),
      });

      const text = await response.text();

      let data: {
        error?: string;
        message?: string;
      } = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(
            `Server returned invalid response (${response.status})`
          );
        }
      }

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to resend verification email"
        );
      }

      setResendMessage(
        data.message || "Verification email sent."
      );
    } catch (error) {
      console.error("Resend verification failed:", error);

      setResendError(
        error instanceof Error
          ? error.message
          : "Unable to resend verification email"
      );
    } finally {
      setResending(false);
    }
  }

  const content = {
    checking: {
      icon: Mail,
      eyebrow: "Verify your account",
      title: "Check your inbox.",
      description:
        "We've sent a verification link to your email address. Open it to continue your ascent.",
    },
    success: {
      icon: Check,
      eyebrow: "Account verified",
      title: "You're verified.",
      description:
        "Your email has been confirmed. Your ascent can now begin.",
    },
    expired: {
      icon: RefreshCw,
      eyebrow: "Link expired",
      title: "That link has expired.",
      description:
        "Verification links are only valid for 30 minutes. Request a new one below.",
    },
    invalid: {
      icon: ShieldCheck,
      eyebrow: "Invalid link",
      title: "That link isn't valid.",
      description:
        "The verification link may be incorrect or no longer available. Request a new one below.",
    },
    used: {
      icon: Check,
      eyebrow: "Already verified",
      title: "This link was already used.",
      description:
        "Your verification link can only be used once.",
    },
  }[status];

  const Icon = content.icon;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-5 py-8">
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid opacity-50"
      />

      {/* Violet glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute left-1/2 top-[-240px]
          h-[520px] w-[720px] -translate-x-1/2
          rounded-full bg-violet-600/10 blur-[130px]
        "
      />

      {/* Cyan glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute bottom-[-260px] left-1/2
          h-[420px] w-[650px] -translate-x-1/2
          rounded-full bg-cyan-500/8 blur-[130px]
        "
      />

      <motion.div
        initial={
          reduceMotion
            ? undefined
            : { opacity: 0, y: 16 }
        }
        animate={
          reduceMotion
            ? undefined
            : { opacity: 1, y: 0 }
        }
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        className="relative z-10 w-full max-w-[410px]"
      >
        {/* Brand */}
        <div className="mb-6 text-center">
          <Link
            to="/"
            className="
              inline-flex items-center
              text-sm font-extrabold tracking-[0.22em]
              text-slate-100 transition-colors
              hover:text-violet-300
            "
          >
            ASCEND
          </Link>

          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.25em] text-violet-400">
            {content.eyebrow}
          </p>
        </div>

        {/* Card */}
        <div
          className="
            rounded-2xl border border-slate-800/80
            bg-slate-900/65 p-6 text-center
            shadow-[0_24px_80px_rgba(0,0,0,0.35)]
            backdrop-blur-xl
          "
        >
          {/* Icon */}
          <motion.div
            initial={
              reduceMotion
                ? undefined
                : { scale: 0.9, opacity: 0 }
            }
            animate={
              reduceMotion
                ? undefined
                : { scale: 1, opacity: 1 }
            }
            transition={{
              duration: 0.35,
              delay: 0.1,
            }}
            className="
              mx-auto flex h-14 w-14 items-center
              justify-center rounded-2xl
              border border-violet-500/20
              bg-violet-500/10
              text-violet-300
            "
          >
            <Icon className="h-6 w-6" />
          </motion.div>

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-50">
            {content.title}
          </h1>

          <p className="mx-auto mt-3 max-w-[340px] text-sm leading-6 text-slate-500">
            {content.description}
          </p>

          {/* Email */}
          {email && (
            <div
              className="
                mt-5 rounded-lg border border-slate-800
                bg-slate-950/60 px-4 py-3
                text-sm font-medium text-slate-300
              "
            >
              {email}
            </div>
          )}

          {/* Initial signup state */}
          {status === "checking" && (
            <>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={!email || resending}
                  className="
                    flex w-full items-center justify-center gap-2
                    rounded-lg bg-violet-500 px-4 py-3
                    text-sm font-bold text-white
                    shadow-lg shadow-violet-500/15
                    transition-all
                    hover:bg-violet-400
                    disabled:cursor-not-allowed
                    disabled:bg-slate-800
                    disabled:text-slate-600
                    disabled:shadow-none
                  "
                >
                  <RefreshCw
                    className={`h-4 w-4 ${
                      resending ? "animate-spin" : ""
                    }`}
                  />

                  {resending
                    ? "Sending..."
                    : "Resend verification email"}
                </button>
              </div>

              {resendMessage && (
                <p
                  role="status"
                  className="mt-3 text-xs text-emerald-400"
                >
                  {resendMessage}
                </p>
              )}

              {resendError && (
                <p
                  role="alert"
                  className="mt-3 text-xs text-red-400"
                >
                  {resendError}
                </p>
              )}
            </>
          )}

          {/* Expired / invalid */}
          {(status === "expired" ||
            status === "invalid") && (
            <>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={!email || resending}
                  className="
                    flex w-full items-center justify-center gap-2
                    rounded-lg bg-violet-500 px-4 py-3
                    text-sm font-bold text-white
                    shadow-lg shadow-violet-500/15
                    transition-all
                    hover:bg-violet-400
                    disabled:cursor-not-allowed
                    disabled:bg-slate-800
                    disabled:text-slate-600
                    disabled:shadow-none
                  "
                >
                  <RefreshCw
                    className={`h-4 w-4 ${
                      resending ? "animate-spin" : ""
                    }`}
                  />

                  {resending
                    ? "Sending..."
                    : "Send a new verification email"}
                </button>
              </div>

              {resendMessage && (
                <p
                  role="status"
                  className="mt-3 text-xs text-emerald-400"
                >
                  {resendMessage}
                </p>
              )}

              {resendError && (
                <p
                  role="alert"
                  className="mt-3 text-xs text-red-400"
                >
                  {resendError}
                </p>
              )}
            </>
          )}

          {/* Success */}
          {status === "success" && (
            <Link
              to="/onboarding"
              className="
                mt-6 flex w-full items-center
                justify-center gap-2 rounded-lg
                bg-violet-500 px-4 py-3
                text-sm font-bold text-white
                shadow-lg shadow-violet-500/15
                transition-all
                hover:bg-violet-400
              "
            >
              Continue to onboarding
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}

          {/* Already used */}
          {status === "used" && (
            <Link
              to="/onboarding"
              className="
                mt-6 flex w-full items-center
                justify-center gap-2 rounded-lg
                bg-violet-500 px-4 py-3
                text-sm font-bold text-white
                shadow-lg shadow-violet-500/15
                transition-all
                hover:bg-violet-400
              "
            >
              Continue to onboarding
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}

          {/* Back */}
          <Link
            to="/signup"
            className="
              mt-5 inline-flex items-center gap-1.5
              text-xs font-semibold text-slate-500
              transition-colors hover:text-slate-300
            "
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to signup
          </Link>

          {/* Security */}
          <div className="mt-5 flex items-center justify-center gap-1.5 text-[10px] text-slate-600">
            <ShieldCheck className="h-3 w-3" />
            <span>Secure email verification</span>
          </div>
        </div>

        {/* Legal */}
        <p className="mt-4 text-center text-[10px] leading-4 text-slate-600">
          Verification links expire after 30 minutes.
        </p>
      </motion.div>
    </main>
  );
}