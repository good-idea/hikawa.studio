import ShopifyEntitySelector from '../../fields/Shopify'

export const shopifyItem = {
	title: 'Shopify Item',
	name: 'shopifyItem',
	type: 'object',
	fields: [
		{
			name: 'name',
			title: 'Name',
			type: 'text',
		},
		{
			name: 'itemId',
			title: 'Item',
			type: 'string',
			inputComponent: ShopifyEntitySelector,
		},
	],
	preview: {
		select: {
			title: 'name',
		},
	},
}
