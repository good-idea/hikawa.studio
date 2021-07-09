import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import * as BlockContent from '@sanity/block-content-to-react'
import { RichTextBlock, ListBlock } from '../types'
import { Heading, P, BlockQuote, Li, Ul, Ol } from './Text'
import { Image } from './Image'
import { VideoEmbed } from './VideoEmbed'
import { Accordion } from './Accordion'

interface CustomSerializerConfig {
  blockWrapper?: React.ComponentType
  imageSizes?: string
  weight?: number
}

interface WithArticle {
  article?: boolean
}

export const RichTextWrapper = styled.div<WithArticle>`
  ${({ theme, article }) => css`
    ${article
      ? css`
          h2 {
            line-height: 1.5em;
            margin: 0.6em 0;
          }
          h4,
          p {
            line-height: 1.8em;
            margin: 1em 0;
            font-size: 4;
          }
        `
      : ''}
    picture {
      max-width: 80%;
      margin: 80px auto;
    }

    * {
      line-height: 1.4em;
    }

    h1,
    h2,
    h2,
    h3,
    h4,
    h5 {
      margin-top: 1.6em;
      font-weight: 600;
      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }

    h3 {
      font-size: 3;
      ${theme.mediaQueries.tablet} {
        font-size: 3;
      }
      ${theme.mediaQueries.mobile} {
        font-size: 3;
      }
    }

    h4 {
      font-size: 5;
      ${theme.mediaQueries.tablet} {
        font-size: 5;
      }
    }

    p {
      font-weight: 400;
    }
    a {
      color: pink;
    }

    ${theme.mediaQueries.tablet} {
      picture {
        max-width: 80%;
        margin: 8 auto;
      }
    }
  `}
`

/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
const serializers = ({
  blockWrapper: Wrapper,
  imageSizes,
  weight: customWeight,
}: CustomSerializerConfig) => ({
  types: {
    accordion: (props: RichTextBlock) => {
      return <p>:)</p>
    },
  },
  list: (props: ListBlock) => {
    if (props.type === 'number') {
      return <Ol>{props.children}</Ol>
    }
    return <Ul>{props.children}</Ul>
  },
  listItem: (props) => <Li weight={3} {...props} />,
  block: (props: RichTextBlock): React.ReactNode => {
    const { node } = props
    /* If a custom block wrapper was passed in, use it instead.
     * This allows us to change a default P tag into a different size/style */
    if (Wrapper) return <Wrapper {...props} />
    const weight = customWeight ?? 4

    if (node._type === 'videoEmbed') {
      return <VideoEmbed video={node} />
    }

    if (node._type === 'accordion') {
      return <Accordion accordion={node} />
    }

    if (node._type === 'richImage') {
      return <Image image={node} sizes={imageSizes} />
    }
    const style = node.style || 'normal'
    // if (props.node._type === 'videoEmbed') return <VideoEmbed video={props.node} />

    switch (style) {
      case 'h1':
        return <Heading level={1} fontWeight={weight} {...props} />
      case 'h2':
        return <Heading level={2} fontWeight={weight} {...props} />
      case 'h3':
        return <Heading level={3} fontWeight={weight} {...props} />
      case 'h4':
        return <Heading level={4} fontWeight={weight} {...props} />
      case 'h5':
        return <Heading level={5} fontWeight={weight} {...props} />
      case 'h6':
        return <Heading level={6} fontWeight={weight} {...props} />
      case 'blockquote':
        return <BlockQuote {...props} />
      case 'normal':
        return <P weight={weight} {...props} />
      default:
        throw new Error(`There is no tag set up for "${style}"`)
    }
  },
})

interface RichTextProps {
  body?: { [key: string]: any } | null
  blockWrapper?: React.ComponentType
  wrapper?: React.ComponentType
  imageSizes?: string
  weight?: number
  article?: boolean
}

export const RichText = ({
  body,
  blockWrapper,
  wrapper: CustomWrapper,
  imageSizes,
  weight,
  article,
}: RichTextProps) => {
  const Wrapper = CustomWrapper || RichTextWrapper
  return body ? (
    <Wrapper article={article}>
      <BlockContent
        blocks={body}
        serializers={serializers({
          blockWrapper,
          imageSizes,
          weight,
        })}
      />
    </Wrapper>
  ) : null
}
