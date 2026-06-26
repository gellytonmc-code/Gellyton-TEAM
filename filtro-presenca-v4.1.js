/* ════════════════════════════════════════════════════════ */
/* FILTRO PRESENÇA v4.1 - COMPONENTE ISOLADO            */
/* ════════════════════════════════════════════════════════ */

// HTML para injetar na página
const FILTRO_PRESENCA_HTML = `
<div id="filtro-presenca-container" style="
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 2px solid #2563eb;
  border-radius: 12px;
  padding: 24px;
  margin: 20px 0;
  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.2);
">
  <h3 style="
    color: #f1f5f9;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 10px;
  ">
    <span style="font-size: 24px;">🎯</span> Filtro de Presença
  </h3>

  <div id="presenca-grid" style="
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 16px;
    margin-bottom: 20px;
  ">
    
    <!-- HORAS EXTRAS -->
    <div class="presenca-item" style="
      background: #334155;
      border-left: 4px solid #10b981;
      border-radius: 8px;
      padding: 16px;
      transition: all 0.3s;
    ">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
        <span style="font-size: 24px;">⏰</span>
        <label style="color: #cbd5e1; font-size: 12px; font-weight: 700; text-transform: uppercase; margin: 0;">HE</label>
      </div>
      <input 
        type="number" 
        id="inp-he" 
        placeholder="0" 
        min="0" 
        style="
          width: 100%;
          padding: 8px;
          background: #1e293b;
          border: 1px solid #475569;
          border-radius: 6px;
          color: #f1f5f9;
          font-weight: 600;
          font-size: 14px;
        "
      >
      <div id="val-he" style="
        font-size: 20px;
        font-weight: 700;
        color: #10b981;
        margin-top: 10px;
        text-align: center;
      ">0</div>
    </div>

    <!-- FALTAS -->
    <div class="presenca-item" style="
      background: #334155;
      border-left: 4px solid #ef4444;
      border-radius: 8px;
      padding: 16px;
      transition: all 0.3s;
    ">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
        <span style="font-size: 24px;">❌</span>
        <label style="color: #cbd5e1; font-size: 12px; font-weight: 700; text-transform: uppercase; margin: 0;">Faltas</label>
      </div>
      <input 
        type="number" 
        id="inp-faltas" 
        placeholder="0" 
        min="0" 
        style="
          width: 100%;
          padding: 8px;
          background: #1e293b;
          border: 1px solid #475569;
          border-radius: 6px;
          color: #f1f5f9;
          font-weight: 600;
          font-size: 14px;
        "
      >
      <div id="val-faltas" style="
        font-size: 20px;
        font-weight: 700;
        color: #ef4444;
        margin-top: 10px;
        text-align: center;
      ">0</div>
    </div>

    <!-- ATESTADOS -->
    <div class="presenca-item" style="
      background: #334155;
      border-left: 4px solid #f59e0b;
      border-radius: 8px;
      padding: 16px;
      transition: all 0.3s;
    ">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
        <span style="font-size: 24px;">🩺</span>
        <label style="color: #cbd5e1; font-size: 12px; font-weight: 700; text-transform: uppercase; margin: 0;">Atestados</label>
      </div>
      <input 
        type="number" 
        id="inp-atestados" 
        placeholder="0" 
        min="0" 
        style="
          width: 100%;
          padding: 8px;
          background: #1e293b;
          border: 1px solid #475569;
          border-radius: 6px;
          color: #f1f5f9;
          font-weight: 600;
          font-size: 14px;
        "
      >
      <div id="val-atestados" style="
        font-size: 20px;
        font-weight: 700;
        color: #f59e0b;
        margin-top: 10px;
        text-align: center;
      ">0</div>
    </div>

    <!-- AUSÊNCIAS -->
    <div class="presenca-item" style="
      background: #334155;
      border-left: 4px solid #f97316;
      border-radius: 8px;
      padding: 16px;
      transition: all 0.3s;
    ">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
        <span style="font-size: 24px;">⚠️</span>
        <label style="color: #cbd5e1; font-size: 12px; font-weight: 700; text-transform: uppercase; margin: 0;">Ausências</label>
      </div>
      <input 
        type="number" 
        id="inp-ausencias" 
        placeholder="0" 
        min="0" 
        style="
          width: 100%;
          padding: 8px;
          background: #1e293b;
          border: 1px solid #475569;
          border-radius: 6px;
          color: #f1f5f9;
          font-weight: 600;
          font-size: 14px;
        "
      >
      <div id="val-ausencias" style="
        font-size: 20px;
        font-weight: 700;
        color: #f97316;
        margin-top: 10px;
        text-align: center;
      ">0</div>
    </div>

    <!-- REPOSIÇÃO -->
    <div class="presenca-item" style="
      background: #334155;
      border-left: 4px solid #8b5cf6;
      border-radius: 8px;
      padding: 16px;
      transition: all 0.3s;
    ">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
        <span style="font-size: 24px;">🔄</span>
        <label style="color: #cbd5e1; font-size: 12px; font-weight: 700; text-transform: uppercase; margin: 0;">Reposição</label>
      </div>
      <input 
        type="number" 
        id="inp-reposicao" 
        placeholder="0" 
        min="0" 
        style="
          width: 100%;
          padding: 8px;
          background: #1e293b;
          border: 1px solid #475569;
          border-radius: 6px;
          color: #f1f5f9;
          font-weight: 600;
          font-size: 14px;
        "
      >
      <div id="val-reposicao" style="
        font-size: 20px;
        font-weight: 700;
        color: #8b5cf6;
        margin-top: 10px;
        text-align: center;
      ">0</div>
    </div>

    <!-- DESLIGADO -->
    <div class="presenca-item" style="
      background: #334155;
      border-left: 4px solid #64748b;
      border-radius: 8px;
      padding: 16px;
      transition: all 0.3s;
    ">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
        <span style="font-size: 24px;">⛔</span>
        <label style="color: #cbd5e1; font-size: 12px; font-weight: 700; text-transform: uppercase; margin: 0;">Desligado</label>
      </div>
      <input 
        type="number" 
        id="inp-desligado" 
        placeholder="0" 
        min="0" 
        style="
          width: 100%;
          padding: 8px;
          background: #1e293b;
          border: 1px solid #475569;
          border-radius: 6px;
          color: #f1f5f9;
          font-weight: 600;
          font-size: 14px;
        "
      >
      <div id="val-desligado" style="
        font-size: 20px;
        font-weight: 700;
        color: #64748b;
        margin-top: 10px;
        text-align: center;
      ">0</div>
    </div>

  </div>

  <!-- BOTÕES -->
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <button 
      onclick="atualizarFiltroPresenca()" 
      style="
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        color: white;
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        flex: 1;
        min-width: 120px;
        transition: all 0.3s;
      "
      onmouseover="this.style.boxShadow='0 4px 12px rgba(37, 99, 235, 0.4)'"
      onmouseout="this.style.boxShadow='none'"
    >
      ✅ Aplicar Filtro
    </button>
    <button 
      onclick="limparFiltroPresenca()" 
      style="
        background: #334155;
        color: #cbd5e1;
        padding: 12px 24px;
        border: 1px solid #475569;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        flex: 1;
        min-width: 120px;
        transition: all 0.3s;
      "
      onmouseover="this.style.borderColor='#2563eb'; this.style.color='#f1f5f9'"
      onmouseout="this.style.borderColor='#475569'; this.style.color='#cbd5e1'"
    >
      🔄 Limpar
    </button>
  </div>
</div>
`;

// Funções do filtro
function atualizarFiltroPresenca() {
  const he = document.getElementById('inp-he').value || 0;
  const faltas = document.getElementById('inp-faltas').value || 0;
  const atestados = document.getElementById('inp-atestados').value || 0;
  const ausencias = document.getElementById('inp-ausencias').value || 0;
  const reposicao = document.getElementById('inp-reposicao').value || 0;
  const desligado = document.getElementById('inp-desligado').value || 0;

  // Atualizar display
  document.getElementById('val-he').textContent = he;
  document.getElementById('val-faltas').textContent = faltas;
  document.getElementById('val-atestados').textContent = atestados;
  document.getElementById('val-ausencias').textContent = ausencias;
  document.getElementById('val-reposicao').textContent = reposicao;
  document.getElementById('val-desligado').textContent = desligado;

  // Salvar
  const filtro = {
    he: parseFloat(he),
    faltas: parseFloat(faltas),
    atestados: parseFloat(atestados),
    ausencias: parseFloat(ausencias),
    reposicao: parseFloat(reposicao),
    desligado: parseFloat(desligado),
    timestamp: new Date().toISOString()
  };

  localStorage.setItem('filtro_presenca_v4_1', JSON.stringify(filtro));
  console.log('[Filtro Presença] ✅ Filtro aplicado:', filtro);
}

function limparFiltroPresenca() {
  document.getElementById('inp-he').value = '';
  document.getElementById('inp-faltas').value = '';
  document.getElementById('inp-atestados').value = '';
  document.getElementById('inp-ausencias').value = '';
  document.getElementById('inp-reposicao').value = '';
  document.getElementById('inp-desligado').value = '';

  document.getElementById('val-he').textContent = '0';
  document.getElementById('val-faltas').textContent = '0';
  document.getElementById('val-atestados').textContent = '0';
  document.getElementById('val-ausencias').textContent = '0';
  document.getElementById('val-reposicao').textContent = '0';
  document.getElementById('val-desligado').textContent = '0';

  localStorage.removeItem('filtro_presenca_v4_1');
  console.log('[Filtro Presença] 🔄 Filtro limpo');
}

// Carregar valores salvos
function carregarFiltroPresenca() {
  const filtro = JSON.parse(localStorage.getItem('filtro_presenca_v4_1') || '{}');
  if (filtro.he) document.getElementById('inp-he').value = filtro.he;
  if (filtro.faltas) document.getElementById('inp-faltas').value = filtro.faltas;
  if (filtro.atestados) document.getElementById('inp-atestados').value = filtro.atestados;
  if (filtro.ausencias) document.getElementById('inp-ausencias').value = filtro.ausencias;
  if (filtro.reposicao) document.getElementById('inp-reposicao').value = filtro.reposicao;
  if (filtro.desligado) document.getElementById('inp-desligado').value = filtro.desligado;
  atualizarFiltroPresenca();
}

// Auto-load
window.addEventListener('load', function() {
  setTimeout(carregarFiltroPresenca, 1000);
  console.log('[Filtro Presença] ✅ Carregado');
});
