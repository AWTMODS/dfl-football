'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  QrCode,
  Camera,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Shield,
  Clock,
  User,
  MapPin,
  Calendar,
  History,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { dflStore } from '@/lib/store';
import { TicketItem, ScanLog } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function QRScannerPage() {
  const [manualTicketInput, setManualTicketInput] = useState('');
  const [isScanning, setIsScanning] = useState(true);

  // Scan Outcome
  const [scanResult, setScanResult] = useState<{
    outcome: 'VALID' | 'ALREADY_USED' | 'INVALID' | 'CANCELLED';
    ticket: TicketItem | null;
    firstScanTime?: string;
    message: string;
  } | null>(null);

  const [recentLogs, setRecentLogs] = useState<ScanLog[]>([]);

  useEffect(() => {
    setRecentLogs(dflStore.getScanLogs().slice(0, 8));
  }, []);

  const handleScanInput = (ticketIdToScan: string) => {
    if (!ticketIdToScan.trim()) return;

    const outcome = dflStore.scanTicket(
      ticketIdToScan.trim(),
      'staff-4',
      'Staff 01 (Gate Scanner)'
    );

    setScanResult({
      outcome: outcome.result,
      ticket: outcome.ticket,
      firstScanTime: outcome.firstScanTime,
      message: outcome.message,
    });

    setRecentLogs(dflStore.getScanLogs().slice(0, 8));
  };

  const handleMarkAsUsed = () => {
    if (!scanResult?.ticket) return;
    dflStore.markTicketAsUsed(scanResult.ticket.id, 'Staff 01 (Gate Scanner)');

    // Refresh state
    setScanResult({
      ...scanResult,
      outcome: 'ALREADY_USED',
      firstScanTime: new Date().toISOString(),
      message: 'Ticket successfully marked as USED. Gate entry granted.',
    });

    setRecentLogs(dflStore.getScanLogs().slice(0, 8));
  };

  const handleResetScanner = () => {
    setScanResult(null);
    setManualTicketInput('');
    setIsScanning(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <QrCode className="w-6 h-6 text-[#00E676]" />
            <span>DFL Gate Scanner & Entry Verification</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Authorized gate access terminal • Staff: Staff 01 (Vengara Gate A)
          </p>
        </div>

        <Link
          href="/admin/scan-history"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-white/5 border border-white/10"
        >
          <History className="w-3.5 h-3.5 text-[#00E676]" />
          <span>View Scan Logs</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Camera View / Result Screens */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl card-glass border border-white/10 p-6 bg-[#09101C] shadow-2xl relative overflow-hidden">
            {/* ================= OUTCOME 1: VALID TICKET ================= */}
            {scanResult?.outcome === 'VALID' && (
              <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
                <div className="w-20 h-20 rounded-full bg-[#00E676]/20 border-2 border-[#00E676] flex items-center justify-center mx-auto text-[#00E676] shadow-xl shadow-[#00E676]/30">
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#00E676] block">
                    Gate Check Passed
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    ✓ VALID TICKET
                  </h2>
                </div>

                {scanResult.ticket && (
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-5 text-left space-y-3 text-xs">
                    <div className="flex justify-between border-b border-white/10 pb-2.5">
                      <span className="text-slate-400 font-semibold">Spectator</span>
                      <span className="text-white font-bold text-sm">
                        {scanResult.ticket.customerName}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-white/10 pb-2.5">
                      <span className="text-slate-400 font-semibold">Ticket ID</span>
                      <span className="font-mono text-white font-black text-xs bg-white/10 px-2 py-0.5 rounded">
                        {scanResult.ticket.id}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-white/10 pb-2.5">
                      <span className="text-slate-400 font-semibold">Match</span>
                      <span className="text-white font-bold">
                        {scanResult.ticket.matchSummary}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-white/10 pb-2.5">
                      <span className="text-slate-400 font-semibold">Time & Date</span>
                      <span className="text-white font-bold">
                        {scanResult.ticket.time}, {formatDate(scanResult.ticket.date)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold">Venue</span>
                      <span className="text-white font-bold">{scanResult.ticket.venue}</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={handleMarkAsUsed}
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-xl font-black text-sm text-black bg-[#00E676] hover:bg-[#00c853] transition-all shadow-lg shadow-[#00E676]/30"
                  >
                    MARK AS USED & ADMIT SPECTATOR
                  </button>
                  <button
                    onClick={handleResetScanner}
                    className="w-full sm:w-auto py-3.5 px-5 rounded-xl font-bold text-xs text-white bg-white/10 hover:bg-white/15 border border-white/10"
                  >
                    Scan Next
                  </button>
                </div>
              </div>
            )}

            {/* ================= OUTCOME 2: ALREADY USED ================= */}
            {scanResult?.outcome === 'ALREADY_USED' && (
              <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
                <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center mx-auto text-amber-400 shadow-xl shadow-amber-500/30">
                  <AlertTriangle className="w-12 h-12" />
                </div>

                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-amber-400 block">
                    Duplicate Entry Detected
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    ⚠ TICKET ALREADY USED
                  </h2>
                </div>

                <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-5 text-left space-y-3 text-xs text-slate-200">
                  <div className="flex justify-between border-b border-amber-500/20 pb-2">
                    <span className="text-slate-400">Ticket ID</span>
                    <span className="font-mono font-bold text-white">
                      {scanResult.ticket?.id}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-amber-500/20 pb-2">
                    <span className="text-slate-400">First Scanned At</span>
                    <span className="font-bold text-amber-300">
                      {scanResult.firstScanTime
                        ? new Date(scanResult.firstScanTime).toLocaleString()
                        : 'Earlier today'}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-amber-500/20 pb-2">
                    <span className="text-slate-400">Spectator Name</span>
                    <span className="font-bold text-white">
                      {scanResult.ticket?.customerName}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Match</span>
                    <span className="font-bold text-white">
                      {scanResult.ticket?.matchSummary}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-rose-300 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                  Entry Denied. Please direct spectator to the Helpdesk or supervisor.
                </p>

                <button
                  onClick={handleResetScanner}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-xs text-white bg-white/10 hover:bg-white/15 border border-white/10"
                >
                  Scan Another Ticket
                </button>
              </div>
            )}

            {/* ================= OUTCOME 3: INVALID / CANCELLED ================= */}
            {(scanResult?.outcome === 'INVALID' || scanResult?.outcome === 'CANCELLED') && (
              <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
                <div className="w-20 h-20 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center mx-auto text-rose-400 shadow-xl shadow-rose-500/30">
                  <XCircle className="w-12 h-12" />
                </div>

                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-rose-400 block">
                    Security Rejection
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    {scanResult.outcome === 'CANCELLED'
                      ? '✕ CANCELLED TICKET'
                      : '✕ INVALID TICKET'}
                  </h2>
                </div>

                <div className="rounded-2xl bg-rose-500/10 border border-rose-500/30 p-5 text-center text-xs text-rose-200">
                  <p className="leading-relaxed">{scanResult.message}</p>
                </div>

                <button
                  onClick={handleResetScanner}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-xs text-white bg-white/10 hover:bg-white/15 border border-white/10"
                >
                  Scan Another Ticket
                </button>
              </div>
            )}

            {/* ================= IDLE SCANNER INTERFACE ================= */}
            {!scanResult && (
              <div className="space-y-6 text-center">
                {/* Simulated Camera Feed Reticle */}
                <div className="aspect-square max-w-xs mx-auto rounded-3xl bg-[#060B12] border-2 border-white/10 relative overflow-hidden flex flex-col items-center justify-center p-6 shadow-inner">
                  {/* Laser scan animation line */}
                  <div className="absolute left-4 right-4 h-0.5 bg-[#00E676] shadow-[0_0_12px_#00E676] animate-bounce top-1/3" />

                  {/* Corner Guides */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#00E676]" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#00E676]" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#00E676]" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#00E676]" />

                  <QrCode className="w-20 h-20 text-white/30" />
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-4">
                    Align QR Inside Frame
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">Live Camera Active</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Position attendee’s phone or printed pass in front of lens.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Instant Test Triggers & Manual Entry */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Test Buttons (Essential for review/testing) */}
          <div className="rounded-3xl card-glass border border-white/10 p-6 bg-[#09101C] space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#00E676] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>1-Click Test Cases Simulator</span>
            </div>

            <p className="text-xs text-slate-400">
              Trigger any gate entry condition instantly with realistic tournament records:
            </p>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleScanInput('DFL-TKT-0001')}
                className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left flex items-center justify-between transition-colors"
              >
                <div>
                  <div className="text-xs font-bold text-white">Test 1: Valid Ticket</div>
                  <div className="text-[10px] text-slate-400 font-mono">DFL-TKT-0001 (Aadith C V)</div>
                </div>
                <span className="text-[10px] font-black text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded">
                  PASS
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleScanInput('DFL-TKT-0003')}
                className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left flex items-center justify-between transition-colors"
              >
                <div>
                  <div className="text-xs font-bold text-white">Test 2: Already Used Ticket</div>
                  <div className="text-[10px] text-slate-400 font-mono">DFL-TKT-0003 (Scanned previously)</div>
                </div>
                <span className="text-[10px] font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  ALERT
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleScanInput('DFL-TKT-0011')}
                className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left flex items-center justify-between transition-colors"
              >
                <div>
                  <div className="text-xs font-bold text-white">Test 3: Cancelled Ticket</div>
                  <div className="text-[10px] text-slate-400 font-mono">DFL-TKT-0011 (Nikhil J)</div>
                </div>
                <span className="text-[10px] font-black text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                  REVOKED
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleScanInput('DFL-TKT-FAKE99')}
                className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left flex items-center justify-between transition-colors"
              >
                <div>
                  <div className="text-xs font-bold text-white">Test 4: Invalid/Fake QR</div>
                  <div className="text-[10px] text-slate-400 font-mono">DFL-TKT-FAKE99 (Unknown)</div>
                </div>
                <span className="text-[10px] font-black text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                  INVALID
                </span>
              </button>
            </div>
          </div>

          {/* Manual Ticket ID input */}
          <div className="rounded-3xl card-glass border border-white/10 p-6 bg-[#09101C] space-y-3">
            <h4 className="text-xs font-bold uppercase text-slate-300">
              Manual Ticket ID Lookup
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={manualTicketInput}
                onChange={(e) => setManualTicketInput(e.target.value.toUpperCase())}
                placeholder="DFL-TKT-XXXX"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#00E676] uppercase"
              />
              <button
                onClick={() => handleScanInput(manualTicketInput)}
                className="px-4 py-2.5 rounded-xl text-xs font-black text-black bg-[#00E676] hover:bg-[#00c853]"
              >
                Verify
              </button>
            </div>
          </div>

          {/* Recent Scans in this session */}
          <div className="rounded-3xl card-glass border border-white/10 p-6 bg-[#09101C] space-y-3">
            <h4 className="text-xs font-bold uppercase text-slate-300 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-[#00E676]" />
              <span>Gate Terminal Audit Stream</span>
            </h4>

            <div className="divide-y divide-white/5 max-h-48 overflow-y-auto">
              {recentLogs.map((log) => (
                <div key={log.id} className="py-2 flex items-center justify-between text-[11px]">
                  <div>
                    <span className="font-mono text-white">{log.ticketId}</span>
                    <span className="text-slate-400 ml-2">{log.customerName}</span>
                  </div>
                  <span
                    className={`font-black ${
                      log.result === 'VALID'
                        ? 'text-[#00E676]'
                        : log.result === 'ALREADY_USED'
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {log.result}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
