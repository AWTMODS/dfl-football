'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import DigitalTicketPass from '@/components/public/DigitalTicketPass';
import { dflStore } from '@/lib/store';
import { TicketItem } from '@/lib/types';
import { Ticket, ArrowLeft } from 'lucide-react';

export default function TicketViewPage() {
  const params = useParams();
  const ticketId = params?.id as string;
  const [ticket, setTicket] = useState<TicketItem | null>(null);

  useEffect(() => {
    if (ticketId) {
      setTicket(dflStore.getTicketById(ticketId));
    }
  }, [ticketId]);

  if (!ticket) {
    return (
      <div className="min-h-screen flex flex-col bg-[#060B11] text-white">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <Ticket className="w-12 h-12 text-slate-400 mb-4" />
          <h2 className="text-xl font-bold">Ticket Not Found</h2>
          <p className="text-xs text-slate-400 mt-1 mb-6">
            The pass reference {ticketId} does not exist in the DFL 2026 database.
          </p>
          <Link
            href="/track-ticket"
            className="px-5 py-2.5 rounded-xl bg-[#00E676] text-black font-bold text-xs"
          >
            ← Track by Booking ID
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#060B11] text-white">
      <Navbar />

      <div className="py-6 border-b border-white/10 bg-[#080E17]">
        <div className="max-w-xl mx-auto px-4 flex items-center justify-between">
          <Link
            href="/track-ticket"
            className="inline-flex items-center gap-1.5 text-xs text-[#00E676] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Track Portal</span>
          </Link>
          <span className="text-xs font-mono text-slate-400 font-bold">{ticket.id}</span>
        </div>
      </div>

      <div className="flex-1 max-w-xl mx-auto px-4 py-8 sm:py-12 w-full">
        <DigitalTicketPass ticket={ticket} />
      </div>

      <Footer />
    </div>
  );
}
