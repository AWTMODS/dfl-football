'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Lock, Mail, ArrowRight, UserCheck, QrCode } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@dflfootball.com');
  const [password, setPassword] = useState('dfl2026');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin');
  };

  const handleRoleQuickLogin = (roleEmail: string) => {
    setEmail(roleEmail);
    router.push('/admin');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#060B11] text-white pitch-grid">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-[#00E676] flex items-center justify-center shadow-xl shadow-[#00E676]/20">
              <Shield className="w-7 h-7 text-black fill-black" />
            </div>
          </Link>
          <h1 className="text-2xl font-black text-white tracking-tight">DFL Admin Portal</h1>
          <p className="text-xs text-slate-400">
            Defenders Football League 2026 — Tournament Operations
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl card-glass border border-white/10 p-6 sm:p-8 bg-[#09101C] shadow-2xl space-y-5">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                Staff Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#00E676]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#00E676]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black text-xs text-black bg-[#00E676] hover:bg-[#00c853] transition-all shadow-lg shadow-[#00E676]/20"
            >
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Switcher */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block text-center">
              Quick Role Switch (Demo Mode)
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleRoleQuickLogin('admin@dflfootball.com')}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left text-slate-300 hover:text-white"
              >
                <div className="font-bold text-white text-[11px]">Super Admin</div>
                <div className="text-[10px] text-slate-400">Full Access</div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleQuickLogin('manager@dflfootball.com')}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left text-slate-300 hover:text-white"
              >
                <div className="font-bold text-white text-[11px]">Manager</div>
                <div className="text-[10px] text-slate-400">Matches & Tickets</div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleQuickLogin('scanner1@dflfootball.com')}
                className="col-span-2 p-2 rounded-xl bg-[#00E676]/10 hover:bg-[#00E676]/15 border border-[#00E676]/30 text-left text-[#00E676] flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-[11px] text-white">Staff 01 (Gate Scanner)</div>
                  <div className="text-[10px] text-[#00E676]">Direct to QR Scanner</div>
                </div>
                <QrCode className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-xs text-slate-400 hover:text-white">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
