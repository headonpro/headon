'use client'

import { motion } from 'framer-motion'
import {
  Shield,
  Eye,
  Database,
  Mail,
  Settings,
  Trash2,
  FileText,
  Lock,
  Globe,
  Server,
} from 'lucide-react'

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
          <Shield className="text-accent-500 mr-4 h-16 w-16" />
          <h1 className="font-heading text-5xl font-bold text-white md:text-6xl lg:text-7xl">
            Datenschutz
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-3xl text-xl text-white/90 md:text-2xl"
        >
          Transparenz und Schutz Ihrer persönlichen Daten
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

export default function DataProtectionPage() {
  return (
    <>
      <HeroSection />

      {/* Content Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Overview Cards */}
          <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-primary-50 rounded-2xl p-6 text-center"
            >
              <Eye className="text-primary-600 mx-auto mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-bold text-gray-900">Keine Cookies</h3>
              <p className="text-sm text-gray-600">Wir verwenden keine Tracking-Cookies</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-secondary-50 rounded-2xl p-6 text-center"
            >
              <Database className="text-secondary-600 mx-auto mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-bold text-gray-900">Deutschland</h3>
              <p className="text-sm text-gray-600">Alle Daten in Deutschland gespeichert</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-accent-50 rounded-2xl p-6 text-center"
            >
              <Lock className="text-accent-600 mx-auto mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-bold text-gray-900">DSGVO</h3>
              <p className="text-sm text-gray-600">100% DSGVO-konform</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gray-50 p-6 text-center"
            >
              <Settings className="mx-auto mb-4 h-12 w-12 text-gray-600" />
              <h3 className="mb-2 text-lg font-bold text-gray-900">Ihre Rechte</h3>
              <p className="text-sm text-gray-600">Volle Kontrolle über Ihre Daten</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-12 lg:col-span-2">
              {/* General Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-gray-50 p-8"
              >
                <div className="mb-6 flex items-center">
                  <FileText className="text-primary-600 mr-3 h-8 w-8" />
                  <h2 className="text-3xl font-bold text-gray-900">Allgemeine Informationen</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der
                    Verarbeitung von personenbezogenen Daten (nachfolgend kurz &ldquo;Daten&rdquo;)
                    im Rahmen der Erbringung unserer Leistungen sowie innerhalb unseres
                    Onlineangebotes und der mit ihm verbundenen Webseiten, Funktionen und Inhalte
                    auf (nachfolgend gemeinsam bezeichnet als &ldquo;Onlineangebot&rdquo;).
                  </p>
                  <p>
                    Im Hinblick auf die verwendeten Begrifflichkeiten, wie z.B.
                    &ldquo;Verarbeitung&rdquo; oder &ldquo;Verantwortlicher&rdquo; verweisen wir auf
                    die Definitionen im Art. 4 der Datenschutzgrundverordnung (DSGVO).
                  </p>
                </div>
              </motion.div>

              {/* Responsible Party */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-primary-50 rounded-2xl p-8"
              >
                <h2 className="mb-6 text-3xl font-bold text-gray-900">Verantwortlicher</h2>
                <div className="space-y-3 text-lg text-gray-700">
                  <p className="text-primary-600 text-xl font-semibold">HEADON Kreativagentur</p>
                  <p>Onur Cirakoglu</p>
                  <p>Am Vogelsberg 8</p>
                  <p>97922 Lauda-Königshofen</p>
                  <p>Deutschland</p>
                  <div className="border-primary-200 mt-4 border-t pt-4">
                    <p>
                      <span className="font-semibold">E-Mail:</span> hallo@headon.pro
                    </p>
                    <p>
                      <span className="font-semibold">Telefon:</span> +49 176 63040241
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Data Processing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-secondary-50 rounded-2xl p-8"
              >
                <h2 className="mb-6 text-3xl font-bold text-gray-900">
                  Arten der verarbeiteten Daten
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 text-xl font-bold text-gray-900">Kontaktdaten</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Name und Vorname</li>
                      <li>• E-Mail-Adresse</li>
                      <li>• Telefonnummer</li>
                      <li>• Firmenname (optional)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-3 text-xl font-bold text-gray-900">Projektdaten</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Projektbeschreibung</li>
                      <li>• Budget und Timeline</li>
                      <li>• Hochgeladene Dateien</li>
                      <li>• Nachrichtenverlauf</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Purposes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-accent-50 rounded-2xl p-8"
              >
                <h2 className="mb-6 text-3xl font-bold text-gray-900">Zwecke der Verarbeitung</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="text-accent-600 mt-1 mr-3 h-6 w-6" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Kontaktaufnahme</h3>
                      <p className="text-gray-700">
                        Bearbeitung von Anfragen über unser Kontaktformular und direkte
                        Kommunikation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FileText className="text-accent-600 mt-1 mr-3 h-6 w-6" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Angebotserstellung</h3>
                      <p className="text-gray-700">
                        Erstellung individueller Angebote basierend auf Ihren Projektanforderungen
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Settings className="text-accent-600 mt-1 mr-3 h-6 w-6" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Projektabwicklung</h3>
                      <p className="text-gray-700">
                        Durchführung vereinbarter Dienstleistungen und Projektmanagement
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Legal Basis */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg"
              >
                <div className="mb-4 flex items-center">
                  <Lock className="text-primary-600 mr-2 h-6 w-6" />
                  <h3 className="text-xl font-bold text-gray-900">Rechtsgrundlagen</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold">Art. 6 Abs. 1 lit. b DSGVO</p>
                    <p>Vertragserfüllung und vorvertragliche Maßnahmen</p>
                  </div>
                  <div>
                    <p className="font-semibold">Art. 6 Abs. 1 lit. f DSGVO</p>
                    <p>Berechtigte Interessen (Kundenbetreuung)</p>
                  </div>
                  <div>
                    <p className="font-semibold">Art. 6 Abs. 1 lit. a DSGVO</p>
                    <p>Einwilligung (Newsletter)</p>
                  </div>
                </div>
              </motion.div>

              {/* Tools Used */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg"
              >
                <div className="mb-4 flex items-center">
                  <Globe className="text-primary-600 mr-2 h-6 w-6" />
                  <h3 className="text-xl font-bold text-gray-900">Verwendete Tools</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Plausible Analytics</h4>
                    <p className="text-sm text-gray-600">Cookie-freie Webanalyse, DSGVO-konform</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Supabase</h4>
                    <p className="text-sm text-gray-600">Datenbank für Kontaktformulare</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mailchimp</h4>
                    <p className="text-sm text-gray-600">
                      Newsletter-Service (nur bei Einwilligung)
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Hetzner</h4>
                    <p className="text-sm text-gray-600">Hosting in Deutschland</p>
                  </div>
                </div>
              </motion.div>

              {/* Your Rights */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg"
              >
                <div className="mb-4 flex items-center">
                  <Settings className="text-primary-600 mr-2 h-6 w-6" />
                  <h3 className="text-xl font-bold text-gray-900">Ihre Rechte</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• Auskunft über Ihre Daten</p>
                  <p>• Berichtigung unrichtiger Daten</p>
                  <p>• Löschung Ihrer Daten</p>
                  <p>• Einschränkung der Verarbeitung</p>
                  <p>• Datenübertragbarkeit</p>
                  <p>• Widerspruch gegen die Verarbeitung</p>
                  <p>• Widerruf der Einwilligung</p>
                </div>
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <p className="text-xs text-gray-600">
                    Kontaktieren Sie uns unter <strong>hallo@headon.pro</strong> zur Ausübung Ihrer
                    Rechte.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Detailed Sections */}
          <div className="mt-16 space-y-8">
            {/* Hosting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gray-50 p-8"
            >
              <div className="mb-6 flex items-center">
                <Server className="text-primary-600 mr-3 h-8 w-8" />
                <h2 className="text-2xl font-bold text-gray-900">Hosting und Speicherung</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Hetzner Online GmbH</strong>
                  <br />
                  Industriestr. 25, 91710 Gunzenhausen, Deutschland
                </p>
                <p>
                  Unsere Website wird auf Servern der Hetzner Online GmbH gehostet. Alle Daten
                  werden ausschließlich in Deutschland (Rechenzentrum West) gespeichert und
                  verarbeitet. Hetzner verarbeitet Ihre Daten ausschließlich nach unseren Weisungen
                  und hat mit uns einen Auftragsverarbeitungsvertrag abgeschlossen.
                </p>
                <p>
                  <strong>Verarbeitete Daten:</strong> IP-Adresse, Zeitpunkt des Zugriffs,
                  aufgerufene Seite, verwendeter Browser und Betriebssystem. Diese Daten werden
                  automatisch beim Besuch unserer Website erhoben und sind technisch notwendig für
                  die Bereitstellung der Website.
                </p>
                <p>
                  <strong>Speicherdauer:</strong> Server-Logs werden nach 7 Tagen automatisch
                  gelöscht.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gray-50 p-8"
            >
              <div className="mb-6 flex items-center">
                <Mail className="text-primary-600 mr-3 h-8 w-8" />
                <h2 className="text-2xl font-bold text-gray-900">Kontaktformular</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  Wenn Sie uns über unser Kontaktformular kontaktieren, werden die von Ihnen
                  mitgeteilten Daten zur Bearbeitung Ihrer Anfrage und für den Fall von
                  Anschlussfragen bei uns gespeichert.
                </p>
                <p>
                  <strong>Verarbeitete Daten:</strong> Name, E-Mail-Adresse, Telefonnummer
                  (optional), Firmenname (optional), Projektbeschreibung, Budget, Timeline,
                  hochgeladene Dateien (optional).
                </p>
                <p>
                  <strong>Zweck:</strong> Bearbeitung Ihrer Anfrage, Erstellung von Angeboten,
                  Projektabwicklung.
                </p>
                <p>
                  <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche
                  Maßnahmen) und Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen an der
                  Bearbeitung von Anfragen).
                </p>
                <p>
                  <strong>Speicherdauer:</strong> 3 Jahre nach Abschluss der Korrespondenz bzw. des
                  Projekts. Sie können jederzeit die Löschung Ihrer Daten verlangen.
                </p>
              </div>
            </motion.div>

            {/* Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gray-50 p-8"
            >
              <div className="mb-6 flex items-center">
                <Eye className="text-primary-600 mr-3 h-8 w-8" />
                <h2 className="text-2xl font-bold text-gray-900">Webanalyse (Plausible)</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  Wir nutzen Plausible Analytics zur Analyse der Nutzung unserer Website. Plausible
                  ist eine datenschutzfreundliche Alternative zu Google Analytics und vollständig
                  DSGVO-konform.
                </p>
                <p>
                  <strong>Besonderheiten von Plausible:</strong>
                </p>
                <ul className="ml-4 list-inside list-disc space-y-1">
                  <li>Keine Cookies oder lokale Speicherung</li>
                  <li>Keine Verfolgung über verschiedene Websites</li>
                  <li>Keine Sammlung persönlicher Daten</li>
                  <li>Anonyme Datenerfassung ohne IP-Adress-Speicherung</li>
                  <li>Server in Europa (GDPR-konform)</li>
                </ul>
                <p>
                  <strong>Verarbeitete Daten:</strong> Anonyme Seitenaufrufe, Verweisquellen,
                  ungefährer Standort (nur Land), Gerätetyp und Browser (ohne persönliche
                  Identifikation).
                </p>
                <p>
                  <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
                  Interesse an der Analyse der Website-Nutzung zur Optimierung).
                </p>
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gray-50 p-8"
            >
              <div className="mb-6 flex items-center">
                <Mail className="text-primary-600 mr-3 h-8 w-8" />
                <h2 className="text-2xl font-bold text-gray-900">Newsletter (Mailchimp)</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  Bei Anmeldung zu unserem Newsletter verwenden wir Mailchimp der Firma Rocket
                  Science Group LLC, 675 Ponce de Leon Ave NE, Suite 5000, Atlanta, GA 30308, USA.
                </p>
                <p>
                  <strong>Verarbeitete Daten:</strong> E-Mail-Adresse, Name (optional),
                  Anmeldezeitpunkt, IP-Adresse zum Zeitpunkt der Anmeldung.
                </p>
                <p>
                  <strong>Zweck:</strong> Versendung unseres Newsletters mit Informationen über
                  unsere Dienstleistungen, Projekte und Branchennews.
                </p>
                <p>
                  <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Die
                  Einwilligung kann jederzeit widerrufen werden.
                </p>
                <p>
                  <strong>Double-Opt-In:</strong> Die Anmeldung erfolgt über ein
                  Double-Opt-In-Verfahren. Sie erhalten eine Bestätigungs-E-Mail, um die Anmeldung
                  abzuschließen.
                </p>
                <p>
                  <strong>Abmeldung:</strong> Sie können sich jederzeit über den Link in jeder
                  E-Mail oder durch eine Nachricht an hallo@headon.pro abmelden.
                </p>
                <p>
                  <strong>Datentransfer:</strong> Mailchimp ist EU-US Data Privacy Framework
                  zertifiziert und gewährleistet einen angemessenen Datenschutz.
                </p>
              </div>
            </motion.div>

            {/* Data Retention */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gray-50 p-8"
            >
              <div className="mb-6 flex items-center">
                <Trash2 className="text-primary-600 mr-3 h-8 w-8" />
                <h2 className="text-2xl font-bold text-gray-900">Löschung von Daten</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  Die von uns verarbeiteten Daten werden nach Maßgabe der gesetzlichen Vorgaben
                  gelöscht, sobald deren zur Verarbeitung erlaubten Einwilligungen widerrufen werden
                  oder sonstige Erlaubnisse entfallen.
                </p>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 text-lg font-bold text-gray-900">Automatische Löschung</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Server-Logs: 7 Tage</li>
                      <li>• Newsletter-Abmeldungen: sofort</li>
                      <li>• Kontaktformular ohne Projekt: 1 Jahr</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-3 text-lg font-bold text-gray-900">Aufbewahrung</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Projektdaten: 3 Jahre nach Abschluss</li>
                      <li>• Rechnungsdaten: 10 Jahre (Steuerrecht)</li>
                      <li>• Korrespondenz: 3 Jahre</li>
                    </ul>
                  </div>
                </div>
                <p>
                  <strong>Ihr Recht auf Löschung:</strong> Sie können jederzeit die Löschung Ihrer
                  personenbezogenen Daten verlangen, soweit nicht gesetzliche Aufbewahrungspflichten
                  bestehen. Kontaktieren Sie uns unter hallo@headon.pro.
                </p>
              </div>
            </motion.div>

            {/* Contact for Privacy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-primary-50 rounded-2xl p-8"
            >
              <div className="mb-6 flex items-center">
                <Mail className="text-primary-600 mr-3 h-8 w-8" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Kontakt in Datenschutzangelegenheiten
                </h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  Bei Fragen zum Datenschutz, zur Ausübung Ihrer Rechte oder Beschwerden
                  kontaktieren Sie uns:
                </p>
                <div className="rounded-lg bg-white p-6">
                  <p className="text-primary-600 mb-2 font-semibold">HEADON Kreativagentur</p>
                  <p>Onur Cirakoglu</p>
                  <p>Am Vogelsberg 8</p>
                  <p>97922 Lauda-Königshofen</p>
                  <div className="mt-4">
                    <p>
                      <strong>E-Mail:</strong> hallo@headon.pro
                    </p>
                    <p>
                      <strong>Telefon:</strong> +49 176 63040241
                    </p>
                  </div>
                </div>
                <p>
                  <strong>Beschwerderecht:</strong> Sie haben das Recht, sich bei einer
                  Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten
                  durch uns zu beschweren.
                </p>
                <p>
                  <strong>Zuständige Aufsichtsbehörde:</strong> Landesbeauftragte für den
                  Datenschutz und die Informationsfreiheit Baden-Württemberg, Königstraße 10a, 70173
                  Stuttgart.
                </p>
              </div>
            </motion.div>

            {/* Last Updated */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="py-8 text-center"
            >
              <p className="text-gray-600">Stand dieser Datenschutzerklärung: 27. September 2024</p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
