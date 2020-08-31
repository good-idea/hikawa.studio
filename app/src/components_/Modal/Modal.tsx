import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { useLockScroll } from '../../utils'

const { useEffect } = React

export const ModalInner = styled.div`
  background-color: white;
  border: 1px solid;
  border-color: lightGray;
  padding: 20px;
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.4);
  z-index: dialog;
  pointer-events: initial;
  margin: 50px auto;
  width: calc(100vw - 20px);
  max-width: 650px;
  max-height: calc(100vh - 100px);
  overflow-y: scroll;
`

const Background = styled.button`
  ${({ theme }) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: ${theme.zIndices.dialog - 1};
    background-color: rgba(50, 50, 50, 0.4);
  `};
`

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: dialog;
  pointer-events: none;
`

interface ModalProps {
  children?: React.ReactNode
  onBackgroundClick: () => void
  open: boolean
}

export const Modal = ({ children, onBackgroundClick, open }: ModalProps) => {
  const { lockScroll, unlockScroll } = useLockScroll()
  useEffect(() => {
    if (open) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }, [open])
  return open && children ? (
    <>
      <Background onClick={onBackgroundClick} />
      <ModalContainer>
        <ModalInner>{children}</ModalInner>
      </ModalContainer>
    </>
  ) : null
}
