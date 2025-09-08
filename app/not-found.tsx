import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-16 px-4">
      <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Seite nicht gefunden</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Die gesuchte Seite existiert leider nicht. Möglicherweise wurde sie verschoben oder gelöscht.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">
            Zur Startseite
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/contact">
            Kontakt aufnehmen
          </Link>
        </Button>
      </div>
    </div>
  )
}