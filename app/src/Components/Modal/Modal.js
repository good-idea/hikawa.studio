// @flow
import * as React from 'react'
import styled from 'styled-components'

export const ModalInner = styled.div`
	${({ theme }) => `
		background-color: white;
		border: 1px solid lightGray;
		border-radius: 4px;
		padding: 20px;
		box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
		z-index: ${theme.layout.z.dialog};
		pointer-events: initial;
		margin: 50px auto;
	`};
`

const Background = styled.button`
	${({ theme }) => `
		${theme.mixins.fixedFullSize};
	   z-index: ${theme.layout.z.dialog - 1};
		background-color: rgba(0, 0, 0, 0.2);
	`};
`

export const ModalContainer = styled.div`
	${({ theme }) => `
		${theme.mixins.fixedFullSize};
		${theme.mixins.flexCenter};
		z-index: ${theme.layout.z.dialog};
		overflow-y: scroll;
		pointer-events: none;
	`};
`

type Props = {
	children?: React.Node,
	onBackgroundClick: () => void,
	open: boolean,
}

const Modal = ({ children, onBackgroundClick, open }: Props) =>
	open && children ? (
		<Background onClick={onBackgroundClick}>
			<ModalContainer>
				<ModalInner>{children}</ModalInner>
			</ModalContainer>
		</Background>
	) : null

Modal.defaultProps = { children: null }

export default Modal
