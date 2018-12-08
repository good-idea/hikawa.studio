// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { PageLink as PageLinkType } from 'Types/ContentTypes'
import PageLink from 'Components/ContentBlocks/PageLink'

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
	item: PageLinkType,
	number: number,
}

const RelatedItem = ({ item, number }: Props) => {
	if (!item.link) return null
	return (
		<Wrapper>
			<PageLink item={item} number={number} />
		</Wrapper>
	)
}

export default RelatedItem
