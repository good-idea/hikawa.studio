// @flow
import type { PageLink, ImageType } from 'Types/ContentTypes'

export const getLinkUrl = (pageLink: PageLink): string => {
	const { link } = pageLink
	const { __typename } = link
	switch (__typename) {
		case 'Product':
			if (!link.handle || typeof link.handle !== 'string') throw new Error('Products must have a handle')
			return `/products/${link.handle}`
		case 'Collection':
			if (!link.handle || typeof link.handle !== 'string') throw new Error('Collections must have a handle')
			return `/collections/${link.handle}`
		case 'Page':
		default:
			if (!link.slug || typeof link.slug !== 'string') throw new Error(`Pages must have a slug`)
			return `/${link.slug}`
	}
}

export const getLinkImage = (pageLink: PageLink): ImageType | null => {
	// console.log('linkImage', pageLink)
	if (pageLink.image) return pageLink.image
	const { link } = pageLink
	const { __typename } = link
	const source = pageLink.images || link.images
	switch (__typename) {
		case 'Product':
			// if (pageLink.images)
			return source && source.length ? source[0] : null
		case 'Collection':
			if (pageLink.images && pageLink.images.length) return pageLink.images[0]
			return link.image ? link.image : null
		case 'Page':
			return link.banner && link.banner.length ? link.banner[0] : null
		default:
			return null
	}
}
