import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  fill?: boolean
  width?: number
  height?: number
}

export default function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  fill = false,
  width,
  height,
}: OptimizedImageProps) {
  // Check if WebP version exists
  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/, '.webp')
  
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <Image
        src={src}
        alt={alt}
        className={className}
        priority={priority}
        fill={fill}
        width={width}
        height={height}
      />
    </picture>
  )
}