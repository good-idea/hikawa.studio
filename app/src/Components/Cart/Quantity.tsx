import * as React from 'react'
import { ShopifyStorefrontCheckoutLineItem } from '../../types'
import {
  CartGridSegment,
  QuantityInput,
  QuantityInputWrapper,
  CartButton,
} from './styled'

const { useState, useEffect } = React

interface QuantityProps {
  item: ShopifyStorefrontCheckoutLineItem
  updateQuantity: (amt: number) => Promise<void>
}

export const Quantity = ({ item, updateQuantity }: QuantityProps) => {
  const [quantity, setQuantity] = useState(item.quantity)

  useEffect(() => {
    if (quantity === item.quantity) return
    const submitUpdate = () => updateQuantity(quantity)
    const timeoutId = setTimeout(submitUpdate, 800)
    return () => clearTimeout(timeoutId)
  }, [quantity, item.quantity])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(
      parseInt(e.target.value.replace(/\D/g, ''), 10) || 1,
      1,
    )
    setQuantity(newQuantity)
  }

  const adjust = (adjustment: number) => () => {
    const newQuantity = Math.max(0, quantity + adjustment)
    setQuantity(newQuantity)
  }

  const submitUpdate = () => updateQuantity(quantity)

  const remove = () => updateQuantity(0)

  return (
    <CartGridSegment align="center">
      <CartButton onClick={remove}>remove</CartButton>
      <QuantityInputWrapper>
        <CartButton isIncrementor onClick={adjust(1)}>
          <span aria-label="Increase Quantity" role="img">
            ➕
          </span>
        </CartButton>
        <QuantityInput
          type="number"
          value={quantity || ''}
          onChange={onChange}
        />
        <CartButton isIncrementor onClick={adjust(-1)}>
          <span aria-label="Decrease Quantity" role="img">
            ➖
          </span>
        </CartButton>
      </QuantityInputWrapper>
      <CartButton onClick={submitUpdate}>update</CartButton>
    </CartGridSegment>
  )
}
