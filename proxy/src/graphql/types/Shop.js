// @flow
import client from '../../services/sanity'
import { getRefField, getRefFields } from './utils'

export const shopSchema = /* GraphQL */ `
	extend type Query {
		shopPage: ShopPage
	}

	type ShopifyItem {
		_type: String!
		itemType: String!
		itemId: String!
		handle: String!
		title: String!
	}

	type CollectionPage {
		_id: String!
		_rev: String!
		_type: String!
		shopifyItem: ShopifyItem!
	}

	type ShopPage {
		hero: Hero
		slug: String!
		collections: [CollectionPage]!
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
		collections: getRefFields('collections'),
	},
}
