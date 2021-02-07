import { unwindEdges } from '@good-idea/unwind-edges'
import {
  ShopifyStorefrontProductVariant as Variant,
  ShopifyStorefrontProduct as Product,
  ShopifyStorefrontCheckoutLineItem as CheckoutLineItem,
} from '../../types/generated-shopify'
import {
  ShopifyProduct,
  ShopifyProductVariant,
  ShopifySourceProduct,
  ShopifySourceProductVariant,
} from '../../types'
import { SelectedProduct, EcommerceObject } from './types'
import { definitely, assertExists } from '../../utils'

const getVariantSourceData = (
  variant: ShopifyProductVariant | ShopifySourceProductVariant | Variant,
): ShopifySourceProductVariant | Variant => {
  if (
    '__typename' in variant &&
    variant.__typename === 'ShopifySourceProductVariant'
  ) {
    return variant
  }

  if (
    '__typename' in variant &&
    variant.__typename === 'ShopifyProductVariant'
  ) {
    const sourceData = variant?.sourceData
    if (!sourceData) throw new Error('No product source data was provided')
    return sourceData
  }

  return variant
}

const getProductSourceData = (
  product: ShopifyProduct | ShopifySourceProduct | Product | CheckoutLineItem,
): ShopifySourceProduct | Product | CheckoutLineItem => {
  if (product.__typename === 'CheckoutLineItem') return product
  if (product.__typename === 'ShopifySourceProduct') return product
  if (product.__typename === 'Product') return product
  if (product.__typename === 'ShopifyProduct') {
    // @ts-ignore
    const sourceData = product?.sourceData
    if (!sourceData) throw new Error('No product source data was provided')
    return sourceData
  }

  console.error(product)
  throw new Error('Could not get product data')
}

const getFirstVariant = (
  product: CheckoutLineItem | ShopifyProduct | ShopifySourceProduct | Product,
): ShopifySourceProductVariant | Variant | void => {
  if (product.__typename === 'CheckoutLineItem') {
    return product.variant || undefined
  }
  const [variants] =
    product.__typename === 'ShopifyProduct'
      ? unwindEdges(product?.sourceData?.variants)
      : product.__typename === 'Product'
      ? unwindEdges(product?.variants)
      : unwindEdges(product?.variants)

  return variants[0] || undefined
}

interface ProductExtras {
  list?: string
  position?: number
}

export const parseProduct = (
  selectedProduct: SelectedProduct,
  { position, list }: ProductExtras,
): EcommerceObject => {
  const { quantity } = selectedProduct
  const product = getProductSourceData(selectedProduct.product)
  const variant = selectedProduct.variant
    ? getVariantSourceData(selectedProduct.variant)
    : getFirstVariant(selectedProduct.product)

  const formattedPrice =
    variant && variant?.priceV2?.amount
      ? Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
          .format(parseFloat(variant.priceV2.amount.toString()))
          .replace(/^\$/, '')
      : undefined

  const productType = 'productType' in product ? product.productType : undefined
  const values: EcommerceObject = {
    name: assertExists(product.title, 'title'),
    id: assertExists(product.id, 'id'),
    price: assertExists(formattedPrice, 'price'),
    category: productType ?? undefined,
    variant: variant ? assertExists(variant.title, 'variant') : undefined,
    quantity,
    position,
    list,
  }
  return values
}
