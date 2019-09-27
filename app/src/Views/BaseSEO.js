// @flow
import * as React from 'react'
import type { SiteSettings } from 'Types/ContentTypes'
import Helmet from 'Components/Helmet'
import { SettingsConsumer } from './SettingsProvider'

/**
 * BaseSEO
 */

type Props = {
	settings?: SiteSettings,
}

const BaseSEO = ({ settings }: Props) => {
	return <Helmet isHomepage seo={settings.seo} />
}

export default () => (
	<SettingsConsumer>{({ siteSettings }) => (siteSettings ? <BaseSEO settings={siteSettings} /> : null)}</SettingsConsumer>
)
