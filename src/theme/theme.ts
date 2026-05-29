import { createTheme } from '@mui/material/styles'
import type { ThemeConfig, ChartColorPalette } from '../types'

export const COLOR_PALETTES: Record<ChartColorPalette, string[]> = {
  default: ['#1976d2', '#dc004e', '#388e3c', '#f57c00', '#7b1fa2', '#00796b'],
  vibrant: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF8B94'],
  pastel: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#E8BAFF'],
  monochrome: ['#0d1117', '#21262d', '#30363d', '#484f58', '#6e7681', '#8b949e'],
  warm: ['#FF4500', '#FF6347', '#FF8C00', '#FFD700', '#FFA500', '#FF69B4'],
}

export const PRIMARY_COLORS = [
  { label: 'Azul', value: '#1976d2' },
  { label: 'Índigo', value: '#3f51b5' },
  { label: 'Roxo', value: '#7b1fa2' },
  { label: 'Verde', value: '#388e3c' },
  { label: 'Teal', value: '#00796b' },
  { label: 'Vermelho', value: '#d32f2f' },
  { label: 'Laranja', value: '#f57c00' },
  { label: 'Rosa', value: '#c2185b' },
]

export const createAppTheme = (config: ThemeConfig) =>
  createTheme({
    palette: {
      mode: config.mode,
      primary: { main: config.primaryColor },
      background: {
        default: config.mode === 'dark' ? '#0f0f0f' : '#f5f6fa',
        paper: config.mode === 'dark' ? '#1a1a1a' : '#ffffff',
      },
    },
    shape: {
      borderRadius: config.borderRadius,
    },
    spacing: config.spacing,
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: { fontWeight: 700 },
      h6: { fontWeight: 600 },
    },
    components: {
      MuiCard: {
        defaultProps: { elevation: 1 },
        styleOverrides: {
          root: {
            transition: 'box-shadow 0.2s ease',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 500 },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: { textTransform: 'none' },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  })
