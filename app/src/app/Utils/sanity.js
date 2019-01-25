// @flow

import type { MenuLink, SanityColor } from 'Types/ContentTypes'
import type { SanityImage } from 'Types/MediaTypes'

const defaultWidths = [1800, 1400, 1200, 1000, 800, 600, 300, 100]

export const buildSrcSet = (image: SanityImage, widths: Array<number> = defaultWidths): string => {
	const { url } = image
	return widths
		.map((width) => `${url}?w=${width}&q=80 ${width}w,`)
		.join('\n')
		.replace(/,$/, '')
}

export const sanityColorToRGBA = (sanityColor: SanityColor): string => {
	if (!sanityColor) return ''
	const color = sanityColor.rgb
	if (!color) return ''
	const { r, g, b, a } = color
	return `rgba(${r}, ${g}, ${b}, ${a})`
}

export const getLinkUrl = (link: MenuLink): string => {
	switch (link.__typename) {
		case 'Product':
			return `/products/${link.slug}`
		case 'Collection':
			return `/shop/${link.slug}`
		default:
			return `/${link.slug}`
	}
}
// export const sanityColorToRGBA = ({ rgb: { r, g, b, a } }: SanityColor): string =>
