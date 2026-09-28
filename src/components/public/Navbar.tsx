'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Trophy,
  Calendar,
  Users,
  Search,
  MapPin,
  Menu,
  X,
  Ticket,
  Shield,
  ExternalLink,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/tournament', label: 'Tournament' },
    { href: '/teams', label: 'Teams' },
    { href: '/matches', label: 'Matches' },
    { href: '/track-ticket', label: 'Track Ticket' },
    { href: '/venue', label: 'Venue' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#060B11]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E676] to-[#0ea5e9] flex items-center justify-center shadow-lg shadow-[#00E676]/20 transition-transform group-hover:scale-105">
              <Shield className="w-6 h-6 text-black fill-black" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-tight text-white group-hover:text-[#00E676] transition-colors">
                  DFL<span className="text-[#00E676]">.</span>
                </span>
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#00E676] bg-[#00E676]/10 px-1.5 py-0.5 rounded border border-[#00E676]/20">
                  7s VENGARA
                </span>
              </div>
              <p className="text-[10px] tracking-wider text-slate-400 uppercase font-semibold">
                Defenders Football League
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'text-[#00E676] bg-[#00E676]/10 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin"
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 flex items-center gap-1 transition-colors"
              title="Organizer & Staff Access"
            >
              <span>Admin / Staff</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <Link
              href="/matches"
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-black bg-[#00E676] hover:bg-[#00c853] transition-all duration-200 shadow-lg shadow-[#00E676]/25 hover:shadow-[#00E676]/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Ticket className="w-4 h-4" />
              <span>Book Tickets</span>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/matches"
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-black bg-[#00E676] hover:bg-[#00c853]"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0A111C] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium ${
                isActive(link.href)
                  ? 'text-[#00E676] bg-[#00E676]/10 font-bold'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <Link
              href="/track-ticket"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/5 border border-white/10"
            >
              <Ticket className="w-4 h-4 text-[#00E676]" />
              <span>Track My Ticket / Booking</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 bg-white/5 border border-white/10"
            >
              <span>Admin & Staff Portal</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
