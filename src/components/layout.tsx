import { cn } from '@/lib/utils'
import React, { lazy, Suspense } from 'react'
import Dock from './dock'
import Footer from './sections/shared/footer'
import Navbar from './sections/shared/navbar'

// Fica no fim de toda página (#contato). Carrega sob demanda: as bibliotecas
// de formulário só baixam quando a pessoa chega perto do fim.
const ContactForm = lazy(() => import('./sections/home/contact-form'))

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
            <Suspense fallback={null}>
                <ContactForm />
            </Suspense>
            <Footer />
            <Dock />
        </main>
    )
}

export default Layout
