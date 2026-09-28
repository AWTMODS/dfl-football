'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  Search,
  QrCode,
  ExternalLink,
  Shield,
  Menu,
  X,
} from 'lucide-react';

interface AdminNavbarProps {
  title?: string;
  subtitle?: string;
  onOpenMobileMenu?: () => void;
}

export default function AdminNavbar({
  title = 'Tournament Overview',
  subtitle = 'Defenders Football League 2026',
  onOpenMobileMenu,
}: AdminNavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-18 border-b border-white/10 bg-[#080E17]/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div>
          <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-xs text-slate-400 hidden sm:block">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick QR Scanner Shortcut */}
        <Link
          href="/admin/scanner"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold text-black bg-[#00E676] hover:bg-[#00c853] transition-all shadow-md shadow-[#00E676]/20"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Gate Scanner</span>
        </Link>

        {/* View Public Website */}
        <Link
          href="/"
          target="_blank"
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
          title="Open Public Site"
        >
          <ExternalLink className="w-4 h-4" />
        </Link>

        {/* Live Status indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-[#00E676] animate-ping" />
          <span className="font-semibold text-white">Live System</span>
        </div>
      </div>
    </header>
  );
}
