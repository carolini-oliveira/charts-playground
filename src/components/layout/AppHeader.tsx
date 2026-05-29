import { AppBar, Toolbar, Typography, IconButton, Tooltip, Box, Chip } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import TuneIcon from '@mui/icons-material/Tune'
import BarChartIcon from '@mui/icons-material/BarChart'
import type { ThemeConfig } from '../../types'

type Props = {
  themeConfig: ThemeConfig
  onToggleMode: () => void
  onOpenControls: () => void
}

export const AppHeader = ({ themeConfig, onToggleMode, onOpenControls }: Props) => (
  <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
    <Toolbar>
      <BarChartIcon sx={{ mr: 1.5, color: 'primary.main' }} />
      <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>
        Charts Playground
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 1 }}>
        <Chip label="MUI X Charts v9" size="small" variant="outlined" color="primary" />
        <Chip label="Design POC" size="small" variant="outlined" />
      </Box>

      <Tooltip title="Painel de personalização">
        <IconButton onClick={onOpenControls} color="default">
          <TuneIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title={themeConfig.mode === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}>
        <IconButton onClick={onToggleMode}>
          {themeConfig.mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Tooltip>
    </Toolbar>
  </AppBar>
)
