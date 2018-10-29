// @flow
import sanityClient from '@sanity/client'

const client = sanityClient({
	projectId: 'okelhmkd',
	dataset: 'staging',
	// useCdn: true, // `false` if you want to ensure fresh data
})

export default client
