
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { useState, type FormEvent, type JSX } from "react";
import { Link } from "react-router-dom";

export default function Signup(): JSX.Element {
  const reduceMotion = useReducedMotion();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /*
   * ---------------------------------------------------------
   * Email validation
   * ---------------------------------------------------------
   */

  const emailValue = email.trim();

  const emailValid =
    emailValue.length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

  const emailMessage = (() => {
    if (email.length === 0) {
      return {
        text: "Enter your email",
        valid: false,
        neutral: true,
      };
    }

    if (!emailValid) {
      return {
        text: "Enter a valid email address",
        valid: false,
        neutral: false,
      };
    }

    return {
      text: "Valid email",
      valid: true,
      neutral: false,
    };
  })();

  /*
   * ---------------------------------------------------------
   * Password validation
   *
   * Requirements:
   * - 8+ characters
   * - uppercase
   * - number
   * - special character
   * - no spaces
   * ---------------------------------------------------------
   */

  const passwordMessage = (() => {
    if (password.length === 0) {
      return {
        text: "Create a password",
        valid: false,
        neutral: true,
      };
    }

    if (password.length < 8) {
      return {
        text: "Password must be at least 8 characters",
        valid: false,
        neutral: false,
      };
    }

    if (/\s/.test(password)) {
      return {
        text: "Spaces aren't allowed",
        valid: false,
        neutral: false,
      };
    }

    if (!/[A-Z]/.test(password)) {
      return {
        text: "Add an uppercase letter",
        valid: false,
        neutral: false,
      };
    }

    if (!/\d/.test(password)) {
      return {
        text: "Add a number",
        valid: false,
        neutral: false,
      };
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]/;'`~+=]/.test(password)) {
      return {
        text: "Add a special character",
        valid: false,
        neutral: false,
      };
    }

    return {
      text: "Strong password",
      valid: true,
      neutral: false,
    };
  })();

  const passwordValid = passwordMessage.valid;

  const isValid = emailValid && passwordValid;

  /*
   * ---------------------------------------------------------
   * Submit
   * ---------------------------------------------------------
   */

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (!isValid || loading) {
      return;
    }

    setLoading(true);
    setSubmitted(false);

    /*
     * Temporary frontend simulation.
     *
     * This will later be replaced with:
     * POST /api/auth/signup
     */
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  }

  /*
   * ---------------------------------------------------------
   * Social signup
   * ---------------------------------------------------------
   */

  function handleSocial(provider: "Google" | "Apple"): void {
    console.log(`${provider} signup requested`);
  }

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
        initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[410px]"
      >
        {/* Header */}
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
            Begin your ascent
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-50 sm:text-[28px]">
            Your next level starts here.
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create your account and start building your system.
          </p>
        </div>

        {/* Signup card */}
        <div
          className="
            rounded-2xl border border-slate-800/80
            bg-slate-900/65 p-5
            shadow-[0_24px_80px_rgba(0,0,0,0.35)]
            backdrop-blur-xl
            sm:p-6
          "
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-semibold text-slate-300"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setSubmitted(false);
                }}
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="you@example.com"
                aria-invalid={
                  email.length > 0 && !emailValid
                }
                className={`
                  w-full rounded-lg border
                  bg-slate-950/70 px-3.5 py-3
                  text-sm text-slate-100
                  placeholder:text-slate-600
                  outline-none transition-all

                  ${
                    email.length > 0 && !emailValid
                      ? "border-red-500/40 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10"
                      : emailValid
                        ? "border-emerald-500/30 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
                        : "border-slate-800 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10"
                  }
                `}
              />

              <motion.p
                key={emailMessage.text}
                initial={
                  reduceMotion
                    ? undefined
                    : { opacity: 0, y: -3 }
                }
                animate={
                  reduceMotion
                    ? undefined
                    : { opacity: 1, y: 0 }
                }
                className={`
                  mt-2 text-xs
                  ${
                    emailMessage.valid
                      ? "text-emerald-400"
                      : emailMessage.neutral
                        ? "text-slate-500"
                        : "text-red-400"
                  }
                `}
              >
                {emailMessage.valid && "✓ "}
                {emailMessage.text}
              </motion.p>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-semibold text-slate-300"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setSubmitted(false);
                  }}
                  autoComplete="new-password"
                  placeholder="Create a password"
                  aria-invalid={
                    password.length > 0 && !passwordValid
                  }
                  className={`
                    w-full rounded-lg border
                    bg-slate-950/70 px-3.5 py-3 pr-11
                    text-sm text-slate-100
                    placeholder:text-slate-600
                    outline-none transition-all

                    ${
                      password.length > 0 && !passwordValid
                        ? "border-red-500/40 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10"
                        : passwordValid
                          ? "border-emerald-500/30 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
                          : "border-slate-800 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10"
                    }
                  `}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="
                    absolute right-2.5 top-1/2
                    -translate-y-1/2 rounded-md p-1.5
                    text-slate-500 transition-colors
                    hover:text-slate-200
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-violet-500
                  "
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              <motion.p
                key={passwordMessage.text}
                initial={
                  reduceMotion
                    ? undefined
                    : { opacity: 0, y: -3 }
                }
                animate={
                  reduceMotion
                    ? undefined
                    : { opacity: 1, y: 0 }
                }
                className={`
                  mt-2 text-xs
                  ${
                    passwordMessage.valid
                      ? "text-emerald-400"
                      : passwordMessage.neutral
                        ? "text-slate-500"
                        : "text-red-400"
                  }
                `}
              >
                {passwordMessage.valid && "✓ "}
                {passwordMessage.text}
              </motion.p>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={!isValid || loading || submitted}
              whileHover={
                reduceMotion || !isValid || loading || submitted
                  ? undefined
                  : { y: -1 }
              }
              whileTap={
                reduceMotion || !isValid || loading || submitted
                  ? undefined
                  : { scale: 0.985 }
              }
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
              {loading
                ? "Creating account..."
                : submitted
                  ? "Account created"
                  : "Create account"}

              {!loading && !submitted && (
                <ArrowRight className="h-4 w-4" />
              )}

              {submitted && (
                <Check className="h-4 w-4 text-emerald-300" />
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-800" />

            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-600">
              or
            </span>

            <div className="h-px flex-1 bg-slate-800" />
          </div>

          {/* Social auth */}
          <div className="flex justify-center gap-2.5">
            <SocialIconButton
              label="Continue with Google"
              onClick={() => handleSocial("Google")}
            >
              <span className="text-base font-bold text-slate-100">
                G
              </span>
            </SocialIconButton>

            <SocialIconButton
              label="Continue with Apple"
              onClick={() => handleSocial("Apple")}
            >
              <span className="text-lg leading-none text-slate-100">
                
              </span>
            </SocialIconButton>
          </div>

          {/* Login */}
          <p className="mt-5 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="
                font-semibold text-violet-400
                transition hover:text-violet-300
              "
            >
              Sign in
            </Link>
          </p>

          {/* Security */}
          <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-600">
            <ShieldCheck className="h-3 w-3" />
            <span>Secure account creation</span>
          </div>
        </div>

        {/* Legal */}
        <p className="mt-4 text-center text-[10px] leading-4 text-slate-600">
          By continuing, you agree to Ascend's{" "}
          <a
            href="#"
            className="transition hover:text-slate-400"
          >
            Terms
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="transition hover:text-slate-400"
          >
            Privacy Policy
          </a>
          .
        </p>
      </motion.div>
    </main>
  );
}

/*
 * ---------------------------------------------------------
 * Social icon button
 * ---------------------------------------------------------
 */

function SocialIconButton({
  label,
  children,
  onClick,
}: {
  label: string;
  children: JSX.Element;
  onClick: () => void;
}): JSX.Element {
  return (
    <motion.button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="
        flex h-10 w-10 items-center justify-center
        rounded-lg border border-slate-800
        bg-slate-950/60
        transition-colors
        hover:border-slate-700
        hover:bg-slate-800
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-violet-500
      "
    >
      {children}
    </motion.button>
  );
}