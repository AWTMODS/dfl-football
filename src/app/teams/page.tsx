'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import TeamCard from '@/components/public/TeamCard';
import { dflStore } from '@/lib/store';
import { Team } from '@/lib/types';
import { Search, Users, Trophy } from 'lucide-react';

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setTeams(dflStore.getTeams());
  }, []);

  const filteredTeams = teams.filter((t) => {
    const query = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(query) ||
      t.location.toLowerCase().includes(query) ||
      t.coach.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#060B11] text-white">
      <Navbar />

      {/* Header Banner */}
      <div className="relative py-12 md:py-16 border-b border-white/10 pitch-grid bg-[#080E17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0ea5e9]/10 text-[#0ea5e9] text-xs font-bold border border-[#0ea5e9]/30 uppercase tracking-widest">
            <Users className="w-3.5 h-3.5" />
            20 Participating Clubs
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Teams & Standings
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Meet the 20 clubs competing in the Defenders Football League 2026 at Vengara, Malappuram.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search club name, town, or coach..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#00E676] transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="flex items-center justify-between mb-6 text-xs text-slate-400 font-semibold">
          <span>Showing {filteredTeams.length} of {teams.length} teams</span>
          <span>Ranked by Points & Goal Difference</span>
        </div>

        {filteredTeams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center card-glass rounded-2xl border border-white/5 p-8">
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No teams match your search</h3>
            <p className="text-sm text-slate-400 mt-1">Try another keyword or town name.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
