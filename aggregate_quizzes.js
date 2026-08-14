/**
 * aggregate_quizzes.js
 *
 * Scans domain topic folders for `*.quiz.json` files, then:
 *   1) writes quizzes/quiz-index.json  (topicId -> relative quiz file path) for the SPA
 *   2) writes quizzes/banks/<bankId>.json  (3 banks: interview / angular / concepts)
 *
 * Run manually:  node aggregate_quizzes.js
 * CI: called from .github/workflows/deploy.yml before deploy.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const QUIZ_DIR = path.join(ROOT, 'quizzes');
const BANKS_DIR = path.join(QUIZ_DIR, 'banks');

const DOMAIN_FOLDERS = [
  '01-javascript',
  '02-html-css',
  '03-angular',
  '04-react',
  '05-frontend-interviews',
  '06-data-analytics'
];

const BANK_META = {
  interview: {
    title: 'Interview Practice Bank',
    icon: '❓',
    description: 'Mixed real-world interview questions across JS, Angular, React, System Design & HR — simulate the real thing.'
  },
  angular: {
    title: 'Angular Full Study Bank',
    icon: '🅰️',
    description: 'Deep Angular + RxJS questions for end-to-end framework mastery.'
  },
  concepts: {
    title: 'Concepts & Revision Bank',
    icon: '🧠',
    description: 'Core JS / React / HTML / CSS / Analytics concept recall for quick revision.'
  }
};

function getBankForFolder(domainFolder, moduleFolder) {
  const combined = `${domainFolder}/${moduleFolder}`.toLowerCase();
  if (combined.includes('interview')) return 'interview';
  if (combined.includes('angular')) return 'angular';
  return 'concepts';
}

function topicIdFromQuizRelPath(relPath) {
  const mdPath = relPath.replace(/\.quiz\.json$/i, '');
  return mdPath.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
}

function scanQuizFiles(dirPath, relPrefix) {
  let results = [];
  if (!fs.existsSync(dirPath)) return results;

  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    const relPath = relPrefix ? `${relPrefix}/${item.name}` : item.name;
    if (item.isDirectory()) {
      results = results.concat(scanQuizFiles(fullPath, relPath));
    } else if (item.isFile() && item.name.toLowerCase().endsWith('.quiz.json')) {
      results.push({ absPath: fullPath, relPath: relPath });
    }
  }
  return results;
}

function main() {
  const banks = { interview: [], angular: [], concepts: [] };
  const quizIndex = {};
  let total = 0;
  const errors = [];

  DOMAIN_FOLDERS.forEach(domainFolder => {
    const domainPath = path.join(ROOT, domainFolder);
    const quizFiles = scanQuizFiles(domainPath, domainFolder);

    quizFiles.forEach(({ absPath, relPath }) => {
      let data;
      try {
        data = JSON.parse(fs.readFileSync(absPath, 'utf-8'));
      } catch (e) {
        errors.push(relPath + ': ' + e.message);
        return;
      }
      const topicId = topicIdFromQuizRelPath(relPath);
      quizIndex[topicId] = relPath;

      const pathParts = relPath.split('/');
      const bank = getBankForFolder(pathParts[0] || '', pathParts[1] || '');
      const srcTitle = data.title || pathParts[pathParts.length - 1];
      const questions = (data.questions || []).map(function (q) {
        return Object.assign({}, q, { _srcTopic: srcTitle, _srcPath: relPath });
      });
      banks[bank] = banks[bank].concat(questions);
      total += questions.length;
    });
  });

  if (!fs.existsSync(QUIZ_DIR)) fs.mkdirSync(QUIZ_DIR, { recursive: true });
  if (!fs.existsSync(BANKS_DIR)) fs.mkdirSync(BANKS_DIR, { recursive: true });

  Object.keys(BANK_META).forEach(function (bankId) {
    const questions = banks[bankId];
    if (questions.length === 0) {
      if (fs.existsSync(path.join(BANKS_DIR, bankId + '.json'))) {
        console.log('  (skipped ' + bankId + ' bank — no per-topic source, kept existing file)');
      } else {
        console.warn('  (warning: ' + bankId + ' bank has no questions)');
      }
      return;
    }
    const meta = BANK_META[bankId];
    const out = {
      schemaVersion: '1.0',
      type: 'bank',
      bankId: bankId,
      title: meta.title,
      icon: meta.icon,
      description: meta.description,
      questionCount: questions.length,
      generatedAt: new Date().toISOString(),
      questions: questions
    };
    fs.writeFileSync(path.join(BANKS_DIR, bankId + '.json'), JSON.stringify(out, null, 2));
  });

  fs.writeFileSync(
    path.join(QUIZ_DIR, 'quiz-index.json'),
    JSON.stringify({ generatedAt: new Date().toISOString(), count: Object.keys(quizIndex).length, topics: quizIndex }, null, 2)
  );

  if (errors.length) {
    console.warn('Skipped invalid quiz files:');
    errors.forEach(function (e) { console.warn('  - ' + e); });
  }
  console.log('Aggregated ' + total + ' questions into 3 banks; ' + Object.keys(quizIndex).length + ' topic quizzes indexed.');
}

main();
