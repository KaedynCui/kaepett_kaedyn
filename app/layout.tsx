// app/layout.tsx
import { Inter_Tight } from 'next/font/google';
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KaePett | The AI Companion for Pet Health",
  description: "Chat with KaePett to track your pet’s behavior, decode health signals, and find the best local care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${inter.variable} ${interTight.className} font-sans antialiased selection:bg-[#2DD4BF] selection:text-[#0F1115]`}>
        {children}
      </body>
    </html>
  );
}