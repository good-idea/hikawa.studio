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
	validation: (Rule) => Rule.max(1),
}

export default mixedMedia
