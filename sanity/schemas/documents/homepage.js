import { FaParagraph } from 'react-icons/fa'
import { fields } from './shared'

const page = {
	title: 'Homepage',
	name: 'homepage',
	type: 'document',
	fields: [
		//
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
					validation: (Rule) => Rule.required(),
				},
			],
		},

		{
			title: 'Content',
			name: 'content',
			type: 'array',
			of: [
				{
					name: 'richText',
					type: 'object',
					title: 'Text',
					icon: FaParagraph,
					fields: [
						{
							name: 'blocks',
							title: 'Text',
							type: 'array',
							of: [
								{
									type: 'block',
									styles: [
										{ title: 'Header 1', value: 'h1' },
										{ title: 'Header 2', value: 'h2' },
									],
									lists: [],
									marks: {
										annotations: [],
										decorators: [
											{ title: 'Strong', value: 'strong' },
											{ title: 'Emphasis', value: 'em' },
										],
									},
								},
							],
						},
						{
							type: 'boolean',
							name: 'fullWidth',
							title: 'Full Width',
						},
					],
					preview: {
						select: {
							blocks: 'blocks',
						},
						prepare(value) {
							const block = (value.blocks || []).find((b) => b._type === 'block')
							return {
								title: block
									? block.children
											.filter((child) => child._type === 'span')
											.map((span) => span.text)
											.join('')
									: 'No title',
							}
						},
					},
				},
				// { type: 'richText' },
				{ type: 'pageLink' },
			],
		},
		fields.pageSeo,
	],
	preview: {
		select: {},
		prepare: () => ({
			title: 'Homepage',
		}),
	},
}

export default page
