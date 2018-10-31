// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { ProductType } from 'Types/ProductTypes'
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
}

type State = {
	selectedVariant: void | string,
}

class ProductDescription extends React.Component<Props, State> {
	static defaultProps = {
		// ...
	}

	state = {
		selectedVariant: undefined,
	}

	selectVariant = (variantId: string) => () => {
		const { selectImage, product } = this.props
		this.setState(
			{
				selectedVariant: variantId,
			},
			() => {
				const variant = product.variants && product.variants.find((v) => v.id === variantId)
				if (variant && variant.image) selectImage(variant.image.id)()
			},
		)
	}

	addSelectedVariantToCart = () => {
		const { selectedVariant } = this.state
		const { cart } = this.props
		cart.addToCart(selectedVariant)
	}

	render() {
		const { product } = this.props
		const { selectedVariant } = this.state
		return (
			<Wrapper>
				<Header1>{product.title}</Header1>
				<P>{product.description}</P>
				<VariantSelector variants={product.variants || []} selectVariant={this.selectVariant} selectedVariant={selectedVariant} />
				<Button onClick={this.addSelectedVariantToCart} disabled={selectedVariant === undefined}>
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
