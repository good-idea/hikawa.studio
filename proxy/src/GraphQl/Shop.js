// @flow
import client from '../services/sanity'

export const shopSchema = /* GraphQL */ `
	extend type Query {
		shopPage: ShopPage
	}

	type ShopPage {
		hero: Hero
		content: [ContentBlock]
		slug: String!
		_type: String!
		_key: String!
		fullWidth: Boolean
	}
`

export const shopResolvers = {
	Query: {
		shopPage: async () => client.getById('shop'),
	},
	ShopPage: {
		slug: () => 'shop',
	},
}
