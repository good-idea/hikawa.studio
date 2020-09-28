import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import styled, { css } from '@xstyled/styled-components'
import Link from 'next/link'
import { ShopifyProduct } from '../../types'
import { Image } from '../Image'
import { Heading } from '../Text'

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
}

export const ProductThumbnail = ({ product }: ProductThumbnailProps) => {
  const href = '/products/[productHandle]'
  const as = `/products/${product.handle}`

  const [images] = unwindEdges(product.sourceData?.images)
  const mainImage = images[0]
  const hoverImage = images[1]

  return (
    <Link href={href} as={as}>
      <a>
        <Wrapper>
          <ImageContainer key={product.handle || 'some-key'}>
            <Image
              ratio={1}
              sizes="(min-width: 600px) 500px, 250px"
              image={mainImage}
              hoverImage={hoverImage}
            />
          </ImageContainer>
          <Title>
            <Heading fontFamily="serif" fontWeight={1} level={3}>
              {product.title}
            </Heading>
          </Title>
        </Wrapper>
      </a>
    </Link>
  )
}
