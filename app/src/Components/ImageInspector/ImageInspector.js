// @flow
import * as React from 'react'
import { Grid } from 'Components/Layout'
import Thumbnail from './Thumbnail'
import MainImage from './MainImage'
import { InspectorConsumer } from './InspectorContext'

/**
 * ImageInspector
 */

const ImageInspector = () => {
	return (
		<InspectorConsumer>
			{(value) => {
				const { images, selectImage, currentImage } = value
				if (!images.length || !currentImage) return null
				return (
					<div>
						<MainImage image={currentImage} />
						<Grid columns={4}>
							{images.map((image) => (
								<Thumbnail
									key={image.id}
									image={image}
									onClick={selectImage(image.id)}
									isCurrentImage={currentImage === image.id}
								/>
							))}
						</Grid>
					</div>
				)
			}}
		</InspectorConsumer>
	)
}

export default ImageInspector
