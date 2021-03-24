const modularscale = require('modularscale-js')

// base scale
// -> config object for modularscale library
const scale = {
  config: {
    base: [1],
    ratio: 1.2
  },
  get: (value) => modularscale(value, scale.config).toFixed(2)
};

// helper to tweak props of a palette color
function modifyColor(color, {
  s = 0,
  l = 0,
  a = 1
} = {}) {
  return { h: color.h, s, l, a }
}

// base color palette
const palette = {
  black: { h: 0, s: 0, l: 27 },
  gray: { h: 223, s: 7, l: 78 },
  green: { h: 148, s: 43, l: 66 },
  lavendar: { h: 223, s: 75, l: 70 },
  orange: { h: 38, s: 86, l: 64 },
  red: { h: 345, s: 74, l: 58 },
  white: { h: 0, s: 0, l: 100  }
}

const themes = {
  dark: {
    primary: palette.white,
    secondary: modifyColor(palette.gray, { l: 40 }),
    tertiary: modifyColor(palette.black, { l: 50 }),
    highlight: palette.lavendar,
    bg: palette.black,
    island: modifyColor(palette.black, { l: 35 }),
    well: modifyColor(palette.black, { l: 17 }),
    border: modifyColor(palette.black, { l: 20}),
    shadow: modifyColor(palette.black, {l: 0, a: 0.4 })
  },
  default: {
    primary: palette.black,
    secondary: modifyColor(palette.black, { l: 40 }),
    tertiary: palette.gray,
    highlight: palette.lavendar,
    bg: palette.white,
    island: palette.white,
    well: modifyColor(palette.gray, { l: 90 }),
    border: modifyColor(palette.gray, { l: 85 }),
    shadow: modifyColor(palette.gray, { a: 0.2 })
  }
}

const type = {
  fonts: {
    display: {
      weights: {
        normal: 'Publico Headline'
      },
      stack: 'Publico, Georgia, Times, Times New Roman, serif'
    },
    body: {
      weights: {
        normal: 'Publico Text',
        italic: 'Publico Text Italic'
      },
      stack: 'Publico, Georgia, Times, Times New Roman, serif'
    },
    accent: {
      weights: {
        light: 'Guardian Sans Light',
        normal: 'Guardian Sans',
        bold: 'Guardian Sans Bold'
      },
      stack: 'Trebuchet, Lucida Grande, Verdana, sans-serif'
    },
  },
  scale: {
    alpha: scale.get(6),
    beta: scale.get(4),
    gamma: scale.get(3),
    delta: scale.get(1),
    epsilon: scale.get(0),
    zeta: scale.get(-1),
  },
  leading: {
    tight: 1.2,
    default: 1.7
  }
}

const spacing = {
  scale: {
    xxxnarrow: scale.get(-12),
    xxnarrow: scale.get(-8),
    xnarrow: scale.get(-4),
    narrow: scale.get(-2),
    medium: scale.get(1),
    wide: scale.get(3),
    xwide: scale.get(6)
  },
  outside: {
    default: 'narrow',
    small: 'medium',
    medium: 'wide'
  }
}

const breakpoints = {
  sizes: {
    xsmall: 30,
    small: 42,
    medium: 62,
    large: 75,
    xlarge: 100
  },
  unit: 'em'
}

module.exports = {
  color: {
    palette,
    themes
  },
  type,
  spacing,
  breakpoints
}