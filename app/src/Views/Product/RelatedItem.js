// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import type { PageLink as PageLinkType } from 'Types/ContentTypes'
import PageLink from 'Components/ContentBlocks/PageLink'

const Wrapper = styled.div`
	${({ theme }) => css`
		margin: 0 ${theme.layout.spacing.single};
		flex-basis: calc(33% - ${theme.layout.spacing.double});
	`}
`

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
			<PageLink item={item} number={number} showHover imageSizes="240px" />
		</Wrapper>
	)
}

export default RelatedItem
