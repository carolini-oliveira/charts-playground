const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

export const lineChartData = {
  xAxis: MONTHS,
  series: [
    { label: 'Receita', data: [65, 78, 90, 81, 95, 110, 102, 120, 115, 130, 142, 158] },
    { label: 'Despesas', data: [45, 52, 60, 58, 65, 70, 68, 75, 72, 80, 85, 90] },
  ],
}

export const barChartData = {
  xAxis: ['Q1', 'Q2', 'Q3', 'Q4'],
  series: [
    { label: '2024', data: [234, 312, 287, 356] },
    { label: '2025', data: [289, 378, 341, 412] },
  ],
}

export const areaChartData = {
  xAxis: MONTHS,
  series: [
    { label: 'Visitantes', data: [1200, 1450, 1320, 1680, 1900, 2100, 1950, 2300, 2150, 2450, 2700, 3000] },
    { label: 'Cadastros', data: [320, 410, 380, 520, 610, 680, 590, 720, 680, 790, 850, 950] },
  ],
}

export const pieChartData = [
  { id: 0, label: 'Orgânico', value: 35 },
  { id: 1, label: 'Pago', value: 28 },
  { id: 2, label: 'Social', value: 18 },
  { id: 3, label: 'E-mail', value: 12 },
  { id: 4, label: 'Direto', value: 7 },
]

// Cycle Time: série temporal com x = timestamp (ms) e y = horas
const D0 = 1747872000000 // 22/05/2025 UTC
const DAY = 86400000
const H = 3600000

export const cycleTimeData = [
  // 22/05
  { id: 'c1',  x: D0 + 4*H,         y: 2   },
  { id: 'c2',  x: D0 + 10*H,        y: 14  },
  { id: 'c3',  x: D0 + 14*H,        y: 5   },
  { id: 'c4',  x: D0 + 18*H,        y: 52  },
  { id: 'c5',  x: D0 + 20*H,        y: 22  },
  // 23/05
  { id: 'c6',  x: D0+DAY + 5*H,     y: 1.5 },
  { id: 'c7',  x: D0+DAY + 9*H,     y: 18  },
  { id: 'c8',  x: D0+DAY + 12*H,    y: 4   },
  { id: 'c9',  x: D0+DAY + 15*H,    y: 25  },
  { id: 'c10', x: D0+DAY + 17*H,    y: 65  },
  { id: 'c11', x: D0+DAY + 20*H,    y: 7   },
  // 24/05
  { id: 'c12', x: D0+2*DAY + 6*H,   y: 3   },
  { id: 'c13', x: D0+2*DAY + 10*H,  y: 20  },
  { id: 'c14', x: D0+2*DAY + 12*H,  y: 13  },
  { id: 'c15', x: D0+2*DAY + 16*H,  y: 28  },
  { id: 'c16', x: D0+2*DAY + 18*H,  y: 6   },
  { id: 'c17', x: D0+2*DAY + 20*H,  y: 48  },
  // 25/05
  { id: 'c18', x: D0+3*DAY + 8*H,   y: 2.5 },
  { id: 'c19', x: D0+3*DAY + 14*H,  y: 19  },
  // 26/05
  { id: 'c20', x: D0+4*DAY + 5*H,   y: 4.5 },
  { id: 'c21', x: D0+4*DAY + 8*H,   y: 24  },
  { id: 'c22', x: D0+4*DAY + 11*H,  y: 8   },
  { id: 'c23', x: D0+4*DAY + 14*H,  y: 72  },
  { id: 'c24', x: D0+4*DAY + 17*H,  y: 17  },
  { id: 'c25', x: D0+4*DAY + 20*H,  y: 30  },
  // 27/05
  { id: 'c26', x: D0+5*DAY + 4*H,   y: 1   },
  { id: 'c27', x: D0+5*DAY + 8*H,   y: 21  },
  { id: 'c28', x: D0+5*DAY + 11*H,  y: 40  },
  { id: 'c29', x: D0+5*DAY + 15*H,  y: 9   },
  { id: 'c30', x: D0+5*DAY + 17*H,  y: 26  },
  { id: 'c31', x: D0+5*DAY + 20*H,  y: 15  },
  // 28/05
  { id: 'c32', x: D0+6*DAY + 6*H,   y: 29  },
  { id: 'c33', x: D0+6*DAY + 9*H,   y: 58  },
  { id: 'c34', x: D0+6*DAY + 13*H,  y: 45  },
  { id: 'c35', x: D0+6*DAY + 17*H,  y: 16  },
]

// Scatter: CAC (R$) vs LTV (R$) por segmento de cliente
// Spans multiple orders of magnitude — ideal for comparing linear vs log scale
export const scatterChartData = [
  {
    label: 'Enterprise',
    data: [
      { id: 'e1', x: 1100, y: 6800 },
      { id: 'e2', x: 1350, y: 8200 },
      { id: 'e3', x: 980, y: 5900 },
      { id: 'e4', x: 1480, y: 9100 },
      { id: 'e5', x: 1220, y: 7400 },
      { id: 'e6', x: 1050, y: 6200 },
      { id: 'e7', x: 1380, y: 8700 },
      { id: 'e8', x: 900, y: 5400 },
      { id: 'e9', x: 1560, y: 9600 },
      { id: 'e10', x: 1190, y: 7100 },
    ],
  },
  {
    label: 'Mid-Market',
    data: [
      { id: 'm1', x: 280, y: 1100 },
      { id: 'm2', x: 340, y: 1450 },
      { id: 'm3', x: 210, y: 820 },
      { id: 'm4', x: 390, y: 1700 },
      { id: 'm5', x: 260, y: 980 },
      { id: 'm6', x: 310, y: 1250 },
      { id: 'm7', x: 370, y: 1580 },
      { id: 'm8', x: 230, y: 890 },
      { id: 'm9', x: 420, y: 1850 },
      { id: 'm10', x: 290, y: 1150 },
    ],
  },
  {
    label: 'SMB',
    data: [
      { id: 's1', x: 75, y: 240 },
      { id: 's2', x: 95, y: 310 },
      { id: 's3', x: 58, y: 180 },
      { id: 's4', x: 110, y: 370 },
      { id: 's5', x: 82, y: 265 },
      { id: 's6', x: 68, y: 210 },
      { id: 's7', x: 100, y: 340 },
      { id: 's8', x: 55, y: 165 },
      { id: 's9', x: 120, y: 410 },
      { id: 's10', x: 88, y: 285 },
    ],
  },
  {
    label: 'Starter',
    data: [
      { id: 't1', x: 12, y: 35 },
      { id: 't2', x: 18, y: 52 },
      { id: 't3', x: 9, y: 24 },
      { id: 't4', x: 22, y: 68 },
      { id: 't5', x: 15, y: 44 },
      { id: 't6', x: 11, y: 31 },
      { id: 't7', x: 20, y: 60 },
      { id: 't8', x: 8, y: 21 },
      { id: 't9', x: 25, y: 78 },
      { id: 't10', x: 16, y: 48 },
    ],
  },
]
