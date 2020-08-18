import * as React from 'react'
import styled, { css } from 'styled-components'
import { Hero as HeroType } from '../types'
import { Image } from './Image'
import { definitely, isValidHero } from '../utils'

const HeroWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-bottom: 45%;
  display: flex;
`

const EmptyHero = styled.div`
  ${({ theme }) => css`
    height: 100px;

    ${theme.mediaQueries.mobile} {
      height: 30px;
    }
  `}
`

const HeroRatio = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  object-fit: cover;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

/**
 * Hero
 */

interface Props {
  hero?: HeroType | null
}

export const Hero = ({ hero }: Props) => {
  if (hero && isValidHero(hero)) {
    return (
      <HeroWrapper>
        <HeroRatio>
          {definitely(hero.images).map((image) => (
            <ImageWrapper key={image._key || 'some-key'}>
              <Image image={image} sizes="100vw" />
            </ImageWrapper>
          ))}
        </HeroRatio>
      </HeroWrapper>
    )
  }
  return <EmptyHero />
}

Hero.defaultProps = {
  view: 'standard',
  hero: {
    images: [],
  },
}
