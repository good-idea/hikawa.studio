// @flow
import React from 'react'
import type { ProductType } from 'Types/ProductTypes'
import { Link } from 'react-router-dom'

/**
 * ProductCard
 */

type Props = {
	product: ProductType,
}

const ProductCard = ({ product }: Props) => {
	return (
		<div>
			{product.title}
			<Link to={`/products/${product.handle}`}>
				<img alt={product.title} src={product.images[0].originalSrc} />
			</Link>
		</div>
	)
}

export default ProductCard
