import * as React from 'react'

const { useState, useEffect } = React

export const useLockScroll = (initialState: boolean = false) => {
  const [locked, setLocked] = useState(initialState)

  const unlockScroll = () => setLocked(false)
  const lockScroll = () => setLocked(true)

  useEffect(() => {
    if (locked) {
      // @ts-ignore
      document.scrollingElement.style.overflow = 'hidden'
    } else {
      // @ts-ignore
      document.scrollingElement.style.overflow = 'auto'
    }
  }, [locked])

  return {
    locked,
    unlockScroll,
    lockScroll,
  }
}
