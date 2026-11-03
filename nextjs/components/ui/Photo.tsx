import Image, { type ImageProps } from 'next/image'
import { photos, type PhotoName } from '../../lib/images'

type PhotoProps = Omit<ImageProps, 'src' | 'width' | 'height' | 'alt'> & {
  name: PhotoName
  alt: string
  // 'color' keeps the original photography; 'mono' applies the company profile's grayscale treatment.
  tone?: 'mono' | 'color'
}

export function Photo({ name, alt, tone = 'color', sizes = '100vw', className = '', ...rest }: PhotoProps) {
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
