import * as React from 'react'
import Link from 'next/link'
import styled, { css, BoxProps } from '@xstyled/styled-components'

interface ButtonElementProps extends BoxProps {
  level?: 1 | 2
}

const ButtonElement = styled.buttonBox<ButtonElementProps>`
  ${({ disabled, level }) => css`
    padding: 0 3;
    height: 35px;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 6;
    font-weight: 5;
    text-transform: uppercase;
    text-align: center;
    opacity: ${disabled ? '0.25' : '1'};
    pointer-events: ${disabled ? 'none' : ''};
    cursor: pointer;

    ${level === undefined || level === 1
      ? css`
          background-color: white;
          border: 1px solid;

          color: black;
          &:hover {
            box-shadow: 2px 2px rgb(100, 100, 100);
          }
        `
      : level === 2
      ? css`
          color: middleGray;
          padding: 6px;
          margin-top: 3;
          &:hover {
            color: darkGray;
          }
        `
      : ''}
  `};
`

interface ButtonProps extends ButtonElementProps {
  type?: 'button' | 'submit' | 'reset'
  label?: string
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

export const Button = ({
  onClick,
  level,
  type,
  children,
  disabled,
  label,
  ...rest
}: ButtonProps) => {
  if (!children && !label) {
    throw new Error('You must provide either a label or children')
  }

  return (
    <ButtonElement
      level={level}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {children || label}
    </ButtonElement>
  )
}

interface LinkButtonProps extends ButtonElementProps {
  href: string
  as?: string
  children: React.ReactNode
}

export const LinkButton = ({
  href,
  as,
  children,
  ...rest
}: LinkButtonProps) => (
  <Link href={href} as={as}>
    <a>
      <ButtonElement {...rest} as="span">
        {children}
      </ButtonElement>
    </a>
  </Link>
)
