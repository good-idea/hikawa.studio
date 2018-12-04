// @flow

export type ImageType = {
	id: string,
	altText?: string,
	originalSrc: string,
	transformedSrc?: string,
}

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
