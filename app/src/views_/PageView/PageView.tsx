import * as React from 'react'
import { useQuery } from '@apollo/client'
import styled from '@xstyled/styled-components'
import { RichText } from '../../components/RichText'
import { Column } from '../../components/Layout'
import { SEO } from '../../components/SEO'
import { Hero } from '../../components/Hero'
import { InstagramRow } from '../../components/InstagramRow'
import { Gallery } from '../../components/Gallery'
import { definitely } from '../../utils'
import { pageQuery, PageResponse, PageArgs } from './queries'
import { NotFound } from '../NotFound'

const Wrapper = styled.div``

interface PageProps {
  slug: string
}

export const PageView = ({ slug }: PageProps) => {
  const variables = { slug }
  const { data, loading, error } = useQuery<PageResponse, PageArgs>(pageQuery, {
    variables,
  })
  console.log({ data, loading, error })
  if (loading || !data || !data.allPage) return null
  const page = data.allPage.length ? data.allPage[0] : null
  if (!page) return <NotFound />
  const { contentRaw, gallery, seo, hero, includeInstagram } = page
  const images = definitely(gallery)
  const seoPath = `/${slug}`
  return (
    <Wrapper>
      {seo && <SEO seo={seo} defaultSeo={{}} path={seoPath} />}
      <Hero hero={hero} view="standard" />
      <Column width="wide">
        {contentRaw && <RichText body={contentRaw} />}
      </Column>
      {images && images.length ? (
        <Column width="xWide">
          <Gallery images={images} />
        </Column>
      ) : null}
      {includeInstagram && (
        <Column>
          <InstagramRow />
        </Column>
      )}
    </Wrapper>
  )
}
