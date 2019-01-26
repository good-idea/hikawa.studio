import * as React from 'react'
import path from 'path'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { ServerStyleSheet } from 'styled-components'
import { StaticRouter } from 'react-router'
import 'isomorphic-fetch'
import ReactDOM from 'react-dom/server'
import Helmet from 'react-helmet'
import { ChunkExtractor } from '@loadable/server'
import App from '../app/App'
import template from './views/index.html'

const statsFile = path.resolve(__dirname, '..', '..', 'public', 'js', 'loadable-stats.json')

const render = async (req, res, next) => {
	console.log(req.url)
	if (req.url === '/graphql') return next()
	const client = new ApolloClient({
		link: createHttpLink({
			ssrMode: true,
			uri: process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : 'https://kame-proxy.now.sh',
			// credentials: 'same-origin',
			// headers: {
			// 	cookie: req.header('Cookie'),
			// },
			// fetch,
		}),
		cache: new InMemoryCache(),
	})
	const extractor = new ChunkExtractor({ statsFile })

	const context = {}
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
		res.end()
	} catch (e) {
		console.error('Rendering Error:', e)
		res.status(500)
		res.end('An error occurred. Sorry!')
	}
}

export default render
