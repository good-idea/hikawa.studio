// @flow
import React from 'react'
import type { ApolloError } from 'react-apollo'
// import type { LoadingState } from 'Types/GraphQLTypes'

/**
 * FetchError
 *
 * Used in `withQuery` to render user-facing error messages.
 */

type Props = {
	error: ApolloError,
	// networkStatus: LoadingState,
}

const FetchError = ({ error }: Props) => {
	const message = error.networkError
		? // If it's a network error, apologize
		  "Sorry, we're having trouble connecting."
		: // Otherwise, get the error message
		  error.message
	return <p>{message}</p>
}

export default FetchError
