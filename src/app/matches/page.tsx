'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import MatchCard from '@/components/public/MatchCard';
import { dflStore } from '@/lib/store';
import { Match, MatchStage } from '@/lib/types';
import { Trophy, Calendar, Filter, Search, Sparkles } from 'lucide-react';

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [activeTab, setActiveTab] = useState<'ALL' | 'UPCOMING' | 'COMPLETED'>('ALL');
  const [selectedStage, setSelectedStage] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMatches(dflStore.getMatches());
  }, []);

  const stages = ['ALL', 'Group Stage', 'Quarter Final', 'Semi Final', 'Final'];

  const filteredMatches = matches.filter((m) => {
    // Status tab filter
    if (activeTab === 'UPCOMING' && m.status !== 'UPCOMING') return false;
    if (activeTab === 'COMPLETED' && m.status !== 'COMPLETED') return false;

    // Stage filter
    if (selectedStage !== 'ALL' && m.stage !== selectedStage) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = `${m.teamAName} ${m.teamBName} ${m.venue} ${m.stage} Match ${m.matchNumber}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#060B11] text-white">
      <Navbar />

      {/* Header Banner */}
      <div className="relative py-12 md:py-16 border-b border-white/10 pitch-grid bg-[#080E17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E676]/10 text-[#00E676] text-xs font-bold border border-[#00E676]/30 uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5" />
            Match Center
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Tournament Schedule
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Explore all 50+ floodlight fixtures for the Defenders Football League 2026. Select a match to reserve tickets.
          </p>

          {/* Search bar */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search team, stage, or match number..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#00E676] transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
          {/* Main Status Filters */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'ALL'
                  ? 'bg-[#00E676] text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Matches
            </button>
            <button
              onClick={() => setActiveTab('UPCOMING')}
              className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'UPCOMING'
                  ? 'bg-[#00E676] text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('COMPLETED')}
              className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'COMPLETED'
                  ? 'bg-[#00E676] text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Completed
            </button>
          </div>

          {/* Stage Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <span className="text-xs text-slate-400 font-semibold shrink-0">Stage:</span>
            {stages.map((stage) => (
              <button
                key={stage}
                onClick={() => setSelectedStage(stage)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                  selectedStage === stage
                    ? 'bg-white/15 text-white border border-white/20'
                    : 'text-slate-400 hover:text-white bg-white/5'
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>

        {/* Matches Grid */}
        <div>
          <div className="flex items-center justify-between mb-6 text-xs text-slate-400">
            <span>Showing {filteredMatches.length} matches</span>
            <span>DFL Stadium, Vengara</span>
          </div>

          {filteredMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMatches.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center card-glass rounded-2xl border border-white/5 p-8">
              <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">No matches found</h3>
              <p className="text-sm text-slate-400 mt-1">
                Try selecting a different filter or clearing your search term.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
