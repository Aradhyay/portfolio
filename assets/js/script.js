/**
 * ===================================================================
 * ARADHYA DWIVEDI - PORTFOLIO INTERACTION SCRIPT
 * Handles Tab Switching, Project Filtering, Modals, Forms & Utilities
 * ===================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------
   * 1. TAB NAVIGATION
   * ------------------------------------------------------------------ */
  const navButtons = document.querySelectorAll('[data-nav-btn]');
  const articles = document.querySelectorAll('[data-article]');

  function switchTab(targetPage) {
    // Update active nav button
    navButtons.forEach(btn => {
      if (btn.dataset.navBtn === targetPage) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update active article section
    articles.forEach(article => {
      if (article.dataset.article === targetPage) {
        article.classList.add('active');
        // Trigger skill progress animation if switching to resume
        if (targetPage === 'resume') {
          animateSkills();
        }
      } else {
        article.classList.remove('active');
      }
    });

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL hash
    if (history.pushState) {
      history.pushState(null, null, `#${targetPage}`);
    } else {
      location.hash = `#${targetPage}`;
    }
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.navBtn;
      switchTab(page);
    });
  });

  // Handle URL hash on load (e.g. site.com/#portfolio)
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && document.querySelector(`[data-article="${initialHash}"]`)) {
    switchTab(initialHash);
  }

  /* ------------------------------------------------------------------
   * 2. MOBILE SIDEBAR TOGGLE
   * ------------------------------------------------------------------ */
  const sidebar = document.querySelector('[data-sidebar]');
  const sidebarBtn = document.querySelector('[data-sidebar-btn]');

  if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      const isExpanded = sidebar.classList.contains('active');
      const textSpan = sidebarBtn.querySelector('span');
      if (textSpan) {
        textSpan.textContent = isExpanded ? 'Hide Contacts' : 'Show Contacts';
      }
      const icon = sidebarBtn.querySelector('ion-icon');
      if (icon) {
        icon.setAttribute('name', isExpanded ? 'chevron-up' : 'chevron-down');
      }
    });
  }

  /* ------------------------------------------------------------------
   * 3. PROJECT FILTERING
   * ------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('[data-filter-btn]');
  const filterSelect = document.querySelector('[data-filter-select]');
  const projectCards = document.querySelectorAll('[data-project-card]');

  function filterProjects(category) {
    const selected = category.toLowerCase().trim();

    projectCards.forEach(card => {
      const cardCategory = (card.dataset.category || '').toLowerCase();
      if (selected === 'all' || cardCategory.includes(selected)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.filterBtn;
      if (filterSelect) filterSelect.value = category;
      filterProjects(category);
    });
  });

  if (filterSelect) {
    filterSelect.addEventListener('change', (e) => {
      const category = e.target.value;
      filterBtns.forEach(btn => {
        if (btn.dataset.filterBtn === category) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
      filterProjects(category);
    });
  }

  /* ------------------------------------------------------------------
   * 4. PROJECT DETAIL MODAL
   * ------------------------------------------------------------------ */
  const modalBackdrop = document.querySelector('[data-modal-backdrop]');
  const modalCloseBtn = document.querySelector('[data-modal-close]');
  const modalImg = document.querySelector('[data-modal-img]');
  const modalTitle = document.querySelector('[data-modal-title]');
  const modalCategory = document.querySelector('[data-modal-category]');
  const modalDesc = document.querySelector('[data-modal-desc]');
  const modalHighlights = document.querySelector('[data-modal-highlights]');
  const modalGithubLink = document.querySelector('[data-modal-github]');
  const modalLiveLink = document.querySelector('[data-modal-live]');

  // Detailed info for projects (can be modified or expanded anytime!)
  const PROJECT_DETAILS = {
    'pneumonia': {
      title: 'Pneumonia Detection System',
      category: 'AI & Medical Computer Vision',
      img: 'assets/images/project-pneumonia.svg',
      desc: 'An end-to-end deep learning diagnostic assistant trained to detect pneumonia from medical chest radiographs using PyTorch and ResNet-18, connected via a zero-leak cross-language IPC architecture.',
      highlights: [
        'Trained PyTorch ResNet-18 on 5,000+ chest X-ray radiographs with specialized medical data augmentation.',
        'Architected high-stability IPC between Python inference backend and Java Swing GUI via ProcessBuilder.',
        'Implemented memory watchdog mechanisms, preventing RAM exhaustion during continuous workstation compute.',
        'Authored academic research documentation and validation methodologies using LaTeX.'
      ],
      github: 'https://github.com/Aradhyay',
      live: '#'
    },
    'scrapy': {
      title: 'Automated Web Extraction Engine & Data Pipeline',
      category: 'Data Engineering & Scraping',
      img: 'assets/images/project-scrapy.svg',
      desc: 'A production-grade web scraping ecosystem engineered in Python using the Scrapy framework to parse structured product data at scale from dynamic e-commerce platforms.',
      highlights: [
        'Built custom spiders navigating multi-tiered DOM hierarchies with robust fault tolerance.',
        'Configured Item Pipelines for automated real-time schema validation, cleaning, and MySQL/JSON persistence.',
        'Integrated rotating user-agents, retry logic, and proxy middleware to bypass aggressive anti-bot protections.',
        'Processed an end-to-end dataset of 1,000+ items with rich attributes (prices, stock, ratings).'
      ],
      github: 'https://github.com/Aradhyay',
      live: '#'
    },
    'mern': {
      title: 'MERN Full-Stack Cloud Application',
      category: 'Web Development',
      img: 'assets/images/project-mern.svg',
      desc: 'A full-stack modern web platform developed during the Edunet Foundation Next Gen Internship (in collaboration with EY GDS & AICTE), featuring authentication, state management, and cloud database persistence.',
      highlights: [
        'Designed modular frontend with React 18, utilizing responsive UI/UX principles and reusable components.',
        'Built RESTful API services using Node.js & Express with JWT authentication and role-based access.',
        'Implemented scalable MongoDB schema design with Mongoose ODM for fast, indexed queries.',
        'Presented project architecture and live demo before EY GDS industry subject-matter experts.'
      ],
      github: 'https://github.com/Aradhyay',
      live: '#'
    },
    'workstation': {
      title: 'High-Performance Workstation GUI & Compute System',
      category: 'Cross-Language Architecture',
      img: 'assets/images/project-workstation.svg',
      desc: 'A specialized computing pipeline utilizing a Dell Precision 5820 workstation to run heavy parallel AI workloads while maintaining an intuitive desktop interface.',
      highlights: [
        'Engineered thread-safe multi-process coordination between Java Swing and Python workers.',
        'Leveraged hardware acceleration to optimize throughput for large batch deep learning inferences.',
        'Designed real-time telemetry display showing memory consumption, compute load, and throughput.',
        'Engineered fail-safe auto-restart mechanisms ensuring zero downtime during prolonged runs.'
      ],
      github: 'https://github.com/Aradhyay',
      live: '#'
    }
  };

  function openProjectModal(projectId) {
    const data = PROJECT_DETAILS[projectId];
    if (!data || !modalBackdrop) return;

    modalImg.src = data.img;
    modalImg.alt = data.title;
    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalDesc.textContent = data.desc;

    // Render highlights
    modalHighlights.innerHTML = '';
    data.highlights.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      modalHighlights.appendChild(li);
    });

    if (modalGithubLink) modalGithubLink.href = data.github;
    if (modalLiveLink) {
      if (data.live && data.live !== '#') {
        modalLiveLink.style.display = 'inline-flex';
        modalLiveLink.href = data.live;
      } else {
        modalLiveLink.style.display = 'none';
      }
    }

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const id = trigger.dataset.openModal;
      openProjectModal(id);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  /* ------------------------------------------------------------------
   * 5. CERTIFICATE VIEWER MODAL
   * ------------------------------------------------------------------ */
  document.querySelectorAll('[data-open-cert]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const certSrc = btn.dataset.openCert;
      const certTitle = btn.dataset.certTitle || 'Certificate Preview';

      modalImg.src = certSrc;
      modalImg.alt = certTitle;
      modalTitle.textContent = certTitle;
      modalCategory.textContent = 'Verified Credential';
      modalDesc.textContent = 'Official credential verification. You can view or download the original credential document.';
      modalHighlights.innerHTML = '';
      if (modalGithubLink) {
        modalGithubLink.style.display = 'none';
      }
      if (modalLiveLink) {
        modalLiveLink.style.display = 'inline-flex';
        modalLiveLink.href = certSrc;
        modalLiveLink.setAttribute('target', '_blank');
        modalLiveLink.textContent = 'Open Full Document';
      }

      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  /* ------------------------------------------------------------------
   * 6. ANIMATED SKILL BARS
   * ------------------------------------------------------------------ */
  function animateSkills() {
    const skillBars = document.querySelectorAll('[data-skill-fill]');
    skillBars.forEach(bar => {
      const targetPercent = bar.dataset.skillFill;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = targetPercent;
      }, 100);
    });
  }

  // Initial animation if starting on resume tab
  if (document.querySelector('[data-article="resume"].active')) {
    animateSkills();
  }

  /* ------------------------------------------------------------------
   * 7. CONTACT FORM & QUICK COPY UTILITIES
   * ------------------------------------------------------------------ */
  const contactForm = document.querySelector('[data-contact-form]');
  const formStatus = document.querySelector('[data-form-status]');
  const toast = document.querySelector('[data-toast]');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // Copy to clipboard handlers
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.dataset.copy;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
        });
      } else {
        // Fallback
        const tempInput = document.createElement('input');
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast(`Copied: ${textToCopy}`);
      }
    });
  });

  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';

      const name = contactForm.querySelector('[name="fullname"]').value.trim();
      const email = contactForm.querySelector('[name="email"]').value.trim();
      const subject = contactForm.querySelector('[name="subject"]').value.trim();
      const message = contactForm.querySelector('[name="message"]').value.trim();

      if (!name || !email || !message) {
        if (formStatus) {
          formStatus.textContent = 'Please fill out all required fields.';
          formStatus.className = 'form-status error';
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
      }

      // Check if Formspree or custom action endpoint is configured
      const action = contactForm.getAttribute('action');
      if (action && action.startsWith('https://formspree.io')) {
        // Send via fetch
        fetch(action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        }).then(response => {
          if (response.ok) {
            formStatus.textContent = 'Thank you! Your message has been sent successfully.';
            formStatus.className = 'form-status success';
            contactForm.reset();
          } else {
            throw new Error('Form response not ok');
          }
        }).catch(() => {
          // Fallback to mailto
          window.location.href = `mailto:aradhy033@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
          formStatus.textContent = 'Opening your email client to send message...';
          formStatus.className = 'form-status success';
        }).finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
        });
      } else {
        // Direct mailto fallback
        window.location.href = `mailto:aradhy033@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
        if (formStatus) {
          formStatus.textContent = 'Opening your email client to send message...';
          formStatus.className = 'form-status success';
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
        contactForm.reset();
      }
    });
  }

});

