// @flow
import * as React from 'react'
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga'
import ReactPixel from 'react-facebook-pixel'

/**
 * ScrollToTop
 */

type Props = {
	location: {
		pathname: string,
		search: string,
	},
}

class ScrollToTop extends React.Component<Props> {
	componentDidMount() {
		// Set up Google Analytics
		ReactGA.initialize('UA-41646586-2')
		const { location } = this.props
		ReactGA.pageview(location.pathname + location.search)

		// Set up Facebook Pixel
		const options = {
			autoConfig: true,
			// debug: window && window.location.hostname === 'localhost',
      debug: true
		}
		ReactPixel.init('972804626396421', {}, options)
	}

	componentWillReceiveProps(nextProps) {
		// Scroll to top on path change
		if (nextProps.location.pathname !== this.props.location.pathname) {
			window.document.body.scrollTop = 0
			const { location } = nextProps
			// Track page changes in GA & Facebook
			ReactGA.pageview(location.pathname + location.search)
			ReactPixel.pageView()
		}
	}

	render() {
		return null
	}
}

export default withRouter(ScrollToTop)
