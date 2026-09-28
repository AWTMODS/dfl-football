'use client';

import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  Download,
  Calendar,
  CreditCard,
  Ticket,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import { dflStore } from '@/lib/store';
import { Booking, Match, PaymentRecord } from '@/lib/types';
import { formatINR } from '@/lib/utils';

export default function ReportsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);

  useEffect(() => {
    setBookings(dflStore.getBookings());
    setMatches(dflStore.getMatches());
    setPayments(dflStore.getPayments());
  }, []);

  const totalRevenue = payments
    .filter((p) => p.status === 'PAID')
    .reduce((s, p) => s + p.amount, 0);

  const totalTickets = bookings
    .filter((b) => b.status === 'CONFIRMED')
    .reduce((s, b) => s + b.quantity, 0);

  // Generate and download CSV
  const handleExportCSV = () => {
    const headers = [
      'Booking ID',
      'Spectator Name',
      'Phone',
      'Email',
      'Match',
      'Tickets Quantity',
      'Amount (INR)',
      'Booking Status',
      'Payment Status',
      'Payment Method',
      'Payment Ref',
      'Created At',
    ];

    const rows = bookings.map((b) => [
      b.id,
      `"${b.customerName}"`,
      b.phone,
      b.email || '',
      `"${b.matchSummary}"`,
      b.quantity,
      b.totalAmount,
      b.status,
      b.paymentStatus,
      b.paymentMethod,
      b.paymentRef,
      b.createdAt,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DFL_Football_Ticketing_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-[#00E676]" />
            <span>Tournament Financial & Sales Reports</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Detailed breakdown of gate receipts, ticket sales velocity, and match revenues.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-black bg-[#00E676] hover:bg-[#00c853] transition-all shadow-md shadow-[#00E676]/20"
        >
          <Download className="w-4 h-4" />
          <span>Export All Data to CSV</span>
        </button>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl card-glass p-5 border border-white/5 space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase">Total Settled Revenue</span>
          <div className="text-2xl sm:text-3xl font-black text-[#00E676]">
            {formatINR(totalRevenue)}
          </div>
          <p className="text-[11px] text-slate-400">Net gate collections for DFL 2026</p>
        </div>

        <div className="rounded-2xl card-glass p-5 border border-white/5 space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase">Total Tickets Distributed</span>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {totalTickets} passes
          </div>
          <p className="text-[11px] text-slate-400">Across verified bookings</p>
        </div>

        <div className="rounded-2xl card-glass p-5 border border-white/5 space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase">Average Ticket Order Value</span>
          <div className="text-2xl sm:text-3xl font-black text-[#0ea5e9]">
            {formatINR(totalRevenue / Math.max(1, bookings.length))}
          </div>
          <p className="text-[11px] text-slate-400">Per reservation transaction</p>
        </div>
      </div>

      {/* Fixture Performance Breakdown Table */}
      <div className="rounded-2xl card-glass border border-white/5 overflow-hidden space-y-4 p-6">
        <h3 className="text-base font-bold text-white">Match-Wise Performance Report</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.03] border-b border-white/10 text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3 font-bold">Match</th>
                <th className="px-4 py-3 font-bold">Stage</th>
                <th className="px-4 py-3 font-bold">Pass Price</th>
                <th className="px-4 py-3 font-bold">Total Capacity</th>
                <th className="px-4 py-3 font-bold">Sold</th>
                <th className="px-4 py-3 font-bold">Remaining</th>
                <th className="px-4 py-3 font-bold text-right">Est. Gross</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {matches.map((m) => {
                const sold = m.totalTickets - m.availableTickets;
                const gross = sold * m.ticketPrice;
                return (
                  <tr key={m.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-bold text-white">
                      Match {m.matchNumber}: {m.teamAName} vs {m.teamBName}
                    </td>
                    <td className="px-4 py-3 text-slate-300">{m.stage}</td>
                    <td className="px-4 py-3 font-medium text-white">{formatINR(m.ticketPrice)}</td>
                    <td className="px-4 py-3 text-slate-300">{m.totalTickets}</td>
                    <td className="px-4 py-3 font-bold text-[#00E676]">{sold}</td>
                    <td className="px-4 py-3 text-slate-400">{m.availableTickets}</td>
                    <td className="px-4 py-3 text-right font-black text-white">
                      {formatINR(gross)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
