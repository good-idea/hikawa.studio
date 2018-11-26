// @flow
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'

const debug = require('debug')('web')

export const logQueries = new ApolloLink((operation, forward) => {
	const labelStyle = 'color: deepskyblue; font-weight: 800'
	const messageStyle = 'color: gray'
	debug(`%c[GraphQL Logger] %c(link) Called ${operation.operationName}`, labelStyle, messageStyle)
	if (operation.variables) debug(' variables ⤑ ', operation.variables)
	return forward(operation).map((result) => {
		debug(`%c[GraphQL Logger]%c (link) received result from ${operation.operationName}:`, labelStyle, messageStyle)
		debug('           ⤑ ', result)
		return result
	})
})

export const logErrors = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message, locations, path }) => {
			debug(`[GraphQL Error] Message: ${message}, Location: ${locations}, Path: ${path}`)
			debug('           ⤑ ', message)
			debug('           ⤑ ', locations)
			return false
		})
	}
	if (networkError) {
		debug(`[Network Error] ${networkError}`)
		debug(`      body ⤑ ${networkError.bodyText}`)
	}
})

export const setAuthHeader = new ApolloLink((operation, forward) => {
	operation.setContext({
		headers: { 'X-Shopify-Storefront-Access-Token': '29f169ddd673015f96eb6865593e9369' },
	})
	return forward(operation)
})
