/**
 * 📊 Google Sheets Connector para Boletín de Procesos Bold
 * 
 * Este módulo conecta el frontend con Google Sheets para obtener
 * datos en tiempo real de Automatizaciones y Procesos.
 */

// ========== CONFIGURACIÓN ==========
const SHEET_CONFIG = {
  // 🔑 URL del Google Apps Script (backend seguro con autenticación de dominio)
  SCRIPT_URL: 'https://script.google.com/a/macros/bold.co/s/AKfycbzNgxEbSMw1b__nnUGT-smxmNWTrZ6KcjQmF__wC3QblNjfrJHK5yogYJ767jWcIhsT/exec',
  
  // Nombres de las hojas (pestañas) en tu Google Sheet
  SHEET_NAMES: {
    AUTOMATIZACIONES: 'Automatizaciones',
    PROCESOS: 'Procesos'
  }
};

// ========== FUNCIONES PRINCIPALES ==========

/**
 * Obtiene todos los datos del backend seguro (una sola llamada)
 * @returns {Promise<Object>} Objeto con cambios y automatizaciones
 */
async function fetchAllData() {
  try {
    console.log('🔄 Intentando conectar con:', SHEET_CONFIG.SCRIPT_URL);
    
    const response = await fetch(SHEET_CONFIG.SCRIPT_URL);
    
    console.log('📡 Respuesta recibida - Status:', response.status, response.statusText);
    
    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('📦 Datos recibidos:', data);
    
    if (data.error) {
      console.error('⚠️ Backend devolvió error:', data.error);
      throw new Error(data.error);
    }
    
    console.log(`✅ Cambios: ${data.cambios?.length || 0} registros`);
    console.log(`✅ Automatizaciones: ${data.automatizaciones?.length || 0} registros`);
    
    return data;
    
  } catch (error) {
    console.error('❌ Error obteniendo datos:', error.message);
    console.error('Stack completo:', error);
    throw error;
  }
}

/**
 * Convierte texto CSV a array de objetos
 * @param {string} csvText - Texto CSV
 * @returns {Array} Array de objetos
 */
function parseCSV(csvText) {
  const lines = csvText.split('\n').filter(line => line.trim());
  
  if (lines.length === 0) return [];
  
  // Primera línea son los headers (nombres de columnas)
  const headers = parseCSVLine(lines[0]);
  
  // Resto de líneas son los datos
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    
    // Crear objeto con los headers como keys
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    
    data.push(row);
  }
  
  return data;
}

/**
 * Parsea una línea CSV (maneja comillas y comas dentro de campos)
 * @param {string} line - Línea CSV
 * @returns {Array} Array de valores
 */
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  
  return result;
}

/**
 * Obtiene todas las automatizaciones
 * @returns {Promise<Array>} Array de automatizaciones
 */
async function getAutomatizaciones() {
  try {
    const allData = await fetchAllData();
    const data = allData.automatizaciones || [];
    
    // Transformar datos al formato esperado por el frontend
    return data.map(row => {
      // Convertir valores decimales de VA (si vienen como 0.67 = 67%)
      let vaInicial = parseFloat(row.vaInicial) || 0;
      let vaFinal = parseFloat(row.vaFinal) || 0;
      let incrementoVA = parseFloat(row.incrementoVA) || 0;
      
      // Si los valores están en formato decimal (0-1), convertir a porcentaje
      if (vaInicial > 0 && vaInicial <= 1) vaInicial *= 100;
      if (vaFinal > 0 && vaFinal <= 1) vaFinal *= 100;
      if (incrementoVA > 0 && incrementoVA <= 1) incrementoVA *= 100;
      
      return {
        aplicativo: row.aplicativo || '',
        aplicacion: row.aplicacion || '',
        proceso: row.proceso || '',
        detalle: row.detalle || '',
        compania: row.compania || '',
        vaInicial: vaInicial,
        vaFinal: vaFinal,
        incrementoVA: incrementoVA,
        fecha: row.fecha || '',
        mesAsignado: row.mesAsignado || ''
      };
    });
    
  } catch (error) {
    console.error('❌ Error obteniendo automatizaciones:', error);
    // Retornar array vacío en caso de error
    return [];
  }
}

/**
 * Obtiene todos los procesos (cambios)
 * @returns {Promise<Array>} Array de procesos
 */
async function getProcesos() {
  try {
    const allData = await fetchAllData();
    const data = allData.cambios || [];
    
    // Transformar datos al formato esperado por el frontend
    return data.map(row => {
      // Convertir valor_agregado: si es decimal (0-1), multiplicar por 100 y agregar %
      let valorAgregado = row.valor_agregado || '';
      if (typeof valorAgregado === 'number' && valorAgregado >= 0 && valorAgregado <= 1) {
        valorAgregado = (valorAgregado * 100).toFixed(2) + '%';
      } else if (typeof valorAgregado === 'string' && !valorAgregado.includes('%')) {
        // Si es string sin %, intentar parsearlo
        const num = parseFloat(valorAgregado);
        if (!isNaN(num) && num >= 0 && num <= 1) {
          valorAgregado = (num * 100).toFixed(2) + '%';
        }
      }
      
      return {
        codigo: row.codigo || '',
        documento: row.documento || '',
        dueno: row.dueno || '',
        detalle: row.detalle || '',
        compania: row.compania || '',
        tipo: row.tipo || '',
        fecha: row.fecha || '',
        valor_agregado: valorAgregado,
        url_proceso: row.url_proceso || '' // Soporte para hipervínculos
      };
    });
    
  } catch (error) {
    console.error('❌ Error obteniendo procesos:', error);
    // Retornar array vacío en caso de error
    return [];
  }
}

/**
 * Obtiene las imágenes de valor agregado
 * @returns {Promise<Array>} Array de imágenes de valor agregado
 */
async function getValorAgregado() {
  try {
    const allData = await fetchAllData();
    const data = allData.valor_agregado || [];
    
    // Transformar datos al formato esperado por el frontend
    // Formato: { '2025-08': { sas: 'url', cf: 'url' } }
    const imagesByMonth = {};
    
    data.forEach(row => {
      if (row.mesAsignado && (row.sas || row.cf)) {
        // Convertir fecha a formato YYYY-MM
        let monthKey = row.mesAsignado;
        
        // Si es una fecha completa (timestamp), extraer solo año-mes
        if (typeof monthKey === 'string' && (monthKey.includes('T') || monthKey.length > 10)) {
          const date = new Date(monthKey);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          monthKey = `${year}-${month}`;
        }
        // Si es solo año-mes (2025-08), usarlo directamente
        else if (typeof monthKey === 'string' && monthKey.match(/^\d{4}-\d{2}$/)) {
          monthKey = monthKey;
        }
        
        imagesByMonth[monthKey] = {
          sas: row.sas || '',
          cf: row.cf || ''
        };
      }
    });
    
    return imagesByMonth;
    
  } catch (error) {
    console.error('❌ Error obteniendo valor agregado:', error);
    // Retornar objeto vacío en caso de error
    return {};
  }
}

/**
 * Inicializa y carga todos los datos desde Google Sheets
 * @returns {Promise<Object>} Objeto con automatizaciones, procesos y valor agregado
 */
async function initializeData() {
  try {
    // Cargar todas las hojas en paralelo
    const [automatizaciones, procesos, valorAgregado] = await Promise.all([
      getAutomatizaciones(),
      getProcesos(),
      getValorAgregado()
    ]);
    
    return {
      automatizaciones,
      procesos,
      valorAgregado,
      success: true
    };
    
  } catch (error) {
    console.error('❌ Error inicializando datos:', error);
    
    return {
      automatizaciones: [],
      procesos: [],
      valorAgregado: {},
      success: false,
      error: error.message
    };
  }
}

// ========== EXPORTAR FUNCIONES ==========
// (Para usar en el HTML)
window.SheetsConnector = {
  initializeData,
  getAutomatizaciones,
  getProcesos,
  getValorAgregado,
  setSheetId: (newId) => {
    SHEET_CONFIG.SHEET_ID = newId;
    console.log('✅ Sheet ID actualizado:', newId);
  }
};
