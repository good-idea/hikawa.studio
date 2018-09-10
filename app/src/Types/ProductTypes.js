// @flow
/* eslint-disable no-use-before-define */

import type { CollectionType } from './CollectionTypes'
import type { ImageType } from './MediaTypes'

export type Money = {
	amount: number,
	currencyCode: string,
}

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

type ProductVariant = {
	id: string,
	availableForSale: boolean,
	price: Money,
	image: Image,
	product: ProductType,
	selectedOptions: Array<SelectedOption>,
	sku: string,
	title: string,
	weight: number,
	weightUnit: string,
}

export type ProductType = {
	id: string,
	availableForSale: boolean,
	handle: string,
	collections?: Array<CollectionType>,
	images?: Array<ImageType>,
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
}
