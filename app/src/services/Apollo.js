// @flow
import React from 'react'
import type { Node } from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import { apiRoot } from '../config'
import { logErrors, logQueries, setAuthHeader } from './middleware'
import introspectionQueryResultData from './fragmentTypes.json'

const debug = require('debug')('web')

const httpLink = createHttpLink({ uri: apiRoot })

const fragmentMatcher = new IntrospectionFragmentMatcher({
	introspectionQueryResultData,
})

debug(`Connecting to api at url: ${apiRoot}`)

// TODO Return IDs from more objects for better caching
const cache = new InMemoryCache({
	addTypename: true,
	fragmentMatcher,
	dataIdFromObject: (object) => {
		switch (object.__typename) {
			case 'image':
				return object.publicId
			default:
				return object.uid || null
		}
	},
})

const link = ApolloLink.from([setAuthHeader, logErrors, logQueries, httpLink])

const client = new ApolloClient({ link, cache })

const ApolloWrapper = (props: { children: Node }) => <ApolloProvider client={client}>{props.children}</ApolloProvider>

export default ApolloWrapper
