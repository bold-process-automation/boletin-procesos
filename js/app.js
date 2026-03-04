// ==========================================
// LÓGICA PRINCIPAL (Datos, Filtros, Tablas)
// ==========================================

// Mapeo de enlaces de Coda
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

// Variables Globales
let rows = [];
let cambios = [];
let query = '';
let sortMode = 'fecha';
const cardsEl = document.getElementById('cards');

let currentSelectedMonth;
let currentSelectedYear;
let tempSelectedYear;
let tempSelectedMonth;
let floatTempSelectedYear;
let floatTempSelectedMonth;

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

// Lógica de Fechas Relativas
function getPreviousMonth() {
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth(); 
  if (month === 0) { month = 11; year = year - 1; } 
  else { month = month - 1; }
  const monthNumber = month + 1;
  return { month: monthNumber, year: year, name: monthNames[month], key: `${year}-${String(monthNumber).padStart(2, '0')}`, display: `${monthNames[month]} ${year}` };
}

function getAvailableYears() {
  const years = new Set();
  rows.forEach(r => {
    if (r.mesAsignado) years.add(parseLocalDate(r.mesAsignado).getFullYear());
    else if (r.fecha) years.add(parseLocalDate(r.fecha).getFullYear());
  });
  cambios.forEach(c => { if (c.fecha) years.add(parseLocalDate(c.fecha).getFullYear()); });
  return Array.from(years).sort((a, b) => b - a);
}

function getAvailableMonthsForYear(year) {
  const months = new Set();
  rows.forEach(r => {
    if (r.mesAsignado && parseLocalDate(r.mesAsignado).getFullYear() === year) months.add(parseLocalDate(r.mesAsignado).getMonth() + 1);
    else if (r.fecha && parseLocalDate(r.fecha).getFullYear() === year) months.add(parseLocalDate(r.fecha).getMonth() + 1);
  });
  cambios.forEach(c => {
    if (c.fecha && parseLocalDate(c.fecha).getFullYear() === year) months.add(parseLocalDate(c.fecha).getMonth() + 1);
  });
  return Array.from(months).sort((a, b) => b - a).map(m => ({ number: m, name: monthNames[m - 1], short: monthNames[m - 1].substring(0, 3) }));
}

function getLastAvailableMonth() {
  const allDates = [...rows.map(r => r.fecha), ...cambios.map(c => c.fecha)].filter(f => f && f.includes('-')).map(f => {
    const parts = f.split('-');
    return { year: parseInt(parts[0]), month: parseInt(parts[1]), date: f };
  }).sort((a, b) => b.year - a.year || b.month - a.month);
  
  if (allDates.length > 0) {
    const latest = allDates[0];
    return { month: latest.month, year: latest.year, name: monthNames[latest.month - 1], key: `${latest.year}-${String(latest.month).padStart(2, '0')}`, display: `${monthNames[latest.month - 1]} ${latest.year}` };
  }
  return getPreviousMonth();
}

function initializeDefaultMonth() {
  if (rows.length === 0 && cambios.length === 0) {
    const fb = getPreviousMonth();
    currentSelectedMonth = fb.month; currentSelectedYear = fb.year;
    updateAllSections(); return fb;
  }
  
  const prev = getPreviousMonth();
  const prevKey = `${prev.year}-${String(prev.month).padStart(2, '0')}`;
  const hasData = rows.some(r => {
      if (r.mesAsignado) return `${parseLocalDate(r.mesAsignado).getFullYear()}-${String(parseLocalDate(r.mesAsignado).getMonth() + 1).padStart(2, '0')}` === prevKey;
      if (r.fecha) return `${parseLocalDate(r.fecha).getFullYear()}-${String(parseLocalDate(r.fecha).getMonth() + 1).padStart(2, '0')}` === prevKey;
      return false;
    }) || cambios.some(c => {
      if (c.fecha) return `${parseLocalDate(c.fecha).getFullYear()}-${String(parseLocalDate(c.fecha).getMonth() + 1).padStart(2, '0')}` === prevKey;
      return false;
    });
  
  let selected = hasData ? prev : getLastAvailableMonth();
  currentSelectedMonth = selected.month;
  currentSelectedYear = selected.year;
  if (document.getElementById('selectedMonth')) document.getElementById('selectedMonth').textContent = selected.display;
  
  updateAllSections();
  return selected;
}

// Selector de Fechas Flotante
function updateFloatSelectorUI() {
  if (!currentSelectedMonth || !currentSelectedYear) return;
  const display = `${monthNames[currentSelectedMonth - 1]} ${currentSelectedYear}`;
  const floatSelectedMonth = document.getElementById('floatSelectedMonth');
  if (floatSelectedMonth) floatSelectedMonth.textContent = display;
}

function toggleFloatMonthDropdown() {
  const fmd = document.getElementById('floatMonthDropdown');
  if (!fmd) return;
  if (fmd.classList.contains('hidden')) {
    floatTempSelectedYear = currentSelectedYear;
    floatTempSelectedMonth = currentSelectedMonth;
    populateFloatDropdowns();
    fmd.classList.remove('hidden');
    setTimeout(() => { document.addEventListener('click', handleFloatClickOutside); }, 100);
  } else {
    hideFloatMonthDropdown();
  }
}

function hideFloatMonthDropdown() {
  const fmd = document.getElementById('floatMonthDropdown');
  if (!fmd) return;
  fmd.classList.add('hidden');
  if (document.getElementById('floatYearDropdown')) document.getElementById('floatYearDropdown').classList.add('hidden');
  if (document.getElementById('floatMonthDropdownCustom')) document.getElementById('floatMonthDropdownCustom').classList.add('hidden');
  document.removeEventListener('click', handleFloatClickOutside);
}

function handleFloatClickOutside(event) {
  const fms = document.getElementById('floatMonthSelector');
  if (!fms?.contains(event.target)) hideFloatMonthDropdown();
}

function populateFloatDropdowns() {
  const yearOptions = document.getElementById('floatYearOptions');
  const yearSelectedText = document.getElementById('floatYearSelectedText');
  if (!yearOptions || !yearSelectedText) return;
  
  yearOptions.innerHTML = '';
  yearSelectedText.textContent = floatTempSelectedYear;
  getAvailableYears().forEach(year => {
    const opt = document.createElement('div');
    opt.className = `px-4 py-3 cursor-pointer transition-colors hover:bg-blue-50 ${year === floatTempSelectedYear ? 'font-bold' : 'font-medium'}`;
    opt.style.color = year === floatTempSelectedYear ? '#121E6C' : '#374151';
    opt.textContent = year;
    opt.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); selectFloatYear(year); });
    yearOptions.appendChild(opt);
  });

  const monthOptions = document.getElementById('floatMonthOptions');
  const monthSelectedText = document.getElementById('floatMonthSelectedText');
  if (!monthOptions || !monthSelectedText) return;
  
  monthOptions.innerHTML = '';
  const availMonths = getAvailableMonthsForYear(floatTempSelectedYear);
  const selMonthObj = availMonths.find(m => m.number === floatTempSelectedMonth);
  monthSelectedText.textContent = selMonthObj ? selMonthObj.name : 'Seleccionar...';
  
  availMonths.forEach(month => {
    const opt = document.createElement('div');
    opt.className = `px-4 py-3 cursor-pointer transition-colors hover:bg-blue-50 ${month.number === floatTempSelectedMonth ? 'font-bold' : 'font-medium'}`;
    opt.style.color = month.number === floatTempSelectedMonth ? '#121E6C' : '#374151';
    opt.textContent = month.name;
    opt.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); selectFloatMonth(month.number); });
    monthOptions.appendChild(opt);
  });
}

function selectFloatYear(year) {
  floatTempSelectedYear = year;
  const availMonths = getAvailableMonthsForYear(year).map(m => m.number);
  if (!availMonths.includes(floatTempSelectedMonth)) floatTempSelectedMonth = availMonths[availMonths.length - 1]; 
  populateFloatDropdowns();
  if (document.getElementById('floatYearDropdown')) document.getElementById('floatYearDropdown').classList.add('hidden');
}

function selectFloatMonth(monthNumber) {
  floatTempSelectedMonth = monthNumber;
  populateFloatDropdowns();
  if (document.getElementById('floatMonthDropdownCustom')) document.getElementById('floatMonthDropdownCustom').classList.add('hidden');
}

window.confirmSelectionFloat = function() {
  if (!floatTempSelectedYear || !floatTempSelectedMonth) return;
  currentSelectedMonth = floatTempSelectedMonth;
  currentSelectedYear = floatTempSelectedYear;
  updateFloatSelectorUI();
  hideFloatMonthDropdown();
  updateAllSections();
}

// Renderizado General
function updateAllSections() {
  updateValueAddedImages();
  renderAutoFiltered();
  renderCambios();
}

function updateValueAddedImages() {
  const monthKey = `${currentSelectedYear}-${String(currentSelectedMonth).padStart(2, '0')}`;
  const images = valueAddedImages[monthKey];
  const cardsContainer = document.getElementById('valueAddedCards');
  const noResultsContainer = document.getElementById('noResultsValueAdded');
  
  if (!images) {
    if(cardsContainer) cardsContainer.classList.add('hidden');
    if(noResultsContainer) noResultsContainer.classList.remove('hidden');
    return;
  }
  
  if(cardsContainer) cardsContainer.classList.remove('hidden');
  if(noResultsContainer) noResultsContainer.classList.add('hidden');
  
  const img1 = document.getElementById('img1');
  const img2 = document.getElementById('img2');
  if (img1 && images.sas) setDriveImage(img1, images.sas);
  if (img2 && images.cf) setDriveImage(img2, images.cf);
}

// Automatizaciones
function renderAutoFiltered() {
  if (!currentSelectedMonth || !currentSelectedYear || !cardsEl) return;
  
  const monthKey = `${currentSelectedYear}-${String(currentSelectedMonth).padStart(2, '0')}`;
  const list = rows.filter(r => {
    let belongs = false;
    if (r.mesAsignado) {
      let key = r.mesAsignado.includes('T') || r.mesAsignado.length > 10 ? 
        `${parseLocalDate(r.mesAsignado).getFullYear()}-${String(parseLocalDate(r.mesAsignado).getMonth() + 1).padStart(2, '0')}` : r.mesAsignado;
      if (key === monthKey) belongs = true;
    } else if (r.fecha) {
      let key = `${parseLocalDate(r.fecha).getFullYear()}-${String(parseLocalDate(r.fecha).getMonth() + 1).padStart(2, '0')}`;
      if (key === monthKey) belongs = true;
    }
    if (!belongs) return false;
    return (r.aplicativo + ' ' + r.aplicacion + ' ' + r.proceso + ' ' + r.detalle + ' ' + r.compania).toLowerCase().includes(query.toLowerCase());
  }).sort((a,b) => sortMode === 'fecha' ? (parseLocalDate(b.fecha) - parseLocalDate(a.fecha)) : (Number(b.vaFinal) - Number(a.vaFinal)));
  
  const noResultsDiv = document.getElementById('noResultsAuto');
  cardsEl.innerHTML = '';
  
  if (list.length === 0) {
    if(noResultsDiv) noResultsDiv.classList.remove('hidden');
    return;
  } else {
    if(noResultsDiv) noResultsDiv.classList.add('hidden');
  }
  
  list.forEach(r => {
    const card = document.createElement('div');
    card.className = 'fade-in rounded-3xl card-shadow bg-white transition-all duration-300 min-h-[420px] flex flex-col';
    
    let procesosHtml = '';
    if (r.proceso) {
      const procesos = r.proceso.split('\n').filter(p => p.trim());
      if (procesos.length > 1) {
        procesosHtml = '<div class="text-sm font-medium text-slate-700 mb-2">Procesos involucrados:</div><ul class="text-sm text-slate-600 space-y-1 ml-2">';
        procesos.forEach(p => procesosHtml += `<li class="flex items-start"><span class="text-indigo-500 mr-2 mt-0.5">•</span><span>${p.trim()}</span></li>`);
        procesosHtml += '</ul>';
      } else {
        procesosHtml = `<div class="text-sm font-medium text-slate-700 mb-1">Procesos involucrados:</div><div class="text-sm text-slate-600">${procesos[0]}</div>`;
      }
    }
    
    const detalleText = r.detalle || 'Sin detalles específicos';
    const cardId = `card-${Math.random().toString(36).substr(2, 9)}`; 
    const isLongDescription = detalleText.length > 150; 
    const appColor = getApplicativeColor(r.aplicativo);
    
    card.innerHTML = `
      <div class="h-full flex flex-col">
        <div class="bg-gradient-to-br from-slate-50 to-gray-100 p-6 rounded-t-3xl h-32 flex flex-col justify-between">
          <h3 class="font-bold text-lg text-gray-900 leading-tight line-clamp-2 flex-1">${r.aplicacion || ''}</h3>
          <div class="flex items-center gap-2 mt-2">
            <span class="text-xs px-2 py-1 rounded-md font-bold text-white" style="background-color: ${appColor}; border: 1px solid ${appColor};">${r.aplicativo || ''}</span>
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
                ${isLongDescription ? `<button onclick="window.toggleDescription('${cardId}')" class="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium focus:outline-none" style="color: #121E6C;"><span id="btn-${cardId}">Ver más</span></button>` : ''}
              </div>
            </div>
          </div>
          <div class="bg-gray-50 p-4 rounded-xl mt-auto">
            <div class="grid grid-cols-3 gap-4 text-center">
              <div><div class="text-xs text-gray-500 font-medium mb-1">VA Inicial</div><div class="font-bold text-lg text-gray-700">${Math.round(Number(r.vaInicial || 0))}%</div></div>
              <div><div class="text-xs text-gray-500 font-medium mb-1">Incremento</div><div class="font-bold text-lg" style="color: #6CDCAB">+${Math.round(Number(r.incrementoVA || 0))}%</div></div>
              <div><div class="text-xs text-gray-500 font-medium mb-1">VA Final</div><div class="font-bold text-xl bold-primary">${Math.round(Number(r.vaFinal || 0))}%</div></div>
            </div>
          </div>
        </div>
        <div class="px-6 pb-6">
          <div class="text-xs text-gray-500 flex items-center justify-center gap-2 py-3 bg-gray-50 rounded-xl">
            <img src="./assets/icons/calendar-icon.png" class="w-4 h-4 opacity-60"> Fecha en prod: <span class="font-semibold text-gray-700">${formatDate(r.fecha)}</span>
          </div>
        </div>
      </div>
    `;
    cardsEl.appendChild(card);
  });
}

window.toggleDescription = function(cardId) {
  const desc = document.getElementById(`desc-${cardId}`);
  const btn = document.getElementById(`btn-${cardId}`);
  if (desc.classList.contains('line-clamp-3')) {
    desc.classList.remove('line-clamp-3'); btn.textContent = 'Ver menos';
  } else {
    desc.classList.add('line-clamp-3'); btn.textContent = 'Ver más';
  }
};

// Cambios (Tabla y Filtros)
let q2 = '', sort2 = 'va', page = 1, pageSize = 10, columnFilters = {}, currentFilterColumn = '';

window.showFilterDropdown = function(column, event) {
  event.stopPropagation();
  currentFilterColumn = column;
  const dropdown = document.getElementById('filterDropdown');
  const rect = event.target.getBoundingClientRect();
  dropdown.style.left = Math.min(rect.left, window.innerWidth - 280) + 'px';
  dropdown.style.top = (rect.bottom + 5) + 'px';
  populateFilterOptions(column);
  dropdown.classList.remove('hidden');
  setTimeout(() => { document.addEventListener('click', hideFilterDropdownOutside); }, 100);
}

window.hideFilterDropdown = function() {
  const dropdown = document.getElementById('filterDropdown');
  if(dropdown) dropdown.classList.add('hidden');
  document.removeEventListener('click', hideFilterDropdownOutside);
}

function hideFilterDropdownOutside(event) {
  const dropdown = document.getElementById('filterDropdown');
  if (dropdown && !dropdown.contains(event.target)) window.hideFilterDropdown();
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
    if (value && !values.includes(value)) values.push(value);
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
    label.innerHTML = `<input type="checkbox" value="${value}" ${isSelected ? 'checked' : ''} onchange="window.updateSelectAll()"><span>${value}</span>`;
    filterOptions.appendChild(label);
  });
  document.getElementById('selectAll').checked = allSelected;
  
  columnSearch.oninput = function() {
    const searchTerm = this.value.toLowerCase();
    filterOptions.querySelectorAll('.filter-option').forEach(option => {
      option.style.display = option.textContent.toLowerCase().includes(searchTerm) ? 'flex' : 'none';
    });
  };
}

window.toggleAllFilters = function() {
  const selectAll = document.getElementById('selectAll');
  document.querySelectorAll('#filterOptions input[type="checkbox"]').forEach(cb => {
    if (cb.closest('.filter-option').style.display !== 'none') cb.checked = selectAll.checked;
  });
}

window.updateSelectAll = function() {
  const checkboxes = Array.from(document.querySelectorAll('#filterOptions input[type="checkbox"]'));
  const visible = checkboxes.filter(cb => cb.closest('.filter-option').style.display !== 'none');
  const checked = visible.filter(cb => cb.checked);
  const selectAll = document.getElementById('selectAll');
  selectAll.checked = checked.length === visible.length;
  selectAll.indeterminate = checked.length > 0 && checked.length < visible.length;
}

window.applySortFilter = function(direction) {
  sort2 = currentFilterColumn + (direction === 'asc' ? '-asc' : '');
  page = 1; renderCambios(); window.hideFilterDropdown();
}

window.applyColumnFilter = function() {
  const selected = Array.from(document.querySelectorAll('#filterOptions input[type="checkbox"]:checked')).map(cb => cb.value);
  if (selected.length === document.querySelectorAll('#filterOptions input[type="checkbox"]').length) delete columnFilters[currentFilterColumn];
  else columnFilters[currentFilterColumn] = selected;
  page = 1; renderCambios(); window.hideFilterDropdown();
}

window.clearColumnFilter = function() {
  delete columnFilters[currentFilterColumn];
  page = 1; renderCambios(); window.hideFilterDropdown();
}

function rowCambios(r){
  let va = (!r.valor_agregado || String(r.valor_agregado).trim() === '' || String(r.valor_agregado).toUpperCase() === 'N/A') ? 
    'No aplica' : (isNaN(parseFloat(String(r.valor_agregado).replace('%', ''))) ? r.valor_agregado : `${Math.round(parseFloat(String(r.valor_agregado).replace('%', '')))}%`);
  
  const docHtml = (r.url_proceso || documentLinks[r.documento || '']) ? 
    `<a href="${r.url_proceso || documentLinks[r.documento]}" target="_blank" class="text-bold-primary underline hover:no-underline font-medium">${r.documento || ''}</a>` : (r.documento || '');
  
  const det = r.detalle || '';
  const detHtml = det.length > 150 ? 
    `<div class="relative detalle-cell" style="max-width: 600px;">
       <span class="detalle-preview cursor-pointer">${det.substring(0, 150)}...</span>
       <div class="detalle-tooltip hidden fixed z-[9999] bg-white rounded-xl p-4 text-sm" style="min-width: 300px; max-width: 500px; box-shadow: 0 10px 40px rgba(0,0,0,0.15);">${det}</div>
     </div>` : `<span>${det}</span>`;

  return `
    <tr class="border-b border-slate-100 hover:bg-slate-50">
      <td class="px-3 py-2 font-medium text-slate-800 w-32">${r.codigo}</td>
      <td class="px-3 py-2">${docHtml}</td>
      <td class="px-3 py-2 w-48 text-sm" title="${r.dueno || ''}">${r.dueno || ''}</td>
      <td class="px-3 py-2 text-slate-700 relative">${detHtml}</td>
      <td class="px-3 py-2 w-20 text-center">${r.compania || ''}</td>
      <td class="px-3 py-2 w-32 text-center"><span class="inline-flex text-xs px-3 py-2 rounded-full bg-gray-100 text-gray-500">${r.tipo}</span></td>
      <td class="px-3 py-2 w-28 text-center">${formatDate(r.fecha)}</td>
      <td class="px-3 py-2 w-20 text-center"><span class="font-bold" style="color: ${getVAColor(r.valor_agregado)};">${va}</span></td>
    </tr>`;
}

function getFilteredCambios(){ 
  return cambios.filter(r => {
    if (currentSelectedMonth && currentSelectedYear && r.fecha) {
      const d = parseLocalDate(r.fecha);
      if (d.getMonth() + 1 !== currentSelectedMonth || d.getFullYear() !== currentSelectedYear) return false;
    }
    if (q2 && !(r.codigo + ' ' + r.documento + ' ' + (r.dueno || '') + ' ' + (r.detalle || '') + ' ' + (r.compania || '') + ' ' + (r.valor_agregado || '')).toLowerCase().includes(q2.toLowerCase())) return false;
    
    for (const [col, filters] of Object.entries(columnFilters)) {
      if (filters && filters.length > 0) {
        let v = '';
        switch(col) {
          case 'codigo': v = r.codigo || ''; break;
          case 'documento': v = r.documento || ''; break;
          case 'dueno': v = r.dueno || ''; break;
          case 'detalle': v = r.detalle || ''; break;
          case 'compania': v = r.compania || ''; break;
          case 'tipo': v = r.tipo || ''; break;
          case 'fecha': v = formatDate(r.fecha) || ''; break;
          case 'va': v = r.valor_agregado || 'N/A'; break;
        }
        if (!filters.includes(v)) return false;
      }
    }
    return true;
  }).sort((a, b) => {
    if (sort2 === 'fecha') return parseLocalDate(b.fecha) - parseLocalDate(a.fecha);
    if (sort2 === 'fecha-asc') return parseLocalDate(a.fecha) - parseLocalDate(b.fecha);
    if (sort2 === 'va') return (parseFloat(String(b.valor_agregado).replace('%', '')) || 0) - (parseFloat(String(a.valor_agregado).replace('%', '')) || 0);
    if (sort2 === 'va-asc') return (parseFloat(String(a.valor_agregado).replace('%', '')) || 0) - (parseFloat(String(b.valor_agregado).replace('%', '')) || 0);
    // Otros ordenamientos...
    return 0;
  });
}

function renderCambios(){ 
  const all = getFilteredCambios(); 
  const totalPages = Math.max(1, Math.ceil(all.length / pageSize)); 
  if (page > totalPages) page = totalPages; 
  const list = all.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
  
  const tableCont = document.querySelector('.overflow-x-auto');
  const noRes = document.getElementById('noResultsCambios');
  const tbody = document.getElementById('tbodyCambios');
  
  if (all.length === 0) {
    if(tableCont) tableCont.style.display = 'none';
    if(noRes) noRes.classList.remove('hidden');
    if(document.getElementById('countCambios')) document.getElementById('countCambios').textContent = '0 resultados';
    if(document.getElementById('pageInfo')) document.getElementById('pageInfo').innerHTML = '';
  } else {
    if(tableCont) tableCont.style.display = 'block';
    if(noRes) noRes.classList.add('hidden');
    if(tbody) tbody.innerHTML = list.map(rowCambios).join(''); 
    if(document.getElementById('countCambios')) document.getElementById('countCambios').textContent = all.length + ' resultados';
    
    const pageInfo = document.getElementById('pageInfo');
    if(pageInfo) {
      pageInfo.innerHTML = '';
      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = `px-3 py-2 rounded-lg font-bold transition-all duration-200 ${i === page ? 'bg-[#121E6C] text-white' : 'bg-white text-[#121E6C] border border-slate-200 hover:bg-slate-50'}`;
        btn.onclick = () => { page = i; renderCambios(); };
        pageInfo.appendChild(btn);
      }
    }
  }
  
  updateSummaryTable(); 
}

function updateSummaryTable() {
  const types = {
    'Procesos': { p: /-PR-/i, c: 0, a: 0, d: 0 },
    'Instructivos': { p: /-IN-/i, c: 0, a: 0, d: 0 },
    'Políticas': { p: [/-PO-/i, /-MA-/i, /-CO-/i], c: 0, a: 0, d: 0 }
  };
  
  cambios.forEach(r => {
    if (r.fecha && currentSelectedMonth && currentSelectedYear) {
      const d = parseLocalDate(r.fecha);
      if (d.getMonth() + 1 === currentSelectedMonth && d.getFullYear() === currentSelectedYear) {
        const c = r.codigo || '', t = (r.tipo || '').toLowerCase();
        let target = types.Procesos.p.test(c) ? types.Procesos : (types.Instructivos.p.test(c) ? types.Instructivos : (types.Políticas.p.some(pat => pat.test(c)) ? types.Políticas : null));
        if(target) {
          if (t.includes('creaci')) target.c++;
          else if (t.includes('actualiz')) target.a++;
          else if (t.includes('derog')) target.d++;
        }
      }
    }
  });
  
  const container = document.getElementById('summaryCards');
  if(container) {
    container.innerHTML = Object.entries(types).map(([title, cnt]) => `
      <div class="bg-white rounded-xl p-6 hover:shadow-md transition-all duration-300">
        <h3 class="text-lg font-bold mb-5" style="color: #121E6C;">${title}</h3>
        <div class="space-y-3 mb-5 pb-5 border-b border-gray-200">
          <div class="flex justify-between"><span class="text-sm text-gray-600">Creación</span><span class="font-semibold text-[#121E6C]">${cnt.c}</span></div>
          <div class="flex justify-between"><span class="text-sm text-gray-600">Actualización</span><span class="font-semibold text-[#121E6C]">${cnt.a}</span></div>
          <div class="flex justify-between"><span class="text-sm text-gray-600">Derogación</span><span class="font-semibold text-[#121E6C]">${cnt.d}</span></div>
        </div>
        <div class="flex justify-between font-bold"><span class="text-gray-700">Total</span><span class="text-[#121E6C]">${cnt.c + cnt.a + cnt.d}</span></div>
      </div>`).join('');
  }
}

// Event Listeners y Carga Inicial
document.addEventListener('DOMContentLoaded', () => {
  // Listeners de búsqueda Auto
  const qInput = document.getElementById('q');
  if(qInput) qInput.addEventListener('input',(e)=>{query=e.target.value;renderAutoFiltered();});
  const resetBtn = document.getElementById('resetBtn');
  if(resetBtn) resetBtn.addEventListener('click',()=>{query=''; document.getElementById('q').value=''; renderAutoFiltered();});
  
  // Listeners de búsqueda Cambios
  const q2Input = document.getElementById('q2');
  if(q2Input) q2Input.addEventListener('input', (e) => { q2 = e.target.value; page = 1; renderCambios(); });
  const resetBtn2 = document.getElementById('resetBtn2');
  if(resetBtn2) resetBtn2.addEventListener('click', () => { q2 = ''; columnFilters = {}; page = 1; document.getElementById('q2').value = ''; renderCambios(); });
  
  const prevBtn = document.getElementById('prevPage');
  if(prevBtn) prevBtn.addEventListener('click',()=>{if(page>1){page--;renderCambios();}});
  const nextBtn = document.getElementById('nextPage');
  if(nextBtn) nextBtn.addEventListener('click',()=>{page++;renderCambios();});
  
  // Listeners de fechas
  const floatBtn = document.getElementById('floatMonthSelectorBtn');
  if(floatBtn) floatBtn.addEventListener('click', toggleFloatMonthDropdown);
  const confirmFloat = document.getElementById('confirmSelectionBtn');
  if(confirmFloat) confirmFloat.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); window.confirmSelectionFloat(); });
  
  loadDataFromSheets();
});

async function loadDataFromSheets() {
  try {
    if (!window.SheetsConnector) return;
    const data = await window.SheetsConnector.initializeData();
    if (data.success) {
      rows = data.automatizaciones;
      cambios = data.procesos;
      if (data.valorAgregado && Object.keys(data.valorAgregado).length > 0) valueAddedImages = data.valorAgregado;
      
      initializeDefaultMonth();
      floatTempSelectedYear = currentSelectedYear;
      floatTempSelectedMonth = currentSelectedMonth;
      updateFloatSelectorUI();
    }
  } catch (error) {
    console.error('Error cargando datos', error);
  }
}
