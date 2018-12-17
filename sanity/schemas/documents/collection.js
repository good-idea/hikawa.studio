import { TiThSmallOutline } from 'react-icons/ti'
import { fields } from './shared'

const page = {
	title: 'Collection',
	name: 'collection',
	type: 'document',
	icon: TiThSmallOutline,
	fields: [
		{
			title: 'Shopify Product',
			type: 'shopifyItem',
			name: 'shopifyItem',
			options: {
				products: false,
			},
			description: 'Select a collection from your Shopify content',
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
						},
					],
				},
			],
		},
		{
			title: 'Background Color',
			name: 'backgroundColor',
			type: 'color',
		},
		{
			title: 'Key Color',
			name: 'keyColor',
			type: 'color',
			description: 'Used for primary text',
		},
		{
			title: 'Secondary Color',
			name: 'secondaryColor',
			type: 'color',
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

export default page
