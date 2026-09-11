import type { ImgHTMLAttributes } from 'react'
import { images, type ImageName } from '../../data/images.generated'

type ImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'width' | 'height' | 'alt'> & {
  name: ImageName
  alt: string
  priority?: boolean
}

// Responsive, locally optimised WebP (see scripts/optimize-images.mjs) with intrinsic size to avoid layout shift.
export function Img({ name, alt, priority = false, sizes = '100vw', ...rest }: ImgProps) {
  const image = images[name]
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      {...rest}
    />
  )
}
