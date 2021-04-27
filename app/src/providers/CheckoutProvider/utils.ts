import { ShopifyStorefrontCheckoutLineItem as LineItem } from '../../types/generated-shopify'

export const validateLineItem = (item: LineItem): boolean => {
  if (item.variant === null) return false
  return true
}
