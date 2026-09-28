'use client';

import React from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { ShieldCheck, Lock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#060B11] text-white">
      <Navbar />

      <div className="relative py-14 border-b border-white/10 pitch-grid bg-[#080E17]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E676]/10 text-[#00E676] text-xs font-bold border border-[#00E676]/30 uppercase tracking-widest">
            <Lock className="w-3.5 h-3.5" />
            Data Protection
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400">
            Defenders Football League 2026 — Spectator Privacy Standards
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section className="space-y-3 rounded-2xl card-glass p-6 border border-white/5">
          <h2 className="text-base font-bold text-white">1. Minimal Information Collection</h2>
          <p>
            At DFL Football, we respect spectator privacy. To streamline match entry, we intentionally do NOT require you to create or maintain an account. We only collect the minimal information necessary to deliver and verify your tickets: your Full Name and Mobile Number (and optional email address).
          </p>
        </section>

        <section className="space-y-3 rounded-2xl card-glass p-6 border border-white/5">
          <h2 className="text-base font-bold text-white">2. QR Verification & Security</h2>
          <p>
            Each ticket QR code encodes an encrypted unique reference identifier (e.g. DFL-TKT-XXXXXX). Sensitive personal information is never encoded in plain text inside the QR matrix. Gate scanners perform server-side validation against our secure database.
          </p>
        </section>

        <section className="space-y-3 rounded-2xl card-glass p-6 border border-white/5">
          <h2 className="text-base font-bold text-white">3. Communications & Contact</h2>
          <p>
            Your phone number is used exclusively for booking retrieval and matchday notification alerts (such as schedule adjustments or emergency announcements). We never sell or share spectator data with third-party advertisers.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
}
