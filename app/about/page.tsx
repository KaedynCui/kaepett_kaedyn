// app/about/page.tsx
import { Navbar } from "@/components/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-950 text-slate-50 pt-28 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
            About KaePett
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mb-4">
            KaePett was created for pet parents who want more than generic
            search results. We combine behavioral patterns, nutrition context
            and local data to give meaningful, actionable guidance.
          </p>
          <p className="text-sm sm:text-base text-slate-400">
            This is not a medical device or a diagnosis engine. Our goal is to
            help you notice patterns sooner, ask better questions and reach
            qualified professionals faster — while also keeping an eye on your
            pet’s joy through better food and playtime choices.
          </p>
        </div>
      </main>
    </>
  );
}
