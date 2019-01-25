// @flow
import * as React from 'react'
import Query from 'GraphQL/Query'
import NotFound from 'Views/NotFound'
import { getQueryConfigForPath } from '../Routes'

type ComputedMatch = {
	isExact: boolean,
	params: { [key: string]: string },
	path: string,
	url: string,
}

/**
 * Route
 */

type Props = {
	computedMatch?: ComputedMatch | null,
}

const Route = ({ computedMatch }: Props) => {
	if (!computedMatch) return null
	const { path, params } = computedMatch
	const config = getQueryConfigForPath(path)
	if (!config) return <NotFound />
	const { query, Component } = config
	return (
		<Query query={query} variables={{ ...params }}>
			{(result) => {
				const { data, loading } = result
				return <Component data={data} loading={loading} />
			}}
		</Query>
	)
}

Route.defaultProps = {
	computedMatch: null,
}

export default Route
