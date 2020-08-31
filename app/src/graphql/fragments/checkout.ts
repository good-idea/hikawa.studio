import gql from 'graphql-tag'
import { shopifyImageFragment } from './media'

const discountApplicationFragment = gql`
  fragment DiscountApplicationFragment on DiscountApplication {
    targetSelection
    targetType
    value {
      ... on MoneyV2 {
        amount
        currencyCode
      }
      ... on PricingPercentageValue {
        percentage
      }
    }
    ... on AutomaticDiscountApplication {
      title
    }
    ... on DiscountCodeApplication {
      applicable
      code
    }
    ... on ManualDiscountApplication {
      title
      description
    }
    ... on ScriptDiscountApplication {
      title
    }
  }
`

const discountAllocationFragment = gql`
  fragment DiscountAllocationFragment on DiscountAllocation {
    allocatedAmount {
      amount
      currencyCode
    }
    discountApplication {
      ...DiscountApplicationFragment
    }
  }
  ${discountApplicationFragment}
`

export const checkoutFragment = gql`
  fragment CheckoutFragment on Checkout {
    id
    email
    paymentDue
    webUrl
    completedAt
    note
    shippingLine {
      handle
      price
      title
    }
    lineItems(first: 100) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          quantity
          title
          variant {
            id
            title
            priceV2 {
              amount
              currencyCode
            }
            product {
              id
              title
            }
            image {
              ...ShopifyImageFragment
            }
          }
          discountAllocations {
            allocatedAmount {
              amount
              currencyCode
            }
            discountApplication {
              targetSelection
              targetType
              value {
                ... on MoneyV2 {
                  amount
                  currencyCode
                }
                ... on PricingPercentageValue {
                  percentage
                }
              }
              ... on AutomaticDiscountApplication {
                title
              }
              ... on DiscountCodeApplication {
                applicable
                code
              }
              ... on ManualDiscountApplication {
                title
                description
              }
              ... on ScriptDiscountApplication {
                title
              }
            }
          }
        }
      }
    }
    shippingDiscountAllocations {
      ...DiscountAllocationFragment
    }
    discountApplications(first: 100) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          targetSelection
          targetType
          value {
            ... on MoneyV2 {
              amount
              currencyCode
            }
            ... on PricingPercentageValue {
              percentage
            }
          }
          ... on AutomaticDiscountApplication {
            title
          }
          ... on DiscountCodeApplication {
            applicable
            code
          }
          ... on ManualDiscountApplication {
            title
            description
          }
          ... on ScriptDiscountApplication {
            title
          }
        }
      }
    }
  }

  ${discountAllocationFragment}
  ${discountApplicationFragment}
  ${shopifyImageFragment}
`
