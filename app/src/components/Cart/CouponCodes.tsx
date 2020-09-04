import * as React from 'react'
import styled, { Box } from '@xstyled/styled-components'
import { unwindEdges } from '@good-idea/unwind-edges'
import {
  ShopifyStorefrontDiscountApplication,
  ShopifyStorefrontDiscountAllocation,
} from '../../types'
import { useCheckout } from '../../providers'
import { DiscountTitle, DiscountLineWrapper, CouponForm } from './styled'
import { Input } from '../Forms'
import { Heading } from '../Text'
import { Button } from '../Button'
import { CouponTag } from './CouponTag'

const { useState } = React

type Discount =
  | ShopifyStorefrontDiscountAllocation
  | ShopifyStorefrontDiscountApplication

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
      <DiscountTitle>
        <Heading level={4}>
          <CouponTag mr={3} />
          {/* @ts-ignore */}
          {discount.title || discount.code} ✓
        </Heading>
      </DiscountTitle>
      {!isAutomatic && removeDiscount ? (
        <RemoveButton pr={0} my={0} level={2} onClick={removeDiscount}>
          Remove
        </RemoveButton>
      ) : null}
    </DiscountLineWrapper>
  )
}

export const CouponCodes = () => {
  const [inputValue, setInputValue] = useState('')
  const {
    currentCheckout: checkout,
    applyDiscount,
    removeDiscount,
  } = useCheckout()

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

  const hasDiscount = Boolean(
    otherDiscounts.length || couponCodeDiscounts.length,
  )

  return (
    <Box mb={4}>
      <Heading textAlign="left" level={5}>
        Promo Code
      </Heading>

      {!hasDiscount ? (
        <CouponForm onSubmit={handleSubmit}>
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
      ) : null}

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
