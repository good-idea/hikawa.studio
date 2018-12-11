// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import { setCookie, getCookie } from 'Utils/storage'
import { Dialog } from 'Components/Layout'
import Text from 'Components/ContentBlocks/Text'
import MailerForm from 'Components/Mailer'
import type { SiteSettings } from 'Types/ContentTypes'
import SanityImage from 'Components/Media/SanityImage'
import { SecondaryButton } from 'Components/Buttons'
import { SettingsConsumer } from './SettingsProvider'

const Wrapper = styled.div`
	text-align: center;
	position: relative;

	padding-bottom: 50px;
`

const TextWrapper = styled.div`
	${({ theme }) => `
		margin: ${theme.layout.spacing.single} auto;
	`}
`

const MainText = styled.div`
	${({ theme }) => css`
		position: absolute;
		bottom: 20px;
		left: 20px;
		width: calc(100% - 40px);
		background-color: white;

		${theme.media.queries.phone`
			bottom: 0;
			left: 0;
			width: 100%;
		`}
	`}
`

/**
 * MailerPopup
 */

const cookieName = 'kame-popup-seen'

type Props = {
	settings: SiteSettings,
}

const MailerPopup = ({ settings }: Props) => {
	const hasSeenPopup = getCookie(cookieName)
	if (hasSeenPopup || settings.mailer.popupEnabled !== true) return null

	const onClose = () => {
		setCookie(cookieName, true, { expires: 21 })
	}

	return (
		<Dialog onClose={onClose} delay={1000}>
			{({ closeDialog }) => (
				<Wrapper>
					{settings.mailer.popupBackground ? (
						<SanityImage image={settings.mailer.popupBackground} sizes="(max-width: 500px) 100vw, 500px" />
					) : null}
					<MainText>
						<TextWrapper>
							<Text blocks={settings.mailer.popupText} />
						</TextWrapper>
						<MailerForm />
						<SecondaryButton onClick={closeDialog}>Close</SecondaryButton>
					</MainText>
				</Wrapper>
			)}
		</Dialog>
	)
}

export default () => <SettingsConsumer>{(settings) => settings && <MailerPopup settings={settings} />}</SettingsConsumer>
