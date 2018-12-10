// @flow
import gql from 'graphql-tag'
import { withDefaultMutation } from 'GraphQL/Mutation'
import type { MutationWrapper } from 'GraphQL/Mutation'

const mutation = gql`
	mutation McSubscribe($email: String!) {
		mcSubscribe(input: { email: $email }) {
			success
			errorMessages
		}
	}
`

type MutationResponse = {
	success: boolean,
	errorMessages?: Array<string>,
}

const CheckoutDiscountCodeApplyMutation: MutationWrapper<MutationResponse> = withDefaultMutation(mutation)

export default CheckoutDiscountCodeApplyMutation
