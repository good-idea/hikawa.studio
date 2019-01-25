// @flow

import type { SanityImage, ShopifyImage } from './MediaTypes'

export type SEO = {
	description?: string,
	name?: string,
	image?: SanityImage | ShopifyImage,
}
