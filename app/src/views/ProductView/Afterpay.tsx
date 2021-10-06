import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { ShopifyMoneyV2 } from '../../types'

const Wrapper = styled.div`
  ${({ theme }) => css`
    margin-top: -${theme.space[5]}px;
    margin-bottom: 3;
    min-height: 46px;
    color: gray;

    .afterpay-logo-link {
      display: block;
      margin-top: 2px;
    }
    img {
      display: inline;
    }
    p {
      font-size: 5;
      font-weight: 300;
    }
  `}
`

interface AfterpayProps {
  price?: ShopifyMoneyV2 | null
}

export const Afterpay = ({ price }: AfterpayProps) => {
  if (!price) return null
  if (!price.amount) throw new Error('No price was supplied')
  const amount = parseFloat(price.amount).toString().padEnd(2, '0')

  return (
    <Wrapper>
      {/* @ts-ignore */}
      <afterpay-placement
        data-locale="en_US"
        data-currency="USD"
        data-amount={amount}
        data-min="35.00"
        data-max="1000.00"
      />
    </Wrapper>
  )
}
