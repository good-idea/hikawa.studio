// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { CheckoutLineItem } from 'Types/CheckoutTypes'

const Wrapper = styled.div``

const Input = styled.input`
	border: 1px solid lightGray;
	padding: 10px;
	width: 40px;
	height: 40px;

	&:focus {
		border-color: black;
	}

	&::-webkit-inner-spin-button,
	&::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`

type Props = {
	item: CheckoutLineItem,
	updateQuantity: (number) => Promise<void>,
}

type State = {
	quantity: number,
	focused: boolean,
	loading: boolean,
}

class Quantity extends React.Component<Props, State> {
	state = {
		quantity: this.props.item.quantity,
		focused: false,
		loading: false,
	}

	onChange = (e: SyntheticInputEvent<any>) => {
		const value = parseInt(e.target.value.replace(/\D/g, ''), 10) || 1
		const quantity = Math.max(value, 1)
		this.setState({ quantity })
	}

	increase = () => {
		this.setState(({ quantity }) => ({ quantity: quantity + 1 }))
	}

	decrease = () => {
		this.setState(({ quantity }) => ({ quantity: Math.max(1, quantity - 1) }))
	}

	remove = async () => {
		await this.setState({ loading: true })
		const { updateQuantity } = this.props
		await updateQuantity(0)
		this.setState({ loading: false })
	}

	submitUpdate = async () => {
		await this.setState({ loading: true })
		const { updateQuantity } = this.props
		const { quantity } = this.state
		await updateQuantity(quantity)
		this.setState({ loading: false })
	}

	onFocus = () => {
		this.setState({ focused: true })
	}

	onBlur = () => {
		this.setState({ focused: false })
		this.submitUpdate()
	}

	render() {
		const { quantity, focused, loading } = this.state
		return (
			<Wrapper focused={focused} loading={loading}>
				<Input type="number" value={quantity} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
				<button type="button" onClick={this.submitUpdate}>
					update
				</button>
				<button type="button" onClick={this.increase}>
					+
				</button>
				<button type="button" onClick={this.decrease}>
					-
				</button>
				<button type="button" onClick={this.remove}>
					remove
				</button>
			</Wrapper>
		)
	}
}

export default Quantity
