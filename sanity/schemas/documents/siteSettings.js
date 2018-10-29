const page = {
	title: 'Site Settings',
	name: 'siteSettings',
	type: 'document',
	fields: [
		{
			name: 'logo',
			label: 'Logo',
			type: 'image',
		},
		{
			name: 'seo',
			label: 'Site-wide SEO defaults',
			type: 'seo-settings',
		},
	],
	preview: {
		select: {},
		prepare: () => ({
			title: 'Site Settings',
		}),
	},
}

export default page
