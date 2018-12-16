// @flow
import * as React from 'react'
import type { ProductType, CollectionType, SanityColor } from './ProductTypes'
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

export type TextBlock = {
	_type: string,
	_key: string,
	blocks?: Array<TextNode | SanityImage>,
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
	},
}
