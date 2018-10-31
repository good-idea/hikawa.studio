// @flow
import React from 'react'
import { path } from 'ramda'
import type { Match } from 'react-router-dom'
import styled from 'styled-components'
import { adopt } from 'react-adopt'
import type { ProductType } from 'Types/ProductTypes'
import Query from 'GraphQL/Query'
import { Column } from 'Components/Layout'
import { InspectorProvider, ImageInspector } from 'Components/ImageInspector'
import { CheckoutConsumer } from 'Views/CheckoutProvider'
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

const Product = ({ product, cart }: Props) => {
	return (
		<InspectorProvider images={product.images || []}>
			<Column width="wide">
				<Layout>
					<ImageInspector />
					<ProductDescription cart={cart} product={product} />
				</Layout>
			</Column>
		</InspectorProvider>
	)
}

const Composed = adopt(
	{
		cart: <CheckoutConsumer />,
		productData: ({ match, render }) => {
			return (
				<Query query={productQuery} variables={{ handle: match.params.handle }}>
					{render}
				</Query>
			)
		},
	},
	({ productData, ...rest }) => ({
		product: path(['data', 'shop', 'productByHandle'], productData),
		...rest,
	}),
)

export default (props: BaseProps) => {
	return <Composed {...props}>{({ product, cart }) => <Product product={product} cart={cart} />}</Composed>
}
