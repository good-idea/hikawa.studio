// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import type { Match } from 'react-router-dom'
import type { ProductType } from 'Types/ProductTypes'
import type { CheckoutConsumerProps } from 'Views/CheckoutProvider'
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
		opacity: ${loading ? '0.1' : '1'};
		transition: 0.3s;
	`}
`

const Layout = styled.div`
	${({ theme }) => css`
		display: grid;
		grid-template-columns: 50% 50%;
		grid-column-gap: ${theme.layout.spacing.triple};

		${theme.media.queries.tablet`
			grid-template-columns: 100%;
			grid-row-gap: ${theme.layout.spacing.triple};

		`}
	`};
`

const RelatedWrapper = styled.div`
	${({ theme }) => `
		margin: calc(${theme.layout.spacing.triple} * 2) 0;
	`}
`

const RelatedItems = styled.div`
	display: flex;
	justify-content: center;
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
						<RelatedWrapper>
							<RelatedTitle>KEEP L@@KING</RelatedTitle>
							<RelatedItems>
								{product.related.map((item, index) => (
									<RelatedItem number={index} key={item._key} item={item} />
								))}
							</RelatedItems>
						</RelatedWrapper>
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
