// @flow
import * as React from 'react'
import { Route } from 'react-router-dom'
import Query from 'GraphQL/Query'
import NotFound from 'Views/NotFound'
import { getQueryConfigForPath } from '../Routes'

type Match = {
	isExact: boolean,
	params?: { [key: string]: string | void },
	path: string,
	url: string,
}

/**
 * View
 */

type Props = {
	match?: Match | null,
}

const View = (props: Props) => {
	const { match } = props
	if (!match) return null
	const { path, params } = match
	const config = getQueryConfigForPath(path)
	if (!config) return <NotFound />
	const { query, Component } = config
	return (
		<Query query={query} variables={{ ...params }}>
			{(result) => {
				const { data, loading } = result
				if (!data) return null
				return <Component data={data} loading={loading} />
			}}
		</Query>
	)
}

View.defaultProps = {
	match: null,
}

type BaseProps = {
	component?: React.ComponentType<any>,
}

const ViewRoute = ({ component, ...routeProps }: BaseProps) => (
	<Route
		{...routeProps}
		render={({ match }) => {
			if (!match) return null
			// $FlowFixMe
			return <View match={match} />
		}}
	/>
)

ViewRoute.defaultProps = {
	component: NotFound,
}

export default ViewRoute
