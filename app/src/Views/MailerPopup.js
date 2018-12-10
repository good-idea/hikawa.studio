// @flow
import * as React from 'react'
import styled from 'styled-components'
import { setCookie, getCookie } from 'Utils/storage'
import { Dialog } from 'Components/Layout'
import Text from 'Components/ContentBlocks/Text'
import MailerForm from 'Components/Mailer'
import type { SiteSettings } from 'Types/ContentTypes'
import { SettingsConsumer } from './SettingsProvider'

const Wrapper = styled.div`
	text-align: center;
`

const TextWrapper = styled.div`
	${({ theme }) => `
		margin: ${theme.layout.spacing.double} auto;
	`}
`

const CloseButton = styled.button`
	${({ theme }) => `
		color: ${theme.color.middleGray};
		padding: 6px;
		font-size: ${theme.type.size.h4};
		margin-top: ${theme.layout.spacing.double};
		&:hover {
			color: ${theme.color.darkGray};
		}
	`}
`

/**
 * MailerPopup
 */

const cookieName = 'kame-popup-seezn'

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
		<Dialog onClose={onClose}>
			{({ closeDialog }) => (
				<Wrapper>
					<TextWrapper>
						<Text blocks={settings.mailer.popupText} />
					</TextWrapper>
					<MailerForm />
					<CloseButton onClick={closeDialog}>Close</CloseButton>
				</Wrapper>
			)}
		</Dialog>
	)
}

export default () => <SettingsConsumer>{(settings) => settings && <MailerPopup settings={settings} />}</SettingsConsumer>
