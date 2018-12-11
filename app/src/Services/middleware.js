// @flow
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'

const debug = require('debug')('web')

export const logQueries = new ApolloLink((operation, forward) => {
	const labelStyle = 'color: deepskyblue; font-weight: 800'
	const messageStyle = 'color: gray'
	const start = new Date()
	debug(`%c[GraphQL Logger] %c(link) Called ${operation.operationName}`, labelStyle, messageStyle)
	if (operation.variables) debug(' variables ⤑ ', operation.variables)
	return forward(operation).map((result) => {
		const end = new Date()
		const duration = end - start
		debug(
			`%c[GraphQL Logger]%c (link) received result from ${operation.operationName} in ${duration}ms:`,
			labelStyle,
			messageStyle,
		)
		debug('           ⤑ ', result)
		return result
	})
})

export const logErrors = onError(({ operation, graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message, locations, path }) => {
			debug(`[GraphQL Error: ${operation.operationName}] Message: ${message}, Location: ${locations}, Path: ${path}`)
			debug('           ⤑ ', message)
			debug('           ⤑ ', locations)
			return false
		})
	}
	if (networkError) {
		debug(`[Network Error: ${operation.operationName}] ${networkError}`)
		debug(`      body ⤑ ${networkError.bodyText}`)
	}
})

export const setAuthHeader = new ApolloLink((operation, forward) => {
	operation.setContext({
		headers: { 'X-Shopify-Storefront-Access-Token': '29f169ddd673015f96eb6865593e9369' },
	})
	return forward(operation)
})
