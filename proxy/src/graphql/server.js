import { ApolloServer } from 'apollo-server-lambda'
import { createSchema } from './schema'
import { SanityDataSource } from './datasources'

export class Server {
	init = async () => {
		const { schema, context } = await createSchema()

		this.server = new ApolloServer({
			schema,
			context,
			introspection: true,
			tracing: true,
			playground: true,
			dataSources: () => ({
				sanity: new SanityDataSource(),
			}),
			engine: {
				apiKey: 'service:hikawa-studio:UvqEp8og0jiHIWWPZ3GEvw',
			},
		})
	}

	createHandler = async (settings) => {
		if (!this.server) await this.init()
		return this.server.createHandler(settings)
	}
}
