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
		border-radius: 5px;
		background-color: ${theme.color.highlight};
		opacity: ${disabled ? '0.25' : '1'};
		transition: 0.1s;
		pointer-events: ${disabled ? 'none' : 'auto'};
		min-width: ${size === 'medium' ? '120px' : '0'};

		&:hover {
			background-color: ${theme.color.offset};
		}
	`};
`
