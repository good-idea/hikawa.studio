// @flow
import * as React from 'react'
import type { CollectionType } from 'Types/ContentTypes'
import Hero from 'Components/Hero'
import Collection from './Collection'

/**
 * Shop
 */

type Props = {
	collections: Array<CollectionType>,
	shopPage: any,
}

const Shop = ({ collections, shopPage }: Props) => {
	return collections ? (
		<React.Fragment>
			<Hero hero={shopPage.hero} />
			{collections.map((c) => (
				<Collection key={c.id} collection={c} />
			))}
		</React.Fragment>
	) : null
}

type BaseProps = {
	data: any,
}

export default ({ data }: BaseProps) => <Shop collections={data.shop.collections} shopPage={data.shopPage} />

// export default () => (
// 	<Query query={shopQuery}>{({ data }) => <Shop collections={data.shop.collections} shopPage={data.shopPage} />}</Query>
// )
