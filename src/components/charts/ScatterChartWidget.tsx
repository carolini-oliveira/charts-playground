import { ScatterChart } from '@mui/x-charts/ScatterChart'
import { Card, CardContent, CardHeader, Divider, Box, Chip, Typography, Skeleton } from '@mui/material'
import type { ChartConfig, Density } from '../../types'
import { COLOR_PALETTES } from '../../theme/theme'
import { scatterChartData } from '../../data/chartData'
import { RichTooltip } from './CustomTooltip'

type Props = {
  chartConfig: ChartConfig
  density: Density
}

const CHART_HEIGHTS: Record<Density, number> = { compact: 260, normal: 340, comfortable: 420 }

const LOG_AXIS = { scaleType: 'log' as const, min: 5, max: 15000 }
const LINEAR_AXIS = { scaleType: 'linear' as const, min: 0, max: 11000 }

const FONT_SIZES = {
  small:  { titleVariant: 'body1' as const, subVariant: 'caption' as const, axisLabel: 10, axisTick: 9,  note: 10 },
  medium: { titleVariant: 'h6'    as const, subVariant: 'caption' as const, axisLabel: 12, axisTick: 11, note: 11 },
  large:  { titleVariant: 'h5'    as const, subVariant: 'body1'   as const, axisLabel: 15, axisTick: 13, note: 13 },
} as const

const NEON_PALETTE = ['#00f0ff', '#ff0099', '#00ff88', '#ffcc00', '#bb44ff', '#ff6600']

export const ScatterChartWidget = ({ chartConfig, density }: Props) => {
  const palette = COLOR_PALETTES[chartConfig.colorPalette]
  const height = CHART_HEIGHTS[density]
  const isLog = chartConfig.scatterAxisScale === 'log'
  const fs = FONT_SIZES[chartConfig.scatterFontSize]
  const style = chartConfig.scatterStyle
  const isNeon = style === 'neon'
  const isMinimal = style === 'minimal'
  const isOutlined = style === 'outlined'

  const activeColors = isNeon ? NEON_PALETTE : palette

  const { tooltipTrigger, tooltipVariant } = chartConfig
  // Scatter has no axis tooltip — effective trigger is always 'item' (or 'none')
  const effectiveTrigger = tooltipTrigger === 'none' ? 'none' : 'item'
  const tooltipSlots =
    tooltipVariant === 'rich' && effectiveTrigger !== 'none'
      ? { tooltip: RichTooltip }
      : undefined

  if (chartConfig.scatterLoading) {
    return (
      <Card sx={isNeon ? { bgcolor: '#06071a' } : {}}>
        <CardHeader
          title={<Skeleton width="52%" height={28} />}
          subheader={<Skeleton width="36%" height={18} sx={{ mt: 0.5 }} />}
        />
        <Divider />
        <CardContent sx={{ pt: 1, pb: '8px !important' }}>
          <Skeleton variant="rectangular" height={height} sx={{ borderRadius: 1 }} />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            {[22, 20, 24, 19].map((w, i) => (
              <Skeleton key={i} width={`${w}%`} height={14} />
            ))}
          </Box>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card sx={{
      ...(isNeon && { bgcolor: '#06071a' }),
      ...(isMinimal && { boxShadow: 'none', border: '1px solid', borderColor: 'divider' }),
      ...(isOutlined && { border: '2px solid', borderColor: 'primary.main', boxShadow: 'none' }),
    }}>
      <CardHeader
        title="CAC vs LTV por Segmento"
        subheader="Custo de Aquisição (R$) × Lifetime Value (R$)"
        titleTypographyProps={{
          variant: fs.titleVariant,
          fontWeight: 600,
          ...(isNeon && { color: '#c8d8ff' }),
        }}
        subheaderTypographyProps={{
          variant: fs.subVariant,
          ...(isNeon && { color: '#4a5a8a' }),
        }}
        action={
          !isMinimal ? (
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', pr: 1, pt: 0.5 }}>
              <Chip
                label="Escala Y"
                size="small"
                variant="outlined"
                sx={{
                  fontSize: 10,
                  height: 20,
                  ...(isNeon && { color: '#4a5a8a', borderColor: '#1a2244' }),
                }}
              />
              <Chip
                label={isLog ? 'Logarítmica' : 'Linear'}
                size="small"
                color={isLog ? 'secondary' : 'default'}
                sx={{
                  fontSize: 10,
                  height: 20,
                  fontWeight: 600,
                  ...(isNeon && isLog && { bgcolor: '#1a0838', color: '#cc77ff', border: 'none' }),
                  ...(isNeon && !isLog && { bgcolor: '#0a1a3a', color: '#66aaff', border: 'none' }),
                }}
              />
            </Box>
          ) : null
        }
      />
      {!isMinimal && <Divider sx={isNeon ? { borderColor: '#0d1030' } : {}} />}
      <CardContent
        sx={{
          pt: isMinimal ? 0.5 : 1,
          pb: '8px !important',
          '& .MuiChartsLegend-root': { display: chartConfig.showLegend ? undefined : 'none' },
        }}
      >
        <Box
          sx={{
            ...(isNeon && {
              bgcolor: '#080a20',
              borderRadius: 2,
              p: 1,
              boxShadow: 'inset 0 0 50px rgba(60, 80, 255, 0.1)',
              '& svg': { filter: 'saturate(2) brightness(1.3)' },
            }),
            ...(isOutlined && {
              bgcolor: 'action.hover',
              borderRadius: 1.5,
              p: 1,
            }),
          }}
        >
          <ScatterChart
            xAxis={[{
              label: 'CAC (R$)',
              min: isLog ? 5 : 0,
              max: isLog ? 2500 : 1800,
              labelStyle: { fontSize: fs.axisLabel },
              tickLabelStyle: { fontSize: fs.axisTick },
            }]}
            yAxis={[{
              ...(isLog ? LOG_AXIS : LINEAR_AXIS),
              label: 'LTV (R$)',
              labelStyle: { fontSize: fs.axisLabel },
              tickLabelStyle: { fontSize: fs.axisTick },
            }]}
            series={scatterChartData.map((s) => ({
              ...s,
              markerSize: chartConfig.scatterMarkerSize,
            }))}
            colors={activeColors}
            height={height}
            grid={chartConfig.showGrid ? { horizontal: true, vertical: true } : undefined}
            slots={tooltipSlots}
            slotProps={{ tooltip: { trigger: effectiveTrigger } }}
            sx={{
              ...(isMinimal && {
                opacity: 0.72,
                '& .MuiChartsAxis-line': { strokeOpacity: 0.25 },
                '& .MuiChartsGrid-line': { strokeOpacity: 0.12 },
              }),
              ...(isNeon && {
                '& .MuiChartsAxis-tickLabel': { fill: '#8899cc' },
                '& .MuiChartsAxis-label': { fill: '#4a5a8a' },
                '& .MuiChartsAxis-line': { stroke: '#1a2244' },
                '& .MuiChartsAxis-tick': { stroke: '#1a2244' },
                '& .MuiChartsGrid-line': { stroke: '#151830', strokeOpacity: 0.8 },
              }),
            }}
          />
        </Box>
      </CardContent>

      {isLog && !isMinimal && (
        <Box sx={{ px: 2, pb: 1.5 }}>
          <Typography
            variant="caption"
            sx={{
              fontSize: fs.note,
              color: isNeon ? '#2e3d6a' : 'text.secondary',
            }}
          >
            A escala logarítmica revela padrões em todos os segmentos simultaneamente, mesmo com dados
            que variam de R$&nbsp;8 a R$&nbsp;9.600.
          </Typography>
        </Box>
      )}
    </Card>
  )
}
