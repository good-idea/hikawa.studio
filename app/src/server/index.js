// This example uses React Router v4, although it should work
// equally well with other routers that support SSR
import path from 'path'
import express from 'express'
import render from './render'

// Note you don't have to use any particular http server, but
// we're using Express in this example
const app = express()
app.use(express.static(path.resolve(__dirname, '..', '..', 'public'), { maxAge: '1y' }))
app.use(render)

app.listen(3010, () =>
	console.log(
		// eslint-disable-line no-console
		`app Server is now running on http://localhost:3010`,
	),
)
