import { RatgeberPageTemplate } from '@/components/calculator/RatgeberPageTemplate'
import { websiteKostenRatgeberConfig } from '@/lib/calculator/ratgeber-configs'

export { metadata } from './metadata'

export default function WebsiteKostenPage() {
  return <RatgeberPageTemplate config={websiteKostenRatgeberConfig} />
}
