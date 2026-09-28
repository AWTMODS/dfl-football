'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  Search,
  Filter,
  Eye,
  XCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Download,
} from 'lucide-react';
import { dflStore } from '@/lib/store';
import { Booking } from '@/lib/types';
import { formatINR, formatDate } from '@/lib/utils';

export default function BookingsManagementPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'CONFIRMED' | 'PENDING' | 'CANCELLED'>('ALL');

  useEffect(() => {
    setBookings(dflStore.getBookings());
  }, []);

  const handleCancelBooking = (bookingId: string) => {
    if (confirm(`Are you sure you want to cancel booking ${bookingId}? All tickets in this booking will be revoked.`)) {
      dflStore.cancelBooking(bookingId);
      setBookings(dflStore.getBookings());
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter !== 'ALL' && b.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const text = `${b.id} ${b.customerName} ${b.phone} ${b.email || ''} ${b.matchSummary}`.toLowerCase();
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
            <CalendarDays className="w-6 h-6 text-[#00E676]" />
            <span>Bookings Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor, inspect, and manage all spectator reservations and ticket issuances.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold">
            Total: {bookings.length} reservations
          </span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="rounded-2xl card-glass p-4 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search booking ID, customer, phone, or match..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-[#00E676]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {(['ALL', 'CONFIRMED', 'PENDING', 'CANCELLED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                statusFilter === st
                  ? 'bg-[#00E676] text-black shadow-sm'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="rounded-2xl card-glass border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.03] border-b border-white/10 text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3.5 font-bold">Booking ID</th>
                <th className="px-5 py-3.5 font-bold">Spectator</th>
                <th className="px-5 py-3.5 font-bold">Match Fixture</th>
                <th className="px-5 py-3.5 font-bold text-center">Tickets</th>
                <th className="px-5 py-3.5 font-bold">Amount</th>
                <th className="px-5 py-3.5 font-bold">Booking Status</th>
                <th className="px-5 py-3.5 font-bold">Payment</th>
                <th className="px-5 py-3.5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4 font-mono font-bold text-white">
                      <Link
                        href={`/admin/bookings/${b.id}`}
                        className="hover:text-[#00E676] hover:underline"
                      >
                        {b.id}
                      </Link>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-bold text-white">{b.customerName}</div>
                      <div className="text-[11px] text-slate-400">{b.phone}</div>
                    </td>

                    <td className="px-5 py-4 max-w-xs truncate">
                      <div className="font-bold text-white truncate">{b.matchSummary}</div>
                      <div className="text-[11px] text-slate-400">
                        {formatDate(b.matchDate)} • {b.matchTime}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-center font-bold text-white">
                      <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-200">
                        {b.quantity}
                      </span>
                    </td>

                    <td className="px-5 py-4 font-black text-white text-sm">
                      {formatINR(b.totalAmount)}
                    </td>

                    <td className="px-5 py-4">
                      {b.status === 'CONFIRMED' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30 uppercase">
                          <CheckCircle2 className="w-3 h-3" />
                          Confirmed
                        </span>
                      )}
                      {b.status === 'PENDING' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase">
                          <Clock className="w-3 h-3" />
                          Pending
                        </span>
                      )}
                      {b.status === 'CANCELLED' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500/10 text-rose-400 border border-rose-500/30 uppercase">
                          <XCircle className="w-3 h-3" />
                          Cancelled
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          b.paymentStatus === 'PAID'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : b.paymentStatus === 'PENDING'
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-rose-500/10 text-rose-400'
                        }`}
                      >
                        {b.paymentStatus}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/bookings/${b.id}`}
                          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        {b.status !== 'CANCELLED' && (
                          <button
                            onClick={() => handleCancelBooking(b.id)}
                            className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                            title="Cancel Booking"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No bookings found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
