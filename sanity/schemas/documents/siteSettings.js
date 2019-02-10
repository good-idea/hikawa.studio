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
			name: 'announcement',
			label: 'Announcement Banner',
			type: 'object',
			fields: [
				{
					name: 'enabled',
					title: 'Enable Announcement',
					type: 'boolean',
				},
				{
					name: 'text',
					title: 'Text',
					type: 'array',
					of: [
						{
							type: 'block',
							styles: [],
							lists: [],
							marks: {
								annotations: [],
								decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }],
							},
						},
					],
				},
				{
					title: 'Background Color',
					name: 'backgroundColor',
					type: 'color',
				},
				{
					title: 'Text Color',
					name: 'textColor',
					type: 'color',
				},
				{
					title: 'Link',
					name: 'link',
					type: 'array',
					description: 'Link to a Page, Product, Collection, or URL',
					of: [
						{ type: 'shopifyItem' },
						{
							type: 'reference',
							name: 'page',
							title: 'Page',
							to: [{ type: 'page' }],
						},
					],
					validation: (Rule) => Rule.max(1),
				},
			],
		},
		{
			name: 'navigation',
			title: 'Navigation',
			type: 'object',
			fields: [
				{
					name: 'header',
					label: 'Main Navigation',
					type: 'object',
					description: "The 'SHOP' link is included by default.",
					fields: [
						{
							name: 'links',
							title: 'Page Links',
							type: 'array',
							of: [
								{
									type: 'reference',
									name: 'page',
									title: 'Page',
									to: [{ type: 'page' }],
								},
								{
									type: 'object',
									name: 'urlLink',
									title: 'External URL',
									fields: [
										{
											type: 'string',
											title: 'Label',
											name: 'label',
											validation: (Rule) => Rule.required(),
										},
										{
											type: 'url',
											label: 'URL',
											name: 'url',
											validation: (Rule) => Rule.required(),
										},
									],
								},
							],
						},
					],
				},
				{
					name: 'footer',
					label: 'Footer',
					type: 'object',
					fields: [
						{
							name: 'links',
							title: 'Page Links',
							type: 'array',
							of: [
								{
									type: 'reference',
									name: 'page',
									title: 'Page',
									to: [{ type: 'page' }],
								},
								{
									type: 'object',
									name: 'urlLink',
									title: 'External URL',
									fields: [
										{
											type: 'string',
											title: 'Label',
											name: 'label',
											validation: (Rule) => Rule.required(),
										},
										{
											type: 'url',
											label: 'URL',
											name: 'url',
										},
									],
								},
							],
						},
						{
							name: 'text',
							title: 'Text',
							type: 'array',
							of: [
								{
									type: 'block',
									styles: [],
									lists: [],
									marks: {
										// annotations: [],
										decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }],
									},
								},
							],
						},
					],
				},
			],
		},
		{
			name: 'instagram',
			type: 'object',
			fields: [
				{
					title: 'Handle',
					name: 'handle',
					type: 'string',
					validation: (Rule) => Rule.required(),
					description: "Don't include the @",
				},
				{
					title: 'Title',
					name: 'title',
					type: 'string',
				},
				{
					title: 'Images',
					name: 'images',
					type: 'array',
					of: [
						{
							type: 'image',
						},
					],
				},
			],
		},
		{
			name: 'product',
			type: 'object',
			fields: [
				{
					name: 'text',
					title: 'Global Product Notes',
					description: 'This text will appear below all product descriptions',
					type: 'array',
					of: [
						{
							type: 'block',
							styles: [],
							lists: [],
							marks: {
								annotations: [],
								decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }],
							},
						},
					],
				},
			],
		},
		{
			name: 'checkout',
			type: 'object',
			fields: [
				{
					name: 'text',
					title: 'Global Checkout Notes',
					description: 'This text will appear below the cart summary',
					type: 'array',
					of: [
						{
							type: 'block',
							styles: [],
							lists: [],
							marks: {
								annotations: [],
								decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }],
							},
						},
					],
				},
			],
		},
		{
			name: 'mailer',
			title: 'Mailing List Settings',
			type: 'object',
			fields: [
				{
					name: 'popupEnabled',
					title: 'Enable Popup',
					type: 'boolean',
				},
				{
					name: 'popupText',
					title: 'Popup Text',
					type: 'array',
					of: [
						{
							type: 'block',
							styles: [],
							lists: [],
							marks: {
								annotations: [],
								decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }],
							},
						},
					],
				},
				{
					name: 'popupBackground',
					type: 'image',
					title: 'Popup Background Image',
				},
				{
					name: 'footerText',
					title: 'Footer Text',
					type: 'array',
					of: [
						{
							type: 'block',
							styles: [],
							lists: [],
							marks: {
								annotations: [],
								decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }],
							},
						},
					],
				},
				{
					name: 'buttonLabel',
					title: 'Submit Button Label',
					type: 'string',
					validation: (Rule) => Rule.max(20),
				},
			],
		},
		{
			name: 'seo',
			title: 'SEO & Accessibility',
			type: 'object',
			fields: [
				{
					title: 'SEO: Site Title',
					name: 'name',
					type: 'string',
					description: 'If empty, this will fall back to the default page title. This should be less than 90 characters.',
				},
				{
					title: 'Default Description',
					name: 'description',
					type: 'text',
					validation: (Rule) => [
						Rule.required()
							.max(120)
							.warning('Descriptons longer than 120 characters may be cut off in some search engines'),
						Rule.max(160).warning('Descriptions should not be longer than 160 characters.'),
					],
					description:
						'This is the description that will appear underneath the preview link when shared in Facebook, or in Google search results. It should be less than 200 characters',
				},
				{
					title: 'Default Image',
					name: 'image',
					type: 'image',
					description: 'Best dimensions: 1200 x 600px',
				},
			],
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
