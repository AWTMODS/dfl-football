'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import {
  Shield,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Download,
  Share2,
  Printer,
  Ticket as TicketIcon,
} from 'lucide-react';
import { TicketItem } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface DigitalTicketPassProps {
  ticket: TicketItem;
  showActions?: boolean;
}

export default function DigitalTicketPass({
  ticket,
  showActions = true,
}: DigitalTicketPassProps) {
  const passRef = useRef<HTMLDivElement>(null);

  const getStatusBadge = () => {
    switch (ticket.status) {
      case 'VALID':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/40 uppercase tracking-widest shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5" />
            VALID
          </span>
        );
      case 'USED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-400 border border-amber-500/40 uppercase tracking-widest shadow-sm">
            <AlertTriangle className="w-3.5 h-3.5" />
            USED
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-500/20 text-rose-400 border border-rose-500/40 uppercase tracking-widest shadow-sm">
            <XCircle className="w-3.5 h-3.5" />
            CANCELLED
          </span>
        );
      case 'EXPIRED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-slate-500/20 text-slate-300 border border-slate-500/40 uppercase tracking-widest shadow-sm">
            EXPIRED
          </span>
        );
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `DFL Football Ticket - ${ticket.matchSummary}`,
          text: `Here is my match ticket ${ticket.id} for DFL Football tournament at Vengara!`,
          url: window.location.href,
        });
      } catch {
        // user cancelled share
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Ticket link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Stadium Ticket Pass Card */}
      <div
        ref={passRef}
        className="w-full max-w-sm rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#111A29] via-[#0E1624] to-[#0A0F18] shadow-2xl shadow-black/80 relative"
      >
        {/* Glow Accent Header */}
        <div className="h-2 bg-gradient-to-r from-[#00E676] via-[#0ea5e9] to-[#00E676]" />

        {/* Top Header */}
        <div className="p-6 pb-4 border-b border-white/10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-28 bg-[#00E676]/5 blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-[#00E676] flex items-center justify-center">
              <Shield className="w-5 h-5 text-black fill-black" />
            </div>
            <div className="text-left">
              <h2 className="text-lg font-black text-white tracking-wider leading-none">
                DFL FOOTBALL
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Defenders Football League
              </p>
            </div>
          </div>

          <div className="inline-block mt-2 px-3 py-1 rounded-full bg-[#00E676]/10 border border-[#00E676]/30">
            <span className="text-xs font-black tracking-widest text-[#00E676] uppercase">
              {ticket.ticketType || 'GENERAL PASS'}
            </span>
          </div>
        </div>

        {/* Middle Match Details */}
        <div className="p-6 space-y-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Match
            </span>
            <div className="text-base font-extrabold text-white mt-0.5">
              {ticket.matchSummary}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Date
              </span>
              <div className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#00E676]" />
                {formatDate(ticket.date)}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Kickoff Time
              </span>
              <div className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#00E676]" />
                {ticket.time}
              </div>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Venue
            </span>
            <div className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#0ea5e9]" />
              {ticket.venue}
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Spectator Name
              </span>
              <div className="text-sm font-bold text-white mt-0.5 truncate">
                {ticket.customerName}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Booking ID
              </span>
              <div className="text-xs font-mono font-bold text-slate-300 mt-0.5">
                {ticket.bookingId}
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Perforated Divider with Side Cutout Notches */}
        <div className="relative py-2 flex items-center justify-between">
          <div className="w-5 h-8 bg-[#060B11] rounded-r-full -ml-1 border-t border-r border-b border-white/15" />
          <div className="flex-1 border-b-2 border-dashed border-white/20 mx-2" />
          <div className="w-5 h-8 bg-[#060B11] rounded-l-full -mr-1 border-t border-l border-b border-white/15" />
        </div>

        {/* QR Code and Validation Stub */}
        <div className="p-6 pt-4 text-center space-y-4 bg-black/20">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
              Ticket ID
            </span>
            <span className="font-mono text-xs font-black text-white bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
              {ticket.id}
            </span>
          </div>

          {/* QR Code Graphic */}
          <div className="flex justify-center my-3">
            <div className="p-3 bg-white rounded-2xl shadow-xl border-4 border-[#00E676]/30">
              <QRCodeSVG
                value={ticket.qrToken || ticket.id}
                size={144}
                level="H"
                includeMargin={false}
              />
            </div>
          </div>

          <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
            Scan at gate scanner for entry. Do not share your QR code with unauthorized persons.
          </p>

          <div className="pt-2">{getStatusBadge()}</div>

          {ticket.scannedAt && (
            <p className="text-[10px] text-slate-400">
              Scanned on: {new Date(ticket.scannedAt).toLocaleTimeString()} ({ticket.scannedBy || 'Gate Staff'})
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons below Pass */}
      {showActions && (
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6 print:hidden">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Pass</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Ticket</span>
          </button>

          <Link
            href={`/track-ticket?id=${ticket.bookingId}&phone=${encodeURIComponent(ticket.phone)}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-black bg-[#00E676] hover:bg-[#00c853] transition-all shadow-md shadow-[#00E676]/20"
          >
            <TicketIcon className="w-3.5 h-3.5" />
            <span>Track Booking</span>
          </Link>
        </div>
      )}
    </div>
  );
}
