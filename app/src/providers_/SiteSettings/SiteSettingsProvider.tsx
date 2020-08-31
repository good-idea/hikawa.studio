import * as React from 'react'
import { useQuery } from '@apollo/client'
import { SiteSettings } from '../../types'
import { siteSettingsQuery, SiteSettingsResponse } from './siteSettingsQuery'

interface SiteSettingsContextValue {
  siteSettings: SiteSettings
}

const SiteSettingsContext = React.createContext<
  SiteSettingsContextValue | undefined
>(undefined)

export const SiteSettingsConsumer = SiteSettingsContext.Consumer

export const useSiteSettings = () => {
  const ctx = React.useContext(SiteSettingsContext)
  if (!ctx)
    throw new Error(
      'useSiteSettingsContext must be used within a SiteSettingsProvider',
    )
  return ctx
}

interface SiteSettingsProps {
  children: React.ReactNode
}

export const SiteSettingsProvider = ({ children }: SiteSettingsProps) => {
  const { loading, data, error } = useQuery<SiteSettingsResponse>(
    siteSettingsQuery,
  )

  if (error) {
    console.error(error)
    throw new Error('!')
  }
  const siteSettings = data?.SiteSettings

  if (loading || !siteSettings) return null

  const value = {
    siteSettings,
  }

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  )
}
