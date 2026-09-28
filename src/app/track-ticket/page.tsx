'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import DigitalTicketPass from '@/components/public/DigitalTicketPass';
import { dflStore } from '@/lib/store';
import { Booking, TicketItem } from '@/lib/types';
import { formatDate, formatINR } from '@/lib/utils';
import {
  Search,
  Ticket,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Smartphone,
  Mail,
  ChevronRight,
  Shield,
  Eye,
  ArrowRight,
} from 'lucide-react';

function TrackTicketContent() {
  const searchParams = useSearchParams();
  const prefillId = searchParams?.get('id') || '';
  const prefillPhone = searchParams?.get('phone') || '';

  const [bookingId, setBookingId] = useState(prefillId);
  const [contact, setContact] = useState(prefillPhone);
  const [searchType, setSearchType] = useState<'PHONE' | 'EMAIL'>('PHONE');
  const [searched, setSearched] = useState(false);
  const [foundBooking, setFoundBooking] = useState<Booking | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedModalTicket, setSelectedModalTicket] = useState<TicketItem | null>(null);

  useEffect(() => {
    if (prefillId && prefillPhone) {
      handleSearch(prefillId, prefillPhone);
    }
  }, [prefillId, prefillPhone]);

  const handleSearch = (idToSearch?: string, contactToSearch?: string) => {
    const bId = (idToSearch !== undefined ? idToSearch : bookingId).trim();
    const cont = (contactToSearch !== undefined ? contactToSearch : contact).trim();

    if (!bId) {
      setErrorMessage('Please enter your Booking ID (e.g. DFL-2026-A8F92K)');
      return;
    }
    if (!cont) {
      setErrorMessage(
        searchType === 'PHONE'
          ? 'Please enter your 10-digit mobile number'
          : 'Please enter your registered email'
      );
      return;
    }

    setErrorMessage(null);
    setSearched(true);

    const booking = dflStore.trackBooking(bId, cont);
    if (booking) {
      setFoundBooking(booking);
    } else {
      setFoundBooking(null);
      setErrorMessage(
        'No matching booking found. Please check your Booking ID and phone number or contact tournament support.'
      );
    }
  };

  const getTimelineStepStatus = (stepIndex: number, booking: Booking) => {
    // 1: Created, 2: Paid, 3: Tickets Generated, 4: Ready for Entry, 5: Scanned
    if (booking.status === 'CANCELLED') {
      return stepIndex === 1 ? 'completed' : 'cancelled';
    }
    if (stepIndex <= 3) return 'completed';

    const hasAnyUsed = booking.tickets.some((t) => t.status === 'USED');
    if (stepIndex === 4) return 'completed';
    if (stepIndex === 5) return hasAnyUsed ? 'completed' : 'pending';
    return 'pending';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full space-y-10">
      {/* Search Card */}
      <div className="rounded-3xl card-glass border border-white/10 p-6 sm:p-8 bg-[#09101A] shadow-xl">
        <div className="text-center max-w-md mx-auto mb-8 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#00E676]/10 border border-[#00E676]/30 flex items-center justify-center mx-auto text-[#00E676]">
            <Ticket className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Track Your Ticket</h1>
          <p className="text-xs text-slate-400">
            Enter your booking ID and mobile number to view match pass, QR status, and entry verification.
          </p>
        </div>

        {/* Demo Test Shortcut banner */}
        <div className="mb-6 p-3 rounded-xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-slate-400">Quick Test Booking:</span>
          <button
            type="button"
            onClick={() => {
              setBookingId('DFL-2026-A8F92K');
              setContact('9876543210');
              handleSearch('DFL-2026-A8F92K', '9876543210');
            }}
            className="text-[#00E676] font-bold hover:underline"
          >
            Load Sample: DFL-2026-A8F92K (Aadith C V)
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                Booking ID
              </label>
              <input
                type="text"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value.toUpperCase())}
                placeholder="DFL-2026-XXXXXX"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono placeholder-slate-400 text-sm focus:outline-none focus:border-[#00E676] uppercase"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase text-slate-300">
                  {searchType === 'PHONE' ? 'Mobile Number' : 'Email Address'}
                </label>
                <div className="text-[11px] space-x-2">
                  <button
                    type="button"
                    onClick={() => setSearchType('PHONE')}
                    className={`font-semibold ${searchType === 'PHONE' ? 'text-[#00E676]' : 'text-slate-400'}`}
                  >
                    Phone
                  </button>
                  <span className="text-slate-400">•</span>
                  <button
                    type="button"
                    onClick={() => setSearchType('EMAIL')}
                    className={`font-semibold ${searchType === 'EMAIL' ? 'text-[#00E676]' : 'text-slate-400'}`}
                  >
                    Email
                  </button>
                </div>
              </div>

              <div className="relative">
                {searchType === 'PHONE' ? (
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                ) : (
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                )}
                <input
                  type={searchType === 'PHONE' ? 'tel' : 'email'}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={
                    searchType === 'PHONE' ? '98765 43210' : 'aadith@example.com'
                  }
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#00E676]"
                />
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-black text-sm text-black bg-[#00E676] hover:bg-[#00c853] transition-all shadow-lg shadow-[#00E676]/20"
          >
            <Search className="w-4 h-4" />
            <span>Track Booking</span>
          </button>
        </form>
      </div>

      {/* Result Display */}
      {foundBooking && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Booking Summary Box */}
          <div className="rounded-3xl card-glass border border-white/10 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                  Booking Status
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <h2 className="text-xl sm:text-2xl font-black text-white font-mono">
                    {foundBooking.id}
                  </h2>
                  <span
                    className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                      foundBooking.status === 'CONFIRMED'
                        ? 'bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/40'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    }`}
                  >
                    {foundBooking.status}
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                  Total Paid
                </span>
                <div className="text-xl font-black text-[#00E676]">
                  {formatINR(foundBooking.totalAmount)}
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">
                  via {foundBooking.paymentMethod}
                </span>
              </div>
            </div>

            {/* Match Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 uppercase font-bold text-[10px]">Spectator</span>
                <p className="font-bold text-white text-sm">{foundBooking.customerName}</p>
                <p className="text-slate-400">{foundBooking.phone}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 uppercase font-bold text-[10px]">Match</span>
                <p className="font-bold text-white text-sm">{foundBooking.matchSummary}</p>
                <p className="text-slate-400">{foundBooking.matchVenue}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 uppercase font-bold text-[10px]">Schedule</span>
                <p className="font-bold text-white text-sm">{formatDate(foundBooking.matchDate)}</p>
                <p className="text-slate-400">{foundBooking.matchTime} Kickoff</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 uppercase font-bold text-[10px]">Passes</span>
                <p className="font-bold text-white text-sm">
                  {foundBooking.quantity} {foundBooking.ticketType}
                </p>
                <p className="text-[#00E676] font-semibold">
                  {foundBooking.tickets.filter((t) => t.status === 'VALID').length} Valid /{' '}
                  {foundBooking.tickets.filter((t) => t.status === 'USED').length} Scanned
                </p>
              </div>
            </div>

            {/* Visual Timeline Progression */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Ticket Lifecycle Timeline
              </h4>

              <div className="grid grid-cols-5 gap-2 text-center text-xs">
                {[
                  { label: 'Booking Created', icon: CheckCircle2, step: 1 },
                  { label: 'Payment Confirmed', icon: CheckCircle2, step: 2 },
                  { label: 'Tickets Generated', icon: CheckCircle2, step: 3 },
                  { label: 'Ready for Entry', icon: CheckCircle2, step: 4 },
                  { label: 'Gate Scanned', icon: Shield, step: 5 },
                ].map((item, idx) => {
                  const state = getTimelineStepStatus(item.step, foundBooking);
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mb-1.5 transition-all ${
                          state === 'completed'
                            ? 'bg-[#00E676] text-black shadow-md'
                            : 'bg-white/5 text-slate-400 border border-white/10'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`text-[10px] leading-tight ${
                          state === 'completed'
                            ? 'text-white font-bold'
                            : 'text-slate-400'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Individual Tickets List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Ticket className="w-5 h-5 text-[#00E676]" />
                <span>All Passes in this Booking ({foundBooking.tickets.length})</span>
              </h3>
              <span className="text-xs text-slate-400">
                Click any pass to inspect or present at gate
              </span>
            </div>

            <div className="space-y-3">
              {foundBooking.tickets.map((ticket, idx) => {
                const isValid = ticket.status === 'VALID';
                const isUsed = ticket.status === 'USED';
                const isCancelled = ticket.status === 'CANCELLED';

                return (
                  <div
                    key={ticket.id}
                    className="rounded-2xl card-glass p-4 sm:p-5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs text-[#00E676]">
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-black text-white">
                            {ticket.id}
                          </span>
                          {isValid && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/40 uppercase">
                              VALID
                            </span>
                          )}
                          {isUsed && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-400 border border-amber-500/40 uppercase">
                              USED
                            </span>
                          )}
                          {isCancelled && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500/20 text-rose-400 border border-rose-500/40 uppercase">
                              CANCELLED
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {ticket.matchSummary} • {ticket.customerName}
                          {ticket.scannedAt && (
                            <span className="text-amber-400 ml-2">
                              (Scanned at {new Date(ticket.scannedAt).toLocaleTimeString()})
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedModalTicket(ticket)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#00E676]" />
                      <span>View Pass</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Ticket Modal Overlay */}
      {selectedModalTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-h-[90vh] overflow-y-auto w-full max-w-sm">
            <button
              onClick={() => setSelectedModalTicket(null)}
              className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-white text-black font-black text-sm flex items-center justify-center shadow-lg"
            >
              ✕
            </button>
            <DigitalTicketPass ticket={selectedModalTicket} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackTicketPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#060B11] text-white">
      <Navbar />
      <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading tracking portal...</div>}>
        <TrackTicketContent />
      </Suspense>
      <Footer />
    </div>
  );
}
