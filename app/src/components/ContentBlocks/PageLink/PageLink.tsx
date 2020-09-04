import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import styled, { css } from '@xstyled/styled-components'
import NextLink from 'next/link'
import {
  ShopifyProduct,
  PageOrShopOrShopifyCollectionOrShopifyProductOrUrlLink,
  PageLink as PageLinkType,
} from '../../../types'
import { Heading } from '../../Text'
import { Image } from '../../Image'
import { definitely, getLinkLabel, getLinkUrl } from '../../../utils'

const PrimaryImage = styled.div``

const HoverImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
`

const Wrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    color: rgb(45, 45, 45);

    &:hover {
      ${HoverImage} ~ ${PrimaryImage} {
        opacity: 0;
      }

      ${HoverImage} {
        opacity: 1;
      }
    }

    ${theme.mediaQueries.mobile} {
      padding: 0;
    }
  `};
`

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
`

const TextWrapper = styled.div`
  ${({ theme }) => css`
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 5;
    top: 0;
    left: 0;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    ${Wrapper}:hover & {
      opacity: 1;
    }

    ${theme.mediaQueries.mobile} {
      position: relative;
      width: auto;
      height: auto;
      opacity: 1;
      padding: 0;
    }
  `}
`

const Text = styled.div`
  padding: 5px 14px 2px;
  background-color: rgba(255, 255, 255, 0.95);
`

/**
 * Link
 */

interface LinkProps {
  link: PageOrShopOrShopifyCollectionOrShopifyProductOrUrlLink
  children: React.ReactNode
}

const Link = ({ link, children }: LinkProps) => {
  if (!link) return null
  const { href, as } = getLinkUrl(link)
  if (!href) return null

  const linkIsExternal =
    link.__typename === 'UrlLink' && /^(mailto|https?):/.test(href)

  return linkIsExternal ? (
    <a href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  ) : (
    <NextLink as={as} href={href}>
      <a>{children}</a>
    </NextLink>
  )
}

/**
 * PageLink
 */

interface PageLinkProps {
  item: PageLinkType
  imageSizes: string
  showHover?: boolean
  useDefaultImage?: boolean
  largeText?: boolean
}

interface LargeTextProps {
  largeText?: boolean
}

const LargeText = styled.span<LargeTextProps>`
  ${({ largeText }) => css`
    font-size: ${largeText ? '1.3em' : '1em'};
  `}
`

const getProductImages = (link: ShopifyProduct) => {
  const [images] = unwindEdges(link?.sourceData?.images)
  return images.length ? images[0] : null
}

export const PageLink = ({
  item,
  imageSizes,
  showHover,
  useDefaultImage,
  largeText,
}: PageLinkProps) => {
  const { link: links, images, label } = item
  const link = definitely(links)[0]
  if (!link) return null

  const headerText = label || getLinkLabel(link)

  const fallbackImage =
    link.__typename === 'ShopifyCollection'
      ? link?.sourceData?.image
      : link.__typename === 'ShopifyProduct'
      ? link?.sourceData?.images
        ? getProductImages(link)
        : null
      : null

  const primaryImage =
    useDefaultImage === false && images && images.length
      ? images[0]
      : fallbackImage
  const hoverImage = images && images.length > 1 ? images[1] : null
  const ratio = item.fullWidth ? 0.56 : 1.2
  console.log({ primaryImage, hoverImage })

  return (
    <Link link={link}>
      <Wrapper>
        {hoverImage || primaryImage ? (
          <ImageWrapper>
            {primaryImage && (
              <PrimaryImage>
                <Image
                  ratio={ratio}
                  image={primaryImage}
                  hoverImage={hoverImage}
                  sizes={imageSizes}
                />
              </PrimaryImage>
            )}
          </ImageWrapper>
        ) : null}
        <TextWrapper>
          <Text>
            <Heading level={3} fontFamily="serif" textAlign="center">
              <LargeText largeText={largeText}>{headerText}</LargeText>
            </Heading>
          </Text>
        </TextWrapper>
      </Wrapper>
    </Link>
  )
}

PageLink.defaultProps = {
  showHover: false,
  useDefaultImage: false,
  largeText: false,
}
