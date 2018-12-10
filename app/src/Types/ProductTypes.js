// @flow
/* eslint-disable no-use-before-define */

import type { ShopifyImage } from './MediaTypes'

/**
 * Colors
 */

export type SanityColor = {
	rgb?: {
		r: number,
		g: number,
		b: number,
		a: number,
	},
	hsv?: {
		h: number,
		s: number,
		v: number,
		a: number,
	},
}

export type Money = string
// 	amount: number,
// 	currencyCode: string,
// }

type ProductOption = {
	id: string,
	name: string,
	values: Array<string>,
}

type SelectedOption = {
	name: string,
	value: string,
}

type ProductPriceRange = {
	maxVariantPrice: Money,
	minVariantPrice: Money,
}

export type ProductVariant = {
	id: string,
	availableForSale?: boolean,
	title: string,
	price: Money,
	image?: ShopifyImage,
	product?: ProductType,
	selectedOptions?: Array<SelectedOption>,
	sku?: string,
	weight?: number,
	weightUnit?: string,
}

export type ProductType = {
	id: string,
	handle: string,
	title: string,
	availableForSale?: boolean,
	collections?: Array<CollectionType>,
	images?: Array<ShopifyImage>,
	options?: Array<ProductOption>,
	priceRange?: ProductPriceRange,
	variants?: Array<ProductVariant>,
	tags?: Array<string>,
	vendor?: string,
	productType?: string,
	publishedAt?: Date,
	createdAt?: Date,
	description?: string,
	descriptionHtml?: string,
	related?: Array<ProductType | CollectionType>,
	__typename: 'Product',
}

export type CollectionType = {
	id: string,
	title: string,
	description?: string,
	handle: string,
	image?: ShopifyImage,
	products?: Array<ProductType>,
	descriptionHtml?: string,
	updatedAt?: Date,
	backgroundColor?: SanityColor,
	keyColor?: SanityColor,
	__typename: 'Collection',
}
