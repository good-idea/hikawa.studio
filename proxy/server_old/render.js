import * as React from 'react'
import path from 'path'
import { ApolloClient } from 'apollo-client'
import { SchemaLink } from 'apollo-link-schema'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { ServerStyleSheet } from 'styled-components'
import { StaticRouter } from 'react-router'
import 'isomorphic-fetch'
import ReactDOM from 'react-dom/server'
import Helmet from 'react-helmet'
import { ChunkExtractor } from '@loadable/server'
import App from '../app/App'
import template from './views/index.html'
import introspectionQueryResultData from './fragmentTypes.json'

const fragmentMatcher = new IntrospectionFragmentMatcher({
	introspectionQueryResultData,
})

const statsFile = path.resolve(__dirname, '..', '..', 'public', 'js', 'loadable-stats.json')

const render = ({ schema, context }) => async (req, res, next) => {
	if (req.url.startsWith('/graphql')) return next()
	const client = new ApolloClient({
		ssrMode: true,
		link: new SchemaLink({ schema, context }),
		cache: new InMemoryCache({
			fragmentMatcher,
		}),
	})
	const extractor = new ChunkExtractor({ statsFile })

	const RenderedApp = extractor.collectChunks(
		<ApolloProvider client={client}>
			<StaticRouter location={req.url} context={context}>
				<App />
			</StaticRouter>
		</ApolloProvider>,
	)

	try {
		await getDataFromTree(RenderedApp)
		const initialState = JSON.stringify(client.extract())
		const sheet = new ServerStyleSheet()
		const app = ReactDOM.renderToString(sheet.collectStyles(RenderedApp))
		const styles = sheet.getStyleTags()
		const scripts = extractor.getScriptTags()
		const helmet = Helmet.renderStatic()
		const title = helmet.title.toString()
		const meta = helmet.meta.toString()

		res.status(200)
		res.send(template({ title, meta, styles, initialState, app, scripts }))
		return res.end()
	} catch (e) {
		console.error('Rendering Error:', e)
		res.status(500)
		return next('An error occurred. Sorry!')
	}
}

export default render
