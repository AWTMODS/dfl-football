'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Ticket,
  Search,
  Filter,
  Eye,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  QrCode,
} from 'lucide-react';
import { dflStore } from '@/lib/store';
import { TicketItem } from '@/lib/types';
import { formatDate, formatINR } from '@/lib/utils';
import DigitalTicketPass from '@/components/public/DigitalTicketPass';

export default function TicketsManagementPage() {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'VALID' | 'USED' | 'CANCELLED'>('ALL');
  const [activeModalTicket, setActiveModalTicket] = useState<TicketItem | null>(null);

  useEffect(() => {
    setTickets(dflStore.getAllTickets());
  }, []);

  const filteredTickets = tickets.filter((t) => {
    if (statusFilter !== 'ALL' && t.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const text = `${t.id} ${t.bookingId} ${t.customerName} ${t.phone} ${t.matchSummary}`.toLowerCase();
      if (!text.includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Ticket className="w-6 h-6 text-[#00E676]" />
            <span>Ticket Pass Registry</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Individual passes and unique QR tokens generated across all tournament bookings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/scanner"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-black bg-[#00E676] hover:bg-[#00c853]"
          >
            <QrCode className="w-4 h-4" />
            <span>Open Gate Scanner</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl card-glass p-4 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Ticket ID (DFL-TKT-...), booking, customer..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-[#00E676]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {(['ALL', 'VALID', 'USED', 'CANCELLED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                statusFilter === st
                  ? 'bg-[#00E676] text-black'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets Table */}
      <div className="rounded-2xl card-glass border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.03] border-b border-white/10 text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3.5 font-bold">Ticket ID</th>
                <th className="px-5 py-3.5 font-bold">Booking ID</th>
                <th className="px-5 py-3.5 font-bold">Spectator</th>
                <th className="px-5 py-3.5 font-bold">Match</th>
                <th className="px-5 py-3.5 font-bold">Status</th>
                <th className="px-5 py-3.5 font-bold">Scan Time</th>
                <th className="px-5 py-3.5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredTickets.length > 0 ? (
                filteredTickets.map((t) => (
                  <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4 font-mono font-bold text-white">
                      {t.id}
                    </td>

                    <td className="px-5 py-4 font-mono text-slate-300">
                      <Link
                        href={`/admin/bookings/${t.bookingId}`}
                        className="hover:text-[#00E676] hover:underline"
                      >
                        {t.bookingId}
                      </Link>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-bold text-white">{t.customerName}</div>
                      <div className="text-[11px] text-slate-400">{t.phone}</div>
                    </td>

                    <td className="px-5 py-4 max-w-xs truncate">
                      <div className="font-bold text-white truncate">{t.matchSummary}</div>
                      <div className="text-[11px] text-slate-400">{t.time}</div>
                    </td>

                    <td className="px-5 py-4">
                      {t.status === 'VALID' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30 uppercase">
                          <CheckCircle2 className="w-3 h-3" />
                          Valid
                        </span>
                      )}
                      {t.status === 'USED' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase">
                          <AlertTriangle className="w-3 h-3" />
                          Used
                        </span>
                      )}
                      {t.status === 'CANCELLED' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500/10 text-rose-400 border border-rose-500/30 uppercase">
                          <XCircle className="w-3 h-3" />
                          Cancelled
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4 text-slate-400">
                      {t.scannedAt ? (
                        <div>
                          <div className="text-white font-semibold">
                            {new Date(t.scannedAt).toLocaleTimeString()}
                          </div>
                          <div className="text-[10px] text-slate-400">{t.scannedBy}</div>
                        </div>
                      ) : (
                        <span className="text-slate-400">Unused</span>
                      )}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setActiveModalTicket(t)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-200"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#00E676]" />
                        <span>Pass</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No tickets found matching your query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Pass Modal */}
      {activeModalTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-h-[90vh] overflow-y-auto w-full max-w-sm">
            <button
              onClick={() => setActiveModalTicket(null)}
              className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-white text-black font-black text-sm flex items-center justify-center shadow-lg"
            >
              ✕
            </button>
            <DigitalTicketPass ticket={activeModalTicket} />
          </div>
        </div>
      )}
    </div>
  );
}
