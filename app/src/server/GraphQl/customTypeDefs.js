export const customTypeDefs = /* GraphQL */ `
	input McSubscribeInput {
		email: String!
	}

	type Success {
		success: Boolean!
		errorMessages: [String]
	}

	extend type Mutation {
		mcSubscribe(input: McSubscribeInput!): Success
	}
`
