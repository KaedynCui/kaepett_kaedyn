// app/pricing/page.tsx
import { Navbar } from "@/components/Navbar";

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-950 text-slate-50 pt-28 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
            Pricing
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mb-8">
            We’re launching with simple, transparent pricing for pet parents.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <h2 className="text-lg font-semibold text-white mb-1">
                Free
              </h2>
              <p className="text-xs text-slate-400 mb-4">
                For curious pet parents getting started.
              </p>
              <p className="text-3xl font-semibold mb-4">$0</p>
              <ul className="text-xs text-slate-300 space-y-2">
                <li>• Basic AI chat about your pet</li>
                <li>• Simple behavior insights</li>
                <li>• Nearby clinic suggestions</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-400/60 bg-slate-900/80 p-6">
              <h2 className="text-lg font-semibold text-white mb-1">
                Pro (coming soon)
              </h2>
              <p className="text-xs text-slate-400 mb-4">
                For pet parents who want deeper guidance.
              </p>
              <p className="text-3xl font-semibold mb-4">$X / month</p>
              <ul className="text-xs text-slate-300 space-y-2">
                <li>• Advanced health & nutrition patterns</li>
                <li>• More granular risk signals</li>
                <li>• Priority access to new features</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
