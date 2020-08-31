import styled, { css } from '@xstyled/styled-components'

interface InputProps {
  disabled?: boolean | void
  locked?: boolean | void
}

export const Input = styled.inputBox<InputProps>`
  ${({ disabled, locked }) => css`
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

    font-size: 5;
    font-weight: 5;
    margin-right: 3;
    color: ${locked ? 'white' : 'black'};
    background-color: ${locked ? 'black' : 'white'};
    pointer-events: ${locked || disabled ? 'none' : 'inherit'};
    opacity: ${disabled ? '0.45' : 1};
  `}
`

export const TextArea = styled.textareaBox`
  border: 1px solid black;
  padding: 10px;
  resize: none;

  font-size: 5;
  font-weight: 5;
  margin-right: 3;
`
