// @flow
import sanityClient from '@sanity/client'

console.log(process.env.NODE_ENV === 'development' ? 'test' : 'production')

const client = sanityClient({
	projectId: 'rz3fhq71',
	dataset: process.env.NODE_ENV === 'development' ? 'test' : 'production',
	useCdn: process.env.NODE_ENV !== 'development',
})

export default client
