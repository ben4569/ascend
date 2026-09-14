import { lazy, Suspense, type JSX } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";

const BentoFeatures = lazy(
  () => import("./components/BentoFeatures")
);

const HowItWorks = lazy(
  () => import("./components/HowItWorks")
);

const CompassAI = lazy(
  () => import("./components/CompassAI")
);

const WhyAscnd = lazy(
  () => import("./components/WhyAscnd")
);

const FinalCTA = lazy(
  () => import("./components/FinalCTA")
);

function SectionLoader(): JSX.Element {
  return (
    <div
      aria-hidden="true"
      className="min-h-[200px]"
    />
  );
}

function LandingPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main>
        <Hero />

        <section
          className="min-h-[400px]"
          aria-label="Features"
        >
          <Suspense fallback={<SectionLoader />}>
            <BentoFeatures />
          </Suspense>
        </section>

        <section
          className="min-h-[400px]"
          aria-label="How it works"
        >
          <Suspense fallback={<SectionLoader />}>
            <HowItWorks />
          </Suspense>
        </section>

        <section
          className="min-h-[400px]"
          aria-label="AI assistant"
        >
          <Suspense fallback={<SectionLoader />}>
            <CompassAI />
          </Suspense>
        </section>

        <section
          className="min-h-[400px]"
          aria-label="Why Ascend"
        >
          <Suspense fallback={<SectionLoader />}>
            <WhyAscnd />
          </Suspense>
        </section>

        <section
          className="min-h-[400px]"
          aria-label="Final call to action"
        >
          <Suspense fallback={<SectionLoader />}>
            <FinalCTA />
          </Suspense>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}