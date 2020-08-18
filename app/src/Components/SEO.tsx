import * as React from 'react'
import { Seo } from '../types'

interface SEOProps {
  seo?: Seo | null
}

export const SEO = ({ seo }: SEOProps) => {
  if (!seo) return null
  console.warn('SEO TODO')
  return null
}
