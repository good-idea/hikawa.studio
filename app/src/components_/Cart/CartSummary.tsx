import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { ShopifyStorefrontCheckout } from '../../types'
import { parsePrice } from '../../utils'
import { Heading } from '../Text'

const Subtotal = styled.div`
  margin: 5 0;
  text-align: center;
`

/**
 * CartSummary
 */

interface Props {
  checkout: ShopifyStorefrontCheckout
}

export const CartSummary = ({ checkout }: Props) => {
  const total = checkout.paymentDue
    ? `Subtotal: ${parsePrice(checkout.paymentDue)}`
    : undefined
  if (!total) return null
  return (
    <>
      <Subtotal>
        <Heading level={4}>{total}</Heading>
      </Subtotal>
    </>
  )
}
