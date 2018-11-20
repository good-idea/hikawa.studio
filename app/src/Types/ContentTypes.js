// @flow
import * as React from 'react'
import type { ProductType } from './ProductTypes'
import type { CollectionType } from './CollectionTypes'
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

export type ShopifyImage = {
	id: string,
	originalSrc: string,
	altText?: string,
	transformedSrc?: string,
	__typename: 'Image',
}

export type SanityImage = {
	_type: string,
	_ref: string,
	_key: string,
	__typename: 'SanityImage',
	altText: string,
	id: string,
	url: string,
	metadata?: {
		dimensions: {
			width: Number,
			height: Number,
			ratio?: Number,
		},
	},
}

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

export type Link = Page | ProductType | CollectionType

export type PageLink = {
	_type: string,
	_key: string,
	link?: Link,
	label?: string,
	caption?: string,
	image?: SanityImage,
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

type TextNode = {
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

export type TextBlock = {
	_type: string,
	_key: string,
	blocks?: Array<TextNode>,
}

export type ContentBlock = SanityImage | TextBlock | HeaderBlock | PageLink

export type ContentBlocks = Array<ContentBlock>

/**
 * Site Settings
 */

export type SiteSettings = {
	logo: SanityImage,
	seo: SEO,
}
