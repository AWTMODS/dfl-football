import React from 'react';
import Link from 'next/link';
import { Shield, MapPin, Calendar, Phone, Mail, Award, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#05090F] text-slate-400">
      {/* Pre-footer Callout Banner */}
      <div className="border-b border-white/5 bg-gradient-to-r from-[#0E1624] via-[#111E33] to-[#0E1624] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#00E676]/10 border border-[#00E676]/30 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-[#00E676]" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Already have tickets booked?</h3>
              <p className="text-sm text-slate-400">
                Track your booking status, view QR codes, or download passes anytime.
              </p>
            </div>
          </div>
          <Link
            href="/track-ticket"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-black bg-[#00E676] hover:bg-[#00c853] transition-all shadow-lg shadow-[#00E676]/20"
          >
            Track Your Ticket →
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: Tournament Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#00E676] flex items-center justify-center">
                <Shield className="w-5 h-5 text-black fill-black" />
              </div>
              <span className="font-black text-xl text-white tracking-tight">
                DFL FOOTBALL
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Defenders Football League — The premier 7-a-side floodlight football tournament in Vengara, Malappuram, Kerala. Bringing together 20 top teams for 15 days of high-octane football action starting October 20, 2026.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-[#00E676]" /> Vengara, Malappuram
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                <Calendar className="w-3.5 h-3.5 text-[#00E676]" /> Starts Oct 20, 2026
              </span>
            </div>
          </div>

          {/* Col 2: Tournament Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Tournament</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tournament" className="hover:text-[#00E676] transition-colors">
                  Tournament Overview
                </Link>
              </li>
              <li>
                <Link href="/teams" className="hover:text-[#00E676] transition-colors">
                  All 20 Teams
                </Link>
              </li>
              <li>
                <Link href="/matches" className="hover:text-[#00E676] transition-colors">
                  Match Schedule
                </Link>
              </li>
              <li>
                <Link href="/venue" className="hover:text-[#00E676] transition-colors">
                  Venue & Directions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Spectator & Tickets */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Ticketing</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/matches" className="hover:text-[#00E676] transition-colors">
                  Book Match Tickets
                </Link>
              </li>
              <li>
                <Link href="/track-ticket" className="hover:text-[#00E676] transition-colors">
                  Track Ticket by Mobile
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#00E676] transition-colors">
                  Ticketing FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#00E676] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#00E676] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Venue */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Organizers</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                <span>DFL Stadium Ground, Vengara Bypass, Malappuram, Kerala 676304</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>+91 98470 12345 / 54321</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>support@dflfootball.com</span>
              </div>
              <div className="pt-2">
                <Link
                  href="/admin"
                  className="inline-block text-xs font-semibold text-slate-400 hover:text-white underline underline-offset-4"
                >
                  Admin & Scanner Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Defenders Football League (DFL). All rights reserved. 7-A-Side Tournament Vengara.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Booking
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-[#00E676] font-semibold">Vengara, Malappuram</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
