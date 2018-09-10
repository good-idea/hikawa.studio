// @flow
import React from 'react'
import type { Match } from 'react-router-dom'
import Query from 'GraphQL/Query'
import productQuery from './productQuery'

/**
 * Product
 */

type Props = {
	match: Match,
}

const Product = (props: Props) => (
	<Query query={productQuery} variables={{ handle: props.match.params.handle }}>
		{({ data }) => {
			const product = data.shop.productByHandle
			console.log(product)
			return (
				<React.Fragment>
					<h1>{product.title}</h1>
					<h3>{product.description}</h3>
				</React.Fragment>
			)
		}}
	</Query>
)

export default Product
