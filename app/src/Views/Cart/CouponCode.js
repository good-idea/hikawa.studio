// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Header5 } from 'Components/Type'
import type { Checkout } from 'Types/CheckoutTypes'
import { Input } from 'Components/Forms'

const Label = styled(Header5)`
	${({ theme }) => `
		font-weight: ${theme.type.weight.normal}
		flex-basis: 100%;
	`};
`

const Wrapper = styled.form`
	flex-wrap: wrap;
	display: flex;
	justify-content: flex-start;
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

/**
 * MyComponent
 */

type Props = {
	applyDiscount: (string) => Promise<void>,
	removeDiscount: () => Promise<void>,
	cart: Checkout,
}

type State = {
	value: string,
}

class CouponCode extends React.Component<Props, State> {
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

	render() {
		const { cart, removeDiscount } = this.props
		const { discountApplications } = cart
		const hasDiscount = Boolean(discountApplications && discountApplications.length)
		const discount = hasDiscount && discountApplications ? discountApplications[0] : null
		const { value } = this.state
		return (
			<Wrapper onSubmit={hasDiscount ? removeDiscount : this.submit}>
				<Label>Promo Code {hasDiscount ? '✓' : ''}</Label>
				<Input
					value={hasDiscount && discount ? `${discount.code || 'Discount Applied'}` : value}
					locked={hasDiscount}
					onChange={this.handleChange}
					name="coupon"
					ref={this.inputRef}
				/>
				<Button type="button" enabled={hasDiscount || value.length > 0} onClick={hasDiscount ? removeDiscount : this.submit}>
					{hasDiscount && discount ? 'Remove' : 'Apply'}
				</Button>
			</Wrapper>
		)
	}
}

export default CouponCode
