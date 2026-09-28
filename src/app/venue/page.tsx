'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import {
  MapPin,
  Car,
  Compass,
  Clock,
  Shield,
  Coffee,
  HeartPulse,
  Lightbulb,
  ExternalLink,
  Ticket,
} from 'lucide-react';

export default function VenuePage() {
  const facilities = [
    {
      icon: Lightbulb,
      title: 'High-Power Floodlighting',
      desc: 'International-standard LED floodlight towers ensuring bright, shadow-free 7-a-side play.',
    },
    {
      icon: Car,
      title: 'Dedicated Parking',
      desc: 'Free parking grounds for 500+ two-wheelers and 200+ four-wheelers within 100 meters.',
    },
    {
      icon: Coffee,
      title: 'Refreshments & Food Court',
      desc: 'Clean Malabar snack stalls, mineral water dispensers, and tea/coffee points.',
    },
    {
      icon: HeartPulse,
      title: 'Medical & First Aid Standby',
      desc: 'Trained first-responders and ambulance on standby throughout all match hours.',
    },
  ];

  const travelRoutes = [
    {
      mode: 'From Calicut Airport (CCJ)',
      dist: '18 km (~30 mins)',
      desc: 'Take Kondotty - Kolathur - Vengara route or direct taxi via Airport Road.',
    },
    {
      mode: 'From Tirur Railway Station',
      dist: '22 km (~35 mins)',
      desc: 'Direct KSRTC and private bus services run frequently between Tirur and Vengara.',
    },
    {
      mode: 'From Malappuram KSRTC',
      dist: '14 km (~25 mins)',
      desc: 'Buses available every 10 minutes heading towards Parappanangadi/Tirur via Vengara.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#060B11] text-white">
      <Navbar />

      {/* Header */}
      <div className="relative py-14 border-b border-white/10 pitch-grid bg-[#080E17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0ea5e9]/10 text-[#0ea5e9] text-xs font-bold border border-[#0ea5e9]/30 uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5" />
            Tournament Ground
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            DFL Stadium Ground, Vengara
          </h1>
          <p className="text-base text-slate-400 max-w-xl mx-auto">
            The heart of Malappuram 7-a-side football. Check venue guidelines, facilities, directions, and parking details.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-16">
        {/* Location & Map Visual */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-[#00E676] uppercase tracking-widest block">
              Directions & Address
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Easy Access in the Center of Vengara
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Located right off the Mini Stadium Bypass road in Vengara, the DFL Stadium Ground offers convenient transit connections from Malappuram town, Kondotty, Tirur, and Calicut Airport.
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 text-xs">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Full Address</span>
              <p className="text-white font-bold text-sm">
                DFL Stadium Ground, Mini Stadium Bypass Road, Vengara, Malappuram, Kerala — 676304
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-black bg-[#00E676] hover:bg-[#00c853] transition-all shadow-md shadow-[#00E676]/20"
              >
                <Compass className="w-4 h-4" />
                <span>Navigate via Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <Link
                href="/matches"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all"
              >
                <Ticket className="w-4 h-4 text-[#00E676]" />
                <span>Book Match Pass</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl card-glass border border-white/10 p-6 bg-gradient-to-br from-[#0F1A2A] to-[#0A101A] relative overflow-hidden">
              <div className="aspect-video w-full rounded-2xl bg-[#060B12] border border-white/10 flex flex-col items-center justify-center p-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#00E676]/10 border border-[#00E676]/30 flex items-center justify-center text-[#00E676]">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white">Vengara Stadium Complex</h3>
                <p className="text-xs text-slate-400 max-w-sm">
                  Interactive satellite map & gate entrances guide. Gates A & B for General Pass spectators.
                </p>
                <span className="text-xs font-mono text-[#00E676] bg-black/40 px-3 py-1 rounded-full border border-white/10">
                  11.0514° N, 75.9862° E
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Stadium Facilities */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#0ea5e9] uppercase tracking-widest block mb-1">
              Amenities
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Spectator Facilities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {facilities.map((fac, idx) => (
              <div
                key={idx}
                className="rounded-2xl card-glass p-5 border border-white/5 space-y-3 hover:border-[#00E676]/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#00E676]/10 border border-[#00E676]/30 flex items-center justify-center text-[#00E676]">
                  <fac.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">{fac.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{fac.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Travel Routes */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
              Transit
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              How to Reach Vengara
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {travelRoutes.map((route, idx) => (
              <div
                key={idx}
                className="rounded-2xl card-glass p-6 border border-white/5 space-y-2"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[#00E676]">
                  {route.dist}
                </span>
                <h3 className="text-base font-bold text-white">{route.mode}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{route.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
