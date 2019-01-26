// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import type { ProductType, ProductVariant } from 'Types/ContentTypes'
import type { CheckoutConsumerProps } from 'Views/CheckoutProvider'
import type { SiteSettings } from 'Types/ContentTypes'
import { Header2, Header4, P } from 'Components/Type'
import Text from 'Components/ContentBlocks/Text'
// import { InspectorConsumer } from 'Components/ImageInspector'
import { InspectorConsumer } from 'Components/ImageInspector'
import { Button } from 'Components/Buttons'
import { sleep } from 'Utils'
import { SettingsConsumer } from 'Views/SettingsProvider'
import VariantSelector from './VariantSelector'

const Title = styled(Header2)`
	${({ theme }) => css`
		margin-top: 0;

		${theme.media.queries.phone`
			display: none;
		`}
	`}
`

const ExtraDescription = styled.div`
	${({ theme }) => `
		color: ${theme.color.darkGray};
		margin: ${theme.layout.spacing.double} 0;
	`}
`

const ShowCartButton = styled.button`
	${({ theme, visible }) => `
		opacity: ${visible ? '1' : '0'};
		pointer-events: ${visible ? 'auto' : 'none'};
		margin: ${theme.layout.spacing.single} 0;
		transform: ${visible ? 'none' : 'translateX(-10px)'};
		transition: 0.2s;
		transition-delay: ${visible ? '0.4s' : '0'};
	`}
`

const VariantWrapper = styled.div`
	${({ theme }) => css`
		${theme.media.queries.phone`
			text-align: center;
		`}
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
	cart: CheckoutConsumerProps,
}

type State = {
	selectedVariant?: ProductVariant,
	buttonState: string,
}

class ProductDescription extends React.Component<Props, State> {
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
		const { addToCart } = this.props.cart
		if (!selectedVariant) return
		await addToCart({ lineItems: [{ variantId: selectedVariant.id, quantity: 1 }] })
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
			case 'normal':
			default:
				return 'Add To Tote'
		}
	}

	render() {
		const { product, settings, cart } = this.props
		const { selectedVariant } = this.state
		const showCartButton = cart && cart.currentCart && cart.currentCart.lineItems ? cart.currentCart.lineItems.length > 0 : false
		return (
			<Wrapper>
				<Title>{product.title}</Title>
				<P>{product.description}</P>
				{settings && settings.product && settings.product.text ? (
					<ExtraDescription>
						<Text blocks={settings.product.text} />
					</ExtraDescription>
				) : null}
				<VariantWrapper>
					<VariantSelector
						variants={product.variants || []}
						selectVariant={this.selectVariant}
						selectedVariant={selectedVariant}
					/>
					<Button
						size="medium"
						onClick={this.addSelectedVariantToCart}
						disabled={selectedVariant === undefined || selectedVariant.availableForSale === false}
					>
						{this.renderButtonText()}
					</Button>
					<br />
					<ShowCartButton onClick={cart.openCart} visible={showCartButton}>
						<Header4 color="pink" weight="semi">
							→ Continue to Checkout
						</Header4>
					</ShowCartButton>
				</VariantWrapper>
			</Wrapper>
		)
	}
}

type BaseProps = {
	product: ProductType,
	cart: CheckoutConsumerProps,
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
