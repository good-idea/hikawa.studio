import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import Link from 'next/link'
import { Image, ImageWrapper as ImageElementWrapper } from '../Image'
import {
  HeroSlide as HeroSlideType,
  PageOrShopOrShopifyCollectionOrShopifyProductOrUrlLink,
} from '../../types'
import { definitely, getLinkUrl } from '../../utils'

interface HeroSlideWrapperProps {
  visible: boolean
}

const HeroSlideWrapper = styled.div<HeroSlideWrapperProps>`
  ${({ visible }) => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: ${visible ? 1 : 0};
    pointer-events: ${visible ? 'inherit' : 'none'};
    transition: 0.6s;
    display: flex;

    ${ImageElementWrapper},
    picture,
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `}
`

interface MaybeLinkProps {
  link?:
    | PageOrShopOrShopifyCollectionOrShopifyProductOrUrlLink
    | null
    | undefined
  children: React.ReactNode
}
const MaybeLink = ({ children, link }: MaybeLinkProps) => {
  if (!link) return <>{children}</>
  const { href, as } = getLinkUrl(link)
  return (
    <Link href={href} as={as}>
      <a> {children}</a>
    </Link>
  )
}

interface HeroSlideProps {
  heroSlide: HeroSlideType
  currentSlide: number
  slideIndex: number
}

export const HeroSlide = ({
  heroSlide,
  currentSlide,
  slideIndex,
}: HeroSlideProps) => {
  const visible = slideIndex === currentSlide
  const { images, cta } = heroSlide
  if (!images) return null
  const imageSizes = definitely(images).length === 1 ? '100vw' : '50vw'

  return (
    <MaybeLink link={definitely(cta?.link)[0]}>
      <HeroSlideWrapper visible={visible}>
        {definitely(images).map((image) => (
          <Image
            image={image}
            sizes={imageSizes}
            key={image._key || 'some-key'}
          />
        ))}
      </HeroSlideWrapper>
    </MaybeLink>
  )
}
