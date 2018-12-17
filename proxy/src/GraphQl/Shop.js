// @flow
import client from '../services/sanity'

export const shopSchema = /* GraphQL */ `
	extend type Query {
		shopPage: ShopPage
	}

	type ShopPage {
		hero: Hero
		content: [ContentBlock]
	}
`

export const shopResolvers = {
	Query: {
		shopPage: async () => client.getById('shop'),
	},
}
