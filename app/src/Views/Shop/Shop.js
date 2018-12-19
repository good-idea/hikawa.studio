// @flow
import * as React from 'react'
import type { CollectionType } from 'Types/ProductTypes'
import Hero from 'Components/Hero'
import ShopQuery from './ShopQuery'
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

export default () => <ShopQuery>{({ data }) => <Shop collections={data.shop.collections} shopPage={data.shopPage} />}</ShopQuery>
