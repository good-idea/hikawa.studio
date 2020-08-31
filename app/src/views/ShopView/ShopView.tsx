import * as React from 'react'
import { useQuery } from '@apollo/client'
import { Hero } from '../../components/Hero'
import { CollectionBlock } from '../../components/Collection'
import { shopPageQuery, ShopPageResponse } from './shopPageQueries'
import { definitely } from '../../utils'
import { SEO } from '../../components/SEO'

interface ShopViewProps {
  activeCollectionHandle?: string
}

export const ShopView = ({ activeCollectionHandle }: ShopViewProps) => {
  const { data, loading, error } = useQuery<ShopPageResponse>(shopPageQuery)

  if (loading || error) return null
  if (!data) throw new Error('Could not load data')
  const shopPage = data?.Shop
  const { seo, collections, hero } = shopPage
  const defaultSeo = { title: 'Collections' }

  return (
    <>
      <SEO seo={seo} defaultSeo={defaultSeo} path="/shop" />
      <Hero hero={hero} />
      {definitely(collections).map((collection) => (
        <CollectionBlock
          key={collection.handle || 'some-key'}
          collection={collection}
          isActive={collection.handle === activeCollectionHandle}
        />
      ))}
    </>
  )
}
