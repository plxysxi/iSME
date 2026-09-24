/**
 * ==============================================================================
 * MAIN.JS - สคริปต์หลักควบคุมการทำงานของเว็บไซต์สมาพันธ์เอสเอ็มอีไทยสากล
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initHeroSlider();
  initBackToTop();
  initNewsFilter();
  initFormHandlers();
  initActiveNav();
});

/**
 * 1. ควบคุมเมนูมือถือ (Mobile Drawer Menu)
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const closeBtn = document.getElementById('mobileMenuClose');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileOverlay');

  if (!toggleBtn || !drawer || !overlay) return;

  function openMenu() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
}

/**
 * 2. Sticky Header Effects
 */
function initHeaderScroll() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * 3. Hero Banner Slider (รองรับทั้งแบบวนอัตโนมัติและคลิกเลือก)
 */
function initHeroSlider() {
  const slides = document.querySelectorAll('.slide-item');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const prevBtn = document.querySelector('.slider-control-prev');
  const nextBtn = document.querySelector('.slider-control-next');

  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval = null;

  function goToSlide(index) {
    slides.forEach((s) => s.classList.remove('active'));
    dots.forEach((d) => d.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToSlide(idx);
      resetInterval();
    });
  });

  function startInterval() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function resetInterval() {
    if (slideInterval) clearInterval(slideInterval);
    startInterval();
  }

  startInterval();
}

/**
 * 4. ปุ่มเลื่อนกลับขึ้นด้านบน (Back to Top)
 */
function initBackToTop() {
  const topBtn = document.getElementById('backToTopBtn');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      topBtn.classList.add('show');
    } else {
      topBtn.classList.remove('show');
    }
  });

  topBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 5. ตัวกรองหมวดหมู่ข่าวสาร (News Category Filter)
 */
function initNewsFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const newsCards = document.querySelectorAll('.news-item-col');

  if (!filterTabs.length || !newsCards.length) return;

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-filter');

      newsCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCategory === filterVal) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 6. ไฮไลท์เมนูหน้าปัจจุบัน (Active Nav Link)
 */
function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/**
 * 7. จัดการฟอร์มส่งข้อมูล (Contact & Register Forms)
 */
function initFormHandlers() {
  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('ขอบคุณสำหรับข้อความของท่าน! เจ้าหน้าที่สมาพันธ์เอสเอ็มอีไทยสากลจะติดต่อกลับโดยเร็วที่สุด');
      contactForm.reset();
    });
  }

  // Registration Form
  const regForm = document.getElementById('memberRegisterForm');
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const companyName = document.getElementById('regCompany') ? document.getElementById('regCompany').value : 'ท่าน';
      alert(`การลงทะเบียนสำเร็จ!\n\nสมาพันธ์เอสเอ็มอีไทยสากลได้รับข้อมูลใบสมัครของ "${companyName}" เรียบร้อยแล้ว\nเจ้าหน้าที่จะตรวจสอบเอกสารและแจ้งผลการอนุมัติทางอีเมลภายใน 1-2 วันทำการ`);
      regForm.reset();
    });
  }
}
