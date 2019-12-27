export default class ColorGenerator {
  private static isHex = (c: string): boolean => c[0] === '#'

  private static hexToDecimal = (hex: string): number =>
    Number.parseInt(hex, 16)

  private static hexStrToRgb = (c: string): number[] => {
    const cleaned = c.toLowerCase().trim()
    const r = cleaned.substring(1, 3)
    const g = cleaned.substring(3, 5)
    const b = cleaned.substring(5, 7)
    return [r, g, b].map(ColorGenerator.hexToDecimal)
  }

  private static rgbStrToRgb = (c: string): number[] => {
    const cleaned = c.toLowerCase().trim()
    const contents = cleaned.split('(')[1].split(')')[0]
    const components = contents
      .split(',')
      .map((component: string) => component.trim())
    return components.map(numString => Number.parseInt(numString, 10))
  }

  private static colorToString = (
    r: number,
    g: number,
    b: number,
    a?: number,
  ) => {
    if (!a) {
      return `rgb(${r}, ${g}, ${b})`
    }

    return `rgba(${r}, ${g}, ${b}, ${a})`
  }

  private static darken = (color: number) => Math.min(color - 64, 255)

  private static parseRgb = (color: string): number[] =>
    ColorGenerator.isHex(color)
      ? ColorGenerator.hexStrToRgb(color)
      : ColorGenerator.rgbStrToRgb(color)

  private r: number
  private g: number
  private b: number

  constructor(color: string) {
    const [r, g, b] = ColorGenerator.parseRgb(color)
    this.r = r
    this.g = g
    this.b = b
  }

  public getDarker = (alpha?: number): string => {
    return ColorGenerator.colorToString(
      ColorGenerator.darken(this.r),
      ColorGenerator.darken(this.g),
      ColorGenerator.darken(this.b),
      alpha,
    )
  }

  public getWithAlpha = (alpha: number): string => {
    return ColorGenerator.colorToString(this.r, this.g, this.b, alpha)
  }

  public getBackgroundColor = (): string => this.getWithAlpha(0.15)

  public getColorProps = () => ({
    border: this.getWithAlpha(0.375),
    background: this.getWithAlpha(0.125),
    hoverBackground: this.getWithAlpha(0.1875),
    color: this.getDarker(),
  })
}
