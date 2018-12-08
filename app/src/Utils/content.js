// @flow
import type { PageLink, ImageType, Page } from 'Types/ContentTypes'
import type { ProductType, CollectionType } from 'Types/ProductTypes'

export const getLinkUrl = (link: ProductType | CollectionType | Page): string => {
	const { __typename } = link
	switch (__typename) {
		case 'Product':
			if (!link.handle || typeof link.handle !== 'string') throw new Error('Products must have a handle')
			return `/products/${link.handle}`
		case 'Collection':
			if (!link.handle || typeof link.handle !== 'string') throw new Error('Collections must have a handle')
			return `/shop/${link.handle}`
		case 'Page':
		default:
			if (!link.slug || typeof link.slug !== 'string') throw new Error(`Pages must have a slug`)
			return `/${link.slug}`
	}
}
