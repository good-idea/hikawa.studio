// @flow

const productSchema = /* GraphQL */ `
	extend type Product {
		related: [PageLink]
		hero: Hero
	}
`

export default productSchema
