'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, Plus, Edit2, MapPin, Trophy, X } from 'lucide-react';
import { dflStore } from '@/lib/store';
import { Team } from '@/lib/types';

export default function TeamsManagementPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // New team form
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [coach, setCoach] = useState('');
  const [founded, setFounded] = useState('2020');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setTeams(dflStore.getTeams());
  }, []);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeam) return;

    dflStore.updateTeam(editingTeam);
    setTeams(dflStore.getTeams());
    setEditingTeam(null);
  };

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    dflStore.createTeam({
      name: name.trim(),
      shortName: name.slice(0, 3).toUpperCase(),
      location: location.trim() || 'Malappuram, Kerala',
      logo: '',
      founded,
      coach: coach.trim() || 'Head Coach',
      matchesPlayed: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0,
      position: teams.length + 1,
      description: description.trim() || 'Premier 7-a-side football club.',
      squad: ['Goalkeeper (GK)', 'Defender 1', 'Defender 2', 'Midfielder (C)', 'Winger 1', 'Winger 2', 'Striker'],
    });

    setTeams(dflStore.getTeams());
    setIsCreatingNew(false);
    setName('');
    setLocation('');
    setCoach('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-[#00E676]" />
            <span>Teams & Clubs Registry</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage participating clubs, squads, rankings, standings, and coaching staff.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingNew(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-black bg-[#00E676] hover:bg-[#00c853] shadow-md shadow-[#00E676]/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Team</span>
        </button>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl card-glass p-5 border border-white/5 space-y-3 hover:border-white/10 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={t.logo}
                  alt={t.name}
                  className="w-12 h-12 rounded-xl bg-white/5 p-1.5 object-contain"
                />
                <div>
                  <h3 className="font-bold text-white text-base leading-tight">{t.name}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#0ea5e9]" />
                    {t.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black px-2 py-0.5 rounded bg-white/5 text-[#00E676] border border-white/10">
                  #{t.position}
                </span>
                <button
                  onClick={() => setEditingTeam(t)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                  title="Edit Team"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Standings Numbers */}
            <div className="grid grid-cols-5 gap-1 text-center bg-white/[0.02] rounded-xl p-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">P</span>
                <span className="font-bold text-white">{t.matchesPlayed}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">W</span>
                <span className="font-bold text-emerald-400">{t.won}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">D</span>
                <span className="font-bold text-slate-300">{t.drawn}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">L</span>
                <span className="font-bold text-rose-400">{t.lost}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#00E676] font-bold block">PTS</span>
                <span className="font-black text-[#00E676]">{t.points}</span>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between text-xs text-slate-400">
              <span>Coach: {t.coach}</span>
              <Link
                href={`/teams/${t.id}`}
                className="text-[#00E676] font-semibold hover:underline"
              >
                Public Page →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Team Modal */}
      {editingTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl card-glass p-6 border border-white/15 bg-[#09101C] space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-base">Edit Team: {editingTeam.name}</h3>
              <button
                onClick={() => setEditingTeam(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Club Name</label>
                <input
                  type="text"
                  value={editingTeam.name}
                  onChange={(e) =>
                    setEditingTeam({ ...editingTeam, name: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Location</label>
                  <input
                    type="text"
                    value={editingTeam.location}
                    onChange={(e) =>
                      setEditingTeam({ ...editingTeam, location: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Head Coach</label>
                  <input
                    type="text"
                    value={editingTeam.coach}
                    onChange={(e) =>
                      setEditingTeam({ ...editingTeam, coach: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
              </div>

              {/* Standings Numbers */}
              <div className="grid grid-cols-4 gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div>
                  <label className="block text-slate-400 text-[10px] font-bold mb-1">Played</label>
                  <input
                    type="number"
                    value={editingTeam.matchesPlayed}
                    onChange={(e) =>
                      setEditingTeam({ ...editingTeam, matchesPlayed: Number(e.target.value) })
                    }
                    className="w-full px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] font-bold mb-1">Won</label>
                  <input
                    type="number"
                    value={editingTeam.won}
                    onChange={(e) =>
                      setEditingTeam({ ...editingTeam, won: Number(e.target.value) })
                    }
                    className="w-full px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] font-bold mb-1">GF</label>
                  <input
                    type="number"
                    value={editingTeam.goalsFor}
                    onChange={(e) =>
                      setEditingTeam({ ...editingTeam, goalsFor: Number(e.target.value) })
                    }
                    className="w-full px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[#00E676] text-[10px] font-bold mb-1">Points</label>
                  <input
                    type="number"
                    value={editingTeam.points}
                    onChange={(e) =>
                      setEditingTeam({ ...editingTeam, points: Number(e.target.value) })
                    }
                    className="w-full px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-center font-bold"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingTeam(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-black bg-[#00E676] hover:bg-[#00c853]"
                >
                  Save Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Team Modal */}
      {isCreatingNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl card-glass p-6 border border-white/15 bg-[#09101C] space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-base">Register New Team</h3>
              <button
                onClick={() => setIsCreatingNew(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTeam} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Club Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Malabar Strikers"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Town / Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Vengara, Malappuram"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Head Coach</label>
                  <input
                    type="text"
                    value={coach}
                    onChange={(e) => setCoach(e.target.value)}
                    placeholder="Coach Name"
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
                  Add Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
