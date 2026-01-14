// components/NearbyClinics.tsx
const MOCK_CLINICS = [
  {
    name: "Paws & Hearts Vet Clinic",
    distance: "0.8 km",
    rating: 4.8,
    priceLevel: "$$",
    openNow: true,
  },
  {
    name: "Inner City Animal Hospital",
    distance: "1.4 km",
    rating: 4.6,
    priceLevel: "$",
    openNow: true,
  },
  {
    name: "Harbourview Pet Care",
    distance: "2.1 km",
    rating: 4.9,
    priceLevel: "$$$",
    openNow: false,
  },
];

export function NearbyClinics() {
  return (
    <section id="nearby-clinics">
      <section id="clinics" className="py-16 lg:py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300 mb-3">
                NEARBY CLINICS
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                Open vets near you, sorted by{" "}
                <span className="text-emerald-300">rating & price</span>.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
              KaePett prioritises clinics that are open now, well-reviewed and
              more budget-friendly when possible.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {MOCK_CLINICS.map((clinic) => (
              <div
                key={clinic.name}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-white">
                    {clinic.name}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {clinic.distance}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span>⭐ {clinic.rating.toFixed(1)}</span>
                  <span>•</span>
                  <span>{clinic.priceLevel}</span>
                </div>
                <div className="mt-2">
                  {clinic.openNow ? (
                    <span className="inline-flex items-center rounded-full bg-emerald-400/15 text-emerald-300 border border-emerald-300/40 px-2 py-1 text-[11px]">
                      ● Open now
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-slate-700/40 text-slate-300 border border-slate-600/60 px-2 py-1 text-[11px]">
                      ○ Closed — see hours
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
