const imageWithAltText = {
	name: 'imageWithAltText',
	type: 'image',
	title: 'Image',
	options: {
		hotspot: true,
	},
	fields: [
		{
			name: 'altText',
			title: 'Alt Text',
			type: 'string',
			description: 'A short description of the image. Helps with accessibility and SEO',
		},
	],
}

export default imageWithAltText
