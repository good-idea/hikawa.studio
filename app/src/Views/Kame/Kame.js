// @flow
import React from 'react'
import Query from 'GraphQL/Query'

import homepageQuery from './homepageQuery'

/**
 * Kame
 */

const Kame = (props: Props) => (
	<div>
		<h2>Kame</h2>
		<Query query={homepageQuery}>
			{({ data }) => {
				console.log(data)
				return null
			}}
		</Query>
	</div>
)

export default Kame
