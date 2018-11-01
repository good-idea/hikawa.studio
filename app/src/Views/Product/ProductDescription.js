// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { ProductType, ProductVariant } from 'Types/ProductTypes'
import type { CheckoutConsumerProps } from 'Views/CheckoutProvider'
import { Header1, Header4, P } from 'Components/Type'
// import { InspectorConsumer } from 'Components/ImageInspector'
import { InspectorConsumer } from 'Components/ImageInspector'
import { Button } from 'Components/Buttons'
import VariantSelector from './VariantSelector'
/**
 * ProductDescription
 */

const Wrapper = styled.div`
	text-align: left;
`

type Props = {
	product: ProductType,
	selectImage: (string) => () => void,
	addToCart: (any) => Promise<void>,
}

type State = {
	selectedVariant?: ProductVariant,
}

class ProductDescription extends React.Component<Props, State> {
	static defaultProps = {
		// ...
	}

	state = {
		selectedVariant: undefined,
	}

	selectVariant = (variant: ProductVariant) => () => {
		const { selectImage } = this.props
		this.setState(
			{
				selectedVariant: variant,
			},
			() => {
				if (variant && variant.image) selectImage(variant.image.id)()
			},
		)
	}

	addSelectedVariantToCart = () => {
		const { selectedVariant } = this.state
		const { addToCart } = this.props
		if (!selectedVariant) return
		addToCart({ lineItems: [{ variantId: selectedVariant.id, quantity: 1 }] })
	}

	render() {
		const { product } = this.props
		const { selectedVariant } = this.state
		return (
			<Wrapper>
				<Header1>{product.title}</Header1>
				<P>{product.description}</P>
				<VariantSelector variants={product.variants || []} selectVariant={this.selectVariant} selectedVariant={selectedVariant} />
				<Button
					onClick={this.addSelectedVariantToCart}
					disabled={selectedVariant === undefined || selectedVariant.availableForSale === false}
				>
					Add To Cart
				</Button>
			</Wrapper>
		)
	}
}

type BaseProps = {
	product: ProductType,
}

export default (props: BaseProps) => (
	<InspectorConsumer>{({ selectImage }) => <ProductDescription selectImage={selectImage} {...props} />}</InspectorConsumer>
)
