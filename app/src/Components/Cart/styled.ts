import styled, { css } from '@xstyled/styled-components'
import { Input } from '../Forms'

interface WithIsLoading {
  isLoading: boolean
}

/* Main */

export const SummaryWrapper = styled.div<WithIsLoading>`
  ${({ isLoading }) => `
		opacity: ${isLoading ? '0.5' : '1'};
		pointer-events: ${isLoading ? 'none' : 'auto'};
	`};
`

export const LineItems = styled.div`
  padding: 10px;
`

export const CheckoutTextWrapper = styled.div`
  margin: 0 auto 2;
  text-align: center;
`

/* Line Item */

export const CartGrid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 15px;

    ${theme.mediaQueries.mobile} {
      grid-column-gap: 8px;
      grid-template-columns: repeat(4, 1fr) 35px;
    }
  `}
`

interface WithAlign {
  align?: string
}

export const CartGridSegment = styled.div<WithAlign>`
  ${({ align }) => css`
    display: flex;
    flex-direction: column;
    align-items: ${align || 'flex-start'};
    justify-content: center;
  `};
`

export const MainSegment = styled(CartGridSegment)`
  grid-column: span 3;
`

export const CartLineItemWrapper = styled(CartGrid)`
  padding: 4 0;
  border-bottom: 1px solid black;

  &:first-child {
    border-top: 1px solid black;
  }
`

/* Quantity */

export const QuantityInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const QuantityInput = styled(Input)`
  text-align: center;
  font-size: 6;
  width: 35px;
  margin: 0;
`

interface WithIsIncrementor {
  isIncrementor?: boolean
}

export const CartButton = styled.button<WithIsIncrementor>`
  ${({ theme, isIncrementor }) => css`
    opacity: 0;
    margin: 2 0;
    font-size: 6;
    font-weight: 3;
    color: middleGray;

    ${CartLineItemWrapper}:hover & {
      opacity: 1;
    }

    &:hover {
      color: black;
    }

    ${theme.mediaQueries.tablet} {
      opacity: 1;
      ${isIncrementor ? 'display: none' : ''};
    }
  `};
`

export const Centered = styled.div`
  text-align: center;
`

export const ModalInputWrapper = styled.div`
  margin: 5 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 300px;
`

/* Coupon */
export const CouponForm = styled.form`
  margin: 4 0 2;
  display: flex;
  flex-wrap: wrap;

  h5 {
    flex-basis: 1;
  }

  input {
    flex-grow: 1;
    max-width: initial;
  }

  button {
    margin-top: 0;
  }
`

export const DiscountLineWrapper = styled.div`
  display: flex;
`
