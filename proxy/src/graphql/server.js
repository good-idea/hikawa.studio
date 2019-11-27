import { ApolloServer } from 'apollo-server-lambda'
import responseCachePlugin from 'apollo-server-plugin-response-cache'
import { RedisCache } from 'apollo-server-cache-redis'
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
			// cacheControl: {
			// 	defaultMaxAge: 10, // 10s
			// 	calculateHttpHeaders: true,
			// 	stripFormattedExtensions: false,
			// },
			//
			// cacheControl: {
			// 	maxAge: 300,
			// },
			dataSources: () => ({
				sanity: new SanityDataSource(),
			}),
			// cache: new RedisCache({
			// 	host: 'redis-10838.c81.us-east-1-2.ec2.cloud.redislabs.com',
			// 	port: 10838,
			// 	password: 'K7dA7bK8c1D58nDNwFgsKTwv9oYOP9pP',
			// 	socket_keepalive: false,
			// }),
			engine: {
				apiKey: 'service:hikawa-studio:UvqEp8og0jiHIWWPZ3GEvw',
			},
			// cache: new RedisCache({
			// 	host: 'redis-10838.c81.us-east-1-2.ec2.cloud.redislabs.com:10838',
			// }),
			// plugins: [responseCachePlugin()],
		})
	}

	createHandler = async (settings) => {
		if (!this.server) await this.init()
		return this.server.createHandler(settings)
	}
}
