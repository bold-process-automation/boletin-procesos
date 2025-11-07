// Google Sign-In Authentication Module
// Validates users by email domain

// ⚠️ AUTENTICACIÓN TEMPORALMENTE DESACTIVADA
// Para reactivar: cambia AUTH_DISABLED a false
const AUTH_DISABLED = false;

// Duración de la sesión persistente (horas)
const SESSION_DURATION_HOURS = 24;
const LOCAL_SESSION_KEY = 'boldUserSession';

const ALLOWED_DOMAINS = ['bold.co', 'boldcf.co'];
const GOOGLE_CLIENT_ID = '470634824045-g3big92p2sndrk0nf97omjg3otn8oc2s.apps.googleusercontent.com';

let currentUser = null;

// Initialize Google Sign-In
function initGoogleAuth() {
  // Hide loading skeleton and show login screen
  const loadingSkeleton = document.getElementById('loadingSkeleton');
  const loginScreen = document.getElementById('loginScreen');
  if (loadingSkeleton) loadingSkeleton.style.display = 'none';
  if (loginScreen) loginScreen.style.display = 'flex';
  
  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleCredentialResponse,
    auto_select: true, // habilita One Tap para reingreso sin fricción
    cancel_on_tap_outside: true
  });

  // Prompt One Tap si no hay sesión activa
  if (!getPersistedSession()) {
    try { google.accounts.id.prompt(); } catch (e) {}
  }

  // Render the sign-in button (fallback manual)
  google.accounts.id.renderButton(
    document.getElementById('googleSignInButton'),
    { 
      theme: 'filled_blue',
      size: 'large',
      text: 'signin_with',
      shape: 'rectangular',
      width: 300
    }
  );
}

// Handle Google Sign-In response
function handleCredentialResponse(response) {
  try {
    // Decode JWT token to get user info
    const userInfo = parseJwt(response.credential);
    const email = userInfo.email;
    const domain = email.split('@')[1];

    console.log('Usuario intentando acceder:', email);

    // Validate domain
    if (ALLOWED_DOMAINS.includes(domain)) {
      currentUser = {
        email: email,
        name: userInfo.name,
        picture: userInfo.picture
      };
      
      // Store session (persistente)
      persistSession(currentUser);
      
      // Grant access
      grantAccess();
    } else {
      // Deny access
      denyAccess(email);
    }
  } catch (error) {
    console.error('Error procesando autenticación:', error);
    showError('Error al procesar la autenticación. Por favor intenta de nuevo.');
  }
}

// Parse JWT token
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

// Persist session in localStorage with expiration
function persistSession(user){
  const expAt = Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000;
  const data = { user, expAt };
  try { localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(data)); } catch (_) {}
}

function getPersistedSession(){
  try {
    const dataStr = localStorage.getItem(LOCAL_SESSION_KEY);
    if (!dataStr) return null;
    const data = JSON.parse(dataStr);
    if (!data || !data.expAt || !data.user) return null;
    if (Date.now() > data.expAt) {
      localStorage.removeItem(LOCAL_SESSION_KEY);
      return null;
    }
    return data.user;
  } catch (_) { return null; }
}

// Check if user has existing valid session
function checkExistingSession() {
  const persisted = getPersistedSession();
  if (persisted) {
    currentUser = persisted;
    grantAccess();
    return true;
  }
  return false;
}

// Grant access to dashboard
function grantAccess() {
  console.log('Acceso concedido a:', currentUser.email);
  
  // Hide login screen and loading skeleton
  const loginScreen = document.getElementById('loginScreen');
  const loadingSkeleton = document.getElementById('loadingSkeleton');
  const mainContent = document.getElementById('mainContent');
  
  if (loginScreen) loginScreen.style.display = 'none';
  if (loadingSkeleton) loadingSkeleton.style.display = 'none';
  if (mainContent) mainContent.style.display = 'block';
  
  // Show user info in header
  displayUserInfo();
}

// Deny access
function denyAccess(email) {
  console.log('Acceso denegado a:', email);
  
  // Show error message
  const errorDiv = document.getElementById('accessDenied');
  errorDiv.style.display = 'block';
  errorDiv.innerHTML = `
    <div style="background-color: #fee2e2; border: 2px solid #ef4444; border-radius: 12px; padding: 24px; max-width: 400px; margin: 20px auto;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <svg style="color: #dc2626; width: 24px; height: 24px;" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
        <h3 style="color: #991b1b; margin: 0; font-size: 18px; font-weight: 600;">Acceso Denegado</h3>
      </div>
      <p style="color: #7f1d1d; margin: 0; line-height: 1.5;">
        <strong>${email}</strong><br>
        No tienes acceso a esta información. Solo usuarios con correo corporativo de Bold pueden acceder.
      </p>
      <button onclick="tryAgain()" style="margin-top: 16px; background-color: #121f6c; color: white; padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600;">
        Intentar con otra cuenta
      </button>
    </div>
  `;
  
  // Hide sign-in button
  document.getElementById('googleSignInButton').style.display = 'none';
}

// Show generic error
function showError(message) {
  const errorDiv = document.getElementById('accessDenied');
  errorDiv.style.display = 'block';
  errorDiv.innerHTML = `
    <div style="background-color: #fee2e2; border: 2px solid #ef4444; border-radius: 12px; padding: 24px; max-width: 400px; margin: 20px auto;">
      <p style="color: #7f1d1d; margin: 0;">${message}</p>
    </div>
  `;
}

// Try again with different account
function tryAgain() {
  location.reload();
}

// Display user info in header
function displayUserInfo() {
  if (!currentUser) return;
  
  const userInfoDiv = document.getElementById('userInfo');
  if (userInfoDiv) {
    userInfoDiv.innerHTML = `
      <div class="relative">
        <button id="userMenuBtn" class="flex items-center" style="background: none; border: none; cursor: pointer; padding: 0;" title="${currentUser.name}">
          <img src="${currentUser.picture}" alt="${currentUser.name}" 
               style="width: 44px; height: 44px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.15); transition: transform 0.2s;"
               onmouseover="this.style.transform='scale(1.05)'" 
               onmouseout="this.style.transform='scale(1)'" />
        </button>
        <div id="userDropdown" class="hidden absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50" style="top: 100%;">
          <div class="p-4 border-b border-gray-100">
            <div class="font-semibold text-gray-800 text-sm">${currentUser.name}</div>
            <div class="text-xs text-gray-500 mt-1">${currentUser.email}</div>
          </div>
          <button onclick="signOut()" class="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-b-xl transition-colors font-medium">
            🚪 Cerrar sesión
          </button>
        </div>
      </div>
    `;
    
    // Toggle dropdown
    setTimeout(() => {
      const btn = document.getElementById('userMenuBtn');
      const dropdown = document.getElementById('userDropdown');
      if (btn && dropdown) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          dropdown.classList.toggle('hidden');
        });
        document.addEventListener('click', () => dropdown.classList.add('hidden'));
      }
    }, 100);
  }
}

// Sign out
function signOut() {
  try { sessionStorage.removeItem('boldUser'); } catch(_){}
  try { localStorage.removeItem(LOCAL_SESSION_KEY); } catch(_){}
  try { if (google?.accounts?.id?.disableAutoSelect) google.accounts.id.disableAutoSelect(); } catch(_){}
  currentUser = null;
  location.reload();
}

// Initialize on page load
window.addEventListener('load', () => {
  // ⚠️ Si la autenticación está desactivada, dar acceso directo
  if (AUTH_DISABLED) {
    console.log('⚠️ AUTENTICACIÓN DESACTIVADA - Acceso abierto para todos');
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
    return;
  }

  // Primero: intentar usar sesión persistida sin depender de Google
  if (checkExistingSession()) return;
  
  // Luego: esperar la API de Google para permitir One Tap / botón
  const bootstrap = () => {
    if (typeof google !== 'undefined' && google?.accounts?.id) {
      initGoogleAuth();
    } else {
      // Reintentar por un corto período (hasta 2s)
      let retries = 0;
      const t = setInterval(() => {
        retries++;
        if (typeof google !== 'undefined' && google?.accounts?.id) {
          clearInterval(t);
          initGoogleAuth();
        } else if (retries > 20) {
          clearInterval(t);
          console.error('Google API no cargada');
        }
      }, 100);
    }
  };

  bootstrap();
});
