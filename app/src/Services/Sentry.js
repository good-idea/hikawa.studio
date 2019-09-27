import * as React from 'react'
import * as Sentry from '@sentry/browser'
import { isReactProduction } from '../Utils/env'

Sentry.init({
	dsn: 'https://dacc84c8841f4b00a38cf4f9a2748e48@sentry.io/1452529',
})

export class SentryBoundary extends React.Component {
	componentDidCatch(error, errorInfo) {
		if ((typeof window !== 'undefined' && process.env.NODE_ENV === 'production') || isReactProduction()) {
			Sentry.withScope((scope) => {
				scope.setExtras(errorInfo)
				Sentry.captureException(error)
			})
		} else {
			console.error('Sentry boundary caught an error [in development, not reported]:', error)
		}
	}

	render() {
		return this.props.children
	}
}
