import Image, { type ImageProps } from 'next/image'
import { photos, type PhotoName } from '../../lib/images'

type PhotoProps = Omit<ImageProps, 'src' | 'width' | 'height' | 'alt'> & {
  name: PhotoName
  alt: string
  // 'mono' matches the company profile's grayscale photography; 'color' keeps the original.
  tone?: 'mono' | 'color'
}

export function Photo({ name, alt, tone = 'mono', sizes = '100vw', className = '', ...rest }: PhotoProps) {
  const photo = photos[name]
  return (
    <Image
      src={photo.src}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      alt={alt}
      className={`${tone === 'mono' ? 'photo' : ''} ${className}`}
      {...rest}
    />
  )
}
