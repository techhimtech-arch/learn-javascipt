const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const OUTPUT_FILE = path.join(ROOT_DIR, 'topics.json');

// Main Learning Course Tracks definition
const TRACKS = [
  {
    id: 'javascript',
    title: 'JavaScript & Web Core',
    icon: '⚡',
    badge: 'Core Foundations',
    description: 'JS Fundamentals, Execution Context, ES6+, TypeScript & Browser Internals',
    domainFolder: '01-javascript'
  },
  {
    id: 'html-css',
    title: 'HTML & CSS Mastery',
    icon: '🎨',
    badge: 'UI & Layouts',
    description: 'HTML5 Semantics, Accessibility (a11y), Modern CSS Flexbox, Grid & Animations',
    domainFolder: '02-html-css'
  },
  {
    id: 'angular',
    title: 'Angular & RxJS Mastery',
    icon: '🅰️',
    badge: 'Framework & Architecture',
    description: 'RxJS Streams, Angular Core & Advanced, Performance & Dedicated Interview Q&A',
    domainFolder: '03-angular'
  },
  {
    id: 'react',
    title: 'React & Ecosystem',
    icon: '⚛️',
    badge: 'Library & Patterns',
    description: 'React Fundamentals, Fiber, Custom Hooks, State Management & Interview Q&A',
    domainFolder: '04-react'
  },
  {
    id: 'interviews',
    title: 'Frontend Machine Coding & System Design',
    icon: '💻',
    badge: 'Senior Interviews',
    description: 'Machine Coding Challenges, Frontend System Design, Testing & General QA',
    domainFolder: '05-frontend-interviews'
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics Mastery',
    icon: '📊',
    badge: '0 to Hero Analytics',
    description: 'Analytics Foundations, Excel Cleaning & Formulas, SQL Databases, Python & Dashboards',
    domainFolder: '06-data-analytics'
  }
];

// Category icons mapping
const CATEGORY_ICONS = {
  'javascript-fundamentals': '⚡',
  'advanced-javascript': '🚀',
  'es6-plus': '✨',
  'typescript': '📘',
  'browser-internals': '🌐',
  'html-semantics': '🏷️',
  'css-mastery': '🎨',
  'rxjs': '🔄',
  'angular-core': '🅰️',
  'angular-advanced': '🅰️',
  'angular-performance': '⚡',
  'angular-interviews-qa': '❓',
  'react-fundamentals': '⚛️',
  'react-interviews': '⚛️',
  'machine-coding': '💻',
  'frontend-system-design': '🏗️',
  'testing': '🧪',
  'general-interview-questions': '❓',
  'data-analytics-foundations': '📊',
  'excel-and-sheets': '📈',
  'sql-database-mastery': '🛢️',
  'python-for-data-analytics': '🐍',
  'data-visualization-and-dashboards': '🎨'
};

function getCategoryIcon(folderName) {
  for (const [key, icon] of Object.entries(CATEGORY_ICONS)) {
    if (folderName.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(folderName.toLowerCase())) {
      return icon;
    }
  }
  return '📚';
}

function cleanTitle(filename) {
  return filename.replace(/\.md$/i, '');
}

function formatCategoryTitle(folderName) {
  const cleaned = folderName.replace(/^\d+-/, '').replace(/-/g, ' ');
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function estimateReadingTime(text) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

function buildIndex() {
  const categories = [];
  let totalTopics = 0;

  TRACKS.forEach(track => {
    const domainPath = path.join(ROOT_DIR, track.domainFolder);
    if (!fs.existsSync(domainPath)) return;

    const moduleDirs = fs.readdirSync(domainPath, { withFileTypes: true })
      .filter(item => item.isDirectory() && !item.name.startsWith('.'))
      .map(item => item.name)
      .sort((a, b) => {
        const numA = parseInt(a.match(/^\d+/)?.[0] || '999', 10);
        const numB = parseInt(b.match(/^\d+/)?.[0] || '999', 10);
        if (numA !== numB) return numA - numB;
        return a.localeCompare(b);
      });

    for (const moduleDir of moduleDirs) {
      const modulePath = path.join(domainPath, moduleDir);
      const files = fs.readdirSync(modulePath)
        .filter(f => f.endsWith('.md'))
        .sort((a, b) => {
          const numA = parseInt(a.match(/^\d+/)?.[0] || '999', 10);
          const numB = parseInt(b.match(/^\d+/)?.[0] || '999', 10);
          if (numA !== numB) return numA - numB;
          return a.localeCompare(b);
        });

      if (files.length === 0) continue;

      const topics = files.map(file => {
        totalTopics++;
        const filePath = path.join(modulePath, file);
        const relativePath = `${track.domainFolder}/${moduleDir}/${file}`;
        let content = '';
        let title = cleanTitle(file);
        let readingTime = '3 min read';

        try {
          content = fs.readFileSync(filePath, 'utf-8');
          readingTime = estimateReadingTime(content);
        } catch (e) {
          console.error(`Error reading ${filePath}:`, e);
        }

        return {
          id: relativePath.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase(),
          title: title,
          filename: file,
          path: relativePath,
          trackId: track.id,
          readingTime: readingTime
        };
      });

      categories.push({
        id: `${track.domainFolder}-${moduleDir}`.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase(),
        folderName: moduleDir,
        domainFolder: track.domainFolder,
        title: formatCategoryTitle(moduleDir),
        trackId: track.id,
        icon: getCategoryIcon(moduleDir),
        count: topics.length,
        topics: topics
      });
    }
  });

  // Check root for special markdown files like IDEA.md
  const items = fs.readdirSync(ROOT_DIR, { withFileTypes: true });
  const rootFiles = items
    .filter(item => item.isFile() && item.name.endsWith('.md'))
    .map(item => item.name);

  if (rootFiles.length > 0) {
    const rootTopics = rootFiles.map(file => {
      totalTopics++;
      const filePath = path.join(ROOT_DIR, file);
      let content = '';
      let readingTime = '5 min read';
      try {
        content = fs.readFileSync(filePath, 'utf-8');
        readingTime = estimateReadingTime(content);
      } catch (e) {}

      return {
        id: file.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase(),
        title: cleanTitle(file),
        filename: file,
        path: file,
        trackId: 'all',
        readingTime: readingTime
      };
    });

    categories.unshift({
      id: 'overview-roadmap',
      folderName: 'Overview',
      title: '📌 Overview & Roadmap',
      trackId: 'all',
      icon: '💡',
      count: rootTopics.length,
      topics: rootTopics
    });
  }

  // Calculate track counts
  const enrichedTracks = TRACKS.map(tr => {
    const trCategories = categories.filter(c => c.trackId === tr.id);
    const trTopicCount = trCategories.reduce((sum, c) => sum + c.count, 0);
    return {
      ...tr,
      categoryCount: trCategories.length,
      topicCount: trTopicCount
    };
  });

  const manifest = {
    generatedAt: new Date().toISOString(),
    tracks: enrichedTracks,
    totalCategories: categories.length,
    totalTopics: totalTopics,
    categories: categories
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`Successfully generated ${OUTPUT_FILE} with ${enrichedTracks.length} tracks, ${categories.length} categories and ${totalTopics} topics.`);
}

buildIndex();
