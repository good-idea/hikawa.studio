// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'
import type { SiteSettings } from 'Types/ContentTypes'
import { Header4 } from 'Components/Type'
import Text from 'Components/ContentBlocks/Text'
import MailerForm from 'Components/Mailer'
import { getLinkUrl } from 'Utils/sanity'
import { SettingsConsumer } from '../SettingsProvider'
import { Wrapper, FooterLink, FooterSection } from './styled'

/**
 * Footer
 */

type Props = {
	settings?: SiteSettings,
}

const Footer = ({ settings }: Props) => {
	if (!settings) return null
	const { mailer, navigation } = settings
	const { footer } = navigation
	return (
		<Wrapper>
			{footer.text && (
				<FooterSection>
					<Text blocks={footer.text} />
				</FooterSection>
			)}
			{footer.links && (
				<FooterSection>
					{footer.links.map((link) =>
						link.__typename === 'Page' ? (
							<FooterLink key={link.slug}>
								<Link to={getLinkUrl(link)}>{link.title}</Link>
							</FooterLink>
						) : (
							<Header4 key={link.url}>
								<a target="_blank" rel="noreferrer noopener" href={link.url}>
									{link.label}
								</a>
							</Header4>
						),
					)}
				</FooterSection>
			)}
			<FooterSection>
				<Text blocks={mailer.footerText} />
				<MailerForm />
			</FooterSection>
		</Wrapper>
	)
}

Footer.defaultProps = {
	settings: undefined,
}

export default () => <SettingsConsumer>{(siteSettings) => <Footer settings={siteSettings} />}</SettingsConsumer>
