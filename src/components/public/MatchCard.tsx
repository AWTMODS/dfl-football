import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Ticket, ChevronRight } from 'lucide-react';
import { Match } from '@/lib/types';
import { formatDate, formatINR } from '@/lib/utils';

interface MatchCardProps {
  match: Match;
  featured?: boolean;
}

export default function MatchCard({ match, featured = false }: MatchCardProps) {
  const isAvailable = match.status === 'UPCOMING' && match.availableTickets > 0;
  const isSoldOut = match.status === 'UPCOMING' && match.availableTickets <= 0;
  const isCompleted = match.status === 'COMPLETED';

  return (
    <div
      className={`relative rounded-2xl overflow-hidden card-glass card-glass-hover transition-all duration-200 ${
        featured ? 'border-[#00E676]/40 shadow-lg shadow-[#00E676]/10' : ''
      }`}
    >
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#00E676]">
            Match {String(match.matchNumber).padStart(2, '0')}
          </span>
          <span className="text-white/20">•</span>
          <span className="text-xs font-semibold text-slate-300">{match.stage}</span>
        </div>

        {/* Availability Badge */}
        <div>
          {isAvailable && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
              Available
            </span>
          )}
          {isSoldOut && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
              Sold Out
            </span>
          )}
          {isCompleted && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-500/10 text-slate-300 border border-slate-500/30">
              Completed
            </span>
          )}
        </div>
      </div>

      {/* Teams Faceoff Section */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-7 items-center gap-2 sm:gap-4 my-2">
          {/* Team A */}
          <div className="col-span-3 flex flex-col items-center text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 border border-white/10 p-2 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
              <img
                src={match.teamALogo}
                alt={match.teamAName}
                className="w-full h-full object-contain drop-shadow"
              />
            </div>
            <h4 className="mt-2 text-sm sm:text-base font-bold text-white line-clamp-1">
              {match.teamAName}
            </h4>
            <span className="text-[11px] text-slate-400 font-medium">Team A</span>
          </div>

          {/* VS or Score */}
          <div className="col-span-1 flex flex-col items-center justify-center">
            {isCompleted ? (
              <div className="text-center">
                <span className="text-lg sm:text-xl font-black text-white">
                  {match.scoreA} : {match.scoreB}
                </span>
                <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  FT
                </span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-xs font-black text-[#00E676] tracking-tighter">VS</span>
              </div>
            )}
          </div>

          {/* Team B */}
          <div className="col-span-3 flex flex-col items-center text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 border border-white/10 p-2 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
              <img
                src={match.teamBLogo}
                alt={match.teamBName}
                className="w-full h-full object-contain drop-shadow"
              />
            </div>
            <h4 className="mt-2 text-sm sm:text-base font-bold text-white line-clamp-1">
              {match.teamBName}
            </h4>
            <span className="text-[11px] text-slate-400 font-medium">Team B</span>
          </div>
        </div>

        {/* Schedule & Venue Details */}
        <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#00E676]" />
            <span>{formatDate(match.date)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#00E676]" />
            <span>{match.time}</span>
          </div>
          <div className="w-full sm:w-auto flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-[#0ea5e9]" />
            <span className="truncate">{match.venue}</span>
          </div>
        </div>

        {/* Action Button & Price */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Pass Price
            </span>
            <span className="text-base font-extrabold text-white">
              {formatINR(match.ticketPrice)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/matches/${match.id}`}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              Details
            </Link>

            {isAvailable ? (
              <Link
                href={`/book/${match.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-black bg-[#00E676] hover:bg-[#00c853] transition-all shadow-md shadow-[#00E676]/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Book Tickets</span>
              </Link>
            ) : (
              <button
                disabled
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 bg-white/5 cursor-not-allowed border border-white/5"
              >
                {isSoldOut ? 'Sold Out' : 'Finished'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
