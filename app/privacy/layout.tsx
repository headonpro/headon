import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | HEADON.pro',
  description: 'Datenschutzerklärung der HEADON Kreativagentur - Transparenz im Umgang mit Ihren Daten',
}

export default function DataProtectionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}