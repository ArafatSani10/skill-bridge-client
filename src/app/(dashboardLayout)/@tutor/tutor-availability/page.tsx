"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { tutorService } from "@/services/tutor.service";
import { toast } from "sonner";
import { 
  Loader2, Save, Settings2, CheckCircle2, Circle, Clock, Copy
} from "lucide-react";

const DAYS = ["SATURDAY", "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

interface AvailabilitySlot {
  day: string;
  startTime: string;
  endTime: string;
  enabled: boolean;
}

export default function Availability() {
  const [fetching, setFetching] = useState(true);

  const form = useForm({
    defaultValues: {
      availability: DAYS.map(day => ({
        day,
        startTime: "09:00",
        endTime: "17:00",
        enabled: false
      })) as AvailabilitySlot[]
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Saving schedule...");
      try {
        const payload = {
          slots: value.availability
            .filter(item => item.enabled)
            .map(item => {
              const start = new Date();
              const [sH, sM] = item.startTime.split(':');
              start.setHours(parseInt(sH), parseInt(sM), 0, 0);

              const end = new Date();
              const [eH, eM] = item.endTime.split(':');
              end.setHours(parseInt(eH), parseInt(eM), 0, 0);

              return {
                startTime: start.toISOString(),
                endTime: end.toISOString(),
                day: item.day
              };
            })
        };
        
        const res = await tutorService.updateAvailability(payload);
        if (res.success || res.id || res.count) {
          toast.success("Schedule Saved Successfully", { id: toastId });
        } else {
          toast.error(res.message || "Update failed", { id: toastId });
        }
      } catch (error) {
        toast.error("Network error occurred", { id: toastId });
      }
    },
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await tutorService.getAvailability();
        const slotsFromBackend = res?.slots || res;

        if (Array.isArray(slotsFromBackend) && slotsFromBackend.length > 0) {
          const updatedAvailability = DAYS.map(dayName => {
            const found = slotsFromBackend.find((s: any) => s.day === dayName);
            if (found) {
              const sTime = new Date(found.startTime);
              const eTime = new Date(found.endTime);
              return {
                day: dayName,
                startTime: `${sTime.getHours().toString().padStart(2, '0')}:${sTime.getMinutes().toString().padStart(2, '0')}`,
                endTime: `${eTime.getHours().toString().padStart(2, '0')}:${eTime.getMinutes().toString().padStart(2, '0')}`,
                enabled: true
              };
            }
            return { day: dayName, startTime: "09:00", endTime: "17:00", enabled: false };
          });
          form.setFieldValue('availability', updatedAvailability);
        }
      } catch (err) {
        console.error("Load Error:", err);
      } finally {
        setFetching(false);
      }
    };
    loadData();
  }, []);

  const copyToAll = (index: number) => {
    const source = form.getFieldValue(`availability.${index}`) as AvailabilitySlot;
    if (!source) return;
    DAYS.forEach((_, i) => {
      if (i !== index) {
        form.setFieldValue(`availability.${i}.startTime`, source.startTime);
        form.setFieldValue(`availability.${i}.endTime`, source.endTime);
        form.setFieldValue(`availability.${i}.enabled`, source.enabled);
      }
    });
    toast.info("Settings synced to all days");
  };

  if (fetching) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="animate-spin size-6 text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="flex items-center justify-between mb-10">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Settings2 className="size-5 text-zinc-400" />
            Availability Manager
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Manage your active tutoring slots.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm">
        <form onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(); }}>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {DAYS.map((day, index) => (
              <div key={day} className="p-5 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-zinc-50/40 dark:hover:bg-zinc-900/10 transition-colors">
                <div className="flex items-center gap-5 min-w-[180px]">
                  <form.Field
                    name={`availability.${index}.enabled`}
                    children={(field) => (
                      <button
                        type="button"
                        onClick={() => field.handleChange(!field.state.value)}
                        className={`${field.state.value ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-300 dark:text-zinc-800'}`}
                      >
                        {field.state.value ? <CheckCircle2 className="size-5" /> : <Circle className="size-5" />}
                      </button>
                    )}
                  />
                  <span className={`text-sm font-medium ${form.getFieldValue(`availability.${index}.enabled`) ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400'}`}>
                    {day}
                  </span>
                </div>

                <div className="flex items-center gap-4 flex-1 max-w-md">
                   <form.Field
                    name={`availability.${index}.startTime`}
                    children={(field) => (
                      <div className="relative flex-1">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-zinc-400" />
                        <input
                          type="time"
                          disabled={!form.getFieldValue(`availability.${index}.enabled`)}
                          value={field.state.value as string}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-sm border-zinc-200 dark:border-zinc-800 border rounded-lg bg-zinc-50/20 dark:bg-zinc-900/40 dark:text-zinc-200 outline-none focus:ring-1 focus:ring-zinc-400 disabled:opacity-30"
                        />
                      </div>
                    )}
                  />
                  <div className="h-[1px] w-3 bg-zinc-200 dark:bg-zinc-800" />
                  <form.Field
                    name={`availability.${index}.endTime`}
                    children={(field) => (
                      <div className="relative flex-1">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-zinc-400" />
                        <input
                          type="time"
                          disabled={!form.getFieldValue(`availability.${index}.enabled`)}
                          value={field.state.value as string}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-sm border-zinc-200 dark:border-zinc-800 border rounded-lg bg-zinc-50/20 dark:bg-zinc-900/40 dark:text-zinc-200 outline-none focus:ring-1 focus:ring-zinc-400 disabled:opacity-30"
                        />
                      </div>
                    )}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => copyToAll(index)}
                  disabled={!form.getFieldValue(`availability.${index}.enabled`)}
                  className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 text-[10px] font-bold uppercase tracking-widest disabled:opacity-0 flex items-center gap-1 transition-all"
                >
                  <Copy className="size-3" /> Sync
                </button>
              </div>
            ))}
          </div>

          <div className="px-8 py-5 bg-zinc-50/50 dark:bg-zinc-900/20 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="px-8 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold rounded-lg flex items-center gap-2 active:scale-95 disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? <Loader2 className="animate-spin size-3.5" /> : <Save className="size-3.5" />}
                  Save Changes
                </button>
              )}
            />
          </div>
        </form>
      </div>
    </div>
  );
}