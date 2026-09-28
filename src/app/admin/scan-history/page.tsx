'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  History,
  QrCode,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Filter,
} from 'lucide-react';
import { dflStore } from '@/lib/store';
import { ScanLog } from '@/lib/types';

export default function ScanHistoryPage() {
  const [logs, setLogs] = useState<ScanLog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [resultFilter, setResultFilter] = useState<'ALL' | 'VALID' | 'ALREADY_USED' | 'INVALID' | 'CANCELLED'>('ALL');

  useEffect(() => {
    setLogs(dflStore.getScanLogs());
  }, []);

  const filteredLogs = logs.filter((log) => {
    if (resultFilter !== 'ALL' && log.result !== resultFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const text = `${log.ticketId} ${log.customerName} ${log.staffName} ${log.matchSummary}`.toLowerCase();
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
            <History className="w-6 h-6 text-[#00E676]" />
            <span>Gate Scan Audit Trail</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Cryptographic timestamped log of all barcode and QR code verifications at stadium turnstiles.
          </p>
        </div>

        <Link
          href="/admin/scanner"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-black bg-[#00E676] hover:bg-[#00c853]"
        >
          <QrCode className="w-4 h-4" />
          <span>Launch Scanner</span>
        </Link>
      </div>

      {/* Filter and Search */}
      <div className="rounded-2xl card-glass p-4 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ticket ID, spectator, gate staff..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-[#00E676]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {(['ALL', 'VALID', 'ALREADY_USED', 'INVALID', 'CANCELLED'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setResultFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                resultFilter === r
                  ? 'bg-[#00E676] text-black'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="rounded-2xl card-glass border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.03] border-b border-white/10 text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3.5 font-bold">Ticket ID</th>
                <th className="px-5 py-3.5 font-bold">Spectator</th>
                <th className="px-5 py-3.5 font-bold">Match</th>
                <th className="px-5 py-3.5 font-bold">Scan Outcome</th>
                <th className="px-5 py-3.5 font-bold">Gate Officer</th>
                <th className="px-5 py-3.5 font-bold text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4 font-mono font-bold text-white">
                      {log.ticketId}
                    </td>

                    <td className="px-5 py-4 font-medium text-white">
                      {log.customerName}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {log.matchSummary}
                    </td>

                    <td className="px-5 py-4">
                      {log.result === 'VALID' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30 uppercase">
                          <CheckCircle2 className="w-3 h-3" />
                          Valid
                        </span>
                      )}
                      {log.result === 'ALREADY_USED' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase">
                          <AlertTriangle className="w-3 h-3" />
                          Already Used
                        </span>
                      )}
                      {log.result === 'INVALID' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500/10 text-rose-400 border border-rose-500/30 uppercase">
                          <XCircle className="w-3 h-3" />
                          Invalid
                        </span>
                      )}
                      {log.result === 'CANCELLED' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-500/10 text-purple-400 border border-purple-500/30 uppercase">
                          <XCircle className="w-3 h-3" />
                          Cancelled
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4 text-slate-400">
                      {log.staffName}
                    </td>

                    <td className="px-5 py-4 text-right font-mono text-slate-400">
                      {new Date(log.scanTime).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No scan entries recorded yet.
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
