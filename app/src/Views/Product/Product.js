// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import ReactPixel from 'react-facebook-pixel'
import type { ProductType } from 'Types/ContentTypes'
import type { CheckoutConsumerProps } from 'Views/CheckoutProvider'
import { Column } from 'Components/Layout'
import { Image } from 'Components/Media'
import { CheckoutConsumer } from 'Views/CheckoutProvider'
import { Header2 } from 'Components/Type'
import Helmet from 'Components/Helmet'
import Hero from 'Components/Hero'
import ProductDescription from './ProductDescription'
import RelatedItem from './RelatedItem'
import { isReactProduction } from '../../Utils/env'

const { useEffect } = React

const Wrapper = styled.div`
	${({ isLoading }) => `
		opacity: ${isLoading ? '0.1' : '1'};
		transition: 0.3s;
	`}
`

const Layout = styled.div`
	${({ theme }) => css`
		padding-top ${theme.layout.spacing.double};
		display: grid;
		grid-template-columns: 50% 50%;
		grid-column-gap: ${theme.layout.spacing.triple};

		${theme.media.queries.tablet`
			grid-template-columns: 100%;
			grid-row-gap: ${theme.layout.spacing.triple};

		`}
	`};
`

const Images = styled.div`
	${({ theme }) => `
		display: grid;
		grid-row-gap: ${theme.layout.spacing.single};
	`}
`

const Description = styled.div`
	${({ theme }) => `
		position: relative;
		margin-top: calc(${theme.layout.spacing.single} * 7);
		align-self: flex-start;
	`}
`

const RelatedWrapper = styled.div`
	${({ theme }) => css`
		margin: calc(${theme.layout.spacing.triple} * 2) 0;

		${theme.media.queries.phone`
			margin: ${theme.layout.spacing.double} 0;
		`}
	`}
`

const RelatedItems = styled.div`
	${({ theme }) => css`
		margin: calc(${theme.layout.spacing.triple} * 2) 0;
		display: grid;
		flex-wrap: wrap;
		grid-template-columns: 1fr 1fr 1fr;
		grid-column-gap: ${theme.layout.spacing.double};
		grid-row-gap: ${theme.layout.spacing.double};
		justify-content: center;
		border-top: 1px solid rgb(100, 100, 100);
		padding: ${theme.layout.spacing.triple} 0;

		${theme.media.queries.phone`
			margin: ${theme.layout.spacing.triple} 0;
			grid-column-gap: ${theme.layout.spacing.single};
		`}
	`}
`

const RelatedTitle = styled(Header2)`
	${({ theme }) => `
		flex-basis: 100%;
		text-align: center;
		margin-bottom: ${theme.layout.spacing.double};
	`}
`

const MobileTitle = styled(Header2)`
	${({ theme }) => css`
		display: none;

		${theme.media.queries.phone`
			margin: 0;
			display: initial;
		`}
	`}
`

/**
 * Product
 */

type Props = {
	product: ProductType,
	cart: CheckoutConsumerProps,
	loading: boolean,
}

const Product = ({ product, cart, loading }: Props) => {
	if (!product) return null

	useEffect(() => {
		if (isReactProduction()) {
			ReactPixel.track('ViewContent', {
				content_type: 'product',
				content_ids: [product.id],
			})
		}
	}, [])

	const minPrice = product.variants ? Math.min(...product.variants.map((v) => parseInt(v.price, 10))).toString() : null

	const seo = {
		name: product.title,
		image: product.images ? product.images[0] : null,
		description: product.description,
		contentType: 'product',
		currency: 'USD',
		price: minPrice,
	}
	return (
		<Wrapper isLoading={loading}>
			<Helmet seo={seo} />
			<Hero hero={product.hero} view="standard" />
			<Column width="wide">
				<Layout withHero={Boolean(product.hero && product.hero.images)}>
					<MobileTitle>{product.title}</MobileTitle>
					<Images>
						{product.images &&
							product.images.map((image) => (
								<Image key={image.originalSrc} image={image} sizes="(max-width: 600px) 80vw, 45vw" />
							))}
					</Images>
					<Description>
						<ProductDescription cart={cart} product={product} />
					</Description>
				</Layout>
				{product.related && product.related.length ? (
					<RelatedWrapper>
						<RelatedTitle>Keep Looking</RelatedTitle>
						<RelatedItems>
							{product.related.map((item, index) => (
								<RelatedItem number={index} key={item._key} item={item} />
							))}
						</RelatedItems>
					</RelatedWrapper>
				) : null}
			</Column>
		</Wrapper>
	)
}

type BaseProps = {
	data: any,
	loading: boolean,
}

export default ({ data, loading }: BaseProps) => (
	<CheckoutConsumer>
		{(cart) => data && data.shop && cart && <Product cart={cart} product={data.shop.productByHandle} loading={loading} />}
	</CheckoutConsumer>
)
