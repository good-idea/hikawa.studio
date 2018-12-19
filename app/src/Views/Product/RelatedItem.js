// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { PageLink as PageLinkType } from 'Types/ContentTypes'
import PageLink from 'Components/ContentBlocks/PageLink'

const Wrapper = styled.div``

/**
 * RelatedItem
 */

type Props = {
	item: PageLinkType,
	number: number,
}

const RelatedItem = ({ item, number }: Props) => {
	if (!item.link) return null
	return (
		<Wrapper>
			<PageLink useDefaultImage item={item} number={number} imageSizes="240px" />
		</Wrapper>
	)
}

export default RelatedItem
