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
			title: 'Title',
			name: 'title',
			type: 'string',
		},
		// fields.pageSlug,
		{
			title: 'Description',
			name: 'description',
			type: 'text',
		},
		{
			title: 'Additional Content',
			type: 'contentBuilder',
			name: 'content',
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
