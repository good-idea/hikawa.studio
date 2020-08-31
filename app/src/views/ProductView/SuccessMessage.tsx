import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { useCheckout } from '../../providers'

const { useState, useEffect } = React

const ShowCartButton = styled.button`
  ${({ theme }) => css`
    margin-left: 3;
    font-size: 5;
    font-weight: 5;
    color: pink;
    display: inline;
    position: relative;
    text-transform: initial;
    border: none;

    &:hover {
      box-shadow: none;
    }
    ${theme.mediaQueries.mobile} {
      margin-top: 5px;
      text-align: center;
    }
  `}
`

interface PriceMessageProps {
  visible: boolean
  shift: string
}

const PriceMessage = styled.span<PriceMessageProps>`
  ${({ visible, shift, theme }) => css`
    position: absolute;
    left: 0;
    top: 0;
    white-space: nowrap;
    height: 100%;
    display: flex;
    align-items: center;

    opacity: ${visible ? 1 : 0};
    transition: 0.4s;
    transform: translateY(
      ${shift === 'down' ? '-15px' : shift === 'up' ? '15px' : '0'}
    );

    ${theme.mediaQueries.mobile} {
      width: 100%;
      text-align: center;
      display: block;
      & + & {
        position: static;
      }
    }
  `}
`

interface SuccessMessageProps {
  visible: boolean
}

export const SuccessMessage = ({ visible }: SuccessMessageProps) => {
  const { openCart } = useCheckout()
  const [showCheckoutText, setShowCheckoutText] = useState(false)
  const showText = () => setShowCheckoutText(true)
  useEffect(() => {
    if (!visible) return
    const timeout = setTimeout(showText, 2000)
    return () => clearTimeout(timeout)
  }, [visible])
  return (
    <ShowCartButton onClick={openCart}>
      <PriceMessage
        visible={visible && !showCheckoutText}
        shift={
          visible && !showCheckoutText
            ? 'none'
            : visible && showCheckoutText
            ? 'down'
            : 'up'
        }
      >
        <span role="img" aria-label="sparkles">
          ✨
        </span>
        Added to your Tote
      </PriceMessage>
      <PriceMessage
        visible={visible && showCheckoutText}
        shift={visible && showCheckoutText ? 'none' : 'up'}
      >
        → Continue to Checkout
      </PriceMessage>
    </ShowCartButton>
  )
}
