import * as React from 'react'
import {
  PageLink as PageLinkType,
  RichText as RichTextType,
  RichImage as RichImageType,
  VideoEmbed as VideoEmbedType,
} from '../../types'
import { PageLink } from './PageLink'
import { RichText } from '../RichText'
import { VideoEmbed } from '../VideoEmbed'
import { Image } from '../Image'

type Block = RichImageType | PageLinkType | RichTextType | VideoEmbedType

interface ContentBlockProps {
  block: Block
  number: number
  largeText?: boolean
}

export const ContentBlock = ({ block, largeText }: ContentBlockProps) => {
  switch (block.__typename) {
    case 'VideoEmbed':
      return <VideoEmbed video={block} />
    case 'RichText':
      return <RichText body={block.blocksRaw} />
    case 'PageLink':
      const imageSizes = [
        '(max-width: 600px) 90vw',
        block.fullWidth ? '900px' : '450px',
      ].join(', ')

      return (
        <PageLink largeText={largeText} item={block} imageSizes={imageSizes} />
      )
    case 'RichImage':
      return <Image image={block} />
    default:
      throw new Error(
        // @ts-ignore
        `There is no component for block type "${block.__typename}"`,
      )
  }
}
