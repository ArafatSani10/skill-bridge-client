"use client"

import React, { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
const { data: session } = authClient.useSession();
console.log("Current User:", session?.user);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validatorAdapter: zodValidator(),
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in...")
      try {
        setIsSubmitting(true)

        const { data, error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
          callbackURL: "/dashboard", 
        })

        if (error) {
          toast.error(error.message || "Invalid email or password", { id: toastId })
          return
        }

        toast.success("Welcome back!", { id: toastId })
        router.push("/dashboard")
        router.refresh()

      } catch (err: any) {
        toast.error("Something went wrong. Please try again.", { id: toastId })
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  return (
    <Card className="max-w-md mx-auto border-zinc-200 shadow-xl dark:border-zinc-800">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">Welcome Back</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="space-y-4"
        >
          {/* Email Field */}
          <form.Field
            name="email"
            validators={{ onChange: loginSchema.shape.email }}
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
            validators={{ onChange: loginSchema.shape.password }}
            children={(field) => (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className={field.state.meta.errors.length ? "text-red-500" : ""}>Password</Label>
                  <Link href="/forgot-password" size="sm" className="text-xs text-blue-500 hover:underline">
                    Forgot password?
                  </Link>
                </div>
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

          <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
            {isSubmitting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...</>
            ) : (
              "Login"
            )}
          </Button>

          <div className="text-center text-sm text-zinc-500 mt-4">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-500 font-medium hover:underline">
              Create one
            </Link>
          </div>
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