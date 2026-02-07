"use client";

import React, { useEffect, useState } from 'react';
import { statsService } from "@/services/stats.service";
import {
  Users,
  Star,
  Briefcase,
  TrendingUp,
  Loader2,
  LayoutDashboard
} from "lucide-react";

export default function TutorDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await statsService.getTutorStats();
      setStats(res?.data || null);
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="animate-spin size-6 text-zinc-300" />
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Sessions",
      value: stats?.totalSessions ?? 0,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-500/10"
    },
    {
      label: "Experience",
      value: `${stats?.experience ?? 0} Years`,
      icon: Briefcase,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-500/10"
    },
    {
      label: "Average Rating",
      value: stats?.averageRating?.toFixed(1) || "0.0",
      icon: Star,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-500/10"
    }
  ];

  return (
    <div className="  space-y-10 animate-in fade-in duration-500">
      <header className="flex items-center gap-3">
        <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
          <LayoutDashboard className="size-5 text-zinc-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Welcome back, Tutor
          </h1>
          <p className="text-zinc-500 text-sm mt-0.5">
            Here is your profile performance overview.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="group p-6 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-xl ${card.bg} ${card.color}`}>
                <card.icon className="size-5" />
              </div>
              <TrendingUp className="size-4 text-zinc-300 group-hover:text-zinc-400" />
            </div>
            <div>
              <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-wider">
                {card.label}
              </p>
              <h3 className="text-3xl font-bold mt-1 text-zinc-900 dark:text-zinc-100">
                {card.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-64 bg-zinc-50 dark:bg-zinc-900/30 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400 text-sm">
          Sessions Activity Chart
        </div>
        <div className="h-64 bg-zinc-50 dark:bg-zinc-900/30 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400 text-sm">
          Quick Actions
        </div>
      </div>
    </div>
  );
}