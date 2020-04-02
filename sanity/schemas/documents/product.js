import { TiDevicePhone } from 'react-icons/ti'
import { fields } from './shared'

const product = {
	title: 'Products',
	name: 'product',
	type: 'document',
	icon: TiDevicePhone,
	fields: [
		{
			title: 'Shopify Product',
			type: 'shopifyItem',
			name: 'shopifyItem',
			options: {
				collections: false,
			},
			// TODO Why is this not working?
			validation: (Rule) => Rule.required(),
		},
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
			title: 'Related',
			type: 'array',
			name: 'related',
			description: 'Link to a Page, Product, Collection, or URL',
			of: [
				{
					type: 'pageLink',
					options: {
						collections: false,
					},
				},
			],
		},
		fields.pageSeo,
	],
	preview: {
		select: {
			shopifyItem: 'shopifyItem',
			title: 'title',
		},
		prepare: ({ shopifyItem, title }) => ({
			title: shopifyItem ? title || shopifyItem.title : title,
		}),
	},
}

export default product
