import styled, { Box, css } from '@xstyled/styled-components'

export const AccordionWrapper = styled(Box)`
  border-top: 1px solid;
  border-bottom: 1px solid;
  padding: 3;

  & + & {
    border-top: none;
  }
`

export const AccordionInner = styled(Box)``

export const AccordionButton = styled.button`
  display: flex;
  width: 100%;

  justify-content: space-between;
  align-items: center;
`

export const AccordionIcon = styled.span`
  width: 1em;

  height: 1em;
  font-size: 3;
`
