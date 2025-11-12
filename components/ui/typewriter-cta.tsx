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
  // === KATEGORIE 1: SERVICE-KEYWORDS (24 Phrasen - 40%) ===

  // Webdesign & Webentwicklung
  { text: 'Website erstellen lassen ab 2.500€?', category: 'web' },
  { text: 'Professionelles Webdesign im Main-Tauber-Kreis?', category: 'web' },
  { text: 'Moderne Website in 2-4 Wochen statt 6 Monaten?', category: 'web' },
  { text: 'Next.js Website entwickeln lassen?', category: 'web' },
  { text: 'React Webanwendung für dein Business?', category: 'web' },
  { text: 'Responsive Webdesign das begeistert?', category: 'web' },
  { text: 'SEO-optimierte Website erstellen?', category: 'web' },
  { text: 'Corporate Website zu transparenten Festpreisen?', category: 'web' },

  // Mobile Apps
  { text: 'Mobile App entwickeln lassen ab 5.000€?', category: 'mobile' },
  { text: 'Flutter App für iOS & Android?', category: 'mobile' },
  { text: 'Native App Entwicklung in deiner Region?', category: 'mobile' },
  { text: 'Progressive Web App statt teurer Native App?', category: 'mobile' },

  // UI/UX & Design
  { text: 'UI/UX Design das konvertiert?', category: 'design' },
  { text: 'Corporate Design für dein Unternehmen?', category: 'design' },
  { text: 'Barrierefreies Webdesign nach WCAG?', category: 'design' },
  { text: 'Figma Design zu fertigem Code?', category: 'design' },

  // Backend & Tech
  { text: 'Backend API entwickeln lassen?', category: 'backend' },
  { text: 'Supabase Datenbank Integration?', category: 'backend' },
  { text: 'Full-Stack Entwicklung aus einer Hand?', category: 'backend' },
  { text: 'Cloud-basierte Webanwendung?', category: 'backend' },

  // Regional
  { text: 'Digitalagentur in Lauda-Königshofen gesucht?', category: 'regional' },
  { text: 'Webagentur Main-Tauber-Kreis für dein Projekt?', category: 'regional' },
  { text: 'Lokale Digitalagentur mit persönlicher Betreuung?', category: 'regional' },
  { text: 'Webentwickler in deiner Region finden?', category: 'regional' },

  // === KATEGORIE 2: USP & VORTEILE (18 Phrasen - 30%) ===

  // KI & Geschwindigkeit
  { text: 'KI-gestützte Webentwicklung 4x schneller?', category: 'usp' },
  { text: '2-4 Wochen statt 3-6 Monate Projektzeit?', category: 'usp' },
  { text: 'Künstliche Intelligenz für schnellere Results?', category: 'usp' },
  { text: 'Agile Entwicklung mit wöchentlichen Updates?', category: 'usp' },

  // Preis & Transparenz
  { text: 'Festpreise ab 2.500€ statt versteckter Kosten?', category: 'usp' },
  { text: 'Transparente Projektkosten ohne Überraschungen?', category: 'usp' },
  { text: 'All-Inclusive Webdesign zum Fixpreis?', category: 'usp' },
  { text: 'Mehr Website für weniger Budget?', category: 'usp' },

  // Qualität & Performance
  { text: '90+ Lighthouse Score garantiert?', category: 'usp' },
  { text: 'Core Web Vitals Optimierung inklusive?', category: 'usp' },
  { text: 'Moderne Tech-Stack statt veraltetes WordPress?', category: 'usp' },
  { text: 'Performance die deine Konkurrenz überholt?', category: 'usp' },

  // Full Service
  { text: 'Design + Entwicklung + Hosting aus einer Hand?', category: 'usp' },
  { text: 'Von der Idee bis zum Launch begleitet werden?', category: 'usp' },
  { text: 'Kreativagentur für Web, Apps & Design?', category: 'usp' },
  { text: 'Full-Service Digitalagentur gesucht?', category: 'usp' },

  // Support & Wartung
  { text: 'Langfristige Betreuung nach dem Launch?', category: 'usp' },
  { text: 'Wartung & Support von lokaler Agentur?', category: 'usp' },

  // === KATEGORIE 3: PROBLEM & BRANCHEN (18 Phrasen - 30%) ===

  // Generische Probleme
  { text: 'Deine Website ist veraltet und langsam?', category: 'problem' },
  { text: 'Kunden finden dich nicht online?', category: 'problem' },
  { text: 'Online-Präsenz die verkauft aufbauen?', category: 'problem' },
  { text: 'Mehr Leads durch bessere Website?', category: 'problem' },
  { text: 'Digitale Prozesse endlich automatisieren?', category: 'problem' },
  { text: 'Konkurrenz ist digital weiter als du?', category: 'problem' },

  // Gastronomie
  { text: 'Restaurant Website mit Online-Reservierung?', category: 'gastronomie' },
  { text: 'Digitale Speisekarte für dein Lokal?', category: 'gastronomie' },

  // Handwerk
  { text: 'Handwerker Website die Aufträge bringt?', category: 'handwerk' },
  { text: 'Online Terminbuchung für Handwerksbetriebe?', category: 'handwerk' },

  // E-Commerce
  { text: 'Online-Shop der wirklich verkauft?', category: 'ecommerce' },
  { text: 'E-Commerce Lösung ohne Provisionen?', category: 'ecommerce' },

  // Beratung
  { text: 'Website für Berater & Coaches?', category: 'beratung' },
  { text: 'Online-Kurse professionell verkaufen?', category: 'beratung' },

  // Immobilien
  { text: 'Immobilien-Website mit virtuellen Rundgängen?', category: 'immobilien' },
  { text: 'Makler-Portal für bessere Leadgenerierung?', category: 'immobilien' },

  // Fitness
  { text: 'Fitness-Studio Website mit Mitglieder-Bereich?', category: 'fitness' },
  { text: 'Online-Kursbuchung für dein Studio?', category: 'fitness' },
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

  // Helper function to get a random phrase index (but not the current one)
  const getRandomPhraseIndex = (currentIndex: number): number => {
    let nextIndex = Math.floor(Math.random() * ctaPhrases.length)
    // Ensure we don't get the same phrase twice in a row
    while (nextIndex === currentIndex && ctaPhrases.length > 1) {
      nextIndex = Math.floor(Math.random() * ctaPhrases.length)
    }
    return nextIndex
  }

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
        // Finished deleting, move to random next phrase
        setIsDeleting(false)
        setIsTyping(true)
        setCurrentPhraseIndex((prev) => getRandomPhraseIndex(prev))
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
