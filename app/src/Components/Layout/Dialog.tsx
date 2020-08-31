import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'

const { useEffect } = React

interface WithIsOpen {
  isOpen: boolean
}
const DialogWrapper = styled.div<WithIsOpen>`
  ${({ isOpen }) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: dialog;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${isOpen ? '1' : '0'};
    pointer-events: ${isOpen ? 'auto' : 'none'};
    transition: 0.3s;
  `}
`

const DialogBackground = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.6);
`

const DialogInner = styled.div`
  ${({ theme }) => css`
    z-index: 10;
    width: calc(100% - 5rem);
    max-width: 500px;
    padding: 5;
    background: white;
    border-radius: 2px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);

    ${theme.mediaQueries.mobile} {
      width: calc(100% - 20px);
      padding: 3;
    }
  `}
`

interface DialogProps {
  isOpen: boolean
  close: () => void
  children: React.ReactNode
}

export const Dialog = ({ isOpen, close, children }: DialogProps) => {
  const handleKey = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') close()
  }

  useEffect(() => {
    document.addEventListener('keydown' as const, handleKey)
    return () => document.removeEventListener('keydown' as const, handleKey)
  })

  return (
    <DialogWrapper isOpen={isOpen} aria-hidden={!isOpen}>
      <DialogBackground onClick={close} />
      <DialogInner>{children}</DialogInner>
    </DialogWrapper>
  )
}
