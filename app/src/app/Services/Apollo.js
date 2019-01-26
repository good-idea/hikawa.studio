// @flow
import React from 'react'
import type { Node } from 'react'
import fetch from 'isomorphic-fetch'
import { ApolloProvider } from 'react-apollo'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import { apiRoot } from '../config'
import { logErrors, logQueries, setAuthHeader } from './middleware'
import introspectionQueryResultData from './fragmentTypes.json'

const debug = require('debug')('web')

const httpLink = new HttpLink({ uri: apiRoot, fetch })

//   const client = new ApolloClient({
//     ssrMode: true,
//     // Remember that this is the interface the SSR server will use to connect to the
//     // API server, so we need to ensure it isn't firewalled, etc
//     link: createHttpLink({
//       uri: 'http://localhost:3010',
//       credentials: 'same-origin',
//       headers: {
//         cookie: req.header('Cookie'),
//       },
//     }),
//     cache: new InMemoryCache(),
//   });

const fragmentMatcher = new IntrospectionFragmentMatcher({
	introspectionQueryResultData,
})

debug(`Connecting to api at url: ${apiRoot}`)

const initialState = typeof window !== 'undefined' ? window.__APOLLO_STATE__ : {}
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
}).restore(initialState)

const link = ApolloLink.from([setAuthHeader, logErrors, logQueries, httpLink])

const client = new ApolloClient({ ssrMode: true, link, cache })

const ApolloWrapper = (props: { children: Node }) => <ApolloProvider client={client}>{props.children}</ApolloProvider>

export default ApolloWrapper
