// app/triage/page.tsx
import React from "react";
import TriageWizard from "@/components/triage/TriageWizard";

export default function TriagePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden">
      {/* Background Ambience (Glow effects) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Navbar Placeholder (保持与现有页面一致，这里只写个标题) */}
      <header className="p-6 flex justify-center sticky top-0 z-10">
        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-200 to-white bg-clip-text text-transparent">
          Kaepett Triage
        </h1>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 z-10 pb-20">
        <TriageWizard />
      </div>
    </main>
  );
}
