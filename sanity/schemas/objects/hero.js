const hero = {
	title: 'Hero',
	name: 'hero',
	type: 'object',
	fields: [
		{
			title: 'Hero Title',
			name: 'title',
			type: 'string',
		},
		// {
		// 	title: 'SEO: Page Title',
		// 	name: 'name',
		// 	type: 'string',
		// 	description: 'If empty, this will fall back to the normal page title. This should be less than 90 characters.',
		// },
		{
			title: 'Media',
			name: 'content',
			type: 'mixedMedia',
		},
	],
}

export default hero
