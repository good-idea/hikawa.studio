import * as React from 'react'
import { useQuery } from '@apollo/client'
import { homepageQuery, HomepageResponse } from './homepageQueries'
import { Column } from '../../components/Layout'
import { SEO } from '../../components/SEO'
import { definitely } from '../../utils'
import { Hero } from '../../components/Hero'
import { ContentBlock } from '../../components/ContentBlocks'
import { InstagramRow } from '../../components/InstagramRow'
import { Grid, HomepageWrapper, BlockWrapper } from './styled'

export const HomepageView = () => {
  const { loading, error, data } = useQuery<HomepageResponse>(homepageQuery)
  if (loading) return <p>Loading</p>
  const homepage = data?.Homepage
  if (!homepage) throw new Error('No Homepage data')
  const content = definitely(homepage.content)
  const { hero, seo } = homepage
  const defaultSeo = {
    title: 'Bailey Hikawa',
  }

  return (
    <HomepageWrapper>
      <SEO seo={seo} defaultSeo={defaultSeo} path="/" />
      <Hero hero={hero} />
      <Column width="wide">
        <Grid>
          {content.map((block, index) => (
            <BlockWrapper key={block._key || 'some-key'} block={block}>
              <ContentBlock block={block} number={index} largeText />
            </BlockWrapper>
          ))}
        </Grid>
      </Column>
      <Column width="wide">
        <InstagramRow />
      </Column>
    </HomepageWrapper>
  )
}
