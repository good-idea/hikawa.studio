import {
  Block,
  RichImage,
  VideoEmbed,
  SanityImageHotspot,
  SanityImageCrop,
  Accordion,
} from './generated-sanity'

interface BlockNode<T> {
  node: T
  isInline?: boolean
  children: React.ReactNode[]
}

interface TextBlock extends Omit<Block, '_type'> {
  _type: 'block'
}

interface ImageBlock extends Omit<RichImage, '_type'> {
  _type: 'richImage'
}

interface VideoBlock extends Omit<VideoEmbed, '_type'> {
  _type: 'videoEmbed'
}

export interface AccordionBlock extends Omit<Accordion, '_type'> {
  _type: 'accordion'
  body: Record<string, any>[]
}

export type RichTextBlock =
  | BlockNode<TextBlock>
  | BlockNode<ImageBlock>
  | BlockNode<VideoBlock>
  | BlockNode<AccordionBlock>

export interface SanityRawImage {
  __typename: void
  _key: string
  _type: 'richImage' | 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  crop: SanityImageCrop
  hotspot: SanityImageHotspot
  altText?: string
}

export interface ListBlock {
  type: 'bullet' | 'number'
  level: number
  children: React.ReactNode[]
}
