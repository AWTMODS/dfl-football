'use client';

import React, { useState, useEffect } from 'react';
import {
  LineChart as LucideLineChart,
  Calendar,
  Filter,
  TrendingUp,
  PieChart as LucidePieChart,
} from 'lucide-react';
import { dflStore } from '@/lib/store';
import { Match, Booking } from '@/lib/types';
import { formatINR } from '@/lib/utils';
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
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export default function AnalyticsPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [timeRange, setTimeRange] = useState<'7DAYS' | 'TOURNAMENT' | 'TODAY'>('TOURNAMENT');

  useEffect(() => {
    setMatches(dflStore.getMatches());
    setBookings(dflStore.getBookings());
  }, []);

  const revenueTrendData = [
    { date: '14 Oct', revenue: 18000, bookings: 12 },
    { date: '15 Oct', revenue: 36000, bookings: 24 },
    { date: '16 Oct', revenue: 57000, bookings: 38 },
    { date: '17 Oct', revenue: 78000, bookings: 52 },
    { date: '18 Oct', revenue: 111000, bookings: 74 },
    { date: '19 Oct', revenue: 147000, bookings: 98 },
    { date: '20 Oct', revenue: 168600, bookings: 112 },
  ];

  const paymentStatusData = [
    { name: 'UPI (Demo)', value: 68, color: '#00E676' },
    { name: 'Card (Demo)', value: 20, color: '#0ea5e9' },
    { name: 'NetBanking (Demo)', value: 8, color: '#f59e0b' },
    { name: 'Wallets', value: 4, color: '#8b5cf6' },
  ];

  const matchPopularityData = matches.slice(0, 6).map((m) => ({
    name: `M${m.matchNumber} ${m.teamAName.split(' ')[0]}`,
    ticketsSold: m.totalTickets - m.availableTickets,
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <LucideLineChart className="w-6 h-6 text-[#00E676]" />
            <span>Interactive Ticketing Analytics</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Visual metrics covering revenue velocity, match popularity, and payment distribution.
          </p>
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-bold">
          <button
            onClick={() => setTimeRange('TODAY')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              timeRange === 'TODAY' ? 'bg-[#00E676] text-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setTimeRange('7DAYS')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              timeRange === '7DAYS' ? 'bg-[#00E676] text-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setTimeRange('TOURNAMENT')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              timeRange === 'TOURNAMENT' ? 'bg-[#00E676] text-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            Full Tournament
          </button>
        </div>
      </div>

      {/* Primary Revenue Chart */}
      <div className="rounded-2xl card-glass p-6 border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Gross Revenue Growth (₹)</h3>
            <p className="text-xs text-slate-400">Daily gross revenue trajectory leading up to tournament</p>
          </div>
          <span className="text-xs font-black text-[#00E676] bg-[#00E676]/10 px-3 py-1 rounded-lg border border-[#00E676]/30">
            +31.2% MoM
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueTrendData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
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
                dataKey="revenue"
                stroke="#00E676"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#revGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Sub-Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Match Demand Bar Chart */}
        <div className="rounded-2xl card-glass p-6 border border-white/5 space-y-4">
          <h3 className="text-base font-bold text-white">High-Demand Match Fixtures</h3>
          <p className="text-xs text-slate-400">Total tickets claimed per scheduled fixture</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={matchPopularityData}>
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
                <Bar dataKey="ticketsSold" fill="#0ea5e9" radius={[6, 6, 0, 0]} name="Tickets Sold" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Channels Pie Chart */}
        <div className="rounded-2xl card-glass p-6 border border-white/5 space-y-4">
          <h3 className="text-base font-bold text-white">Payment Method Distribution</h3>
          <p className="text-xs text-slate-400">Breakdown of spectator checkout channels</p>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {paymentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Legend
                  formatter={(val) => <span className="text-xs text-slate-300">{val}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
