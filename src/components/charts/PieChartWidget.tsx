import { PieChart } from '@mui/x-charts/PieChart'
import { Card, CardContent, CardHeader, Divider } from '@mui/material'
import type { ChartConfig, Density } from '../../types'
import { COLOR_PALETTES } from '../../theme/theme'
import { pieChartData } from '../../data/chartData'
import { RichTooltip } from './CustomTooltip'

type Props = {
  chartConfig: ChartConfig
  density: Density
}

const CHART_HEIGHTS: Record<Density, number> = { compact: 220, normal: 280, comfortable: 360 }

export const PieChartWidget = ({ chartConfig, density }: Props) => {
  const palette = COLOR_PALETTES[chartConfig.colorPalette]
  const height = CHART_HEIGHTS[density]
  const isDonut = chartConfig.pieInnerRadius > 0
  const { tooltipTrigger, tooltipVariant } = chartConfig

  // Pie has no axis — effective trigger is always 'item' (or 'none')
  const effectiveTrigger = tooltipTrigger === 'none' ? 'none' : 'item'
  const tooltipSlots =
    tooltipVariant === 'rich' && effectiveTrigger !== 'none'
      ? { tooltip: RichTooltip }
      : undefined

  return (
    <Card>
      <CardHeader
        title="Fontes de Tráfego"
        subheader={isDonut ? 'Visualização: Donut' : 'Visualização: Pizza'}
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
        <PieChart
          series={[{
            data: pieChartData,
            innerRadius: chartConfig.pieInnerRadius,
            paddingAngle: isDonut ? 3 : 0,
            cornerRadius: isDonut ? 4 : 0,
          }]}
          colors={palette}
          height={height}
          slots={tooltipSlots}
          slotProps={{ tooltip: { trigger: effectiveTrigger } }}
        />
      </CardContent>
    </Card>
  )
}
