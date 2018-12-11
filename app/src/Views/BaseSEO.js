// @flow
import * as React from 'react'
import type { SiteSettings } from 'Types/ContentTypes'
import Helmet from 'Components/Helmet'
import { SettingsConsumer } from './SettingsProvider'

/**
 * BaseSEO
 */

type Props = {
	settings: SiteSettings,
}

const BaseSEO = ({ settings }: Props) => <Helmet isHomepage seo={settings.seo} />

export default () => <SettingsConsumer>{(settings) => (settings ? <BaseSEO settings={settings} /> : null)}</SettingsConsumer>
