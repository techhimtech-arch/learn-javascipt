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
    description: 'JS Fundamentals, Execution Context, ES6+, TypeScript, Browser Internals, HTML & CSS',
    folders: [
      '01 JavaScript Fundamentals',
      '02 Advanced JavaScript',
      '03 ES6+',
      '04 TypeScript',
      '05 Browser Internals',
      '06 HTML',
      '07 CSS'
    ]
  },
  {
    id: 'angular',
    title: 'Angular & Senior Frontend',
    icon: '🅰️',
    badge: 'Framework & Architecture',
    description: 'RxJS, Angular Core & Advanced, Performance Optimization, Machine Coding & System Design',
    folders: [
      '08 RxJS',
      '09 Angular Core',
      '10 Angular Advanced',
      '11 Angular Performance',
      '12 Machine Coding',
      '13 Frontend System Design',
      '14 Testing',
      '15 Interview Questions'
    ]
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics Mastery',
    icon: '📊',
    badge: '0 to Hero Analytics',
    description: 'Analytics Foundations, Excel Cleaning & Formulas, SQL Databases, Python & Power BI Dashboards',
    folders: [
      '16 Data Analytics Foundations',
      '17 Excel & Google Sheets for Analytics',
      '18 SQL Database Mastery',
      '19 Python for Data Analytics',
      '20 Data Visualization & Dashboards'
    ]
  }
];

// Category icons mapping
const CATEGORY_ICONS = {
  '01 JavaScript Fundamentals': '⚡',
  '02 Advanced JavaScript': '🚀',
  '03 ES6+': '✨',
  '04 TypeScript': '📘',
  '05 Browser Internals': '🌐',
  '06 HTML': '🏷️',
  '07 CSS': '🎨',
  '08 RxJS': '🔄',
  '09 Angular Core': '🅰️',
  '10 Angular Advanced': '🅰️',
  '11 Angular Performance': '⚡',
  '12 Machine Coding': '💻',
  '13 Frontend System Design': '🏗️',
  '14 Testing': '🧪',
  '15 Interview Questions': '❓',
  '16 Data Analytics Foundations': '📊',
  '17 Excel & Google Sheets for Analytics': '📈',
  '18 SQL Database Mastery': '🛢️',
  '19 Python for Data Analytics': '🐍',
  '20 Data Visualization & Dashboards': '🎨'
};

function getCategoryIcon(folderName) {
  for (const [key, icon] of Object.entries(CATEGORY_ICONS)) {
    if (folderName.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(folderName.toLowerCase())) {
      return icon;
    }
  }
  return '📚';
}

function getTrackIdForFolder(folderName) {
  for (const track of TRACKS) {
    if (track.folders.some(f => folderName.toLowerCase().includes(f.toLowerCase()) || f.toLowerCase().includes(folderName.toLowerCase()))) {
      return track.id;
    }
  }
  return 'javascript';
}

function cleanTitle(filename) {
  return filename.replace(/\.md$/i, '');
}

function estimateReadingTime(text) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

function buildIndex() {
  const items = fs.readdirSync(ROOT_DIR, { withFileTypes: true });
  
  // Filter for directories that start with numbers (or valid content folders)
  const categoryDirs = items
    .filter(item => item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules' && item.name !== 'css' && item.name !== 'js')
    .map(item => item.name)
    .sort((a, b) => {
      const numA = parseInt(a.match(/^\d+/)?.[0] || '999', 10);
      const numB = parseInt(b.match(/^\d+/)?.[0] || '999', 10);
      if (numA !== numB) return numA - numB;
      return a.localeCompare(b);
    });

  const categories = [];
  let totalTopics = 0;

  for (const dirName of categoryDirs) {
    const dirPath = path.join(ROOT_DIR, dirName);
    const files = fs.readdirSync(dirPath)
      .filter(f => f.endsWith('.md'))
      .sort((a, b) => {
        const numA = parseInt(a.match(/^\d+/)?.[0] || '999', 10);
        const numB = parseInt(b.match(/^\d+/)?.[0] || '999', 10);
        if (numA !== numB) return numA - numB;
        return a.localeCompare(b);
      });

    if (files.length === 0) continue;

    const trackId = getTrackIdForFolder(dirName);

    const topics = files.map(file => {
      totalTopics++;
      const filePath = path.join(dirPath, file);
      const relativePath = `${dirName}/${file}`;
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
        trackId: trackId,
        readingTime: readingTime
      };
    });

    categories.push({
      id: dirName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase(),
      folderName: dirName,
      title: dirName,
      trackId: trackId,
      icon: getCategoryIcon(dirName),
      count: topics.length,
      topics: topics
    });
  }

  // Also check root for special markdown files like IDEA.md
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
