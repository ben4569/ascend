import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BentoFeatures from "./components/BentoFeatures";
import CompassAI from "./components/CompassAI";
import type { JSX } from "react/jsx-runtime";

export default function App(): JSX.Element {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main>
        <Hero />
        <BentoFeatures />
        <CompassAI />
      </main>
    </div>
  );
}