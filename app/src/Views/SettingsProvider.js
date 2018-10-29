// @flow
import * as React from 'react'
import gql from 'graphql-tag'
import Query from 'GraphQL/Query'

const { Consumer, Provider } = React.createContext()

export const SettingsConsumer = Consumer

const query = gql`
	{
		siteSettings {
			logo {
				url
				_ref
			}
			seo {
				name
				description
				image {
					url
				}
			}
		}
	}
`

/**
 * SettingsProvidert
 */

type Props = {
	children: React.Node,
}

export const SettingsProvider = ({ children }: Props) => (
	<Query LoadingComponent={false} query={query}>
		{({ data }) => <Provider value={data.siteSettings}>{children}</Provider>}
	</Query>
)
