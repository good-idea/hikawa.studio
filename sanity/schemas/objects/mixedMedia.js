const seo = {
	title: 'Media',
	name: 'mixedMedia',
	type: 'array',
	of: [
		//
		{ type: 'image' },
		// { type: 'videoEmbed' },
		// { type: 'lottie' },
	],
	validation: (Rule) => Rule.max(1),
}

export default seo
