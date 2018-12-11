// @flow
import * as React from 'react'
import { Helmet } from 'react-helmet'
import type { SEO } from 'Types/SharedTypes'
import { SettingsConsumer } from 'Views/SettingsProvider'
import type { SiteSettings } from 'Types/ContentTypes'
import type { SanityImage, ShopifyImage } from 'Types/MediaTypes'

/**
 * KameHelmet
 */

type Props = {
	seo: SEO,
	isHomepage: boolean,
	settings: SiteSettings,
}

const getImageUrl = (image: SanityImage | ShopifyImage): string | null =>
	// $FlowFixMe
	image && image.originalSrc ? image.originalSrc : image && image.url ? image.url : null

const KameHelmet = ({ seo, settings, isHomepage }: Props) => {
	if (!settings) return null
	const { name, description, image } = seo
	const siteTitle = settings.seo.name || 'KAME'
	const title = !isHomepage && name && name.length ? `${name} | ${siteTitle}` : siteTitle
	const imageUrl = image ? getImageUrl(image) : null
	return (
		<Helmet>
			<title itemProp="name">{title}</title>
			<meta property="og:title" content={title} />
			{description && description.length ? <meta property="og:description" content={description} /> : null}
			{description && description.length ? <meta name="description" content={description} /> : null}

			{imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
			<meta property="og:type" content="website" />
			<meta name="robots" content="index, follow" />
		</Helmet>
	)
}

type BaseProps = {
	seo: SEO,
	isHomepage?: boolean,
}

const HelmetLoader = (props: BaseProps) => (
	<SettingsConsumer>
		{(settings) => {
			if (!settings) return null
			return <KameHelmet settings={settings} {...props} />
		}}
	</SettingsConsumer>
)

HelmetLoader.defaultProps = {
	isHomepage: false,
}

export default HelmetLoader
