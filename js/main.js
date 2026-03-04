// Función mejorada para parsear fechas en múltiples formatos
function parseLocalDate(dateStr) {
  if (!dateStr) return new Date(1970, 0, 1);
  
  const str = String(dateStr).trim();
  
  // Formato YYYY-MM-DD o YYYY/MM/DD
  if (str.match(/^\d{4}[-\/]\d{1,2}[-\/]\d{1,2}$/)) {
    const parts = str.split(/[-\/]/).map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  
  // Formato DD/MM/YYYY o DD-MM-YYYY
  if (str.match(/^\d{1,2}[-\/]\d{1,2}[-\/]\d{4}$/)) {
    const parts = str.split(/[-\/]/).map(Number);
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }
  
  // Intentar parsear como timestamp o fecha válida
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? new Date(1970, 0, 1) : date;
}

function formatDate(ymd){ const d=parseLocalDate(ymd); return d.toLocaleDateString('es-CO',{day:'2-digit',month:'2-digit',year:'2-digit'}); }

// Mapeo de enlaces de Coda por nombre de documento
const documentLinks = {
  "Gestión de transferencias ACH": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/OP-PR-022-Gestion-de-transferencias-ACH_suemVnbM?search=Gesti%C3%B3n%20de%20transferencias%20ACH#Copy-of-Copy-of-Cabezote-122-44_tutlTec9",
  "Instructivo Actualización Fuente de Adquirencia": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/OP-IN-030-05-Instructivo-Actualizacion-Fuente-de-Adquirencia_sue8-tzy?docIds%5B0%5D=PZrHIIUQg-&search=Instructivo%20Actualizaci%C3%B3n%20Fuente%20de%20Adquirencia",
  "Instructivo Pago y liquidación de Bold CF a Bold CO SAS": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/OP-IN-030-06-Instructivo-Pago-y-liquidacion-de-Bold-CF-a-Bold-CO_suhVYdYL?docIds%5B0%5D=PZrHIIUQg-&search=Instructivo%20Pago%20y%20liquidaci%C3%B3n%20de%20Bold%20CF%20a%20Bold%20CO%20SAS",
  "Ajustes de adquirencia": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/OP-PR-033-Ajustes-de-adquirencia_sumfIGaP?docIds%5B0%5D=PZrHIIUQg-&search=Ajustes%20de%20adquirencia",
  "Comunicaciones a clientes": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/GM-PR-001-Comunicaciones-a-clientes_su45TOKR?docIds%5B0%5D=PZrHIIUQg-&search=Comunicaciones%20a%20clientes",
  "Reclutamiento de personal": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/TH-PR-001-Reclutamiento-de-personal_sudeRr7W?docIds%5B0%5D=PZrHIIUQg-&search=Reclutamiento%20de%20personal",
  "Offboarding de personal": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/TH-PR-008-Offboarding-de-personal_suz77-BW?docIds%5B0%5D=PZrHIIUQg-&search=Offboarding%20de%20personal",
  "Gestión programa ESOP": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/TH-PR-011-Gestion-programa-ESOP_suF9E_l6?docIds%5B0%5D=PZrHIIUQg-&search=Gesti%C3%B3n%20programa%20ESOP",
  "Liquidación y pago de aportes": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/TH-PR-012-Liquidacion-y-pago-de-aportes_su2dN3VF?docIds%5B0%5D=PZrHIIUQg-&search=Liquidaci%C3%B3n%20y%20pago%20de%20aportes",
  "Cambio interno de rol": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/TH-PR-024-Cambio-interno-de-rol_suF6NXPO?docIds%5B0%5D=PZrHIIUQg-&search=Cambio%20interno%20de%20rol",
  "Instructivo Generación Informe IRL": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/GF-IN-005-02-Instructivo-Generacion-Informe-IRL_suS5GFdM?docIds%5B0%5D=PZrHIIUQg-&search=Instructivo%20Generaci%C3%B3n%20Informe%20IRL",
  "Instructivo Generación Informe CFEN": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/GF-IN-005-03-Instructivo-Generacion-Informe-CFEN_suXq5J0X?docIds%5B0%5D=PZrHIIUQg-&search=Instructivo%20Generaci%C3%B3n%20Informe%20CFEN",
  "Instructivo conciliación cobro y recaudo tarjeta de crédito": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/GF-IN-030-01-Instructivo-conciliacion-cobro-y-recaudo-tarjeta-de_su_lHZig?docIds%5B0%5D=PZrHIIUQg-&search=Instructivo%20conciliaci%C3%B3n%20cobro%20y%20recaudo%20tarjeta%20de%20cr%C3%A9dito",
  "Instructivo control y seguimiento de cupos": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/GF-IN-030-02-Instructivo-control-y-seguimiento-de-cupos_su6SvZ8v?docIds%5B0%5D=PZrHIIUQg-&search=Instructivo%20control%20y%20seguimiento%20de%20cupos",
  "Gestión de Compras": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/SI-PR-004-Gestion-de-compras_suHNoYhL?docIds%5B0%5D=PZrHIIUQg-&search=Gesti%C3%B3n%20de%20Compras",
  "Selección y creación de terceros": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/SI-PR-006-Seleccion-y-creacion-de-terceros_supPV5mn?docIds%5B0%5D=PZrHIIUQg-&search=Selecci%C3%B3n%20y%20creaci%C3%B3n%20de%20terceros",
  "Recolección de activos fijos e implementos de trabajo en offboarding": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/SI-PR-008-Recoleccion-de-activos-fijos-e-implementos-de-trabajo-_suLlHh3z?docIds%5B0%5D=PZrHIIUQg-&search=Recolecci%C3%B3n%20de%20activos%20fijos%20e%20implementos%20de%20trabajo%20en%20offboarding",
  "Manual Ejecución Debida Diligencia Intensificada (DDI) CF": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/LC-MA-006-Manual-Ejecucion-Debida-Diligencia-Intensificada-DDI-C_suPEwkd7?docIds%5B0%5D=PZrHIIUQg-&search=Manual%20Ejecuci%C3%B3n%20Debida%20Diligencia%20Intensificada%20%28DDI%29%20CF",
  "Manual Metodológico Matriz de Riesgos SARLAFT": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/LC-MA-007-Manual-Metodologico-Matriz-de-Riesgos-SARLAFT_suzr4F8x?docIds%5B0%5D=PZrHIIUQg-&search=Manual%20Metodol%C3%B3gico%20Matriz%20de%20Riesgos%20SARLAFT",
  "Manual Metodología Segmentación de Riesgo Clientes": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/LC-MA-009-Manual-Metodologia-Segmentacion-de-Riesgo-Clientes_suWtffT_?docIds%5B0%5D=PZrHIIUQg-&search=Manual%20Metodolog%C3%ADa%20Segmentaci%C3%B3n%20de%20Riesgo%20Clientes",
  "Política activos fijos y elementos de trabajo": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/SI-PO-002-Politica-activos-fijos-y-elementos-de-trabajo_suY6mGAt?docIds%5B0%5D=PZrHIIUQg-&search=Pol%C3%ADtica%20activos%20fijos%20y%20elementos%20de%20trabajo",
  "Solicitud QR Bold (Entre cuentas)": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/AP-PR-010-Solicitud-QR-Bold-Entre-cuentas_suzb2RZ0?docIds%5B0%5D=PZrHIIUQg-&search=Solicitud%20QR%20Bold%20%28Entre%20cuentas%29",
  "Gestión comercial canal SMB": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/AP-PR-018-Gestion-comercial-canal-SMB_suix9GKp?docIds%5B0%5D=PZrHIIUQg-&search=Gesti%C3%B3n%20comercial%20canal%20SMB#Copy-of-Copy-6-of-ControlCambios-176_tuvOQ1P5/r3&columnId=c-M2SErj7365",
  "Gestión de beneficios": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/TH-PR-007-Gestion-de-beneficios_suN5hBT6?docIds%5B0%5D=PZrHIIUQg-&search=Gesti%C3%B3n%20de%20beneficios",
  "Liquidación y legalización de compras tarjetas corporativas": "https://coda.io/d/Arquitectura-de-Procesos_dPZrHIIUQg-/GF-PR-043-Liquidacion-y-legalizacion-de-compras-tarjetas-corpora_su4fFe1t?docIds%5B0%5D=PZrHIIUQg-&search=Liquidaci%C3%B3n%20y%20legalizaci%C3%B3n%20de%20compras%20tarjetas%20corporativas",
  "Validación de cuentas - KYC SAS": "https://coda.io/d/Arquitectura-de-Procesos-Bold-co-SAS_dywYtLrlDx7/VP-PR-103-Validacion-manual-de-cuentas-KYC-SAS_suZFDP1S?docIds%5B0%5D=ywYtLrlDx7&search=Validaci%C3%B3n%20de%20cuentas%20-%20KYC%20SAS",
  "Gestión comercial canal SMB SAS": "https://coda.io/d/Arquitectura-de-Procesos-Bold-co-SAS_dywYtLrlDx7/VP-PR-118-Gestion-comercial-canal-SMB-SAS_suC7ImXn?docIds%5B0%5D=ywYtLrlDx7&search=Gesti%C3%B3n%20comercial%20canal%20SMB%20SAS",
  "Validación de identidad de cliente": "https://coda.io/d/Arquitectura-de-Procesos-Bold-co-SAS_dywYtLrlDx7/AC-PR-101-Validacion-de-Identidad-del-Cliente-SAS_suqyIsK1?docIds%5B0%5D=ywYtLrlDx7&search=Validaci%C3%B3n%20de%20identidad%20de%20cliente",
  "Gestión de beneficios SAS": "https://coda.io/d/Arquitectura-de-Procesos-Bold-co-SAS_dywYtLrlDx7/TH-PR-107-Gestion-de-beneficios-SAS_suj00PHg?docIds%5B0%5D=ywYtLrlDx7&search=Gesti%C3%B3n%20de%20beneficios%20SAS",
  "Entrenamiento inicial para el área comercial SAS": "https://coda.io/d/Arquitectura-de-Procesos-Bold-co-SAS_dywYtLrlDx7/TH-PR-126-Entrenamiento-inicial-para-el-area-comercial-SAS_suycUc6V?docIds%5B0%5D=ywYtLrlDx7&search=Entrenamiento%20inicial%20para%20el%20%C3%A1rea%20comercial%20SAS",
  "Entrenamiento continuo para el área comercial SAS": "https://coda.io/d/Arquitectura-de-Procesos-Bold-co-SAS_dywYtLrlDx7/TH-PR-127-Entrenamiento-continuo-para-el-area-comercial-SAS_su_ZHAwi?docIds%5B0%5D=ywYtLrlDx7&search=Entrenamiento%20continuo%20para%20el%20%C3%A1rea%20comercial%20SAS",
  "Conciliación de Saldos de Cuentas Virtuales": "https://coda.io/d/Arquitectura-de-Procesos-Bold-co-SAS_dywYtLrlDx7/GF-PR-137-Conciliacion-de-Saldos-de-Cuentas-Virtuales_suluMbDK?docIds%5B0%5D=ywYtLrlDx7&search=Conciliaci%C3%B3n%20de%20Saldos%20de%20Cuentas%20Virtuales",
  "Liquidación y legalización de compras tarjetas corporativas SAS": "https://coda.io/d/Arquitectura-de-Procesos-Bold-co-SAS_dywYtLrlDx7/GF-PR-143-Liquidacion-y-legalizacion-de-compras-tarjetas-corpora_sugUGmqj?docIds%5B0%5D=ywYtLrlDx7&search=Liquidaci%C3%B3n%20y%20legalizaci%C3%B3n%20de%20compras%20tarjetas%20corporativas%20SAS",
  "Control de fuentes SAS": "https://coda.io/d/Arquitectura-de-Procesos-Bold-co-SAS_dywYtLrlDx7/GF-PR-144-Control-de-fuentes-SAS_suUnVL4L?docIds%5B0%5D=ywYtLrlDx7&search=Control%20de%20fuentes%20SAS",
  "Cierre diario de turno para clientes master merchant SAS": "https://coda.io/d/Arquitectura-de-Procesos-Bold-co-SAS_dywYtLrlDx7/OP-PR-169-Cierre-diario-de-turno-para-clientes-master-merchant-S_suOTZYVu?docIds%5B0%5D=ywYtLrlDx7&search=Cierre%20diario%20de%20turno%20para%20clientes%20master%20merchant%20SAS",
  "Comunicaciones a clientes SAS": "https://coda.io/d/Arquitectura-de-Procesos-Bold-co-SAS_dywYtLrlDx7/GM-PR-101-Comunicaciones-a-clientes-SAS_suO2I39n?docIds%5B0%5D=ywYtLrlDx7&search=Comunicaciones%20a%20clientes%20SAS",
  "Cambio interno de rol SAS": "https://coda.io/d/Arquitectura-de-Procesos-Bold-co-SAS_dywYtLrlDx7/TH-PR-124-Cambio-interno-de-rol_suz20-ca?docIds%5B0%5D=ywYtLrlDx7&search=Cambio%20interno%20de%20rol%20SAS",
  "Recolección de activos fijos e implementos de trabajo en offboarding SAS": "https://coda.io/d/Arquitectura-de-Procesos-Bold-co-SAS_dywYtLrlDx7/SI-PR-108-Recoleccion-de-activos-fijos-e-implementos-de-trabajo-_suRvgjLv?docIds%5B0%5D=ywYtLrlDx7&search=Recolecci%C3%B3n%20de%20activos%20fijos%20e%20implementos%20de%20trabajo%20en%20offboarding%20SAS",
  "Manual Ejecución Debida Diligencia Intensificada (DDI) SAS": "https://coda.io/d/Arquitectura-de-Procesos-Bold-co-SAS_dywYtLrlDx7/LC-MA-106-Manual-Ejecucion-Debida-Diligencia-Intensificada-DDI-S_suqy4vIX?docIds%5B0%5D=ywYtLrlDx7&search=Manual%20Ejecuci%C3%B3n%20Debida%20Diligencia%20Intensificada%20%28DDI%29%20SAS",
  "Documento Metodológico Matriz de Riesgos SAGRILAFT SAS": "https://coda.io/d/Arquitectura-de-Procesos-Bold-co-SAS_dywYtLrlDx7/LC-MA-107-Metodologico-Matriz-de-Riesgos-SAGRILAFT-SAS_suZRhaG_?docIds%5B0%5D=ywYtLrlDx7&search=Documento%20Metodol%C3%B3gico%20Matriz%20de%20Riesgos%20SAGRILAFT%20SAS",
  "Documento Metodológico Matriz de Riesgos PTEE (C/ST) - Programa de Transparencia y Ética Empresarial SAS": "https://coda.io/d/Arquitectura-de-Procesos-Bold-co-SAS_dywYtLrlDx7/LC-MA-108-Documento-Metodologico-Matriz-de-Riesgos-PTEE-C-ST-Pro_su6fWroN?docIds%5B0%5D=ywYtLrlDx7&search=Documento%20Metodol%C3%B3gico%20Matriz%20de%20Riesgos%20PTEE%20%28C%2FST%29%20-%20Programa%20de%20Transparencia%20y%20%C3%89tica%20Empresarial%20SAS",
  "Manual Metodología Segmentación de Riesgo Clientes SAS": "https://coda.io/d/Arquitectura-de-Procesos-Bold-co-SAS_dywYtLrlDx7/LC-MA-109-Manual-Metodologia-Segmentacion-de-Riesgo-Clientes-SAS_suIAroNe?docIds%5B0%5D=ywYtLrlDx7&search=Manual%20Metodolog%C3%ADa%20Segmentaci%C3%B3n%20de%20Riesgo%20Clientes%20SAS"
};

// Variables globales - se cargarán desde Google Sheets
let rows = [];
let cambios = [];

const cardsEl = document.getElementById('cards');
let query = '', sortMode='fecha';
const pctColor = (p)=> p>=100?'bg-emerald-500':p>=80?'bg-green-500':p>=50?'bg-amber-500':'bg-slate-300';
const status = (p)=> p>=100?['¡Listo!','bg-emerald-600 text-white']:p>=80?['Casi','bg-green-600 text-white']:['En curso','bg-slate-200 text-slate-800'];

// Función para obtener el color del aplicativo
const getApplicativeColor = (aplicativo) => {
  const app = (aplicativo || '').toUpperCase();
  switch(app) {
    case 'APPIAN': return '#0A53A5';
    case 'DAPTA': return '#1B8959';
    case 'N8N': return '#FF2947';
    default: return '#6B7280'; // gris por defecto
  }
};

// ======== SISTEMA DE FILTRADO POR MES/AÑO ========
let currentSelectedMonth;
let currentSelectedYear;

let valueAddedImages = {
  '2025-08': {
    sas: "https://drive.google.com/file/d/1ZbS5WyojhMcdcZz5TINSL2yGTxwQbskb/view",
    cf: "https://drive.google.com/file/d/1fUxaxuNvT5EdzAai_NvUL773Qq_mjk2O/view"
  },
  '2025-09': {
    sas: "https://drive.google.com/file/d/1Wn9xYfCdwWz7sW20dN4sye2oKVqoqdDz/view",
    cf: "https://drive.google.com/file/d/1DXerSbjHu3wzriAz5TFZfutwGs83e3N2/view"
  }
}; 

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

function getPreviousMonth() {
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth(); 
  
  if (month === 0) {
    month = 11; 
    year = year - 1;
  } else {
    month = month - 1; 
  }
  
  const monthNumber = month + 1;
  
  return {
    month: monthNumber,
    year: year,
    name: monthNames[month],
    key: `${year}-${String(monthNumber).padStart(2, '0')}`,
    display: `${monthNames[month]} ${year}`
  };
}

function getAvailableYears() {
  const years = new Set();
  
  rows.forEach(r => {
    if (r.mesAsignado) {
      const date = parseLocalDate(r.mesAsignado);
      years.add(date.getFullYear());
    }
    else if (r.fecha) {
      const date = parseLocalDate(r.fecha);
      years.add(date.getFullYear());
    }
  });
  
  cambios.forEach(c => {
    if (c.fecha) {
      const date = parseLocalDate(c.fecha);
      years.add(date.getFullYear());
    }
  });
  
  return Array.from(years).sort((a, b) => b - a);
}

function getAvailableMonthsForYear(year) {
  const months = new Set();
  
  rows.forEach(r => {
    if (r.mesAsignado) {
      const date = parseLocalDate(r.mesAsignado);
      if (date.getFullYear() === year) {
        months.add(date.getMonth() + 1);
      }
    }
    else if (r.fecha) {
      const date = parseLocalDate(r.fecha);
      if (date.getFullYear() === year) {
        months.add(date.getMonth() + 1);
      }
    }
  });
  
  cambios.forEach(c => {
    if (c.fecha) {
      const date = parseLocalDate(c.fecha);
      if (date.getFullYear() === year) {
        months.add(date.getMonth() + 1);
      }
    }
  });
  
  return Array.from(months)
    .sort((a, b) => b - a) 
    .map(monthNum => ({
      number: monthNum,
      name: monthNames[monthNum - 1],
      short: monthNames[monthNum - 1].substring(0, 3)
    }));
}

function getLastAvailableMonth() {
  const allDates = [...rows.map(r => r.fecha), ...cambios.map(c => c.fecha)]
    .filter(fecha => fecha && fecha.includes('-'))
    .map(fecha => {
      const parts = fecha.split('-');
      return { year: parseInt(parts[0]), month: parseInt(parts[1]), date: fecha };
    })
    .sort((a, b) => b.year - a.year || b.month - a.month);
  
  if (allDates.length > 0) {
    const latest = allDates[0];
    return {
      month: latest.month,
      year: latest.year,
      name: monthNames[latest.month - 1],
      key: `${latest.year}-${String(latest.month).padStart(2, '0')}`,
      display: `${monthNames[latest.month - 1]} ${latest.year}`
    };
  }
  
  return getPreviousMonth();
}

function initializeDefaultMonth() {
  if (rows.length === 0 && cambios.length === 0) {
    const fallbackMonth = getPreviousMonth();
    currentSelectedMonth = fallbackMonth.month;
    currentSelectedYear = fallbackMonth.year;
    const selectedMonthElement = document.getElementById('selectedMonth');
    if (selectedMonthElement) {
      selectedMonthElement.textContent = fallbackMonth.display;
    }
    updateAllSections();
    return fallbackMonth;
  }
  
  const previousMonth = getPreviousMonth();
  const previousMonthKey = `${previousMonth.year}-${String(previousMonth.month).padStart(2, '0')}`;
  
  const hasDataInPreviousMonth = 
    rows.some(r => {
      if (r.mesAsignado) {
        const date = parseLocalDate(r.mesAsignado);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        return key === previousMonthKey;
      }
      if (r.fecha) {
        const date = parseLocalDate(r.fecha);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        return key === previousMonthKey;
      }
      return false;
    }) ||
    cambios.some(c => {
      if (c.fecha) {
        const date = parseLocalDate(c.fecha);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        return key === previousMonthKey;
      }
      return false;
    });
  
  let selectedMonth;
  
  if (hasDataInPreviousMonth) {
    selectedMonth = previousMonth;
  } else {
    selectedMonth = getLastAvailableMonth();
  }
  
  currentSelectedMonth = selectedMonth.month;
  currentSelectedYear = selectedMonth.year;
  
  const selectedMonthElement = document.getElementById('selectedMonth');
  if (selectedMonthElement) {
    selectedMonthElement.textContent = selectedMonth.display;
  }
  
  updateAllSections();
  
  return selectedMonth;
}

let tempSelectedYear;
let tempSelectedMonth;

function populateMonthDropdown() {
  populateCustomYearDropdown();
  populateCustomMonthDropdown();
  
  document.getElementById('yearSelectBtn').addEventListener('click', toggleYearDropdown);
  document.getElementById('monthSelectBtn').addEventListener('click', toggleMonthDropdownInternal);
}

function populateCustomYearDropdown() {
  const yearOptions = document.getElementById('yearOptions');
  const yearSelectedText = document.getElementById('yearSelectedText');
  const availableYears = getAvailableYears();
  
  yearOptions.innerHTML = '';
  yearSelectedText.textContent = tempSelectedYear;
  
  availableYears.forEach(year => {
    const option = document.createElement('div');
    option.className = `px-4 py-3 cursor-pointer transition-colors hover:bg-blue-50 ${
      year === tempSelectedYear ? 'font-bold' : 'font-medium'
    }`;
    option.style.color = year === tempSelectedYear ? '#121E6C' : '#374151';
    option.textContent = year;
    
    option.addEventListener('click', () => selectYear(year));
    yearOptions.appendChild(option);
  });
}

function populateCustomMonthDropdown() {
  const monthOptions = document.getElementById('monthOptions');
  const monthSelectedText = document.getElementById('monthSelectedText');
  const availableMonths = getAvailableMonthsForYear(tempSelectedYear);
  
  monthOptions.innerHTML = '';
  
  const selectedMonthObj = availableMonths.find(m => m.number === tempSelectedMonth);
  monthSelectedText.textContent = selectedMonthObj ? selectedMonthObj.name : 'Seleccionar...';
  
  availableMonths.forEach(month => {
    const option = document.createElement('div');
    option.className = `px-4 py-3 cursor-pointer transition-colors hover:bg-blue-50 ${
      month.number === tempSelectedMonth ? 'font-bold' : 'font-medium'
    }`;
    option.style.color = month.number === tempSelectedMonth ? '#121E6C' : '#374151';
    option.textContent = month.name;
    
    option.addEventListener('click', () => {
      selectMonthDirectly(tempSelectedYear, month.number);
    });
    monthOptions.appendChild(option);
  });
}

function toggleYearDropdown() {
  const dropdown = document.getElementById('yearDropdown');
  const icon = document.getElementById('yearDropIcon');
  const monthDropdown = document.getElementById('monthDropdownCustom');
  
  monthDropdown.classList.add('hidden');
  document.getElementById('monthDropIcon').style.transform = 'rotate(0deg)';
  
  if (dropdown.classList.contains('hidden')) {
    dropdown.classList.remove('hidden');
    icon.style.transform = 'rotate(180deg)';
  } else {
    dropdown.classList.add('hidden');
    icon.style.transform = 'rotate(0deg)';
  }
}

function toggleMonthDropdownInternal() {
  const dropdown = document.getElementById('monthDropdownCustom');
  const icon = document.getElementById('monthDropIcon');
  const yearDropdown = document.getElementById('yearDropdown');
  
  yearDropdown.classList.add('hidden');
  document.getElementById('yearDropIcon').style.transform = 'rotate(0deg)';
  
  if (dropdown.classList.contains('hidden')) {
    dropdown.classList.remove('hidden');
    icon.style.transform = 'rotate(180deg)';
  } else {
    dropdown.classList.add('hidden');
    icon.style.transform = 'rotate(0deg)';
  }
}

function selectYear(year) {
  tempSelectedYear = year;
  
  const availableMonths = getAvailableMonthsForYear(year);
  const monthNumbers = availableMonths.map(m => m.number);
  if (!monthNumbers.includes(tempSelectedMonth)) {
    tempSelectedMonth = monthNumbers[monthNumbers.length - 1]; 
  }
  
  selectMonthDirectly(tempSelectedYear, tempSelectedMonth);
}

function selectMonth_internal(monthNumber) {
  tempSelectedMonth = monthNumber;
  
  populateCustomMonthDropdown();
  
  document.getElementById('monthDropdownCustom').classList.add('hidden');
  document.getElementById('monthDropIcon').style.transform = 'rotate(0deg)';
}

function selectMonthDirectly(year, month) {
  currentSelectedMonth = month;
  currentSelectedYear = year;
  
  const monthName = monthNames[month - 1];
  const display = `${monthName} ${year}`;
  document.getElementById('selectedMonth').textContent = display;
  
  updateAllSections();
  
  hideMonthDropdown();
}

function selectMonth(monthData) {
  currentSelectedMonth = monthData.month;
  currentSelectedYear = monthData.year;
  
  document.getElementById('selectedMonth').textContent = monthData.display;
  
  hideMonthDropdown();
  
  updateAllSections();
}

function toggleMonthDropdown() {
  const dropdown = document.getElementById('monthDropdown');
  const icon = document.getElementById('monthDropdownIcon');
  
  if (dropdown.classList.contains('hidden')) {
    showMonthDropdown();
  } else {
    hideMonthDropdown();
  }
}

function showMonthDropdown() {
  const dropdown = document.getElementById('monthDropdown');
  const icon = document.getElementById('monthDropdownIcon');
  
  tempSelectedYear = currentSelectedYear;
  tempSelectedMonth = currentSelectedMonth;
  
  const yearSelectBtn = document.getElementById('yearSelectBtn');
  const monthSelectBtn = document.getElementById('monthSelectBtn');
  if (yearSelectBtn) yearSelectBtn.removeEventListener('click', toggleYearDropdown);
  if (monthSelectBtn) monthSelectBtn.removeEventListener('click', toggleMonthDropdownInternal);
  
  populateMonthDropdown();
  dropdown.classList.remove('hidden');
  icon.style.transform = 'rotate(180deg)';
  
  setTimeout(() => {
    document.addEventListener('click', handleClickOutside);
  }, 100);
}

function confirmSelection() {
  currentSelectedMonth = tempSelectedMonth;
  currentSelectedYear = tempSelectedYear;
  
  const monthName = monthNames[currentSelectedMonth - 1];
  const display = `${monthName} ${currentSelectedYear}`;
  document.getElementById('selectedMonth').textContent = display;
  
  hideMonthDropdown();
  
  updateAllSections();
}

function hideMonthDropdown() {
  const dropdown = document.getElementById('monthDropdown');
  const icon = document.getElementById('monthDropdownIcon');
  
  const yearDropdown = document.getElementById('yearDropdown');
  const monthDropdownCustom = document.getElementById('monthDropdownCustom');
  if (yearDropdown) yearDropdown.classList.add('hidden');
  if (monthDropdownCustom) monthDropdownCustom.classList.add('hidden');
  
  const yearDropIcon = document.getElementById('yearDropIcon');
  const monthDropIcon = document.getElementById('monthDropIcon');
  if (yearDropIcon) yearDropIcon.style.transform = 'rotate(0deg)';
  if (monthDropIcon) monthDropIcon.style.transform = 'rotate(0deg)';
  
  dropdown.classList.add('hidden');
  icon.style.transform = 'rotate(0deg)';
  document.removeEventListener('click', handleClickOutside);
  
  const yearSelectBtn = document.getElementById('yearSelectBtn');
  const monthSelectBtn = document.getElementById('monthSelectBtn');
  if (yearSelectBtn) yearSelectBtn.removeEventListener('click', toggleYearDropdown);
  if (monthSelectBtn) monthSelectBtn.removeEventListener('click', toggleMonthDropdownInternal);
}

function handleClickOutside(event) {
  const selector = document.getElementById('monthSelector');
  const dropdown = document.getElementById('monthDropdown');
  const yearDropdown = document.getElementById('yearDropdown');
  const monthDropdownCustom = document.getElementById('monthDropdownCustom');
  
  if (!selector.contains(event.target) && 
      !dropdown.contains(event.target) &&
      !yearDropdown.contains(event.target) &&
      !monthDropdownCustom.contains(event.target)) {
    hideMonthDropdown();
  }
}

function updateValueAddedImages() {
  const monthKey = `${currentSelectedYear}-${String(currentSelectedMonth).padStart(2, '0')}`;
  
  const images = valueAddedImages[monthKey];
  
  const cardsContainer = document.getElementById('valueAddedCards');
  const noResultsContainer = document.getElementById('noResultsValueAdded');
  const noResultsText = document.getElementById('noResultsTextValueAdded');
  
  if (!images) {
    cardsContainer.classList.add('hidden');
    noResultsContainer.classList.remove('hidden');
    noResultsText.textContent = `No hay imágenes de valor agregado disponibles para ${monthNames[currentSelectedMonth - 1]} ${currentSelectedYear}.`;
    return;
  }
  
  cardsContainer.classList.remove('hidden');
  noResultsContainer.classList.add('hidden');
  
  const img1 = document.getElementById('img1');
  const img2 = document.getElementById('img2');
  
  if (img1 && images.sas) {
    setDriveImage(img1, images.sas);
  }
  
  if (img2 && images.cf) {
    setDriveImage(img2, images.cf);
  }
}

function updateAllSections() {
  updateValueAddedImages();
  renderAutoFiltered();
  renderCambios();
}

function renderAutoFiltered() {
  if (!currentSelectedMonth || !currentSelectedYear) {
    return;
  }
  
  const monthKey = `${currentSelectedYear}-${String(currentSelectedMonth).padStart(2, '0')}`;
  
  const list = rows.filter(r => {
    let belongsToMonth = false;
    
    if (r.mesAsignado) {
      let mesAsignadoKey = r.mesAsignado;
      if (r.mesAsignado.includes('T') || r.mesAsignado.length > 10) {
        const date = parseLocalDate(r.mesAsignado);
        mesAsignadoKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      }
      
      if (mesAsignadoKey === monthKey) {
        belongsToMonth = true;
      }
    }
    else if (!r.mesAsignado && r.fecha) {
      const itemDate = parseLocalDate(r.fecha);
      const itemMonthKey = `${itemDate.getFullYear()}-${String(itemDate.getMonth() + 1).padStart(2, '0')}`;
      
      if (itemMonthKey === monthKey) {
        belongsToMonth = true;
      }
    }
    
    if (!belongsToMonth) return false;
    
    return (r.aplicativo + ' ' + r.aplicacion + ' ' + r.proceso + ' ' + r.detalle + ' ' + r.compania).toLowerCase().includes(query.toLowerCase());
  })
  .sort((a,b) => sortMode === 'fecha' ? (parseLocalDate(b.fecha) - parseLocalDate(a.fecha)) : (Number(b.vaFinal) - Number(a.vaFinal)));
  
  if (!cardsEl) {
    return;
  }
  
  const noResultsDiv = document.getElementById('noResultsAuto');
  const noResultsText = document.getElementById('noResultsTextAuto');
  
  cardsEl.innerHTML = '';
  
  if (list.length === 0) {
    noResultsDiv.classList.remove('hidden');
    
    if (query.trim()) {
      noResultsText.textContent = `No hay resultados para "${query.trim()}" en ${monthNames[currentSelectedMonth - 1]} ${currentSelectedYear}`;
    } else {
      noResultsText.textContent = `No se encontraron automatizaciones para ${monthNames[currentSelectedMonth - 1]} ${currentSelectedYear}.`;
    }
    
    return;
  } else {
    noResultsDiv.classList.add('hidden');
  }
  
  list.forEach(r => {
    const card = document.createElement('div');
    card.className = 'fade-in rounded-3xl card-shadow bg-white transition-all duration-300 min-h-[420px] flex flex-col';
    
    let procesosHtml = '';
    if (r.proceso) {
      const procesos = r.proceso.split('\n').filter(p => p.trim());
      if (procesos.length > 1) {
        procesosHtml = '<div class="text-sm font-medium text-slate-700 mb-2">Procesos involucrados:</div><ul class="text-sm text-slate-600 space-y-1 ml-2">';
        procesos.forEach(proceso => {
          procesosHtml += `<li class="flex items-start"><span class="text-indigo-500 mr-2 mt-0.5">•</span><span>${proceso.trim()}</span></li>`;
        });
        procesosHtml += '</ul>';
      } else {
        procesosHtml = `<div class="text-sm font-medium text-slate-700 mb-1">Procesos involucrados:</div><div class="text-sm text-slate-600">${procesos[0]}</div>`;
      }
    }
    
    const detalleText = (r.detalle && !isNaN(r.detalle) === false) ? r.detalle : (r.detalle || 'Sin detalles específicos');
    const cardId = `card-${Math.random().toString(36).substr(2, 9)}`; 
    const isLongDescription = detalleText.length > 150; 
    
    const applicativeColor = getApplicativeColor(r.aplicativo);
    
    card.innerHTML = `
      <div class="h-full flex flex-col">
        <div class="bg-gradient-to-br from-slate-50 to-gray-100 p-6 rounded-t-3xl h-32 flex flex-col justify-between">
          <h3 class="font-bold text-lg text-gray-900 leading-tight line-clamp-2 flex-1">${r.aplicacion || ''}</h3>
          <div class="flex items-center gap-2 mt-2">
            <span class="text-xs px-2 py-1 rounded-md font-bold text-white" style="background-color: ${applicativeColor}; border: 1px solid ${applicativeColor};">${r.aplicativo || ''}</span>
            <span class="text-xs px-2 py-1 bg-gray-900 text-white rounded-md">${r.compania || ''}</span>
          </div>
        </div>
        <div class="flex-1 p-6 flex flex-col justify-between">
          <div class="space-y-4 mb-4">
            <div>${procesosHtml}</div>
            <div class="bg-gray-50 p-4 rounded-xl">
              <div class="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Descripción</div>
              <div class="description-container">
                <p id="desc-${cardId}" class="text-sm text-gray-700 ${isLongDescription ? 'line-clamp-3' : ''}">${detalleText}</p>
                ${isLongDescription ? `
                  <button onclick="toggleDescription('${cardId}')" class="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium focus:outline-none" style="color: #121E6C;">
                    <span id="btn-${cardId}">Ver más</span>
                  </button>
                ` : ''}
              </div>
            </div>
          </div>
          <div class="bg-gray-50 p-4 rounded-xl mt-auto">
            <div class="grid grid-cols-3 gap-4 text-center">
              <div>
                <div class="text-xs text-gray-500 font-medium mb-1">VA Inicial</div>
                <div class="font-bold text-lg text-gray-700">${Math.round(Number(r.vaInicial || 0))}%</div>
              </div>
              <div>
                <div class="text-xs text-gray-500 font-medium mb-1">Incremento</div>
                <div class="font-bold text-lg" style="color: #6CDCAB">+${Math.round(Number(r.incrementoVA || 0))}%</div>
              </div>
              <div>
                <div class="text-xs text-gray-500 font-medium mb-1">VA Final</div>
                <div class="font-bold text-xl bold-primary">${Math.round(Number(r.vaFinal || 0))}%</div>
              </div>
            </div>
          </div>
        </div>
        <div class="px-6 pb-6">
          <div class="text-xs text-gray-500 flex items-center justify-center gap-2 py-3 bg-gray-50 rounded-xl">
            <img src="./assets/icons/calendar-icon.png" alt="Calendario" class="w-4 h-4 opacity-60"> Fecha en prod: <span class="font-semibold text-gray-700">${formatDate(r.fecha)}</span>
          </div>
        </div>
      </div>
    `;
    
    cardsEl.appendChild(card);
  });
}

window.toggleDescription = function(cardId) {
  const descElement = document.getElementById(`desc-${cardId}`);
  const btnElement = document.getElementById(`btn-${cardId}`);
  
  if (descElement.classList.contains('line-clamp-3')) {
    descElement.classList.remove('line-clamp-3');
    btnElement.textContent = 'Ver menos';
  } else {
    descElement.classList.add('line-clamp-3');
    btnElement.textContent = 'Ver más';
  }
};

function renderAuto() {
  renderAutoFiltered();
}

document.getElementById('q').addEventListener('input',(e)=>{query=e.target.value;renderAuto();});
document.getElementById('resetBtn').addEventListener('click',()=>{
  query='';
  sortMode='fecha';
  document.getElementById('q').value='';
  renderAuto();
});

// ======== CAMBIOS — listado con paginación ========
const tbodyCambios=document.getElementById('tbodyCambios');
const countCambios=document.getElementById('countCambios');
const pageInfo=document.getElementById('pageInfo');
const prevBtn=document.getElementById('prevPage');
const nextBtn=document.getElementById('nextPage');
let q2 = '', sort2 = 'va', page = 1, pageSize = 10; 
let columnFilters = {}; 
let currentFilterColumn = '';

window.showFilterDropdown = function(column, event) {
  event.stopPropagation();
  currentFilterColumn = column;
  
  const dropdown = document.getElementById('filterDropdown');
  const rect = event.target.getBoundingClientRect();
  
  dropdown.style.left = Math.min(rect.left, window.innerWidth - 280) + 'px';
  dropdown.style.top = (rect.bottom + 5) + 'px';
  
  populateFilterOptions(column);
  
  dropdown.classList.remove('hidden');
  
  setTimeout(() => {
    document.addEventListener('click', hideFilterDropdownOutside);
  }, 100);
}

window.hideFilterDropdown = function() {
  const dropdown = document.getElementById('filterDropdown');
  dropdown.classList.add('hidden');
  document.removeEventListener('click', hideFilterDropdownOutside);
}

function hideFilterDropdownOutside(event) {
  const dropdown = document.getElementById('filterDropdown');
  if (!dropdown.contains(event.target)) {
    hideFilterDropdown();
  }
}

function populateFilterOptions(column) {
  const filterOptions = document.getElementById('filterOptions');
  const columnSearch = document.getElementById('columnSearch');
  
  let values = [];
  cambios.forEach(row => {
    let value = '';
    switch(column) {
      case 'codigo': value = row.codigo || ''; break;
      case 'documento': value = row.documento || ''; break;
      case 'dueno': value = row.dueno || ''; break;
      case 'detalle': value = row.detalle || ''; break;
      case 'compania': value = row.compania || ''; break;
      case 'tipo': value = row.tipo || ''; break;
      case 'fecha': value = formatDate(row.fecha) || ''; break;
      case 'va': value = row.valor_agregado || 'N/A'; break;
    }
    if (value && !values.includes(value)) {
      values.push(value);
    }
  });
  
  values.sort();
  
  filterOptions.innerHTML = '';
  columnSearch.value = '';
  
  const currentFilters = columnFilters[column] || [];
  const allSelected = currentFilters.length === 0;
  
  values.forEach(value => {
    const isSelected = allSelected || currentFilters.includes(value);
    
    const label = document.createElement('label');
    label.className = 'flex items-center gap-2 px-2 py-1 hover:bg-gray-50 text-sm filter-option';
    label.innerHTML = `
      <input type="checkbox" value="${value}" ${isSelected ? 'checked' : ''} onchange="updateSelectAll()">
      <span>${value}</span>
    `;
    filterOptions.appendChild(label);
  });
  
  document.getElementById('selectAll').checked = allSelected;
  
  columnSearch.oninput = function() {
    const searchTerm = this.value.toLowerCase();
    const options = filterOptions.querySelectorAll('.filter-option');
    options.forEach(option => {
      const text = option.textContent.toLowerCase();
      option.style.display = text.includes(searchTerm) ? 'flex' : 'none';
    });
  };
}

window.toggleAllFilters = function() {
  const selectAll = document.getElementById('selectAll');
  const checkboxes = document.querySelectorAll('#filterOptions input[type="checkbox"]');
  
  checkboxes.forEach(checkbox => {
    if (checkbox.closest('.filter-option').style.display !== 'none') {
      checkbox.checked = selectAll.checked;
    }
  });
}

window.updateSelectAll = function() {
  const checkboxes = Array.from(document.querySelectorAll('#filterOptions input[type="checkbox"]'));
  const visibleCheckboxes = checkboxes.filter(cb => cb.closest('.filter-option').style.display !== 'none');
  const checkedBoxes = visibleCheckboxes.filter(cb => cb.checked);
  
  const selectAll = document.getElementById('selectAll');
  selectAll.checked = checkedBoxes.length === visibleCheckboxes.length;
  selectAll.indeterminate = checkedBoxes.length > 0 && checkedBoxes.length < visibleCheckboxes.length;
}

window.applySortFilter = function(direction) {
  sort2 = currentFilterColumn + (direction === 'asc' ? '-asc' : '');
  page = 1;
  renderCambios();
  hideFilterDropdown();
}

window.applyColumnFilter = function() {
  const checkboxes = document.querySelectorAll('#filterOptions input[type="checkbox"]:checked');
  const selectedValues = Array.from(checkboxes).map(cb => cb.value);
  
  if (selectedValues.length === document.querySelectorAll('#filterOptions input[type="checkbox"]').length) {
    delete columnFilters[currentFilterColumn];
  } else {
    columnFilters[currentFilterColumn] = selectedValues;
  }
  
  page = 1;
  renderCambios();
  hideFilterDropdown();
}

window.clearColumnFilter = function() {
  delete columnFilters[currentFilterColumn];
  page = 1;
  renderCambios();
  hideFilterDropdown();
}

function getVAColor(valorAgregado) {
  if (!valorAgregado || String(valorAgregado).trim() === '' || String(valorAgregado).toUpperCase() === 'N/A') {
    return '#606060'; 
  }
  
  const numValue = parseFloat(String(valorAgregado).replace('%', '')) || 0;
  
  if (numValue >= 60) {
    return '#6CDCAB'; 
  } else if (numValue >= 31) {
    return '#FFC217'; 
  } else {
    return '#C31A2F'; 
  }
}

function rowCambios(r){
  const tipoStyle = 'background-color: #f1f2f6; color: #6b7280;';
  
  let va;
  if (!r.valor_agregado || String(r.valor_agregado).trim() === '' || String(r.valor_agregado).toUpperCase() === 'N/A') {
    va = 'No aplica';
  } else {
    const numValue = parseFloat(String(r.valor_agregado).replace('%', ''));
    va = isNaN(numValue) ? r.valor_agregado : `${Math.round(numValue)}%`;
  }
  
  const vaColor = getVAColor(r.valor_agregado);
  
  const documentoNombre = r.documento || '';
  const documentoLink = r.url_proceso || documentLinks[documentoNombre]; 
  const documentoHTML = documentoLink 
    ? `<a href="${documentoLink}" target="_blank" rel="noopener noreferrer" class="text-bold-primary underline hover:no-underline font-medium">${documentoNombre}</a>`
    : documentoNombre;
  
  const detalleTexto = r.detalle || '';
  const MAX_LENGTH = 150;
  const detalleTruncado = detalleTexto.length > MAX_LENGTH 
    ? detalleTexto.substring(0, MAX_LENGTH) + '...' 
    : detalleTexto;
  const detalleHTML = detalleTexto.length > MAX_LENGTH
    ? `<div class="relative detalle-cell" style="max-width: 600px;">
         <span class="detalle-preview cursor-pointer">${detalleTruncado}</span>
         <div class="detalle-tooltip hidden fixed z-[9999] bg-white rounded-xl p-4 text-sm" style="min-width: 300px; max-width: 500px; color: #334155; line-height: 1.6; box-shadow: 0 10px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05);">
           ${detalleTexto}
         </div>
       </div>`
    : `<span>${detalleTexto}</span>`;

  return `
    <tr class="border-b border-slate-100 hover:bg-slate-50">
      <td class="px-3 py-2 font-medium text-slate-800 w-32">${r.codigo}</td>
      <td class="px-3 py-2">${documentoHTML}</td>
      <td class="px-3 py-2 w-48 text-sm" title="${r.dueno || ''}">${r.dueno || ''}</td>
      <td class="px-3 py-2 text-slate-700 relative">${detalleHTML}</td>
      <td class="px-3 py-2 w-20 text-center">${r.compania || ''}</td>
      <td class="px-3 py-2 w-32 text-center">
        <span class="inline-flex items-center justify-center text-xs px-3 py-2 rounded-full min-w-[90px] h-6" style="${tipoStyle}">${r.tipo}</span>
      </td>
      <td class="px-3 py-2 w-28 text-center">${formatDate(r.fecha)}</td>
      <td class="px-3 py-2 w-20 text-center">
        <span class="font-bold" style="color: ${vaColor};">${va}</span>
      </td>
    </tr>
  `;
}

function getFilteredCambios(){ 
  const filtered = cambios
    .filter(r => {
      if (currentSelectedMonth && currentSelectedYear && r.fecha) {
        const itemDate = parseLocalDate(r.fecha);
        const itemMonth = itemDate.getMonth() + 1; 
        const itemYear = itemDate.getFullYear();
        
        if (itemMonth !== currentSelectedMonth || itemYear !== currentSelectedYear) {
          return false;
        }
      }
      
      if (q2) {
        const searchStr = (r.codigo + ' ' + r.documento + ' ' + (r.dueno || '') + ' ' + (r.detalle || '') + ' ' + (r.compania || '') + ' ' + (r.valor_agregado || '')).toLowerCase();
        if (!searchStr.includes(q2.toLowerCase())) return false;
      }
      
      for (const [column, filters] of Object.entries(columnFilters)) {
        if (filters && filters.length > 0) {
          let value = '';
          switch(column) {
            case 'codigo': value = r.codigo || ''; break;
            case 'documento': value = r.documento || ''; break;
            case 'dueno': value = r.dueno || ''; break;
            case 'detalle': value = r.detalle || ''; break;
            case 'compania': value = r.compania || ''; break;
            case 'tipo': value = r.tipo || ''; break;
            case 'fecha': value = formatDate(r.fecha) || ''; break;
            case 'va': value = r.valor_agregado || 'N/A'; break;
          }
          if (!filters.includes(value)) return false;
        }
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sort2 === 'fecha') return parseLocalDate(b.fecha) - parseLocalDate(a.fecha);
      if (sort2 === 'fecha-asc') return parseLocalDate(a.fecha) - parseLocalDate(b.fecha);
      if (sort2 === 'codigo') return (b.codigo || '').localeCompare(a.codigo || '');
      if (sort2 === 'codigo-asc') return (a.codigo || '').localeCompare(b.codigo || '');
      if (sort2 === 'documento') return (b.documento || '').localeCompare(a.documento || '');
      if (sort2 === 'documento-asc') return (a.documento || '').localeCompare(b.documento || '');
      if (sort2 === 'dueno') return (b.dueno || '').localeCompare(a.dueno || '');
      if (sort2 === 'dueno-asc') return (a.dueno || '').localeCompare(b.dueno || '');
      if (sort2 === 'compania') return (b.compania || '').localeCompare(a.compania || '');
      if (sort2 === 'compania-asc') return (a.compania || '').localeCompare(b.compania || '');
      if (sort2 === 'tipo') return (b.tipo || '').localeCompare(a.tipo || '');
      if (sort2 === 'tipo-asc') return (a.tipo || '').localeCompare(b.tipo || '');
      if (sort2 === 'va') {
        const aVal = parseFloat(String(a.valor_agregado).replace('%', '')) || 0;
        const bVal = parseFloat(String(b.valor_agregado).replace('%', '')) || 0;
        return bVal - aVal;
      }
      if (sort2 === 'va-asc') {
        const aVal = parseFloat(String(a.valor_agregado).replace('%', '')) || 0;
        const bVal = parseFloat(String(b.valor_agregado).replace('%', '')) || 0;
        return aVal - bVal;
      }
      return 0;
    });
  
  return filtered;
}

function renderCambios(){ 
  const all = getFilteredCambios(); 
  const totalPages = Math.max(1, Math.ceil(all.length / pageSize)); 
  if (page > totalPages) page = totalPages; 
  const start = (page - 1) * pageSize; 
  const list = all.slice(start, start + pageSize);
  
  const tableContainer = document.querySelector('.overflow-x-auto');
  const noResultsDiv = document.getElementById('noResultsCambios');
  const noResultsText = document.getElementById('noResultsTextCambios');
  
  if (all.length === 0) {
    tableContainer.style.display = 'none';
    noResultsDiv.classList.remove('hidden');
    
    if (q2.trim()) {
      noResultsText.textContent = `No hay resultados para "${q2.trim()}"`;
    } else if (Object.keys(columnFilters).length > 0) {
      noResultsText.textContent = 'No se encontraron procesos que coincidan con los filtros aplicados.';
    } else {
      noResultsText.textContent = 'No se encontraron procesos que coincidan con tu búsqueda.';
    }
    
    countCambios.textContent = '0 resultados';
    pageInfo.innerHTML = '';
    prevBtn.disabled = true;
    nextBtn.disabled = true;
  } else {
    tableContainer.style.display = 'block';
    noResultsDiv.classList.add('hidden');
    
    tbodyCambios.innerHTML = list.map(rowCambios).join(''); 
    countCambios.textContent = all.length + ' resultado' + (all.length !== 1 ? 's' : ''); 
    
    pageInfo.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.textContent = i;
      pageBtn.className = 'px-3 py-2 rounded-lg font-bold transition-all duration-200';
      
      if (i === page) {
        pageBtn.style.cssText = 'background-color: #121E6C; color: white; border: 2px solid #121E6C;';
      } else {
        pageBtn.style.cssText = 'background-color: white; color: #121E6C; border: 2px solid #e2e8f0;';
        pageBtn.onmouseover = function() { this.style.backgroundColor = '#f1f5f9'; };
        pageBtn.onmouseout = function() { this.style.backgroundColor = 'white'; };
      }
      
      pageBtn.onclick = () => {
        page = i;
        renderCambios();
      };
      
      pageInfo.appendChild(pageBtn);
    }
    
    prevBtn.disabled = page <= 1; 
    nextBtn.disabled = page >= totalPages;
    
    setTimeout(() => {
      document.querySelectorAll('.detalle-cell').forEach(cell => {
        const preview = cell.querySelector('.detalle-preview');
        const tooltip = cell.querySelector('.detalle-tooltip');
        
        if (preview && tooltip) {
          let isHovering = false;
          
          const showTooltip = (e) => {
            isHovering = true;
            
            const rect = preview.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const tooltipHeight = 200; 
            
            const spaceBelow = viewportHeight - rect.bottom;
            const spaceAbove = rect.top;
            
            tooltip.classList.remove('hidden');
            
            if (spaceBelow < tooltipHeight && spaceAbove > spaceBelow) {
              tooltip.style.left = rect.left + 'px';
              tooltip.style.top = (rect.top - tooltip.offsetHeight - 8) + 'px';
            } else {
              tooltip.style.left = rect.left + 'px';
              tooltip.style.top = (rect.bottom + 8) + 'px';
            }
          };
          
          const hideTooltip = () => {
            isHovering = false;
            setTimeout(() => {
              if (!isHovering) {
                tooltip.classList.add('hidden');
              }
            }, 100);
          };
          
          preview.addEventListener('mouseenter', showTooltip);
          preview.addEventListener('mouseleave', hideTooltip);
          
          tooltip.addEventListener('mouseenter', () => {
            isHovering = true;
          });
          
          tooltip.addEventListener('mouseleave', hideTooltip);
        }
      });
    }, 50);
  }
  
  updateFilterIndicators();
  updateSummaryTable(); 
}

function updateSummaryTable() {
  const documentTypes = {
    'Procesos': { pattern: /-PR-/i, creacion: 0, actualizacion: 0, derogacion: 0 },
    'Instructivos': { pattern: /-IN-/i, creacion: 0, actualizacion: 0, derogacion: 0 },
    'Políticas, Manuales y Códigos': { patterns: [/-PO-/i, /-MA-/i, /-CO-/i], creacion: 0, actualizacion: 0, derogacion: 0 }
  };
  
  cambios.forEach(r => {
    if (r.fecha && currentSelectedMonth && currentSelectedYear) {
      const itemDate = parseLocalDate(r.fecha);
      const itemMonth = itemDate.getMonth() + 1;
      const itemYear = itemDate.getFullYear();
      
      if (itemMonth === currentSelectedMonth && itemYear === currentSelectedYear) {
        const codigo = r.codigo || '';
        const tipo = r.tipo || '';
        
        if (documentTypes.Procesos.pattern.test(codigo)) {
          if (tipo.toLowerCase().includes('creaci')) documentTypes.Procesos.creacion++;
          else if (tipo.toLowerCase().includes('actualiz')) documentTypes.Procesos.actualizacion++;
          else if (tipo.toLowerCase().includes('derog')) documentTypes.Procesos.derogacion++;
        }
        else if (documentTypes.Instructivos.pattern.test(codigo)) {
          if (tipo.toLowerCase().includes('creaci')) documentTypes.Instructivos.creacion++;
          else if (tipo.toLowerCase().includes('actualiz')) documentTypes.Instructivos.actualizacion++;
          else if (tipo.toLowerCase().includes('derog')) documentTypes.Instructivos.derogacion++;
        }
        else if (documentTypes['Políticas, Manuales y Códigos'].patterns.some(p => p.test(codigo))) {
          if (tipo.toLowerCase().includes('creaci')) documentTypes['Políticas, Manuales y Códigos'].creacion++;
          else if (tipo.toLowerCase().includes('actualiz')) documentTypes['Políticas, Manuales y Códigos'].actualizacion++;
          else if (tipo.toLowerCase().includes('derog')) documentTypes['Políticas, Manuales y Códigos'].derogacion++;
        }
      }
    }
  });
  
  const container = document.getElementById('summaryCards');
  container.innerHTML = '';
  
  Object.entries(documentTypes).forEach(([title, counts]) => {
    const total = counts.creacion + counts.actualizacion + counts.derogacion;
    
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl p-6 hover:shadow-md transition-all duration-300';
    
    card.innerHTML = `
      <h3 class="text-lg font-bold mb-5" style="color: #121E6C; font-family: 'Montserrat', sans-serif;">${title}</h3>
      
      <div class="space-y-3 mb-5 pb-5" style="border-bottom: 1px solid #e5e7eb;">
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600" style="font-family: 'Montserrat', sans-serif;">Creación</span>
          <span class="text-lg font-semibold" style="color: #121E6C; font-family: 'Montserrat', sans-serif;">${counts.creacion}</span>
        </div>
        
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600" style="font-family: 'Montserrat', sans-serif;">Actualización</span>
          <span class="text-lg font-semibold" style="color: #121E6C; font-family: 'Montserrat', sans-serif;">${counts.actualizacion}</span>
        </div>
        
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600" style="font-family: 'Montserrat', sans-serif;">Derogación</span>
          <span class="text-lg font-semibold" style="color: #121E6C; font-family: 'Montserrat', sans-serif;">${counts.derogacion}</span>
        </div>
      </div>
      
      <div class="flex justify-between items-center">
        <span class="text-lg font-bold text-gray-700" style="font-family: 'Montserrat', sans-serif;">Total</span>
        <span class="text-lg font-bold" style="color: #121E6C; font-family: 'Montserrat', sans-serif;">${total}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

function updateFilterIndicators() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    const column = btn.dataset.column;
    if (columnFilters[column] && columnFilters[column].length > 0) {
      btn.style.color = '#FF2947'; 
    } else {
      btn.style.color = '#121E6C'; 
    }
  });
}

document.getElementById('q2').addEventListener('input', (e) => { 
  q2 = e.target.value; 
  page = 1; 
  renderCambios(); 
});
  
document.getElementById('resetBtn2').addEventListener('click', () => {
  q2 = '';
  columnFilters = {};
  sort2 = 'va'; 
  page = 1;
  document.getElementById('q2').value = '';
  renderCambios();
});

prevBtn.addEventListener('click',()=>{if(page>1){page--;renderCambios();}});
nextBtn.addEventListener('click',()=>{page++;renderCambios();});

// ======== NAVEGACIÓN LATERAL ========
const sideNav = document.getElementById('sideNav');
const heroNavButtons = document.getElementById('heroNavButtons');
const sections = document.querySelectorAll('section[id]');
const heroNavBtns = document.querySelectorAll('.hero-nav-btn');
const sideNavBtns = document.querySelectorAll('#sideNav .side-nav-item');

function toggleSideNav() {
  const floatMonthSelector = document.getElementById('floatMonthSelector');
  if(!heroNavButtons) return;
  const heroRect = heroNavButtons.getBoundingClientRect();
  const shouldShowSideNav = heroRect.bottom < -50;
  
  if (shouldShowSideNav) {
    if(sideNav) sideNav.classList.add('show');
    if (floatMonthSelector) {
      floatMonthSelector.classList.remove('opacity-0', 'pointer-events-none', 'translate-x-full');
      floatMonthSelector.classList.add('opacity-100', 'pointer-events-auto', 'translate-x-0');
    }
  } else {
    if(sideNav) sideNav.classList.remove('show');
    if (floatMonthSelector) {
      floatMonthSelector.classList.add('opacity-0', 'pointer-events-none', 'translate-x-full');
      floatMonthSelector.classList.remove('opacity-100', 'pointer-events-auto', 'translate-x-0');
    }
  }
}

function updateActiveNavButton() {
  let current = '';
  let closestDistance = Infinity;
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionBottom = section.getBoundingClientRect().bottom;
    const sectionHeight = sectionBottom - sectionTop;
    const sectionCenter = sectionTop + (sectionHeight / 2);
    
    if (sectionTop <= window.innerHeight && sectionBottom >= 0) {
      const viewportCenter = window.innerHeight / 2;
      const distanceToCenter = Math.abs(sectionCenter - viewportCenter);
      
      if (distanceToCenter < closestDistance) {
        closestDistance = distanceToCenter;
        current = section.getAttribute('id');
      }
    }
    
    if (sectionTop <= 150 && sectionTop > -100) {
      current = section.getAttribute('id');
    }
  });
  
  heroNavBtns.forEach(btn => {
    const href = btn.getAttribute('href');
    if (href === `#${current}`) {
      btn.style.transform = 'scale(1.05)';
      btn.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    } else {
      btn.style.transform = 'scale(1)';
      btn.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
    }
  });
  
  sideNavBtns.forEach(btn => {
    const href = btn.getAttribute('href');
    if (href === `#${current}`) {
      btn.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
      btn.style.transform = 'scale(1.05)';
    } else {
      btn.style.backgroundColor = '';
      btn.style.transform = 'scale(1)';
    }
  });
}

// ======== BOTÓN VOLVER ARRIBA ========
window.scrollToTop = function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

const scrollToTopFloat = document.getElementById('scrollToTopFloat');
function toggleScrollButton() {
  if (!scrollToTopFloat) return; 
  
  if (window.pageYOffset > 300) {
    scrollToTopFloat.classList.remove('opacity-0', 'pointer-events-none');
    scrollToTopFloat.classList.add('opacity-100', 'pointer-events-auto');
  } else {
    scrollToTopFloat.classList.add('opacity-0', 'pointer-events-none');
    scrollToTopFloat.classList.remove('opacity-100', 'pointer-events-auto');
  }
}

window.addEventListener('scroll', () => {
  toggleSideNav();
  updateActiveNavButton();
  toggleScrollButton();
  
  const dropdown = document.getElementById('filterDropdown');
  if (dropdown && !dropdown.classList.contains('hidden')) {
    hideFilterDropdown();
  }
});

// ======== LÓGICA DEL SELECTOR FLOTANTE DE FECHA ========
let floatTempSelectedYear = currentSelectedYear;
let floatTempSelectedMonth = currentSelectedMonth;

const floatMonthSelectorBtn = document.getElementById('floatMonthSelectorBtn');
const floatMonthDropdown = document.getElementById('floatMonthDropdown');
const floatSelectedMonth = document.getElementById('floatSelectedMonth');
const floatYearSelectBtn = document.getElementById('floatYearSelectBtn');
const floatMonthSelectBtn = document.getElementById('floatMonthSelectBtn');
const floatYearDropdown = document.getElementById('floatYearDropdown');
const floatMonthDropdownCustom = document.getElementById('floatMonthDropdownCustom');
const confirmSelectionBtnFloat = document.getElementById('confirmSelectionBtn');

function updateFloatSelectorUI() {
  if (!currentSelectedMonth || !currentSelectedYear || !monthNames) return;
  const monthName = monthNames[currentSelectedMonth - 1];
  const display = `${monthName} ${currentSelectedYear}`;
  if (floatSelectedMonth) floatSelectedMonth.textContent = display;
}

function toggleFloatMonthDropdown() {
  if (!floatMonthDropdown) return;
  if (floatMonthDropdown.classList.contains('hidden')) {
    showFloatMonthDropdown();
  } else {
    hideFloatMonthDropdown();
  }
}

function showFloatMonthDropdown() {
  if (!floatMonthDropdown) return;
  floatTempSelectedYear = currentSelectedYear;
  floatTempSelectedMonth = currentSelectedMonth;
  populateFloatDropdowns();
  floatMonthDropdown.classList.remove('hidden');
  setTimeout(() => { document.addEventListener('click', handleFloatClickOutside); }, 100);
}

function hideFloatMonthDropdown() {
  if (!floatMonthDropdown) return;
  floatMonthDropdown.classList.add('hidden');
  if (floatYearDropdown) floatYearDropdown.classList.add('hidden');
  if (floatMonthDropdownCustom) floatMonthDropdownCustom.classList.add('hidden');
  
  const floatYearDropIcon = document.getElementById('floatYearDropIcon');
  const floatMonthDropIcon = document.getElementById('floatMonthDropIcon');
  const floatMainDropIcon = document.getElementById('floatMonthDropdownIcon');
  
  if (floatYearDropIcon) floatYearDropIcon.style.transform = 'rotate(0deg)';
  if (floatMonthDropIcon) floatMonthDropIcon.style.transform = 'rotate(0deg)';
  if (floatMainDropIcon) floatMainDropIcon.style.transform = 'rotate(0deg)';
  
  document.removeEventListener('click', handleFloatClickOutside);
}

function handleFloatClickOutside(event) {
  const floatMonthSelector = document.getElementById('floatMonthSelector');
  if (!floatMonthSelector?.contains(event.target)) {
    hideFloatMonthDropdown();
  }
}

function populateFloatDropdowns() {
  populateFloatYearDropdown();
  populateFloatMonthDropdown();
}

function populateFloatYearDropdown() {
  const yearOptions = document.getElementById('floatYearOptions');
  const yearSelectedText = document.getElementById('floatYearSelectedText');
  const availableYears = getAvailableYears();
  
  if (!yearOptions || !yearSelectedText) return;
  
  yearOptions.innerHTML = '';
  yearSelectedText.textContent = floatTempSelectedYear;
  
  availableYears.forEach(year => {
    const option = document.createElement('div');
    option.className = `px-4 py-3 cursor-pointer transition-colors hover:bg-blue-50 ${
      year === floatTempSelectedYear ? 'font-bold' : 'font-medium'
    }`;
    option.style.color = year === floatTempSelectedYear ? '#121E6C' : '#374151';
    option.textContent = year;
    
    option.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      selectFloatYear(year);
    });
    yearOptions.appendChild(option);
  });
}

function populateFloatMonthDropdown() {
  const monthOptions = document.getElementById('floatMonthOptions');
  const monthSelectedText = document.getElementById('floatMonthSelectedText');
  const availableMonths = getAvailableMonthsForYear(floatTempSelectedYear);
  
  if (!monthOptions || !monthSelectedText) return;
  
  monthOptions.innerHTML = '';
  const selectedMonthObj = availableMonths.find(m => m.number === floatTempSelectedMonth);
  const displayText = selectedMonthObj ? selectedMonthObj.name : 'Seleccionar...';
  monthSelectedText.textContent = displayText;
  
  availableMonths.forEach(month => {
    const option = document.createElement('div');
    option.className = `px-4 py-3 cursor-pointer transition-colors hover:bg-blue-50 ${
      month.number === floatTempSelectedMonth ? 'font-bold' : 'font-medium'
    }`;
    option.style.color = month.number === floatTempSelectedMonth ? '#121E6C' : '#374151';
    option.textContent = month.name;
    
    option.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      selectFloatMonth(month.number);
    });
    monthOptions.appendChild(option);
  });
}

function toggleFloatYearDropdown() {
  if (!floatYearDropdown || !floatMonthDropdownCustom) return;
  const floatYearDropIcon = document.getElementById('floatYearDropIcon');
  const floatMonthDropIcon = document.getElementById('floatMonthDropIcon');
  
  floatMonthDropdownCustom.classList.add('hidden');
  if (floatMonthDropIcon) floatMonthDropIcon.style.transform = 'rotate(0deg)';
  
  if (floatYearDropdown.classList.contains('hidden')) {
    floatYearDropdown.classList.remove('hidden');
    if (floatYearDropIcon) floatYearDropIcon.style.transform = 'rotate(180deg)';
  } else {
    floatYearDropdown.classList.add('hidden');
    if (floatYearDropIcon) floatYearDropIcon.style.transform = 'rotate(0deg)';
  }
}

function toggleFloatMonthDropdownInternal() {
  if (!floatYearDropdown || !floatMonthDropdownCustom) return;
  const floatYearDropIcon = document.getElementById('floatYearDropIcon');
  const floatMonthDropIcon = document.getElementById('floatMonthDropIcon');
  
  floatYearDropdown.classList.add('hidden');
  if (floatYearDropIcon) floatYearDropIcon.style.transform = 'rotate(0deg)';
  
  if (floatMonthDropdownCustom.classList.contains('hidden')) {
    floatMonthDropdownCustom.classList.remove('hidden');
    if (floatMonthDropIcon) floatMonthDropIcon.style.transform = 'rotate(180deg)';
  } else {
    floatMonthDropdownCustom.classList.add('hidden');
    if (floatMonthDropIcon) floatMonthDropIcon.style.transform = 'rotate(0deg)';
  }
}

function selectFloatYear(year) {
  floatTempSelectedYear = year;
  const availableMonths = getAvailableMonthsForYear(year);
  const monthNumbers = availableMonths.map(m => m.number);
  if (!monthNumbers.includes(floatTempSelectedMonth)) {
    floatTempSelectedMonth = monthNumbers[monthNumbers.length - 1]; 
  }
  populateFloatDropdowns();
  if (floatYearDropdown) {
    floatYearDropdown.classList.add('hidden');
    const floatYearDropIcon = document.getElementById('floatYearDropIcon');
    if (floatYearDropIcon) floatYearDropIcon.style.transform = 'rotate(0deg)';
  }
}

function selectFloatMonth(monthNumber) {
  floatTempSelectedMonth = monthNumber;
  populateFloatMonthDropdown();
  if (floatMonthDropdownCustom) {
    floatMonthDropdownCustom.classList.add('hidden');
    const floatMonthDropIcon = document.getElementById('floatMonthDropIcon');
    if (floatMonthDropIcon) floatMonthDropIcon.style.transform = 'rotate(0deg)';
  }
}

window.confirmSelectionFloat = function() {
  if (!floatTempSelectedYear || !floatTempSelectedMonth) return;
  currentSelectedMonth = floatTempSelectedMonth;
  currentSelectedYear = floatTempSelectedYear;
  updateFloatSelectorUI();
  hideFloatMonthDropdown();
  
  if (typeof updateAllSections === 'function') {
    updateAllSections();
  }
}

if (floatMonthSelectorBtn) floatMonthSelectorBtn.addEventListener('click', toggleFloatMonthDropdown);
if (floatYearSelectBtn) floatYearSelectBtn.addEventListener('click', toggleFloatYearDropdown);
if (floatMonthSelectBtn) floatMonthSelectBtn.addEventListener('click', toggleFloatMonthDropdownInternal);
if (confirmSelectionBtnFloat) {
  confirmSelectionBtnFloat.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.confirmSelectionFloat();
  });
}

const monthSelector = document.getElementById('monthSelector');
if (monthSelector) monthSelector.addEventListener('click', toggleMonthDropdown);

const confirmSelectionBtn = document.getElementById('confirmSelection');
if (confirmSelectionBtn) confirmSelectionBtn.addEventListener('click', confirmSelection);

initializeDefaultMonth();
tempSelectedYear = currentSelectedYear;
tempSelectedMonth = currentSelectedMonth;

floatTempSelectedYear = currentSelectedYear;
floatTempSelectedMonth = currentSelectedMonth;
updateFloatSelectorUI();

toggleSideNav();
updateActiveNavButton();

// ======== VA por Unidad de Negocio: imágenes fijas + lightbox ========
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');

function extractDriveId(link){
  const m = link.match(/\/d\/([a-zA-Z0-9_-]+)/) || link.match(/[?&]id=([^&]+)/);
  return m ? m[1] : null;
}

function setDriveImage(imgEl, shareLink){
  const id = extractDriveId(shareLink);
  if(!id) return;

  const candidates = [
    `https://drive.google.com/uc?export=view&id=${id}`,
    `https://drive.google.com/uc?export=download&id=${id}`,
    `https://lh3.googleusercontent.com/d/${id}=s2000`,            
    `https://drive.google.com/thumbnail?id=${id}&sz=w10000`      
  ];

  let idx = 0;
  function tryNext(){
    if(idx >= candidates.length) return;
    const url = candidates[idx++];
    imgEl.onerror = () => tryNext();
    imgEl.src = url;
  }
  tryNext();
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(src){
  if(!src) return;
  lightboxImg.src = src;
  lightbox.classList.remove('hidden');
  lightbox.classList.add('flex');
}
function closeLightbox(){
  lightbox.classList.add('hidden');
  lightbox.classList.remove('flex');
  lightboxImg.src = '';
}

if(img1) img1.addEventListener('click', ()=> openLightbox(img1.src));
if(img2) img2.addEventListener('click', ()=> openLightbox(img2.src));
if(lightbox) lightbox.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e)=> { if(e.key === 'Escape') closeLightbox(); });

// ========== CARGA DE DATOS DESDE GOOGLE SHEETS ==========
async function loadDataFromSheets() {
  try {
    if (!window.SheetsConnector) return;
    const data = await window.SheetsConnector.initializeData();
    
    if (data.success) {
      rows = data.automatizaciones;
      cambios = data.procesos;
      
      if (data.valorAgregado && Object.keys(data.valorAgregado).length > 0) {
        valueAddedImages = data.valorAgregado;
      }
      
      initializeDefaultMonth();
      
      floatTempSelectedYear = currentSelectedYear;
      floatTempSelectedMonth = currentSelectedMonth;
      updateFloatSelectorUI();
      populateFloatDropdowns();
      
    } else {
      alert('⚠️ Error cargando datos desde Google Sheets.');
    }
  } catch (error) {
    alert('⚠️ Error de conexión con Google Sheets.');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadDataFromSheets);
} else {
  loadDataFromSheets();
}
