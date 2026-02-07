"use client";

import React, { useEffect, useState } from 'react';
import { statsService } from "@/services/stats.service";
import { tutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";
import {
  Users,
  Star,
  Briefcase,
  Loader2,
  LayoutDashboard,
  MessageSquare,
  Zap,
  Activity,
  ShieldCheck,
  TrendingUp
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function TutorDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [statsRes, sessionRes] = await Promise.all([
          statsService.getTutorStats(),
          userService.getSession()
        ]);

        setStats(statsRes?.data || null);

        const loggedInUserId = sessionRes?.data?.user?.id;
        if (loggedInUserId) {
          const allTutors = await tutorService.getAllTutor();
          const currentTutor = allTutors.find((t: any) => t.user?.id === loggedInUserId || t.userId === loggedInUserId);
          if (currentTutor?.reviews) {
            setReviewCount(currentTutor.reviews.length);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center bg-transparent">
        <Loader2 className="animate-spin size-5 text-zinc-500" />
      </div>
    );
  }

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonthIndex = new Date().getMonth();

  const dynamicChartData = months.map((month, index) => ({
    name: month,
    sessions: index === currentMonthIndex ? (stats?.totalSessions ?? 0) : 0
  }));

  const statCards = [
    {
      label: "Total Sessions",
      value: stats?.totalSessions ?? 0,
      icon: Users,
      color: "text-[#00baff]",
      bg: "bg-blue-500/5"
    },
    {
      label: "Reviews",
      value: reviewCount,
      icon: MessageSquare,
      color: "text-zinc-900 dark:text-zinc-100",
      bg: "bg-zinc-500/5"
    },
    {
      label: "Average Rating",
      value: stats?.averageRating?.toFixed(1) || "0.0",
      icon: Star,
      color: "text-amber-500",
      bg: "bg-amber-500/5"
    }
  ];

  return (
    <div className="space-y-8 bg-transparent animate-in fade-in duration-700 font-sans">
      {/* Top Header */}
      <header className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm">
            <LayoutDashboard className="size-5 text-zinc-600 dark:text-zinc-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-none">
              Tutor Dashboard
            </h1>
            <p className="text-sm text-zinc-500 mt-1.5 font-medium">Manage your profile performance and sessions</p>
          </div>
        </div>

      </header>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-sm bg-transparent transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-sm ${card.bg}`}>
                <card.icon className={`size-5 ${card.color}`} />
              </div>
              <TrendingUp className="size-4 text-zinc-300" />
            </div>
            <p className="text-sm font-semibold text-zinc-500">
              {card.label}
            </p>
            <h3 className="text-3xl font-bold mt-1 text-zinc-900 dark:text-zinc-100">
              {card.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Activity and Expertise Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Chart Card */}
        <div className="lg:col-span-3 p-6 border border-zinc-200 dark:border-zinc-800 rounded-sm bg-transparent">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <Activity className="size-4 text-[#00baff]" />
              <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Session Activity Timeline</h4>
            </div>
            <span className="text-xs font-semibold text-zinc-400">Real-time Data</span>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dynamicChartData}>
                <defs>
                  <linearGradient id="wave" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00baff" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#00baff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888810" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#888', fontWeight: 500 }}
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} domain={[0, 'auto']} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e4e4e7', borderRadius: '8px', fontSize: '12px', color: '#18181b', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
                <Area
                  type="monotone"
                  dataKey="sessions"
                  stroke="#00baff"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#wave)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Professional Expertise Side Card */}
        <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-sm bg-transparent flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="size-4 text-emerald-500" />
                <h4 className="text-xs font-bold text-zinc-500">Service Expertise</h4>
              </div>
              <div className="flex items-baseline gap-1">
                <p className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 leading-none">
                  {stats?.experience ?? 0}
                </p>
                <span className="text-lg font-semibold text-zinc-400">Years</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 mt-4 rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-[#00baff] rounded-full" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-sm">
                <p className="text-[11px] font-semibold text-zinc-500 mb-0.5">Profile Quality</p>
                <p className="text-base font-bold text-zinc-800 dark:text-zinc-200">High Standard</p>
              </div>
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-sm">
                <p className="text-[11px] font-semibold text-zinc-500 mb-0.5">Identity Status</p>
                <p className="text-sm font-bold text-emerald-600">Verified</p>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
              <button className="w-full flex items-center justify-center gap-2 p-3 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 rounded-sm font-bold text-sm transition-all hover:bg-[#00baff] hover:text-white dark:hover:bg-[#00baff] dark:hover:text-white">
                <Zap className="size-4 fill-current" />
                Sync Profile
              </button>
              <div className="text-center">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase">Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}