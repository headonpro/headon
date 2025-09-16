'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export default function Logo({ className, width = 120, height = 32 }: LogoProps) {
  return (
    <Image
      src="/headon-logo.svg"
      alt="HEADON.pro Logo"
      width={width}
      height={height}
      className={cn("h-full w-auto", className)}
      priority
    />
  )
}