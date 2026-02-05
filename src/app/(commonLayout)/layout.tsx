import Footer from '@/components/layout/Footer'
import { Navbar1 } from '@/components/layout/navbar1'
import { Toaster } from '@/components/ui/sonner'
import React from 'react'

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar1 />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <Toaster richColors position="top-center" />
    </div>
  )
}