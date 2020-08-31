// @flow
import gql from 'graphql-tag'

export const subscribeMutation = gql`
  mutation McSubscribe($email: String!) {
    mcSubscribe(input: { email: $email }) {
      success
      errorMessages
    }
  }
`

type MutationResponse = {
  success: boolean
  errorMessages?: Array<string>
}
