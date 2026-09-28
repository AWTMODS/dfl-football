'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import MatchCard from '@/components/public/MatchCard';
import { dflStore } from '@/lib/store';
import { Team, Match } from '@/lib/types';
import {
  MapPin,
  Calendar,
  Users,
  Trophy,
  ArrowLeft,
  Shield,
  CheckCircle2,
  Ticket,
} from 'lucide-react';

export default function TeamDetailsPage() {
  const params = useParams();
  const teamId = params?.id as string;

  const [team, setTeam] = useState<Team | null>(null);
  const [teamMatches, setTeamMatches] = useState<Match[]>([]);

  useEffect(() => {
    const teams = dflStore.getTeams();
    const found = teams.find((t) => t.id === teamId);
    setTeam(found || null);

    if (found) {
      const allMatches = dflStore.getMatches();
      const matches = allMatches.filter(
        (m) => m.teamAId === found.id || m.teamBId === found.id
      );
      setTeamMatches(matches);
    }
  }, [teamId]);

  if (!team) {
    return (
      <div className="min-h-screen flex flex-col bg-[#060B11] text-white">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <Users className="w-12 h-12 text-slate-400 mb-4" />
          <h2 className="text-xl font-bold">Team Not Found</h2>
          <p className="text-sm text-slate-400 mt-1 mb-6">
            The club you are looking for does not exist in DFL 2026.
          </p>
          <Link
            href="/teams"
            className="px-5 py-2.5 rounded-xl bg-[#00E676] text-black font-bold text-xs"
          >
            ← Back to All Teams
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#060B11] text-white">
      <Navbar />

      {/* Top Banner */}
      <div className="relative py-12 border-b border-white/10 pitch-grid bg-[#080E17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/teams"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00E676] hover:underline mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All 20 Teams</span>
          </Link>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/5 border border-white/10 p-3 flex items-center justify-center shadow-xl shadow-black/50 shrink-0">
              <img
                src={team.logo}
                alt={team.name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h1 className="text-2xl sm:text-4xl font-black text-white">{team.name}</h1>
                <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30">
                  Rank #{team.position}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#0ea5e9]" />
                  {team.location}
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  Est. {team.founded}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  Head Coach: {team.coach}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed pt-1">
                {team.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-12">
        {/* League Record Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          <div className="rounded-2xl card-glass p-4 text-center border border-white/5">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Matches</span>
            <span className="text-xl sm:text-2xl font-black text-white">{team.matchesPlayed}</span>
          </div>
          <div className="rounded-2xl card-glass p-4 text-center border border-white/5">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Won</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400">{team.won}</span>
          </div>
          <div className="rounded-2xl card-glass p-4 text-center border border-white/5">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Drawn</span>
            <span className="text-xl sm:text-2xl font-black text-slate-300">{team.drawn}</span>
          </div>
          <div className="rounded-2xl card-glass p-4 text-center border border-white/5">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Lost</span>
            <span className="text-xl sm:text-2xl font-black text-rose-400">{team.lost}</span>
          </div>
          <div className="rounded-2xl card-glass p-4 text-center border border-white/5">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Goals Scored</span>
            <span className="text-xl sm:text-2xl font-black text-white">{team.goalsFor}</span>
          </div>
          <div className="rounded-2xl card-glass p-4 text-center border border-white/5">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Conceded</span>
            <span className="text-xl sm:text-2xl font-black text-slate-400">{team.goalsAgainst}</span>
          </div>
          <div className="col-span-2 sm:col-span-1 rounded-2xl card-glass p-4 text-center border border-[#00E676]/30 bg-[#00E676]/5">
            <span className="text-[10px] font-bold uppercase text-[#00E676] block">Total Points</span>
            <span className="text-xl sm:text-2xl font-black text-[#00E676]">{team.points}</span>
          </div>
        </div>

        {/* Squad Lineup & Registered Players */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#00E676]" />
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">
              7-A-Side Registered Squad
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {team.squad.map((player, idx) => (
              <div
                key={idx}
                className="rounded-2xl card-glass p-3 border border-white/5 text-center space-y-1"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-xs font-bold text-[#00E676]">
                  {idx + 1}
                </div>
                <h4 className="text-xs font-bold text-white truncate">{player}</h4>
                <span className="text-[10px] text-slate-400 block">
                  {player.includes('GK') ? 'Goalkeeper' : player.includes('(C)') ? 'Captain' : 'Outfield'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Fixtures for this Team */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#0ea5e9]" />
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                Matches For {team.name}
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              {teamMatches.length} Fixtures Scheduled
            </span>
          </div>

          {teamMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMatches.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center card-glass rounded-2xl border border-white/5 p-6">
              <p className="text-sm text-slate-400">No scheduled fixtures found for this team yet.</p>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}
