// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Header2 } from 'Components/Type'
import type { CollectionType } from 'Types/CollectionTypes'
import { sanityColorToRGBA } from 'Utils/sanity'
import { Column } from 'Components/Layout'
import ProductThumbnail from './ProductThumbnail'

const Wrapper = styled.div`
	${({ theme, collection }) => `
		padding: ${theme.layout.spacing.triple};
		background-color: ${sanityColorToRGBA(collection.backgroundColor)};
		color: ${sanityColorToRGBA(collection.keyColor)};
	`};
`

const Inner = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
`

const Title = styled(Header2)`
	flex-basis: 300px;
`

const Products = styled.div`
	${({ theme, count }) => `
		display: grid;
		flex-grow: 1;
		margin: 0 ${theme.layout.spacing.double};
		grid-template-columns: repeat(${Math.min(count, 3)}, 1fr); 
		grid-column-gap: ${theme.layout.spacing.single};
		grid-row-gap: ${theme.layout.spacing.single};
	`};
`

/**
 * Collection
 */

type Props = {
	collection: CollectionType,
}

const Collection = (props: Props) => {
	const { collection } = props
	const { products } = collection
	if (products && !products.length) return null
	return (
		<Wrapper collection={collection}>
			<Column width="wide">
				<Inner>
					<Title>{collection.title}</Title>
					{products && products.length > 0 ? (
						<Products count={products.length}>
							{products.map((product) => (
								<ProductThumbnail key={product.handle} product={product} collection={collection} />
							))}
						</Products>
					) : null}
				</Inner>
			</Column>
		</Wrapper>
	)
}

export default Collection
