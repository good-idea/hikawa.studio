// @flow
import * as React from 'react'
import type { CollectionType } from 'Types/ContentTypes'
import Hero from 'Components/Hero'
import Helmet from 'Components/Helmet'
import Collection from './Collection'
/**
 * Shop
 */

type Props = {
	collections: Array<CollectionType>,
	shopPage: any,
}

const Shop = ({ collections: sourceCollections, shopPage, params }: Props) => {
	const activeCollection = params.collection
	const collectionHandles = shopPage.collections ? shopPage.collections.map((coll) => coll.shopifyItem.handle) : null

	console.log(collectionHandles)
	console.log(sourceCollections)
	const collections = collectionHandles
		? collectionHandles.map((handle) => sourceCollections.find((c) => c.handle === handle)).filter(Boolean)
		: sourceCollections

	console.log(collections)
	const { seo } = shopPage
	return collections ? (
		<>
			<Helmet seo={seo} />
			<Hero hero={shopPage.hero} />
			{collections.map((c) => (
				<Collection key={c.id} isActive={activeCollection === c.handle} collection={c} />
			))}
		</>
	) : null
}

type BaseProps = {
	data: any,
}

export default ({ data, ...rest }: BaseProps) => <Shop collections={data.shop.collections} shopPage={data.shopPage} {...rest} />
