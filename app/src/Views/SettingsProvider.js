// @flow
import * as React from 'react'
import gql from 'graphql-tag'
import Query from 'GraphQL/Query'

const { Consumer, Provider } = React.createContext()

export const SettingsConsumer = Consumer

const query = gql`
	query SettingsQuery {
		siteSettings {
			logo {
				url
				id
				altText
				_key
				_type
				_ref
			}
			seo {
				name
				description
				image {
					url
					id
					altText
					_key
					_type
					_ref
				}
			}
		}
	}
`

/**
 * SettingsProvider
 */

type Props = {
	children: React.Node,
}

export const SettingsProvider = ({ children }: Props) => (
	<Query LoadingComponent={false} query={query}>
		{({ data }) => <Provider value={data.siteSettings}>{children}</Provider>}
	</Query>
)
