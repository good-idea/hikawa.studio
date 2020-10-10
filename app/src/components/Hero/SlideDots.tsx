import styled, { css } from '@xstyled/styled-components'

export const SlideDots = styled.div`
  display: flex;
  justify-content: center;
`

interface WithActive {
  active: boolean
}

const SIZE = '10px'

export const SlideDot = styled.button<WithActive>`
  ${({ active }) => css`
    width: ${SIZE};
    height: ${SIZE};
    margin: 0 1;
    border-radius: ${SIZE};
    border: 1px solid black;
    background-color: ${active ? 'black' : 'transparent'};
    transition: 0.3s;
  `}
`
