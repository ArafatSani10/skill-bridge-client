import { Navbar1 } from '@/components/layout/navbar1'
import React from 'react'

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar1 />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}