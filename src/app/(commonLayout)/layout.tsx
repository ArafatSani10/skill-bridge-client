import { Navbar1 } from '@/components/layout/navbar1'
import React from 'react'

export default function CommonLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar1></Navbar1>
            {children}
        </div>
    )
}