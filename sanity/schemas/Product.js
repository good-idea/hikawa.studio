import { shopifyItem } from './objects/shopify'

const product = {
	title: 'Products',
	name: 'product',
	type: 'document',
	fields: [
		shopifyItem,
		{
			title: 'Name',
			name: 'name',
			type: 'string',
		},
	],
}

export default product
