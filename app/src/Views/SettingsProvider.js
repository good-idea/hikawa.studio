// @flow
import * as React from 'react'
import gql from 'graphql-tag'
import Query from 'GraphQL/Query'
import { colorPartial, linkPartial, richTextPartial } from 'GraphQL/partials'

const { Consumer, Provider } = React.createContext()

export const SettingsConsumer = Consumer

const query = gql`
	query SettingsQuery {
		siteSettings {
			announcement {
				backgroundColor {
					${colorPartial}
				}
				link {
					${linkPartial}
				}
				enabled
				text {
					${richTextPartial}
				}
			}
			checkout {
				text {
					${richTextPartial}
				}
			}
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
// # mailer {
// # 	buttonLabel
// # 	footerText {
// # 		${richTextPartial}
// # 	}
// # 	popupText {
// # 		${richTextPartial}
// # 	}
// # }
// # navigation {
// # 	footer {
// # 		links {
// # 			${linkPartial}
// # 		}
// # 		text {
// # 			${richTextPartial}
// # 		}
// # 	}
// # 	header {
// # 		links {
// # 			${linkPartial}
// # 		}
// # 	}
// # }
// # product {
// # 	text {
// # 		${richTextPartial}
// # 	}
// # }

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
