// @flow
import styled, { css } from 'styled-components'

const commonHeaderStyles = css`
	${({ theme, align, weight, color }) => `
		font-weight: ${theme.type.weight[weight] || theme.type.weight.semi};
		color: ${theme.color[color] || 'inherit'};
		text-align: ${align || 'inherit'};
		margin: 0.3em 0;
	`};
`

export const Header1 = styled.h1`
	${commonHeaderStyles};
	${({ theme }) => `
		font-size: ${theme.type.size.h1};
	`};
`

export const Header2 = styled.h2`
	${commonHeaderStyles};
	${({ theme }) => `
		font-size: ${theme.type.size.h2};
	`};
`

export const Header3 = styled.h3`
	${commonHeaderStyles};
	${({ theme }) => `
		font-size: ${theme.type.size.h3};
	`};
`

export const Header4 = styled.h4`
	${commonHeaderStyles};
	${({ theme }) => `
		font-size: ${theme.type.size.h4};
	`};
`

export const Header5 = styled.h5`
	${commonHeaderStyles};
	${({ theme }) => `
		font-size: ${theme.type.size.h5};
	`};
`

export const Header6 = styled.h6`
	${commonHeaderStyles};
	${({ theme }) => `
		font-size: ${theme.type.size.h6};
	`};
`

export const P = styled.p`
	${({ theme, align }) => `
		text-align: ${align || 'inherit'};
		font-size: ${theme.type.size.p};
		margin: 0.5em 0;
	`};
`

export const TextAnchor = styled.a`
	${({ theme }) => `
		color: ${theme.color.pink};
	`};
`

export const BlockQuote = styled.blockquote``

const listStyles = css`
	${({ theme }) => `
		margin: ${theme.layout.spacing.single} 0;
		padding-left: 2em;
	`};
`

export const Ol = styled.ol`
	${listStyles};
`

export const Ul = styled.ul`
	${listStyles};
`

export const Li = styled.li`
	& > ${Ol}, & > ${Ul} {
		margin: 0;
	}
`
