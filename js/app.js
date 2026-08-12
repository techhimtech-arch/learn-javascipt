/**
 * Frontend & Angular & Data Analytics Mastery - App Engine
 * Zero-build client-side Markdown SPA viewer for GitHub Pages
 */

(function () {
  'use strict';

  // State Management
  const state = {
    manifest: null,
    currentTopic: null,
    selectedTrack: localStorage.getItem('selected_track') || 'all',
    completedTopics: new Set(JSON.parse(localStorage.getItem('completed_topics') || '[]')),
    bookmarkedTopics: new Set(JSON.parse(localStorage.getItem('bookmarked_topics') || '[]')),
    filterBookmarksOnly: false,
    theme: localStorage.getItem('app_theme') || 'dark',
    allTopicsList: []
  };

  // DOM Cache
  const DOM = {
    app: document.getElementById('app'),
    sidebarNav: document.getElementById('sidebarNav'),
    sidebarFilterBtn: document.getElementById('sidebarFilterBtn'),
    sidebarModuleTitle: document.getElementById('sidebarModuleTitle'),
    trackSelect: document.getElementById('trackSelect'),
    articleContent: document.getElementById('articleContent'),
    tocList: document.getElementById('tocList'),
    searchInput: document.getElementById('searchInput'),
    searchModal: document.getElementById('searchModal'),
    modalSearchInput: document.getElementById('modalSearchInput'),
    searchResults: document.getElementById('searchResults'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    sidebar: document.getElementById('sidebar'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    readingProgressLine: document.getElementById('readingProgressLine')
  };

  // Configure Marked parser
  function setupMarkedParser() {
    if (typeof marked === 'undefined') return;

    const renderer = new marked.Renderer();

    // Custom heading renderer to include smooth scroll IDs
    renderer.heading = function (arg1, arg2, arg3) {
      let text = '', level = 1, raw = '';
      if (typeof arg1 === 'object' && arg1 !== null) {
        text = arg1.text || '';
        level = arg1.depth || 1;
        raw = arg1.raw || text;
      } else {
        text = arg1 || '';
        level = arg2 || 1;
        raw = arg3 || text;
      }
      const slug = (raw || text).toLowerCase().replace(/[^\w]+/g, '-');
      return `<h${level} id="${slug}">${text}</h${level}>`;
    };

    // Custom code block renderer with language tag & Copy button
    renderer.code = function (arg1, arg2) {
      let code = '', language = '';
      if (typeof arg1 === 'object' && arg1 !== null) {
        code = arg1.text || '';
        language = arg1.lang || '';
      } else {
        code = arg1 || '';
        language = arg2 || '';
      }
      const validLang = language && hljs.getLanguage(language) ? language : 'plaintext';
      return `<div class="code-block-wrapper">
        <div class="code-header">
          <span>${validLang.toUpperCase()}</span>
          <button class="copy-code-btn" onclick="window.copyCodeToClipboard(this)">📋 Copy</button>
        </div>
        <pre><code class="language-${validLang}">${escapeHtml(code)}</code></pre>
      </div>`;
    };

    // Custom link renderer to support relative Markdown SPA navigation
    renderer.link = function (arg1, arg2, arg3) {
      let href = '', title = '', text = '';
      if (typeof arg1 === 'object' && arg1 !== null) {
        href = arg1.href || '';
        title = arg1.title || '';
        text = arg1.text || '';
      } else {
        href = arg1 || '';
        title = arg2 || '';
        text = arg3 || '';
      }

      if (href && (href.endsWith('.md') || href.includes('.md#'))) {
        let targetPath = href;
        if (state.currentTopic && (!href.startsWith('/') && !href.startsWith('http://') && !href.startsWith('https://'))) {
          const parts = state.currentTopic.path.split('/');
          parts.pop();
          const dir = parts.join('/');
          const cleanHref = href.replace(/^\.\//, '');
          targetPath = dir ? `${dir}/${cleanHref}` : cleanHref;
        }
        const topicHash = `#/${encodeURIComponent(targetPath)}`;
        return `<a href="${topicHash}" ${title ? `title="${escapeHtml(title)}"` : ''}>${text}</a>`;
      }

      const isExternal = href.startsWith('http://') || href.startsWith('https://');
      return `<a href="${escapeHtml(href)}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''} ${title ? `title="${escapeHtml(title)}"` : ''}>${text}</a>`;
    };

    marked.setOptions({
      renderer: renderer,
      gfm: true,
      breaks: true
    });
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Global helper for code copying with robust fallback
  window.copyCodeToClipboard = function (btn) {
    const wrapper = btn.closest('.code-block-wrapper');
    if (!wrapper) return;
    const codeText = wrapper.querySelector('code').innerText;

    function showCopied() {
      btn.innerText = '✅ Copied!';
      setTimeout(() => {
        btn.innerText = '📋 Copy';
      }, 2000);
    }

    function fallbackCopy(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showCopied();
      } catch (err) {
        console.error('Copy failed:', err);
      } finally {
        document.body.removeChild(textarea);
      }
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(codeText)
        .then(showCopied)
        .catch(() => fallbackCopy(codeText));
    } else {
      fallbackCopy(codeText);
    }
  };

  // Global helper for Track Selection
  window.selectCourseTrack = function (trackId, targetPath) {
    state.selectedTrack = trackId;
    localStorage.setItem('selected_track', trackId);
    if (DOM.trackSelect) DOM.trackSelect.value = trackId;
    renderSidebar();
    if (targetPath) {
      window.location.hash = `#/${encodeURIComponent(targetPath)}`;
    }
  };

  // Initialize App
  async function init() {
    applyTheme(state.theme);
    setupMarkedParser();
    setupEventListeners();

    try {
      const response = await fetch('./topics.json');
      if (!response.ok) throw new Error('Failed to load topics.json manifest');
      state.manifest = await response.json();

      // Set saved track select dropdown value
      if (DOM.trackSelect) {
        DOM.trackSelect.value = state.selectedTrack;
      }

      // Build flat topics list for easy indexing & search
      state.allTopicsList = [];
      state.manifest.categories.forEach(cat => {
        cat.topics.forEach(topic => {
          state.allTopicsList.push({
            ...topic,
            trackId: cat.trackId || topic.trackId || 'javascript',
            categoryTitle: cat.title,
            categoryIcon: cat.icon
          });
        });
      });

      renderSidebar();
      updateOverallProgress();

      // Handle initial route
      handleHashRoute();

    } catch (err) {
      console.error('Initialization error:', err);
      DOM.articleContent.innerHTML = `<div class="welcome-hero">
        <h2>⚠️ Unable to load topics manifest</h2>
        <p class="hero-desc">Please make sure <code>topics.json</code> exists. If running locally, start a web server or run <code>node generate_index.js</code>.</p>
      </div>`;
    }
  }

  // Theme Manager
  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app_theme', theme);
    DOM.themeToggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }

  // Event Listeners Setup
  function setupEventListeners() {
    window.addEventListener('hashchange', handleHashRoute);
    window.addEventListener('scroll', handleScrollProgress);

    // Track Selector Dropdown Switch
    DOM.trackSelect?.addEventListener('change', (e) => {
      state.selectedTrack = e.target.value;
      localStorage.setItem('selected_track', state.selectedTrack);
      renderSidebar();
    });

    // Mobile Sidebar Toggle
    DOM.mobileMenuBtn?.addEventListener('click', () => {
      DOM.sidebar.classList.toggle('open');
    });

    // Theme Switch
    DOM.themeToggleBtn?.addEventListener('click', () => {
      applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    });

    // Bookmark Filter Toggle
    DOM.sidebarFilterBtn?.addEventListener('click', () => {
      state.filterBookmarksOnly = !state.filterBookmarksOnly;
      DOM.sidebarFilterBtn.classList.toggle('active', state.filterBookmarksOnly);
      renderSidebar();
    });

    // Global Search Shortcuts (Cmd+K or /)
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
      } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        openSearchModal();
      } else if (e.key === 'Escape' && DOM.searchModal.classList.contains('open')) {
        closeSearchModal();
      }
    });

    // Search Triggers
    DOM.searchInput?.addEventListener('click', openSearchModal);
    DOM.modalSearchInput?.addEventListener('input', handleSearchQuery);

    DOM.searchModal?.addEventListener('click', (e) => {
      if (e.target === DOM.searchModal) closeSearchModal();
    });
  }

  // Scroll Progress Bar & TOC Spy
  function handleScrollProgress() {
    const docEl = document.documentElement;
    const scrollTop = docEl.scrollTop || document.body.scrollTop;
    const scrollHeight = (docEl.scrollHeight || document.body.scrollHeight) - docEl.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    
    if (DOM.readingProgressLine) {
      DOM.readingProgressLine.style.width = `${progress}%`;
    }

    // ScrollSpy for TOC
    const headings = DOM.articleContent.querySelectorAll('h1, h2, h3');
    let activeId = '';
    headings.forEach(heading => {
      const top = heading.getBoundingClientRect().top;
      if (top < 120) {
        activeId = heading.id;
      }
    });

    if (activeId) {
      const tocLinks = DOM.tocList.querySelectorAll('.toc-item');
      tocLinks.forEach(item => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === `#${activeId}`) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  }

  // Render Navigation Sidebar
  function renderSidebar() {
    if (!state.manifest) return;

    // Filter categories by selected track
    let categoriesToRender = state.manifest.categories;
    if (state.selectedTrack && state.selectedTrack !== 'all') {
      categoriesToRender = categoriesToRender.filter(cat => cat.trackId === state.selectedTrack || cat.trackId === 'all');
    }

    // Update Sidebar Module Header Label
    if (DOM.sidebarModuleTitle) {
      if (state.selectedTrack === 'javascript') DOM.sidebarModuleTitle.innerText = 'JavaScript Modules';
      else if (state.selectedTrack === 'angular') DOM.sidebarModuleTitle.innerText = 'Angular Modules';
      else if (state.selectedTrack === 'data-analytics') DOM.sidebarModuleTitle.innerText = 'Data Analytics Modules';
      else DOM.sidebarModuleTitle.innerText = 'All Topic Modules';
    }

    let html = '';

    categoriesToRender.forEach(cat => {
      let topicsToRender = cat.topics;

      if (state.filterBookmarksOnly) {
        topicsToRender = topicsToRender.filter(t => state.bookmarkedTopics.has(t.path));
      }

      if (topicsToRender.length === 0 && state.filterBookmarksOnly) return;

      const isCurrentCategory = state.currentTopic && state.currentTopic.path.startsWith(cat.folderName);

      // Accordion is COLLAPSED BY DEFAULT unless it is the active category
      const isCollapsed = !isCurrentCategory;

      html += `<div class="category-group ${isCollapsed ? 'collapsed' : ''}">
        <button class="category-header" onclick="this.parentElement.classList.toggle('collapsed')">
          <span class="category-icon">${cat.icon}</span>
          <span class="category-title-text">${escapeHtml(cat.title)}</span>
          <span class="category-badge">${topicsToRender.length}</span>
          <span class="category-chevron">▼</span>
        </button>
        <div class="category-topics">`;

      topicsToRender.forEach(topic => {
        const isCompleted = state.completedTopics.has(topic.path);
        const isActive = state.currentTopic && state.currentTopic.path === topic.path;
        const topicHash = `#/${encodeURIComponent(topic.path)}`;

        html += `<a href="${topicHash}" class="topic-item ${isActive ? 'active' : ''}">
          <span class="topic-status-check ${isCompleted ? 'completed' : ''}" 
                onclick="event.preventDefault(); window.toggleTopicStatus('${topic.path}')" 
                title="${isCompleted ? 'Mark as incomplete' : 'Mark as completed'}">
            ${isCompleted ? '✅' : '○'}
          </span>
          <span class="topic-item-text">${escapeHtml(topic.title)}</span>
        </a>`;
      });

      html += `</div></div>`;
    });

    DOM.sidebarNav.innerHTML = html;
  }

  // Toggle Completed Status
  window.toggleTopicStatus = function (path) {
    if (state.completedTopics.has(path)) {
      state.completedTopics.delete(path);
    } else {
      state.completedTopics.add(path);
    }
    localStorage.setItem('completed_topics', JSON.stringify(Array.from(state.completedTopics)));
    renderSidebar();
    updateOverallProgress();
    if (state.currentTopic && state.currentTopic.path === path) {
      updateArticleActionButtons();
    }
  };

  // Toggle Bookmark Status
  window.toggleBookmarkStatus = function (path) {
    if (state.bookmarkedTopics.has(path)) {
      state.bookmarkedTopics.delete(path);
    } else {
      state.bookmarkedTopics.add(path);
    }
    localStorage.setItem('bookmarked_topics', JSON.stringify(Array.from(state.bookmarkedTopics)));
    renderSidebar();
    if (state.currentTopic && state.currentTopic.path === path) {
      updateArticleActionButtons();
    }
  };

  function updateOverallProgress() {
    if (!state.allTopicsList.length) return;
    const total = state.allTopicsList.length;
    const completed = state.completedTopics.size;
    const percent = Math.round((completed / total) * 100);

    if (DOM.progressFill) DOM.progressFill.style.width = `${percent}%`;
    if (DOM.progressText) DOM.progressText.innerText = `${percent}% (${completed}/${total})`;
  }

  // Route Handler
  async function handleHashRoute() {
    const rawHash = window.location.hash;

    // Close mobile menu if open
    DOM.sidebar.classList.remove('open');

    if (!rawHash || rawHash === '#/' || rawHash === '#') {
      renderWelcomeHero();
      state.currentTopic = null;
      renderSidebar();
      generateTOC();
      return;
    }

    // Quiz routes: #/quiz/banks | #/quiz/bank/<id> | #/quiz/topic/<topicId>
    if (rawHash.indexOf('#/quiz/') === 0) {
      const segments = rawHash.replace('#/quiz/', '').split('/').filter(Boolean);
      await handleQuizRoute(segments);
      return;
    }

    const topicPath = decodeURIComponent(rawHash.replace(/^#\//, ''));
    const topicObj = state.allTopicsList.find(t => t.path === topicPath);

    if (!topicObj) {
      loadMarkdownFile(topicPath, { title: topicPath.split('/').pop().replace('.md', ''), path: topicPath });
    } else {
      // Auto switch track if topic belongs to a different track and selectedTrack is not 'all'
      if (topicObj.trackId && state.selectedTrack !== 'all' && state.selectedTrack !== topicObj.trackId) {
        state.selectedTrack = topicObj.trackId;
        localStorage.setItem('selected_track', state.selectedTrack);
        if (DOM.trackSelect) DOM.trackSelect.value = state.selectedTrack;
      }
      loadMarkdownFile(topicObj.path, topicObj);
    }
  }

  // Fetch & Render Markdown File
  async function loadMarkdownFile(path, topicInfo) {
    state.currentTopic = topicInfo;
    renderSidebar();

    DOM.articleContent.innerHTML = `<div class="welcome-hero">
      <p style="color: var(--text-muted)">⏳ Loading content...</p>
    </div>`;

    try {
      const encodedPath = path.split('/').map(segment => encodeURIComponent(segment)).join('/');
      const response = await fetch('./' + encodedPath);
      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
      const mdContent = await response.text();

      renderArticle(mdContent, topicInfo);

    } catch (err) {
      console.error(`Failed to load ${path}:`, err);
      DOM.articleContent.innerHTML = `<div class="welcome-hero">
        <h2 style="color: var(--warning-color)">⚠️ Article Not Found</h2>
        <p class="hero-desc">Could not load <code>${path}</code>. Verify that the file exists in the repository.</p>
        <a href="#/" class="btn-action" style="display:inline-flex;margin-top:1rem">← Back to Overview</a>
      </div>`;
    }
  }

  // Render Article HTML
  function renderArticle(markdownText, topicObj) {
    const parsedHtml = typeof marked !== 'undefined' ? marked.parse(markdownText) : markdownText;

    const isCompleted = state.completedTopics.has(topicObj.path);
    const isBookmarked = state.bookmarkedTopics.has(topicObj.path);

    // Find Previous & Next Topics within current track (or overall)
    let visibleList = state.allTopicsList;
    if (state.selectedTrack && state.selectedTrack !== 'all') {
      visibleList = state.allTopicsList.filter(t => t.trackId === state.selectedTrack);
    }
    const currentIndex = visibleList.findIndex(t => t.path === topicObj.path);
    const prevTopic = currentIndex > 0 ? visibleList[currentIndex - 1] : null;
    const nextTopic = currentIndex >= 0 && currentIndex < visibleList.length - 1 ? visibleList[currentIndex + 1] : null;

    const categoryTitle = topicObj.categoryTitle || 'Interview Prep';

    let html = `
      <article class="article-header">
        <div class="article-breadcrumb">
          <span>📚 ${escapeHtml(categoryTitle)}</span>
          <span>/</span>
          <span>${escapeHtml(topicObj.title)}</span>
        </div>
        <h1 class="article-title">${escapeHtml(topicObj.title)}</h1>
        <div class="article-meta">
          <div class="meta-tags">
            <span class="meta-badge">⏱️ ${topicObj.readingTime || '5 min read'}</span>
          </div>
          <div class="meta-actions">
            <button id="markCompleteBtn" class="btn-action ${isCompleted ? 'completed' : ''}" 
                    onclick="window.toggleTopicStatus('${topicObj.path}')">
              ${isCompleted ? '✅ Completed' : '○ Mark Completed'}
            </button>
            <button id="bookmarkBtn" class="btn-action ${isBookmarked ? 'bookmarked' : ''}" 
                    onclick="window.toggleBookmarkStatus('${topicObj.path}')">
              ${isBookmarked ? '⭐ Favorited' : '☆ Favorite'}
            </button>
          </div>
        </div>
      </article>

      <div class="markdown-body">
        ${parsedHtml}
      </div>

      <nav class="topic-navigation">
        ${prevTopic ? `
          <a href="#/${encodeURIComponent(prevTopic.path)}" class="nav-card prev">
            <span class="nav-label">← Previous Topic</span>
            <span class="nav-title">${escapeHtml(prevTopic.title)}</span>
          </a>
        ` : '<div></div>'}
        ${nextTopic ? `
          <a href="#/${encodeURIComponent(nextTopic.path)}" class="nav-card next">
            <span class="nav-label">Next Topic →</span>
            <span class="nav-title">${escapeHtml(nextTopic.title)}</span>
          </a>
        ` : '<div></div>'}
      </nav>
    `;

    DOM.articleContent.innerHTML = html;

    // Apply Code Highlight.js syntax
    if (typeof hljs !== 'undefined') {
      DOM.articleContent.querySelectorAll('pre code').forEach((el) => {
        hljs.highlightElement(el);
      });
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Generate Table of Contents
    generateTOC();

    // Inject per-topic "Take Quiz" button if a quiz exists for this topic
    injectTopicQuizButton(topicObj);
  }

  function updateArticleActionButtons() {
    if (!state.currentTopic) return;
    const path = state.currentTopic.path;
    const isCompleted = state.completedTopics.has(path);
    const isBookmarked = state.bookmarkedTopics.has(path);

    const markBtn = document.getElementById('markCompleteBtn');
    if (markBtn) {
      markBtn.className = `btn-action ${isCompleted ? 'completed' : ''}`;
      markBtn.innerHTML = isCompleted ? '✅ Completed' : '○ Mark Completed';
    }

    const bkmBtn = document.getElementById('bookmarkBtn');
    if (bkmBtn) {
      bkmBtn.className = `btn-action ${isBookmarked ? 'bookmarked' : ''}`;
      bkmBtn.innerHTML = isBookmarked ? '⭐ Favorited' : '☆ Favorite';
    }
  }

  // Generate TOC links in right sidebar
  function generateTOC() {
    if (!DOM.tocList) return;

    const headings = DOM.articleContent.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3');

    if (headings.length === 0) {
      DOM.tocList.innerHTML = '<li class="toc-item" style="color:var(--text-muted);font-size:0.8rem">No subheadings found</li>';
      return;
    }

    let tocHtml = '';
    headings.forEach(h => {
      const level = parseInt(h.tagName.substring(1), 10);
      const id = h.id || h.innerText.toLowerCase().replace(/[^\w]+/g, '-');
      h.id = id;

      tocHtml += `<li class="toc-item depth-${level}">
        <a href="#${id}">${escapeHtml(h.innerText)}</a>
      </li>`;
    });

    DOM.tocList.innerHTML = tocHtml;
  }

  // Render Welcome Hero Dashboard
  function renderWelcomeHero() {
    if (!state.manifest) return;

    const totalTopics = state.manifest.totalTopics || state.allTopicsList.length;
    const totalCategories = state.manifest.categories ? state.manifest.categories.length : 0;
    const completedCount = state.completedTopics.size;

    const tracks = state.manifest.tracks || [];

    let tracksCardsHtml = '';
    tracks.forEach(tr => {
      // Find first topic of track
      const firstCat = state.manifest.categories.find(c => c.trackId === tr.id);
      const firstTopic = firstCat && firstCat.topics && firstCat.topics[0] ? firstCat.topics[0] : null;
      const startPath = firstTopic ? firstTopic.path : '';

      tracksCardsHtml += `
        <div class="track-card">
          <div>
            <div class="track-card-header">
              <div class="track-card-icon">${tr.icon}</div>
              <span class="track-badge">${tr.badge || 'Learning Track'}</span>
            </div>
            <h3 class="track-card-title">${escapeHtml(tr.title)}</h3>
            <p class="track-card-desc">${escapeHtml(tr.description)}</p>
          </div>
          <div class="track-card-footer">
            <span class="track-stats">📁 ${tr.categoryCount} Modules • 📄 ${tr.topicCount} Topics</span>
            <button class="btn-select-track" onclick="window.selectCourseTrack('${tr.id}', '${startPath}')">
              Explore Track →
            </button>
          </div>
        </div>
      `;
    });

    let html = `
      <div class="welcome-hero">
        <span class="hero-badge">⚡ Master Engineering & Analytics Concepts</span>
        <h1 class="hero-title">Interactive Learning & Interview Mastery</h1>
        <p class="hero-desc">
          Choose a specialized course track below to focus your study. Notes, code implementations, step-by-step guides, and interactive quizzes organized for high-yield learning.
        </p>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">${totalTopics}</div>
            <div class="stat-label">Total Articles</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${totalCategories}</div>
            <div class="stat-label">Subject Modules</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${completedCount} / ${totalTopics}</div>
            <div class="stat-label">Topics Completed</div>
          </div>
        </div>

        <div class="tracks-section">
          <h3 class="tracks-section-title">🎓 Select Your Learning Track:</h3>
          <div class="tracks-grid">
            ${tracksCardsHtml}
          </div>
        </div>
      </div>
    `;

    DOM.articleContent.innerHTML = html;
  }

  // Search Modal Functions
  function openSearchModal() {
    DOM.searchModal.classList.add('open');
    DOM.modalSearchInput.value = '';
    DOM.modalSearchInput.focus();
    renderSearchResults('');
  }

  function closeSearchModal() {
    DOM.searchModal.classList.remove('open');
  }

  function handleSearchQuery(e) {
    renderSearchResults(e.target.value.trim());
  }

  function renderSearchResults(query) {
    if (!query) {
      DOM.searchResults.innerHTML = '<div style="padding:1rem;color:var(--text-muted);font-size:0.85rem">Type a topic name, concept, or folder to search...</div>';
      return;
    }

    const q = query.toLowerCase();
    const matches = state.allTopicsList.filter(t => 
      t.title.toLowerCase().includes(q) || 
      t.categoryTitle.toLowerCase().includes(q) ||
      t.path.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      DOM.searchResults.innerHTML = '<div style="padding:1rem;color:var(--text-muted);font-size:0.85rem">No matching topics found.</div>';
      return;
    }

    let html = '';
    matches.slice(0, 10).forEach(item => {
      html += `
        <a href="#/${encodeURIComponent(item.path)}" class="search-result-item" onclick="window.closeSearchModal()">
          <span class="result-title">${escapeHtml(item.title)}</span>
          <span class="result-category">${item.categoryIcon} ${escapeHtml(item.categoryTitle)}</span>
        </a>
      `;
    });

    DOM.searchResults.innerHTML = html;
  }

  window.closeSearchModal = closeSearchModal;

  // ============================================================
  //  QUIZ SYSTEM  (banks + per-topic quizzes, offline results)
  // ============================================================

  const Quiz = {
    index: null,        // quiz-index.json: topicId -> relative path
    banksMeta: null,    // fetched bank list (id/title/icon/count)
    current: null,      // active runner state
    _cache: {}          // cache of fetched bank/topic JSON
  };

  function quizHash(parts) {
    return '#/quiz/' + parts.join('/');
  }

  async function ensureQuizIndex() {
    if (Quiz.index) return Quiz.index;
    try {
      const res = await fetch('./quizzes/quiz-index.json');
      if (!res.ok) throw new Error('no quiz-index');
      Quiz.index = await res.json();
    } catch (e) {
      Quiz.index = { topics: {} };
    }
    return Quiz.index;
  }

  async function loadBank(id) {
    if (Quiz._cache['bank:' + id]) return Quiz._cache['bank:' + id];
    const res = await fetch('./quizzes/banks/' + id + '.json');
    if (!res.ok) throw new Error('bank not found: ' + id);
    const data = await res.json();
    Quiz._cache['bank:' + id] = data;
    return data;
  }

  async function loadTopicQuiz(topicId) {
    await ensureQuizIndex();
    const rel = Quiz.index.topics[topicId];
    if (!rel) throw new Error('No quiz for topic: ' + topicId);
    if (Quiz._cache['topic:' + topicId]) return Quiz._cache['topic:' + topicId];
    const res = await fetch('./' + rel.split('/').map(s => encodeURIComponent(s)).join('/'));
    if (!res.ok) throw new Error('topic quiz not found');
    const data = await res.json();
    Quiz._cache['topic:' + topicId] = data;
    return data;
  }

  async function loadModuleQuiz(categoryId) {
    if (Quiz._cache['module:' + categoryId]) return Quiz._cache['module:' + categoryId];
    const res = await fetch('./quizzes/modules/' + encodeURIComponent(categoryId) + '.quiz.json');
    if (!res.ok) throw new Error('No module quiz for: ' + categoryId);
    const data = await res.json();
    Quiz._cache['module:' + categoryId] = data;
    return data;
  }

  async function ensureModulesMeta() {
    if (Quiz.modulesMeta) return Quiz.modulesMeta;
    let cats = [];
    try {
      const t = await (await fetch('./topics.json')).json();
      cats = t.categories || [];
    } catch (e) { /* no topics.json */ }
    Quiz.modulesMeta = cats.map(c => ({
      id: c.id, title: c.title, icon: c.icon, folder: c.folderName, count: c.count
    }));
    return Quiz.modulesMeta;
  }

  async function ensureBanksMeta() {
    if (Quiz.banksMeta) return Quiz.banksMeta;
    const ids = ['interview', 'angular', 'concepts'];
    const meta = [];
    for (const id of ids) {
      try {
        const b = await loadBank(id);
        meta.push({ id: b.bankId, title: b.title, icon: b.icon, description: b.description, count: b.questionCount });
      } catch (e) { /* bank missing */ }
    }
    Quiz.banksMeta = meta;
    return meta;
  }

  // ---- Render: Bank chooser ----
  async function renderQuizHome() {
    const meta = await ensureBanksMeta();
    const modules = await ensureModulesMeta();
    const hasTopicQuizzes = Quiz.index && Quiz.index.topics && Object.keys(Quiz.index.topics).length > 0;

    const bankCards = meta.map(m => `
      <div class="quiz-bank-card" onclick="window.startQuiz('bank','${m.id}')">
        <div class="quiz-bank-icon">${m.icon}</div>
        <h3 class="quiz-bank-title">${escapeHtml(m.title)}</h3>
        <p class="quiz-bank-desc">${escapeHtml(m.description)}</p>
        <div class="quiz-bank-foot"><span class="quiz-bank-count">${m.count} questions</span><span class="quiz-bank-go">Start →</span></div>
      </div>`).join('');

    const moduleCards = modules.map(m => `
      <div class="quiz-bank-card module" onclick="window.startQuiz('module','${m.id}')">
        <div class="quiz-bank-icon">${m.icon || '📦'}</div>
        <h3 class="quiz-bank-title">${escapeHtml(m.title.replace(/^\W+/, ''))}</h3>
        <p class="quiz-bank-desc">Mixed quiz covering all topics in this module (${m.count} topics).</p>
        <div class="quiz-bank-foot"><span class="quiz-bank-count">module quiz</span><span class="quiz-bank-go">Start →</span></div>
      </div>`).join('');

    DOM.articleContent.innerHTML = `
      <div class="quiz-home">
        <span class="hero-badge">🧩 Practice & Revision</span>
        <h1 class="hero-title">Quizzes</h1>
        <p class="hero-desc">Test yourself by module, by curated bank, or topic-by-topic. Progress is saved offline (IndexedDB).</p>
        <h3 class="tracks-section-title">📦 Module Quizzes <span class="muted">(every module covered)</span></h3>
        <div class="quiz-banks-grid">${moduleCards || '<p style="color:var(--text-muted)">No modules found.</p>'}</div>
        <h3 class="tracks-section-title" style="margin-top:2rem">🎯 Quiz Banks</h3>
        <div class="quiz-banks-grid">${bankCards || '<p style="color:var(--text-muted)">No quiz banks generated yet. Run <code>node aggregate_quizzes.js</code>.</p>'}</div>
        ${hasTopicQuizzes ? `
          <h3 class="tracks-section-title" style="margin-top:2rem">📚 Topic Quizzes</h3>
          <p class="hero-desc" style="margin-bottom:.5rem">Open any topic article and click <b>🧩 Take Quiz</b> to test just that concept.</p>
        ` : ''}
      </div>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    generateTOC();
  }

  // ---- Render: Runner for a bank or topic quiz ----
  async function startQuiz(kind, id) {
    let data, scopeKey;
    try {
      if (kind === 'bank') {
        data = await loadBank(id);
        scopeKey = 'bank:' + id;
      } else {
        data = await loadTopicQuiz(id);
        scopeKey = 'topic:' + id;
      }
    } catch (e) {
      DOM.articleContent.innerHTML = `<div class="welcome-hero"><h2 style="color:var(--warning-color)">⚠️ Quiz not found</h2><p class="hero-desc">${escapeHtml(e.message)}</p><a href="${quizHash(['banks'])}" class="btn-action" style="display:inline-flex;margin-top:1rem">← Back to Quizzes</a></div>`;
      return;
    }

    const questions = (data.questions || []).map((q, i) => Object.assign({}, q, { _idx: i }));
    if (!questions.length) {
      DOM.articleContent.innerHTML = `<div class="welcome-hero"><h2>No questions yet</h2><a href="${quizHash(['banks'])}" class="btn-action" style="display:inline-flex;margin-top:1rem">← Back</a></div>`;
      return;
    }

    Quiz.current = {
      kind: kind, id: id, scopeKey: scopeKey,
      title: data.title || 'Quiz',
      questions: questions,
      pos: 0, answers: {}, finished: false
    };
    window.location.hash = kind === 'bank' ? quizHash(['bank', id])
      : kind === 'module' ? quizHash(['module', id])
      : quizHash(['topic', id]);
    renderQuizRunner();
  }

  // Expose startQuiz on window so inline onclick="window.startQuiz(...)" handlers work.
  window.startQuiz = startQuiz;

  function renderQuizRunner() {
    const q = Quiz.current;
    if (!q) return;
    if (q.finished) { renderQuizResult(); return; }

    const item = q.questions[q.pos];
    const total = q.questions.length;
    const answered = q.answers[item._idx];
    const opts = item.options.map(o => {
      let cls = 'quiz-option';
      if (answered) {
        if (o.id === item.correctOptionId) cls += ' correct';
        else if (o.id === answered && o.id !== item.correctOptionId) cls += ' wrong';
        else cls += ' disabled';
      }
      return `<button class="${cls}" ${answered ? 'disabled' : ''} onclick="window.answerQuiz('${o.id}')">
          <span class="quiz-opt-key">${o.id.toUpperCase()}</span>
          <span class="quiz-opt-text">${escapeHtml(o.text)}</span>
          ${answered && o.id === item.correctOptionId ? '<span class="quiz-opt-mark">✔</span>' : ''}
          ${answered && o.id === answered && o.id !== item.correctOptionId ? '<span class="quiz-opt-mark">✘</span>' : ''}
        </button>`;
    }).join('');

    const explain = answered ? `
      <div class="quiz-explain ${answered === item.correctOptionId ? 'ok' : 'no'}">
        <strong>${answered === item.correctOptionId ? '✅ Correct!' : '❌ Incorrect.'}</strong>
        <p>${escapeHtml(item.explanation || 'No explanation provided.')}</p>
      </div>` : '';

    DOM.articleContent.innerHTML = `
      <div class="quiz-runner">
        <div class="quiz-runner-head">
          <button class="btn-action ghost" onclick="window.exitQuiz()">← Exit</button>
          <div class="quiz-progress-wrap">
            <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${(q.pos / total) * 100}%"></div></div>
            <span class="quiz-progress-text">${q.pos + 1} / ${total}</span>
          </div>
          <span class="quiz-tag">${q.kind === 'bank' ? '🎯 Bank' : '📚 Topic'}</span>
        </div>
        <h2 class="quiz-question">${escapeHtml(item.question)}</h2>
        <div class="quiz-options">${opts}</div>
        ${explain}
        <div class="quiz-runner-foot">
          ${answered ? `<button class="btn-action primary" onclick="window.nextQuiz()">${q.pos + 1 < total ? 'Next →' : 'See Results →'}</button>` : '<span class="quiz-hint">Pick an option to continue.</span>'}
        </div>
      </div>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    generateTOC();
  }

  window.answerQuiz = function (optionId) {
    const q = Quiz.current;
    if (!q || q.finished) return;
    const item = q.questions[q.pos];
    if (q.answers[item._idx]) return; // already answered
    q.answers[item._idx] = optionId;
    renderQuizRunner();
  };

  window.nextQuiz = function () {
    const q = Quiz.current;
    if (!q) return;
    if (q.pos + 1 < q.questions.length) {
      q.pos++;
      renderQuizRunner();
    } else {
      q.finished = true;
      renderQuizResult();
    }
  };

  window.exitQuiz = function () {
    Quiz.current = null;
    window.location.hash = quizHash(['banks']);
  };

  function renderQuizResult() {
    const q = Quiz.current;
    if (!q) return;
    const total = q.questions.length;
    let correct = 0;
    q.questions.forEach(item => {
      if (q.answers[item._idx] === item.correctOptionId) correct++;
    });
    const percent = Math.round((correct / total) * 100);
    const wrong = q.questions.filter(item => q.answers[item._idx] !== item.correctOptionId);

    const review = wrong.map(item => `
      <div class="quiz-review-item">
        <div class="quiz-review-q">${escapeHtml(item.question)}</div>
        <div class="quiz-review-a"><span class="tag-no">Your: ${q.answers[item._idx] ? escapeHtml(q.answers[item._idx].toUpperCase()) : '—'}</span> <span class="tag-yes">Correct: ${escapeHtml(item.correctOptionId.toUpperCase())}</span></div>
        <div class="quiz-review-exp">${escapeHtml(item.explanation || '')}</div>
      </div>`).join('');

    // Persist result offline
    const record = {
      id: q.scopeKey + ':' + Date.now(),
      scopeKey: q.scopeKey,
      title: q.title,
      kind: q.kind,
      total: total,
      correct: correct,
      percent: percent,
      takenAt: new Date().toISOString()
    };
    if (window.QuizDB) window.QuizDB.saveQuizResult(record).catch(() => {});

    DOM.articleContent.innerHTML = `
      <div class="quiz-result">
        <div class="quiz-result-score ${percent >= 70 ? 'pass' : 'fail'}">
          <div class="quiz-result-pct">${percent}%</div>
          <div class="quiz-result-sub">${correct} / ${total} correct</div>
        </div>
        <h2>${percent >= 70 ? '🎉 Nicely done!' : '📖 Keep revising!'}</h2>
        <p class="hero-desc">Saved to your device (offline). Retake anytime from the quiz list.</p>
        <div class="quiz-result-actions">
          <button class="btn-action primary" onclick="window.retakeQuiz()">↻ Retake</button>
          <a href="${quizHash(['banks'])}" class="btn-action">← All Quizzes</a>
        </div>
        ${wrong.length ? `<h3 class="tracks-section-title" style="margin-top:2rem">📝 Review (${wrong.length} to improve)</h3><div class="quiz-review-list">${review}</div>` : '<p style="margin-top:1.5rem">Perfect score — all concepts clear! 🚀</p>'}
      </div>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    generateTOC();
  }

  window.retakeQuiz = function () {
    const q = Quiz.current;
    if (!q) return;
    q.pos = 0; q.answers = {}; q.finished = false;
    renderQuizRunner();
  };

  // Per-topic "Take Quiz" button injected into article header.
  function injectTopicQuizButton(topicObj) {
    if (!topicObj) return;
    const topicId = (topicObj.path || '').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    ensureQuizIndex().then(() => {
      if (!Quiz.index.topics[topicId]) return; // no quiz for this topic
      const btn = document.getElementById('takeQuizBtn');
      if (btn) return;
      const metaActions = document.querySelector('.article-meta .meta-actions');
      if (!metaActions) return;
      const qbtn = document.createElement('button');
      qbtn.id = 'takeQuizBtn';
      qbtn.className = 'btn-action quiz-topic-btn';
      qbtn.innerHTML = '🧩 Take Quiz';
      qbtn.onclick = () => window.startQuiz('topic', topicId);
      metaActions.appendChild(qbtn);
    });
  }

  // Route a #/quiz/... hash.
  async function handleQuizRoute(segments) {
    const [a, b] = segments;
    if (!a || a === 'banks') {
      await renderQuizHome();
      state.currentTopic = null;
      renderSidebar();
      return;
    }
    if (a === 'modules' || a === 'module') {
      if (b) {
        await startQuiz('module', b);
      } else {
        await renderQuizHome();
      }
      return;
    }
    if (a === 'bank' && b) {
      await startQuiz('bank', b);
      return;
    }
    if (a === 'topic' && b) {
      await startQuiz('topic', b);
      return;
    }
    await renderQuizHome();
  }

  // ---- Wire header button (script is at end of <body>, so DOM is ready) ----
  (function wireQuizNavButton() {
    const qbtn = document.getElementById('quizzesNavBtn');
    if (qbtn) qbtn.addEventListener('click', () => { window.location.hash = quizHash(['banks']); });
  })();

  // ============================================================
  //  END QUIZ SYSTEM
  // ============================================================

  // Initialize App on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
