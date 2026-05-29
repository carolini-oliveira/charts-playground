import { LineChart } from '@mui/x-charts/LineChart'
import { Card, CardContent, CardHeader, Divider } from '@mui/material'
import type { ChartConfig, Density } from '../../types'
import { COLOR_PALETTES } from '../../theme/theme'
import { lineChartData } from '../../data/chartData'
import { RichTooltip } from './CustomTooltip'

type Props = {
  chartConfig: ChartConfig
  density: Density
}

const CHART_HEIGHTS: Record<Density, number> = { compact: 220, normal: 280, comfortable: 360 }

export const LineChartWidget = ({ chartConfig, density }: Props) => {
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
        title="Receita vs Despesas"
        subheader="Evolução mensal em milhares (R$)"
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
          xAxis={[{ data: lineChartData.xAxis, scaleType: 'point' }]}
          series={lineChartData.series.map((s) => ({
            ...s,
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
