import { images } from '../data/images.generated'
import { profileImages } from '../data/images.profile'

// One registry for every local photo: the original site's set plus the company-profile set.
export const photos = {
  ...images,
  ...profileImages,
  'founder-cutout': { src: '/images/profile/founder-cutout.webp', width: 368, height: 716 },
} as const

export type PhotoName = keyof typeof photos
