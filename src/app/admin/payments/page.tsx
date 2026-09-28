'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { dflStore } from '@/lib/store';
import { PaymentRecord } from '@/lib/types';
import { formatINR } from '@/lib/utils';

export default function PaymentsManagementPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED'>('ALL');

  useEffect(() => {
    setPayments(dflStore.getPayments());
  }, []);

  const totalGross = payments
    .filter((p) => p.status === 'PAID')
    .reduce((sum, p) => sum + p.amount, 0);

  const filteredPayments = payments.filter((p) => {
    if (statusFilter !== 'ALL' && p.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const text = `${p.id} ${p.bookingId} ${p.customerName} ${p.phone} ${p.reference}`.toLowerCase();
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
            <CreditCard className="w-6 h-6 text-[#00E676]" />
            <span>Payments & Gateway Logs</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit trail of all demo payment transactions, UPI references, and settlements.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
          <span className="text-xs text-slate-400">Total Settled:</span>
          <span className="text-lg font-black text-[#00E676]">{formatINR(totalGross)}</span>
        </div>
      </div>

      {/* Gateway Status Banner */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-300">
            <strong>Active Gateway Driver:</strong> DFL Demo Payment Simulator (Razorpay / UPI webhook ready)
          </span>
        </div>
        <span className="text-[10px] font-bold text-slate-400 bg-white/5 px-2.5 py-1 rounded border border-white/10">
          Sandbox v1.0
        </span>
      </div>

      {/* Search & Filter */}
      <div className="rounded-2xl card-glass p-4 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search payment ID, reference, customer..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-[#00E676]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {(['ALL', 'PAID', 'PENDING', 'REFUNDED'] as const).map((st) => (
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

      {/* Payments Table */}
      <div className="rounded-2xl card-glass border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.03] border-b border-white/10 text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3.5 font-bold">Payment ID</th>
                <th className="px-5 py-3.5 font-bold">Booking ID</th>
                <th className="px-5 py-3.5 font-bold">Customer</th>
                <th className="px-5 py-3.5 font-bold">Amount</th>
                <th className="px-5 py-3.5 font-bold">Status</th>
                <th className="px-5 py-3.5 font-bold">Method</th>
                <th className="px-5 py-3.5 font-bold">Gateway Ref</th>
                <th className="px-5 py-3.5 font-bold">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPayments.length > 0 ? (
                filteredPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4 font-mono font-bold text-white">
                      {p.id}
                    </td>

                    <td className="px-5 py-4 font-mono text-slate-300">
                      <Link
                        href={`/admin/bookings/${p.bookingId}`}
                        className="hover:text-[#00E676] hover:underline"
                      >
                        {p.bookingId}
                      </Link>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-bold text-white">{p.customerName}</div>
                      <div className="text-[11px] text-slate-400">{p.phone}</div>
                    </td>

                    <td className="px-5 py-4 font-black text-white text-sm">
                      {formatINR(p.amount)}
                    </td>

                    <td className="px-5 py-4">
                      {p.status === 'PAID' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
                          <CheckCircle2 className="w-3 h-3" />
                          Paid
                        </span>
                      )}
                      {p.status === 'PENDING' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase">
                          <Clock className="w-3 h-3" />
                          Pending
                        </span>
                      )}
                      {p.status === 'REFUNDED' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-500/10 text-purple-400 border border-purple-500/30 uppercase">
                          <RefreshCw className="w-3 h-3" />
                          Refunded
                        </span>
                      )}
                      {p.status === 'FAILED' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500/10 text-rose-400 border border-rose-500/30 uppercase">
                          <XCircle className="w-3 h-3" />
                          Failed
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4 text-slate-300 font-medium">
                      {p.method}
                    </td>

                    <td className="px-5 py-4 font-mono text-[11px] text-slate-400">
                      {p.reference}
                    </td>

                    <td className="px-5 py-4 text-slate-400 text-[11px]">
                      {new Date(p.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No payment records found.
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
