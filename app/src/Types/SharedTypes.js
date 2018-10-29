// @flow

export type Image = {
	url: string,
	_ref: string,
	metadata?: {
		dimensions: {
			width: Number,
			height: Number,
			ratio?: Number,
		},
	},
}

export type SEO = {
	description: string,
	name: string,
	image: Image,
}

export type ContentBlock = {
	_type: 'pageLink' | 'gallery' | 'image' | 'videoEmbed' | 'lottie' | 'header' | 'richText',
	_key: string,
}

export type ContentBlocks = Array<ContentBlock>
