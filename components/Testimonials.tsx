// components/Testimonials.tsx
const TESTIMONIALS = [
  {
    name: "Emily & Mochi",
    role: "Cat mom in Sydney",
    quote:
      "KaePett helped me spot early kidney issues in Mochi by connecting her drinking pattern with subtle behavior changes.",
  },
  {
    name: "Lucas & Rex",
    role: "Dog dad in Melbourne",
    quote:
      "It feels like having a vet friend in my pocket. The risk hints and nearby vet suggestions are insanely helpful.",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 lg:py-24 bg-slate-950">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-300 mb-3">
            STORIES
          </p>
          <h2 className="text-3xl font-semibold text-white mb-3">
            Built with{" "}
            <span className="text-violet-300">real pet parents</span> in mind.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-6"
            >
              <p className="text-sm text-slate-200 mb-4">“{t.quote}”</p>
              <div className="text-xs text-slate-400">
                <span className="font-semibold text-slate-100">
                  {t.name}
                </span>{" "}
                — {t.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
