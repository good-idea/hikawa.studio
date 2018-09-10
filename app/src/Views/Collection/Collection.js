// @flow
import React from 'react'
import type { Match } from 'react-router-dom'
import Query from 'GraphQL/Query'
import { ProductCard } from 'Components/Product'
import collectionQuery from './collectionQuery'

/**
 * Collection
 */

type Props = {
	match: Match,
}

const Collection = (props: Props) => (
	<Query query={collectionQuery} variables={{ handle: props.match.params.handle }}>
		{({ data }) => {
			const collection = data.shop.collectionByHandle
			console.log(collection)
			return (
				<React.Fragment>
					<h1>{collection.title}</h1>
					<h3>{collection.description}</h3>
					{collection.products.map((p) => (
						<ProductCard key={p.id} product={p} />
					))}
				</React.Fragment>
			)
		}}
	</Query>
)

export default Collection
