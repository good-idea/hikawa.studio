// @flow
import * as React from 'react'
import { setCookie, getCookie, VIEWER_CART_TOKEN } from 'Utils/storage'
import { CheckoutQuery } from './queries'

/**
 * CurrentCart
 */

type Props = {
	children?: ({}) => React.Node,
}

type State = {
	checkoutId: string | null,
}

class CurrentCart extends React.Component<Props, State> {
	static defaultProps = {
		children: () => null,
	}

	state = {
		checkoutId: getCookie(VIEWER_CART_TOKEN),
	}

	updateCheckoutId = (checkoutId: string) => {
		setCookie(VIEWER_CART_TOKEN, checkoutId)
		this.setState({ checkoutId })
	}

	render() {
		const { children } = this.props
		const { checkoutId } = this.state
		const { updateCheckoutId } = this
		if (!children) return null
		return (
			<CheckoutQuery LoadingComponent={false} variables={{ id: checkoutId }} delayQuery={!checkoutId}>
				{(result) => {
					const { data, loading, refetch } = result
					return children({ loading, currentCart: data && data.node, updateCheckoutId, refetchCart: refetch })
				}}
			</CheckoutQuery>
		)
	}
}

export default CurrentCart
