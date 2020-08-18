import {
  Color,
  PageOrShopOrShopifyCollectionOrShopifyProductOrUrlLink,
  Image,
} from '../types'
import { assert } from './parsing'

const defaultWidths = [1800, 1400, 1200, 1000, 800, 600, 300, 100]

export const buildSrcSet = (
  image: Image,
  widths: Array<number> = defaultWidths,
): string => {
  if (!image.asset) throw new Error('This image does not have a asset property')
  const { url } = image?.asset
  return widths
    .map((width) => `${url}?w=${width}&q=80 ${width}w,`)
    .join('\n')
    .replace(/,$/, '')
}

export const sanityColorToRGBA = (sanityColor: Color): string => {
  if (!sanityColor) return ''
  const color = sanityColor.rgb
  if (!color) return ''
  const { r, g, b, a } = color
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export interface LinkInfo {
  href: string
  as?: string
  external?: boolean
}

export const getLinkUrl = (
  link: PageOrShopOrShopifyCollectionOrShopifyProductOrUrlLink,
): LinkInfo => {
  switch (link.__typename) {
    case 'ShopifyProduct':
      return { href: '/products/[productSlug]', as: `/products/${link.handle}` }
    case 'ShopifyCollection':
      return { href: '/shop/[collectionSlug]', as: `/shop/${link.handle}` }
    case 'Shop':
      return { href: '/shop' }
    case 'Page':
      return { href: '/[pageSlug]', as: `/${assert(link?.slug?.current)}` }
    default:
      return { href: `/${link.url}`, external: true }
  }
}

export const getLinkLabel = (
  link: PageOrShopOrShopifyCollectionOrShopifyProductOrUrlLink,
): string => {
  switch (link.__typename) {
    case 'ShopifyProduct':
      return assert(link.title)
    case 'ShopifyCollection':
      return assert(link.title)
    case 'Shop':
      return 'Shop'
    case 'Page':
      return assert(link.title)
    default:
      return assert(link.label)
  }
}
