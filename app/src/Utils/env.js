import React from 'react'

export const isReactProduction = () => {
	return !('_self' in React.createElement('div')) && process.env.NODE_ENV === 'production'
}
