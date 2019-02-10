// @flow
import type { PageLink, ImageType, Page } from 'Types/ContentTypes'
import type { ProductType, CollectionType } from 'Types/ContentTypes'

export const getLinkUrl = (link: ProductType | CollectionType | Page): string => {
	const { __typename } = link
	switch (__typename) {
		case 'Product':
			if (!link.handle || typeof link.handle !== 'string') {
				console.warn('Products must have a handle', link)
				return null
			}
			return `/products/${link.handle}`
		case 'Collection':
			if (!link.handle || typeof link.handle !== 'string') {
				console.warn('Collections must have a handle', link)
				return null
			}
			return `/shop/${link.handle}`
		case 'ShopPage':
			return `/shop`
		case 'Page':
		default:
			if (!link.slug || typeof link.slug !== 'string') {
				console.warn(`Pages must have a slug`, link)
				return null
			}
			return `/${link.slug}`
	}
}
