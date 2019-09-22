import { ApolloServer, gql } from 'apollo-server-lambda'
import { createSchema } from '../graphql/schema'

const runHandler = (event, context, handler) =>
	new Promise((resolve, reject) => {
		const callback = (error, body) => (error ? reject(error) : resolve(body))
		handler(event, context, callback)
	})

const run = async (event, lambdaContext) => {
	const { schema, context } = await createSchema()

	const server = new ApolloServer({
		schema,
		context,
		introspection: true,
		playground: true,
	})

	const handler = server.createHandler({
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
