// components/Hero.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

type HeroProps = {
  onDownloadClick: () => void;
  onHowItWorksClick: () => void;
  onJoinBetaClick: () => void;
};

const Icons = {
  Send: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  ),
};

export function Hero({
  onDownloadClick,
  onHowItWorksClick,
  onJoinBetaClick,
}: HeroProps) {
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      role: "user",
      text: "Rex didn't finish his dinner and seems lethargic.",
      show: false,
    },
    {
      id: 2,
      role: "ai",
      text: "I'm analysing his recent activity. Have you noticed any gum paleness or vomiting?",
      show: false,
    },
    {
      id: 3,
      role: "user",
      text: "No vomiting, but his gums look a bit pale.",
      show: false,
    },
    {
      id: 4,
      role: "ai",
      text: "Pale gums + lethargy can indicate anemia. I recommend seeing a vet within 24h.",
      type: "alert",
      show: false,
    },
  ]);

  React.useEffect(() => {
    const timeouts = messages.map((_, index) =>
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg, i) => (i === index ? { ...msg, show: true } : msg))
        );
      }, index * 1500 + 500)
    );
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden selection:bg-[#FF7E67] selection:text-white">
      {/* 背景 */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2DD4BF] opacity-[0.08] blur-[120px] rounded-full translate-x-1/2 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#6366F1] opacity-[0.08] blur-[120px] rounded-full -translate-x-1/2 translate-y-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        {/* 左：文案 + 按钮 */}
        <div className="space-y-8 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tighter">
            The AI Companion Who <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DD4BF] to-[#6366F1]">
              Truly Understands
            </span>{" "}
            Your Pet.
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 leading-relaxed">
            KaePett chats with you, decodes your pet’s behavior, recommends
            nutrition, flags risk signals, and finds the best nearby vets &
            deals — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            {/* Download App → 打开对话框 */}
            <button
              onClick={onDownloadClick}
              className="group relative bg-[#FF7E67] hover:bg-[#ff8f7a] text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_-5px_rgba(255,126,103,0.4)] hover:shadow-[0_0_30px_-5px_rgba(255,126,103,0.6)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
            >
              Try AI Health Check
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20" />
            </button>

            {/* See How It Works → 滚动 */}
            <button
              onClick={onHowItWorksClick}
              className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-white border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
            >
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              See How It Works
            </button>
          </div>

          {/* Join beta 按钮（滚动到底部表单） */}
          <div className="flex justify-center lg:justify-start">
            <button
              onClick={onJoinBetaClick}
              className="text-sm text-emerald-300 hover:text-emerald-200 underline underline-offset-4"
            >
              Or join the beta waitlist →
            </button>
          </div>

          {/* Social proof */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <div className="flex -space-x-2">
              {[
                "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Cat",
                "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Dog",
                "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Hamster",
                "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Parrot",
              ].map((src, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-[#0F1115] overflow-hidden bg-slate-800"
                >
                  <img
                    src={src}
                    alt="Pet owner avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-400 font-medium">
              Trusted by <span className="text-white">10,000+</span> urban pet
              owners
            </div>
          </div>
        </div>

        {/* 右：手机 UI */}
        <div className="relative mx-auto lg:ml-auto w-full max-w-[400px]">
          <div className="relative rounded-[3rem] border-[6px] border-[#27272A] bg-[#0F1115] shadow-2xl overflow-hidden h-[650px]">
            <div className="absolute top-0 inset-x-0 h-8 bg-black z-30 flex justify-center">
              <div className="w-32 h-6 bg-[#0F1115] rounded-b-2xl border-b border-x border-[#27272A]" />
            </div>

            <div className="flex flex-col h-full bg-gradient-to-b from-[#0F1115] via-[#13151a] to-[#0F1115]">
              <div className="flex-1 overflow-y-auto p-6 pt-16 space-y-5 no-scrollbar">
                <div className="text-center text-xs text-gray-600 mb-4">
                  Today, 10:23 AM
                </div>

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex w-full ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    } transition-all duration-500 ${
                      msg.show
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    {msg.role === "ai" && (
                      <div className="w-8 h-8 mr-2 rounded-full bg-gradient-to-br from-[#2DD4BF] to-[#6366F1] p-[1px]">
                        <div className="w-full h-full bg-[#0F1115] rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                          AI
                        </div>
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] p-4 text-sm shadow-sm ${
                        msg.role === "user"
                          ? "bg-[#2DD4BF] text-[#0F1115] rounded-2xl rounded-tr-sm font-medium"
                          : "bg-[#1F2937] border border-white/10 text-gray-100 rounded-2xl rounded-tl-sm"
                      }`}
                    >
                      {msg.type === "alert" && (
                        <div className="flex items-center gap-2 text-xs font-bold text-[#FF7E67] uppercase tracking-wider mb-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7E67] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7E67]"></span>
                          </span>
                          Risk Signal Detected
                        </div>
                      )}
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-[#1F2937]/80 backdrop-blur-md border-t border-white/10">
                <div className="flex items-center gap-2 bg-[#0F1115] border border-white/10 rounded-full px-4 py-3">
                  <div className="flex-1 text-sm text-gray-500">
                    Reply to KaePett...
                  </div>
                  <div className="text-[#2DD4BF]">
                    <Icons.Send />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
