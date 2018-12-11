import { TiDocument } from 'react-icons/ti'
import { fields } from './shared'

const page = {
	title: 'Pages',
	name: 'page',
	type: 'document',
	icon: TiDocument,
	fields: [
		fields.pageTitle,
		fields.pageBanner,
		fields.pageSlug,
		{
			name: 'content',
			title: 'Text',
			type: 'array',
			of: [
				{ type: 'block' },
				{
					type: 'image',
					fields: [
						{
							name: 'altText',
							title: 'Alt Text',
							type: 'string',
							description: 'A short description of the image. Helps with accessibility and SEO',
							options: {
								isHighlighted: true,
							},
						},
					],
					validation: (Rule) => Rule.required(),
				},
			],
		},
		{
			name: 'gallery',
			title: 'Gallery',
			type: 'array',
			of: [
				{
					type: 'image',
					fields: [
						{
							type: 'string',
							title: 'altText',
							label: 'Alt Text',
						},
					],
				},
			],
		},

		fields.pageSeo,
	],
}

export default page
