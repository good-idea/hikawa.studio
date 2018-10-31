// @flow
import React from 'react'
import type { Match } from 'react-router-dom'
import styled from 'styled-components'
import type { ProductType } from 'Types/ProductTypes'
import Query from 'GraphQL/Query'
import { Column } from 'Components/Layout'
import { InspectorProvider, ImageInspector } from 'Components/ImageInspector'
import ProductDescription from './ProductDescription'
import productQuery from './productQuery'

const Layout = styled.div`
	${({ theme }) => `
		display: grid;
		grid-template-columns: 50% 50%;
		grid-column-gap: ${theme.layout.spacing.single};
	`};
`

/**
 * Product
 */

type BaseProps = {
	match: Match,
}

type Props = {
	product: ProductType,
}

const Product = (props: Props) => {
	const { product } = props
	return (
		<InspectorProvider images={product.images || []}>
			<Column width="wide">
				<Layout>
					<ImageInspector />
					<ProductDescription product={product} />
				</Layout>
			</Column>
		</InspectorProvider>
	)
}

export default ({ match }: BaseProps) => (
	<Query query={productQuery} variables={{ handle: match.params.handle }}>
		{({ data }) => <Product product={data.shop.productByHandle} />}
	</Query>
)
