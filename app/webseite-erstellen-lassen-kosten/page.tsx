import { CalculatorPageTemplate } from '@/components/calculator/CalculatorPageTemplate'
import { webseiteErstellenLassenKostenConfig } from '@/lib/calculator/page-configs'

export { metadata } from './metadata'

export default function WebseiteErstellenLassenKostenPage() {
  return <CalculatorPageTemplate config={webseiteErstellenLassenKostenConfig} />
}
