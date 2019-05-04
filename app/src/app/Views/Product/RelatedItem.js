// @flow
import * as React from 'react'
import type { PageLink as PageLinkType } from 'Types/ContentTypes'
import PageLink from 'Components/ContentBlocks/PageLink'

/**
 * RelatedItem
 */

type Props = {
	item: PageLinkType,
	number: number,
}

const RelatedItem = ({ item, number }: Props) => {
	if (!item.link) return null
	return <PageLink useDefaultImage item={item} number={number} imageSizes="240px" />
}

export default RelatedItem
