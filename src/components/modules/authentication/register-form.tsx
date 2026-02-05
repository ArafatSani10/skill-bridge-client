"use client"

import React, { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter"
import * as z from "zod"
import { env } from "@/env"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, UploadCloud, AlertCircle } from "lucide-react"
import Image from "next/image"
import { FieldDescription } from "@/components/ui/field"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"

const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  profileImage: z
    .any()
    .refine((file) => file instanceof File, "Profile image is required"),
})

export function SignupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const uploadToImgBB = async (file: File) => {
    const formData = new FormData()
    formData.append("image", file)
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      { method: "POST", body: formData }
    )
    if (!response.ok) throw new Error("Image upload failed")
    const data = await response.json()
    return data.data.url
  }

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      profileImage: null as File | null,
    },
    validatorAdapter: zodValidator(),
    validators: {
      onSubmit: signupSchema, 
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating your account...");
      
      try {
        setIsSubmitting(true);
        let imageUrl = "";

        if (value.profileImage) {
          imageUrl = await uploadToImgBB(value.profileImage);
        }

        const { data, error } = await authClient.signUp.email({
          name: value.name,
          email: value.email,
          password: value.password,
          image: imageUrl, 
          callbackURL: "/dashboard", 
        });

        if (error) {
          toast.error(error.message || "Signup failed", { id: toastId });
          return;
        }

        toast.success("User created successfully!", { id: toastId });
        
        form.reset();
        setPreviewUrl(null);

      } catch (err: any) {
        console.error(err);
        toast.error("Something went wrong. Please try again.", { id: toastId });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Card className="max-w-md mx-auto border-zinc-200 shadow-xl dark:border-zinc-800">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create Account</CardTitle>
        <CardDescription>Join us today! Please fill in the details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="space-y-5"
        >
          {/* Name Field */}
          <form.Field
            name="name"
            validators={{ onChange: signupSchema.shape.name }}
            children={(field) => (
              <div className="space-y-1.5">
                <Label className={field.state.meta.errors.length ? "text-red-500" : ""}>Full Name</Label>
                <Input
                  placeholder="John Doe"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={field.state.meta.errors.length ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                <FieldError errors={field.state.meta.errors} />
              </div>
            )}
          />

          {/* Email Field */}
          <form.Field
            name="email"
            validators={{ onChange: signupSchema.shape.email }}
            children={(field) => (
              <div className="space-y-1.5">
                <Label className={field.state.meta.errors.length ? "text-red-500" : ""}>Email</Label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={field.state.meta.errors.length ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                <FieldError errors={field.state.meta.errors} />
              </div>
            )}
          />

          {/* Password Field */}
          <form.Field
            name="password"
            validators={{ onChange: signupSchema.shape.password }}
            children={(field) => (
              <div className="space-y-1.5">
                <Label className={field.state.meta.errors.length ? "text-red-500" : ""}>Password</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={field.state.meta.errors.length ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                <FieldError errors={field.state.meta.errors} />
              </div>
            )}
          />

          {/* Image Field */}
          <form.Field
            name="profileImage"
            validators={{ onChange: signupSchema.shape.profileImage }}
            children={(field) => (
              <div className="space-y-2">
                <Label className={field.state.meta.errors.length ? "text-red-500" : ""}>Profile Picture</Label>
                <div className={`flex items-center gap-4 p-4 border rounded-lg transition-colors ${field.state.meta.errors.length ? "border-red-500 bg-red-50/10" : "border-dashed border-zinc-200 bg-transparent"}`}>
                  <div className="relative size-14 shrink-0 bg-transparent rounded-full overflow-hidden border">
                    {previewUrl ? (
                      <Image src={previewUrl} alt="Avatar" fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-zinc-400">
                        <UploadCloud size={20} />
                      </div>
                    )}
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    className="cursor-pointer h-9 text-[12px]"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null
                      field.handleChange(file)
                      if (file) setPreviewUrl(URL.createObjectURL(file))
                    }}
                  />
                </div>
                <FieldError errors={field.state.meta.errors} />
              </div>
            )}
          />




          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...</>
            ) : (
              "Sign Up"
            )}
          </Button>

          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href="/login">Sign in</Link>
          </FieldDescription>
        </form>
      </CardContent>
    </Card>
  )
}

function FieldError({ errors }: { errors: any[] }) {
  if (!errors.length) return null

  return (
    <div className="flex items-center gap-1.5 text-red-500 mt-1 animate-in fade-in slide-in-from-top-1">
      <AlertCircle size={12} />
      <p className="text-[12px] font-medium">
        {errors.map((err: any) => (typeof err === 'object' ? err.message : err)).join(", ")}
      </p>
    </div>
  )
}