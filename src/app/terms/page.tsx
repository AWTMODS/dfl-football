'use client';

import React from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { ShieldAlert, FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#060B11] text-white">
      <Navbar />

      <div className="relative py-14 border-b border-white/10 pitch-grid bg-[#080E17]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E676]/10 text-[#00E676] text-xs font-bold border border-[#00E676]/30 uppercase tracking-widest">
            <FileText className="w-3.5 h-3.5" />
            Spectator Regulations
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-sm text-slate-400">
            Defenders Football League 2026 — Vengara, Malappuram
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section className="space-y-3 rounded-2xl card-glass p-6 border border-white/5">
          <h2 className="text-base font-bold text-white">1. Ticketing & Gate Admission</h2>
          <p>
            Each digital pass purchased through DFL Football represents a single spectator admission to the designated match. Each individual ticket contains a cryptographically verified QR code. The gate scanner operates on a first-scan basis; upon verification, the ticket status changes to USED.
          </p>
          <p>
            Purchasing multiple passes generates unique QR codes for every attendee. The booking holder is solely responsible for distributing each unique ticket to their accompanying members.
          </p>
        </section>

        <section className="space-y-3 rounded-2xl card-glass p-6 border border-white/5">
          <h2 className="text-base font-bold text-white">2. Cancellation & Rescheduling Policy</h2>
          <p>
            In the event of heavy weather delays or technical stoppages typical to monsoon intervals, matches may be postponed to the designated reserve day. In such cases, passes remain fully valid for the rescheduled fixture.
          </p>
          <p>
            Voluntary refund requests must be initiated at least 24 hours prior to match kickoff. Cancelled tickets are immediately revoked on the gate scanner database.
          </p>
        </section>

        <section className="space-y-3 rounded-2xl card-glass p-6 border border-white/5">
          <h2 className="text-base font-bold text-white">3. Stadium Conduct & Safety</h2>
          <p>
            Spectators must cooperate with stadium security officers and gate stewards. Weapons, glass bottles, metal canisters, and flares are strictly prohibited. DFL reserves the right of admission and may refuse entry to disorderly individuals.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
}
