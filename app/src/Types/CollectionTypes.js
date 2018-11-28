// @flow

import type { ProductType } from './ProductTypes'
import type { ShopifyImage, SanityColor } from './ContentTypes'

export type CollectionType = {
	id: string,
	title: string,
	description?: string,
	handle: string,
	image: ShopifyImage,
	products?: Array<ProductType>,
	descriptionHtml?: string,
	updatedAt?: Date,
	backgroundColor: SanityColor,
	keyColor: SanityColor,
	__typename: 'Collection',
}
