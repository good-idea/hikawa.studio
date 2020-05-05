// @flow
import * as React from 'react'
import styled from 'styled-components'
import { adopt } from 'react-adopt'
import ReactPixel from 'react-facebook-pixel'
import { Button, SecondaryButton } from 'Components/Buttons'
import Modal from 'Components/Modal'
import { Header1, Header3, Header5 } from 'Components/Type'
import type { CheckoutConsumerProps } from '../CheckoutProvider'
import { CheckoutConsumer } from '../CheckoutProvider'
import CartLineItem from './CartLineItem'
import CartSummary from './CartSummary'
import { CouponCode, NoteInput } from './Inputs'
import { InputWrapper, CheckoutText, CheckoutTextWrapper } from './styled'
import { isReactProduction } from '../../Utils/env'
import { useSettings } from '../SettingsProvider'
import Text from 'Components/ContentBlocks/Text'

const { useState, useEffect } = React

const SummaryWrapper = styled.div`
	${({ isLoading }) => `
		opacity: ${isLoading ? '0.5' : '1'};
		pointer-events: ${isLoading ? 'none' : 'auto'};
	`};
`

const LineItems = styled.div`
	padding: 10px;
`

/**
 * Cart
 */

type Props = CheckoutConsumerProps

/**
 * Cart
 */

const Centered = styled.div`
	text-align: center;
`

const Cart = (props: Props) => {
	const { siteSettings } = useSettings()
	const { addNote, currentCart, isOpen, closeCart, updateQuantity, loading, applyDiscount, removeDiscount, userErrors } = props
	const { lineItems } = currentCart || {}

	const [noteInputValue, setNoteInputValue] = useState(currentCart ? currentCart.note || '' : '')

	useEffect(() => {
		if (!currentCart) return
		if (currentCart.note) setNoteInputValue(currentCart.note)
	}, [currentCart])

	const handleCheckoutClick = async () => {
		if (noteInputValue !== currentCart.note) await addNote(noteInputValue)
		if (!lineItems.length) return
		const lineItemIds = lineItems.map((item) => item.id)
		const contents = lineItems.map((item) => ({
			id: item.id,
			quantity: item.quantity,
		}))
		const totalQuantity = lineItems.reduce((acc, item) => acc + item.quantity, 0)
		if (isReactProduction()) {
			ReactPixel.track('InitiateCheckout', {
				content_category: '',
				content_ids: lineItemIds,
				contents,
				currency: 'USD',
				num_items: totalQuantity,
			})
		}
		window.location = currentCart.webUrl
	}

	const checkoutText =
		siteSettings && siteSettings.checkout && siteSettings.checkout.text ? siteSettings.checkout.text : undefined

	return (
		<Modal open={isOpen} onBackgroundClick={closeCart}>
			<SummaryWrapper isLoading={loading}>
				{currentCart && lineItems.length ? (
					<>
						<Header1>Your Tote</Header1>
						<LineItems>
							{lineItems && lineItems.map((l) => <CartLineItem key={l.id} item={l} updateQuantity={updateQuantity(l)} />)}
						</LineItems>
						<CartSummary cart={currentCart} applyDiscount={applyDiscount} removeDiscount={removeDiscount} />
						<Centered>
							<InputWrapper>
								<NoteInput noteInputValue={noteInputValue} setNoteInputValue={setNoteInputValue} />
								{checkoutText ? (
									<CheckoutTextWrapper>
										<Text blocks={checkoutText} customWrapper={CheckoutText} />
									</CheckoutTextWrapper>
								) : null}

								<CouponCode applyDiscount={applyDiscount} removeDiscount={removeDiscount} cart={currentCart} />
							</InputWrapper>

							<Button onClick={handleCheckoutClick}>Continue to Checkout</Button>
							{userErrors &&
								userErrors.map((error) => (
									<Header5 key={error} align="center" color="red" weight="normal">
										{error}
									</Header5>
								))}
						</Centered>
					</>
				) : (
					<Header3 align="center">
						Your Tote is empty{' '}
						<span role="img" aria-label="sad">
							😢
						</span>
					</Header3>
				)}
				<Centered>
					<SecondaryButton onClick={closeCart}>Keep Shopping</SecondaryButton>
				</Centered>
			</SummaryWrapper>
		</Modal>
	)
}

const Composed = adopt({
	cart: <CheckoutConsumer />,
})

export default (props) => <Composed>{({ cart }) => <Cart {...cart} {...props} />}</Composed>
