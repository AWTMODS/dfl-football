'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import {
  Trophy,
  Calendar,
  MapPin,
  Clock,
  Shield,
  Award,
  Users,
  CheckCircle2,
  FileText,
  Ticket,
} from 'lucide-react';

export default function TournamentPage() {
  const rules = [
    {
      title: '7-A-Side Format',
      desc: '7 players on field per team (including goalkeeper) with up to 5 registered substitutes.',
    },
    {
      title: 'Match Duration',
      desc: 'Matches consist of two 25-minute halves with a 7-minute half-time interval.',
    },
    {
      title: 'Rolling Substitutions',
      desc: 'Rolling substitutions are permitted during play with the referee’s acknowledgement.',
    },
    {
      title: 'Discipline & Cards',
      desc: 'A yellow card incurs a 5-minute sin-bin cooling period. Direct red cards result in immediate expulsion.',
    },
    {
      title: 'Tie-breakers & Knockouts',
      desc: 'Drawn knockout fixtures advance directly to sudden-death penalty shootouts (3 kicks each).',
    },
    {
      title: 'Offside Rule',
      desc: 'Standard 7s simplified offside rules apply inside the attacking third designated line.',
    },
  ];

  const prizes = [
    {
      title: 'Champions',
      reward: '₹1,50,000 + Rolling DFL Gold Trophy',
      desc: 'Awarded to the tournament winner with medals and team honors.',
      highlight: true,
    },
    {
      title: 'Runners-Up',
      reward: '₹75,000 + Silver Trophy',
      desc: 'Presented to the final runner-up along with silver medals.',
    },
    {
      title: 'Player of Tournament',
      reward: '₹15,000 + Golden Ball Trophy',
      desc: 'Selected by the DFL Technical Committee for standout consistency.',
    },
    {
      title: 'Golden Boot (Top Scorer)',
      reward: '₹10,000 + Golden Boot Plaque',
      desc: 'Highest goals scored across all tournament stages.',
    },
    {
      title: 'Best Goalkeeper',
      reward: '₹10,000 + Golden Glove Award',
      desc: 'Most clean sheets and critical penalty saves.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#060B11] text-white">
      <Navbar />

      {/* Header Banner */}
      <div className="relative py-14 md:py-20 border-b border-white/10 pitch-grid bg-[#080E17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E676]/10 text-[#00E676] text-xs font-bold border border-[#00E676]/30 uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5" />
            Official Tournament Guide
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Defenders Football League 2026
          </h1>
          <p className="text-base text-slate-400 max-w-2xl mx-auto">
            The grand 7-a-side floodlight football championship in Vengara, Malappuram. Discover the format, regulations, prize pool, and schedule.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <Calendar className="w-4 h-4 text-[#00E676]" /> Oct 20 – Nov 04, 2026
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <MapPin className="w-4 h-4 text-[#0ea5e9]" /> DFL Stadium, Vengara
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <Users className="w-4 h-4 text-amber-400" /> 20 Elite Kerala Clubs
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16 flex-1 w-full">
        {/* Format & Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#00E676] uppercase tracking-widest block">
              About The Tournament
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              The Epicenter of 7-A-Side Football
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              DFL Football is envisioned to celebrate the deep-rooted passion for football in Malabar. Vengara serves as the battleground where 20 celebrated clubs from across Malappuram, Kozhikode, and neighboring districts fight for tournament prestige under international-standard floodlighting.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Over the course of 15 adrenaline-packed days, more than 50 matches will be played on a premium natural turf surface, catering to thousands of passionate spectators every evening.
            </p>
            <div className="pt-2">
              <Link
                href="/matches"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-[#00E676] hover:bg-[#00c853] transition-all shadow-md shadow-[#00E676]/20"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Reserve Match Tickets</span>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl card-glass p-6 border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00E676]" />
              Tournament Structure
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                <span><strong>20 Participating Teams</strong> divided into 4 groups of 5 teams each.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                <span><strong>Single Round Robin</strong> in group stage (top 2 teams advance from each group).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                <span><strong>Quarter Finals</strong>: 8 qualified teams in single elimination knockout.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                <span><strong>Semi Finals & Grand Final</strong> played under prime time floodlights with live commentary.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Official Rules */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#0ea5e9] uppercase tracking-widest block mb-1">
              Regulations
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Official Tournament Rules
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rules.map((rule, idx) => (
              <div
                key={idx}
                className="rounded-2xl card-glass p-5 border border-white/5 space-y-2 hover:border-[#00E676]/30 transition-all"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#00E676]" />
                  <h3 className="text-sm font-bold text-white">{rule.title}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{rule.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Prize Pool */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
              Awards & Honors
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Tournament Prize Pool
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {prizes.map((p, idx) => (
              <div
                key={idx}
                className={`rounded-2xl card-glass p-5 border transition-all ${
                  p.highlight
                    ? 'border-[#00E676]/50 bg-gradient-to-br from-[#0E1624] via-[#122336] to-[#0E1624]'
                    : 'border-white/5'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    {p.title}
                  </span>
                  <Award
                    className={`w-4 h-4 ${
                      p.highlight ? 'text-[#00E676]' : 'text-amber-400'
                    }`}
                  />
                </div>
                <div className="text-lg font-black text-white">{p.reward}</div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
