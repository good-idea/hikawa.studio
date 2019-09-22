// @flow
import client from '../../services/sanity'

export const homepageSchema = /* GraphQL */ `
	extend type Query {
		homepage: Homepage
	}

	type Hero {
		images: [SanityImage]
	}

	type Homepage {
		title: String
		content: [ContentBlock]
		hero: Hero
		seo: SEOSettings
	}
`

export const homepageResolvers = {
	Query: {
		homepage: async () => {
			const homepage = await client.getById('homepage')
			return homepage
		},
	},
}
