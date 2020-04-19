import { injectGlobal } from "emotion"
import { round } from "lodash"
import fontMeasure from "font-measure"

const fonts = []

function importAll(r) {
  r.keys().forEach((key) => fonts.push({ name: key, src: r(key).default }))
}

function inject({ name, src }) {
  const regex = /([A-Za-z]+)\-([A-Za-z]+)-?([A-Za-z]+)?\.(woff|woff2|eot|ttf|otf)$/
  const [, family, weight, style = "normal"] = name.match(regex)

  function detectWeight(weight) {
    switch (weight.toLowerCase()) {
      case "thin":
        return 100
      case "extralight":
        return 200
      case "light":
        return 300
      case "regular":
        return 400
      case "medium":
        return 500
      case "semibold":
        return 600
      case "bold":
        return 700
      case "extrabold":
        return 800
      case "black":
        return 900
    }
  }

  injectGlobal`
    @font-face {
    font-family: '${family}';
        src: url(${src});
        font-weight: ${detectWeight(weight)};
        font-style: ${style.toLowerCase()};
    }
  `
}

importAll(require.context("./assets/fonts/", true))
fonts.forEach((font) => inject(font))

const { xHeight } = fontMeasure("Metropolis")

function idealSize(xHeight) {
  const reciprocal = 1 / xHeight
  const min = 0.419 * reciprocal
  const max = 0.579 * reciprocal
  return (min + max) / 2
}

function setScale(base, ratio) {
  return (scaleTo) => {
    return round(base * Math.pow(ratio, scaleTo), 3)
  }
}

export const vr = (multiplier) => round(idealSize(xHeight) * multiplier, 3)

export const ms = setScale(idealSize(xHeight), 1.41)
