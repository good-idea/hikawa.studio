// @flow
import client from '../../services/sanity'
import { getRefField } from './utils'

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
		seo: SEOSettings
	}
`

export const shopResolvers = {
	Query: {
		shopPage: async () => client.getById('shop'),
	},
	ShopPage: {
		slug: () => 'shop',
		seo: getRefField('seo'),
	},
}
