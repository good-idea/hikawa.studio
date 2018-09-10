// @flow

import type { ProductType } from './ProductTypes'
import type { ImageType } from './MediaTypes'

export type CollectionType = {
	id: string,
	title: string,
	description: string,
	handle: string,
	image: ImageType,
	products?: Array<ProductType>,
	descriptionHtml?: string,
	updatedAt?: Date,
}
