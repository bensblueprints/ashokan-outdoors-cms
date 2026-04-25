'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavbarProps {
  settings?: Record<string, string>
}

const navLinks = [
  { label: 'Welcome', href: '#hero' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Rates', href: '#rates' },
  { label: 'Catskill Fly Fishing', href: '#catskill' },
  { label: 'Before You Fish', href: '#prepare' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ settings = {} }: NavbarProps) {
  const phone = settings.phone || '(917) 232-9951'
  const siteName = settings.site_name || 'Ashokan Outdoors'
  const [isOpen, setIsOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY

    setScrolled(currentScrollY > 20)

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setHidden(true)
    } else {
      setHidden(false)
    }

    setLastScrollY(currentScrollY)
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false)
    const target = document.querySelector(href)
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth' })
    } else {
      // On a subpage — navigate to homepage with hash
      e.preventDefault()
      window.location.href = '/' + href
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
          scrolled
            ? 'bg-forest-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        )}
      >
        <nav aria-label="Main navigation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 shrink-0"
            >
              <Image
                src="/images/logo.png"
                alt="Ashokan Outdoors"
                width={96}
                height={96}
                className="rounded-full w-14 h-14 md:w-20 md:h-20 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                priority
              />
              <span className="hidden sm:block font-brand text-base md:text-xl font-bold uppercase tracking-[0.18em] text-stone-100">
                {siteName}
              </span>
            </motion.a>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
                  className={cn(
                    'px-3 py-2 text-sm font-body font-medium text-stone-300',
                    'hover:text-forest-400 transition-colors duration-200',
                    'relative group'
                  )}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-forest-500 to-creek-400 group-hover:w-4/5 transition-all duration-300 rounded-full" />
                </motion.a>
              ))}
            </div>

            {/* Desktop CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="hidden lg:flex items-center gap-3"
            >
              <a
                href={`tel:+1${phone.replace(/\D/g, '')}`}
                className="flex items-center gap-1.5 text-sm font-body text-stone-400 hover:text-creek-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">{phone}</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="btn-gold !px-5 !py-2.5 !text-sm !rounded-md inline-flex items-center gap-2"
              >
                <span className="relative z-10">Book Now</span>
              </a>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-50 p-2 text-stone-200 hover:text-forest-400 transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-forest-950/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.06 }}
                  className="text-2xl font-display text-stone-200 hover:text-forest-400 transition-colors py-3 px-6"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="mt-6 flex flex-col items-center gap-4"
              >
                <a
                  href={`tel:+1${phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-2 text-stone-400 hover:text-creek-400 transition-colors font-body"
                >
                  <Phone className="w-4 h-4" />
                  {phone}
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="btn-gold !px-8 !py-3 inline-flex items-center gap-2"
                >
                  <span className="relative z-10">Book Now</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
