// @flow
import React from 'react'
import type { Match } from 'react-router-dom'
import type { ProductType } from 'Types/ProductTypes'
import type { CheckoutConsumerProps } from 'Views/CheckoutProvider'
import styled from 'styled-components'
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
		grid-column-gap: ${theme.layout.spacing.triple};
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
	cart: CheckoutConsumerProps,
}

const Product = ({ product, cart }: Props) => {
	return (
		<InspectorProvider images={product.images || []}>
			<Column width="wide">
				<Layout>
					<ImageInspector />
					<ProductDescription addToCart={cart && cart.addToCart} product={product} />
				</Layout>
			</Column>
		</InspectorProvider>
	)
}

export default ({ match }: BaseProps) => (
	<CheckoutConsumer>
		{(cart) => (
			<Query query={productQuery} variables={{ handle: match.params.handle }}>
				{({ data }) => data && data.shop && cart && <Product product={data.shop.productByHandle} cart={cart} />}
			</Query>
		)}
	</CheckoutConsumer>
)

// export default (props: BaseProps) => {
// 	return <Composed {...props}>{({ product, cart }) => <Product product={product} cart={cart} />}</Composed>
// }
