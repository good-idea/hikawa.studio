import 'styled-components'
import '@xstyled/styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    navHeight: string
    announcementHeight: string

    space: number[]
    sizes: {
      small: number
      medium: number
      wide: number
      xWide: number
    }
    fontSizes: number[]
    fontWeights: number[]

    radii: {
      round: string
    }

    fonts: {
      sans: string
      serif: string
    }

    zIndices: {
      main: number
      nav: number
      cart: number
      dialog: number
      alert: number
    }

    colors: {
      red: string
      middleGray: string
      darkGray: string
      highlight: string
      offset: string
      offsetLight: string
      pink: string
      mint: string
      mintLight: string
    }

    mediaQueries: {
      mobile: string
      aboveMobile: string
      tablet: string
      aboveTablet: string
    }

    transition: {
      fast: string
      slow: string
    }

    breakpoints?: {
      xs: number
      sm: number
      md: number
      lg: number
      xl: number
    }
  }
}
