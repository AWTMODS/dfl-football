import React from 'react';
import Link from 'next/link';
import { MapPin, Trophy, Shield, ChevronRight } from 'lucide-react';
import { Team } from '@/lib/types';

interface TeamCardProps {
  team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
  return (
    <Link
      href={`/teams/${team.id}`}
      className="group block rounded-2xl card-glass card-glass-hover p-5 border border-white/5 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 p-2 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#00E676]/40 transition-all">
            <img
              src={team.logo}
              alt={team.name}
              className="w-full h-full object-contain drop-shadow"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-white group-hover:text-[#00E676] transition-colors">
                {team.name}
              </h3>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-[#0ea5e9]" />
              {team.location}
            </p>
          </div>
        </div>

        {/* Position rank badge */}
        <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-white/5 text-[#00E676] border border-white/10">
          #{team.position}
        </span>
      </div>

      <p className="mt-3 text-xs text-slate-400 line-clamp-2 leading-relaxed">
        {team.description}
      </p>

      {/* Mini Stats Bar */}
      <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-4 gap-1 text-center bg-white/[0.02] rounded-xl p-2">
        <div>
          <span className="block text-[10px] uppercase font-bold text-slate-400">P</span>
          <span className="text-xs font-bold text-white">{team.matchesPlayed}</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase font-bold text-slate-400">W</span>
          <span className="text-xs font-bold text-emerald-400">{team.won}</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase font-bold text-slate-400">GF</span>
          <span className="text-xs font-bold text-white">{team.goalsFor}</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase font-bold text-[#00E676]">PTS</span>
          <span className="text-xs font-black text-[#00E676]">{team.points}</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-400 group-hover:text-white transition-colors">
        <span>Coach: {team.coach}</span>
        <div className="flex items-center gap-1 text-[#00E676] font-semibold text-xs">
          <span>View Squad</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
