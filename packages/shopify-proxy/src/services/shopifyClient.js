// @flow
import { GraphQLClient } from 'graphql-request'
import dotenv from 'dotenv'

const { parsed } = dotenv.config()

const key = parsed.SHOPIFY_API_KEY
const store = parsed.SHOPIFY_STORE
const password = parsed.SHOPIFY_API_PASSWORD

const authString = Buffer.from(`${key}:${password}`).toString('base64')

const client = new GraphQLClient(`https://${store}.myshopify.com/admin/api/graphql.json`, {
	headers: { Authorization: `Basic ${authString}` },
})

export default client
