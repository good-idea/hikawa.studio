// @flow

import type { SanityImage, ShopifyImage } from './MediaTypes'

export type SEO = {
	description?: string,
	name?: string,
	image?: SanityImage | ShopifyImage | null,
	contentType?: string,
	currency?: string | null,
	price?: string | null,
}
