import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'

const SIZE = '18px'
const STROKE = '3px'

interface WithPosition {
  position: 'previous' | 'next'
}

const Carat = styled.div`
  width: ${SIZE};
  height: ${SIZE};
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${STROKE};
    background-color: black;
  }

  &:before {
    transform: rotate(90deg) translateY(${STROKE});
    transform-origin: 100% 100%;
  }
`

const ButtonWrapper = styled.button<WithPosition>`
  ${({ position }) => css`
    position: absolute;
    top: calc(50% - (${SIZE}) / 2);
    background-color: transparent;

    transform: ${position === 'previous' ? 'rotate(45deg)' : 'rotate(225deg)'};
    ${position === 'previous'
      ? css`
          left: 12px;
        `
      : css`
          right: 12;
        `};
  `}
`

interface SlideButtonProps extends WithPosition {
  onClick: () => void
}

export const SlideButton = ({ onClick, position }: SlideButtonProps) => {
  return (
    <ButtonWrapper position={position} onClick={onClick}>
      <Carat />
    </ButtonWrapper>
  )
}
