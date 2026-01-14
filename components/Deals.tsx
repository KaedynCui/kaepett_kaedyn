// components/Deals.tsx
const MOCK_DEALS = [
  {
    title: "Grain-free salmon kibble",
    type: "Dog food",
    discount: "20% off",
    vendor: "PetWorld",
  },
  {
    title: "Interactive feather wand",
    type: "Cat toy",
    discount: "15% off",
    vendor: "Playful Pets",
  },
  {
    title: "Dental chews bundle",
    type: "Dog treats",
    discount: "25% off",
    vendor: "HealthyBites",
  },
];

export function Deals() {
  return (
    <section id="deals" className="py-16 lg:py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pink-300 mb-3">
              DEALS
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
              Smart deals for{" "}
              <span className="text-pink-300">food & playtime</span>.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
            KaePett surfaces discounts that actually match your pet’s age, diet
            and play style.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {MOCK_DEALS.map((deal) => (
            <div
              key={deal.title}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 flex flex-col gap-2"
            >
              <span className="text-xs text-pink-300">{deal.type}</span>
              <h3 className="text-sm font-semibold text-white">{deal.title}</h3>
              <p className="text-xs text-slate-400">{deal.vendor}</p>
              <div className="mt-3 text-sm font-semibold text-pink-300">
                {deal.discount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
