const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const OUTPUT_FILE = path.join(ROOT_DIR, 'topics.json');

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

function cleanTitle(filename) {
  let title = filename.replace(/\.md$/i, '');
  return title;
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
        
        // Try to extract first # title if available
        const titleMatch = content.match(/^#\s+(.+)$/m);
        if (titleMatch && titleMatch[1].trim()) {
          // Keep nice display title if found, or keep file title
          // title = titleMatch[1].trim();
        }
      } catch (e) {
        console.error(`Error reading ${filePath}:`, e);
      }

      return {
        id: relativePath.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase(),
        title: title,
        filename: file,
        path: relativePath,
        readingTime: readingTime
      };
    });

    categories.push({
      id: dirName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase(),
      folderName: dirName,
      title: dirName,
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
        readingTime: readingTime
      };
    });

    categories.unshift({
      id: 'overview-roadmap',
      folderName: 'Overview',
      title: '📌 Overview & Roadmap',
      icon: '💡',
      count: rootTopics.length,
      topics: rootTopics
    });
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    totalCategories: categories.length,
    totalTopics: totalTopics,
    categories: categories
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`Successfully generated ${OUTPUT_FILE} with ${categories.length} categories and ${totalTopics} topics.`);
}

buildIndex();
