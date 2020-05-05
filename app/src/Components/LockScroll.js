// @flow
import * as React from 'react'

const { useState, useEffect } = React

export const useLockScroll = (initialState: boolean) => {
	const [locked, setLocked] = useState(initialState || false)

	const unlockScroll = () => setLocked(false)
	const lockScroll = () => setLocked(true)

	useEffect(() => {
		if (locked) {
			document.scrollingElement.style.overflow = 'hidden'
		} else {
			document.scrollingElement.style.overflow = 'auto'
		}
	}, [locked])

	return {
		locked,
		unlockScroll,
		lockScroll,
	}
}
