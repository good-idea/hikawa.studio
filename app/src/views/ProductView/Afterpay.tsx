import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { ShopifyMoneyV2 } from '../../types'

const { useRef, useEffect } = React

const Wrapper = styled.div`
  ${({ theme }) => css`
    margin-top: -${theme.space[5]}px;
    margin-bottom: 3;
    min-height: 46px;

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

const presentAfterpay =
  // @ts-ignore
  typeof window !== 'undefined' ? window.presentAfterpay : undefined

export const Afterpay = ({ price }: AfterpayProps) => {
  if (!price) return null
  const containerRef = useRef<HTMLDivElement>(null)
  const amount = price.amount
  if (!amount) throw new Error('No price was supplied')

  useEffect(() => {
    if (!containerRef.current || typeof presentAfterpay === 'undefined') return
    const dataContainer = document.querySelector('#afterpay-container')
    if (!dataContainer) return
    const afterpayText = dataContainer.querySelector('p.afterpay-paragraph')
    if (afterpayText) afterpayText.remove()

    try {
      const apiConfig = {
        priceSelector: '#afterpay-container > span',
        locale: 'en_US',
        currency: 'USD',
        afterpayLogoColor: 'color',
        amount: parseFloat(amount) * 100,
        minMaxThreshold: {
          min: 3500,
          max: 100000,
        },
      }
      /* eslint-disable-next-line */
      new presentAfterpay(apiConfig).init()
    } catch (err) {
      console.log(err)
    }
  }, [price, containerRef])

  return (
    <Wrapper ref={containerRef} id="afterpay-container">
      <span />
    </Wrapper>
  )
}
