// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import type { ProductType, CollectionType } from 'Types/ProductTypes'
import { ImageBox } from 'Components/Media'
import { Header4 } from 'Components/Type'
import { getLinkUrl } from 'Utils/content'

const Wrapper = styled.div`
	${({ theme }) => `
		margin: 0 ${theme.layout.spacing.single};
		width: 200px;
	`}
`

/**
 * RelatedItem
 */

type Props = {
	item: ProductType | CollectionType,
}

const RelatedItem = ({ item }: Props) => {
	const url = getLinkUrl(item)
	const image = item.__typename === 'Collection' ? item.image : item.images && item.images[0]
	return (
		<Wrapper>
			<Link to={url}>
				<ImageBox ratio={1} image={image} sizes="200px" />
				<Header4>{item.title}</Header4>
			</Link>
		</Wrapper>
	)
}

export default RelatedItem
