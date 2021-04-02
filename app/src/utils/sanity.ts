import {
  Color,
  PageOrShopOrShopifyCollectionOrShopifyProductOrUrlLink,
  Image,
} from '../types'
import { definitely, assertExists } from './parsing'

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

export function sanityBlocksToPlainText(blocks: any[]): string {
  return (
    definitely(blocks)
      // loop through each block
      .map((block) => {
        // if it's not a text block with children,
        // return nothing
        if (block._type !== 'block' || !block.children) {
          return ''
        }
        // loop through the children spans, and join the
        // text strings
        return block.children.map((child) => child.text).join('')
      })
      // join the paragraphs leaving split by two linebreaks
      .join('\n\n')
  )
}
