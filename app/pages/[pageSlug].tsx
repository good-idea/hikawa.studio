import * as React from 'react'
import gql from 'graphql-tag'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Page as PageType } from '../src/types'
import { getParam, definitely } from '../src/utils'
import { ssrClient, App, PageView } from '../src/views'

interface PageProps {
  slug: string
}

const Page = ({ slug }: PageProps) => {
  return <PageView key={slug} slug={slug} />
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = getParam(ctx.params?.pageSlug)

  if (!slug) throw new Error('No pageSlug provided')

  const StaticApp = (
    <App>
      <PageView key={slug} slug={slug} />
    </App>
  )
  await getDataFromTree(StaticApp)
  const apolloCache = ssrClient.extract()
  return { props: { apolloCache, slug }, revalidate: 60 }
}

const pageHandlesQuery = gql`
  query PageHandlesQuery {
    allPage {
      slug {
        current
      }
    }
  }
`

interface PageResponse {
  allPage: PageType[]
}

// @ts-ignore
export const getStaticPaths: GetStaticPaths = async () => {
  const result = await ssrClient.query<PageResponse>({
    query: pageHandlesQuery,
  })
  const pages = definitely(result?.data?.allPage)
  const paths = pages.map((p) => ({
    params: { pageSlug: p.slug ? p.slug.current : null },
  }))
  return {
    paths,
    fallback: true,
  }
}

export default Page
