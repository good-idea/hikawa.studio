// @flow
import styled from 'styled-components'

export const Input = styled.input`
	flex-grow: 1;
	max-width: 170px;
	border: 1px solid black;
	padding: 10px;
	height: 35px;
	margin: 0;

	&::-webkit-inner-spin-button,
	&::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	${({ theme, locked }) => `
		font-size: ${theme.type.size.h5};
		font-weight: ${theme.type.weight.semi};
		margin-right: ${theme.layout.spacing.single}
		color: ${locked ? 'white' : 'black'};
		background-color: ${locked ? 'black' : 'white'};
		pointer-events: ${locked ? 'none' : ''};
	`};
`

export const TextArea = styled.textarea`
	border: 1px solid black;
	padding: 10px;
	resize: none;

	${({ theme }) => `
		font-size: ${theme.type.size.h5};
		font-weight: ${theme.type.weight.semi};
		margin-right: ${theme.layout.spacing.single}
	`};
`
