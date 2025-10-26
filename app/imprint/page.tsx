'use client'

import { motion } from 'framer-motion'
import { Scale, Mail, Phone, MapPin, Building, FileText } from 'lucide-react'

function HeroSection() {
  return (
    <section className="bg-primary-600 relative flex min-h-[70vh] items-center justify-center overflow-hidden">
      {/* Static gradient for base */}
      <div className="from-primary-600 via-primary-500 to-secondary-500 absolute inset-0 bg-gradient-to-br" />

      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, rgba(255, 140, 0, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, rgba(255, 140, 0, 0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="bg-secondary-500/20 absolute h-64 w-64 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ top: '10%', left: '10%' }}
      />

      <motion.div
        className="bg-accent-500/20 absolute h-96 w-96 rounded-full blur-3xl"
        animate={{
          x: [0, -150, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ bottom: '10%', right: '10%' }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center justify-center"
        >
          <Scale className="text-accent-500 mr-4 h-16 w-16" />
          <h1 className="font-heading text-5xl font-bold text-white md:text-6xl lg:text-7xl">
            Impressum
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-3xl text-xl text-white/90 md:text-2xl"
        >
          Rechtliche Angaben und Transparenz
        </motion.p>
      </div>

      {/* Wave at bottom */}
      <div className="absolute right-0 bottom-0 left-0">
        <svg
          className="h-16 w-full fill-white md:h-24"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d="M0,40 C480,100 960,0 1440,60 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  )
}

export default function ImprintPage() {
  return (
    <>
      <HeroSection />

      {/* Content Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Main Legal Content */}
            <div className="space-y-12 lg:col-span-2">
              {/* Company Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-gray-50 p-8"
              >
                <div className="mb-6 flex items-center">
                  <Building className="text-primary-600 mr-3 h-8 w-8" />
                  <h2 className="text-3xl font-bold text-gray-900">Angaben gemäß § 5 TMG</h2>
                </div>
                <div className="space-y-3 text-lg text-gray-700">
                  <p className="text-primary-600 text-xl font-semibold">HEADON Kreativagentur</p>
                  <p>Onur Cirakoglu</p>
                  <div className="flex items-start">
                    <MapPin className="text-primary-600 mt-1 mr-2 h-5 w-5 flex-shrink-0" />
                    <div>
                      <p>Am Vogelsberg 8</p>
                      <p>97922 Lauda-Königshofen</p>
                      <p>Deutschland</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="from-primary-50 to-secondary-50 rounded-2xl bg-gradient-to-r p-8"
              >
                <h2 className="mb-6 text-3xl font-bold text-gray-900">Kontakt</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex items-center">
                    <Phone className="text-primary-600 mr-3 h-6 w-6" />
                    <div>
                      <p className="font-semibold text-gray-900">Telefon</p>
                      <p className="text-gray-700">+49 176 63040241</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="text-primary-600 mr-3 h-6 w-6" />
                    <div>
                      <p className="font-semibold text-gray-900">E-Mail</p>
                      <p className="text-gray-700">hallo@headon.pro</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Tax Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-accent-50 rounded-2xl p-8"
              >
                <h2 className="mb-4 text-3xl font-bold text-gray-900">Umsatzsteuer-ID</h2>
                <p className="text-lg text-gray-700">
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:{' '}
                  <span className="font-semibold">folgt</span>
                </p>
              </motion.div>

              {/* Responsible Person */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-secondary-50 rounded-2xl p-8"
              >
                <h2 className="mb-6 text-3xl font-bold text-gray-900">
                  Inhaltlich verantwortlich nach § 18 Abs. 2 MStV
                </h2>
                <div className="space-y-2 text-lg text-gray-700">
                  <p className="font-semibold">Onur Cirakoglu</p>
                  <p>Am Vogelsberg 8</p>
                  <p>97922 Lauda-Königshofen</p>
                  <p>Deutschland</p>
                </div>
              </motion.div>
            </div>

            {/* Sidebar with Legal Text */}
            <div className="space-y-8">
              {/* EU Dispute Resolution */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg"
              >
                <div className="mb-4 flex items-center">
                  <FileText className="text-primary-600 mr-2 h-6 w-6" />
                  <h3 className="text-xl font-bold text-gray-900">EU-Streitschlichtung</h3>
                </div>
                <p className="mb-4 text-gray-700">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
                  bereit:
                </p>
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-600 hover:bg-primary-700 inline-block rounded-lg px-4 py-2 text-white transition-colors"
                >
                  OS-Plattform besuchen
                </a>
                <p className="mt-4 text-sm text-gray-600">
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </motion.div>

              {/* Consumer Dispute Resolution */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg"
              >
                <h3 className="mb-4 text-xl font-bold text-gray-900">Verbraucherstreitbeilegung</h3>
                <p className="text-gray-700">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Legal Disclaimers */}
          <div className="mt-16 space-y-8">
            {/* Content Liability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gray-50 p-8"
            >
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Haftung für Inhalte</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen
                  Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir
                  als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder
                  gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen,
                  die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
                <p>
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach
                  den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung
                  ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
                  möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
                  Inhalte umgehend entfernen.
                </p>
              </div>
            </motion.div>

            {/* Link Liability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gray-50 p-8"
            >
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Haftung für Links</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
                  keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
                  Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
                  Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden
                  zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
                  Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
                <p>
                  Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
                  konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden
                  von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                </p>
              </div>
            </motion.div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gray-50 p-8"
            >
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Urheberrecht</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                  unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                  Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
                  bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
                  Gebrauch gestattet.
                </p>
                <p>
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden
                  die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
                  gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam
                  werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
                  Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
