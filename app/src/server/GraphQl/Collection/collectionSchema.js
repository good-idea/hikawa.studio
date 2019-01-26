// @flow

const collectionSchema = /* GraphQL */ `
	extend type Collection {
		keyColor: Color
		backgroundColor: Color
		hero: Hero
	}
`

export default collectionSchema
