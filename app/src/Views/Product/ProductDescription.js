// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { ProductType, ProductVariant } from 'Types/ProductTypes'
import type { SiteSettings } from 'Types/ContentTypes'
import { Header2, P } from 'Components/Type'
import Text from 'Components/ContentBlocks/Text'
// import { InspectorConsumer } from 'Components/ImageInspector'
import { InspectorConsumer } from 'Components/ImageInspector'
import { Button } from 'Components/Buttons'
import { sleep } from 'Utils'
import { SettingsConsumer } from 'Views/SettingsProvider'
import VariantSelector from './VariantSelector'

const Title = styled(Header2)`
	margin-top: 0;
`

const ExtraDescription = styled.div`
	${({ theme }) => `
		color: ${theme.color.darkGray};
		margin: ${theme.layout.spacing.double} 0;
	`}
`

/**
 * ProductDescription
 */

const Wrapper = styled.div`
	text-align: left;
`

type Props = {
	product: ProductType,
	settings: SiteSettings,
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
		const { product, settings } = this.props
		const { selectedVariant } = this.state

		return (
			<Wrapper>
				<Title>{product.title}</Title>
				<P>{product.description}</P>
				{settings && settings.product && settings.product.text ? (
					<ExtraDescription>
						<Text blocks={settings.product.text} />
					</ExtraDescription>
				) : null}
				<VariantSelector variants={product.variants || []} selectVariant={this.selectVariant} selectedVariant={selectedVariant} />
				<Button
					size="medium"
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
	addToCart: (any) => Promise<void>,
}

export default (props: BaseProps) => (
	<SettingsConsumer>
		{(settings) =>
			settings ? (
				<InspectorConsumer>
					{({ selectImage }) => <ProductDescription selectImage={selectImage} settings={settings} {...props} />}
				</InspectorConsumer>
			) : null
		}
	</SettingsConsumer>
)
