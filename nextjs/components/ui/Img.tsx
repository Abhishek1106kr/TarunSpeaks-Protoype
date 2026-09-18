import Image, { type ImageProps } from 'next/image'
import { images, type ImageName } from '../../data/images.generated'

type ImgProps = Omit<ImageProps, 'src' | 'width' | 'height' | 'alt'> & {
  name: ImageName
  alt: string
  priority?: boolean
}

// Locally optimised WebP source, resized further by next/image, with intrinsic
// size to avoid layout shift. Display size is controlled by className (as before).
export function Img({ name, alt, priority = false, sizes = '100vw', ...rest }: ImgProps) {
  const image = images[name]
  return (
    <Image
      src={image.src}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={alt}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      {...rest}
    />
  )
}
