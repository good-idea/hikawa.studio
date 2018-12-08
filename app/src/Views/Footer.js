// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'
import type { SiteSettings } from 'Types/ContentTypes'
import styled from 'styled-components'
import { Header4 } from 'Components/Type'
import Text from 'Components/ContentBlocks/Text'
import { getLinkUrl } from 'Utils/sanity'
import { SettingsConsumer } from './SettingsProvider'

const Wrapper = styled.footer`
	${({ theme }) => `
		border-top: 1px solid black;
		padding: calc(${theme.layout.spacing.triple} * 3) ${theme.layout.spacing.triple};
		display: flex;
		justify-content: space-between;
		background-size: cover;
		background-position: center;
	`};
`

const FooterSection = styled.div`
	${({ theme }) => `
		flex-grow: 1;
		margin: 0 ${theme.layout.spacing.double};
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
	const { footer } = settings.navigation
	return (
		<Wrapper>
			<FooterSection>Mailing List</FooterSection>
			{footer.text && (
				<FooterSection>
					<Text blocks={footer.text} />
				</FooterSection>
			)}
			{footer.links && (
				<FooterSection>
					{footer.links.map((link) => (
						<Header4 key={link.slug}>
							<Link to={getLinkUrl(link)}>{link.title}</Link>
						</Header4>
					))}
				</FooterSection>
			)}
		</Wrapper>
	)
}

Footer.defaultProps = {
	settings: undefined,
}

export default () => <SettingsConsumer>{(siteSettings) => <Footer settings={siteSettings} />}</SettingsConsumer>
