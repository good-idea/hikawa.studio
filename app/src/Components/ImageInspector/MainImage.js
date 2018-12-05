// @flow
import * as React from 'react'
import styled from 'styled-components'
import { ImageBox, Image } from 'Components/Media'
import type { ImageType } from 'Types/ContentTypes'

const ZoomContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`

const ZoomImage = styled.div`
	${({ zoomAmount }) => `
		position: absolute;
		width: ${100 * zoomAmount}%;
		height: ${100 * zoomAmount}%;
		transition: 0.3s cubic-bezier(.06,.69,.52,.96), opacity 0.2s linear;
		opacity: 0;
	`};

	/* Disable hover for now
	&:hover {
		opacity: 1;
	}
	*/

	& > img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`

/**
 * ImageInspector
 */

type Props = {
	image: ImageType,
	zoomAmount?: number,
}

type State = {
	top: string,
	left: string,
}

class ImageInspector extends React.Component<Props, State> {
	static defaultProps = {
		zoomAmount: 2.5,
	}

	container = React.createRef()

	state = {
		top: '0px',
		left: '0px',
	}

	handleZoom = (e: SyntheticMouseEvent<HTMLElement>) => {
		if (!this.container || !this.container.current) return
		const container = this.container.current
		const zoomAmount = this.props.zoomAmount || 2.5
		const { top, left, height, width } = container.getBoundingClientRect()
		const xMax = width * zoomAmount - width
		const yMax = height * zoomAmount - height
		const xPercent = (e.clientX - left) / width
		const yPercent = (e.clientY - top) / height
		const newTop = -(yMax * yPercent)
		const newLeft = -(xMax * xPercent)
		this.setState({
			top: `${newTop}px`,
			left: `${newLeft}px`,
		})
	}

	// container: {
	// 	current: HTMLElement,
	// }

	render() {
		const { image, zoomAmount } = this.props
		const { top, left } = this.state
		const zoomStyle = { top, left }
		return (
			<ImageBox image={image}>
				<ZoomContainer ref={this.container}>
					<ZoomImage style={zoomStyle} zoomAmount={zoomAmount}>
						<Image image={image} />
					</ZoomImage>
				</ZoomContainer>
			</ImageBox>
		)
	}
}

export default ImageInspector
