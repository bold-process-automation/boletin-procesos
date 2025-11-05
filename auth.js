// Google Sign-In Authentication Module
// Validates users by email domain

const ALLOWED_DOMAINS = ['bold.co', 'boldcf.co'];
const GOOGLE_CLIENT_ID = '470634824045-g3big92p2sndrk0nf97omjg3otn8oc2s.apps.googleusercontent.com';

let currentUser = null;

// Initialize Google Sign-In
function initGoogleAuth() {
  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleCredentialResponse,
    auto_select: false,
    cancel_on_tap_outside: true
  });

  // Render the sign-in button
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

  // Check if user was previously authenticated
  checkExistingSession();
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
      
      // Store session
      sessionStorage.setItem('boldUser', JSON.stringify(currentUser));
      
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

// Check if user has existing valid session
function checkExistingSession() {
  const storedUser = sessionStorage.getItem('boldUser');
  if (storedUser) {
    try {
      currentUser = JSON.parse(storedUser);
      grantAccess();
    } catch (error) {
      sessionStorage.removeItem('boldUser');
    }
  }
}

// Grant access to dashboard
function grantAccess() {
  console.log('Acceso concedido a:', currentUser.email);
  
  // Hide login screen
  document.getElementById('loginScreen').style.display = 'none';
  
  // Show main content
  document.getElementById('mainContent').style.display = 'block';
  
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
      <div style="display: flex; align-items: center; gap: 12px; padding: 12px 24px; background-color: rgba(255, 255, 255, 0.1); border-radius: 8px;">
        <img src="${currentUser.picture}" alt="${currentUser.name}" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid white;" />
        <div style="text-align: left;">
          <div style="font-weight: 600; font-size: 14px;">${currentUser.name}</div>
          <div style="font-size: 12px; opacity: 0.9;">${currentUser.email}</div>
        </div>
        <button onclick="signOut()" style="margin-left: 12px; background-color: rgba(255, 255, 255, 0.2); color: white; padding: 6px 12px; border: 1px solid white; border-radius: 6px; cursor: pointer; font-size: 12px;">
          Cerrar sesión
        </button>
      </div>
    `;
  }
}

// Sign out
function signOut() {
  sessionStorage.removeItem('boldUser');
  currentUser = null;
  location.reload();
}

// Initialize on page load
window.addEventListener('load', () => {
  // Wait for Google API to load
  if (typeof google !== 'undefined') {
    initGoogleAuth();
  } else {
    console.error('Google API no cargada');
  }
});
