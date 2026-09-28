'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  Ticket,
  CreditCard,
  QrCode,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { dflStore } from '@/lib/store';
import { Booking, PaymentRecord, ScanLog, Match } from '@/lib/types';
import { formatINR, formatDate } from '@/lib/utils';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [scanLogs, setScanLogs] = useState<ScanLog[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    setBookings(dflStore.getBookings());
    setPayments(dflStore.getPayments());
    setScanLogs(dflStore.getScanLogs());
    setMatches(dflStore.getMatches());
  }, []);

  // Compute live KPIs
  const totalBookings = bookings.length;
  const allTickets = bookings.flatMap((b) => b.tickets);
  const ticketsSold = allTickets.filter((t) => t.status !== 'CANCELLED').length;
  const ticketsUsed = allTickets.filter((t) => t.status === 'USED').length;
  const totalRevenue = payments
    .filter((p) => p.status === 'PAID')
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = payments.filter((p) => p.status === 'PENDING').length;
  const cancelledBookings = bookings.filter((b) => b.status === 'CANCELLED').length;
  const totalCustomers = new Set(bookings.map((b) => b.phone)).size;
  const totalRemainingTickets = matches.reduce((sum, m) => sum + m.availableTickets, 0);

  // Chart data: Sales Trend
  const salesTrendData = [
    { date: '14 Oct', sales: 120, revenue: 18000 },
    { date: '15 Oct', sales: 240, revenue: 36000 },
    { date: '16 Oct', sales: 380, revenue: 57000 },
    { date: '17 Oct', sales: 520, revenue: 78000 },
    { date: '18 Oct', sales: 740, revenue: 111000 },
    { date: '19 Oct', sales: 980, revenue: 147000 },
    { date: '20 Oct (Opener)', sales: 1124, revenue: 168600 },
  ];

  // Chart data: Tickets by Match
  const matchChartData = matches.slice(0, 6).map((m) => ({
    name: `M${m.matchNumber} (${m.teamAName.split(' ')[0]})`,
    sold: m.totalTickets - m.availableTickets,
    remaining: m.availableTickets,
  }));

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Tournament Command Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time sales, live scanner telemetry, match allocations & revenue for DFL 2026.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/scanner"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black text-black bg-[#00E676] hover:bg-[#00c853] transition-all shadow-md shadow-[#00E676]/20"
          >
            <QrCode className="w-4 h-4" />
            <span>Launch Gate Scanner</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Bookings"
          value={totalBookings}
          change="+18.4%"
          changeType="positive"
          icon={CalendarDays}
          iconColor="#00E676"
          badge="Confirmed"
        />

        <StatCard
          title="Tickets Sold"
          value={ticketsSold}
          change="+24.6%"
          changeType="positive"
          icon={Ticket}
          iconColor="#0ea5e9"
          badge="Live Count"
        />

        <StatCard
          title="Total Revenue"
          value={formatINR(totalRevenue)}
          change="+31.2%"
          changeType="positive"
          icon={CreditCard}
          iconColor="#f59e0b"
          badge="INR Gross"
        />

        <StatCard
          title="Used / Scanned"
          value={ticketsUsed}
          change={`${Math.round((ticketsUsed / Math.max(1, ticketsSold)) * 100)}% Entry`}
          changeType="neutral"
          icon={QrCode}
          iconColor="#10b981"
          badge="Gate Check"
        />

        <StatCard
          title="Pending Payments"
          value={pendingPayments}
          icon={Clock}
          iconColor="#eab308"
          badge="Awaiting Bank"
        />

        <StatCard
          title="Cancelled Bookings"
          value={cancelledBookings}
          icon={XCircle}
          iconColor="#ef4444"
          badge="Revoked"
        />

        <StatCard
          title="Total Spectators"
          value={totalCustomers}
          icon={Users}
          iconColor="#8b5cf6"
          badge="Unique Mobiles"
        />

        <StatCard
          title="Tickets Remaining"
          value={totalRemainingTickets}
          icon={Ticket}
          iconColor="#06b6d4"
          badge="Across 50+ Matches"
        />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Ticket Sales Trend */}
        <div className="lg:col-span-7 rounded-2xl card-glass p-6 border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Ticket Sales Trend</h3>
              <p className="text-xs text-slate-400">Cumulative ticket volume leading up to kickoff</p>
            </div>
            <span className="text-xs font-bold text-[#00E676] bg-[#00E676]/10 px-2.5 py-1 rounded-lg border border-[#00E676]/30">
              Peak Day
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesTrendData}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E676" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00E676" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#00E676"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#salesGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tickets By Match */}
        <div className="lg:col-span-5 rounded-2xl card-glass p-6 border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Tickets by Match</h3>
              <p className="text-xs text-slate-400">Sold vs Remaining per fixture</p>
            </div>
            <Link
              href="/admin/matches"
              className="text-xs font-bold text-[#0ea5e9] hover:underline"
            >
              All Matches →
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={matchChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="sold" fill="#00E676" radius={[4, 4, 0, 0]} name="Sold" />
                <Bar dataKey="remaining" fill="#1E293B" radius={[4, 4, 0, 0]} name="Remaining" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Live Recent Activity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="rounded-2xl card-glass p-6 border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-[#00E676]" />
              Recent Bookings
            </h3>
            <Link
              href="/admin/bookings"
              className="text-xs font-bold text-[#00E676] hover:underline"
            >
              View All ({bookings.length}) →
            </Link>
          </div>

          <div className="divide-y divide-white/5 overflow-x-auto">
            {bookings.slice(0, 5).map((b) => (
              <div key={b.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white">{b.id}</span>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded ${
                        b.status === 'CONFIRMED'
                          ? 'bg-[#00E676]/10 text-[#00E676]'
                          : 'bg-rose-500/10 text-rose-400'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <p className="text-slate-400 mt-0.5">
                    {b.customerName} • {b.quantity} Passes • {b.matchSummary}
                  </p>
                </div>

                <div className="text-right">
                  <div className="font-bold text-white">{formatINR(b.totalAmount)}</div>
                  <Link
                    href={`/admin/bookings/${b.id}`}
                    className="text-[11px] text-[#0ea5e9] hover:underline"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Gate Scans */}
        <div className="rounded-2xl card-glass p-6 border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <QrCode className="w-4 h-4 text-[#0ea5e9]" />
              Recent Gate Scans
            </h3>
            <Link
              href="/admin/scan-history"
              className="text-xs font-bold text-[#0ea5e9] hover:underline"
            >
              Scan History →
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {scanLogs.length > 0 ? (
              scanLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white">{log.ticketId}</span>
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded ${
                          log.result === 'VALID'
                            ? 'bg-[#00E676]/10 text-[#00E676]'
                            : log.result === 'ALREADY_USED'
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-rose-500/10 text-rose-400'
                        }`}
                      >
                        {log.result}
                      </span>
                    </div>
                    <p className="text-slate-400 mt-0.5">
                      {log.customerName} • {log.staffName}
                    </p>
                  </div>

                  <div className="text-right text-slate-400 text-[11px]">
                    {new Date(log.scanTime).toLocaleTimeString()}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">
                No scans recorded today yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
