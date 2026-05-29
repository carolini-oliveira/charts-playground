import { useState } from 'react'
import { Box, Container, Drawer, Fab, Tooltip, Typography } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune'
import { AppHeader } from '../components/layout/AppHeader'
import { LineChartWidget } from '../components/charts/LineChartWidget'
import { BarChartWidget } from '../components/charts/BarChartWidget'
import { AreaChartWidget } from '../components/charts/AreaChartWidget'
import { PieChartWidget } from '../components/charts/PieChartWidget'
import { ScatterChartWidget } from '../components/charts/ScatterChartWidget'
import { CycleTimeScatterWidget } from '../components/charts/CycleTimeScatterWidget'
import { ControlsPanel } from '../components/controls/ControlsPanel'
import type { ThemeConfig, ChartConfig } from '../types'

type Props = {
  themeConfig: ThemeConfig
  chartConfig: ChartConfig
  onToggleMode: () => void
  onUpdateTheme: (partial: Partial<ThemeConfig>) => void
  onUpdateChart: (partial: Partial<ChartConfig>) => void
}

export const Dashboard = ({
  themeConfig,
  chartConfig,
  onToggleMode,
  onUpdateTheme,
  onUpdateChart,
}: Props) => {
  const [controlsOpen, setControlsOpen] = useState(false)

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppHeader
        themeConfig={themeConfig}
        onToggleMode={onToggleMode}
        onOpenControls={() => setControlsOpen(true)}
      />

      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
            Dashboard Analítico
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Dados de desempenho — Janeiro a Dezembro de 2025
          </Typography>
        </Box>

        {/* Charts row 1 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
            mb: 2,
          }}
        >
          <LineChartWidget chartConfig={chartConfig} density={themeConfig.density} />
          <BarChartWidget chartConfig={chartConfig} density={themeConfig.density} />
        </Box>

        {/* Charts row 2 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
            gap: 2,
            mb: 2,
          }}
        >
          <AreaChartWidget chartConfig={chartConfig} density={themeConfig.density} />
          <PieChartWidget chartConfig={chartConfig} density={themeConfig.density} />
        </Box>

        {/* Charts row 3 — Scatter */}
        <ScatterChartWidget chartConfig={chartConfig} density={themeConfig.density} />

        {/* Charts row 4 — Cycle Time Scatter (variação com classificação por média) */}
        <Box sx={{ mt: 2 }}>
          <CycleTimeScatterWidget chartConfig={chartConfig} density={themeConfig.density} />
        </Box>
      </Container>

      {/* Controls drawer */}
      <Drawer
        anchor="right"
        open={controlsOpen}
        onClose={() => setControlsOpen(false)}
        slotProps={{ paper: { sx: { width: 320 } } }}
      >
        <ControlsPanel
          themeConfig={themeConfig}
          chartConfig={chartConfig}
          onUpdateTheme={onUpdateTheme}
          onUpdateChart={onUpdateChart}
          onClose={() => setControlsOpen(false)}
        />
      </Drawer>

      {/* FAB to open controls */}
      <Tooltip title="Personalizar dashboard" placement="left">
        <Fab
          color="primary"
          size="medium"
          onClick={() => setControlsOpen(true)}
          sx={{ position: 'fixed', bottom: 24, right: 24 }}
        >
          <TuneIcon />
        </Fab>
      </Tooltip>
    </Box>
  )
}
