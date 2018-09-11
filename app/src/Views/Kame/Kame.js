// @flow
import React from 'react'
import Query from 'GraphQL/Query'
import { CollectionCard } from 'Components/Collection'

import homepageQuery from './homepageQuery'

/**
 * Kame
 */

const Kame = () => (
	<div>
		<h2>Kame</h2>
		<Query query={homepageQuery}>
			{({ data }) => {
				const { collections } = data.shop
				return collections.map((c) => <CollectionCard key={c.id} collection={c} />)
			}}
		</Query>
	</div>
)

export default Kame
