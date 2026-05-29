import { useMemo } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { useThemeToggle } from './hooks/useThemeToggle'
import { useChartConfig } from './hooks/useChartConfig'
import { createAppTheme } from './theme/theme'
import { Dashboard } from './pages/Dashboard'

const App = () => {
  const { config: themeConfig, toggleMode, updateConfig: updateTheme } = useThemeToggle()
  const { config: chartConfig, updateConfig: updateChart } = useChartConfig()

  const theme = useMemo(() => createAppTheme(themeConfig), [themeConfig])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard
        themeConfig={themeConfig}
        chartConfig={chartConfig}
        onToggleMode={toggleMode}
        onUpdateTheme={updateTheme}
        onUpdateChart={updateChart}
      />
    </ThemeProvider>
  )
}

export default App
