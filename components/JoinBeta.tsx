"use client";

import { useMemo, useState } from "react";
import { AU_CITIES } from "./auCities";

function validateEmail(email: string) {
  const v = email.trim();

  // 基础格式（足够实用，不做“过度 RFC 完美”）
  const basic = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v);

  if (!basic) return "Email format looks incorrect.";

  // 常见错误：双点、@前后点、连续点等
  if (v.includes("..")) return "Email looks invalid (double dots).";
  if (v.startsWith(".") || v.endsWith("."))
    return "Email cannot start/end with a dot.";
  if (v.includes("@.") || v.includes(".@"))
    return "Email looks invalid around @.";

  // 你也可以加：阻止明显临时邮箱域（可选）
  // const blocked = ["mailinator.com", "10minutemail.com"];
  // if (blocked.includes(v.split("@")[1]?.toLowerCase())) return "Please use a non-temporary email.";

  return ""; // ok
}

export function JoinBeta() {
  const [email, setEmail] = useState("");
  const [petType, setPetType] = useState("");
  const [city, setCity] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const PET_OPTIONS = [
    { value: "Dog", label: "Dog", emoji: "🐶" },
    { value: "Cat", label: "Cat", emoji: "🐱" },
    { value: "Other", label: "Other", emoji: "🐾" },
  ];

  const emailError = useMemo(() => {
    if (!email) return "";
    return validateEmail(email);
  }, [email]);

  const cityOptions = useMemo(() => {
    // 去重 + 排序
    return Array.from(new Set(AU_CITIES)).sort((a, b) => a.localeCompare(b));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitted(false);

    const err = validateEmail(email);
    if (err) {
      setSubmitError(err);
      return;
    }

    if (!city.trim()) {
      setSubmitError("Please select your city/suburb.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/join-beta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          petType: petType.trim(),
          city: city.trim(),
          source: "join-beta",
        }),
      });

      const text = await res.text();
      const data = JSON.parse(text);

      if (!data.success) throw new Error(data.error || "Submit failed");

      setSubmitted(true);
      setEmail("");
      setPetType("");
      setCity("");
    } catch (err: any) {
      setSubmitError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="join-beta" className="py-16 lg:py-24 bg-slate-950">
      <div className="max-w-xl mx-auto px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300 mb-3">
          JOIN BETA
        </p>
        <h2 className="text-3xl font-semibold text-white mb-3">
          Be the first to try KaePett.
        </h2>
        <p className="text-sm text-slate-400 mb-8">
          Share a few details and we’ll reach out when your city is supported.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-left bg-slate-900/70 border border-white/10 rounded-2xl p-5"
        >
          <div>
            <label className="block text-xs font-medium text-slate-200 mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-lg bg-slate-950/80 border px-3 py-2 text-sm text-white outline-none ${
                emailError
                  ? "border-red-400/60 focus:border-red-300"
                  : "border-white/15 focus:border-emerald-300"
              }`}
              placeholder="you@example.com"
              inputMode="email"
              autoComplete="email"
            />
            {emailError && (
              <p className="mt-1 text-[11px] text-red-300">{emailError}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-200 mb-2">
              Pet type
            </label>

            <div className="grid grid-cols-3 gap-2">
              {PET_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPetType(opt.value)}
                  className={`
          flex items-center justify-center gap-1.5
          rounded-lg border px-3 py-2 text-sm
          transition
          ${
            petType === opt.value
              ? "border-emerald-300 bg-emerald-400/15 text-emerald-300"
              : "border-white/15 bg-slate-950/70 text-slate-300 hover:border-white/30"
          }
        `}
                >
                  <span className="text-base">{opt.emoji}</span>
                  {opt.label}
                </button>
              ))}
            </div>

            {petType === "Other" && (
              <input
                type="text"
                placeholder="e.g. Rabbit, Bird, Reptile"
                className="mt-2 w-full rounded-lg bg-slate-950/80 border border-white/15 px-3 py-2 text-sm text-white outline-none focus:border-emerald-300"
                onChange={(e) => setPetType(e.target.value)}
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-200 mb-1.5">
              City / suburb (Australia)
            </label>

            {/* 可搜索下拉 */}
            <input
              list="au-city-list"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-lg bg-slate-950/80 border border-white/15 px-3 py-2 text-sm text-white outline-none focus:border-emerald-300"
              placeholder="Start typing (e.g. Sydney)"
            />
            <datalist id="au-city-list">
              {cityOptions.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>

            <p className="mt-1 text-[11px] text-slate-400">
              Tip: type to search. If your suburb isn’t listed, just type it in.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-emerald-400 text-slate-950 text-sm font-semibold py-2.5 hover:bg-emerald-300 transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Join beta"}
          </button>

          {submitted && (
            <p className="text-xs text-emerald-300 mt-2">
              Thanks! You’re on the list. 🐾
            </p>
          )}

          {submitError && (
            <p className="text-xs text-red-300 mt-2">{submitError}</p>
          )}
        </form>
      </div>
    </section>
  );
}
