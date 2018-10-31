// @flow
import styled from 'styled-components'

export const Button = styled.button`
	${({ theme, disabled }) => `
		padding: ${theme.layout.spacing.half} ${theme.layout.spacing.single};
		font-size: ${theme.type.size.h5};
		color: white;
		text-transform: uppercase;
		font-weight: ${theme.type.weight.semi};
		border: 1px solid transparent;
		border-bottom-width: 2px;
		border-bottom-color: rebeccaPurple;
		border-radius: 5px;
		background-color: #a76fa7;
		opacity: ${disabled ? '0.25' : '1'};
		transition: 0.2s;
		pointer-events: ${disabled ? 'none' : 'auto'};

		&:hover {
			background-color: #bd6fbd;
		}
	`};
`
