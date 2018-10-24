// import { shopifyItem } from './objects/shopify'

const product = {
	title: 'Products',
	name: 'product',
	type: 'document',
	fields: [
		{
			title: 'item',
			type: 'shopifyItem',
			name: 'shopifyItem',
			options: {
				brange: 'nothing',
				range: 'abc',
			},
		},
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			description: 'overrides the title from shopify',
		},
		{
			title: 'Description',
			name: 'description',
			type: 'text',
		},
	],
}

export default product
