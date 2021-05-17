import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { ApolloClient, useQuery } from '@apollo/client'
import {
  ShopifyStorefrontCheckout,
  ShopifyStorefrontMutationCheckoutCreateArgs,
  ShopifyStorefrontCheckoutCreateInput,
} from '../../types'
import {
  checkoutQuery,
  CheckoutQueryInput,
  CheckoutQueryResponse,
  useCheckoutAddLineItems,
  useCheckoutUpdateLineItems,
  useUpdateAttributes,
  useApplyDiscount,
  useRemoveDiscount,
  checkoutCreateMutation,
  CheckoutCreateResponse,
} from './queries'
import { AddLineItem } from './types'
import { validateLineItem } from './utils'
import {
  getCookie,
  removeCookie,
  setCookie,
  VIEWER_CART_TOKEN,
  VIEWER_EMAIL,
  split,
} from '../../utils'

const { useState, useEffect } = React

interface CheckoutContextValue {
  currentCheckout?: ShopifyStorefrontCheckout
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  loading: boolean
  addLineItems: (lineItems: AddLineItem[]) => Promise<void>
  updateLineItems: (lineItems: AddLineItem[]) => Promise<void>
  addNote: (note: string) => Promise<void>
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>
  applyDiscount: (code: string) => Promise<void>
  removeDiscount: () => Promise<void>
  userErrors: string[]
}

const CheckoutContext = React.createContext<CheckoutContextValue | undefined>(
  undefined,
)

export const CheckoutConsumer = CheckoutContext.Consumer

export const useCheckout = () => {
  const ctx = React.useContext(CheckoutContext)
  if (!ctx)
    throw new Error('useCheckoutContext must be used within a CheckoutProvider')
  return ctx
}

interface CheckoutProps {
  client: ApolloClient<any>
  children: React.ReactNode
}

export const CheckoutProvider = ({ client, children }: CheckoutProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [checkoutId, setCheckoutId] = useState<string | null>(null)

  const variables = {
    id: checkoutId || '',
  }
  const { data, loading: checkoutQueryLoading } = useQuery<
    CheckoutQueryResponse,
    CheckoutQueryInput
  >(checkoutQuery, { variables, skip: !Boolean(checkoutId), client })
  const currentCheckout = data?.node
  const [
    addLineItemsMutation,
    { loading: addLoading },
  ] = useCheckoutAddLineItems(client)
  const [
    updateLineItemsMutation,
    { loading: updateLoading },
  ] = useCheckoutUpdateLineItems(client)
  const [
    updateAttributesMutation,
    { loading: updateAttributesLoading },
  ] = useUpdateAttributes(client)
  const [
    applyDiscountMutation,
    { loading: applyDiscountLoading },
  ] = useApplyDiscount(client)
  const [
    removeDiscountMutation,
    { loading: removeDiscountLoading },
  ] = useRemoveDiscount(client)

  const loading = [
    checkoutQueryLoading,
    addLoading,
    updateLoading,
    updateAttributesLoading,
    applyDiscountLoading,
    removeDiscountLoading,
  ].some(Boolean)

  /* Load the current cart if a cookie exists */
  useEffect(() => {
    const checkoutIdCookie = getCookie(VIEWER_CART_TOKEN)
    /* Setting the checkoutId will fire the useQuery at the top */
    if (checkoutIdCookie) {
      setCheckoutId(checkoutIdCookie)
    }
  }, [])

  useEffect(() => {
    if (!currentCheckout) return
    const [lineItems] = unwindEdges(currentCheckout.lineItems)
    const [validLineItems, invalidLineItems] = split(
      lineItems,
      validateLineItem,
    )

    if (
      lineItems.length > 0 &&
      (currentCheckout.completedAt || validLineItems.length === 0)
    ) {
      setCheckoutId(null)
      removeCookie(VIEWER_CART_TOKEN)
    } else if (invalidLineItems.length) {
      const removeArgs = invalidLineItems.map((lineItem) => ({
        id: lineItem.id,
        quantity: 0,
      }))
      // @ts-ignore
      updateLineItems(removeArgs).then(() => {
        setCheckoutId(currentCheckout.id)
        setCookie(VIEWER_CART_TOKEN, currentCheckout.id)
      })
    } else {
      setCheckoutId(currentCheckout.id)
      setCookie(VIEWER_CART_TOKEN, currentCheckout.id)
    }
  }, [currentCheckout])

  const userErrors = []

  const getOrCreateCheckout = async (
    args?: ShopifyStorefrontCheckoutCreateInput,
  ) => {
    if (currentCheckout) return currentCheckout
    const input = {
      ...args,
      email: args?.email || getCookie(VIEWER_EMAIL),
    }

    const variables = { input }
    const result = await client.mutate<
      CheckoutCreateResponse,
      ShopifyStorefrontMutationCheckoutCreateArgs
    >({ mutation: checkoutCreateMutation, variables })
    if (!result?.data?.checkoutCreate?.checkout) {
      throw new Error('Nothing returned from create checkout')
    }
    const { checkout, checkoutUserErrors } = result.data.checkoutCreate
    setCookie(VIEWER_CART_TOKEN, checkout.id)
    setCheckoutId(checkout.id)
    return checkout
  }

  /*
   * Methods
   */

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  const addLineItems = async (lineItems: AddLineItem[]) => {
    const checkout = await getOrCreateCheckout()
    const variables = { checkoutId: checkout.id, lineItems }
    await addLineItemsMutation({ variables })
  }

  const updateLineItems = async (lineItems: AddLineItem[]) => {
    const checkout = await getOrCreateCheckout()
    const variables = { checkoutId: checkout.id, lineItems }
    await updateLineItemsMutation({ variables })
  }

  const updateQuantity = async (lineItemId: string, quantity: number) => {
    const checkout = await getOrCreateCheckout()
    const lineItems = [{ id: lineItemId, quantity }]
    const variables = { checkoutId: checkout.id, lineItems }
    await updateLineItemsMutation({ variables })
  }

  const addNote = async (note: string) => {
    const checkout = await getOrCreateCheckout()
    const variables = { checkoutId: checkout.id, input: { note } }
    await updateAttributesMutation({ variables })
  }

  const applyDiscount = async (discountCode: string) => {
    const checkout = await getOrCreateCheckout()
    const variables = { checkoutId: checkout.id, discountCode }
    await removeDiscount()
    await applyDiscountMutation({ variables })
  }

  const removeDiscount = async () => {
    const checkout = await getOrCreateCheckout()
    const variables = { checkoutId: checkout.id }
    await removeDiscountMutation({ variables })
  }

  const value: CheckoutContextValue = {
    loading,
    currentCheckout,
    isOpen,
    openCart,
    closeCart,
    addLineItems,
    updateLineItems,
    updateQuantity,
    addNote,
    applyDiscount,
    removeDiscount,
    userErrors,
  }

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  )
}
