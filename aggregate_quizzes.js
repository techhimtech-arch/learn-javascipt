/**
 * aggregate_quizzes.js
 *
 * Scans every numbered topic folder for `*.quiz.json` files, then:
 *   1) writes quizzes/quiz-index.json  (topicId -> relative quiz file path) for the SPA
 *   2) writes quizzes/banks/<bankId>.json  (3 banks: interview / angular / concepts)
 *
 * Banks are assigned by the topic's folder:
 *   - "15 Interview Questions"        -> interview
 *   - folders 08..14 (RxJS..Testing)  -> angular
 *   - everything else                 -> concepts
 *
 * Run manually:  node aggregate_quizzes.js
 * CI: called from .github/workflows/deploy.yml before deploy.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const QUIZ_DIR = path.join(ROOT, 'quizzes');
const BANKS_DIR = path.join(QUIZ_DIR, 'banks');

const BANK_META = {
  interview: {
    title: 'Interview Practice Bank',
    icon: '❓',
    description: 'Mixed real-world interview questions across JS, Angular, RxJS, TypeScript, CSS & HR — simulate the real thing.'
  },
  angular: {
    title: 'Angular Full Study Bank',
    icon: '🅰️',
    description: 'Deep Angular + RxJS questions for end-to-end framework mastery.'
  },
  concepts: {
    title: 'Concepts & Revision Bank',
    icon: '🧠',
    description: 'Core JS / TypeScript / HTML / CSS / Analytics concept recall for quick revision.'
  }
};

function getBankForFolder(folderName) {
  if (folderName.toLowerCase().includes('interview')) return 'interview';
  const m = folderName.match(/^(\d+)/);
  const n = m ? parseInt(m[1], 10) : 999;
  if (n >= 8 && n <= 14) return 'angular';
  return 'concepts';
}

// Mirror the topicId algorithm used in generate_index.js / topics.json.
// relPath looks like "01 JavaScript Fundamentals/001 - X.md.quiz.json";
// strip the ".quiz.json" suffix to recover the original .md path, then slugify.
function topicIdFromQuizRelPath(relPath) {
  const mdPath = relPath.replace(/\.quiz\.json$/i, '');
  return mdPath.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
}

function main() {
  const items = fs.readdirSync(ROOT, { withFileTypes: true });
  const dirs = items
    .filter(function (i) { return i.isDirectory() && /^\d/.test(i.name); })
    .sort(function (a, b) {
      const na = parseInt(a.name.match(/^(\d+)/)?.[0] || '999', 10);
      const nb = parseInt(b.name.match(/^(\d+)/)?.[0] || '999', 10);
      return na - nb;
    });

  const banks = { interview: [], angular: [], concepts: [] };
  const quizIndex = {};
  let total = 0;
  const errors = [];

  dirs.forEach(function (d) {
    const dirPath = path.join(ROOT, d.name);
    let files;
    try {
      files = fs.readdirSync(dirPath).filter(function (f) { return f.toLowerCase().endsWith('.quiz.json'); });
    } catch (e) {
      return;
    }
    files.forEach(function (f) {
      const relPath = d.name + '/' + f;
      const absPath = path.join(dirPath, f);
      let data;
      try {
        data = JSON.parse(fs.readFileSync(absPath, 'utf-8'));
      } catch (e) {
        errors.push(relPath + ': ' + e.message);
        return;
      }
      const topicId = topicIdFromQuizRelPath(relPath);
      quizIndex[topicId] = relPath;

      const bank = getBankForFolder(d.name);
      const srcTitle = data.title || d.name;
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
    // Only regenerate a bank from per-topic quizzes when it actually has some.
    // This preserves hand-curated banks (e.g. the mixed 'interview' practice
    // bank) that have no per-topic source files in their folder.
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
