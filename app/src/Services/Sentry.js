import * as React from 'react'
import * as Sentry from '@sentry/browser'

Sentry.init({
	dsn: 'https://dacc84c8841f4b00a38cf4f9a2748e48@sentry.io/1452529',
})

const isReactProduction = () => {
	return !('_self' in React.createElement('div'))
}

export class SentryBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = { error: null, eventId: null }
	}

	componentDidCatch(error, errorInfo) {
		this.setState({ error })
		if ((typeof window !== 'undefined' && process.env.NODE_ENV === 'production') || isReactProduction()) {
			Sentry.withScope((scope) => {
				scope.setExtras(errorInfo)
				const eventId = Sentry.captureException(error)
				this.setState({ eventId })
			})
		} else {
			console.error('Sentry boundary caught an error [in development, not reported]:', error)
		}
	}

	render() {
		return this.props.children
	}
}
