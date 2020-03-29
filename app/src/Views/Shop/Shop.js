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

const Shop = ({ collections, shopPage, params }: Props) => {
	const activeCollection = params.collection
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
