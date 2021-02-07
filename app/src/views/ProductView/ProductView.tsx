import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { useQuery } from '@apollo/client'
import { useCheckout, useAnalytics } from '../../providers'
import { ShopifyProduct } from '../../types'
import {
  productPageQuery,
  ProductQueryResponse,
  ProductQueryInput,
} from './productPageQuery'
import { useProductVariant, definitely } from '../../utils'
import { NotFound } from '../NotFound'
import { Hero } from '../../components/Hero'
import { SEO } from '../../components/SEO'
import { Column } from '../../components/Layout'
import { Heading } from '../../components/Text'
import { Image } from '../../components/Image'
import { LinkButton } from '../../components/Button'
import { CollectionBlock } from '../../components/Collection'
import { ProductDescription } from './ProductDescription'
import {
  Layout,
  Images,
  Description,
  RelatedWrapper,
  RelatedTitle,
  MobileTitle,
  LinkButtonWrapper,
} from './styled'

const { useEffect } = React

interface ProductViewProps {
  handle: string
}

export const ProductView = ({ handle }: ProductViewProps) => {
  const variables = {
    handle,
  }

  const { loading, data } = useQuery<ProductQueryResponse, ProductQueryInput>(
    productPageQuery,
    { variables },
  )

  const product = definitely(data?.allShopifyProduct)[0]
  return null
}

interface ProductViewInnerProps {
  product: ShopifyProduct
}

const ProductViewInner = ({ product }: ProductViewInnerProps) => {
  const { handle, seo, hero, title, sourceData } = product
  if (!sourceData) {
    throw new Error('No sourceData was provided')
  }
  const { currentVariant, selectVariant } = useProductVariant(product)
  const { addLineItems } = useCheckout()

  const { sendProductDetailView } = useAnalytics()

  useEffect(() => {
    if (!currentVariant) throw new Error('Could not get current variant')
    sendProductDetailView({ product, variant: currentVariant })
  }, [currentVariant])

  const addToCart = async () => {
    const variantId = currentVariant?.id
    if (!variantId) return
    await addLineItems([{ variantId, quantity: 1 }])
  }

  if (!currentVariant) {
    throw new Error('Could not load the initial product variant')
  }

  if (!product) return <NotFound />

  const [images] = unwindEdges(sourceData?.images)
  const collection = definitely(product.collections)[0]

  const defaultSeo = {
    title: product.title || '',
    image: images ? images[0] : undefined,
  }

  if (!handle) throw new Error('No handle fetched')
  const path = ['products', handle].join('/')

  return (
    <>
      <SEO seo={seo} defaultSeo={defaultSeo} path={path} />
      <Hero hero={hero} />
      <Column width="wide">
        <Layout>
          <MobileTitle>
            <Heading level={2}>{title}</Heading>
          </MobileTitle>
          <Images>
            {definitely(images).map((image) => (
              <Image
                key={image.originalSrc || 'some-key'}
                image={image}
                sizes="(max-width: 600px) 80vw, 45vw"
              />
            ))}
          </Images>
          <Description>
            <ProductDescription
              product={product}
              currentVariant={currentVariant}
              selectVariant={selectVariant}
              addToCart={addToCart}
            />
          </Description>
        </Layout>
        <RelatedWrapper>
          <RelatedTitle>
            <Heading level={2}>Keep Looking</Heading>
            <hr />
          </RelatedTitle>
          {collection ? (
            <CollectionBlock isActive={false} collection={collection} />
          ) : null}
          <LinkButtonWrapper>
            <LinkButton fontSize={3} m="0 auto" level={1} href="/shop">
              Back to shop
            </LinkButton>
          </LinkButtonWrapper>
        </RelatedWrapper>
      </Column>
    </>
  )
}
