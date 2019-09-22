// @flow
import * as React from 'react'
import styled, { keyframes, css } from 'styled-components'

const fadeIn = keyframes`
	from { opacity: 0; }
	to:  { opacity: 1; }
`

export const Wrapper = styled.div`
	${({ ready }) =>
		ready
			? css`
					opacity: 1;
					animation: ${fadeIn} 2s linear;
			  `
			: css`
					opacity: 0;
			  `}
`

type Props = {
	delay?: number,
	children: React.Node,
}

type State = {
	ready: boolean,
}

export class FadeIn extends React.Component<Props, State> {
	static defaultProps = {
		delay: 0,
	}

	state = {
		ready: !(this.props.delay && this.props.delay >= 0),
	}

	componentDidMount() {
		if (this.props.delay) {
			setTimeout(() => {
				this.setState({ ready: true })
			}, this.props.delay)
		}
	}

	render() {
		const { children } = this.props
		const { ready } = this.state
		return <Wrapper ready={ready}>{children}</Wrapper>
	}
}
