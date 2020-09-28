import { DefaultTheme } from '@xstyled/styled-components'

/* generated at:
 * https://www.colorbox.io/#steps=5#hue_start=238#hue_end=238#hue_curve=easeInQuad#sat_start=13#sat_end=54#sat_curve=easeInSine#sat_rate=146#lum_start=100#lum_end=69#lum_curve=linear#lock_hex=5F62D1#minor_steps_map=none */

const sans =
  '"Work Sans", "Helvetica", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";'
const serif = '"Playfair Display", "Palatino", Georgia, sans-serif'

export const defaultTheme: DefaultTheme = {
  radii: {
    round: '9px',
  },
  navHeight: '60px',
  announcementHeight: '45px',

  /* Spacing - applies to:
   *   margin, margin-top, margin-right, margin-bottom, margin-left, padding,
   *   padding-top, padding-right, padding-bottom, padding-left, grid-gap,
   *   grid-column-gap, grid-row-gap
   */
  space: [
    0,
    3, //  1 previously "quarter"
    6, //  2 previously "half"
    12, // 3 previously "single"
    18, // 4 previously "singleHalf"
    24, // 5 previously "double"
    38, // 6 previously "triple"
    42, // 7
    48, // 8
    64, // 9
    72, // 10
    84, // 11
    114, // 12
  ],

  /* Sizing - applies to:
   * 	width, height, min-width,	max-width, min-height, max-height
   */

  sizes: {
    small: 450,
    medium: 600,
    wide: 900,
    xWide: 1100,
  },

  /* Font Sizes, applies to:
   *   font-size
   */
  fontSizes: [
    99, // stupid high, just don't use fontSizes.0
    62, // h1
    42, // h2
    22, // h3
    18, // p,
    16, // h4
    13, // h5
    10, // h6
  ],
  fontWeights: [0, 100, 200, 300, 400, 600, 700],
  fonts: {
    sans,
    serif,
  },

  /* Applies to:
   *   z-index
   */
  zIndices: {
    main: 0,
    nav: 100,
    cart: 200,
    dialog: 300,
    alert: 400,
  },

  /* Colors, applies to:
   *  color, background-color, border-color
   */
  colors: {
    red: 'rgba(244, 48, 4, 1)',
    middleGray: 'rgb(155, 155, 155)',
    darkGray: 'rgb(105, 105, 105)',
    highlight: '#64daca',
    offset: 'rgb(212, 239, 133)',
    offsetLight: 'rgba(212, 239, 133, 0.3)',
    pink: 'rgb(244, 4, 115)',
    mint: 'rgba(193,239,188,1)',
    mintLight: 'rgba(193,239,188,0.3)',
  },

  transition: {
    fast: '150ms',
    slow: '250ms',
  },

  breakpoints: {
    xs: 0,
    sm: 675,
    md: 768,
    lg: 992,
    xl: 1200,
  },

  mediaQueries: {
    mobile: '@media screen and (max-width: 675px)',
    aboveMobile: '@media screen and (min-width: 676px)',
    tablet: '@media screen and (max-width: 768px)',
    aboveTablet: '@media screen and (max-width: 769px)',
  },
}
