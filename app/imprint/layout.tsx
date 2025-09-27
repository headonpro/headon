import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum | HEADON.pro',
  description: 'Rechtliche Angaben und Impressum der HEADON Kreativagentur',
}

export default function ImprintLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}