import { FaShoppingBag } from 'react-icons/fa'
import { fields } from './shared'

const page = {
	title: 'Shop',
	name: 'shop',
	type: 'document',
	icon: FaShoppingBag,
	fields: [
		fields.pageTitle,
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
		fields.pageSeo,
	],
}

export default page
