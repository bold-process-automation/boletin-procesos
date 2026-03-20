/**
 * 📊 Google Sheets Connector para Boletín de Procesos Bold
 * * Este módulo conecta el frontend con Google Sheets para obtener
 * datos en tiempo real de Automatizaciones y Procesos.
 */

// ========== CONFIGURACIÓN ==========
const SHEET_CONFIG = {
  // 🔑 URL del Google Apps Script (backend seguro con autenticación de dominio)
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzNgxEbSMw1b__nnUGT-smxmNWTrZ6KcjQmF__wC3QblNjfrJHK5yogYJ767jWcIhsT/exec',
  
  // Nombres de las hojas (pestañas) en tu Google Sheet
  SHEET_NAMES: {
    AUTOMATIZACIONES: 'Automatizaciones',
    PROCESOS: 'Procesos'
  }
};

// Variable para guardar el "pase VIP" de Google
let authTokenGlobal = ''; 

// ========== FUNCIONES PRINCIPALES ==========

/**
 * Obtiene todos los datos del backend seguro (una sola llamada)
 * @returns {Promise<Object>} Objeto con cambios y automatizaciones
 */
async function fetchAllData() {
  try {
    if (!authTokenGlobal) {
      throw new Error("Acceso denegado: No hay token de autenticación. Inicia sesión primero.");
    }

    // Le pegamos el token al final de la URL como una llave
    const urlSegura = `${SHEET_CONFIG.SCRIPT_URL}?token=${authTokenGlobal}`;
    console.log('🔄 Intentando conectar con backend seguro...');
    
    const response = await fetch(urlSegura);
    
    console.log('📡 Respuesta recibida - Status:', response.status, response.statusText);
    
    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('📦 Datos recibidos correctamente');
    
    if (data.error) {
      console.error('⚠️ Backend devolvió error:', data.error);
      throw new Error(data.error);
    }
    
    return data;
    
  } catch (error) {
    console.error('❌ Error obteniendo datos:', error.message);
    throw error;
  }
}

/**
 * Inicializa y carga todos los datos desde Google Sheets
 * @param {string} token - El token JWT que nos entrega Google al iniciar sesión
 * @returns {Promise<Object>} Objeto con automatizaciones, procesos y valor agregado
 */
async function initializeData(token) {
  try {
    // Guardamos el token en la memoria apenas inicia sesión
    if (token) {
      authTokenGlobal = token;
    }

    console.time('⏱️ Tiempo total de carga');
    
    // 🚀 OPTIMIZACIÓN: Una sola llamada al backend seguro
    const allData = await fetchAllData();
    
    console.timeEnd('⏱️ Tiempo total de carga');
    console.time('📦 Procesamiento de datos');
    
    // Procesar automatizaciones
    const automatizaciones = (allData.automatizaciones || []).map(row => {
      let vaInicial = parseFloat(row.vaInicial) || 0;
      let vaFinal = parseFloat(row.vaFinal) || 0;
      let incrementoVA = parseFloat(row.incrementoVA) || 0;
      
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
    
    // Procesar procesos (cambios)
    const procesos = (allData.cambios || []).map(row => {
      let valorAgregado = row.valor_agregado || '';
      if (typeof valorAgregado === 'number' && valorAgregado >= 0 && valorAgregado <= 1) {
        valorAgregado = (valorAgregado * 100).toFixed(2) + '%';
      } else if (typeof valorAgregado === 'string' && !valorAgregado.includes('%')) {
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
        url_proceso: row.url_proceso || ''
      };
    });
    
    // Procesar valor agregado
    const valorAgregado = {};
    (allData.valor_agregado || []).forEach(row => {
      if (row.mesAsignado && (row.sas || row.cf)) {
        let monthKey = row.mesAsignado;
        
        if (typeof monthKey === 'string' && (monthKey.includes('T') || monthKey.length > 10)) {
          const date = new Date(monthKey);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          monthKey = `${year}-${month}`;
        }
        else if (typeof monthKey === 'string' && monthKey.match(/^\d{4}-\d{2}$/)) {
          monthKey = monthKey;
        }
        
        valorAgregado[monthKey] = {
          sas: row.sas || '',
          cf: row.cf || ''
        };
      }
    });
    
    console.timeEnd('📦 Procesamiento de datos');
    
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
window.SheetsConnector = {
  initializeData,
  setSheetId: (newId) => {
    SHEET_CONFIG.SHEET_ID = newId;
    console.log('✅ Sheet ID actualizado:', newId);
  }
};
