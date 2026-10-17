import { profile, projects, files } from '../data/content.js';

export function renderPortfolio() {
  document.title = `${profile.name} — Portofolio`;

  // 1. Sinkronisasi tautan CV & Portofolio PDF
  const cvPath = files.cv || 'assets/files/CV-DianWildanPrimantaraPutra.pdf';
  const cvFileName = 'CV-DianWildanPrimantaraPutra.pdf';

  const cvButtons = [
    document.getElementById('header-cv-btn'),
    document.getElementById('hero-cv-btn')
  ];

  cvButtons.forEach(btn => {
    if (btn) {
      btn.href = cvPath;
      btn.setAttribute('download', cvFileName);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    }
  });

  const portfolioBtn = document.getElementById('hero-portfolio-btn');
  if (portfolioBtn) {
    portfolioBtn.href = files.portfolio || 'print.html';
    portfolioBtn.setAttribute('target', '_blank');
    portfolioBtn.setAttribute('rel', 'noopener noreferrer');
  }

  // 2. Interaksi Navigasi Mobile
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-nav-menu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('is-active');
    });

    // Tutup menu mobile ketika link diklik
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-active');
      });
    });
  }

  // 3. Interaksi Accordion "Detail Informasi" pada Pengalaman & Prestasi
  const detailToggles = document.querySelectorAll('.exp-detail-toggle');
  detailToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (!targetId) return;

      const targetBody = document.getElementById(targetId);
      const chevron = btn.querySelector('.toggle-chevron');

      if (targetBody) {
        const isOpen = targetBody.classList.contains('is-open');

        if (isOpen) {
          targetBody.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
          if (chevron) chevron.classList.remove('rotate-180');
        } else {
          targetBody.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
          if (chevron) chevron.classList.add('rotate-180');
        }
      }
    });
  });

  // 4. Interaksi Modal Pratinjau Sertifikat Hak Cipta & Sertifikat Finalis FESMA
  function setupModal(modalId, openBtnIds, closeBtnIds) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    function open() {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    openBtnIds.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', open);
    });

    closeBtnIds.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', close);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    });
  }

  setupModal('haki-modal', ['open-haki-modal-btn', 'haki-mockup-trigger'], ['modal-haki-close', 'modal-haki-close-btn']);
  setupModal('fesma-modal', ['open-fesma-modal-btn'], ['modal-fesma-close', 'modal-fesma-close-btn']);
  setupModal('i2ac-modal', ['open-i2ac-modal-btn'], ['modal-i2ac-close', 'modal-i2ac-close-btn']);
}

