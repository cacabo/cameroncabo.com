interface IColorProps {
  border: string
  background: string
  hoverbackground: string
  color: string
  backgroundColor: string
}

const isHex = (c: string): boolean => c.startsWith('#')

const hexToDecimal = (hex: string): number => Number.parseInt(hex, 16)

const hexStrToRgb = (c: string): number[] => {
  const cleaned = c.toLowerCase().trim()
  const r = cleaned.substring(1, 3)
  const g = cleaned.substring(3, 5)
  const b = cleaned.substring(5, 7)
  return [r, g, b].map(hexToDecimal)
}

const rgbStrToRgb = (c: string): number[] => {
  const cleaned = c.toLowerCase().trim()
  const contents = cleaned.split('(')[1].split(')')[0]
  const components = contents.split(',').map((component: string) => component.trim())
  return components.map((numString): number => Number.parseInt(numString, 10))
}

const colorToString = (r: number, g: number, b: number, a?: number): string => {
  if (!a) {
    return `rgb(${r}, ${g}, ${b})`
  }

  return `rgba(${r}, ${g}, ${b}, ${a})`
}

const darken = (color: number): number => Math.min(color - 64, 255)

const parseRgb = (color: string): number[] =>
  isHex(color) ? hexStrToRgb(color) : rgbStrToRgb(color)

export const getColorProps = (color: string): IColorProps => {
  const [r, g, b] = parseRgb(color)

  const getWithAlpha = (alpha: number): string => colorToString(r, g, b, alpha)

  return {
    border: getWithAlpha(0.375),
    background: getWithAlpha(0.125),
    hoverbackground: getWithAlpha(0.1875),
    backgroundColor: getWithAlpha(0.125),
    color: colorToString(darken(r), darken(g), darken(b)),
  }
}
