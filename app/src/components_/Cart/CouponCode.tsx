import * as React from 'react'
import styled, { Box } from '@xstyled/styled-components'
import { unwindEdges } from '@good-idea/unwind-edges'
import {
  ShopifyStorefrontCheckout,
  ShopifyStorefrontDiscountApplication,
  ShopifyStorefrontDiscountAllocation,
} from '../../types'
import { DiscountLineWrapper, CouponForm } from './styled'
import { Input } from '../Forms'
import { Heading } from '../Text'
import { Button } from '../Button'

const { useState } = React

type Discount =
  | ShopifyStorefrontDiscountAllocation
  | ShopifyStorefrontDiscountApplication

interface CouponCodeProps {
  checkout: ShopifyStorefrontCheckout
  applyDiscount: (code: string) => Promise<void>
  removeDiscount: () => Promise<void>
}

interface DiscountLineProps {
  discount: ShopifyStorefrontDiscountApplication
  removeDiscount: () => Promise<void>
}

const RemoveButton = styled(Button)`
  height: auto;
`

export const DiscountLine = ({
  discount,
  removeDiscount,
}: DiscountLineProps) => {
  const isAutomatic = Boolean(
    // @ts-ignore
    discount && discount.__typename === 'AutomaticDiscountApplication',
  )

  return (
    <DiscountLineWrapper>
      <Heading py={2} flexBasis={1} backgroundColor="offset" level={4}>
        {/* @ts-ignore */}
        {discount.title || discount.code} ✓
      </Heading>
      {!isAutomatic && removeDiscount ? (
        <RemoveButton pr={0} my={0} level={2} onClick={removeDiscount}>
          Remove
        </RemoveButton>
      ) : null}
    </DiscountLineWrapper>
  )
}

export const CouponCode = ({
  checkout,
  applyDiscount,
  removeDiscount,
}: CouponCodeProps) => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const shippingDiscounts = checkout?.shippingDiscountAllocations ?? []
  const [discounts] = unwindEdges(checkout?.discountApplications)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await applyDiscount(inputValue)
    setInputValue('')
  }

  const couponCodeDiscounts = discounts.filter(
    // @ts-ignore
    (d) => d.__typename === 'DiscountCodeApplication',
  )
  const otherDiscounts = discounts.filter(
    // @ts-ignore
    (d) => d.__typename !== 'DiscountCodeApplication',
  )

  const couponDiscount = couponCodeDiscounts[0]

  return (
    <Box mb={4}>
      <CouponForm onSubmit={handleSubmit}>
        <Heading textAlign="left" flexBasis={1} level={5}>
          Promo Code
        </Heading>
        <Input
          textTransform="uppercase"
          color="pink"
          value={inputValue}
          onChange={handleChange}
          name="coupon"
          autoComplete="off"
        />
        <Button type="submit">Apply</Button>
      </CouponForm>

      {couponDiscount ? (
        <DiscountLine
          key="some-key"
          removeDiscount={removeDiscount}
          discount={couponDiscount}
        />
      ) : null}
      {otherDiscounts.map((sd, i) => (
        <DiscountLine key={i} removeDiscount={removeDiscount} discount={sd} />
      ))}

      {shippingDiscounts.map((sd) => (
        <DiscountLine
          key={sd.allocatedAmount.amount}
          removeDiscount={removeDiscount}
          // @ts-ignore
          discount={sd}
        />
      ))}
    </Box>
  )
}
