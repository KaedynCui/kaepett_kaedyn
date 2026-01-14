// components/Features.tsx
export function Features() {
  const items = [
    {
      title: "Behavior decoding",
      desc: "KaePett chats with you about daily routines, appetite, sleep and mood to infer your pet’s baseline.",
      badge: "AI behavior analysis",
    },
    {
      title: "Smart nutrition insights",
      desc: "Combines breed, age, activity and symptoms to suggest missing nutrients or supplement focus areas.",
      badge: "Nutrition signals",
    },
    {
      title: "Health risk signals",
      desc: "Highlights potential red flags early — like lethargy + pale gums — and recommends when to see a vet.",
      badge: "Risk radar",
    },
    {
      title: "Nearby vets & deals",
      desc: "Shows nearby clinics that are open now, sorted by rating & price, plus discounted food & toys.",
      badge: "Local intelligence",
    },
  ];

  return (
    <section id="features" className="py-16 lg:py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300 mb-3">
            FEATURES
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-3">
            One place for your pet’s{" "}
            <span className="text-emerald-300">health & happiness</span>.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            KaePett connects behavior, nutrition, risk signals and local
            services into a single, always-on assistant for pet parents.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 hover:border-emerald-300/40 hover:bg-slate-900/80 transition-all"
            >
              <div className="text-xs inline-flex rounded-full bg-emerald-400/10 text-emerald-300 px-3 py-1 mb-3">
                {item.badge}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
