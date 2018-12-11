// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import type { SiteSettings } from 'Types/ContentTypes'
import { Header4 } from 'Components/Type'
import Text from 'Components/ContentBlocks/Text'
import MailerForm from 'Components/Mailer'
import { getLinkUrl } from 'Utils/sanity'
import { SettingsConsumer } from './SettingsProvider'

const Wrapper = styled.footer`
	${({ theme }) => css`
		border-top: 1px solid black;
		padding: calc(${theme.layout.spacing.triple} * 3) ${theme.layout.spacing.triple};
		display: flex;
		justify-content: space-between;
		background-size: cover;
		background-position: center;
		font-weight: ${theme.type.weight.semi};

		${theme.media.queries.tablet`
			flex-direction: column;
			text-align: center;
			padding: ${theme.layout.spacing.triple}; 
		`}
	`};
`

const FooterSection = styled.div`
	${({ theme }) => css`
		flex-grow: 1;
		flex-basis: calc(100% / 3);
		margin: 0 ${theme.layout.spacing.double};

		${theme.media.queries.tablet`
			flex-grow: auto;
			flex-basis: auto;
			margin: ${theme.layout.spacing.double} 0;
		`}
	`};
`

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
			<FooterSection>
				<Text blocks={mailer.footerText} />
				<MailerForm />
			</FooterSection>
			{footer.text && (
				<FooterSection>
					<Text blocks={footer.text} />
				</FooterSection>
			)}
			{footer.links && (
				<FooterSection>
					{footer.links.map((link) =>
						link.__typename === 'Page' ? (
							<Header4 key={link.slug}>
								<Link to={getLinkUrl(link)}>{link.title}</Link>
							</Header4>
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
		</Wrapper>
	)
}

Footer.defaultProps = {
	settings: undefined,
}

export default () => <SettingsConsumer>{(siteSettings) => <Footer settings={siteSettings} />}</SettingsConsumer>
