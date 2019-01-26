// @flow
import * as React from 'react'
import { StaticRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import Helmet from 'react-helmet'
import type { Request, Response } from 'express'
// import { clearChunks, flushChunkNames } from 'react-universal-component/server'
// import { setHasBabelPlugin } from 'react-universal-component'
// import flushChunks from 'webpack-flush-chunks'
// import fetchDataForRoute from './fetchDataForRoute'
import App from '../app/App'

const debug = require('debug')('server')

// const mergeAll = (objects: Array<any>): any => objects.reduce((acc, obj) => merge(acc, obj), {})

// setHasBabelPlugin()

export default ({ clientStats }: { clientStats: any }) => async (req: Request, res: Response) => {
	debug('Path:', req.path)
	// if (/^\/(fonts|images|public)/.test(req.path)) {
	// 	next()
	// 	return
	// }

	// const initialData = await fetchDataForRoute(req.path)
	// clearChunks()

	const sheet = new ServerStyleSheet()
	const context = {}
	const app = ReactDOM.renderToString(
		sheet.collectStyles(
			<StaticRouter location={req.url} context={context}>
				<App />
			</StaticRouter>,
		),
	)
	// const chunkNames = flushChunkNames()
	// const { js, scripts } = flushChunks(clientStats, { chunkNames })
	// debug('all chunks:', clientStats.assetsByChunkName)
	// debug('Dynamic Chunk Names Rendered:', chunkNames)
	// debug('Scripts Served:', scripts)

	// const data = JSON.stringify({ initialData })
	const styles = sheet.getStyleTags()
	const helmet = Helmet.renderStatic()
	const meta = `
		${helmet.title.toString()}
		${helmet.link.toString()}
		${helmet.meta.toString()}
	`

	res.render('index', {
		//
		meta,
		styles,
		data,
		app,
		js,
	})
}
