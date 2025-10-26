'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CTAPhrase {
  text: string
  category: string
}

const ctaPhrases: CTAPhrase[] = [
  // Gastronomie & Restaurants
  { text: 'Dein Restaurant braucht Online-Reservierungen?', category: 'gastronomie' },
  { text: 'Lieferservice ohne Kommission einrichten?', category: 'gastronomie' },
  { text: 'Digitale Speisekarte mit QR-Code erstellen?', category: 'gastronomie' },
  { text: 'Mehr Tischauslastung durch intelligente Buchungen?', category: 'gastronomie' },
  { text: 'Kundenbewertungen automatisch sammeln?', category: 'gastronomie' },

  // Handwerk & Dienstleister
  { text: 'Terminbuchungen automatisieren für dein Handwerk?', category: 'handwerk' },
  { text: 'Kunden finden dich nicht online?', category: 'handwerk' },
  { text: 'Angebote digital erstellen statt per Hand?', category: 'handwerk' },
  { text: 'Auftragsabwicklung digitalisieren?', category: 'handwerk' },
  { text: 'Kundenstamm professionell verwalten?', category: 'handwerk' },

  // Einzelhandel & E-Commerce
  { text: 'Deinen Shop auch online verkaufen?', category: 'einzelhandel' },
  { text: 'Kundenkarten digitalisieren?', category: 'einzelhandel' },
  { text: 'Inventory Management automatisieren?', category: 'einzelhandel' },
  { text: 'Local SEO für mehr Laufkundschaft?', category: 'einzelhandel' },
  { text: 'Click & Collect System einführen?', category: 'einzelhandel' },

  // Beratung & Coaching
  { text: 'Online-Kurse verkaufen?', category: 'beratung' },
  { text: 'Beratungstermine automatisch buchen lassen?', category: 'beratung' },
  { text: 'Dein Wissen in eine App packen?', category: 'beratung' },
  { text: 'Klienten-Portal für bessere Betreuung?', category: 'beratung' },
  { text: 'Webinare professionell durchführen?', category: 'beratung' },

  // Immobilien & Makler
  { text: 'Immobilien virtuell besichtigen lassen?', category: 'immobilien' },
  { text: 'Exposés automatisch generieren?', category: 'immobilien' },
  { text: 'Interessenten besser verwalten?', category: 'immobilien' },
  { text: '360°-Rundgänge für Objekte erstellen?', category: 'immobilien' },
  { text: 'Mieterprozesse digitalisieren?', category: 'immobilien' },

  // Fitness & Wellness
  { text: 'Mitglieder-App für dein Studio?', category: 'fitness' },
  { text: 'Kurse online buchen lassen?', category: 'fitness' },
  { text: 'Personal Training digital anbieten?', category: 'fitness' },
  { text: 'Mitglieder-Community aufbauen?', category: 'fitness' },
  { text: 'Ernährungspläne digital verwalten?', category: 'fitness' },
]

export default function TypewriterCTA() {
  // Start with a random phrase instead of always the first one
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(() =>
    Math.floor(Math.random() * ctaPhrases.length)
  )
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false) // Start paused
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const typewriterRef = useRef<NodeJS.Timeout | null>(null)
  const pauseRef = useRef<NodeJS.Timeout | null>(null)

  // Delay the start of the animation
  useEffect(() => {
    const startDelay = setTimeout(() => {
      setHasStarted(true)
      setIsTyping(true)
    }, 1500) // Wait 1.5 seconds before starting

    return () => clearTimeout(startDelay)
  }, [])

  useEffect(() => {
    // Don't start animation until ready
    if (!hasStarted) return

    const currentPhrase = ctaPhrases[currentPhraseIndex].text

    // Don't stop animation on hover - just pause the typing/deleting

    if (isTyping && !isDeleting && !isHovered) {
      // Typing forward
      if (displayedText.length < currentPhrase.length) {
        typewriterRef.current = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1))
        }, 60) // 60ms per character
      } else {
        // Finished typing, pause before deleting
        setIsTyping(false)
        setIsPaused(true)
        // Don't set timeout here - let the next effect cycle handle it
      }
    } else if (isDeleting && !isPaused && !isHovered) {
      // Deleting
      if (displayedText.length > 0) {
        typewriterRef.current = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 30) // Faster deletion
      } else {
        // Finished deleting, move to next phrase
        setIsDeleting(false)
        setIsTyping(true)
        setCurrentPhraseIndex((prev) => (prev + 1) % ctaPhrases.length)
      }
    } else if (isPaused && !isDeleting && !isTyping) {
      // We're in pause state - set the timeout to start deleting
      pauseRef.current = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, 3500) // Pause for 3.5 seconds
    }

    return () => {
      if (typewriterRef.current) clearTimeout(typewriterRef.current)
      // Only clear pauseRef if we're not in pause state
      if (!isPaused && pauseRef.current) clearTimeout(pauseRef.current)
    }
  }, [displayedText, isTyping, isDeleting, isPaused, currentPhraseIndex, isHovered, hasStarted])

  const handleClick = () => {
    // Pass the current context to the contact form
    const currentCategory = ctaPhrases[currentPhraseIndex].category
    const currentText = ctaPhrases[currentPhraseIndex].text

    // Store in sessionStorage for the contact form to use
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(
        'ctaContext',
        JSON.stringify({
          category: currentCategory,
          text: currentText,
          timestamp: new Date().toISOString(),
        })
      )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="mt-8 flex justify-center"
    >
      <Link href="/contact" onClick={handleClick}>
        <Button
          size="lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary hover:shadow-3xl group relative min-h-[60px] w-full max-w-[90vw] transform bg-gradient-to-r px-4 py-4 text-base font-semibold shadow-2xl transition-all duration-300 hover:scale-105 sm:max-w-none sm:px-8 sm:text-lg"
        >
          <span className="flex items-center gap-2 sm:gap-3">
            <span className="block min-w-0 text-left whitespace-normal sm:inline-block sm:min-w-[250px] sm:whitespace-nowrap">
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                className="bg-primary ml-1 inline-block h-4 w-0.5 align-middle sm:h-5"
              />
            </span>
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.div>
          </span>
        </Button>
      </Link>
    </motion.div>
  )
}
