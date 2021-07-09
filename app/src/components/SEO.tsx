import * as React from 'react'
import Head from 'next/head'
import { unwindEdges } from '@good-idea/unwind-edges'
import {
  ShopifySourceImage,
  ShopifyProduct,
  RichImage,
  Image,
  Maybe,
  Seo,
} from '../types'

type ImageType = Image | RichImage | ShopifySourceImage

type DefaultSeo = {
  title?: string | null
  description?: string | null
  image?: ImageType
}

interface SEOProps {
  seo?: Maybe<Seo>
  defaultSeo: DefaultSeo
  path: string
  contentType?: string
  product?: ShopifyProduct
}

const BASE_URL = 'https://www.baileyhikawa.com'

interface ProductSEOProps {
  product: ShopifyProduct
}

export const formatPrice = (price: number | string): string =>
  Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    .format(typeof price === 'string' ? parseInt(price) : price)
    .replace(/^\$/, '')

const ProductSEO = ({ product }: ProductSEOProps) => {
  const { minVariantPrice, sourceData } = product
  const compareAtPriceRange = sourceData?.compareAtPriceRange
  const [variants] = unwindEdges(product?.sourceData?.variants)
  const firstVariant = variants[0]
  const availableForSale = Boolean(sourceData?.availableForSale)
  const formattedPrice = minVariantPrice
    ? formatPrice(minVariantPrice)
    : undefined
  const formattedCompareAtPrice = compareAtPriceRange?.maxVariantPrice?.amount
    ? formatPrice(compareAtPriceRange.maxVariantPrice.amount)
    : undefined
  const availability = availableForSale ? 'in stock' : 'out of stock'

  const actualPrice = formattedCompareAtPrice || formattedPrice
  const salePrice = formattedCompareAtPrice ? formattedPrice : undefined
  return (
    <Head>
      <meta property="og:price:amount" content={actualPrice} />
      <meta property="og:price:currency" content="USD" />
      <meta property="og:availability" content={availability} />
      <meta property="product:brand" content="Bailey Hikawa" />
      <meta
        property="product:catalog_id"
        content={product?.sourceData?.id || undefined}
      />
      <meta property="product:condition" content="new" />
      <meta property="product:price:amount" content={actualPrice} />
      <meta property="product:price:currency" content="USD" />
      <meta
        property="product:retailer_item_id"
        content={product?.sourceData?.id || undefined}
      />

      <meta property="product:sale_price:amount" content={salePrice} />
      <meta property="product:sale_price:currency" content="USD" />
    </Head>
  )
}

const getImageUrl = (image?: ImageType | null): string | undefined => {
  if (!image) return undefined
  if (image.__typename === 'Image' || image.__typename === 'RichImage') {
    return image?.asset?.url ?? undefined
  }
  if (image.__typename === 'ShopifySourceImage') {
    return image?.originalSrc ?? undefined
  }
  return undefined
}

export const SEO = ({ path, seo, defaultSeo, product }: SEOProps) => {
  if (!defaultSeo.title) throw new Error('No default title was supplied')
  const { keywords, metaTitle, description, name, title, image } = {
    ...defaultSeo,
    ...seo,
  }
  const seoTitle = name || title
  const canonical = [BASE_URL, path].join('/')
  const imageUrl = getImageUrl(image)
  return (
    <>
      <Head>
        <title key="title">{seoTitle}</title>
        <meta name="description" content={description || undefined} />
        <meta name="keywords" content={keywords || undefined} />
        <meta
          property="og:title"
          content={metaTitle || seoTitle || undefined}
        />
        <meta property="og:description" content={description || undefined} />
        <meta property="og:image" content={imageUrl || undefined} />
        <meta property="og:image_secure_url" content={imageUrl || undefined} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta name="robots" content="index, follow" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={seoTitle || undefined} />
        <meta
          name="twitter:description"
          content={metaTitle || title || undefined}
        />
        <meta name="twitter:image" content={imageUrl || undefined} />
        <link rel="canonical" href={canonical} />
      </Head>
      {product ? <ProductSEO product={product} /> : null}
    </>
  )
}
