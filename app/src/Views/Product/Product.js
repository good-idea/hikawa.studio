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
import { Header3 } from 'Components/Type'
import ProductDescription from './ProductDescription'
import productQuery from './productQuery'
import RelatedItem from './RelatedItem'

const Wrapper = styled.div`
	${({ loading }) => `
		opacity: ${loading ? '0.3' : '1'};
		transition: 0.3s;
	`}
`

const Layout = styled.div`
	${({ theme }) => `
		display: grid;
		grid-template-columns: 50% 50%;
		grid-column-gap: ${theme.layout.spacing.triple};
	`};
`

const RelatedItems = styled.div`
	${({ theme }) => `
		margin: calc(${theme.layout.spacing.triple} * 2) 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	`}
`

const RelatedTitle = styled(Header3)`
	${({ theme }) => `
		flex-basis: 100%;
		text-align: center;
		margin-bottom: ${theme.layout.spacing.double};
	`}
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
	loading: boolean,
}

const Product = ({ product, cart, loading }: Props) => {
	console.log(product.related)
	return (
		<Wrapper loading={loading}>
			<InspectorProvider images={product.images}>
				<Column width="wide">
					<Layout>
						<ImageInspector />
						<ProductDescription addToCart={cart && cart.addToCart} product={product} />
					</Layout>
					{product.related && product.related.length ? (
						<RelatedItems>
							<RelatedTitle>KEEP L@@KING</RelatedTitle>
							{product.related.map((item) => (
								<RelatedItem key={item.id} item={item} />
							))}
						</RelatedItems>
					) : null}
				</Column>
			</InspectorProvider>
		</Wrapper>
	)
}

export default ({ match }: BaseProps) => {
	return (
		<CheckoutConsumer>
			{(cart) => (
				<Query query={productQuery} variables={{ handle: match.params.handle }}>
					{({ data, loading }) =>
						data && data.shop && cart && <Product product={data.shop.productByHandle} loading={loading} cart={cart} />
					}
				</Query>
			)}
		</CheckoutConsumer>
	)
}

// export default (props: BaseProps) => {
// 	return <Composed {...props}>{({ product, cart }) => <Product product={product} cart={cart} />}</Composed>
// }
