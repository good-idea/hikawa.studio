// @flow
import * as React from 'react'
import styled from 'styled-components'
import Cart from './Cart'
import Menu from './Menu'

/**
 * Nav
 */

const NavWrapper = styled.nav`
	${({ theme }) => `
		position: absolute;
		padding: ${theme.layout.spacing.double};
		z-index: ${theme.layout.z.cart}
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	`}
`

const Nav = () => {
	return (
		<NavWrapper>
			<Cart />
			<Menu />
		</NavWrapper>
	)
}

export default Nav
