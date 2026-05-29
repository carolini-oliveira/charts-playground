export type ThemeMode = 'light' | 'dark'
export type CardVariant = 'elevated' | 'outlined' | 'filled'
export type Density = 'compact' | 'normal' | 'comfortable'
export type CurveType = 'linear' | 'natural' | 'monotoneX' | 'step'
export type ChartColorPalette = 'default' | 'vibrant' | 'pastel' | 'monochrome' | 'warm'
export type BarLayout = 'vertical' | 'horizontal'
export type MetricIconType = 'money' | 'people' | 'cart' | 'trending'
export type ScatterAxisScale = 'linear' | 'log'
export type ScatterFontSize = 'small' | 'medium' | 'large'
export type ScatterStyle = 'default' | 'outlined' | 'neon' | 'minimal'
export type TooltipTrigger = 'axis' | 'item' | 'none'
export type TooltipVariant = 'default' | 'rich'

export type ThemeConfig = {
  mode: ThemeMode
  primaryColor: string
  borderRadius: number
  spacing: number
  density: Density
  cardVariant: CardVariant
}

export type ChartConfig = {
  colorPalette: ChartColorPalette
  curveType: CurveType
  barLayout: BarLayout
  showGrid: boolean
  showLegend: boolean
  pieInnerRadius: number
  scatterMarkerSize: number
  scatterAxisScale: ScatterAxisScale
  scatterFontSize: ScatterFontSize
  scatterStyle: ScatterStyle
  scatterLoading: boolean
  tooltipTrigger: TooltipTrigger
  tooltipVariant: TooltipVariant
}

export type MetricData = {
  id: string
  label: string
  value: string
  change: number
  iconType: MetricIconType
}
