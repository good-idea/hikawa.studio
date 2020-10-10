import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Hero as HeroType } from '../../types'
import { definitely, isValidHero } from '../../utils'
import { SlideButton } from './SlideButton'
import { SlideDots, SlideDot } from './SlideDots'
import { HeroSlide } from './HeroSlide'
import { HeroCTAs, HeroCTA } from './HeroCTAs'

const { useState, useEffect } = React

const HeroOuter = styled.div``

const HeroWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-bottom: 45%;
  display: flex;

  margin-bottom: 3;
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

/**
 * Hero
 */

interface Props {
  hero?: HeroType | null
}

export const Hero = ({ hero }: Props) => {
  if (!hero || !isValidHero(hero)) return <EmptyHero />
  const heroSlides = definitely(hero?.heroSlides)
  if (heroSlides.length === 0) return <EmptyHero />
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    const newSlide = (currentSlide + 1) % heroSlides.length
    setCurrentSlide(newSlide)
  }

  const goToSlide = (slide: number) => () => setCurrentSlide(slide)

  const prevSlide = () => {
    const newSlide =
      currentSlide === 0 ? heroSlides.length - 1 : currentSlide - 1
    setCurrentSlide(newSlide)
  }

  useEffect(() => {
    if (heroSlides.length === 1) return
    const t = setTimeout(nextSlide, 7000)
    return () => clearTimeout(t)
  }, [currentSlide])

  const hasCtas = definitely(hero.heroSlides).some(
    (heroSlide) => Boolean(heroSlide?.cta) || heroSlide?.descriptionRaw,
  )

  return (
    <HeroOuter>
      <HeroWrapper>
        <HeroRatio>
          {definitely(hero.heroSlides).map((heroSlide, index) => (
            <HeroSlide
              heroSlide={heroSlide}
              currentSlide={currentSlide}
              slideIndex={index}
              key={heroSlide._key || 'somz-key'}
            />
          ))}
          <SlideButton onClick={prevSlide} position="previous" />
          <SlideButton onClick={nextSlide} position="next" />
        </HeroRatio>
      </HeroWrapper>
      <SlideDots>
        {definitely(hero.heroSlides).map((heroSlide, index) => (
          <SlideDot
            active={currentSlide === index}
            onClick={goToSlide(index)}
            key={heroSlide?._key || 'some-key'}
          />
        ))}
      </SlideDots>
      {hasCtas ? (
        <HeroCTAs>
          {definitely(hero.heroSlides).map((heroSlide, index) => (
            <HeroCTA
              heroSlide={heroSlide}
              active={currentSlide === index}
              key={heroSlide?._key || 'some-key'}
            />
          ))}
        </HeroCTAs>
      ) : null}
    </HeroOuter>
  )
}

Hero.defaultProps = {
  view: 'standard',
  hero: {
    images: [],
  },
}
