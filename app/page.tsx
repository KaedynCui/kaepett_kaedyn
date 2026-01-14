// app/page.tsx
"use client";

import React, { useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { NearbyClinics } from "@/components/NearbyClinics";
import { Deals } from "@/components/Deals";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { JoinBeta } from "@/components/JoinBeta";
import { DownloadDialog } from "@/components/DownloadDialog";
import { useRouter } from "next/navigation";

export default function Home() {
  const howItWorksRef = useRef<HTMLDivElement | null>(null);
  const joinBetaRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const handleScrollToHowItWorks = () => {
    if (howItWorksRef.current) {
      howItWorksRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToJoinBeta = () => {
    if (joinBetaRef.current) {
      joinBetaRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-950 text-slate-50">
        <Hero
          onDownloadClick={() => router.push("/triage")}
          onHowItWorksClick={handleScrollToHowItWorks}
          onJoinBetaClick={handleScrollToJoinBeta}
        />

        <Features />

        <div ref={howItWorksRef}>
          <HowItWorks />
        </div>

        <NearbyClinics />

        <Deals />

        <Testimonials />

        <FAQ />

        <div ref={joinBetaRef}>
          <JoinBeta />
        </div>
      </main>

      <DownloadDialog
        open={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />
    </>
  );
}
