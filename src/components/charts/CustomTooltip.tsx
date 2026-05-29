import { Paper, Box, Typography, Divider } from '@mui/material'
import {
  ChartsTooltipContainer,
  useAxesTooltip,
  useItemTooltip,
} from '@mui/x-charts/ChartsTooltip'
import type { ChartsTooltipContainerProps } from '@mui/x-charts/ChartsTooltip'

function compactNum(v: unknown): string {
  if (typeof v !== 'number') return '—'
  if (v >= 1000) return `${(v / 1000).toFixed(0)}k`
  return String(v)
}

type AxesData = NonNullable<ReturnType<typeof useAxesTooltip>>
type ItemData = NonNullable<ReturnType<typeof useItemTooltip>>

function AxisContent({ axes }: { axes: AxesData }) {
  const axis = axes[0]
  if (!axis) return null

  return (
    <Paper
      elevation={4}
      sx={{ px: 1.5, py: 1.25, minWidth: 170, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}
    >
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, display: 'block', mb: 0.5 }}>
        {axis.axisFormattedValue}
      </Typography>
      <Divider sx={{ mb: 0.75 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {axis.seriesItems.map((item) => (
          <Box key={String(item.seriesId)} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.color, flexShrink: 0 }} />
            <Typography variant="caption" sx={{ flex: 1, color: 'text.secondary' }}>
              {item.formattedLabel ?? String(item.seriesId)}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
              {typeof item.formattedValue === 'string' ? item.formattedValue : compactNum(item.value)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  )
}

function ItemContent({ data }: { data: ItemData }) {
  const isScatter =
    data.value !== null &&
    typeof data.value === 'object' &&
    'x' in (data.value as object) &&
    'y' in (data.value as object)

  const scatterVal = isScatter ? (data.value as { x: number; y: number }) : null

  return (
    <Paper
      elevation={4}
      sx={{ px: 1.5, py: 1.25, minWidth: 150, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: scatterVal ? 0.75 : 0 }}>
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: data.color, flexShrink: 0 }} />
        <Typography variant="caption" sx={{ fontWeight: 700 }}>
          {data.label ?? 'Valor'}
        </Typography>
      </Box>

      {scatterVal ? (
        <Box sx={{ pl: 2.5, display: 'flex', flexDirection: 'column', gap: 0.25 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {'CAC: '}
            <strong>R$ {scatterVal.x}</strong>
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {'LTV: '}
            <strong>{compactNum(scatterVal.y)}</strong>
          </Typography>
        </Box>
      ) : (
        <Typography variant="body2" sx={{ fontWeight: 600, pl: 2.5 }}>
          {typeof data.formattedValue === 'string' ? data.formattedValue : compactNum(data.value)}
        </Typography>
      )}
    </Paper>
  )
}

export function RichTooltip(props: Omit<ChartsTooltipContainerProps, 'children'>) {
  const axesData = useAxesTooltip()
  const itemData = useItemTooltip()

  return (
    <ChartsTooltipContainer {...props}>
      {axesData && axesData.length > 0 ? (
        <AxisContent axes={axesData} />
      ) : itemData ? (
        <ItemContent data={itemData} />
      ) : null}
    </ChartsTooltipContainer>
  )
}
