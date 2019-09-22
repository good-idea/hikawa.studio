// @flow
import { makeRemoteExecutableSchema, introspectSchema, mergeSchemas } from 'graphql-tools'
import { HttpLink } from 'apollo-link-http'
import fetch from 'node-fetch'
import { config } from '../../config'
import { typeDefs, resolvers } from './localSchema'

const shopifyLink = new HttpLink({
	uri: `https://${config.SHOP_NAME}.myshopify.com/api/graphql`,
	fetch,
	headers: {
		'X-Shopify-Storefront-Access-Token': config.STOREFRONT_ACCESS_TOKEN,
	},
})

const createRemoteExecutableSchema = async () => {
	const remoteSchema = await introspectSchema(shopifyLink)
	const remoteExecutableSchema = makeRemoteExecutableSchema({
		schema: remoteSchema,
		link: shopifyLink,
	})
	return remoteExecutableSchema
}

export const createSchema = async () => {
	const remoteSchema = await createRemoteExecutableSchema()
	// merge the schema along with custom resolvers
	const merged = mergeSchemas({
		schemas: [remoteSchema, typeDefs],
		resolvers,
	})
	const context = {
		subSchemas: {
			shopify: remoteSchema,
		},
	}
	return {
		schema: merged,
		context,
	}
}
