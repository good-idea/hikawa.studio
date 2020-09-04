import * as React from 'react'
import client from 'part:@sanity/base/client'
import styled from 'styled-components'
import { FaParagraph } from 'react-icons/fa'

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const ImagePreview = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  margin: 0px 10px 0px 5px;
  background-color: lightGray;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.p`
  margin: 0;
`

const SubTitle = styled.h5`
  color: lightGray;
  font-weight: normal;
  margin: 0;
`

/**
 * PageLinkPreview
 */

const getLinkInfo = async (link) => {
  if (link._type === 'externalLink') {
    return {
      linkTitle: link.url,
      subtitle: 'External Link',
    }
  }
  if (link._ref) {
    const linkedPage = await client.getDocument(link._ref)
    return {
      linkTitle: linkedPage.title,
      subtitle: 'Page',
    }
  }
  return {
    linkTitle: link.title,
    subtitle: link.itemType,
    linkedSrc: link.previewImage,
  }
}

class PageLinkPreview extends React.Component {
  state = {
    src: undefined,
    title: '',
    subtitle: undefined,
  }

  componentDidMount() {
    this.fetchValues()
  }

  componentWillReceiveProps(nextProps) {
    this.fetchValues(nextProps)
  }

  fetchValues = async (props = this.props) => {
    if (!props || !props.value) return
    const { link, label, image } = props.value
    if (!link || !link.length) return

    const { linkTitle, subtitle, linkedSrc } = await getLinkInfo(link[0])
    const userImage =
      image && image.asset ? await client.getDocument(image.asset._ref) : null
    const userSrc = userImage ? `${userImage.url}?w=100` : null
    this.setState({
      src: userSrc || linkedSrc,
      title: label || linkTitle,
      subtitle,
    })
  }

  render() {
    const { src, title, subtitle } = this.state
    return (
      <Wrapper>
        <span role="img" aria-label="Links to:">
          🔗
        </span>
        {src && <ImagePreview src={src} />}
        <TextWrapper>
          <Title>{title}</Title>
          {subtitle && <SubTitle>{subtitle}</SubTitle>}
        </TextWrapper>
      </Wrapper>
    )
  }
}

export const pageLink = {
  title: 'Link Block',
  name: 'pageLink',
  type: 'object',
  fields: [
    {
      title: 'Link',
      name: 'link',
      type: 'array',
      description: 'Link to a Page, Product, or Collection',
      of: [
        {
          type: 'reference',
          name: 'page',
          title: 'Page',
          to: [
            { type: 'page' },
            { type: 'shopifyProduct' },
            { type: 'shopifyCollection' },
            { type: 'shop' },
          ],
        },
        { type: 'urlLink' },
      ],
      validation: (Rule) => Rule.max(1).required(),
    },
    {
      type: 'string',
      name: 'label',
      title: 'Alternate Title',
      description:
        '(optional) If empty, the title of the linked collection, product, or page will be used.',
    },
    {
      type: 'array',
      of: [{ type: 'richImage' }],
      name: 'images',
      title: 'Alternate Images',
      description:
        '(optional) If empty, the image of the linked collection, or product will be used. Add a second image here to use as a hover image.',
      validation: (Rule) => Rule.max(2),
    },
    {
      title: 'Text',
      name: 'textPreview',
      icon: FaParagraph,
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            // { title: 'Header 2', value: 'h2' },
            // { title: 'Header 3', value: 'h3' },
          ],
          lists: [],
          // marks: {
          // annotations: [],
          // decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }],
          // },
        },
      ],
    },
    {
      type: 'boolean',
      name: 'textOnTop',
      title: 'Display text on top of image',
    },

    {
      type: 'boolean',
      name: 'fullWidth',
      title: 'Full Width',
    },
  ],
  preview: {
    select: {
      link: 'link',
      image: 'image',
      images: 'images',
      label: 'label',
    },
    prepare: (prepared) => {
      const { link, label, images } = prepared
      return { link, label, image: images && images[0] }
    },
    component: PageLinkPreview,
  },
}
