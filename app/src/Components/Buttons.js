// @flow
import styled from 'styled-components'

export const Button = styled.button`
	${({ theme, disabled, size }) => `
		padding: ${theme.layout.spacing.half} ${theme.layout.spacing.single};
		font-size: ${theme.type.size.h5};
		color: black;
		text-transform: uppercase;
		text-align: center;
		font-weight: ${theme.type.weight.semi};
		background-color: white;
		border: 1px solid;
		opacity: ${disabled ? '0.25' : '1'};
		transition: 0.1s;
		pointer-events: ${disabled ? 'none' : 'auto'};
		min-width: ${size === 'medium' ? '120px' : '0'};

		&:hover {
			background-color: ${theme.color.offset};
		}
	`};
`

export const SecondaryButton = styled.button`
	${({ theme }) => `
		color: ${theme.color.middleGray};
		padding: 6px;
		font-size: ${theme.type.size.h4};
		margin-top: ${theme.layout.spacing.single};
		&:hover {
			color: ${theme.color.darkGray};
		}
	`}
`
