import styled, { css } from '@xstyled/styled-components'

export const Wrapper = styled.footer`
  ${({ theme }) => css`
    border-top: 1px solid black;
    padding: 11 5;
    display: flex;
    justify-content: space-between;
    background-size: cover;
    background-position: center;
    font-weight: 5;
    background-image: url('/static/images/clouds_KAME.jpg');

    ${theme.mediaQueries.tablet} {
      flex-direction: column;
      text-align: center;
      padding: 5;
    }

    & a {
      color: inherit;

      &:hover {
        color: pink;
      }
    }
  `};
`

export const FooterLinkWrapper = styled.div`
  &:hover {
    color: pink;
  }
`

export const FooterSection = styled.div`
  ${({ theme }) => css`
    flex-grow: 1;
    flex-basis: calc(100% / 3);
    margin: 0 5;

    ${theme.mediaQueries.tablet} {
      flex-grow: auto;
      flex-basis: auto;
      margin: 5 0;
    }
  `}
`
