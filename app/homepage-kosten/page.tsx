import { RatgeberPageTemplate } from '@/components/calculator/RatgeberPageTemplate'
import { homepageKostenRatgeberConfig } from '@/lib/calculator/ratgeber-configs'

export { metadata } from './metadata'

export default function HomepageKostenPage() {
  return <RatgeberPageTemplate config={homepageKostenRatgeberConfig} />
}
