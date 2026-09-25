import { cn } from '@/lib/utils'
import React from 'react'
import CTA from './sections/shared/cta'
import Footer from './sections/shared/footer'
import Navbar from './sections/shared/navbar'

interface LayoutProps {
    children: React.ReactNode
    className?: string
    props?: React.HTMLAttributes<HTMLDivElement>
}

const Layout = ({ children, className, ...props }: LayoutProps) => {
    return (
        <main className={cn("min-h-screen", className)} {...props}>
            <Navbar />
            {children}
            <CTA />
            <Footer />
        </main>
    )
}

export default Layout