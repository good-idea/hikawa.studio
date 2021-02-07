import * as React from 'react'
import Link from 'next/link'
import HTMLParser from 'html-parser-lite'
import { LinkInfo } from '../utils'
import { RichTextWrapper } from './RichText'
import { Heading, P, Ol, Ul, Li, Span } from './Text'

const { useMemo } = React

const css2obj = (css: string): Record<string, string> => {
  return css.split(';').reduce((ruleMap, ruleString) => {
    if (ruleString.length === 0) return ruleMap
    const rulePair = ruleString.split(':')
    ruleMap[rulePair[0].trim()] = rulePair[1].trim()
    return ruleMap
  }, {})
}

const wrapBareText = (text: string) =>
  text
    .replace(/^(?!<)(.*)(<\/\w+>)?/gm, '<span>$1</span>')
    .replace('<span></span>', '')

const internalUrlRegex = /^https?:\/\/(www.)?(localhost:3000|baileyhikawa.com|baileyhikawa.(good-idea.)?now.sh)(\/[\w|\/]+)?/

const parser = new HTMLParser()

const getLinkFromHref = (href: string): LinkInfo => {
  const { pathname } = new URL(href)
  return { href: pathname }
}

const entities = {
  amp: '&',
  apos: "'",
  '#x27': "'",
  '#x2F': '/',
  '#39': "'",
  '#47': '/',
  lt: '<',
  gt: '>',
  nbsp: ' ',
  quot: '"',
}

function decodeHTMLEntities(text: string) {
  return text.replace(/&([^;]+);/gm, function (match, entity) {
    return entities[entity] || match
  })
}

const transform = (node, index) => {
  const styles = css2obj(node?.attrs?.style ?? '')
  switch (node.tagName) {
    case 'document':
      return (
        <React.Fragment key={index}>
          {node.childNodes.map(transform)}
        </React.Fragment>
      )

    case 'text':
      return (
        <React.Fragment key={index}>
          {decodeHTMLEntities(node.textContent)}
        </React.Fragment>
      )
    case 'h1':
    case 'h2':
    case 'h3':
      return (
        <Heading style={styles} level={3} key={index}>
          {node.childNodes.map(transform)}
        </Heading>
      )

    case 'h4':
    case 'h5':
    case 'h6':
      return (
        <Heading style={styles} level={4} key={index}>
          {node.childNodes.map(transform)}
        </Heading>
      )
    case 'p':
    case 'span':
      if (node.parentNode && node.parentNode.tagName !== 'document') {
        return (
          <Span key={index} style={styles}>
            {node.childNodes.map(transform)}
          </Span>
        )
      }
      return (
        <P key={index} style={styles} fontWeight={3}>
          {node.childNodes.map(transform)}
        </P>
      )
    case 'ul':
      return <Ul key={index}>{node.childNodes.map(transform)}</Ul>
    case 'ol':
      return <Ol key={index}>{node.childNodes.map(transform)}</Ol>
    case 'li':
      return (
        <Li fontWeight={3} key={index}>
          {node.childNodes.map(transform)}
        </Li>
      )
    case 'em':
      return <em key={index}>{node.childNodes.map(transform)}</em>
    case 'strong':
      return <strong key={index}>{node.childNodes.map(transform)}</strong>
    case 'a':
      const href = node?.attrs?.href
      if (!href) return null

      const isInternal = internalUrlRegex.test(href)
      if (isInternal) {
        const { href: aHref } = getLinkFromHref(href)
        return (
          <Link key={index} href={aHref}>
            <a>{node.childNodes.map(transform)}</a>
          </Link>
        )
      }
      return (
        <a key={index} href={href} target="_blank" rel="noopener noreferrer">
          {node.childNodes.map(transform)}
        </a>
      )
    case 'meta':
      return null
    default:
      return (
        <React.Fragment key={index}>
          {node.childNodes.map(transform)}
        </React.Fragment>
      )
  }
}

interface ShopifyRichTextProps {
  text?: string | null
}
export const ShopifyRichText = ({ text }: ShopifyRichTextProps) => {
  if (!text) return null

  const parsed = useMemo(() => parser.parse(wrapBareText(text)), [text])
  const nodes = transform(parsed, 'root')
  return <RichTextWrapper>{nodes}</RichTextWrapper>
}
