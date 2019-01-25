// @flow
import * as React from 'react'
import { Grid } from 'Components/Layout'
import { ImageBox } from 'Components/Media'
import Thumbnail from './Thumbnail'
// import MainImage from './MainImage'
import { InspectorConsumer } from './InspectorContext'

/**
 * ImageInspector
 */

const ImageInspector = () => (
	<InspectorConsumer>
		{(value) => {
			const { images, selectImage, currentImage } = value
			if (!images.length || !currentImage) return null
			return (
				<div>
					<ImageBox ratio={1} image={currentImage} sizes="(min-width: 700px) 100vw, 450px" />
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

export default ImageInspector
