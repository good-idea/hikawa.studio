import styled, { css } from '@xstyled/styled-components'

interface ColumnProps {
  width: string
}
export const Column = styled.section<ColumnProps>`
  ${({ theme, width }) => css`
    margin: 3 auto;
    padding: 3 0;
    width: calc(100% - (${theme.space[3]}px * 2));
    max-width: ${width};
  `};
`
