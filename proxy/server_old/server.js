// @flow
import { ApolloServer } from 'apollo-server-express'
import path from 'path'
import express from 'express'
import buildSchema from './schema'
import { PORT } from './config'
import render from './render'

const isProduction = process.env.NODE_ENV !== 'development'

const runServer = async (port: number = 3000) => {
	const { context, schema } = await buildSchema()
	const server = new ApolloServer({ schema, context, playground: isProduction ? false : {} })
	const app = express()
	server.applyMiddleware({ app, path: '/graphql' })

	app.use(express.static(path.resolve(__dirname, '..', '..', 'public'), { maxAge: '1y' }))
	app.use(render({ schema, context }))

	app.listen(port, () => {
		// eslint-disable-next-line no-console
		console.log(`Server running on port: ${port}`)
	})
}

const port = parseInt(PORT, 10) || 3000
runServer(port)
