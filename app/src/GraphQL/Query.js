// @flow
import * as React from 'react'
import type { DocumentNode } from 'graphql'
import type { QueryProps } from 'Types/GraphQLTypes'
import { Query as ApolloQuery } from 'react-apollo'
import { Loading, FetchError } from './Network'
import { getNetworkStatus, unwindEdges } from './utils'

const debug = require('debug')('web')

const Query = (props: QueryProps) => {
	// A few more query props are available:
	// https://www.apollographql.com/docs/react/essentials/queries.html#props
	const { variables, children, query, delay } = props
	return (
		<ApolloQuery query={query} variables={variables} delay={delay} notifyOnNetworkStatusChange>
			{(response) => {
				const { networkStatus, error } = response
				const status = getNetworkStatus(networkStatus)
				const LoadingComponent = props.LoadingComponent || Loading
				const ErrorComponent = props.ErrorComponent || FetchError
				const { data, ...responseProps } = response
				if (status === 'loading' && props.LoadingComponent !== false) return <LoadingComponent status={status} {...response} />
				if (error && props.ErrorComponent !== false) {
					debug(error)
					return <ErrorComponent status={status} {...responseProps} />
				}
				const renderProps = {
					data: data ? unwindEdges(data) : data,
					...responseProps,
				}
				return children(renderProps)
			}}
		</ApolloQuery>
	)
}

export default Query

export const withDefaultQuery = (defaultQuery: DocumentNode) => (props: any) => (
	<Query query={props.query || defaultQuery} {...props} />
)
