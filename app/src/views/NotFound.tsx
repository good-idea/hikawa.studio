import * as React from 'react'
import Link from 'next/link'
import styled from '@xstyled/styled-components'
import { Heading } from '../components/Text'

const Wrapper = styled.div`
  min-height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

export const NotFound = () => {
  return (
    <Wrapper>
      <Heading color="darkGray" level={2}>
        Page Not Found
      </Heading>
      <Heading mt={5} level={3}>
        <Link href="/shop">
          <a>Return to Shop</a>
        </Link>
      </Heading>
    </Wrapper>
  )
}
