"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { tutorService } from "@/services/tutor.service";
import { toast } from "sonner";
import {
  Loader2,
  Save,
  Briefcase,
  BadgeDollarSign,
  LayoutGrid,
  TextQuote,
  Sparkles,
  Settings2
} from "lucide-react";

export default function UpdateTutorProfile() {
  const [fetching, setFetching] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);

  const form = useForm({
    defaultValues: {
      bio: "",
      pricePerHour: "",
      experience: "",
      categoryId: ""
    },
    onSubmit: async ({ value }) => {
      // টোস্ট যাতে নিশ্চিতভাবে দেখা যায় সেজন্য একটি আইডি জেনারেট করা
      const toastId = toast.loading("Syncing with server...");
      try {
        const payload = {
          ...value,
          pricePerHour: Number(value.pricePerHour),
          experience: Number(value.experience)
        };
        const res = await tutorService.updateTutorProfile(payload);

        if (res.success || res.id) {
          toast.success("Profile Updated", {
            id: toastId,
            description: "Your information has been saved successfully.",
          });
        } else {
          toast.error(res.message || "Update failed", { id: toastId });
        }
      } catch (error) {
        toast.error("Network Error", { id: toastId });
      }
    },
  });

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const catRes = await fetch(`${apiUrl}/api/categories`);
        const catJson = await catRes.json();
        if (catJson) setCategories(Array.isArray(catJson) ? catJson : (catJson.data || []));

        const profileData = await tutorService.getTutorProfile();
        if (profileData) {
          form.setFieldValue('bio', profileData.bio || "");
          form.setFieldValue('pricePerHour', profileData.pricePerHour?.toString() || "");
          form.setFieldValue('experience', profileData.experience?.toString() || "");
          form.setFieldValue('categoryId', profileData.categoryId || profileData.categories?.[0]?.id || "");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };
    loadInitialData();
  }, []);

  if (fetching) {
    return (
      <div className="flex h-[80vh] items-center justify-center bg-transparent">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="animate-spin size-6 text-zinc-400" />
          <span className="text-[10px] uppercase text-zinc-500 font-medium">Loading Data</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-10">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Settings2 className="size-5 text-zinc-400" />
             Create Tutor Profile 
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Manage your professional details and student-facing information.
          </p>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="p-8 space-y-10">
            {/* Bio Field */}
            <form.Field
              name="bio"
              children={(field) => (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                      <TextQuote className="size-4 text-zinc-400" /> Professional Bio
                    </label>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Write a brief description of your teaching background and expertise.
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <textarea
                      required
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full min-h-[160px] p-4 text-sm border-zinc-200 dark:border-zinc-800 border rounded-lg focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 outline-none bg-zinc-50/20 dark:bg-zinc-900/40 dark:text-zinc-200 transition-all resize-none shadow-sm placeholder:text-zinc-400"
                      placeholder="Share your teaching philosophy..."
                    />
                  </div>
                </div>
              )}
            />

            <hr className="border-zinc-100 dark:border-zinc-800" />

            {/* Price & Experience Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                  <Sparkles className="size-4 text-zinc-400" /> Teaching Stats
                </label>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Set your market rates and years of industry experience.
                </p>
              </div>

              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.Field
                  name="pricePerHour"
                  children={(field) => (
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                        <BadgeDollarSign className="size-4" />
                      </div>
                      <input
                        required
                        type="number"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-sm border-zinc-200 dark:border-zinc-800 border rounded-lg focus:ring-1 focus:ring-zinc-400 outline-none bg-zinc-50/20 dark:bg-zinc-900/40 dark:text-zinc-200 transition-all"
                        placeholder="Rate per hour"
                      />
                    </div>
                  )}
                />

                <form.Field
                  name="experience"
                  children={(field) => (
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                        <Briefcase className="size-4" />
                      </div>
                      <input
                        required
                        type="number"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-sm border-zinc-200 dark:border-zinc-800 border rounded-lg focus:ring-1 focus:ring-zinc-400 outline-none bg-zinc-50/20 dark:bg-zinc-900/40 dark:text-zinc-200 transition-all"
                        placeholder="Years"
                      />
                    </div>
                  )}
                />
              </div>
            </div>

            <hr className="border-zinc-100 dark:border-zinc-800" />

            {/* Category Field */}
            <form.Field
              name="categoryId"
              children={(field) => (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                      <LayoutGrid className="size-4 text-zinc-400" /> Specialization
                    </label>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Select the primary subject area you specialize in.
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <select
                      required
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border-zinc-200 dark:border-zinc-800 border rounded-lg focus:ring-1 focus:ring-zinc-400 outline-none bg-zinc-50/20 dark:bg-zinc-900/40 dark:text-zinc-200 transition-all cursor-pointer shadow-sm"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat: any) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            />
          </div>

          {/* Form Action Bar */}
          <div className="px-8 py-5 bg-zinc-50/50 dark:bg-zinc-900/20 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="px-5 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2 shadow-sm"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin size-3.5" />
                  ) : (
                    <Save className="size-3.5" />
                  )}
                  {isSubmitting ? "Syncing Changes..." : "Save Profile"}
                </button>
              )}
            />
          </div>
        </form>
      </div>
    </div>
  );
}