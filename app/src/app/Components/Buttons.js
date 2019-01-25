// @flow
import styled from 'styled-components'

export const Button = styled.button`
	${({ theme, disabled, size }) => `
		padding: 0 ${theme.layout.spacing.single};
		height: 35px;
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: ${theme.type.size.h5};
		color: black;
		text-transform: uppercase;
		text-align: center;
		font-weight: ${theme.type.weight.semi};
		background-color: white;
		border: 1px solid;
		opacity: ${disabled ? '0.25' : '1'};
		pointer-events: ${disabled ? 'none' : 'auto'};
		min-width: ${size === 'medium' ? '120px' : '0'};

		&:hover {
			box-shadow: 2px 2px rgb(100, 100, 100);
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
