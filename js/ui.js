// ==========================================
// INTERFAZ DE USUARIO (Navegación, Scroll, Lightbox)
// ==========================================

// Elementos de navegación
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

// Botón Volver Arriba
window.scrollToTop = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
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

// Evento Global de Scroll
window.addEventListener('scroll', () => {
  toggleSideNav();
  updateActiveNavButton();
  toggleScrollButton();
  
  const dropdown = document.getElementById('filterDropdown');
  if (dropdown && !dropdown.classList.contains('hidden')) {
    if(typeof window.hideFilterDropdown === 'function') window.hideFilterDropdown();
  }
});

// Lightbox (Imágenes Ampliadas)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

window.openLightbox = function(src){
  if(!src) return;
  lightboxImg.src = src;
  lightbox.classList.remove('hidden');
  lightbox.classList.add('flex');
}
window.closeLightbox = function(){
  lightbox.classList.add('hidden');
  lightbox.classList.remove('flex');
  lightboxImg.src = '';
}

const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
if(img1) img1.addEventListener('click', ()=> window.openLightbox(img1.src));
if(img2) img2.addEventListener('click', ()=> window.openLightbox(img2.src));
if(lightbox) lightbox.addEventListener('click', window.closeLightbox);
document.addEventListener('keydown', (e)=> { if(e.key === 'Escape') window.closeLightbox(); });
