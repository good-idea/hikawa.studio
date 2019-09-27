// @flow
import * as React from 'react'
import { withRouter } from 'react-router-dom'

/**
 * ScrollToTop
 */

type Props = {
	location: {
		pathname: string,
	},
}

class ScrollToTop extends React.Component<Props> {
	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			window.scrollTo(0, 0)
		}
	}

	render() {
		return null
	}
}

export default withRouter(ScrollToTop)
