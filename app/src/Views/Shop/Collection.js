// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import { Header2 } from 'Components/Type'
import type { CollectionType } from 'Types/ContentTypes'
import { Column } from 'Components/Layout'
import ProductThumbnail from './ProductThumbnail'

const { useEffect, useRef } = React

const Wrapper = styled.div`
	${({ theme }) => css`
		padding: ${theme.layout.spacing.triple};
		background-size: cover;
		background-position: center;

		${theme.media.queries.phone`
			padding: ${theme.layout.spacing.single};
		`}
	`}
`

const Inner = styled.div`
	${({ theme }) => css`
		position: relative;
		display: grid;
		grid-template-columns: 200px 1fr;
		justify-content: center;

		${theme.media.queries.phone`
			display: block;
		`}
	`}
`

const Title = styled(Header2)`
	${({ theme }) => css`
		text-align: right;
		padding-right: ${theme.layout.spacing.double};

		${theme.media.queries.phone`
			text-align: left;
			padding-right: 0;
		`}
	`}
`

const Products = styled.div`
	${({ theme }) => css`
		display: grid;
		flex-grow: 1;
		margin: 0 ${theme.layout.spacing.double};
		grid-template-columns: repeat(3, 1fr);
		grid-column-gap: ${theme.layout.spacing.single};
		grid-row-gap: ${theme.layout.spacing.single};

		${theme.media.queries.phone`
			grid-template-columns: repeat(2, 1fr); 
			margin: 0;
		`}
	`};
`

/**
 * Collection
 */

type Props = {
	collection: CollectionType,
	isActive: boolean,
}

const Collection = (props: Props) => {
	const { collection, isActive } = props
	const { products } = collection
	const ref = useRef(null)
	useEffect(() => {
		if (!ref.current || !isActive) return
		const top = ref.current.getBoundingClientRect().y
		document.documentElement.scrollTop = top - 50
	}, [isActive, ref.current])
	if (products && !products.length) return null
	return (
		<Wrapper ref={ref} collection={collection}>
			<Column width="wide">
				<Inner>
					<Title>{collection.title}</Title>
					{products && products.length > 0 ? (
						<Products>
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
