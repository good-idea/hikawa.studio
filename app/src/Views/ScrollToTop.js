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
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.pathname !== this.props.location.pathname) window.document.body.scrollTop = 0
	}

	render() {
		return null
	}
}

export default withRouter(ScrollToTop)
