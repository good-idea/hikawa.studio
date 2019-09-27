// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import type { CheckoutLineItem } from 'Types/CheckoutTypes'
import { CartGridSegment, CartLineItemWrapper } from './styled'

const InputWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

const Input = styled.input`
	border: 1px solid rgba(0, 0, 0, 0.5);
	padding: 10px;
	width: 35px;
	height: 35px;
	text-align: center;
	margin: 0 5px;
	-moz-appearance: textfield;

	&::-webkit-inner-spin-button,
	&::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	${({ theme }) => `
		font-size: ${theme.type.size.h5};
		font-weight: ${theme.type.weight.semi};
		color: black;
	`};
`

export const CartButton = styled.button`
	${({ theme, isIncrementor }) => css`
		opacity: 0;
		margin: ${theme.layout.spacing.half} 0;
		font-size: ${theme.type.size.h5};
		font-weight: ${theme.type.weight.semi};
		color: ${theme.color.middleGray};

		${CartLineItemWrapper}:hover & {
			opacity: 1;
		}

		&:hover {
			color: black;
		}

		${theme.media.queries.tablet`
			opacity: 1;
			${isIncrementor ? 'display: none' : ''};
		`}
	`};
`

type Props = {
	item: CheckoutLineItem,
	updateQuantity: (number) => Promise<void>,
}

type State = {
	quantity: null | number,
}

class Quantity extends React.Component<Props, State> {
	state = {
		quantity: this.props.item.quantity,
	}

	onChange = (e: SyntheticInputEvent<any>) => {
		const currentQuantity = this.state.quantity
		if (this.debounceTimeout) clearTimeout(this.debounceTimeout)
		const value = e.target.value

		if (!value.length) {
			this.setState({ quantity: null })
			return
		}

		const quantity = Math.max(parseInt(e.target.value.replace(/\D/g, ''), 10) || 1, 1)
		// const quantity = Math.max(value, 1)
		this.setState({ quantity })
		if (quantity > 0 && quantity !== currentQuantity) {
			this.debounceTimeout = setTimeout(this.submitUpdate, 800)
		}
	}

	adjust = (adjustment: number) => async () => {
		if (this.debounceTimeout) clearTimeout(this.debounceTimeout)
		clearTimeout(this.debounceTimeout)
		await this.setState(({ quantity }) => ({ quantity: Math.max(0, quantity + adjustment) }))
		this.debounceTimeout = setTimeout(this.submitUpdate, 800)
	}

	remove = async () => {
		const { updateQuantity } = this.props
		await updateQuantity(0)
	}

	submitUpdate = async () => {
		if (this.debounceTimeout) clearTimeout(this.debounceTimeout)
		const { updateQuantity } = this.props
		const { quantity } = this.state
		await updateQuantity(quantity)
	}

	onBlur = () => {
		const { quantity } = this.state
		if (!quantity || quantity < 1) {
			this.setState({ quantity: this.props.item.quantity })
		} else {
			this.submitUpdate()
		}
	}

	debounceTimeout: TimeoutID

	render() {
		const { quantity } = this.state
		return (
			<CartGridSegment align="center">
				<CartButton onClick={this.remove}>remove</CartButton>
				<InputWrapper>
					<CartButton isIncrementor onClick={this.adjust(1)}>
						<span aria-label="Increase Quantity" role="img">
							➕
						</span>
					</CartButton>
					<Input type="number" value={quantity || ''} onChange={this.onChange} onBlur={this.onBlur} />
					<CartButton isIncrementor onClick={this.adjust(-1)}>
						<span aria-label="Decrease Quantity" role="img">
							➖
						</span>
					</CartButton>
				</InputWrapper>
				<CartButton onClick={this.submitUpdate}>update</CartButton>
			</CartGridSegment>
		)
	}
}

export default Quantity
