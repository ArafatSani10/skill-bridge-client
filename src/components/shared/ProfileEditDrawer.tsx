"use client";

import React, { useState } from 'react';
import { authClient } from "@/lib/auth-client";
import { Camera, Loader2, X, CheckCircle2, Mail } from "lucide-react";
import Image from 'next/image';
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProfileEditDrawerProps {
  user: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: (updatedUser: any) => void;
}

export default function ProfileEditDrawer({ user, isOpen, onClose, onUpdateSuccess }: ProfileEditDrawerProps) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    image: user?.image || ''
  });

  if (!isOpen) return null;

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUpdating(true);
    const toastId = toast.loading("Uploading image...");

    try {
      const data = new FormData();
      data.append("image", file);
      
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: data,
      });
      const resData = await res.json();
      
      if (resData.success) {
        setFormData(prev => ({ ...prev, image: resData.data.url }));
        toast.success("Image uploaded successfully", { id: toastId });
      }
    } catch (err) {
      toast.error("Upload failed", { id: toastId });
    } finally {
      setUpdating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return toast.error("Name is required");

    setUpdating(true);
    try {
      const { data, error } = await authClient.updateUser({
        name: formData.name,
        image: formData.image,
      });

      if (error) {
        toast.error(error.message);
      } else {
        await authClient.getSession({
            fetchOptions: { cache: "no-store" }
        });

        toast.success("Profile Updated Successfully");
        onUpdateSuccess({ ...user, ...formData });
        router.refresh();
        onClose();
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={onClose} />
      
      <div className="relative w-full max-w-md h-full bg-white dark:bg-zinc-950 p-8 space-y-8 animate-in slide-in-from-right duration-500 shadow-2xl border-l border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between border-b pb-6 dark:border-zinc-800">
          <div>
            <h3 className="text-xl font-bold dark:text-white ">Edit Profile</h3>
            <p className="text-sm font-bold text-[#00baff]  mt-1">Role: {user?.role}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg">
            <X className="size-5 text-zinc-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col items-center gap-5 bg-zinc-50 dark:bg-zinc-900/40 p-8 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="relative size-28">
              <Image 
                src={formData.image || 'https://github.com/shadcn.png'} 
                alt="avatar" fill className="rounded-lg object-cover border-2 border-[#00baff]" 
              />
              <label className="absolute -bottom-2 -right-2 p-2.5 bg-[#00baff] text-white rounded-lg cursor-pointer shadow-lg hover:scale-110 transition-all">
                <Camera className="size-4" />
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} disabled={updating} />
              </label>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 ">Full Name</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-4 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-lg outline-none focus:border-[#00baff] dark:text-white font-medium text-sm transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 ">Email Address</label>
              <div className="p-4 bg-zinc-100 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-500 text-sm flex items-center gap-3 italic">
                <Mail className="size-4 opacity-50" /> {user?.email}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-10">
            <button type="button" onClick={onClose} className="flex-1 py-4 border border-zinc-200 dark:border-zinc-800 font-bold rounded-lg text-[10px] uppercase dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all">
              Cancel
            </button>
            <button type="submit" disabled={updating} className="flex-1 py-4 bg-[#00baff] text-white font-bold rounded-lg text-[10px] uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#00baff]/20 hover:opacity-90 disabled:opacity-50">
              {updating ? <Loader2 className="animate-spin size-4" /> : <CheckCircle2 className="size-4" />}
              {updating ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}