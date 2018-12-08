// @flow
import * as React from 'react'
import type { ImageType } from 'Types/ContentTypes'

const { Provider, Consumer } = React.createContext({
	// eslint-disable-next-line
	selectImage: (a) => () => {},
	images: [],
	currentImage: null,
})

export const InspectorConsumer = Consumer

/**
 * InspectorProvider
 */

type Props = {
	children: React.Node,
	initialImage?: string,
	images: Array<ImageType>,
}

type State = {
	currentImage: ImageType,
}

export class InspectorProvider extends React.Component<Props, State> {
	static defaultProps = {
		initialImage: undefined,
	}

	state = {
		currentImage: this.props.initialImage ? this.getImageById(this.props.initialImage) : this.props.images[0],
	}

	componentWillReceiveProps(nextProps: Props) {
		const { currentImage } = this.state
		const { images } = nextProps
		if (!images.find((i) => i === currentImage)) {
			this.setState({ currentImage: images[0] })
		}
	}

	getImageById = (imageId: string): ImageType => {
		const image = this.props.images.find((i) => i.id === imageId)
		if (!image) {
			throw new Error(`No image with id "${imageId}" was found.`)
		}
		return image
	}

	selectImage = (imageId: string) => () => {
		const newImage = this.getImageById(imageId)
		this.setState({
			currentImage: newImage,
		})
	}

	render() {
		const { currentImage } = this.state
		const { children, images } = this.props
		const value = {
			currentImage,
			images,
			selectImage: this.selectImage,
		}
		return <Provider value={value}>{children}</Provider>
	}
}
