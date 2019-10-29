// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import { Button } from 'Components/Buttons'

const ShowCartButton = styled(Button)`
	${({ theme }) => css`
		margin-left: ${theme.layout.spacing.single};
		font-size: ${theme.type.size.h4};
		font-weight: ${theme.type.weight.semi};
		color: ${theme.color.pink};
		display: inline;
		position: relative;
		text-transform: initial;
		border: none;

		&:hover {
			box-shadow: none;
		}
		${theme.media.queries.phone`
      margin-top: 5px;
text-align: center;
    `}
	`}
`

const PriceMessage = styled.span`
	${({ visible, shift, theme }) => css`
		position: absolute;
		left: 0;
		top: 0;
		white-space: nowrap;
		height: 100%;
		display: flex;
		align-items: center;

		opacity: ${visible ? 1 : 0};
		transition: 0.4s;
		transform: translateY(${shift === 'down' ? '-15px' : shift === 'up' ? '15px' : '0'});

		${theme.media.queries.phone`
      width: 100%;
      text-align: center;
      display: block;
      & + & {
      position: static;
}
    `}
	`}
`

/**
 * SuccessMessage
 */

type Props = {
	openCart: () => void,
	success: boolean,
}

type State = {
	showCheckoutText: boolean,
}

class SuccessMessage extends React.Component<Props, State> {
	state = {
		showCheckoutText: false,
	}

	componentWillReceiveProps(nextProps: Props) {
		if (this.props.success === false && nextProps.success) {
			this.timeout = setTimeout(() => {
				this.setState({ showCheckoutText: true })
			}, 2000)
		}
	}

	componentWillUnmount() {
		if (this.timeout) clearTimeout(this.timeout)
	}

	timeout: null | TimeoutID

	render() {
		const { openCart, success } = this.props
		const { showCheckoutText } = this.state
		return (
			<ShowCartButton onClick={openCart}>
				<PriceMessage
					visible={success && !showCheckoutText}
					shift={success && !showCheckoutText ? 'none' : success && showCheckoutText ? 'down' : 'up'}
				>
					<span role="img" aria-label="sparkles">
						✨
					</span>
					Added to your Tote
				</PriceMessage>
				<PriceMessage visible={success && showCheckoutText} shift={success && showCheckoutText ? 'none' : 'up'}>
					→ Continue to Checkout
				</PriceMessage>
			</ShowCartButton>
		)
	}
}

export default SuccessMessage
