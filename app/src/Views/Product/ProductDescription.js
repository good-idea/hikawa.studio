// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { ProductType, ProductVariant } from 'Types/ProductTypes'
import type { CheckoutConsumerProps } from 'Views/CheckoutProvider'
import { Header1, Header4, P } from 'Components/Type'
// import { InspectorConsumer } from 'Components/ImageInspector'
import { InspectorConsumer } from 'Components/ImageInspector'
import { Button } from 'Components/Buttons'
import { sleep } from 'Utils'
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
	buttonState: string,
}

class ProductDescription extends React.Component<Props, State> {
	static defaultProps = {
		// ...
	}

	state = {
		selectedVariant: undefined,
		buttonState: 'normal',
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

	addSelectedVariantToCart = async () => {
		this.setState({ buttonState: 'loading' })
		const { selectedVariant } = this.state
		const { addToCart } = this.props
		if (!selectedVariant) return
		const added = await addToCart({ lineItems: [{ variantId: selectedVariant.id, quantity: 1 }] })
		console.log(added)
		this.setState({ buttonState: 'success' })
		await sleep(1500)
		this.setState({ buttonState: 'normal' })
	}

	renderButtonText = () => {
		const { buttonState } = this.state
		switch (buttonState) {
			case 'loading':
				return '...'
			case 'success':
				return '✓ Added to Cart'
			case 'normal':
			default:
				return 'Add To Cart'
		}
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
					{this.renderButtonText()}
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
