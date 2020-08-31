import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { useSiteSettings } from '../../providers'
import { MailerForm } from './Form'
import { getCookie, setCookie } from '../../utils'
import { Dialog } from '../Layout'
import { Image } from '../Image'
import { RichText } from '../RichText'
import { Button } from '../Button'

const { useState, useEffect } = React
const Wrapper = styled.div`
  ${({ theme }) => css`
    text-align: center;
    position: relative;
    ${theme.mediaQueries.mobile} {
      padding-bottom: 50px;
    }
  `}
`

const TextWrapper = styled.div`
  margin: 3 auto;
`

const MainText = styled.div`
  ${({ theme }) => css`
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: calc(100% - 40px);
    background-color: white;
    ${theme.mediaQueries.mobile} {
      bottom: 0;
      left: 0;
      width: 100%;
    }
  `}
`

/**
 * MailerPopup
 */

const cookieName = 'kame-popup-seen'

export const MailerPopup = () => {
  const { siteSettings } = useSiteSettings()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const hasSeenPopup = getCookie(cookieName)
    if (!hasSeenPopup && siteSettings?.mailer?.popupEnabled) {
      const dialogTimeout = setTimeout(() => {
        setOpen(true)
      }, 1500)

      return () => clearTimeout(dialogTimeout)
    }
    return () => undefined
  }, [])

  const close = () => {
    setCookie(cookieName, true, { expires: 21 })
    setOpen(false)
  }

  return (
    <Dialog isOpen={open} close={close}>
      {({ closeDialog }) => (
        <Wrapper>
          {siteSettings?.mailer?.popupBackground ? (
            <Image
              image={siteSettings?.mailer?.popupBackground}
              sizes="(max-width: 500px) 100vw, 500px"
            />
          ) : null}
          <MainText>
            <TextWrapper>
              <RichText body={siteSettings?.mailer?.popupTextRaw} />
            </TextWrapper>
            <MailerForm />
            <Button level={2} onClick={closeDialog}>
              Close
            </Button>
          </MainText>
        </Wrapper>
      )}
    </Dialog>
  )
}
