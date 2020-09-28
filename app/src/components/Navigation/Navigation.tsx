import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import Link from 'next/link'
import { SiteSettings } from '../../types'
import { Heading } from '../Text'
import { definitely, getLinkLabel, getLinkUrl } from '../../utils'
import { InstagramLogo } from '../InstagramLogo'
import { Cart } from '../Cart'
import { Logo } from '../Logo'
import { useSiteSettings } from '../../providers'

const { useState } = React

const MenuWrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    padding: 0 3;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: 120px 1fr 120px;
    justify-items: center;
    align-items: center;
    height: ${theme.navHeight};
    text-transform: uppercase;
    background-color: white;
    border-bottom: 1px solid rgb(100, 100, 100);

    > *:first-child {
      justify-self: flex-start;
    }

    > *:last-child {
      justify-self: flex-end;
    }

    & h3 {
      margin: 0 10px;
    }

    ${theme.mediaQueries.mobile} {
      padding: 1 3;
      grid-template-columns: 45px 1fr 45px;

      & h3 {
        margin: 5px 0;
        font-size: 2em;
      }
    }
  `}
`

const MenuButton = styled.button`
  ${({ theme }) => css`
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    width: 22px;
    height: 18px;
    display: none;
    flex-basis: 60px;

    & > div {
      width: 22px;
      height: 2px;
      background-color: rgb(100, 100, 100);
    }

    ${theme.mediaQueries.mobile} {
      display: flex;
    }
  `}
`

const NavLogoWrapper = styled.div`
  ${({ theme }) => css`
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    ${theme.mediaQueries.mobile} {
      justify-content: center;
    }
  `}
`

const CartWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `}
`

interface NavLinksProps {
  open: boolean
}

const NavLinks = styled.div<NavLinksProps>`
  ${({ theme, open }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;

    ${theme.mediaQueries.mobile} {
      position: absolute;
      order: 4;
      width: 100%;
      top: 100%;
      z-index: -1;
      padding: 1;
      left: 0;
      flex-direction: column;
      align-items: flex-start;
      transition: 0.2s;
      opacity: ${open ? '1' : '0'};
      pointer-events: ${open ? 'auto' : 'none'};
      transform: translateY(${open ? '0' : '-5%'});
      overflow: hidden;
      background-color: white;
      border-bottom: 1px solid black;
    }
  `}
`

const NavLink = styled.div`
  & svg {
    fill: currentColor;
  }
  &:hover {
    color: pink;
  }
`

/**
 * Navigation
 */

type Props = {
  siteSettings: SiteSettings
}

const Nav = styled.nav`
  ${({ theme }) => css`
    position: sticky;
    z-index: ${theme.zIndices.nav};
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    & > * {
      pointer-events: auto;
    }
  `}
`

interface BackgroundProps {
  open: boolean
}

const Background = styled.button<BackgroundProps>`
  ${({ theme, open }) => css`
    display: none;
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    ${theme.mediaQueries.mobile} {
      display: initial;
      opacity: ${open ? '1' : '0'};
      pointer-events: ${open ? 'initial' : 'none'};
    }
  `}
`

type State = {
  open: boolean
}

export const NavMenu = () => {
  const { siteSettings } = useSiteSettings()
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(false)
  const toggleMenu = () => setOpen(!open)
  const headerLinks = definitely(siteSettings?.navigation?.header?.links)
  return (
    <Nav>
      <MenuWrapper>
        <MenuButton onClick={toggleMenu}>
          <div />
          <div />
          <div />
        </MenuButton>
        <NavLogoWrapper>
          <Logo />
        </NavLogoWrapper>
        <NavLinks open={open}>
          <NavLink>
            <Link href="/shop">
              <a onClick={closeMenu}>
                <Heading level={3}>Shop</Heading>
              </a>
            </Link>
          </NavLink>
          {headerLinks.map((link) =>
            link.__typename === 'PageLink' ? (
              <NavLink key={link._key || 'some-key'}>
                <Heading level={3}>
                  <Link {...getLinkUrl(definitely(link.link)[0])}>
                    <a onClick={closeMenu}>
                      {getLinkLabel(definitely(link.link)[0])}
                    </a>
                  </Link>
                </Heading>
              </NavLink>
            ) : (
              <NavLink key={link.url || 'some-key'}>
                <Heading level={3}>
                  <a
                    onClick={closeMenu}
                    href={link?.url || ''}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {link?.label?.toLowerCase() === 'instagram' ? (
                      <InstagramLogo />
                    ) : (
                      link.label
                    )}
                  </a>
                </Heading>
              </NavLink>
            ),
          )}
        </NavLinks>
        <CartWrapper>
          <Cart />
        </CartWrapper>
      </MenuWrapper>
      <Background open={open} onClick={closeMenu} />
    </Nav>
  )
}
