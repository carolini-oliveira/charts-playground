import { useState } from 'react'
import type { ChartConfig } from '../types'

const DEFAULT_CHART_CONFIG: ChartConfig = {
  colorPalette: 'default',
  curveType: 'natural',
  barLayout: 'vertical',
  showGrid: true,
  showLegend: true,
  pieInnerRadius: 0,
  scatterMarkerSize: 6,
  scatterAxisScale: 'linear',
  scatterFontSize: 'medium',
  scatterStyle: 'default',
  scatterLoading: false,
  tooltipTrigger: 'axis',
  tooltipVariant: 'default',
}

export const useChartConfig = () => {
  const [config, setConfig] = useState<ChartConfig>(DEFAULT_CHART_CONFIG)

  const updateConfig = (partial: Partial<ChartConfig>) =>
    setConfig((prev) => ({ ...prev, ...partial }))

  return { config, updateConfig }
}
