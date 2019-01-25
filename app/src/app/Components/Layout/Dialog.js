// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
	${({ theme, open }) => `
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: ${theme.layout.z.dialog};
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: ${open ? '1' : '0'};
		pointer-events: ${open ? 'auto' : 'none'};
		transition: 0.3s;
	`}
`

const Background = styled.button`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 0;
	background-color: rgba(0, 0, 0, 0.6);
`

const Inner = styled.div`
	${({ theme }) => css`
		z-index: 10;
		width: calc(100% - 5rem);
		max-width: 500px;
		padding: ${theme.layout.spacing.triple};
		background: white;
		border-radius: 2px;
		box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);

		${theme.media.queries.phone`
			width: calc(100% - 20px);
			padding: ${theme.layout.spacing.single};
		`}
	`}
`

/**
 * Dialog
 */

type RenderProps = {
	closeDialog: () => void,
}

type Props = {
	children: (RenderProps) => React.Node,
	delay?: number,
	onClose?: () => any,
}

type State = {
	open: boolean,
}

class Dialog extends React.Component<Props, State> {
	static defaultProps = {
		delay: 0,
		onClose: undefined,
	}

	state = {
		open: false,
	}

	componentDidMount = () => {
		const { delay } = this.props
		this.timeout = setTimeout(() => {
			this.setState({ open: true })
		}, delay)
	}

	componentWillUnmount() {
		clearTimeout(this.timeout)
	}

	close = () => {
		const { onClose } = this.props
		console.log(onClose)
		this.setState({ open: false })
		if (onClose) onClose()
	}

	timeout: TimeoutID

	render() {
		const { children } = this.props
		const { open } = this.state
		const renderProps = {
			closeDialog: this.close,
		}
		return (
			<Wrapper open={open}>
				<Background onClick={this.close} />
				<Inner>{children(renderProps)}</Inner>
			</Wrapper>
		)
	}
}

export default Dialog
