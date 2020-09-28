import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import styled from '@xstyled/styled-components'
import { Tote } from './Tote'
import { useCheckout } from '../../providers'

const CartButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: initial;
  position: sticky;
  border: 1px solid currentColor;
  top: 3;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.2);
  font-size: 34px;
  height: 42px;
  width: 42px;

  &:hover {
    box-shadow: 3px 3px rgba(0, 0, 0, 0.8);
  }

  & > svg {
    width: 0.9em;
  }
`

const CartCount = styled.span`
  margin-left: 0.5em;
  position: absolute;
  color: white;
  margin-left: 0;
  bottom: 13%;
  font-size: 0.45em;
`

export const Cart = () => {
  const { currentCheckout, openCart } = useCheckout()
  const [lineItems] = unwindEdges(currentCheckout?.lineItems)
  const cartCount = lineItems.reduce((acc, li) => acc + li.quantity, 0)
  return (
    <CartButton onClick={openCart}>
      <Tote />
      {cartCount > 0 ? <CartCount>{cartCount}</CartCount> : null}
    </CartButton>
  )
}
