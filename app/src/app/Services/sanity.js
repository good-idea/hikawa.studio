// @flow
import sanityClient from '@sanity/client'

const client = sanityClient({
	projectId: 'rz3fhq71',
	dataset: process.env.NODE_ENV === 'development' ? 'test' : 'kame',
	useCdn: process.env.NODE_ENV !== 'development',
})

export default client
