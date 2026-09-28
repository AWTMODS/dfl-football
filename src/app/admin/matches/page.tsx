'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Plus,
  Edit2,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  Ticket,
  Save,
  X,
} from 'lucide-react';
import { dflStore } from '@/lib/store';
import { Match, MatchStage, MatchStatus, Team } from '@/lib/types';
import { formatINR, formatDate } from '@/lib/utils';

export default function MatchesManagementPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // New match form state
  const [newTeamA, setNewTeamA] = useState('');
  const [newTeamB, setNewTeamB] = useState('');
  const [newDate, setNewDate] = useState('2026-10-27');
  const [newTime, setNewTime] = useState('07:00 PM');
  const [newStage, setNewStage] = useState<MatchStage>('Group Stage');
  const [newPrice, setNewPrice] = useState(150);
  const [newTotalTickets, setNewTotalTickets] = useState(1200);

  useEffect(() => {
    setMatches(dflStore.getMatches());
    const tms = dflStore.getTeams();
    setTeams(tms);
    if (tms.length >= 2) {
      setNewTeamA(tms[0].id);
      setNewTeamB(tms[1].id);
    }
  }, []);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMatch) return;

    dflStore.updateMatch(editingMatch);
    setMatches(dflStore.getMatches());
    setEditingMatch(null);
  };

  const handleCreateMatch = (e: React.FormEvent) => {
    e.preventDefault();
    const tA = teams.find((t) => t.id === newTeamA);
    const tB = teams.find((t) => t.id === newTeamB);
    if (!tA || !tB || tA.id === tB.id) {
      alert('Please choose two distinct teams');
      return;
    }

    dflStore.createMatch({
      matchNumber: matches.length + 1,
      stage: newStage,
      teamAId: tA.id,
      teamBId: tB.id,
      teamAName: tA.name,
      teamBName: tB.name,
      teamALogo: tA.logo,
      teamBLogo: tB.logo,
      date: newDate,
      time: newTime,
      venue: 'DFL Stadium, Vengara',
      status: 'UPCOMING',
      ticketPrice: Number(newPrice),
      totalTickets: Number(newTotalTickets),
      availableTickets: Number(newTotalTickets),
    });

    setMatches(dflStore.getMatches());
    setIsCreatingNew(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Trophy className="w-6 h-6 text-[#00E676]" />
            <span>Matches & Schedule Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure match fixtures, ticket pricing, stadium allocations, and record live scores.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingNew(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-black bg-[#00E676] hover:bg-[#00c853] shadow-md shadow-[#00E676]/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Match</span>
        </button>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {matches.map((m) => (
          <div
            key={m.id}
            className="rounded-2xl card-glass p-5 border border-white/5 space-y-4 hover:border-white/10 transition-all"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-[#00E676]">
                  Match {String(m.matchNumber).padStart(2, '0')}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-xs text-slate-300 font-semibold">{m.stage}</span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    m.status === 'UPCOMING'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : m.status === 'COMPLETED'
                      ? 'bg-slate-500/10 text-slate-300 border border-slate-500/30'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {m.status}
                </span>

                <button
                  onClick={() => setEditingMatch(m)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                  title="Edit Match"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Teams Faceoff with Score */}
            <div className="flex items-center justify-between gap-4 py-2">
              <div className="flex items-center gap-3">
                <img
                  src={m.teamALogo}
                  alt={m.teamAName}
                  className="w-10 h-10 rounded-xl bg-white/5 p-1 object-contain"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">{m.teamAName}</h4>
                  <span className="text-[10px] text-slate-400">Team A</span>
                </div>
              </div>

              {m.status === 'COMPLETED' ? (
                <div className="text-base font-black text-[#00E676] bg-black/40 px-3 py-1 rounded-lg border border-white/10">
                  {m.scoreA ?? 0} - {m.scoreB ?? 0}
                </div>
              ) : (
                <div className="text-xs font-black text-slate-400 bg-white/5 px-2.5 py-1 rounded">
                  VS
                </div>
              )}

              <div className="flex items-center gap-3 text-right">
                <div>
                  <h4 className="font-bold text-white text-sm">{m.teamBName}</h4>
                  <span className="text-[10px] text-slate-400">Team B</span>
                </div>
                <img
                  src={m.teamBLogo}
                  alt={m.teamBName}
                  className="w-10 h-10 rounded-xl bg-white/5 p-1 object-contain"
                />
              </div>
            </div>

            {/* Schedule & Price stats */}
            <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#00E676]" />
                <span>{formatDate(m.date)}</span>
                <span className="text-slate-400">•</span>
                <span>{m.time}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{formatINR(m.ticketPrice)}</span>
                <span className="text-slate-400">({m.availableTickets} left)</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Match Modal */}
      {editingMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl card-glass p-6 border border-white/15 bg-[#09101C] space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-base">
                Edit Match {editingMatch.matchNumber}: {editingMatch.teamAName} vs {editingMatch.teamBName}
              </h3>
              <button
                onClick={() => setEditingMatch(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Status</label>
                  <select
                    value={editingMatch.status}
                    onChange={(e) =>
                      setEditingMatch({
                        ...editingMatch,
                        status: e.target.value as MatchStatus,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  >
                    <option value="UPCOMING" className="bg-[#080E17]">Upcoming</option>
                    <option value="LIVE" className="bg-[#080E17]">Live</option>
                    <option value="COMPLETED" className="bg-[#080E17]">Completed</option>
                    <option value="CANCELLED" className="bg-[#080E17]">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Stage</label>
                  <select
                    value={editingMatch.stage}
                    onChange={(e) =>
                      setEditingMatch({
                        ...editingMatch,
                        stage: e.target.value as MatchStage,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  >
                    <option value="Group Stage" className="bg-[#080E17]">Group Stage</option>
                    <option value="Quarter Final" className="bg-[#080E17]">Quarter Final</option>
                    <option value="Semi Final" className="bg-[#080E17]">Semi Final</option>
                    <option value="Final" className="bg-[#080E17]">Final</option>
                  </select>
                </div>
              </div>

              {/* Scores (if completed or live) */}
              <div className="grid grid-cols-2 gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {editingMatch.teamAName} Score
                  </label>
                  <input
                    type="number"
                    value={editingMatch.scoreA ?? ''}
                    onChange={(e) =>
                      setEditingMatch({
                        ...editingMatch,
                        scoreA: e.target.value === '' ? undefined : Number(e.target.value),
                      })
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {editingMatch.teamBName} Score
                  </label>
                  <input
                    type="number"
                    value={editingMatch.scoreB ?? ''}
                    onChange={(e) =>
                      setEditingMatch({
                        ...editingMatch,
                        scoreB: e.target.value === '' ? undefined : Number(e.target.value),
                      })
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
              </div>

              {/* Price & Available Tickets */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Pass Price (₹)</label>
                  <input
                    type="number"
                    value={editingMatch.ticketPrice}
                    onChange={(e) =>
                      setEditingMatch({
                        ...editingMatch,
                        ticketPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Available Tickets</label>
                  <input
                    type="number"
                    value={editingMatch.availableTickets}
                    onChange={(e) =>
                      setEditingMatch({
                        ...editingMatch,
                        availableTickets: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Match Date</label>
                  <input
                    type="date"
                    value={editingMatch.date}
                    onChange={(e) =>
                      setEditingMatch({
                        ...editingMatch,
                        date: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Kickoff Time</label>
                  <input
                    type="text"
                    value={editingMatch.time}
                    onChange={(e) =>
                      setEditingMatch({
                        ...editingMatch,
                        time: e.target.value,
                      })
                    }
                    placeholder="07:00 PM"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingMatch(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-black bg-[#00E676] hover:bg-[#00c853]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create New Match Modal */}
      {isCreatingNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl card-glass p-6 border border-white/15 bg-[#09101C] space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-base">Schedule New Fixture</h3>
              <button
                onClick={() => setIsCreatingNew(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMatch} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Team A</label>
                  <select
                    value={newTeamA}
                    onChange={(e) => setNewTeamA(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  >
                    {teams.map((t) => (
                      <option key={t.id} value={t.id} className="bg-[#080E17]">
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Team B</label>
                  <select
                    value={newTeamB}
                    onChange={(e) => setNewTeamB(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  >
                    {teams.map((t) => (
                      <option key={t.id} value={t.id} className="bg-[#080E17]">
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Stage</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as MatchStage)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  >
                    <option value="Group Stage" className="bg-[#080E17]">Group Stage</option>
                    <option value="Quarter Final" className="bg-[#080E17]">Quarter Final</option>
                    <option value="Semi Final" className="bg-[#080E17]">Semi Final</option>
                    <option value="Final" className="bg-[#080E17]">Final</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Ticket Price (₹)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Kickoff Time</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreatingNew(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-black bg-[#00E676] hover:bg-[#00c853]"
                >
                  Schedule Fixture
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
