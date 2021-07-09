import * as React from 'react'
import styled from '@xstyled/styled-components'
import { Heading } from '../Text'

export const Wrapper = styled.div`
  background-color: white;
  border: 1px solid;
  padding: 3px;
  border-radius: 3px;
  margin: 0;
  display: flex;
  justify-content: flex-center;
  align-items: center;
  white-space: nowrap;
  font-style: italic;
`

interface SoldOutProps {
  /* */
}

export const SoldOut: React.FC<SoldOutProps> = (props) => {
  return (
    <Wrapper>
      <Heading my={0} level={5}>
        Unavailable
      </Heading>
    </Wrapper>
  )
}
