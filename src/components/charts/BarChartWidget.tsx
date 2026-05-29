import { BarChart } from '@mui/x-charts/BarChart'
import { Card, CardContent, CardHeader, Divider } from '@mui/material'
import type { ChartConfig, Density } from '../../types'
import { COLOR_PALETTES } from '../../theme/theme'
import { barChartData } from '../../data/chartData'
import { RichTooltip } from './CustomTooltip'

type Props = {
  chartConfig: ChartConfig
  density: Density
}

const CHART_HEIGHTS: Record<Density, number> = { compact: 220, normal: 280, comfortable: 360 }

export const BarChartWidget = ({ chartConfig, density }: Props) => {
  const palette = COLOR_PALETTES[chartConfig.colorPalette]
  const height = CHART_HEIGHTS[density]
  const isHorizontal = chartConfig.barLayout === 'horizontal'
  const { tooltipTrigger, tooltipVariant } = chartConfig

  const tooltipSlots =
    tooltipVariant === 'rich' && tooltipTrigger !== 'none'
      ? { tooltip: RichTooltip }
      : undefined

  return (
    <Card>
      <CardHeader
        title="Vendas por Trimestre"
        subheader="Comparativo 2024 vs 2025 (em milhares)"
        titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
        subheaderTypographyProps={{ variant: 'caption' }}
      />
      <Divider />
      <CardContent
        sx={{
          pt: 1,
          pb: '8px !important',
          '& .MuiChartsLegend-root': { display: chartConfig.showLegend ? undefined : 'none' },
        }}
      >
        <BarChart
          layout={chartConfig.barLayout}
          xAxis={!isHorizontal ? [{ scaleType: 'band', data: barChartData.xAxis }] : undefined}
          yAxis={isHorizontal ? [{ scaleType: 'band', data: barChartData.xAxis }] : undefined}
          series={barChartData.series}
          colors={palette}
          height={height}
          grid={chartConfig.showGrid ? { horizontal: !isHorizontal, vertical: isHorizontal } : undefined}
          slots={tooltipSlots}
          slotProps={{ tooltip: { trigger: tooltipTrigger } }}
        />
      </CardContent>
    </Card>
  )
}
