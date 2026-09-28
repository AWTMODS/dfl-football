'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Palette,
  Save,
  Shield,
  Ticket,
  Bell,
  CheckCircle2,
  Sparkles,
  QrCode,
  MapPin,
  Calendar,
} from 'lucide-react';
import { dflStore } from '@/lib/store';
import { TournamentSettings } from '@/lib/types';

export default function SettingsPage() {
  const [settings, setSettings] = useState<TournamentSettings | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const s = dflStore.getSettings();
    setSettings(s);
  }, []);

  const themes = [
    {
      id: 'electric-pitch',
      name: 'Electric Pitch (Default)',
      desc: 'Stadium neon green with dark floodlight navy — energetic football turf vibe.',
      primary: '#00E676',
      accent: '#0ea5e9',
    },
    {
      id: 'champions-gold',
      name: 'Champions Gold',
      desc: 'Trophy gold with deep carbon — prestigious championship tournament aesthetic.',
      primary: '#F59E0B',
      accent: '#10B981',
    },
    {
      id: 'volt-neon',
      name: 'Volt Neon',
      desc: 'High-visibility speed volt with cyan — futuristic athletic performance look.',
      primary: '#CCFF00',
      accent: '#00F0FF',
    },
    {
      id: 'classic-crimson',
      name: 'Classic Crimson',
      desc: 'Passionate sports crimson with ember — fiery tournament intensity.',
      primary: '#EF4444',
      accent: '#F59E0B',
    },
    {
      id: 'arctic-frost',
      name: 'Arctic Frost',
      desc: 'Cool stadium cyan with electric sky blue — ultra-clean modern sports look.',
      primary: '#38BDF8',
      accent: '#818CF8',
    },
  ];

  const handleApplyTheme = (themeId: string) => {
    if (!settings) return;
    const updated = { ...settings, activeTheme: themeId };
    setSettings(updated);
    document.documentElement.setAttribute('data-theme', themeId === 'electric-pitch' ? '' : themeId);
    dflStore.updateSettings(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    dflStore.updateSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (!settings) return null;

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#00E676]" />
            <span>Tournament & Theme Settings</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure dynamic CSS variables, ticket pricing, scanner automation, and tournament parameters.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00E676]/20 text-[#00E676] text-xs font-bold border border-[#00E676]/40">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Saved!</span>
          </div>
        )}
      </div>

      {/* SECTION 1: THEME COLOR PALETTE SWITCHER (Requirement #2) */}
      <div className="rounded-3xl card-glass p-6 sm:p-8 border border-white/10 space-y-5 bg-[#09101C]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#00E676] uppercase tracking-wider">
            <Palette className="w-4 h-4" />
            <span>Design Tokens & Theme Presets (Requirement #2)</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">CSS Variables Driven</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The color palette can be changed instantly anytime. Select any preset below to dynamically re-theme all badges, glows, borders, and buttons across both the public and admin platforms:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {themes.map((t) => {
            const isSelected = settings.activeTheme === t.id;
            return (
              <div
                key={t.id}
                onClick={() => handleApplyTheme(t.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#00E676] bg-white/[0.04] shadow-md shadow-[#00E676]/10'
                    : 'border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full shadow"
                      style={{ backgroundColor: t.primary }}
                    />
                    <span
                      className="w-4 h-4 rounded-full shadow"
                      style={{ backgroundColor: t.accent }}
                    />
                    <h4 className="font-bold text-xs text-white ml-1">{t.name}</h4>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-black text-[#00E676] uppercase">
                      ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{t.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Tournament Parameters */}
        <div className="rounded-3xl card-glass p-6 sm:p-8 border border-white/10 space-y-4 bg-[#09101C]">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#0ea5e9]" />
            <span>Tournament Parameters</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Tournament Name</label>
              <input
                type="text"
                value={settings.tournamentName}
                onChange={(e) =>
                  setSettings({ ...settings, tournamentName: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) =>
                  setSettings({ ...settings, tagline: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Venue Name</label>
              <input
                type="text"
                value={settings.venueName}
                onChange={(e) =>
                  setSettings({ ...settings, venueName: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Location District</label>
              <input
                type="text"
                value={settings.location}
                onChange={(e) =>
                  setSettings({ ...settings, location: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Start Date</label>
              <input
                type="date"
                value={settings.startDate}
                onChange={(e) =>
                  setSettings({ ...settings, startDate: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">End Date</label>
              <input
                type="date"
                value={settings.endDate}
                onChange={(e) =>
                  setSettings({ ...settings, endDate: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Booking Rules */}
        <div className="rounded-3xl card-glass p-6 sm:p-8 border border-white/10 space-y-4 bg-[#09101C]">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Ticket className="w-4 h-4 text-amber-400" />
            <span>Pricing & Booking Rules</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Default General Pass Price (₹)
              </label>
              <input
                type="number"
                value={settings.generalTicketPrice}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    generalTicketPrice: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Max Tickets Allowed Per Transaction
              </label>
              <input
                type="number"
                value={settings.maxTicketsPerBooking}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maxTicketsPerBooking: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>
          </div>
        </div>

        {/* Scanner Behavior */}
        <div className="rounded-3xl card-glass p-6 sm:p-8 border border-white/10 space-y-4 bg-[#09101C]">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <QrCode className="w-4 h-4 text-[#00E676]" />
            <span>Gate Scanner Automation</span>
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer">
              <div>
                <span className="font-bold text-white block">Auto-Mark Ticket as Used</span>
                <span className="text-slate-400 text-[11px]">
                  Immediately changes valid ticket status to USED upon scanning without requiring staff confirmation.
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.autoMarkUsedOnScan}
                onChange={(e) =>
                  setSettings({ ...settings, autoMarkUsedOnScan: e.target.checked })
                }
                className="w-4 h-4 accent-[#00E676]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer">
              <div>
                <span className="font-bold text-white block">Duplicate Scan Audio / Visual Warning</span>
                <span className="text-slate-400 text-[11px]">
                  Triggers strong amber warning screen if a spectator attempts re-entry on an already scanned QR pass.
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.alertDuplicateScans}
                onChange={(e) =>
                  setSettings({ ...settings, alertDuplicateScans: e.target.checked })
                }
                className="w-4 h-4 accent-[#00E676]"
              />
            </label>
          </div>
        </div>

        {/* Notification Channels */}
        <div className="rounded-3xl card-glass p-6 sm:p-8 border border-white/10 space-y-4 bg-[#09101C]">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-purple-400" />
            <span>Notification Integrations</span>
          </h3>

          <div className="grid grid-cols-3 gap-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer">
              <div>
                <span className="font-bold text-white block">WhatsApp</span>
                <span className="text-[10px] text-slate-400">Ready</span>
              </div>
              <input
                type="checkbox"
                checked={settings.whatsappEnabled}
                onChange={(e) =>
                  setSettings({ ...settings, whatsappEnabled: e.target.checked })
                }
                className="w-4 h-4 accent-[#00E676]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer">
              <div>
                <span className="font-bold text-white block">SMS</span>
                <span className="text-[10px] text-slate-400">Ready</span>
              </div>
              <input
                type="checkbox"
                checked={settings.smsEnabled}
                onChange={(e) =>
                  setSettings({ ...settings, smsEnabled: e.target.checked })
                }
                className="w-4 h-4 accent-[#00E676]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer">
              <div>
                <span className="font-bold text-white block">Email</span>
                <span className="text-[10px] text-slate-400">Ready</span>
              </div>
              <input
                type="checkbox"
                checked={settings.emailEnabled}
                onChange={(e) =>
                  setSettings({ ...settings, emailEnabled: e.target.checked })
                }
                className="w-4 h-4 accent-[#00E676]"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-black text-xs text-black bg-[#00E676] hover:bg-[#00c853] shadow-lg shadow-[#00E676]/25 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save All Tournament Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
