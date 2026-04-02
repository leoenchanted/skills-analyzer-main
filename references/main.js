/**
 * Skills Dashboard - Main JavaScript
 * Handles all interactivity: navigation, search, progress bar, modals
 */

(function() {
  'use strict';

  /* ── HELPERS ──────────────────────────────────────────────── */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  /* ── NAVIGATION ───────────────────────────────────────────── */
  const navBtns = $$('.nav-btn');
  const sections = $$('.section');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSection = btn.dataset.section;

      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      sections.forEach(s => s.classList.remove('active'));
      const target = $('#' + targetSection);
      if (target) {
        target.classList.add('active');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Update URL hash without jumping
      history.pushState(null, null, '#' + targetSection);
    });
  });

  // Handle initial hash
  if (window.location.hash) {
    const hash = window.location.hash.slice(1);
    const btn = $(`.nav-btn[data-section="${hash}"]`);
    if (btn) btn.click();
  }

  /* ── COURSE PROGRESS BAR ──────────────────────────────────── */
  const courseProgress = $('#courseProgress');
  const progressFill = $('#progressFill');
  const progressTooltip = $('#progressTooltip');
  let isDragging = false;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressFill.style.width = progress + '%';
    progressTooltip.textContent = Math.round(progress) + '%';
    return progress;
  }

  function setProgressFromPosition(clientX) {
    const rect = courseProgress.getBoundingClientRect();
    const percent = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: (percent / 100) * docHeight,
      behavior: 'auto'
    });
  }

  // Update on scroll
  window.addEventListener('scroll', () => {
    if (!isDragging) updateProgress();
  }, { passive: true });

  // Click to jump
  courseProgress.addEventListener('click', (e) => {
    setProgressFromPosition(e.clientX);
  });

  // Drag functionality
  courseProgress.addEventListener('mousedown', (e) => {
    isDragging = true;
    courseProgress.classList.add('dragging');
    setProgressFromPosition(e.clientX);
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      e.preventDefault();
      setProgressFromPosition(e.clientX);
    }
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      courseProgress.classList.remove('dragging');
    }
  });

  // Touch support
  courseProgress.addEventListener('touchstart', (e) => {
    isDragging = true;
    courseProgress.classList.add('dragging');
    setProgressFromPosition(e.touches[0].clientX);
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (isDragging) {
      setProgressFromPosition(e.touches[0].clientX);
    }
  }, { passive: true });

  document.addEventListener('touchend', () => {
    isDragging = false;
    courseProgress.classList.remove('dragging');
  });

  // Initialize
  updateProgress();

  /* ── SEARCH FUNCTIONALITY ─────────────────────────────────── */
  const searchBtn = $('#searchBtn');
  const searchModal = $('#searchModal');
  const searchModalClose = $('#searchModalClose');
  const searchInput = $('#searchInput');
  const searchClear = $('#searchClear');
  const searchResults = $('#searchResults');
  const searchStats = $('#searchStats');
  const resultCount = $('#resultCount');

  // Build search index from skills data
  let searchIndex = [];

  function buildSearchIndex() {
    if (typeof skillsData === 'undefined') return;

    searchIndex = skillsData.map((skill, index) => ({
      id: index,
      name: skill.name,
      description: skill.description,
      triggers: skill.triggers?.join(' ') || '',
      features: skill.features?.join(' ') || '',
      section: skill.section || 'details'
    }));
  }

  // Wait for data.js to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildSearchIndex);
  } else {
    buildSearchIndex();
  }

  function openSearchModal() {
    searchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    searchInput.focus();
    performSearch(searchInput.value);
  }

  function closeSearchModal() {
    searchModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  searchBtn.addEventListener('click', openSearchModal);
  searchModalClose.addEventListener('click', closeSearchModal);

  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearchModal();
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearchModal();
    }
    // Escape
    if (e.key === 'Escape' && searchModal.classList.contains('active')) {
      closeSearchModal();
    }
  });

  function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
  }

  function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function performSearch(query) {
    if (!query.trim()) {
      searchResults.innerHTML = '<div class="search-no-results">输入关键词开始搜索...</div>';
      searchStats.style.display = 'none';
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results = searchIndex.filter(item =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.triggers.toLowerCase().includes(lowerQuery) ||
      item.features.toLowerCase().includes(lowerQuery)
    );

    resultCount.textContent = results.length;
    searchStats.style.display = results.length > 0 ? 'block' : 'none';

    if (results.length === 0) {
      searchResults.innerHTML = `<div class="search-no-results">未找到包含 "${escapeHtml(query)}" 的结果</div>`;
      return;
    }

    searchResults.innerHTML = results.map(result => `
      <div class="search-result-item" data-section="${result.section}">
        <div class="search-result-title">${highlightMatch(result.name, query)}</div>
        <div class="search-result-preview">${highlightMatch(result.description.slice(0, 150), query)}</div>
      </div>
    `).join('');

    $$('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const section = item.dataset.section;
        closeSearchModal();

        const btn = $(`.nav-btn[data-section="${section}"]`);
        if (btn) btn.click();
      });
    });
  }

  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => performSearch(e.target.value), 200);
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
    performSearch('');
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') e.preventDefault();
  });

  /* ── SUMMARY MODAL ────────────────────────────────────────── */
  const summaryBtn = $('#summaryBtn');
  const summaryModal = $('#summaryModal');
  const modalClose = $('#modalClose');
  const copyBtn = $('#copyBtn');

  function openSummaryModal() {
    summaryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSummaryModal() {
    summaryModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  summaryBtn.addEventListener('click', openSummaryModal);
  modalClose.addEventListener('click', closeSummaryModal);

  summaryModal.addEventListener('click', (e) => {
    if (e.target === summaryModal) closeSummaryModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && summaryModal.classList.contains('active')) {
      closeSummaryModal();
    }
  });

  // Copy to clipboard
  copyBtn.addEventListener('click', () => {
    if (typeof skillsData === 'undefined') return;

    const summary = skillsData.map(s =>
      `📌 ${s.name}\n${s.description}\n触发词: ${s.triggers?.join(', ') || 'N/A'}\n`
    ).join('\n');

    const fullText = `📊 Skills 分析总结\n\n共 ${skillsData.length} 个 skills:\n\n${summary}`;

    navigator.clipboard.writeText(fullText).then(() => {
      const original = copyBtn.innerHTML;
      copyBtn.innerHTML = '<span>✓</span> 已复制';
      copyBtn.style.background = 'var(--color-success)';
      setTimeout(() => {
        copyBtn.innerHTML = original;
        copyBtn.style.background = '';
      }, 2000);
    }).catch(() => {
      alert('复制失败，请手动复制');
    });
  });

  /* ── SMOOTH SCROLL FOR ANCHORS ───────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = $(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ── INTERSECTION OBSERVER FOR ANIMATIONS ─────────────────── */
  const observerOptions = {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  $$('.animate-in').forEach(el => observer.observe(el));

  /* ── CONSOLE GREETING ─────────────────────────────────────── */
  console.log('%c🔧 Skills Dashboard', 'font-size: 24px; font-weight: bold; color: #D94F30;');
  console.log('%c快捷键:', 'font-weight: bold;');
  console.log('  Ctrl/Cmd + K - 打开搜索');
  console.log('  ESC - 关闭模态框');
  console.log('  拖动顶部进度条 - 快速跳转');
})();
