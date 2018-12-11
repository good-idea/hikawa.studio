// @flow
import * as React from 'react'
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga'

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
		ReactGA.initialize('UA-41646586-2')
		const { location } = this.props
		ReactGA.pageview(location.pathname + location.search)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.location.pathname !== this.props.location.pathname) {
			window.document.body.scrollTop = 0
			const { location } = nextProps
			ReactGA.pageview(location.pathname + location.search)
		}
	}

	render() {
		return null
	}
}

export default withRouter(ScrollToTop)
