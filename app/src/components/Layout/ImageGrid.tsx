import styled, { css } from '@xstyled/styled-components'

interface ImageGridProps {
  limit?: boolean
}

export const ImageGrid = styled.div`
  ${({ theme, limit }) => css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 5;
    grid-row-gap: 5;
    margin: 5 0;

    ${
      limit
        ? css`
            *:nth-child(n + 6) {
              display: none;
            }
          `
        : ``
    }

    ${theme.mediaQueries.mobile} {
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 3;
      grid-row-gap: 3;
      margin: 3 0;
    ${
      limit
        ? css`
            *:nth-child(n + 6) {
              display: block;
            }
          `
        : ``
    }

      }
    }
  `}
`
