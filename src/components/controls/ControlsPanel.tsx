import {
  Box,
  Typography,
  Divider,
  Slider,
  Switch,
  FormControlLabel,
  ToggleButton,
  ToggleButtonGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CloseIcon from '@mui/icons-material/Close'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import type {
  ThemeConfig,
  ChartConfig,
  Density,
  CardVariant,
  CurveType,
  BarLayout,
  ChartColorPalette,
  ScatterAxisScale,
  ScatterFontSize,
  ScatterStyle,
  TooltipTrigger,
  TooltipVariant,
} from '../../types'
import { COLOR_PALETTES, PRIMARY_COLORS } from '../../theme/theme'

type Props = {
  themeConfig: ThemeConfig
  chartConfig: ChartConfig
  onUpdateTheme: (partial: Partial<ThemeConfig>) => void
  onUpdateChart: (partial: Partial<ChartConfig>) => void
  onClose: () => void
}

export const ControlsPanel = ({ themeConfig, chartConfig, onUpdateTheme, onUpdateChart, onClose }: Props) => (
  <Box sx={{ width: 320, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
    <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        Personalizar
      </Typography>
      <IconButton size="small" onClick={onClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
    <Divider />

    <Box sx={{ flex: 1, overflowY: 'auto' }}>
      {/* ── TEMA ─────────────────────────────── */}
      <Accordion defaultExpanded disableGutters elevation={0} sx={{ '&::before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>Tema</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 2, pt: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2" color="text.secondary">Modo</Typography>
            <ToggleButtonGroup
              value={themeConfig.mode}
              exclusive
              size="small"
              onChange={(_, val) => val && onUpdateTheme({ mode: val })}
            >
              <ToggleButton value="light" sx={{ px: 1.5 }}>
                <LightModeIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="caption">Claro</Typography>
              </ToggleButton>
              <ToggleButton value="dark" sx={{ px: 1.5 }}>
                <DarkModeIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="caption">Escuro</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Cor primária
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 1 }}>
            {PRIMARY_COLORS.map(({ label, value }) => (
              <Tooltip title={label} key={value}>
                <Box
                  onClick={() => onUpdateTheme({ primaryColor: value })}
                  sx={{
                    width: 28,
                    height: 28,
                    bgcolor: value,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    border: themeConfig.primaryColor === value ? '3px solid white' : '2px solid transparent',
                    boxShadow: themeConfig.primaryColor === value ? `0 0 0 2px ${value}` : 'none',
                    transition: 'transform 0.15s',
                    '&:hover': { transform: 'scale(1.2)' },
                  }}
                />
              </Tooltip>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      <Divider />

      {/* ── LAYOUT ───────────────────────────── */}
      <Accordion defaultExpanded disableGutters elevation={0} sx={{ '&::before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>Layout</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 2, pt: 0 }}>
          <Box sx={{ mb: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" color="text.secondary">Border radius</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{themeConfig.borderRadius}px</Typography>
            </Box>
            <Slider
              min={0}
              max={24}
              step={2}
              value={themeConfig.borderRadius}
              onChange={(_, val) => onUpdateTheme({ borderRadius: val as number })}
              marks={[{ value: 0, label: '0' }, { value: 12, label: '12' }, { value: 24, label: '24' }]}
              size="small"
            />
          </Box>

          <Box sx={{ mb: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" color="text.secondary">Espaçamento</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{themeConfig.spacing}px</Typography>
            </Box>
            <Slider
              min={4}
              max={16}
              step={2}
              value={themeConfig.spacing}
              onChange={(_, val) => onUpdateTheme({ spacing: val as number })}
              marks={[{ value: 4, label: '4' }, { value: 10, label: '10' }, { value: 16, label: '16' }]}
              size="small"
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Densidade</Typography>
            <ToggleButtonGroup
              value={themeConfig.density}
              exclusive
              size="small"
              fullWidth
              onChange={(_, val) => val && onUpdateTheme({ density: val as Density })}
            >
              <ToggleButton value="compact"><Typography variant="caption">Compacto</Typography></ToggleButton>
              <ToggleButton value="normal"><Typography variant="caption">Normal</Typography></ToggleButton>
              <ToggleButton value="comfortable"><Typography variant="caption">Confortável</Typography></ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Estilo do card</Typography>
            <ToggleButtonGroup
              value={themeConfig.cardVariant}
              exclusive
              size="small"
              fullWidth
              onChange={(_, val) => val && onUpdateTheme({ cardVariant: val as CardVariant })}
            >
              <ToggleButton value="elevated"><Typography variant="caption">Elevado</Typography></ToggleButton>
              <ToggleButton value="outlined"><Typography variant="caption">Borda</Typography></ToggleButton>
              <ToggleButton value="filled"><Typography variant="caption">Preenchido</Typography></ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Divider />

      {/* ── GRÁFICOS ─────────────────────────── */}
      <Accordion defaultExpanded disableGutters elevation={0} sx={{ '&::before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>Gráficos</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 2, pt: 0 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Paleta de cores</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {(Object.entries(COLOR_PALETTES) as [ChartColorPalette, string[]][]).map(([key, colors]) => (
                <Tooltip title={key} key={key}>
                  <Box
                    onClick={() => onUpdateChart({ colorPalette: key })}
                    sx={{
                      display: 'flex',
                      cursor: 'pointer',
                      borderRadius: 1,
                      overflow: 'hidden',
                      outline: chartConfig.colorPalette === key ? '2px solid' : '2px solid transparent',
                      outlineColor: 'primary.main',
                      transition: 'outline 0.15s',
                    }}
                  >
                    {colors.slice(0, 4).map((color) => (
                      <Box key={color} sx={{ width: 16, height: 24, bgcolor: color }} />
                    ))}
                  </Box>
                </Tooltip>
              ))}
            </Box>
          </Box>

          <FormControl size="small" fullWidth sx={{ mb: 2 }}>
            <InputLabel>Curva (line/area)</InputLabel>
            <Select
              label="Curva (line/area)"
              value={chartConfig.curveType}
              onChange={(e) => onUpdateChart({ curveType: e.target.value as CurveType })}
            >
              <MenuItem value="linear">Linear</MenuItem>
              <MenuItem value="natural">Natural (suave)</MenuItem>
              <MenuItem value="monotoneX">Monotone</MenuItem>
              <MenuItem value="step">Step</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Layout do BarChart</Typography>
            <ToggleButtonGroup
              value={chartConfig.barLayout}
              exclusive
              size="small"
              fullWidth
              onChange={(_, val) => val && onUpdateChart({ barLayout: val as BarLayout })}
            >
              <ToggleButton value="vertical"><Typography variant="caption">Vertical</Typography></ToggleButton>
              <ToggleButton value="horizontal"><Typography variant="caption">Horizontal</Typography></ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ mb: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={chartConfig.showGrid}
                  onChange={(e) => onUpdateChart({ showGrid: e.target.checked })}
                />
              }
              label={<Typography variant="body2">Mostrar grid</Typography>}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={chartConfig.showLegend}
                  onChange={(e) => onUpdateChart({ showLegend: e.target.checked })}
                />
              }
              label={<Typography variant="body2">Mostrar legenda</Typography>}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Tooltip — gatilho</Typography>
            <ToggleButtonGroup
              value={chartConfig.tooltipTrigger}
              exclusive
              size="small"
              fullWidth
              onChange={(_, val) => val && onUpdateChart({ tooltipTrigger: val as TooltipTrigger })}
            >
              <ToggleButton value="axis"><Typography variant="caption">Eixo</Typography></ToggleButton>
              <ToggleButton value="item"><Typography variant="caption">Item</Typography></ToggleButton>
              <ToggleButton value="none"><Typography variant="caption">Nenhum</Typography></ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Tooltip — estilo</Typography>
            <ToggleButtonGroup
              value={chartConfig.tooltipVariant}
              exclusive
              size="small"
              fullWidth
              onChange={(_, val) => val && onUpdateChart({ tooltipVariant: val as TooltipVariant })}
            >
              <ToggleButton value="default"><Typography variant="caption">Padrão</Typography></ToggleButton>
              <ToggleButton value="rich"><Typography variant="caption">Rico</Typography></ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ mb: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                PieChart inner radius
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {chartConfig.pieInnerRadius === 0 ? 'Pizza' : `Donut ${chartConfig.pieInnerRadius}px`}
              </Typography>
            </Box>
            <Slider
              min={0}
              max={80}
              step={5}
              value={chartConfig.pieInnerRadius}
              onChange={(_, val) => onUpdateChart({ pieInnerRadius: val as number })}
              marks={[{ value: 0, label: 'Pizza' }, { value: 40, label: '40' }, { value: 80, label: 'Donut' }]}
              size="small"
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      <Divider />

      {/* ── SCATTER ──────────────────────────── */}
      <Accordion defaultExpanded disableGutters elevation={0} sx={{ '&::before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>ScatterChart</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 2, pt: 0 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Escala do eixo Y</Typography>
            <ToggleButtonGroup
              value={chartConfig.scatterAxisScale}
              exclusive
              size="small"
              fullWidth
              onChange={(_, val) => val && onUpdateChart({ scatterAxisScale: val as ScatterAxisScale })}
            >
              <ToggleButton value="linear"><Typography variant="caption">Linear</Typography></ToggleButton>
              <ToggleButton value="log"><Typography variant="caption">Logarítmica</Typography></ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ mb: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" color="text.secondary">Tamanho do marcador</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{chartConfig.scatterMarkerSize}px</Typography>
            </Box>
            <Slider
              min={2}
              max={20}
              step={1}
              value={chartConfig.scatterMarkerSize}
              onChange={(_, val) => onUpdateChart({ scatterMarkerSize: val as number })}
              marks={[{ value: 2, label: '2' }, { value: 10, label: '10' }, { value: 20, label: '20' }]}
              size="small"
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Estilo visual</Typography>
            <ToggleButtonGroup
              value={chartConfig.scatterStyle}
              exclusive
              size="small"
              fullWidth
              onChange={(_, val) => val && onUpdateChart({ scatterStyle: val as ScatterStyle })}
            >
              <ToggleButton value="default"><Typography variant="caption">Padrão</Typography></ToggleButton>
              <ToggleButton value="outlined"><Typography variant="caption">Contorno</Typography></ToggleButton>
              <ToggleButton value="neon"><Typography variant="caption">Neon</Typography></ToggleButton>
              <ToggleButton value="minimal"><Typography variant="caption">Mínimo</Typography></ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Tamanho do texto</Typography>
            <ToggleButtonGroup
              value={chartConfig.scatterFontSize}
              exclusive
              size="small"
              fullWidth
              onChange={(_, val) => val && onUpdateChart({ scatterFontSize: val as ScatterFontSize })}
            >
              <ToggleButton value="small"><Typography variant="caption">Pequeno</Typography></ToggleButton>
              <ToggleButton value="medium"><Typography variant="caption">Médio</Typography></ToggleButton>
              <ToggleButton value="large"><Typography variant="caption">Grande</Typography></ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={chartConfig.scatterLoading}
                  onChange={(e) => onUpdateChart({ scatterLoading: e.target.checked })}
                />
              }
              label={<Typography variant="body2">Simular carregamento</Typography>}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  </Box>
)
