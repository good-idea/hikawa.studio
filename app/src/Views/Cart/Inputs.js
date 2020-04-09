// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Header5 } from 'Components/Type'
import type { Checkout } from 'Types/CheckoutTypes'
import { Input, TextArea } from 'Components/Forms'
import { useCheckout } from '../CheckoutProvider'

const { useState } = React

const Label = styled(Header5)`
	${({ theme }) => `
		font-weight: ${theme.type.weight.normal}
		flex-basis: 100%;
	`};
`

const NoteWrapper = styled.form`
	flex-wrap: wrap;
	flex-direction: column;
	display: block;
	justify-content: flex-start;

	textarea {
		min-width: 300px;
		display: block;
		margin-bottom: 8px;
	}
`

const CouponWrapper = styled.form`
	margin-top: 20px;
	margin-bottom: 20px;
	display: flex;
	flex-wrap: wrap;

	h5 {
		flex-basis: 1;
	}

	input {
		flex-grow: 1;
		max-width: initial;
	}

	button {
		margin-top: 0;
	}
`

const Button = styled.button`
	${({ enabled }) => `
		opacity: ${enabled ? '1' : '0.25'};
		pointer-events: ${enabled ? 'auto' : 'none'};
		height: 35px;
		padding: 10px;
		border: 1px solid black;
		color: black;
		text-transform: uppercase;
		font-weight: 600;
	`};
`

export const NoteInput = () => {
	const { addNote, currentCart } = useCheckout()
	const [inputValue, setInputValue] = useState(currentCart.note || '')

	const handleChange = (e) => {
		setInputValue(e.target.value)
	}

	const handleSubmit = (e) => {
		if (e) e.preventDefault()
		addNote(inputValue)
	}

	return (
		<NoteWrapper onSubmit={handleSubmit}>
			<Label>Order notes</Label>
			<TextArea onBlur={handleSubmit} onChange={handleChange} value={inputValue} />
			<Button type="submit" enabled={inputValue.length}>
				Submit
			</Button>
		</NoteWrapper>
	)
}

/**
 * Coupon Code
 */

type Props = {
	applyDiscount: (string) => Promise<void>,
	removeDiscount: () => Promise<void>,
	cart: Checkout,
}

type State = {
	value: string,
}

export class CouponCode extends React.Component<Props, State> {
	inputRef = React.createRef()

	state = {
		value: '',
	}

	handleChange = () => {
		const input = this.inputRef.current
		if (!input) return
		this.setState({ value: input.value.toUpperCase() })
	}

	submit = (e: SyntheticEvent<any>) => {
		e.preventDefault()
		const { cart } = this.props
		const { discountApplications } = cart
		const hasDiscount = discountApplications && discountApplications.length
		if (hasDiscount) return
		const { applyDiscount } = this.props
		applyDiscount(this.state.value)
	}

	removeDiscount = () => {
		const { removeDiscount } = this.props
		this.setState({ value: '' })
		removeDiscount()
	}

	render() {
		const { cart, removeDiscount } = this.props
		const { discountApplications } = cart
		const hasDiscount = Boolean(discountApplications && discountApplications.length)
		const discount = hasDiscount && discountApplications ? discountApplications[0] : null
		const { value } = this.state
		return (
			<CouponWrapper onSubmit={hasDiscount ? removeDiscount : this.submit}>
				<Label>Promo Code {hasDiscount ? '✓' : ''}</Label>
				<Input
					value={hasDiscount && discount ? `${discount.code || 'Discount Applied'}` : value}
					locked={hasDiscount}
					onChange={this.handleChange}
					name="coupon"
					ref={this.inputRef}
					autocomplete="off"
					style={{ marginBottom: '10px' }}
				/>
				<Button type="button" enabled={hasDiscount || value.length > 0} onClick={hasDiscount ? this.removeDiscount : this.submit}>
					{hasDiscount && discount ? 'Remove' : 'Apply'}
				</Button>
			</CouponWrapper>
		)
	}
}

export default CouponCode
