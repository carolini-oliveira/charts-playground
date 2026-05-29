import { useMemo } from 'react'
import { useTheme } from '@mui/material/styles'
import { ScatterChart } from '@mui/x-charts/ScatterChart'
import { ChartsReferenceLine } from '@mui/x-charts'
import { Card, CardContent, CardHeader, Divider, Box, Typography, Skeleton } from '@mui/material'
import type { ChartConfig, Density } from '../../types'
import { cycleTimeData } from '../../data/chartData'

const CHART_HEIGHTS: Record<Density, number> = { compact: 240, normal: 320, comfortable: 400 }
const Y_TICKS = [0, 2, 6, 12, 24, 48, 72]

const formatHours = (h: number): string => {
  if (h === 0) return '0h'
  if (h < 24) return `${Math.round(h)}h`
  return `${Math.round(h / 24)}d`
}

const formatDate = (ts: number): string => {
  const d = new Date(ts)
  return `${d.getUTCDate().toString().padStart(2, '0')}/${(d.getUTCMonth() + 1).toString().padStart(2, '0')}`
}

const formatAvg = (h: number): string => {
  const hours = Math.floor(h)
  const mins = Math.round((h - hours) * 60)
  if (hours >= 24) {
    const days = Math.floor(hours / 24)
    const rh = hours % 24
    return rh > 0 ? `${days}d ${rh}h` : `${days}d`
  }
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

type LegendItemProps = { color: string; label: string; dashed?: boolean }

const LegendItem = ({ color, label, dashed }: LegendItemProps) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
    {dashed ? (
      <Box sx={{
        width: 24,
        height: 2,
        flexShrink: 0,
        background: `repeating-linear-gradient(90deg, ${color} 0 6px, transparent 6px 10px)`,
      }} />
    ) : (
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color, flexShrink: 0 }} />
    )}
    <Typography variant="caption" color="text.secondary">{label}</Typography>
  </Box>
)

type Props = {
  chartConfig: ChartConfig
  density: Density
}

export const CycleTimeScatterWidget = ({ chartConfig, density }: Props) => {
  const theme = useTheme()
  const height = CHART_HEIGHTS[density]
  const normalColor = theme.palette.mode === 'dark' ? '#bdbdbd' : '#212121'

  const { avg, series } = useMemo(() => {
    const total = cycleTimeData.reduce((s, p) => s + p.y, 0)
    const avg = total / cycleTimeData.length
    const threshold = 2 * avg
    return {
      avg,
      series: [
        {
          id: 'below',
          label: 'Abaixo da média',
          data: cycleTimeData.filter(p => p.y < avg),
          color: '#4caf50',
        },
        {
          id: 'normal',
          label: 'Normal',
          data: cycleTimeData.filter(p => p.y >= avg && p.y < threshold),
          color: normalColor,
        },
        {
          id: 'outlier',
          label: 'Outlier (acima 2x)',
          data: cycleTimeData.filter(p => p.y >= threshold),
          color: '#e53935',
        },
      ],
    }
  }, [normalColor])

  const xMin = cycleTimeData[0].x - 4 * 3600000
  const xMax = cycleTimeData[cycleTimeData.length - 1].x + 4 * 3600000
  const effectiveTrigger = chartConfig.tooltipTrigger === 'none' ? 'none' : 'item'

  if (chartConfig.scatterLoading) {
    return (
      <Card>
        <CardHeader
          title={<Skeleton width="46%" height={28} />}
          subheader={<Skeleton width="30%" height={18} sx={{ mt: 0.5 }} />}
        />
        <Divider />
        <CardContent sx={{ pt: 1, pb: '8px !important' }}>
          <Skeleton variant="rectangular" height={height} sx={{ borderRadius: 1 }} />
          <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
            {[16, 14, 20, 22].map((w, i) => <Skeleton key={i} width={`${w}%`} height={14} />)}
          </Box>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader
        title="Cycle Time de PRs"
        subheader={`${formatAvg(avg)} média · ${cycleTimeData.length} PRs`}
        titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
        subheaderTypographyProps={{ variant: 'caption' }}
      />
      <Divider />
      <CardContent sx={{
        pt: 1,
        pb: '8px !important',
        '& .MuiChartsLegend-root': { display: 'none' },
      }}>
        <ScatterChart
          xAxis={[{
            min: xMin,
            max: xMax,
            valueFormatter: formatDate,
            tickNumber: 7,
            tickLabelStyle: { fontSize: 11 },
          }]}
          yAxis={[{
            min: 0,
            max: 80,
            tickInterval: Y_TICKS,
            valueFormatter: formatHours,
            tickLabelStyle: { fontSize: 11 },
          }]}
          series={series.map(s => ({
            ...s,
            markerSize: chartConfig.scatterMarkerSize,
          }))}
          height={height}
          grid={chartConfig.showGrid ? { horizontal: true } : undefined}
          slotProps={{ tooltip: { trigger: effectiveTrigger } }}
        >
          <ChartsReferenceLine
            y={avg}
            lineStyle={{ stroke: '#ffd600', strokeDasharray: '8 4', strokeWidth: 2 }}
          />
        </ScatterChart>

        {chartConfig.showLegend && (
          <Box sx={{ display: 'flex', gap: 3, mt: 0.5, flexWrap: 'wrap' }}>
            <LegendItem color="#ffd600" dashed label="Média" />
            <LegendItem color="#4caf50" label="Abaixo da média" />
            <LegendItem color={normalColor} label="Normal" />
            <LegendItem color="#e53935" label="Outlier (acima 2x)" />
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
