import styled, { css } from '@xstyled/styled-components'
import { PageLinkOrRichText } from '../../types'

export const HomepageWrapper = styled.div``

export const Grid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 5;

    ${theme.mediaQueries.mobile} {
      grid-gap: 4;
    }
  `}
`

interface BlockWrapperProps {
  block: PageLinkOrRichText
}

export const BlockWrapper = styled.div<BlockWrapperProps>`
  ${({ block }) => css`
    grid-column: span ${block.fullWidth ? '2' : '1'};
    text-align: center;
    border: ${block.__typename === 'RichText' ? '2px solid' : 'none'};
    padding: ${block.__typename === 'RichText' ? '5' : '0'};
  `}
`
