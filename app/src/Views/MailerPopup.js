// @flow
import * as React from 'react'
import styled from 'styled-components'
import { setCookie, getCookie } from 'Utils/storage'
import { Dialog } from 'Components/Layout'
import Text from 'Components/ContentBlocks/Text'
import MailerForm from 'Components/Mailer'
import type { SiteSettings } from 'Types/ContentTypes'
import SanityImage from 'Components/Media/SanityImage'
import { SettingsConsumer } from './SettingsProvider'

const Wrapper = styled.div`
	text-align: center;
	position: relative;
`

const TextWrapper = styled.div`
	${({ theme }) => `
		margin: ${theme.layout.spacing.single} auto;
	`}
`

const CloseButton = styled.button`
	${({ theme }) => `
		color: ${theme.color.middleGray};
		padding: 6px;
		font-size: ${theme.type.size.h4};
		margin-top: ${theme.layout.spacing.single};
		&:hover {
			color: ${theme.color.darkGray};
		}
	`}
`

const MainText = styled.div`
	position: absolute;
	bottom: 20px;
	left: 20px;
	width: calc(100% - 40px);
	background-color: white;
	padding: 10px;
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

	console.log(settings.mailer)

	return (
		<Dialog onClose={onClose}>
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
						<CloseButton onClick={closeDialog}>Close</CloseButton>
					</MainText>
				</Wrapper>
			)}
		</Dialog>
	)
}

export default () => <SettingsConsumer>{(settings) => settings && <MailerPopup settings={settings} />}</SettingsConsumer>
