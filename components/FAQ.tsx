// components/FAQ.tsx
const FAQ_ITEMS = [
  {
    q: "Is KaePett a medical diagnosis tool?",
    a: "No. KaePett provides guidance and risk hints based on patterns, but it is not a substitute for a licensed veterinarian.",
  },
  {
    q: "Which pets does KaePett support?",
    a: "We currently focus on dogs and cats, with support for small pets like rabbits and guinea pigs in beta.",
  },
  {
    q: "How do you pick nearby clinics?",
    a: "We sort by open status, rating, distance and indicative price levels where available.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-16 lg:py-24 bg-slate-950">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300 mb-3">
            FAQ
          </p>
          <h2 className="text-3xl font-semibold text-white mb-3">
            Questions pet parents{" "}
            <span className="text-slate-300">usually ask</span>.
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-5"
            >
              <h3 className="text-sm font-semibold text-white mb-1">
                {item.q}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
