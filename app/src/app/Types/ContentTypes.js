// @flow
/* eslint-disable no-use-before-define */
import * as React from 'react'
import type { ShopifyImage, SanityImage } from './MediaTypes'
import type { SEO } from './SharedTypes'

/**
 * Header
 */

export type HeaderBlock = {
	_type: string,
	_key: string,
	text?: string,
}

/**
 * Image
 */

export type ImageType = ShopifyImage | SanityImage

/**
 * PageLink
 */

export type Page = {
	title?: string,
	slug?: string,
	// eslint-disable-next-line
	content?: ContentBlocks,
	banner?: SanityImage,
	__typename: 'Page',
}

export type Hero = {
	images: Array<SanityImage>,
}

export type Link = Page | ProductType | CollectionType

export type PageLink = {
	_type: string,
	_key: string,
	link?: Link,
	label?: string,
	caption?: string,
	images?: Array<SanityImage>,
	image?: SanityImage,
	fullWidth?: boolean,
}

/**
 * Text
 */

type TextChild = {
	_key: string,
	_type: string,
	text: string,
	marks: Array<string>,
}

type MarkDef = {
	_type: string,
	href: string,
}

export type TextNode = {
	children: Array<TextChild>,
	markDefs: Array<MarkDef>,
	style: string,
	listItem?: 'number' | 'bullet',
	level?: number,
}

export type Mark = {
	mark: {
		href: string,
	},
	children: React.Node,
}

type VideoEmbed = {
	_key: string,
	_type: string,
	service: string,
	videoId: string,
	alt?: string,
}

export type RichTextBlock = TextNode | SanityImage | VideoEmbed

export type TextBlock = {
	_type: string,
	_key: string,
	blocks?: Array<RichTextBlock>,
	fullWidth?: boolean,
}

export type ContentBlock = TextBlock | PageLink

export type ContentBlocks = Array<ContentBlock>

/**
 * Site Settings
 */

type InternalLink = {
	title: string,
	slug: string,
	__typename: string,
}

type UrlLink = {
	label: string,
	url: string,
}

export type MenuLink = InternalLink | UrlLink

export type SiteSettings = {
	logo: SanityImage,
	seo: SEO,
	announcement: {
		enabled: boolean,
		backgroundColor: SanityColor,
		link: MenuLink,
		text: Array<TextNode>,
	},
	navigation: {
		footer: {
			links: Array<MenuLink>,
			text: Array<TextNode>,
		},
		header: {
			links: Array<MenuLink>,
		},
	},
	product: {
		text: Array<TextNode>,
	},
	mailer: {
		buttonLabel: string,
		footerText: Array<TextNode>,
		popupText: Array<TextNode>,
		popupEnabled: boolean,
		popupBackground?: SanityImage,
	},
}

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
	hero?: Hero,
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
	related?: Array<PageLink>,
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
	hero?: Hero,
	__typename: 'Collection',
}
