import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
  badge?: string;
}

export default function StatCard({
  title,
  value,
  change,
  changeType = 'positive',
  icon: Icon,
  iconColor = '#00E676',
  badge,
}: StatCardProps) {
  return (
    <div className="rounded-2xl card-glass p-5 border border-white/5 relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            {title}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {value}
          </div>
        </div>

        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-white/10"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon className="w-6 h-6" style={{ color: iconColor }} />
        </div>
      </div>

      {(change || badge) && (
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
          {change && (
            <div className="flex items-center gap-1 font-semibold">
              {changeType === 'positive' && (
                <>
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{change}</span>
                </>
              )}
              {changeType === 'negative' && (
                <>
                  <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-rose-400">{change}</span>
                </>
              )}
              {changeType === 'neutral' && (
                <span className="text-slate-400">{change}</span>
              )}
              <span className="text-slate-400 font-normal">vs last period</span>
            </div>
          )}

          {badge && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
              {badge}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
