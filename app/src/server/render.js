import * as React from 'react'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { ServerStyleSheet } from 'styled-components'
import { StaticRouter } from 'react-router'
import 'isomorphic-fetch'
import ReactDOM from 'react-dom/server'
import Html from './Html'
import App from '../app/App'

const render = async (req, res) => {
	const client = new ApolloClient({
		// ssrMode: true,
		link: createHttpLink({
			ssrMode: true,
			uri: 'http://localhost:3000',
			// credentials: 'same-origin',
			// headers: {
			// 	cookie: req.header('Cookie'),
			// },
			// fetch,
		}),
		cache: new InMemoryCache(),
	})

	const context = {}
	const RenderedApp = (
		<ApolloProvider client={client}>
			<StaticRouter location={req.url} context={context}>
				<App />
			</StaticRouter>
		</ApolloProvider>
	)

	try {
		await getDataFromTree(RenderedApp)
		const initialState = client.extract()
		const sheet = new ServerStyleSheet()
		const content = ReactDOM.renderToString(sheet.collectStyles(RenderedApp))
		const styles = sheet.getStyleTags()
		const html = <Html content={content} styles={styles} initialState={JSON.stringify(initialState)} />
		res.status(200)
		res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`)
		res.end()
	} catch (e) {
		console.error('Rendering Error:', e)
		res.status(500)
		res.end('An error occurred. Sorry!')
	}
}

export default render
