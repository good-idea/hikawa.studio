import styled, { css } from '@xstyled/styled-components'
import { RgbaColor } from '../../types'
import { Button } from '../../components/Button'

/**
 * Main Product view
 */

export const Layout = styled.div`
  ${({ theme }) => css`
    padding-top: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 6;

    ${theme.mediaQueries.tablet} {
      grid-template-columns: 100%;
      grid-row-gap: 6;
    }
  `}
`

export const Images = styled.div`
  display: grid;
  grid-row-gap: 3;
`

export const Description = styled.div`
  position: relative;
  margin-top: 11;
  align-self: flex-start;
`

export const RelatedWrapper = styled.div`
  ${({ theme }) => css`
    margin: 10 0;

    ${theme.mediaQueries.mobile} {
      margin: 5 0;
    }
  `}
`

export const LinkButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const RelatedItems = styled.div`
  ${({ theme }) => css`
    margin: 10 0;
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 5;
    grid-row-gap: 5;
    justify-content: center;
    border-top: 1px solid rgb(100, 100, 100);
    padding: 6 0;

    ${theme.mediaQueries.mobile} {
      margin: 6 0;
      grid-column-gap: 3;
    }
  `}
`

export const RelatedTitle = styled.div`
  flex-basis: 100%;
  text-align: center;
  margin-bottom: 5;

  h2 {
    margin-bottom: 3;
  }

  hr {
    width: 50%;
    margin: 0 auto 3;
    border: 1px solid currentColor;
  }
`

export const MobileTitle = styled.div`
  ${({ theme }) => css`
    display: none;

    ${theme.mediaQueries.mobile} {
      margin: 0;
      display: initial;
    }
  `}
`

/**
 * Product Description
 */

export const ProductDescriptionTitle = styled.div`
  ${({ theme }) => css`
    margin-top: 0;
    margin-bottom: 4;

    ${theme.mediaQueries.mobile} {
      display: none;
    }
  `}
`

export const ExtraDescription = styled.div`
  color: darkGray;
  margin: 5 0;
`

// const ExtraDescriptionText = styled(Header5)`
//   font-weight: 400;
//   & + & {
//     margin-top: 1em;
//   }
// `

// const ShopifyDescription = styled(P)`
//   & > p {
//     margin-bottom: 0.5em;
//   }
// `

export const ButtonContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-start;
    ${theme.mediaQueries.mobile} {
      margin: 0 auto;
      flex-direction: column;
      justify-content: center;
      display: block;
      text-align: center;

      button {
        display: block;
        margin-left: auto;
        margin-right: auto;
        line-height: 35px;
      }
    }
  `}
`

export const BuyButton = styled(Button)`
  border-width: 3px;
  border-color: offset;
  height: 45px;
  padding: 0 3;
  font-size: 4;

  &:hover {
    background-color: yellow;
    border-color: yellow;
  }
`

export const VariantWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mediaQueries.mobile} {
      text-align: center;
    }
  `}
`

export const KlaviyoFormWrapper = styled.div`
  margin-top: 5;

  form {
    margin: 0 !important;
    opacity: 1;
  }
`

export const ProductDescriptionWrapper = styled.div`
  text-align: left;
  padding-bottom: 6;
`

/*
 * Variant Selector
 */

export const VariantSelectorWrapper = styled.div`
  ${({ theme }) => css`
    margin: 5 0;

    ${theme.mediaQueries.mobile} {
      text-align: center;
    }
  `};
`

export const Table = styled.div`
  flex-direction: column;
  display: inline-flex;
  min-width: 200px;
  flex-direction: column;
  background-color: white;
  margin-top: 1px;
  margin-bottom: 3;
  border: 1px solid;
  box-shadow: 2px 2px rgb(100, 100, 100);
  padding-bottom: 1px;
`

interface WithActive {
  active?: boolean
}
export const PriceWrapper = styled.div<WithActive>`
  ${({ active }) => css`
    opacity: ${active ? '1' : '0'};
    text-align: center;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`

const toRGBA = ({ r, g, b, a }: RgbaColor, alpha?: number) =>
  `rgba(${r}, ${g}, ${b}, ${alpha !== undefined ? alpha : a})`

interface VariantButtonProps {
  active: boolean
  available: boolean
  highlight?: RgbaColor | null
}

export const VariantButton = styled.button<VariantButtonProps>`
  ${({ active, available, highlight }) => css`
		padding: 2 3;
		width: 100%;
		text-align: left;
    cursor: ${available ? 'pointer' : 'auto'};

    background-color: ${
      active
        ? highlight
          ? toRGBA(highlight)
          : 'mint'
        : highlight
        ? toRGBA(highlight, 0.0)
        : 'mintLight'
    };

		cursor: ${available ? 'pointer' : 'not-allowed'}
		border-color: black;
		margin: 0;
		display: flex;
		justify-content: space-between;
		
		&:hover {
  background-color: ${
    active
      ? highlight
        ? toRGBA(highlight)
        : 'mint'
      : highlight
      ? toRGBA(highlight, 0.3)
      : 'mintLight'
  };


			${PriceWrapper} {
				opacity: 1;
			}
		}
	`};
`

// const VariantTitle = styled(Header4)`
//   text-align: 'center';
// `

export const PriceInner = styled.div`
  position: relative;
  display: inline;
`

const VariantPrice = styled.div``

export const SoldOut = styled.div`
  background-color: white;
  border: 1px solid;
  padding: 3px;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 90%;
  margin: 0;
  display: flex;
  justify-content: flex-center;
  align-items: center;
  white-space: nowrap;
  font-style: italic;
  transform: translate(-50%, -50%);

  & + ${VariantPrice} {
    opacity: 0.2;
  }
`
