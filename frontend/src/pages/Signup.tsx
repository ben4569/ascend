
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

  // Server-side field errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Unexpected/server-level errors
  const [formError, setFormError] = useState("");

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

    if (!/[!@#$%^&*(),.?":{}|<>\_\-\\[\]/;'`~+=]/.test(password)) {
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

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (!isValid || loading) {
      return;
    }

    setLoading(true);
    setSubmitted(false);

    // Clear previous server errors before a new request.
    setEmailError("");
    setPasswordError("");
    setFormError("");

    try {
      const response = await fetch("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          email: email.trim(),
          password,
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
        console.error("Signup API error:", {
          status: response.status,
          response: data,
        });

        const message =
          data.error ||
          `Unable to create your account (${response.status})`;

        /*
         * -----------------------------------------------------
         * Map backend validation errors to the correct field.
         * -----------------------------------------------------
         */

        const normalizedMessage = message.toLowerCase();

        if (
          normalizedMessage.includes("email") ||
          normalizedMessage.includes("account already exists") ||
          normalizedMessage.includes("account with this email")
        ) {
          setEmailError(message);
        } else if (
          normalizedMessage.includes("password") ||
          normalizedMessage.includes("uppercase") ||
          normalizedMessage.includes("number") ||
          normalizedMessage.includes("special character") ||
          normalizedMessage.includes("spaces")
        ) {
          setPasswordError(message);
        } else {
          setFormError(message);
        }

        return;
      }

      /*
       * Successful signup.
       *
       * Backend creates the account and sends the verification
       * email. We keep the button in its success state for now.
       */

      setSubmitted(true);
    } catch (error) {
      console.error("Signup failed:", error);

      setFormError(
        error instanceof Error
          ? error.message
          : "Unable to create your account"
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * ---------------------------------------------------------
   * Social signup
   * ---------------------------------------------------------
   */

  function handleSocial(provider: "google" | "apple"): void {
    if (provider === "google") {
      window.location.href = "/auth/google";
      return;
    }

    console.log("Apple signup requested");
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
            {/* Form-level error */}
            {formError && (
              <motion.div
                initial={
                  reduceMotion
                    ? undefined
                    : { opacity: 0, y: -6 }
                }
                animate={
                  reduceMotion
                    ? undefined
                    : { opacity: 1, y: 0 }
                }
                role="alert"
                className="
                  rounded-lg border border-red-500/20
                  bg-red-500/10 px-3.5 py-3
                  text-sm leading-5 text-red-300
                "
              >
                {formError}
              </motion.div>
            )}

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
                  setEmailError("");
                  setFormError("");
                  setSubmitted(false);
                }}
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="you@example.com"
                aria-invalid={
                  Boolean(emailError) ||
                  (email.length > 0 && !emailValid)
                }
                aria-describedby="email-message"
                className={`
                  w-full rounded-lg border
                  bg-slate-950/70 px-3.5 py-3
                  text-sm text-slate-100
                  placeholder:text-slate-600
                  outline-none transition-all
                  ${
                    emailError ||
                    (email.length > 0 && !emailValid)
                      ? "border-red-500/40 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10"
                      : emailValid
                        ? "border-emerald-500/30 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
                        : "border-slate-800 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10"
                  }
                `}
              />

              <motion.p
                id="email-message"
                key={emailError || emailMessage.text}
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
                    emailError
                      ? "text-red-400"
                      : emailMessage.valid
                        ? "text-emerald-400"
                        : emailMessage.neutral
                          ? "text-slate-500"
                          : "text-red-400"
                  }
                `}
              >
                {emailError
                  ? emailError
                  : emailMessage.valid
                    ? `✓ ${emailMessage.text}`
                    : emailMessage.text}
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
                    setPasswordError("");
                    setFormError("");
                    setSubmitted(false);
                  }}
                  autoComplete="new-password"
                  placeholder="Create a password"
                  aria-invalid={
                    Boolean(passwordError) ||
                    (password.length > 0 && !passwordValid)
                  }
                  aria-describedby="password-message"
                  className={`
                    w-full rounded-lg border
                    bg-slate-950/70 px-3.5 py-3 pr-11
                    text-sm text-slate-100
                    placeholder:text-slate-600
                    outline-none transition-all
                    ${
                      passwordError ||
                      (password.length > 0 && !passwordValid)
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
                id="password-message"
                key={passwordError || passwordMessage.text}
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
                    passwordError
                      ? "text-red-400"
                      : passwordMessage.valid
                        ? "text-emerald-400"
                        : passwordMessage.neutral
                          ? "text-slate-500"
                          : "text-red-400"
                  }
                `}
              >
                {passwordError
                  ? passwordError
                  : passwordMessage.valid
                    ? `✓ ${passwordMessage.text}`
                    : passwordMessage.text}
              </motion.p>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={!isValid || loading || submitted}
              whileHover={
                reduceMotion ||
                !isValid ||
                loading ||
                submitted
                  ? undefined
                  : { y: -1 }
              }
              whileTap={
                reduceMotion ||
                !isValid ||
                loading ||
                submitted
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
                  ? "Check your email"
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
              onClick={() => handleSocial("google")}
            >
              <span className="text-base font-bold text-slate-100">
                G
              </span>
            </SocialIconButton>

            <SocialIconButton
              label="Continue with Apple"
              onClick={() => handleSocial("apple")}
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