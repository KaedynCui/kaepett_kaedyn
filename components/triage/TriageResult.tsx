"use client";

import React, { useEffect, useRef, useState } from "react";
import { TriageResult } from "@/lib/triage/types";
import Link from "next/link";

type Message =
  | { type: "text"; content: React.ReactNode; className?: string }
  | { type: "cta"; content: React.ReactNode };

export const TriageResultCard = ({
  result,
  onRestart,
  onBack,
}: {
  result: TriageResult;
  onRestart: () => void;
  onBack: () => void;
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const theme = {
    green: {
      bubble: "bg-emerald-500/10 border-emerald-500/20 text-emerald-200",
      icon: "🛡️",
      label: "Low risk detected",
    },
    yellow: {
      bubble: "bg-amber-500/10 border-amber-500/20 text-amber-200",
      icon: "⚠️",
      label: "Some caution advised",
    },
    red: {
      bubble: "bg-rose-500/10 border-rose-500/20 text-rose-200",
      icon: "🚨",
      label: "Urgent attention recommended",
    },
  }[result.riskLevel];

  /* ---------- auto scroll ---------- */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ---------- build & play message queue ---------- */
  useEffect(() => {
    setMessages([]);

    const queue: Message[] = [
      {
        type: "text",
        content: "Based on what you shared, here’s what I found.",
      },
      {
        type: "text",
        className: theme.bubble,
        content: (
          <>
            <span className="mr-2">{theme.icon}</span>
            {theme.label}. {result.summary}
          </>
        ),
      },
      ...result.actions.map((action) => ({
        type: "text" as const,
        content: action,
      })),
      {
        type: "cta",
        content:
          result.riskLevel !== "red" ? (
            <>
              Want early access to KaePett features in your area?
              <div className="mt-3">
                <Link
                  href="/#join-beta"
                  className="inline-block rounded-full bg-emerald-500 text-slate-950 px-4 py-2 text-sm font-semibold hover:bg-emerald-400 transition"
                >
                  Join the beta
                </Link>
              </div>
            </>
          ) : (
            <>
              It may help to find a nearby emergency clinic right now.
              <div className="mt-3">
                <Link
                  href="/#nearby-clinics"
                  className="inline-block rounded-full bg-rose-600 text-white px-4 py-2 text-sm font-semibold hover:bg-rose-500 transition"
                >
                  Find nearby clinics
                </Link>
              </div>
            </>
          ),
      },
    ];

    let cancelled = false;

    const play = async () => {
      for (const item of queue) {
        if (cancelled) return;

        const delay = 500 + Math.random() * 1000; // 0.5–1.5s
        await new Promise((r) => setTimeout(r, delay));

        setMessages((prev) => [...prev, item]);
      }
    };

    play();

    return () => {
      cancelled = true;
    };
  }, [result]);

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {messages.map((msg, idx) =>
        msg.type === "text" ? (
          <AIBubble key={idx} className={msg.className}>
            {msg.content}
          </AIBubble>
        ) : (
          <AIBubble
            key={idx}
            className={
              result.riskLevel === "red"
                ? "bg-rose-500/10 border-rose-500/20 text-rose-200"
                : ""
            }
          >
            {msg.content}
          </AIBubble>
        )
      )}

      {/* Controls */}
      {messages.length > 0 && (
        <div className="flex gap-3 pt-6">
          <button
            onClick={onBack}
            className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
          >
            Back to answers
          </button>

          <button
            onClick={onRestart}
            className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
          >
            Start over
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="text-center pt-4">
        <p className="text-xs text-gray-500">
          This check does not provide a medical diagnosis. If you’re concerned,
          contact a licensed veterinarian.
        </p>
      </div>

      <div ref={bottomRef} />
    </div>
  );
};

/* ------------------ */
/* AI bubble element */
/* ------------------ */
function AIBubble({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
        🤖
      </div>
      <div
        className={`rounded-2xl bg-slate-900 border border-white/10 px-4 py-3 text-sm leading-relaxed ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
