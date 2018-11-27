const seo = {
	title: 'SEO & Accessibility',
	name: 'seo-settings',
	type: 'object',
	fields: [
		// {
		// 	title: 'SEO: Page Title',
		// 	name: 'name',
		// 	type: 'string',
		// 	description: 'If empty, this will fall back to the default page title. This should be less than 90 characters.',
		// },
		{
			title: 'SEO: Description',
			name: 'description',
			type: 'text',
			description:
				'This is the description that will appear underneath the preview link when shared in Facebook. It should be less than 200 characters',
		},
		{
			title: 'SEO: Image',
			name: 'image',
			type: 'image',
			description: 'Best dimensions: 1200 x 600px',
		},
		{
			title: 'Accessibility: Link Label',
			type: 'string',
			name: 'linkLabel',
			description:
				'This text will be used on screen readers when this page is linked to throughout the site. This should be descriptive: "Learn about our company" is better than "About". These link labels also help with SEO.',
		},
	],
}

export default seo
