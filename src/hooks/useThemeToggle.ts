import { useState } from 'react'
import type { ThemeConfig } from '../types'

const DEFAULT_CONFIG: ThemeConfig = {
  mode: 'light',
  primaryColor: '#1976d2',
  borderRadius: 8,
  spacing: 8,
  density: 'normal',
  cardVariant: 'elevated',
}

export const useThemeToggle = () => {
  const [config, setConfig] = useState<ThemeConfig>(DEFAULT_CONFIG)

  const toggleMode = () =>
    setConfig((prev) => ({ ...prev, mode: prev.mode === 'light' ? 'dark' : 'light' }))

  const updateConfig = (partial: Partial<ThemeConfig>) =>
    setConfig((prev) => ({ ...prev, ...partial }))

  return { config, toggleMode, updateConfig }
}
