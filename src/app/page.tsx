'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import MatchCard from '@/components/public/MatchCard';
import TeamCard from '@/components/public/TeamCard';
import { dflStore } from '@/lib/store';
import { Match, Team, TournamentSettings } from '@/lib/types';
import { formatDate, formatINR } from '@/lib/utils';
import {
  Trophy,
  Calendar,
  Users,
  MapPin,
  Clock,
  Ticket,
  ChevronRight,
  Shield,
  Flame,
  Award,
  HelpCircle,
  Compass,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [settings, setSettings] = useState<TournamentSettings | null>(null);

  useEffect(() => {
    setMatches(dflStore.getMatches());
    setTeams(dflStore.getTeams());
    setSettings(dflStore.getSettings());
  }, []);

  const upcomingMatches = matches.slice(0, 4);
  const featuredMatch = matches[0]; // Match 01: Kondotty FC vs Vengara United
  const topTeams = teams.slice(0, 6);

  const tournamentStats = [
    { label: 'Teams', value: '20', sub: 'Elite Football Clubs' },
    { label: 'Format', value: '7-A-Side', sub: 'Fast Paced Malabar 7s' },
    { label: 'Duration', value: '15 Days', sub: 'Non-stop Floodlight Thrills' },
    { label: 'Matches', value: '50+', sub: 'High Stakes Fixtures' },
    { label: 'Location', value: 'Vengara', sub: 'Malappuram Football Hub' },
  ];

  const tournamentStages = [
    {
      step: '01',
      title: 'Registration & Draw',
      desc: '20 premier Malabar clubs seeded across four competitive groups.',
      status: 'Completed',
    },
    {
      step: '02',
      title: 'Group Stage League',
      desc: 'Top 2 teams from each group qualify after intense round-robin games.',
      status: 'Oct 20 - Oct 29',
    },
    {
      step: '03',
      title: 'Quarter Finals',
      desc: 'Eight surviving titans clash in straight knockout football.',
      status: 'Oct 30 - Oct 31',
    },
    {
      step: '04',
      title: 'Semi Finals',
      desc: 'High-voltage fixtures to determine who fights for glory.',
      status: 'Nov 02 - Nov 03',
    },
    {
      step: '05',
      title: 'The Grand Final',
      desc: 'Crowning the official Defenders Football League 2026 Champion.',
      status: 'Nov 04, 2026',
    },
  ];

  const faqs = [
    {
      q: 'Do I need an account to book tickets?',
      a: 'No! You can book tickets directly using only your Name and Mobile Number. Your ticket and booking ID will be generated immediately with a unique QR code.',
    },
    {
      q: 'How do I access my tickets on match day?',
      a: 'You can download the digital pass, save the QR code image, or look up your booking anytime using our "Track Ticket" page with your Booking ID and Phone number.',
    },
    {
      q: 'Can I book multiple tickets for friends or family?',
      a: 'Yes, you can book up to 10 tickets per transaction. Each ticket in the booking receives its own unique Ticket ID and individual QR code, so entry can be scanned individually.',
    },
    {
      q: 'What time do stadium gates open?',
      a: 'Gates open 1 hour before scheduled kickoff time (at 06:00 PM for 07:00 PM games). Early arrival is recommended to secure good vantage points.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#060B11] text-white selection:bg-[#00E676] selection:text-black">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden pitch-grid">
        {/* Stadium Floodlight Radial Ambience */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-gradient-to-b from-[#00E676]/15 via-[#0ea5e9]/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Tournament Super-badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-300 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
              <span className="uppercase tracking-widest text-[#00E676]">
                7-A-Side Football Tournament
              </span>
              <span className="text-white/20">|</span>
              <span className="text-slate-300">Vengara, Malappuram</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-[1.05]">
              DFL <span className="text-[#00E676]">FOOTBALL</span>
              <span className="block text-2xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 font-extrabold normal-case tracking-normal mt-2">
                Defenders Football League
              </span>
            </h1>

            {/* Date & Location Pill */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-300 font-medium">
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <MapPin className="w-4 h-4 text-[#0ea5e9]" />
                Vengara, Malappuram, Kerala
              </span>
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <Calendar className="w-4 h-4 text-[#00E676]" />
                Starting October 20, 2026
              </span>
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <Clock className="w-4 h-4 text-amber-400" />
                15 Days of Football
              </span>
            </div>

            <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
              Experience the roar of Malabar football under the floodlights. 20 powerhouse teams, intense 7-a-side matches, and unforgettable electric stadium atmosphere. Secure your entry pass today.
            </p>

            {/* Hero CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/matches"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-black text-black bg-[#00E676] hover:bg-[#00c853] transition-all shadow-xl shadow-[#00E676]/25 hover:scale-105 active:scale-95"
              >
                <Ticket className="w-5 h-5" />
                <span>Book Tickets</span>
              </Link>

              <Link
                href="/matches"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-bold text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all"
              >
                <span>View Matches</span>
                <ChevronRight className="w-4 h-4 text-[#00E676]" />
              </Link>
            </div>
          </div>

          {/* Tournament Stats Cards */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {tournamentStats.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl card-glass p-5 border border-white/5 text-center relative overflow-hidden group hover:border-[#00E676]/30 transition-all"
              >
                <div className="text-3xl sm:text-4xl font-black text-white group-hover:text-[#00E676] transition-colors">
                  {item.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mt-1">
                  {item.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING MATCH SPOTLIGHT CARD */}
      {featuredMatch && (
        <section className="py-10 bg-[#080E17] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00E676] animate-ping" />
                <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                  Tournament Opener / Next Match
                </h2>
              </div>
              <Link
                href="/matches"
                className="text-xs font-bold text-[#00E676] hover:underline flex items-center gap-1"
              >
                View Full Fixtures →
              </Link>
            </div>

            <div className="rounded-3xl card-glass border border-[#00E676]/30 p-6 sm:p-8 bg-gradient-to-r from-[#0E1624] via-[#121E31] to-[#0E1624] shadow-2xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
                {/* Match Info Column */}
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#00E676] uppercase tracking-wider mb-4">
                    <span>Match 01</span>
                    <span>•</span>
                    <span>Group Stage</span>
                    <span>•</span>
                    <span className="text-slate-300">Floodlight Opener</span>
                  </div>

                  {/* Teams Row */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 my-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 p-2 flex items-center justify-center shrink-0">
                        <img
                          src={featuredMatch.teamALogo}
                          alt={featuredMatch.teamAName}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-semibold text-slate-400">Team A</span>
                        <h3 className="text-xl sm:text-2xl font-black text-white">
                          {featuredMatch.teamAName}
                        </h3>
                      </div>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-[#00E676]/10 border border-[#00E676]/30 flex items-center justify-center text-xs font-black text-[#00E676]">
                      VS
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 p-2 flex items-center justify-center shrink-0">
                        <img
                          src={featuredMatch.teamBLogo}
                          alt={featuredMatch.teamBName}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-semibold text-slate-400">Team B</span>
                        <h3 className="text-xl sm:text-2xl font-black text-white">
                          {featuredMatch.teamBName}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Date, Time, Venue */}
                  <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#00E676]" />
                      {formatDate(featuredMatch.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#00E676]" />
                      {featuredMatch.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#0ea5e9]" />
                      {featuredMatch.venue}
                    </span>
                  </div>
                </div>

                {/* Booking Callout Column */}
                <div className="lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-8 flex flex-col justify-center">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase">
                        General Pass
                      </span>
                      <span className="text-xs font-extrabold text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded border border-[#00E676]/30">
                        {featuredMatch.availableTickets} Tickets Left
                      </span>
                    </div>

                    <div className="text-3xl font-black text-white">
                      {formatINR(featuredMatch.ticketPrice)}
                      <span className="text-xs font-normal text-slate-400 ml-1">/ person</span>
                    </div>

                    <Link
                      href={`/book/${featuredMatch.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-black text-sm text-black bg-[#00E676] hover:bg-[#00c853] transition-all shadow-lg shadow-[#00E676]/20"
                    >
                      <Ticket className="w-4 h-4" />
                      <span>Book Tickets Now</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FEATURED MATCHES GRID */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#00E676] uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4" />
              <span>Match Center</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Upcoming Featured Matches
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Select any match to reserve single or multiple spectator passes.
            </p>
          </div>

          <Link
            href="/matches"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00E676] hover:underline"
          >
            <span>View All Matches Schedule</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      {/* TOURNAMENT TEAMS PREVIEW */}
      <section className="py-16 bg-[#080E17] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#0ea5e9] uppercase tracking-wider mb-2">
                <Users className="w-4 h-4" />
                <span>Participating Clubs</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                20 Powerhouse 7-A-Side Teams
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Featuring the best local clubs and players from across Malappuram & Kerala.
              </p>
            </div>

            <Link
              href="/teams"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0ea5e9] hover:underline"
            >
              <span>View All 20 Teams</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {topTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/teams"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              <span>Explore All 20 Participating Teams</span>
              <ArrowRight className="w-4 h-4 text-[#00E676]" />
            </Link>
          </div>
        </div>
      </section>

      {/* TOURNAMENT JOURNEY / STAGES */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#00E676] uppercase tracking-widest block mb-2">
            The Road to the Trophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Tournament Stages & Journey
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Five stages of high stakes football from October 20 to November 04, 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {tournamentStages.map((stage, idx) => (
            <div
              key={idx}
              className="rounded-2xl card-glass p-5 border border-white/5 relative group hover:border-[#00E676]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black text-slate-400 group-hover:text-[#00E676] transition-colors">
                    {stage.step}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-[#00E676] border border-white/10">
                    {stage.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">{stage.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VENUE SECTION */}
      <section className="py-16 bg-[#080E17] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-[#0ea5e9] uppercase tracking-widest block mb-2">
                  Official Venue
                </span>
                <h2 className="text-3xl font-black text-white">
                  DFL Stadium Ground, Vengara
                </h2>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  Located in the football heart of Malappuram, our ground features world-class floodlighting, natural grass turf, tiered spectator galleries, and dedicated refreshment areas.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <MapPin className="w-5 h-5 text-[#00E676] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Address</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Near Mini Stadium Bypass Road, Vengara, Malappuram, Kerala 676304
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <Clock className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Match Timings</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Floodlight Kickoff at 07:00 PM every evening. Gates open 06:00 PM.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <Link
                  href="/venue"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
                >
                  <Compass className="w-4 h-4 text-[#00E676]" />
                  <span>Venue Guidelines & Parking</span>
                </Link>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#0ea5e9] hover:underline"
                >
                  <span>Open in Google Maps →</span>
                </a>
              </div>
            </div>

            {/* Stadium / Map Visual Graphic */}
            <div className="rounded-3xl card-glass border border-white/10 p-6 bg-gradient-to-br from-[#0F1826] to-[#0A101A] relative overflow-hidden">
              <div className="aspect-video w-full rounded-2xl bg-black/40 border border-white/10 relative flex flex-col items-center justify-center p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-[#00E676]/10 border border-[#00E676]/30 flex items-center justify-center mb-3">
                  <MapPin className="w-7 h-7 text-[#00E676]" />
                </div>
                <h3 className="text-base font-bold text-white">DFL Stadium Ground, Vengara</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Malappuram District, Kerala — GPS Coordinates: 11.0514° N, 75.9862° E
                </p>
                <div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-[#00E676] bg-[#00E676]/10 px-3 py-1 rounded-full border border-[#00E676]/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Parking for 500+ Vehicles Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-[#00E676] uppercase tracking-widest block mb-2">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Spectator & Ticketing Information
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl card-glass p-5 sm:p-6 border border-white/5 space-y-2"
            >
              <h3 className="text-base font-bold text-white flex items-start gap-2.5">
                <HelpCircle className="w-5 h-5 text-[#00E676] shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-sm text-slate-400 pl-7 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="text-xs font-bold text-slate-400 hover:text-white underline underline-offset-4"
          >
            Read All Ticketing and Tournament FAQs →
          </Link>
        </div>
      </section>

      {/* BOTTOM TICKET CALL TO ACTION */}
      <section className="py-16 bg-gradient-to-t from-[#0E1624] to-[#060B11] border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E676]/10 border border-[#00E676]/30 text-xs font-bold text-[#00E676]">
            <Sparkles className="w-4 h-4" />
            <span>Tickets Selling Fast For Match 01</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Be Part of Vengara Football History
          </h2>
          <p className="text-base text-slate-400 max-w-xl mx-auto">
            Book your digital match passes now without any account creation. Instant QR code verification and entry.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/matches"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-black text-black bg-[#00E676] hover:bg-[#00c853] transition-all shadow-xl shadow-[#00E676]/30"
            >
              <Ticket className="w-5 h-5" />
              <span>Book Match Tickets</span>
            </Link>
            <Link
              href="/track-ticket"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl text-sm font-bold text-white bg-white/5 hover:bg-white/10 border border-white/15"
            >
              <span>Track Existing Ticket</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
