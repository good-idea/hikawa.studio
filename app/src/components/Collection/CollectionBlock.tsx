import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { ShopifyProduct, ShopifyCollection } from '../../types'
import { definitely } from '../../utils'
import { Heading } from '../Text'
import { Column } from '../Layout'
import { ProductThumbnail } from '../Product'

const { useEffect, useRef } = React

const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: 0 6;
    background-size: cover;
    background-position: center;

    ${theme.mediaQueries.mobile} {
      padding: 3;
    }
  `}
`

interface InnerProps {
  hideTitle?: boolean
}

const Inner = styled.div`
  ${({ theme, hideTitle }) => css`
    position: relative;
    display: ${hideTitle ? 'flex' : 'grid'};
    grid-template-columns: 200px 1fr;
    justify-content: center;

    ${theme.mediaQueries.mobile} {
      display: block;
    }
  `}
`

const Title = styled.div`
  ${({ theme }) => css`
    text-align: left;
    padding-right: 5;

    ${theme.mediaQueries.mobile} {
      text-align: left;
      padding-right: 0;
    }
  `}
`

interface ProductsProps {
  lowCount?: boolean
}

const Products = styled.div<ProductsProps>`
  ${({ theme, lowCount }) => css`
    display: ${lowCount ? 'flex' : 'grid'};
    flex-grow: 1;
    margin: 0 5;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 3;
    justify-content: center;

    ${lowCount
      ? css`
          > * {
            flex-grow: 1;
            max-width: 300px;
          }
        `
      : ''}

    ${theme.mediaQueries.mobile} {
      grid-template-columns: repeat(2, 1fr);
      margin: 0;
    }
  `}
`

/**
 * Collection
 */

interface CollectionBlockProps {
  collection: ShopifyCollection
  isActive: boolean
  hideTitle?: boolean
}

export const CollectionBlock = ({
  collection,
  isActive,
  hideTitle,
}: CollectionBlockProps) => {
  const products = definitely(collection.products).filter(
    (p) => !p?.sourceData?.tags?.includes('hidden'),
  )
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!isActive || !container) return
    const scrollToTop = () => {
      const top = container.offsetTop
      document.documentElement.scrollTop = top - 90
    }
    const tm = setTimeout(scrollToTop, 400)
    return () => clearTimeout(tm)
  }, [isActive, containerRef.current])

  if (!products.length) return null

  // Filter out non-unique products
  const filteredProducts = products.reduce<ShopifyProduct[]>((acc, product) => {
    if (acc.some((p) => p.handle === product.handle)) {
      return acc
    }
    return [...acc, product]
  }, [])

  return (
    <Wrapper ref={containerRef}>
      <Column width="wide">
        <Inner hideTitle={hideTitle}>
          {hideTitle !== true ? (
            <Title>
              <Heading level={3} fontFamily="sans">
                {collection.title}
              </Heading>
            </Title>
          ) : null}
          <Products lowCount={filteredProducts.length < 3}>
            {filteredProducts.map((product) => (
              <ProductThumbnail
                key={product.handle || 'some-key'}
                product={product}
                imageRatio={1.25}
              />
            ))}
          </Products>
        </Inner>
      </Column>
    </Wrapper>
  )
}
