import { fields } from './shared'
import { TiThSmallOutline } from 'react-icons/ti'

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

export default page
