// import { shopifyItem } from './objects/shopify'

const page = {
	title: 'Pages',
	name: 'page',
	type: 'document',
	fields: [
		{
			title: 'Name',
			name: 'name',
			type: 'string',
		},
		{
			title: 'Content',
			name: 'content',
			type: 'array',
			of: [
				{
					title: 'Featured Image',
					name: 'featuredImage',
					type: 'image',
				},
				{
					type: 'shopifyItem',
				},
				{
					type: 'text',
				},
			],
		},
	],
}
export default page
