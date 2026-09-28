'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  Ticket,
  CreditCard,
  Trophy,
  Users,
  QrCode,
  UserCheck,
  FileSpreadsheet,
  LineChart,
  ShieldCheck,
  Settings,
  ExternalLink,
  ChevronRight,
  Shield,
  LogOut,
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/bookings', label: 'Bookings', icon: CalendarDays },
    { href: '/admin/tickets', label: 'Tickets', icon: Ticket },
    { href: '/admin/payments', label: 'Payments', icon: CreditCard },
    { href: '/admin/matches', label: 'Matches', icon: Trophy },
    { href: '/admin/teams', label: 'Teams', icon: Users },
    { href: '/admin/scanner', label: 'QR Scanner', icon: QrCode, badge: 'Gate' },
    { href: '/admin/customers', label: 'Customers', icon: UserCheck },
    { href: '/admin/reports', label: 'Reports', icon: FileSpreadsheet },
    { href: '/admin/analytics', label: 'Analytics', icon: LineChart },
    { href: '/admin/staff', label: 'Staff & Roles', icon: ShieldCheck },
    { href: '/admin/settings', label: 'Settings & Theme', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/admin' && pathname === '/admin') return true;
    if (path !== '/admin' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <aside className="w-64 border-r border-white/10 bg-[#080E17] flex flex-col shrink-0 min-h-screen">
      {/* Top Brand Banner */}
      <div className="h-18 px-5 border-b border-white/10 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#00E676] flex items-center justify-center shadow-md shadow-[#00E676]/20">
            <Shield className="w-5 h-5 text-black fill-black" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-white text-base tracking-tight">DFL ADMIN</span>
              <span className="text-[10px] bg-[#00E676]/20 text-[#00E676] font-bold px-1.5 py-0.5 rounded border border-[#00E676]/30">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
              Tournament Portal
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation List */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
          Main Management
        </div>

        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                active
                  ? 'bg-[#00E676] text-black shadow-md shadow-[#00E676]/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 ${
                    active ? 'text-black' : 'text-slate-400'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                    active
                      ? 'bg-black text-[#00E676]'
                      : 'bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Switch to Public Website */}
      <div className="p-3 border-t border-white/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-[#00E676]" />
            <span>View Public Website</span>
          </span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
        </Link>

        {/* Current Active Staff Badge */}
        <div className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0ea5e9]/20 border border-[#0ea5e9]/40 flex items-center justify-center font-bold text-xs text-[#0ea5e9]">
              AF
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">Ameen Farooq</p>
              <p className="text-[10px] text-[#00E676] font-semibold">Super Admin</p>
            </div>
          </div>
          <Link
            href="/admin/login"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
            title="Log out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
