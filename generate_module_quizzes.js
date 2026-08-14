/**
 * generate_module_quizzes.js
 *
 * Builds ONE quiz per module (category) so every module is quiz-able, even
 * before per-topic .quiz.json files exist for it.
 *
 * Source of questions, in priority order:
 *   1) per-topic *.quiz.json files inside that module's folder (real, curated Qs)
 *   2) the 3 curated banks (interview / angular / concepts) — matched by folder
 *   3) GENERATED fallback questions so the module is never empty
 *
 * Output: quizzes/modules/<categoryId>.quiz.json  (type:"module")
 * CI: called from .github/workflows/deploy.yml before deploy.
 *
 * Run manually:  node generate_module_quizzes.js
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = __dirname;
const QUIZ_DIR = path.join(ROOT, 'quizzes');
const MODULES_DIR = path.join(QUIZ_DIR, 'modules');
const BANKS_DIR = path.join(QUIZ_DIR, 'banks');

function loadTopics() {
  try { return JSON.parse(fs.readFileSync(path.join(ROOT, 'topics.json'), 'utf8')); }
  catch (e) { console.error('topics.json missing:', e.message); process.exit(1); }
}

function getBankForFolder(domainFolder, folderName) {
  const combined = `${domainFolder || ''}/${folderName || ''}`.toLowerCase();
  if (combined.includes('interview')) return 'interview';
  if (combined.includes('angular')) return 'angular';
  return 'concepts';
}

function loadBankQuestions() {
  const out = {};
  ['interview', 'angular', 'concepts'].forEach(id => {
    try {
      const b = JSON.parse(fs.readFileSync(path.join(BANKS_DIR, id + '.json'), 'utf8'));
      out[id] = b.questions || [];
    } catch (e) { out[id] = []; }
  });
  return out;
}

function loadTopicQuestionsByFolder() {
  const map = {};
  const DOMAIN_FOLDERS = [
    '01-javascript',
    '02-html-css',
    '03-angular',
    '04-react',
    '05-frontend-interviews',
    '06-data-analytics'
  ];
  DOMAIN_FOLDERS.forEach(dom => {
    const domPath = path.join(ROOT, dom);
    if (!fs.existsSync(domPath)) return;
    const subdirs = fs.readdirSync(domPath, { withFileTypes: true }).filter(d => d.isDirectory());
    subdirs.forEach(d => {
      const dp = path.join(domPath, d.name);
      let files = [];
      try { files = fs.readdirSync(dp).filter(f => f.toLowerCase().endsWith('.quiz.json')); } catch (e) { return; }
      files.forEach(f => {
        try {
          const data = JSON.parse(fs.readFileSync(path.join(dp, f), 'utf8'));
          (data.questions || []).forEach(q => {
            map[d.name] = map[d.name] || [];
            map[d.name].push(q);
          });
        } catch (e) { /* skip bad */ }
      });
    });
  });
  return map;
}

function opt(...items) {
  return items.map((it, i) => ({ id: String.fromCharCode(97 + i), text: it[0], correct: !!it[1] }));
}
function Q(id, question, options, explanation) {
  const o = options.map(o => ({ id: o.id, text: o.text }));
  const correct = options.find(x => x.correct);
  return {
    id, question, options: o, correctOptionId: correct ? correct.id : options[0].id,
    explanation: explanation || 'Review the corresponding topic notes for details.'
  };
}
function hashId(str) { return crypto.createHash('md5').update(str).digest('hex').slice(0, 8); }

function fallbackQuestions(category) {
  const name = category.title.replace(/^\W+/, '').trim();
  const folder = category.folderName;
  const base = [
    Q(hashId(category.id + 'm1'),
      `Which statement best describes the purpose of "${name}"?`,
      opt(['It is a focused area of frontend knowledge with its own set of patterns and trade-offs.', true],
          ['It is only useful for legacy codebases.', false],
          ['It cannot be tested in isolation.', false],
          ['It is deprecated in modern browsers.', false]),
      `"${name}" groups related concepts, APIs, and best practices you should be able to reason about and apply.`),
    Q(hashId(category.id + 'm2'),
      `When working inside "${folder}", the most effective way to retain the material is to:`,
      opt(['Read the core principles, implement sample code, and test understanding via quizzes.', true],
          ['Memorize syntax without running code.', false],
          ['Skip the theoretical foundation.', false],
          ['Rely solely on third-party libraries.', false]),
      `Active recall combined with hands-on practice leads to mastery.`)
  ];
  return base;
}

function main() {
  const topics = loadTopics();
  const categories = topics.categories || [];
  const bankQs = loadBankQuestions();
  const topicQsByFolder = loadTopicQuestionsByFolder();

  if (!fs.existsSync(MODULES_DIR)) fs.mkdirSync(MODULES_DIR, { recursive: true });

  let built = 0;
  categories.forEach(cat => {
    const folder = cat.folderName;
    const bankId = getBankForFolder(cat.domainFolder, folder);

    const topicQs = (topicQsByFolder[folder] || []).map(q => Object.assign({}, q));
    const bankQuestions = (bankQs[bankId] || []).map(q => Object.assign({}, q));
    const fb = fallbackQuestions(cat);

    const pool = [];
    const seen = new Set();
    function pushUnique(q) {
      const key = (q.question || '').slice(0, 60);
      if (seen.has(key)) return;
      seen.add(key);
      pool.push(q);
    }
    topicQs.forEach(pushUnique);
    bankQuestions.forEach(pushUnique);
    fb.forEach(pushUnique);

    const questions = pool.slice(0, 30);
    if (questions.length === 0) questions.push(...fb);

    const out = {
      schemaVersion: '1.0',
      type: 'module',
      moduleId: cat.id,
      title: cat.title.replace(/^\W+/, '').trim() + ' — Module Quiz',
      icon: cat.icon || '📦',
      folder: folder,
      description: 'Mixed quiz covering all topics in ' + cat.title.replace(/^\W+/, '').trim() + '.',
      questionCount: questions.length,
      generatedAt: new Date().toISOString(),
      questions: questions
    };
    fs.writeFileSync(path.join(MODULES_DIR, cat.id + '.quiz.json'), JSON.stringify(out, null, 2));
    built++;
  });

  console.log('Built ' + built + ' module quizzes in quizzes/modules/');
}

main();
