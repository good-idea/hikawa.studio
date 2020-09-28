import * as React from 'react'
import styled, { css, Box, BoxProps } from '@xstyled/styled-components'

interface CustomTextProps extends BoxProps {
  htmlFor?: string
}

const createTextBase = (as: any) => styled(as)`
  ${() => css`
    margin: 2 0 0.5em;

    strong {
      font-weight: 5;
    }

    em {
      font-style: italic;
    }
  `}
`

const TextBase = createTextBase(Box)

interface HeadingProps extends Omit<CustomTextProps, 'theme'> {
  children: React.ReactNode
  level: number
  // TODO: type these properly
  style?: any
  as?: any
}

const hTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

export const Heading = ({
  children,
  level,
  as,
  htmlFor,
  ...rest
}: HeadingProps) => {
  if (level < 0 || level > 6) throw new Error('Heading level must be 0-5')
  const tag = as ? as : hTags[level - 1] || hTags[0]
  return (
    <TextBase as={tag} level={level} htmlFor={htmlFor} {...rest}>
      {children}
    </TextBase>
  )
}

type PProps = BoxProps & Omit<HeadingProps, 'level'>

export const P = ({ children, color, htmlFor, ...rest }: PProps) => {
  return (
    <TextBase as="p" level={5} color={color} htmlFor={htmlFor} {...rest}>
      {children}
    </TextBase>
  )
}

P.defaultProps = {
  family: 'sans',
  weight: 3,
}

interface LabelProps {
  htmlFor: string
  children: string
}

export const LabelBase = createTextBase('label')

export const Label = styled(LabelBase)`
  ${({ color }) => css`
    font-size: 5;
    color: ${color || 'body.6'};
    margin: 0;
  `}
`

const SpanBase = styled.spanBox``

export const Span = styled(createTextBase(SpanBase))`
  font-size: inherit;

  &[role='button'] {
    cursor: pointer;
    text-decoration: underline;
  }
`

export const TextAnchor = styled.a``

export const BlockQuote = styled.blockquote``

const listStyles = css`
  margin: 5 0;
  line-height: inherit;
  padding-left: 2em;
`

export const Ol = styled.ol`
  ${listStyles};
`

export const Ul = styled.ul`
  ${listStyles};
`
const LiBase = createTextBase('li')

export const Li = styled(LiBase)`
  font-weight: 3;
  font-size: 4;
  margin: 0;

  & + & {
    margin-top: 0.25em;
  }
`

Li.defaultProps = {
  family: 'sans',
  color: 'bodyMain',
}

export const Input = styled.input`
  border: 1px solid;
  border-color: body.4;
  font-family: serif;
  font-size: 5;
  width: 100%;
  height: 32px;
  padding: 0 3;

  &:focus {
    border-color: body.6;
  }
`
