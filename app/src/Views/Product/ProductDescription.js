// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import type { ProductType, ProductVariant, SiteSettings } from 'Types/ContentTypes'
import type { CheckoutConsumerProps } from 'Views/CheckoutProvider'
import { Header2, P } from 'Components/Type'
import Text from 'Components/ContentBlocks/Text'
// import { InspectorConsumer } from 'Components/ImageInspector'
import { InspectorConsumer } from 'Components/ImageInspector'
import { Button } from 'Components/Buttons'
import { sleep } from 'Utils'
import { SettingsConsumer } from 'Views/SettingsProvider'
import VariantSelector from './VariantSelector'
import SuccessMessage from './SuccessMessage'
import ReactPixel from 'react-facebook-pixel'

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

const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-start;
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
	success: boolean,
}

class ProductDescription extends React.Component<Props, State> {
	state = {
		selectedVariant: this.props.product.variants ? this.props.product.variants[0] : undefined,
		buttonState: 'normal',
		success: false,
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.product.id !== this.props.product.id) {
			this.setState({
				selectedVariant: nextProps.product.variants ? nextProps.product.variants[0] : undefined,
				buttonState: 'normal',
			})
		}
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
		try {
			ReactPixel.track('AddToCart', {
				content_ids: [this.props.product.id], // Product IDs
				content_name: this.props.product.title, // Name of the Page/Product
				content_type: 'product',
        contents: [{ id: this.props.product.id, quantity: 1 }],
				currency: 'USD',
			})
		} catch (err) {
			console.warn(err)
		}

		this.setState({ buttonState: 'success', success: true })
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
		const { selectedVariant, success } = this.state
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
					<ButtonContainer>
						<Button
							size="medium"
							onClick={this.addSelectedVariantToCart}
							disabled={selectedVariant === undefined || selectedVariant.availableForSale === false}
						>
							{this.renderButtonText()}
						</Button>
						<SuccessMessage openCart={cart.openCart} success={success} />
					</ButtonContainer>
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
		{({ siteSettings }) =>
			siteSettings ? (
				<InspectorConsumer>
					{({ selectImage }) => <ProductDescription selectImage={selectImage} settings={siteSettings} {...props} />}
				</InspectorConsumer>
			) : null
		}
	</SettingsConsumer>
)
