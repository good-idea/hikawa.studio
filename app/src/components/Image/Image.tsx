import * as React from 'react'
import { Maybe } from '../../types'
import {
  ImageType,
  getAspectRatio,
  getImageDetails,
  getImageKey,
} from './utils'
import { Heading } from '../Text'
import {
  MainImage,
  HoverImage,
  HoverImageWrapper,
  Wrapper,
  Picture,
  RatioImageFill,
  PreloadWrapper,
} from './styled'
import { useInViewport } from '../../utils'

/**
 * A placeholder box to enforce image size
 */

interface RatioPaddingProps {
  ratio: number
  canvasFill?: boolean
}

const RatioPadding = ({ ratio, canvasFill }: RatioPaddingProps) => {
  const [src, setSrc] = React.useState<string | void>(undefined)

  React.useEffect(() => {
    if (!canvasFill) return
    const canvas = window.document.createElement('canvas')
    canvas.setAttribute('width', '1600')
    canvas.setAttribute('height', `${1600 * ratio}`)
    const ctx = canvas.getContext('2d')

    if (!ctx) return
    ctx.beginPath()
    ctx.rect(0, 0, 1600, 1600 * ratio)
    ctx.fillStyle = 'rgba(220, 220, 220, 0)'
    ctx.fill()
    const srcData = canvas.toDataURL('image/png')
    setSrc(srcData)
  }, [ratio, canvasFill])

  const paddingBottom = src ? 0 : `${ratio * 100}%`
  return (
    <RatioImageFill style={{ paddingBottom }} aria-hidden>
      {src ? <img src={src} /> : null}
    </RatioImageFill>
  )
}

interface ImageProps {
  image?: Maybe<ImageType> | void
  altText?: Maybe<string>
  hoverImage?: Maybe<ImageType>
  ratio?: number | null
  sizes?: string
  onLoad?: () => void
  preloadImages?: ImageType[]
  preload?: boolean
  canvasFill?: boolean
  objectFit?: string
}

export const ImageWrapper = Wrapper

export const Image = ({
  image,
  sizes: customSizes,
  hoverImage,
  altText: customAltText,
  onLoad,
  preload,
  ratio: customRatio,
  canvasFill,
  preloadImages,
  objectFit,
}: ImageProps) => {
  const sizes = customSizes || '100vw'
  const [loaded, setLoaded] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const imageRef = React.useRef<HTMLImageElement>(null)
  const { isInViewOnce } = useInViewport(containerRef)

  const imageDetails = React.useMemo(() => getImageDetails(image), [image])

  const { caption, src, altText: cmsAltText, srcSet, srcSetWebp } =
    imageDetails || {}

  const altText = customAltText || cmsAltText
  const hoverDetails = React.useMemo(
    () => (hoverImage ? getImageDetails(hoverImage) : null),
    [hoverImage],
  )

  React.useEffect(() => {
    if (imageRef.current === null) return
    if (imageRef.current.complete) {
      // setLoaded(true)
    }
  }, [imageRef.current])

  React.useEffect(() => {
    if (!onLoad) return
    const timeoutId = setTimeout(onLoad, 800)
    return () => clearTimeout(timeoutId)
  }, [loaded])

  const handleOnLoad = () => {
    setLoaded(true)
  }

  const ratio =
    customRatio === null ? null : customRatio || getAspectRatio(image)

  return (
    <Wrapper ref={containerRef}>
      {ratio ? <RatioPadding canvasFill={canvasFill} ratio={ratio} /> : null}
      {src && (preload || isInViewOnce) ? (
        <>
          <Picture objectFit={objectFit} loaded={true}>
            {srcSetWebp ? (
              <source type="image/webp" srcSet={srcSetWebp} sizes={sizes} />
            ) : null}
            {srcSet ? (
              <source type="image/jpg" srcSet={srcSet} sizes={sizes} />
            ) : null}
            <MainImage
              src={src}
              alt={altText || ''}
              ref={imageRef}
              onLoad={handleOnLoad}
            />
          </Picture>
          {hoverDetails && hoverDetails.src ? (
            <HoverImageWrapper>
              {hoverDetails.srcSetWebp ? (
                <source
                  type="image/webp"
                  srcSet={hoverDetails.srcSetWebp}
                  sizes={sizes}
                />
              ) : null}
              {hoverDetails.srcSet ? (
                <source
                  type="image/jpg"
                  srcSet={hoverDetails.srcSet}
                  sizes={sizes}
                />
              ) : null}
              <HoverImage
                src={hoverDetails.src}
                alt={altText || ''}
                ref={imageRef}
                onLoad={handleOnLoad}
              />
            </HoverImageWrapper>
          ) : null}
          {caption ? (
            <Heading my={0} mt="7px" level={5}>
              {caption}
            </Heading>
          ) : null}
        </>
      ) : null}
      {isInViewOnce && preloadImages && preloadImages.length ? (
        <PreloadWrapper>
          {preloadImages.map((p) => (
            <Image
              key={getImageKey(p)}
              image={p}
              onLoad={handleOnLoad}
              sizes={sizes}
              preload
            />
          ))}
        </PreloadWrapper>
      ) : null}
    </Wrapper>
  )
}
