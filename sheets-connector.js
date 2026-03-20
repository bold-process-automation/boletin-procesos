/**
 * 📊 Google Sheets Connector para Boletín de Procesos Bold
 */

const SHEET_CONFIG = {
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbycwNyylhSYA9k9IPaUQNIHRSELfI9FrfSfP-FJSwf0IlWFse8ZBmenSLLSPup_ZDDt/exec',
  SHEET_NAMES: { AUTOMATIZACIONES: 'Automatizaciones', PROCESOS: 'Procesos' }
};

let authTokenGlobal = '';

async function fetchAllData() {
  try {
    // 🌟 CAMBIO CLAVE: Si index.html pide datos muy temprano, no lanzamos error, simulamos vacío.
    if (!authTokenGlobal) {
      console.log("⏳ Esperando inicio de sesión para conectar con Google Sheets...");
      return { cambios: [], automatizaciones: [], valor_agregado: [] };
    }

    const urlSegura = `${SHEET_CONFIG.SCRIPT_URL}?token=${authTokenGlobal}`;
    console.log('🔄 Intentando conectar con backend seguro...');
    const response = await fetch(urlSegura);
    
    if (!response.ok) throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
    
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    
    return data;
  } catch (error) {
    console.error('❌ Error obteniendo datos:', error.message);
    throw error;
  }
}

async function initializeData(token) {
  try {
    if (token) authTokenGlobal = token;

    const allData = await fetchAllData();
    
    // Procesar automatizaciones
    const automatizaciones = (allData.automatizaciones || []).map(row => {
      let vaInicial = parseFloat(row.vaInicial) || 0;
      let vaFinal = parseFloat(row.vaFinal) || 0;
      let incrementoVA = parseFloat(row.incrementoVA) || 0;
      if (vaInicial > 0 && vaInicial <= 1) vaInicial *= 100;
      if (vaFinal > 0 && vaFinal <= 1) vaFinal *= 100;
      if (incrementoVA > 0 && incrementoVA <= 1) incrementoVA *= 100;
      return {
        aplicativo: row.aplicativo || '', aplicacion: row.aplicacion || '', proceso: row.proceso || '',
        detalle: row.detalle || '', compania: row.compania || '', vaInicial: vaInicial, vaFinal: vaFinal,
        incrementoVA: incrementoVA, fecha: row.fecha || '', mesAsignado: row.mesAsignado || ''
      };
    });
    
    // Procesar procesos (cambios)
    const procesos = (allData.cambios || []).map(row => {
      let valorAgregado = row.valor_agregado || '';
      if (typeof valorAgregado === 'number' && valorAgregado >= 0 && valorAgregado <= 1) valorAgregado = (valorAgregado * 100).toFixed(2) + '%';
      else if (typeof valorAgregado === 'string' && !valorAgregado.includes('%')) {
        const num = parseFloat(valorAgregado);
        if (!isNaN(num) && num >= 0 && num <= 1) valorAgregado = (num * 100).toFixed(2) + '%';
      }
      return {
        codigo: row.codigo || '', documento: row.documento || '', dueno: row.dueno || '', detalle: row.detalle || '',
        compania: row.compania || '', tipo: row.tipo || '', fecha: row.fecha || '', valor_agregado: valorAgregado, url_proceso: row.url_proceso || ''
      };
    });
    
    // Procesar valor agregado
    const valorAgregado = {};
    (allData.valor_agregado || []).forEach(row => {
      if (row.mesAsignado && (row.sas || row.cf)) {
        let monthKey = row.mesAsignado;
        if (typeof monthKey === 'string' && (monthKey.includes('T') || monthKey.length > 10)) {
          const date = new Date(monthKey);
          monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        } else if (typeof monthKey === 'string' && monthKey.match(/^\d{4}-\d{2}$/)) {
          monthKey = monthKey;
        }
        valorAgregado[monthKey] = { sas: row.sas || '', cf: row.cf || '' };
      }
    });
    
    return { automatizaciones, procesos, valorAgregado, success: true };
  } catch (error) {
    return { automatizaciones: [], procesos: [], valorAgregado: {}, success: false, error: error.message };
  }
}

window.SheetsConnector = {
  initializeData,
  setToken: (token) => { authTokenGlobal = token; }, // 🌟 Nueva función para guardar el token
  setSheetId: (newId) => { SHEET_CONFIG.SHEET_ID = newId; }
};
