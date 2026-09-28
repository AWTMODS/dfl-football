'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CalendarDays,
  ArrowLeft,
  Ticket,
  CreditCard,
  User,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Printer,
  Shield,
} from 'lucide-react';
import { dflStore } from '@/lib/store';
import { Booking, TicketItem } from '@/lib/types';
import { formatINR, formatDate } from '@/lib/utils';
import DigitalTicketPass from '@/components/public/DigitalTicketPass';

export default function AdminBookingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params?.id as string;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [selectedTicketModal, setSelectedTicketModal] = useState<TicketItem | null>(null);

  useEffect(() => {
    setBooking(dflStore.getBookingById(bookingId));
  }, [bookingId]);

  if (!booking) {
    return (
      <div className="py-12 text-center text-slate-400">
        <h2 className="text-xl font-bold text-white">Booking Not Found</h2>
        <Link href="/admin/bookings" className="text-xs text-[#00E676] underline mt-3 inline-block">
          ← Back to Bookings
        </Link>
      </div>
    );
  }

  const handleCancelBooking = () => {
    if (confirm(`Cancel booking ${booking.id} and revoke all ${booking.tickets.length} tickets?`)) {
      dflStore.cancelBooking(booking.id);
      setBooking(dflStore.getBookingById(booking.id));
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/bookings"
            className="inline-flex items-center gap-1.5 text-xs text-[#00E676] hover:underline mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Bookings</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-white font-mono">{booking.id}</h1>
            <span
              className={`text-xs font-black px-2.5 py-0.5 rounded-full uppercase ${
                booking.status === 'CONFIRMED'
                  ? 'bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}
            >
              {booking.status}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Booked on {new Date(booking.createdAt).toLocaleString()}
          </p>
        </div>

        {booking.status !== 'CANCELLED' && (
          <button
            onClick={handleCancelBooking}
            className="px-4 py-2 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-colors"
          >
            Cancel Entire Booking
          </button>
        )}
      </div>

      {/* Grid of Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customer Details */}
        <div className="rounded-2xl card-glass p-5 border border-white/5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#00E676] uppercase">
            <User className="w-4 h-4" />
            <span>Customer Information</span>
          </div>
          <div className="text-xs space-y-1">
            <p className="text-sm font-bold text-white">{booking.customerName}</p>
            <p className="text-slate-300">Phone: {booking.phone}</p>
            <p className="text-slate-400">Email: {booking.email || 'None provided'}</p>
          </div>
        </div>

        {/* Match Details */}
        <div className="rounded-2xl card-glass p-5 border border-white/5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0ea5e9] uppercase">
            <CalendarDays className="w-4 h-4" />
            <span>Match Information</span>
          </div>
          <div className="text-xs space-y-1">
            <p className="text-sm font-bold text-white">{booking.matchSummary}</p>
            <p className="text-slate-300">
              {formatDate(booking.matchDate)} at {booking.matchTime}
            </p>
            <p className="text-slate-400">{booking.matchVenue}</p>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="rounded-2xl card-glass p-5 border border-white/5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase">
            <CreditCard className="w-4 h-4" />
            <span>Payment Summary</span>
          </div>
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Total Amount:</span>
              <span className="font-bold text-white text-sm">{formatINR(booking.totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Payment Status:</span>
              <span className="font-bold text-emerald-400">{booking.paymentStatus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Method:</span>
              <span className="text-slate-300">{booking.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Reference:</span>
              <span className="font-mono text-slate-300">{booking.paymentRef}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Individual Passes in Booking */}
      <div className="rounded-2xl card-glass p-6 border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Ticket className="w-4 h-4 text-[#00E676]" />
            <span>Issued Tickets ({booking.tickets.length})</span>
          </h3>
          <span className="text-xs text-slate-400">
            Each ticket has its own scannable QR token
          </span>
        </div>

        <div className="divide-y divide-white/5">
          {booking.tickets.map((t, idx) => (
            <div key={t.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-[#00E676]">
                  {idx + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-white">{t.id}</span>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        t.status === 'VALID'
                          ? 'bg-[#00E676]/10 text-[#00E676]'
                          : t.status === 'USED'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-rose-500/10 text-rose-400'
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {t.ticketType} • {formatINR(t.price)}
                    {t.scannedAt && ` • Scanned at ${new Date(t.scannedAt).toLocaleTimeString()}`}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedTicketModal(t)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-200"
              >
                <Eye className="w-3.5 h-3.5 text-[#00E676]" />
                <span>View Pass</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Ticket Pass Modal */}
      {selectedTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-h-[90vh] overflow-y-auto w-full max-w-sm">
            <button
              onClick={() => setSelectedTicketModal(null)}
              className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-white text-black font-black text-sm flex items-center justify-center shadow-lg"
            >
              ✕
            </button>
            <DigitalTicketPass ticket={selectedTicketModal} />
          </div>
        </div>
      )}
    </div>
  );
}
