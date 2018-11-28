// @flow
import * as React from 'react'
import type { CollectionType } from 'Types/CollectionTypes'
import ShopQuery from './ShopQuery'
import Collection from './Collection'

/**
 * Shop
 */

type Props = {
	collections: Array<CollectionType>,
}

const Shop = ({ collections }: Props) =>
	collections ? (
		<React.Fragment>
			{collections.map((c) => (
				<Collection key={c.id} collection={c} />
			))}
		</React.Fragment>
	) : null

export default () => <ShopQuery>{({ data }) => <Shop collections={data.shop.collections} />}</ShopQuery>
