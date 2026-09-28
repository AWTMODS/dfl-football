'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { dflStore } from '@/lib/store';
import { Match } from '@/lib/types';
import { formatDate, formatINR } from '@/lib/utils';
import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  ArrowLeft,
  Shield,
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
  Info,
  Compass,
} from 'lucide-react';

export default function MatchDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const matchId = params?.id as string;

  const [match, setMatch] = useState<Match | null>(null);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'VENUE' | 'RULES'>('OVERVIEW');
  const [quantity, setQuantity] = useState<number>(2);

  useEffect(() => {
    const matches = dflStore.getMatches();
    const found = matches.find((m) => m.id === matchId);
    setMatch(found || null);
  }, [matchId]);

  if (!match) {
    return (
      <div className="min-h-screen flex flex-col bg-[#060B11] text-white">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <Calendar className="w-12 h-12 text-slate-400 mb-4" />
          <h2 className="text-xl font-bold">Match Not Found</h2>
          <p className="text-sm text-slate-400 mt-1 mb-6">
            The fixture you requested does not exist.
          </p>
          <Link
            href="/matches"
            className="px-5 py-2.5 rounded-xl bg-[#00E676] text-black font-bold text-xs"
          >
            ← Back to Matches
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isAvailable = match.status === 'UPCOMING' && match.availableTickets > 0;
  const subtotal = match.ticketPrice * quantity;

  const handleStartBooking = () => {
    router.push(`/book/${match.id}?qty=${quantity}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060B11] text-white">
      <Navbar />

      {/* Top Banner Header */}
      <div className="relative py-12 md:py-16 border-b border-white/10 pitch-grid bg-[#080E17]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/matches"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00E676] hover:underline mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Matches Schedule</span>
          </Link>

          {/* Match Stage & Number */}
          <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider text-[#00E676] mb-4">
            <span>Match {String(match.matchNumber).padStart(2, '0')}</span>
            <span>•</span>
            <span className="text-white">{match.stage}</span>
          </div>

          {/* Teams Faceoff Header */}
          <div className="grid grid-cols-7 items-center gap-4 py-4 text-center">
            {/* Team A */}
            <div className="col-span-3 flex flex-col items-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/5 border border-white/10 p-3 flex items-center justify-center shadow-2xl">
                <img
                  src={match.teamALogo}
                  alt={match.teamAName}
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="mt-3 text-lg sm:text-2xl font-black text-white">
                {match.teamAName}
              </h2>
            </div>

            {/* VS */}
            <div className="col-span-1 flex flex-col items-center justify-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#00E676]/10 border border-[#00E676]/30 flex items-center justify-center">
                <span className="text-xs sm:text-sm font-black text-[#00E676]">VS</span>
              </div>
            </div>

            {/* Team B */}
            <div className="col-span-3 flex flex-col items-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/5 border border-white/10 p-3 flex items-center justify-center shadow-2xl">
                <img
                  src={match.teamBLogo}
                  alt={match.teamBName}
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="mt-3 text-lg sm:text-2xl font-black text-white">
                {match.teamBName}
              </h2>
            </div>
          </div>

          {/* Match Time & Venue Strip */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-300 font-medium">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <Calendar className="w-4 h-4 text-[#00E676]" />
              {formatDate(match.date)}
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <Clock className="w-4 h-4 text-[#00E676]" />
              {match.time} Kickoff
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <MapPin className="w-4 h-4 text-[#0ea5e9]" />
              {match.venue}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        {/* Ticket Booking Box */}
        <div className="rounded-3xl card-glass border border-[#00E676]/30 p-6 sm:p-8 bg-gradient-to-br from-[#0E1624] via-[#122033] to-[#0E1624] shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#00E676] bg-[#00E676]/10 px-2.5 py-0.5 rounded border border-[#00E676]/30">
                  General Pass
                </span>
                <span className="text-xs text-slate-400">
                  • {match.availableTickets} tickets remaining
                </span>
              </div>
              <h3 className="text-2xl font-black text-white">
                Reserve Spectator Entry Pass
              </h3>
              <p className="text-xs text-slate-300 max-w-md">
                Guarantees entry into the stadium gallery with unobstructed view of the 7-a-side pitch.
              </p>
            </div>

            {/* Quantity Selector & Price */}
            <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="text-center w-8">
                  <span className="text-lg font-black text-white">{quantity}</span>
                </div>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center md:text-right">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  Total Subtotal
                </span>
                <span className="text-2xl font-black text-white text-[#00E676]">
                  {formatINR(subtotal)}
                </span>
              </div>

              {isAvailable ? (
                <button
                  onClick={handleStartBooking}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black text-sm text-black bg-[#00E676] hover:bg-[#00c853] transition-all shadow-lg shadow-[#00E676]/25 hover:scale-105 active:scale-95"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Book {quantity} Pass{quantity > 1 ? 'es' : ''} →</span>
                </button>
              ) : (
                <button
                  disabled
                  className="px-6 py-3 rounded-xl font-bold text-xs text-slate-400 bg-white/5 cursor-not-allowed border border-white/5"
                >
                  Sold Out / Not Available
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Informational Tabs: Overview / Venue / Rules */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2">
            <button
              onClick={() => setActiveTab('OVERVIEW')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'OVERVIEW'
                  ? 'bg-white/10 text-[#00E676] border border-white/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Match Overview
            </button>
            <button
              onClick={() => setActiveTab('VENUE')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'VENUE'
                  ? 'bg-white/10 text-[#00E676] border border-white/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Venue & Directions
            </button>
            <button
              onClick={() => setActiveTab('RULES')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'RULES'
                  ? 'bg-white/10 text-[#00E676] border border-white/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Spectator Instructions
            </button>
          </div>

          {activeTab === 'OVERVIEW' && (
            <div className="space-y-4">
              <div className="rounded-2xl card-glass p-6 border border-white/5 space-y-3">
                <h4 className="text-base font-bold text-white">About This Fixture</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {match.description ||
                    'Crucial fixture in the Defenders Football League 2026. The competing clubs have prepared extensively with their best 7-a-side starting lineups for an electrifying evening in Vengara.'}
                </p>
              </div>

              {match.importantNotes && (
                <div className="rounded-2xl card-glass p-6 border border-white/5 space-y-3">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#0ea5e9]" />
                    Key Matchday Notes
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {match.importantNotes.map((note, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00E676] shrink-0" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'VENUE' && (
            <div className="rounded-2xl card-glass p-6 border border-white/5 space-y-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#0ea5e9]" />
                DFL Stadium Ground, Vengara
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Near Mini Stadium Bypass Road, Vengara, Malappuram, Kerala 676304. Gates open at 06:00 PM (1 hour before match start). Free two-wheeler and four-wheeler parking is available within 100 meters of the stadium.
              </p>
              <div className="pt-2">
                <Link
                  href="/venue"
                  className="text-xs font-bold text-[#00E676] hover:underline flex items-center gap-1"
                >
                  View Complete Venue Map & Directions →
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'RULES' && (
            <div className="rounded-2xl card-glass p-6 border border-white/5 space-y-3">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#00E676]" />
                Entry & Security Guidelines
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#00E676] font-bold">•</span>
                  <span>Spectators must display their digital pass or printed QR code at the gate scanner.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00E676] font-bold">•</span>
                  <span>Each QR code is valid for exactly one entry. Duplicate attempts will be flagged by security.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00E676] font-bold">•</span>
                  <span>Bottles, hazardous items, and fireworks are strictly prohibited inside the stadium gallery.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00E676] font-bold">•</span>
                  <span>Re-entry without prior gate staff endorsement is not permitted.</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
