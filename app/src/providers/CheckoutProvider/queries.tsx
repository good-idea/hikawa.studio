import gql from 'graphql-tag'
import { ApolloClient, BaseMutationOptions, useMutation } from '@apollo/client'
import {
  ShopifyStorefrontCheckout,
  ShopifyStorefrontMutationCheckoutLineItemsAddArgs,
  ShopifyStorefrontMutationCheckoutLineItemsUpdateArgs,
  ShopifyStorefrontMutationCheckoutAttributesUpdateArgs,
  ShopifyStorefrontMutationCheckoutDiscountCodeApplyV2Args,
  ShopifyStorefrontMutationCheckoutDiscountCodeRemoveArgs,
  ShopifyStorefrontCheckoutCreatePayload,
  ShopifyStorefrontCheckoutUserError,
} from '../../types'
import { checkoutFragment } from '../../graphql'

interface CheckoutResponse {
  checkout: ShopifyStorefrontCheckout
  checkoutUserErrors: ShopifyStorefrontCheckoutUserError[]
}

/**
 * Fetch the checkout
 */

export interface CheckoutQueryResponse {
  node: ShopifyStorefrontCheckout
}

export interface CheckoutQueryInput {
  id: string
}

export const checkoutQuery = gql`
  query CheckoutQuery($id: ID!) {
    node(id: $id) {
      ...CheckoutFragment
    }
  }
  ${checkoutFragment}
`

/**
 * Create a checkout
 */

export const checkoutCreateMutation = gql`
  mutation CheckoutCreate(
    $email: String
    $lineItems: [CheckoutLineItemInput!]
    $shippingAddress: MailingAddressInput
    $note: String
    $customAttributes: [AttributeInput!]
    $allowPartialAddresses: Boolean
  ) {
    checkoutCreate(
      input: {
        email: $email
        lineItems: $lineItems
        shippingAddress: $shippingAddress
        note: $note
        customAttributes: $customAttributes
        allowPartialAddresses: $allowPartialAddresses
      }
    ) {
      checkoutUserErrors {
        code
        field
        message
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${checkoutFragment}
`

export interface CheckoutCreateResponse {
  checkoutCreate: ShopifyStorefrontCheckoutCreatePayload
}

/**
 * Add line items
 */

interface AddLineItemsResponse {
  checkoutLineItemsAdd: CheckoutResponse
}

const checkoutLineItemsAddMutation = gql`
  mutation AddLineItems(
    $checkoutId: ID!
    $lineItems: [CheckoutLineItemInput!]!
  ) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkoutUserErrors {
        field
        message
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${checkoutFragment}
`

const addOptions: BaseMutationOptions<
  AddLineItemsResponse,
  ShopifyStorefrontMutationCheckoutLineItemsAddArgs
> = {
  update: async (proxy, { data }) => {
    if (!data) return
    const { checkout } = data.checkoutLineItemsAdd
    if (checkout) {
      proxy.writeQuery({
        query: checkoutQuery,
        variables: { id: checkout.id },
        data: {
          node: checkout,
        },
      })
    }
  },
}

export const useCheckoutAddLineItems = (client: ApolloClient<any>) => {
  return useMutation<
    AddLineItemsResponse,
    ShopifyStorefrontMutationCheckoutLineItemsAddArgs
  >(checkoutLineItemsAddMutation, { ...addOptions, client })
}

/**
 * Update line items
 */

interface CheckoutLineItemsUpdateResponse {
  checkoutLineItemsUpdate: CheckoutResponse
}

const checkoutLineItemsUpdateMutation = gql`
  mutation CheckoutLineItemsUpdate(
    $lineItems: [CheckoutLineItemUpdateInput!]!
    $checkoutId: ID!
  ) {
    checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkoutUserErrors {
        code
        field
        message
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${checkoutFragment}
`

const updateOptions: BaseMutationOptions<
  CheckoutLineItemsUpdateResponse,
  ShopifyStorefrontMutationCheckoutLineItemsUpdateArgs
> = {
  update: async (proxy, { data }) => {
    if (!data) return

    const { checkout } = data.checkoutLineItemsUpdate
    if (checkout) {
      proxy.writeQuery({
        query: checkoutQuery,
        variables: { id: checkout.id },
        data: {
          node: checkout,
        },
      })
    }
  },
}

export const useCheckoutUpdateLineItems = (client: ApolloClient<any>) => {
  return useMutation<
    CheckoutLineItemsUpdateResponse,
    ShopifyStorefrontMutationCheckoutLineItemsUpdateArgs
  >(checkoutLineItemsUpdateMutation, { client, ...updateOptions })
}

/*
 * Update cart attributes
 */

const updateAttributesMutation = gql`
  mutation UpdateCheckoutAttributes(
    $checkoutId: ID!
    $input: CheckoutAttributesUpdateV2Input!
  ) {
    checkoutAttributesUpdateV2(checkoutId: $checkoutId, input: $input) {
      checkoutUserErrors {
        code
        field
        message
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${checkoutFragment}
`

interface UpdateAttributesResponse {
  checkoutAttributesUpdateV2: CheckoutResponse
}

const updateAttributes: BaseMutationOptions<
  UpdateAttributesResponse,
  ShopifyStorefrontMutationCheckoutAttributesUpdateArgs
> = {
  update: async (proxy, { data }) => {
    if (!data) return

    const { checkout } = data.checkoutAttributesUpdateV2
    if (checkout) {
      proxy.writeQuery({
        query: checkoutQuery,
        variables: { id: checkout.id },
        data: {
          node: checkout,
        },
      })
    }
  },
}

export const useUpdateAttributes = (client: ApolloClient<any>) =>
  useMutation<
    UpdateAttributesResponse,
    ShopifyStorefrontMutationCheckoutAttributesUpdateArgs
  >(updateAttributesMutation, { client, ...updateAttributes })

/*
 * Add & remove discounts
 */

const applyDiscountMutation = gql`
  mutation CheckoutDiscountCodeApply($checkoutId: ID!, $discountCode: String!) {
    checkoutDiscountCodeApplyV2(
      checkoutId: $checkoutId
      discountCode: $discountCode
    ) {
      checkoutUserErrors {
        field
        message
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${checkoutFragment}
`

interface ApplyDiscountResponse {
  checkoutDiscountCodeApplyV2: CheckoutResponse
}

const applyDiscountOptions: BaseMutationOptions<
  ApplyDiscountResponse,
  ShopifyStorefrontMutationCheckoutDiscountCodeApplyV2Args
> = {
  update: async (proxy, { data }) => {
    if (!data) return

    const { checkout } = data.checkoutDiscountCodeApplyV2
    if (checkout) {
      proxy.writeQuery({
        query: checkoutQuery,
        variables: { id: checkout.id },
        data: {
          node: checkout,
        },
      })
    }
  },
}

export const useApplyDiscount = (client: ApolloClient<any>) =>
  useMutation<
    ApplyDiscountResponse,
    ShopifyStorefrontMutationCheckoutDiscountCodeApplyV2Args
  >(applyDiscountMutation, {
    client,
    ...applyDiscountOptions,
  })

const removeDiscountMutation = gql`
  mutation CheckoutDiscountCodeRemove($checkoutId: ID!) {
    checkoutDiscountCodeRemove(checkoutId: $checkoutId) {
      userErrors {
        field
        message
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${checkoutFragment}
`

interface RemoveDiscountResponse {
  checkoutDiscountCodeRemove: CheckoutResponse
}

const removeDiscountOptions: BaseMutationOptions<
  RemoveDiscountResponse,
  ShopifyStorefrontMutationCheckoutDiscountCodeRemoveArgs
> = {
  update: async (proxy, { data }) => {
    if (!data) return

    const { checkout } = data.checkoutDiscountCodeRemove
    if (checkout) {
      proxy.writeQuery({
        query: checkoutQuery,
        variables: { id: checkout.id },
        data: {
          node: checkout,
        },
      })
    }
  },
}

export const useRemoveDiscount = (client: ApolloClient<any>) =>
  useMutation<
    RemoveDiscountResponse,
    ShopifyStorefrontMutationCheckoutDiscountCodeRemoveArgs
  >(removeDiscountMutation, { client, ...removeDiscountOptions })
