import { TiDocument } from 'react-icons/ti'
import { fields } from './shared'

const page = {
	title: 'Pages',
	name: 'page',
	type: 'document',
	icon: TiDocument,
	fields: [
		fields.pageTitle,
		fields.pageSlug,
		{
			title: 'Banner',
			name: 'hero',
			type: 'object',
			fields: [
				{
					title: 'Images',
					name: 'images',
					type: 'array',
					of: [
						{
							type: 'image',
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
						},
					],
					validation: (Rule) => Rule.required().max(2),
				},
			],
		},
		{
			name: 'content',
			title: 'Text',
			type: 'array',
			of: [
				{ type: 'block' },
				{ type: 'videoEmbed' },
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
					name: 'image',
					fields: [
						{
							type: 'string',
							name: 'altText',
							title: 'altText',
							label: 'Alt Text',
						},
					],
				},
			],
		},
		{
			name: 'includeInstagram',
			title: 'Include Instagram links',
			type: 'boolean',
		},

		fields.pageSeo,
	],
}

export default page
