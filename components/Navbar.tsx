"use client";

import React, { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Clinics", href: "#clinics" },
  { label: "Deals", href: "#deals" },
  { label: "FAQ", href: "#faq" },
];

export const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleNavClick = (href: string) => {
    // 如果是站内锚点，用 scrollIntoView
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
        return;
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* 玻璃态背景 */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/0" />
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* 左：Logo + 文案 */}
        <Link
          href="/"
          className="logo-wrapper group flex items-center gap-2 rounded-full px-2 py-1"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-500 shadow-md shadow-emerald-500/30">
            {/* 小爪子图标 */}
            <span className="paw-icon text-xl leading-none">🐾</span>
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="animate-logo-breath text-base font-semibold tracking-tight text-white">
              KaePett
            </span>
            <span className="text-[11px] font-medium text-emerald-300/80">
              Caring AI for your pet
            </span>
          </div>
        </Link>

        {/* 中：菜单（桌面版） */}
        <div className="hidden items-center gap-6 rounded-full border border-white/5 bg-white/5 px-5 py-2 text-sm text-slate-200 backdrop-blur-xl md:flex">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="relative rounded-full px-2 py-1 text-xs font-medium tracking-wide text-slate-200 transition hover:text-white"
            >
              {item.label}
              <span className="pointer-events-none absolute inset-x-1 -bottom-0.5 h-px origin-center scale-x-0 bg-gradient-to-r from-emerald-400 to-sky-400 transition-transform duration-200 group-hover:scale-x-100" />
            </button>
          ))}
        </div>

        {/* 右：搜索 + 主题占位 + Join Beta（桌面版） */}
        <div className="hidden items-center gap-3 md:flex">
          {/* 搜索图标占位 */}
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-slate-200 hover:bg-white/10"
            aria-label="Search"
          >
            <svg
              className="h-3 w-3"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            >
              <circle cx="11" cy="11" r="6" />
              <line x1="16" y1="16" x2="21" y2="21" />
            </svg>
          </button>

          {/* 主题切换占位（你以后可以接 theme） */}
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-slate-200 hover:bg-white/10"
            aria-label="Toggle theme"
          >
            🌙
          </button>

          {/* Join Beta 呼吸动画按钮 */}
          <button
            onClick={() => handleNavClick("#join-beta")}
            className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:brightness-110"
          >
            <span className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-emerald-400/40 to-sky-500/40 opacity-60 blur-md animate-pulse" />
            <span className="relative">Join beta</span>
          </button>
        </div>

        {/* 移动端菜单按钮 */}
        <button
          className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="flex flex-col gap-1.5">
            <span className="h-[2px] w-4 rounded-full bg-white" />
            <span className="h-[2px] w-3 rounded-full bg-white" />
          </div>
        </button>
      </nav>

      {/* 移动端下拉菜单 */}
      {open && (
        <div className="md:hidden">
          <div className="mx-4 mt-2 rounded-2xl border border-white/10 bg-slate-950/95 p-4 text-sm text-slate-100 backdrop-blur-xl">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="w-full rounded-xl px-2 py-2 text-left text-sm text-slate-200 hover:bg-white/5"
                >
                  {item.label}
                </button>
              ))}
              <div className="mt-2 border-t border-white/10 pt-3">
                <button
                  onClick={() => handleNavClick("#join-beta")}
                  className="w-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 px-3 py-2 text-xs font-semibold text-slate-950"
                >
                  Join beta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
