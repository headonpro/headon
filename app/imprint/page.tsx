'use client'

import { motion } from 'framer-motion'
import { Scale, Mail, Phone, MapPin, Building, FileText } from 'lucide-react'

function HeroSection() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-primary-600 min-h-[70vh]">
      {/* Static gradient for base */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500" />

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
          ease: "linear"
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute h-64 w-64 rounded-full bg-secondary-500/20 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ top: '10%', left: '10%' }}
      />

      <motion.div
        className="absolute h-96 w-96 rounded-full bg-accent-500/20 blur-3xl"
        animate={{
          x: [0, -150, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ bottom: '10%', right: '10%' }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center mb-6"
        >
          <Scale className="w-16 h-16 text-accent-500 mr-4" />
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-heading">
            Impressum
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
        >
          Rechtliche Angaben und Transparenz
        </motion.p>
      </div>

      {/* Wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 md:h-24 fill-white" viewBox="0 0 1440 120" preserveAspectRatio="none">
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main Legal Content */}
            <div className="lg:col-span-2 space-y-12">

              {/* Company Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8"
              >
                <div className="flex items-center mb-6">
                  <Building className="w-8 h-8 text-primary-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Angaben gemäß § 5 TMG</h2>
                </div>
                <div className="space-y-3 text-lg text-gray-700">
                  <p className="font-semibold text-xl text-primary-600">HEADON Kreativagentur</p>
                  <p>Onur Cirakoglu</p>
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-primary-600 mr-2 mt-1 flex-shrink-0" />
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
                className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Kontakt</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-primary-600 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900">Telefon</p>
                      <p className="text-gray-700">+49 176 63040241</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-primary-600 mr-3" />
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
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Umsatzsteuer-ID</h2>
                <p className="text-lg text-gray-700">
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: <span className="font-semibold">folgt</span>
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Inhaltlich verantwortlich nach § 18 Abs. 2 MStV</h2>
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
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <FileText className="w-6 h-6 text-primary-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">EU-Streitschlichtung</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                </p>
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  OS-Plattform besuchen
                </a>
                <p className="text-sm text-gray-600 mt-4">
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </motion.div>

              {/* Consumer Dispute Resolution */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Verbraucherstreitbeilegung</h3>
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
              className="bg-gray-50 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Haftung für Inhalte</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                  allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                  unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach
                  Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
                <p>
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
                  Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
                  Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen
                  werden wir diese Inhalte umgehend entfernen.
                </p>
              </div>
            </motion.div>

            {/* Link Liability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Haftung für Links</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                  Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
                  Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
                  wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren
                  zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
                <p>
                  Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
                  Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links
                  umgehend entfernen.
                </p>
              </div>
            </motion.div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Urheberrecht</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                  Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                  Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                </p>
                <p>
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
                  beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
                  Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden
                  von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}