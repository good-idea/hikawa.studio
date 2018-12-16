const mixedMedia = {
	title: 'Media',
	name: 'mixedMedia',
	type: 'array',
	of: [
		//
		{ type: 'imageWithAltText' },
		// { type: 'videoEmbed' },
		// { type: 'lottie' },
	],
	validation: (Rule) => Rule.max(2),
}

export default mixedMedia
