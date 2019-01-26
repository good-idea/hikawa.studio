// @flow
import React from 'react'
import CollectionType from 'Types/ContentTypes'
import { Link } from 'react-router-dom'
/**
 * CollectionCard
 */

type Props = {
	collection: CollectionType,
}

const CollectionCard = ({ collection }: Props) => <Link to={`/collections/${collection.handle}`}>{collection.title}</Link>

export default CollectionCard
