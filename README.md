# Charts Playground — MUI X Charts POC

Dashboard interativo construído com React + Vite + TypeScript + Material UI + MUI X Charts, criado para o time de design avaliar a flexibilidade visual da biblioteca.

## Stack

| Tecnologia | Versão |
|---|---|
| React | 19 |
| Vite | 6 |
| TypeScript | 5 |
| Material UI | 9 |
| MUI X Charts | 9 |

## Como executar

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173`

## Como buildar

```bash
npm run build
npm run preview
```

## Estrutura do projeto

```
src/
  components/
    cards/          # MetricCard (3 variantes: elevado, borda, preenchido)
    charts/         # LineChartWidget, BarChartWidget, AreaChartWidget, PieChartWidget
    controls/       # ControlsPanel — painel de personalização
    layout/         # AppHeader
  data/             # Dados mockados (metrics, chartData)
  hooks/            # useThemeToggle, useChartConfig
  pages/            # Dashboard
  theme/            # createAppTheme, paletas de cores
  types/            # Tipos TypeScript compartilhados
```

## Controles interativos

Clique no botão flutuante (canto inferior direito) ou no ícone de ajuste no header para abrir o painel de personalização.

### Tema
- Alternar entre modo **claro** e **escuro**
- 8 opções de **cor primária**

### Layout
- **Border radius** — slider de 0 a 24px
- **Espaçamento** — slider de 4 a 16px
- **Densidade** — compacto / normal / confortável
- **Estilo do card** — elevado / borda / preenchido

### Gráficos
- 5 **paletas de cores** — default, vibrant, pastel, monochrome, warm
- **Tipo de curva** para LineChart e AreaChart — linear, natural, monotone, step
- **Layout do BarChart** — vertical / horizontal
- Toggle **grid** e **legenda**
- **Inner radius** do PieChart — converte pizza em donut

## Gráficos incluídos

| Componente | Tipo | Dados |
|---|---|---|
| `LineChartWidget` | Linha | Receita vs Despesas (mensal) |
| `BarChartWidget` | Barras | Vendas por trimestre (2024 vs 2025) |
| `AreaChartWidget` | Área | Visitantes e cadastros (mensal) |
| `PieChartWidget` | Pizza/Donut | Fontes de tráfego |
