'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Plus,
  Shield,
  User,
  Mail,
  Phone,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { dflStore } from '@/lib/store';
import { StaffMember, StaffRole } from '@/lib/types';

export default function StaffManagementPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>([]);

  useEffect(() => {
    setStaffList(dflStore.getStaff());
  }, []);

  const getRoleBadge = (role: StaffRole) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/40 uppercase tracking-wider">
            Super Admin
          </span>
        );
      case 'ADMIN_MANAGER':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#0ea5e9]/20 text-[#0ea5e9] border border-[#0ea5e9]/40 uppercase tracking-wider">
            Manager
          </span>
        );
      case 'TICKET_STAFF':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-400 border border-amber-500/40 uppercase tracking-wider">
            Ticket Desk
          </span>
        );
      case 'SCANNER_STAFF':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-500/20 text-purple-400 border border-purple-500/40 uppercase tracking-wider">
            Gate Scanner
          </span>
        );
    }
  };

  const rolePermissions = [
    {
      role: 'SUPER_ADMIN',
      title: 'Super Administrator',
      perms: 'Complete tournament control, match creation, pricing adjustments, role assignment, and financial reports.',
    },
    {
      role: 'ADMIN_MANAGER',
      title: 'Operations Manager',
      perms: 'Manage match schedules, live score updates, booking overrides, customer directories, and refunds.',
    },
    {
      role: 'TICKET_STAFF',
      title: 'Box Office & Ticketing Staff',
      perms: 'Inspect spectator reservations, look up ticket IDs, re-send booking confirmations, and handle seating issues.',
    },
    {
      role: 'SCANNER_STAFF',
      title: 'Gate Turnstile Security',
      perms: 'Single-purpose access to the Gate Scanner terminal. Validate QR codes and prevent duplicate entry.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#00E676]" />
            <span>Staff & Role-Based Access Control</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage operational permissions for gate scanners, managers, ticket officers, and organizers.
          </p>
        </div>

        <button
          onClick={() => alert('New staff invitation link generated for committee member.')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-black bg-[#00E676] hover:bg-[#00c853]"
        >
          <Plus className="w-4 h-4" />
          <span>Invite Staff Member</span>
        </button>
      </div>

      {/* Staff Table */}
      <div className="rounded-2xl card-glass border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.03] border-b border-white/10 text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3.5 font-bold">Staff Member</th>
                <th className="px-5 py-3.5 font-bold">Email</th>
                <th className="px-5 py-3.5 font-bold">Mobile Phone</th>
                <th className="px-5 py-3.5 font-bold">Role Assignment</th>
                <th className="px-5 py-3.5 font-bold">Status</th>
                <th className="px-5 py-3.5 font-bold text-right">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {staffList.map((s) => (
                <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-xs">
                        {s.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-bold text-white">{s.name}</span>
                    </div>
                  </td>

                  <td className="px-5 py-4 font-mono text-slate-300">
                    {s.email}
                  </td>

                  <td className="px-5 py-4 text-slate-300">
                    {s.phone}
                  </td>

                  <td className="px-5 py-4">
                    {getRoleBadge(s.role)}
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {s.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right text-slate-400 text-[11px]">
                    {s.lastActive}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Definitions Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#00E676]" />
          <span>Role Permissions Architecture</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rolePermissions.map((rp, idx) => (
            <div
              key={idx}
              className="rounded-2xl card-glass p-5 border border-white/5 space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-white">{rp.title}</h4>
                {getRoleBadge(rp.role as StaffRole)}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{rp.perms}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
