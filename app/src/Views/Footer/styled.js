// @flow

import styled, { css } from 'styled-components'
import { Header4 } from 'Components/Type'

export const Wrapper = styled.footer`
	${({ theme }) => css`
		border-top: 1px solid black;
		padding: calc(${theme.layout.spacing.triple} * 3) ${theme.layout.spacing.triple};
		display: flex;
		justify-content: space-between;
		background-size: cover;
		background-position: center;
		font-weight: ${theme.type.weight.semi};

		${theme.media.queries.tablet`
			flex-direction: column;
			text-align: center;
			padding: ${theme.layout.spacing.triple}; 
		`}
	`};

	& a {
		color: inherit;

		&:hover {
			color: white;
		}
	}
`

export const FooterLink = styled(Header4)`
	&:hover {
		color: white;
	}
`

export const FooterSection = styled.div`
	${({ theme }) => css`
		flex-grow: 1;
		flex-basis: calc(100% / 3);
		margin: 0 ${theme.layout.spacing.double};

		${theme.media.queries.tablet`
			flex-grow: auto;
			flex-basis: auto;
			margin: ${theme.layout.spacing.double} 0;
		`}
	`};
`
