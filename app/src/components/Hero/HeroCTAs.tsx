import * as React from 'react'
import Link from 'next/link'
import styled, { css } from '@xstyled/styled-components'
import { RichText } from '../RichText'
import { Heading } from '../Text'
import { HeroSlide } from '../../types'
import { definitely, getLinkUrl, getLinkLabel } from '../../utils'

export const HeroCTAs = styled.div`
  position: relative;
  width: 100%;
  height: 65px;
`

interface WithVisible {
  visible: boolean
}

const HeroCTAWrapper = styled.div<WithVisible>`
  ${({ visible }) => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: ${visible ? 1 : 0};
    pointer-events: ${visible ? 'inherit' : 'none'};
  `}
`

const TextInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  text-align: center;
  padding: 2;
  max-width: 650px;
  width: 100%;
  margin: 0 auto;

  p,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }
`

interface HeroCTAProps {
  heroSlide: HeroSlide
  active: boolean
}

const emptyLink = { href: undefined, as: undefined }

export const HeroCTA = ({ heroSlide, active }: HeroCTAProps) => {
  const { cta, descriptionRaw } = heroSlide
  const link = definitely(cta?.link)[0]
  const { href } = link ? getLinkUrl(link) : emptyLink
  const label = link ? getLinkLabel(link) : undefined
  return (
    <HeroCTAWrapper visible={active}>
      <TextInner>
        {descriptionRaw ? <RichText body={descriptionRaw} /> : null}
        {href && label ? (
          <Link href={href}>
            <a>
              <Heading color="pink" level={4}>
                → {label}
              </Heading>
            </a>
          </Link>
        ) : null}
      </TextInner>
    </HeroCTAWrapper>
  )
}
