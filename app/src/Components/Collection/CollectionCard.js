// @flow
import React from 'react'
import CollectionType from 'Types/CollectionTypes'
import { Link } from 'react-router-dom'
/**
 * CollectionCard
 */

type Props = {
	collection: CollectionType,
}

const CollectionCard = ({ collection }: Props) => <Link to={`/collections/${collection.handle}`}>{collection.title}</Link>

export default CollectionCard
