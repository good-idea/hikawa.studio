// @flow
import { GraphQLServer } from 'graphql-yoga'
import path from 'path'
import express from 'express'
import buildSchema from './schema'
import { PORT } from './config'
import render from './render'

const runServer = async (port: number = 3000) => {
	const { context, schema } = await buildSchema()
	const server = new GraphQLServer({ schema, context })

	server.express.use(express.static(path.resolve(__dirname, '..', '..', 'public'), { maxAge: '1y' }))
	server.express.use(render(schema))

	server.start(
		{
			port,
			endpoint: '/graphql',
			playground: process.env.NODE_ENV === 'development' ? '/graphql/playground' : false,
		},
		() => {
			// eslint-disable-next-line no-console
			console.log(`Server running on port: ${port}`)
		},
	)
}

const run = () => {
	const port = parseInt(PORT, 10) || 3000
	runServer(port)
}

run()
