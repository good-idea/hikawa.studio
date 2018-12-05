// @flow
import * as React from 'react'
import type { ProductType, CollectionType } from './ProductTypes'
import type { SEO } from './SharedTypes'

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

export type MenuLink = {
	title: string,
	slug: string,
	__typename: string,
}

export type SiteSettings = {
	logo: SanityImage,
	seo: SEO,
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
}
