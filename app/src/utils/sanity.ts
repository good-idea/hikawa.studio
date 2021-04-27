import {
  Color,
  PageOrShopOrShopifyCollectionOrShopifyProductOrUrlLink,
  Image,
} from '../types'
import { definitely, assertExists } from './parsing'

const defaultWidths = [1800, 1400, 1200, 1000, 800, 600, 300, 100]

export const sanityColorToRGBA = (sanityColor: Color): string => {
  if (!sanityColor) return ''
  const color = sanityColor.rgb
  if (!color) return ''
  const { r, g, b, a } = color
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export interface LinkInfo {
  href: string
  external?: boolean
}

export const getLinkUrl = (
  link: PageOrShopOrShopifyCollectionOrShopifyProductOrUrlLink,
): LinkInfo => {
  switch (link.__typename) {
    case 'ShopifyProduct':
      return { href: `/products/${link.handle}` }
    case 'ShopifyCollection':
      return { href: `/shop/${link.handle}` }
    case 'Shop':
      return { href: '/shop' }
    case 'Page':
      return {
        href: `/${assertExists(link?.slug?.current, 'Page link slug')}`,
      }
    default:
      return { href: `${link.url}`, external: true }
  }
}

export const getLinkLabel = (
  link: PageOrShopOrShopifyCollectionOrShopifyProductOrUrlLink,
): string => {
  switch (link.__typename) {
    case 'ShopifyProduct':
      return assertExists(link.title, 'Link Title')
    case 'ShopifyCollection':
      return assertExists(link.title, 'Link Title')
    case 'Shop':
      return 'Shop'
    case 'Page':
      return assertExists(link.title, 'Link Title')
    default:
      return assertExists(link.label, 'Link Title')
  }
}
