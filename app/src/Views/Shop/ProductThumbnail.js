// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import type { CollectionType, ProductType } from 'Types/ContentTypes'
import { ImageBox } from 'Components/Media'
import { Header3 } from 'Components/Type'

const Title = styled(Header3)`
	${({ theme }) => css`
		opacity: 0;
		margin-bottom: 0;
		font-family: ${theme.type.fontFamily.serif};
		font-weight: ${theme.type.weight.normal};

		${theme.media.queries.phone`
		opacity: 1;
	`}
	`}
`

const Wrapper = styled.div`
	&:hover ${Title} {
		opacity: 1;
	}
`

const ImageContainer = styled.div`
	background-color: rgba(225, 225, 255, 0.2);
`

/**
 * ProductThumbnail
 */

type Props = {
	collection: CollectionType,
	product: ProductType,
}

const ProductThumbnail = ({ collection, product }: Props) => (
	<Link to={`/products/${product.handle}`}>
		<Wrapper>
			<ImageContainer key={product.handle} collection={collection}>
				<ImageBox ratio={1} sizes="(min-width: 600px) 500px, 250px" image={product.images && product.images[0]} />
			</ImageContainer>
			<Title>{product.title}</Title>
		</Wrapper>
	</Link>
)

export default ProductThumbnail
