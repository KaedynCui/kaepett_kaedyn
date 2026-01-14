// components/HowItWorks.tsx
export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Chat about your pet",
      desc: "Describe recent behavior, appetite changes, energy levels and any small things you’ve noticed.",
    },
    {
      step: "02",
      title: "KaePett analyses signals",
      desc: "Our models connect behavior patterns, nutrition history and common symptom clusters from similar pets.",
    },
    {
      step: "03",
      title: "Get guidance & local options",
      desc: "Receive tailored guidance, risk hints, nutrition suggestions and vetted nearby clinics & deals.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-950" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300 mb-3">
            HOW IT WORKS
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-3">
            From chat to{" "}
            <span className="text-sky-300">actionable next steps</span>.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.step}
              className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 flex flex-col gap-3"
            >
              <span className="text-xs font-semibold text-sky-300">
                STEP {s.step}
              </span>
              <h3 className="text-lg font-semibold text-white">{s.title}</h3>
              <p className="text-sm text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
