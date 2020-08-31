import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { useQuery } from '@apollo/client'
import {
  ShopifyStorefrontCheckout,
  ShopifyStorefrontCheckoutLineItem,
} from '../../types'
import {
  setCookie,
  getCookie,
  removeCookie,
  VIEWER_CART_TOKEN,
} from '../../utils'
import {
  checkoutQuery,
  CheckoutQueryResponse,
  CheckoutQueryInput,
} from './queries'

const { useEffect, useState } = React

const stripNoVariants = (lineItem: ShopifyStorefrontCheckoutLineItem) =>
  Boolean(lineItem.variant)

const sanitizeCart = (originalCart: ShopifyStorefrontCheckout) => ({
  ...originalCart,
  lineItems: unwindEdges(originalCart.lineItems)[0].filter(stripNoVariants),
})

export const useCurrentCart = () => {
  const initialCheckoutId = getCookie(VIEWER_CART_TOKEN)
  const [checkoutId, setCheckoutId] = useState<string | null>(initialCheckoutId)
  const variables = {
    id: checkoutId,
  }
  const { data, loading, error, refetch } = useQuery<
    CheckoutQueryResponse,
    CheckoutQueryInput
  >(checkoutQuery, { variables })
  const cart = data && data.node ? sanitizeCart(data.node) : undefined
  const currentCart = cart && cart.completedAt ? null : cart

  useEffect(() => {
    if (checkoutId) {
      setCookie(VIEWER_CART_TOKEN, checkoutId)
    } else {
      removeCookie(VIEWER_CART_TOKEN)
    }
  }, [checkoutId])

  useEffect(() => {
    if (cart && cart.completedAt) {
      setCheckoutId(undefined)
    }
  }, [cart])

  const updateCheckoutId = (checkoutId: string) => {
    setCookie(VIEWER_CART_TOKEN, checkoutId)
    setCheckoutId(checkoutId)
  }

  return {
    loading,
    currentCart,
    updateCheckoutId,
    refetchCart: refetch,
  }
}
