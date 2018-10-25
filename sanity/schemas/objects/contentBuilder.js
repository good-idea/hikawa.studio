const contentBuilder = {
	title: 'Content',
	name: 'contentBuilder',
	type: 'array',
	of: [
		// Pre-defined types
		{ type: 'header' },
		{ type: 'richText' },
		{ type: 'gallery' },
		{ type: 'image' },
		{ type: 'pageLink' },
		// { type: 'lottie' },
		// { type: 'videoEmbed' },
	],
}

export default contentBuilder
