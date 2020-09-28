import { createGlobalStyle, css } from '@xstyled/styled-components'
import normalized from './normalized'

export const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`

	${normalized}

	html {
		font-family: sans;
		font-weight: 300;
	}

	form {
		margin: 0;
	}

	body {
		padding: 0;
	}

	button, input, select, option, textarea {
		background: white;
		font-family: sans;
		font-weight: 300;
		border: none;
		outline: none;
		line-height: normal;
		padding: 0;
		border-radius: 0;
		color: #454545;
	}

	label{
		color: #454545;
	}

	button {
		cursor: pointer;
	}

	h1, h2, h3, h4, h5, h6, p, li, ol {
		font-weight: 5;
		margin: 0;
	}

  h1, h2 {
    font-family: serif;
    font-weight: 4;
  }


  h1 {
    font-size: 1;
    ${theme.mediaQueries.tablet} {
      font-size: calc(${theme.fontSizes[1]}px * 0.8);
    }
    ${theme.mediaQueries.mobile} {
      font-size: calc(${theme.fontSizes[1]}px * 0.55);
    }
 
  }

  h2 {
    font-size: 2;
    ${theme.mediaQueries.tablet} {
      font-size: calc(${theme.fontSizes[2]}px * 0.8);
    }
    ${theme.mediaQueries.mobile} {
      font-size: calc(${theme.fontSizes[2]}px * 0.55);
    }
 
  }

  h3 {
    font-size: 3;
    ${theme.mediaQueries.tablet} {
      font-size: calc(${theme.fontSizes[3]}px * 0.8);
    }
    ${theme.mediaQueries.mobile} {
      font-size: calc(${theme.fontSizes[3]}px * 0.55);
    }
 
  }

  p {
    font-size: 4;
  }

  h4 {
    font-size: 5;
    ${theme.mediaQueries.tablet} {
      font-size: calc(${theme.fontSizes[5]}px * 0.8);
    }
 
  }

  h5 {
    font-size: 6;
  }

  h6 {
    font-size: 7;
  }

	a {
		text-decoration: none;
		color: inherit;
	}

	* {
		box-sizing: border-box;
	}


	#root,
	#reactRoot {
		height: 100%;
	}

	figure {
		margin 0;
	}

	img {
		max-width: 100%;
		display: block;
		margin: 0 auto;
	}
  
  #afterpay-modal-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99999999999;
  }
  #afterpay-modal-modal {
    z-index: 9999999999999;
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 50%;
    background-color: white;
    border-radius: 5px;
    padding: 8px;
    box-sizing: border-box;
    overflow-y: auto;
    text-align: center;
    border: none;
  }

`}

`
