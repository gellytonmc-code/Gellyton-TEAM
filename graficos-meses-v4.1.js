/* ════════════════════════════════════════════════════════ */
/* GRÁFICOS COMPARATIVOS POR MÊS v4.1                  */
/* ════════════════════════════════════════════════════════ */

function criarGraficoMesesComparativo(selectorCanvas, dadosColaboradores) {
  try {
    const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    const hoje = new Date();
    
    // Inicializar dados por mês
    const dadosPorMes = {};
    meses.forEach(mes => {
      dadosPorMes[mes] = {
        presencas: 0,
        he: 0,
        faltas: 0,
        atestados: 0,
        ausencias: 0,
        reposicao: 0
      };
    });

    // Processar dados dos colaboradores
    if (Array.isArray(dadosColaboradores) && dadosColaboradores.length > 0) {
      dadosColaboradores.forEach(colaborador => {
        if (colaborador.diasPorMes && typeof colaborador.diasPorMes === 'object') {
          meses.forEach((mes, idx) => {
            const mêsDados = colaborador.diasPorMes[idx];
            if (mêsDados) {
              dadosPorMes[mes].presencas += (mêsDados.presencas || mêsDados.PRESENCAS || 0);
              dadosPorMes[mes].he += (mêsDados.he || mêsDados.HE || mêsDados.horasExtras || 0);
              dadosPorMes[mes].faltas += (mêsDados.faltas || mêsDados.FALTAS || 0);
              dadosPorMes[mes].atestados += (mêsDados.atestados || mêsDados.ATESTADOS || 0);
              dadosPorMes[mes].ausencias += (mêsDados.ausencias || mêsDados.AUSENCIAS || 0);
              dadosPorMes[mes].reposicao += (mêsDados.reposicao || mêsDados.REPOSICAO || 0);
            }
          });
        }
      });
    }

    // Encontrar canvas
    const canvas = document.querySelector(selectorCanvas);
    if (!canvas) {
      console.warn('[Gráfico Meses] Canvas não encontrado:', selectorCanvas);
      return null;
    }

    const ctx = canvas.getContext('2d');

    // Destruir gráfico anterior se existir
    if (window._graficoMesesInstance) {
      window._graficoMesesInstance.destroy();
    }

    // Criar gráfico
    window._graficoMesesInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: meses,
        datasets: [
          {
            label: '👥 Presencas',
            data: meses.map(m => dadosPorMes[m].presencas),
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: '#10b981',
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: '⏰ Horas Extras',
            data: meses.map(m => dadosPorMes[m].he),
            backgroundColor: 'rgba(34, 197, 94, 0.8)',
            borderColor: '#22c55e',
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: '❌ Faltas',
            data: meses.map(m => dadosPorMes[m].faltas),
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
            borderColor: '#ef4444',
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: '🩺 Atestados',
            data: meses.map(m => dadosPorMes[m].atestados),
            backgroundColor: 'rgba(245, 158, 11, 0.8)',
            borderColor: '#f59e0b',
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: '⚠️ Ausências',
            data: meses.map(m => dadosPorMes[m].ausencias),
            backgroundColor: 'rgba(249, 115, 22, 0.8)',
            borderColor: '#f97316',
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: '🔄 Reposição',
            data: meses.map(m => dadosPorMes[m].reposicao),
            backgroundColor: 'rgba(139, 92, 246, 0.8)',
            borderColor: '#8b5cf6',
            borderWidth: 1,
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#f1f5f9',
              font: {
                size: 12,
                weight: 'bold'
              },
              padding: 15,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          title: {
            display: true,
            text: `📊 COMPARATIVO DE PRESENÇA - ${hoje.getFullYear()}`,
            color: '#f1f5f9',
            font: {
              size: 16,
              weight: 'bold'
            },
            padding: 20
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            titleColor: '#f1f5f9',
            bodyColor: '#cbd5e1',
            borderColor: '#475569',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            titleFont: { weight: 'bold' },
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += Math.round(context.parsed.y);
                return label;
              }
            }
          }
        },
        scales: {
          x: {
            stacked: false,
            grid: {
              color: '#475569',
              drawBorder: false
            },
            ticks: {
              color: '#cbd5e1',
              font: {
                weight: 'bold',
                size: 12
              }
            }
          },
          y: {
            stacked: false,
            beginAtZero: true,
            grid: {
              color: '#334155',
              drawBorder: false
            },
            ticks: {
              color: '#cbd5e1',
              font: {
                size: 11
              }
            }
          }
        }
      }
    });

    console.log('[Gráfico Meses] ✅ Gráfico comparativo criado com sucesso!');
    console.log('[Gráfico Meses] Dados resumo:', {
      totalPresencas: meses.reduce((a, m) => a + dadosPorMes[m].presencas, 0),
      totalHE: meses.reduce((a, m) => a + dadosPorMes[m].he, 0),
      totalFaltas: meses.reduce((a, m) => a + dadosPorMes[m].faltas, 0),
      totalAtestados: meses.reduce((a, m) => a + dadosPorMes[m].atestados, 0),
      totalAusencias: meses.reduce((a, m) => a + dadosPorMes[m].ausencias, 0),
      totalReposicao: meses.reduce((a, m) => a + dadosPorMes[m].reposicao, 0)
    });

    return window._graficoMesesInstance;

  } catch(e) {
    console.error('[Gráfico Meses] ❌ Erro ao criar gráfico:', e);
    return null;
  }
}

// Helper: Encontrar elemento por ID e criar gráfico
function inicializarGraficoMeses(elementId, dados) {
  const elemento = document.getElementById(elementId);
  if (elemento) {
    const canvas = elemento.querySelector('canvas') || document.createElement('canvas');
    if (!elemento.contains(canvas)) {
      elemento.innerHTML = '';
      elemento.appendChild(canvas);
    }
    canvas.id = 'grafico-meses-' + Math.random().toString(36).substr(2, 9);
    return criarGraficoMesesComparativo('#' + canvas.id, dados);
  } else {
    console.warn('[Gráfico Meses] Elemento não encontrado:', elementId);
    return null;
  }
}

// Exportar dados para CSV
function exportarGraficoMesesCSV() {
  const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  const dadosPorMes = {};
  
  meses.forEach(mes => {
    dadosPorMes[mes] = {
      presencas: 0,
      he: 0,
      faltas: 0,
      atestados: 0,
      ausencias: 0,
      reposicao: 0
    };
  });

  let csv = 'MÊS,PRESENÇAS,HE,FALTAS,ATESTADOS,AUSÊNCIAS,REPOSIÇÃO\n';
  meses.forEach(mes => {
    csv += `${mes},${dadosPorMes[mes].presencas},${dadosPorMes[mes].he},${dadosPorMes[mes].faltas},${dadosPorMes[mes].atestados},${dadosPorMes[mes].ausencias},${dadosPorMes[mes].reposicao}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'comparativo-presenca-' + new Date().getFullYear() + '.csv';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);

  console.log('[Gráfico Meses] 📥 CSV exportado');
}

console.log('[Gráfico Meses] ✅ Sistema carregado e pronto para uso');
