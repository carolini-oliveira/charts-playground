import { LineChart } from '@mui/x-charts/LineChart'
import { Card, CardContent, CardHeader, Divider } from '@mui/material'
import type { ChartConfig, Density } from '../../types'
import { COLOR_PALETTES } from '../../theme/theme'
import { areaChartData } from '../../data/chartData'
import { RichTooltip } from './CustomTooltip'

type Props = {
  chartConfig: ChartConfig
  density: Density
}

const CHART_HEIGHTS: Record<Density, number> = { compact: 220, normal: 280, comfortable: 360 }

export const AreaChartWidget = ({ chartConfig, density }: Props) => {
  const palette = COLOR_PALETTES[chartConfig.colorPalette]
  const height = CHART_HEIGHTS[density]
  const { tooltipTrigger, tooltipVariant } = chartConfig

  const tooltipSlots =
    tooltipVariant === 'rich' && tooltipTrigger !== 'none'
      ? { tooltip: RichTooltip }
      : undefined

  return (
    <Card>
      <CardHeader
        title="Visitantes e Cadastros"
        subheader="Volume mensal acumulado"
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
        <LineChart
          xAxis={[{ data: areaChartData.xAxis, scaleType: 'point' }]}
          series={areaChartData.series.map((s) => ({
            ...s,
            area: true,
            curve: chartConfig.curveType,
          }))}
          colors={palette}
          height={height}
          grid={chartConfig.showGrid ? { horizontal: true } : undefined}
          slots={tooltipSlots}
          slotProps={{ tooltip: { trigger: tooltipTrigger } }}
        />
      </CardContent>
    </Card>
  )
}
