// import { ApolloServer } from 'apollo-server-lambda'
// import responseCachePlugin from 'apollo-server-plugin-response-cache'
// import { RedisCache } from 'apollo-server-cache-redis'
// import { RESTDataSource } from 'apollo-datasource-rest'
// import { createSchema } from '../graphql/schema'
// import client from '../services/sanity'
import { Server } from '../graphql/server'
import '../config'

const LambdaServer = new Server()

const runHandler = (event, context, handler) =>
	new Promise((resolve, reject) => {
		const callback = (error, body) => (error ? reject(error) : resolve(body))
		handler(event, context, callback)
	})

const run = async (event, lambdaContext) => {
	const handler = await LambdaServer.createHandler({
		cors: {
			origin: '*',
			credentials: true,
			allowedHeaders: ['ContentType', 'content-type', 'Origin', 'Accept'],
		},
	})

	const response = await runHandler(event, lambdaContext, handler)

	return response
}

exports.handler = run
