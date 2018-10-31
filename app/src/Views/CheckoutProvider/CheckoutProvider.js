// @flow
import * as React from 'react'
import type { CheckoutType } from 'Types/CheckoutTypes'
const { Consumer, Provider } = React.createContext()
export const CheckoutConsumer = Consumer

/**
 * CheckoutProvider
 */

type Props = {
	children: React.Node,
}

type State = {
	items: Array<string>,
	currentCheckout: null | CheckoutType,
}

export class CheckoutProvider extends React.Component<Props, State> {
	static defaultProps = {
		// ...
	}

	state = {
		items: [],
		currentCheckout: null,
	}

	addToCart = async (newItem: string): Promise<void> => {
		console.log('adding', newItem)
		this.setState(({ items }) => ({
			items: [...items, newItem],
		}))
	}

	render() {
		const { children } = this.props
		const { items } = this.state
		const value = {
			addToCart: this.addToCart,
			items,
		}

		return <Provider value={value}>{children}</Provider>
	}
}
