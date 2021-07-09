import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import styled, { css } from '@xstyled/styled-components'
import Link from 'next/link'
import { useAnalytics } from '../../providers'
import { ShopifyProduct } from '../../types'
import { Image } from '../Image'
import { Heading } from '../Text'
import { useInViewport } from '../../utils'

const { useEffect, useRef } = React

const Title = styled.div`
  ${({ theme }) => css`
    opacity: 0;
    margin-bottom: 0;

    ${theme.mediaQueries.mobile} {
      opacity: 1;
    }
  `}
`

const Wrapper = styled.div`
  &:hover ${Title} {
    opacity: 1;
  }
`

const ImageContainer = styled.div`
  background-color: rgba(225, 225, 255, 0.2);
`

/**
 * ProductThumbnail
 */

interface ProductThumbnailProps {
  product: ShopifyProduct
  imageRatio?: number
}

export const ProductThumbnail = ({
  imageRatio,
  product,
}: ProductThumbnailProps) => {
  const href = `/products/${product.handle}`
  const availableForSale = product?.sourceData?.availableForSale
  const { sendProductClick, sendProductImpression } = useAnalytics()
  const containerRef = useRef<HTMLDivElement>(null)

  const [variants] = unwindEdges(product?.sourceData?.variants)
  const initialVariant = variants[0]
  const { isInViewOnce } = useInViewport(containerRef)

  const [images] = unwindEdges(product.sourceData?.images)
  const mainImage = images[0]
  const hoverImage = images[1]

  const handleClick = () => {
    sendProductClick({ product, variant: initialVariant })
  }

  useEffect(() => {
    if (!isInViewOnce) return
    sendProductImpression({ product, variant: initialVariant })
  }, [isInViewOnce])

  return (
    <Link href={href}>
      <a onClick={handleClick}>
        <Wrapper ref={containerRef}>
          <ImageContainer key={product.handle || 'some-key'}>
            <Image
              ratio={imageRatio || 1}
              sizes="(min-width: 600px) 500px, 250px"
              image={mainImage}
              hoverImage={hoverImage}
            />
          </ImageContainer>
          <Title>
            <Heading fontFamily="serif" fontWeight={1} level={4}>
              {product.title}
            </Heading>
            {availableForSale === false ? (
              <Heading fontFamily="sans" level={5} color="red">
                Unavailable
              </Heading>
            ) : null}
          </Title>
        </Wrapper>
      </a>
    </Link>
  )
}
