// Ano automático no footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Header ao rolar
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Menu mobile
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('site-nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Fechar menu ao clicar em um link (mobile)
  document.querySelectorAll('.site-nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Slider de depoimentos
const track = document.getElementById('testimonial-track');
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
let currentIndex = 0;

function updateSlider() {
  if (!testimonials.length) return;
  const width = testimonials[0].clientWidth;
  track.style.transform = `translateX(-${currentIndex * (width + 40)}px)`;
}

if (nextBtn && prevBtn && track && testimonials.length) {
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateSlider();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateSlider();
  });

  window.addEventListener('resize', updateSlider);
}

// Modal de professores
const modal = document.getElementById('teacherModal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const closeBtn = document.querySelector('.modal .close');

// Todos os "Clique aqui para saber mais"
const moreLinks = document.querySelectorAll('.teacher-more');

moreLinks.forEach((more) => {
  more.addEventListener('click', (e) => {
    e.stopPropagation();

    const card = more.closest('.teacher-card');
    const titleEl = card.querySelector('h4');
    const bioEl = card.querySelector('.teacher-bio');

    // Título do modal
    if (modalTitle && titleEl) {
      modalTitle.textContent = titleEl.innerText;
    }

    // Texto do modal com HTML completo
    if (modalText && bioEl) {
      modalText.innerHTML = bioEl.innerHTML;
    }

    // Abre o modal
    if (modal) {
      modal.style.display = 'flex';
    }
  });
});

// Botão X fecha o modal
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    if (modal) {
      modal.style.display = 'none';
    }
  });
}

// Clicar fora do conteúdo fecha o modal
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Inicializar ícones Lucide quando o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});