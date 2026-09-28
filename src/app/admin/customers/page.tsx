'use client';

import React, { useState, useEffect } from 'react';
import { UserCheck, Search, Phone, Mail, Ticket, CreditCard } from 'lucide-react';
import { dflStore } from '@/lib/store';
import { Booking } from '@/lib/types';
import { formatINR } from '@/lib/utils';

interface CustomerProfile {
  phone: string;
  name: string;
  email?: string;
  bookingCount: number;
  totalTickets: number;
  totalSpent: number;
  latestBookingDate: string;
}

export default function CustomersManagementPage() {
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const bookings = dflStore.getBookings();
    const map = new Map<string, CustomerProfile>();

    bookings.forEach((b) => {
      const key = b.phone || b.customerName;
      if (!map.has(key)) {
        map.set(key, {
          phone: b.phone,
          name: b.customerName,
          email: b.email,
          bookingCount: 0,
          totalTickets: 0,
          totalSpent: 0,
          latestBookingDate: b.createdAt,
        });
      }

      const item = map.get(key)!;
      item.bookingCount += 1;
      item.totalTickets += b.quantity;
      if (b.paymentStatus === 'PAID') {
        item.totalSpent += b.totalAmount;
      }
      if (new Date(b.createdAt) > new Date(item.latestBookingDate)) {
        item.latestBookingDate = b.createdAt;
      }
    });

    setCustomers(Array.from(map.values()));
  }, []);

  const filteredCustomers = customers.filter((c) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        (c.email && c.email.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-[#00E676]" />
            <span>Spectators & Customers Directory</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Directory of all individuals who booked tickets for DFL 2026.
          </p>
        </div>

        <span className="text-xs font-semibold text-slate-300">
          {customers.length} Unique Spectators
        </span>
      </div>

      {/* Search */}
      <div className="rounded-2xl card-glass p-4 border border-white/5">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customer name, phone, or email..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-[#00E676]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl card-glass border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.03] border-b border-white/10 text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3.5 font-bold">Spectator</th>
                <th className="px-5 py-3.5 font-bold">Mobile Phone</th>
                <th className="px-5 py-3.5 font-bold">Email</th>
                <th className="px-5 py-3.5 font-bold text-center">Bookings</th>
                <th className="px-5 py-3.5 font-bold text-center">Tickets Bought</th>
                <th className="px-5 py-3.5 font-bold text-right">Total Spent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((c, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4 font-bold text-white">
                      {c.name}
                    </td>

                    <td className="px-5 py-4 font-mono text-slate-300">
                      {c.phone}
                    </td>

                    <td className="px-5 py-4 text-slate-400">
                      {c.email || '—'}
                    </td>

                    <td className="px-5 py-4 text-center font-bold text-white">
                      {c.bookingCount}
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#00E676]/10 text-[#00E676] font-bold text-xs border border-[#00E676]/30">
                        {c.totalTickets}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right font-black text-white text-sm">
                      {formatINR(c.totalSpent)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No customers found matching search.
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
