'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { HelpCircle, ChevronDown, Ticket, Shield, ArrowRight } from 'lucide-react';

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const categories = [
    {
      title: 'Booking & Passes',
      faqs: [
        {
          q: 'Do I need to create an account to book tickets?',
          a: 'No. You can book directly with only your full name and mobile number. No password or email verification is mandated.',
        },
        {
          q: 'How many tickets can I purchase in one booking?',
          a: 'You can book up to 10 General Passes in a single transaction. Each ticket in the order gets an individual unique QR code.',
        },
        {
          q: 'What is the ticket price for matches?',
          a: 'Standard Group Stage match passes are ₹150 per person. Knockout and final match pricing is configured dynamically and displayed on the match details page.',
        },
        {
          q: 'How do I download or retrieve my passes later?',
          a: 'Visit the "Track Ticket" page, enter your Booking ID (e.g. DFL-2026-A8F92K) and your registered mobile number to view and print all your tickets anytime.',
        },
      ],
    },
    {
      title: 'Gate Entry & Scanner',
      faqs: [
        {
          q: 'How will my ticket be verified at the stadium?',
          a: 'Gate staff will scan your unique QR code using the DFL official scanner. Once verified, you will be admitted into the gallery. Each QR code can only be used once.',
        },
        {
          q: 'What if someone copies or shares my QR code?',
          a: 'The gate scanner operates on a first-scan principle: once a QR is marked as USED, any duplicate scans will be immediately flagged as "ALREADY USED" and denied entry.',
        },
        {
          q: 'What time should I arrive at the stadium?',
          a: 'Gates open 1 hour before scheduled kickoff (06:00 PM for 07:00 PM games). We advise arriving early to clear scanning smoothly and find good viewing spots.',
        },
      ],
    },
    {
      title: 'Tournament & Venue',
      faqs: [
        {
          q: 'What is the tournament format?',
          a: 'DFL 2026 is a 7-a-side floodlight tournament with 20 teams divided into 4 groups. The top 2 from each group advance into the Quarter Finals, Semi Finals, and Grand Final.',
        },
        {
          q: 'Is parking available at the venue?',
          a: 'Yes, designated parking for two-wheelers and four-wheelers is available adjacent to the DFL Stadium Ground bypass road in Vengara.',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#060B11] text-white">
      <Navbar />

      <div className="relative py-14 border-b border-white/10 pitch-grid bg-[#080E17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E676]/10 text-[#00E676] text-xs font-bold border border-[#00E676]/30 uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5" />
            Support & Help Desk
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-slate-400 max-w-xl mx-auto">
            Everything you need to know about booking tickets, QR validation, venue guidelines, and tournament rules.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-12">
        {categories.map((cat, cIdx) => (
          <div key={cIdx} className="space-y-4">
            <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00E676]" />
              {cat.title}
            </h2>

            <div className="space-y-3">
              {cat.faqs.map((faq, fIdx) => {
                const globalIdx = cIdx * 10 + fIdx;
                const isOpen = openIdx === globalIdx;
                return (
                  <div
                    key={fIdx}
                    className="rounded-2xl card-glass border border-white/5 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenIdx(isOpen ? null : globalIdx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02]"
                    >
                      <span className="font-bold text-sm text-white">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#00E676] shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 border-t border-white/5 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="p-6 rounded-3xl card-glass border border-[#00E676]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left bg-gradient-to-r from-[#0E1624] via-[#122134] to-[#0E1624]">
          <div>
            <h3 className="text-base font-bold text-white">Still have questions?</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Contact our organizing committee hotline or send us an email.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-black bg-[#00E676] hover:bg-[#00c853] shrink-0"
          >
            <span>Contact Help Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
