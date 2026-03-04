// ==========================================
// UTILIDADES GLOBALES (Fechas, Colores, Drive)
// ==========================================

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Parsear fechas
function parseLocalDate(dateStr) {
  if (!dateStr) return new Date(1970, 0, 1);
  const str = String(dateStr).trim();
  
  if (str.match(/^\d{4}[-\/]\d{1,2}[-\/]\d{1,2}$/)) {
    const parts = str.split(/[-\/]/).map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  if (str.match(/^\d{1,2}[-\/]\d{1,2}[-\/]\d{4}$/)) {
    const parts = str.split(/[-\/]/).map(Number);
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }
  
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? new Date(1970, 0, 1) : date;
}

function formatDate(ymd){ 
  const d = parseLocalDate(ymd); 
  return d.toLocaleDateString('es-CO',{day:'2-digit',month:'2-digit',year:'2-digit'}); 
}

// Colores UI
const getApplicativeColor = (aplicativo) => {
  const app = (aplicativo || '').toUpperCase();
  switch(app) {
    case 'APPIAN': return '#0A53A5';
    case 'DAPTA': return '#1B8959';
    case 'N8N': return '#FF2947';
    default: return '#6B7280';
  }
};

function getVAColor(valorAgregado) {
  if (!valorAgregado || String(valorAgregado).trim() === '' || String(valorAgregado).toUpperCase() === 'N/A') {
    return '#606060'; 
  }
  const numValue = parseFloat(String(valorAgregado).replace('%', '')) || 0;
  if (numValue >= 60) return '#6CDCAB'; 
  else if (numValue >= 31) return '#FFC217'; 
  else return '#C31A2F'; 
}

// Imágenes de Drive
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
