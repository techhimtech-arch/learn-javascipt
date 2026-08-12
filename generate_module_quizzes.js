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

function getBankForFolder(folderName) {
  if (folderName.toLowerCase().includes('interview')) return 'interview';
  const m = folderName.match(/^(\d+)/);
  const n = m ? parseInt(m[1], 10) : 999;
  if (n >= 8 && n <= 14) return 'angular';
  return 'concepts';
}

// Curated bank questions keyed by bankId (loaded once).
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

// Per-topic quiz questions keyed by folder name.
function loadTopicQuestionsByFolder() {
  const map = {};
  const dirs = fs.readdirSync(ROOT, { withFileTypes: true })
    .filter(d => d.isDirectory() && /^\d/.test(d.name));
  dirs.forEach(d => {
    const dp = path.join(ROOT, d.name);
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
  return map;
}

// ---- Fallback question generation (real, conceptual — not "todo" placeholders) ----
function opt(...items) {
  // items: [text, isCorrect?]
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
      opt(['Build small examples, quiz yourself, and revisit weak spots.', true],
          ['Read once and never practice.', false],
          ['Memorise API signatures only.', false],
          ['Avoid running the code.', false]),
      'Active recall (quizzes) + spaced repetition beats passive reading.'),
    Q(hashId(category.id + 'm3'),
      `A senior engineer reviewing "${name}" would most expect you to:`,
      opt(['Explain the "why", trade-offs, and a real-world use case.', true],
          ['Recite the definition word-for-word.', false],
          ['Claim it is never needed.', false],
          ['Copy code without understanding it.', false]),
      'Interviews reward understanding of trade-offs and applicability, not rote definitions.')
  ];
  // Add a folder-specific conceptual question for key modules.
  const specifics = {
    '01 JavaScript Fundamentals': Q(hashId(category.id + 'm4'),
      'In JavaScript, `typeof null` evaluates to:',
      opt(['"object"', true], ['"null"', false], ['"undefined"', false], ['"number"', false]),
      'A long-standing quirk: typeof null === "object" due to the original JS implementation.'),
    '02 Advanced JavaScript': Q(hashId(category.id + 'm4'),
      'A Promise that never resolves or rejects is called:',
      opt(['A pending promise that may cause a memory/resource leak if awaited.', true],
          ['A fulfilled promise.', false], ['A rejected promise.', false], ['A microtask.', false]),
      'An unresolved promise keeps its continuation alive; guard with timeouts where needed.'),
    '03 ES6+': Q(hashId(category.id + 'm4'),
      'Arrow functions differ from regular functions mainly because they:',
      opt(['Do not have their own `this` binding.', true],
          ['Cannot be used in modules.', false], ['Run faster than all other functions.', false],
          ['Require the `function` keyword.', false]),
      'Arrow functions lexically bind `this`, which is why they are great for callbacks but not methods.'),
    '04 TypeScript': Q(hashId(category.id + 'm4'),
      'The TypeScript `interface` keyword is primarily used to:',
      opt(['Describe the shape of an object/contract without emitting runtime code.', true],
          ['Allocate memory at runtime.', false], ['Replace JavaScript entirely.', false],
          ['Compile to CSS.', false]),
      'Interfaces are a compile-time construct — they disappear after tsc emits JS.'),
    '05 Browser Internals': Q(hashId(category.id + 'm4'),
      'The browser event loop processes:',
      opt(['One macrotask then drains the microtask queue, repeating.', true],
          ['All macrotasks before any microtask.', false],
          ['Only microtasks forever.', false], ['Tasks in random order.', false]),
      'After each macrotask, the microtask queue (Promise callbacks) is fully drained.'),
    '06 HTML': Q(hashId(category.id + 'm4'),
      'The purpose of semantic HTML elements (e.g. <main>, <nav>) is to:',
      opt(['Convey meaning/structure to browsers, assistive tech, and developers.', true],
          ['Make the page render faster automatically.', false],
          ['Replace CSS.', false], ['Prevent JavaScript from running.', false]),
      'Semantic tags improve accessibility and SEO, not raw speed.'),
    '07 CSS': Q(hashId(category.id + 'm4'),
      'CSS specificity determines:',
      opt(['Which rule wins when multiple selectors target the same element.', true],
          ['The order files are loaded on disk.', false], ['The font size globally.', false],
          ['Whether JS can access the element.', false]),
      'Higher-specificity selectors override lower ones; !important and source order are tie-breakers.'),
    '08 RxJS': Q(hashId(category.id + 'm4'),
      'In RxJS, an Observable is:',
      opt(['A lazy stream of values that pushes data to subscribers over time.', true],
          ['A single static value.', false], ['The same as a Promise that resolves twice.', false],
          ['A DOM node.', false]),
      'Observables can emit 0..n values and are lazy — they run only when subscribed.'),
    '09 Angular Core': Q(hashId(category.id + 'm4'),
      'Angular Dependency Injection (DI) primarily helps with:',
      opt(['Decoupling classes by providing their dependencies from outside.', true],
          ['Making templates slower.', false], ['Removing TypeScript.', false],
          ['Bundling CSS.', false]),
      'DI provides services/dependencies to components, improving testability and reuse.'),
    '10 Angular Advanced': Q(hashId(category.id + 'm4'),
      'Angular signals are mainly used to:',
      opt(['Track reactive state and trigger fine-grained UI updates.', true],
          ['Replace the HTTP client.', false], ['Store secrets.', false], ['Compile templates.', false]),
      'Signals provide a reactive primitive with automatic dependency tracking.'),
    '11 Angular Performance': Q(hashId(category.id + 'm4'),
      'To reduce unnecessary change detection in Angular you can:',
      opt(['Use OnPush change detection strategy where appropriate.', true],
          ['Call detectChanges in a loop constantly.', false], ['Disable zone.js globally with no plan.', false],
          ['Avoid trackBy in *ngFor.', false]),
      'OnPush limits checks to when inputs/references change, improving render performance.'),
    '12 Machine Coding': Q(hashId(category.id + 'm4'),
      'In a machine-coding round, interviewers most value:',
      opt(['A working, readable solution with edge-case handling.', true],
          ['The longest possible file.', false], ['Using every API you know.', false],
          ['Skipping testing.', false]),
      'Correctness, clarity, and edge cases matter more than cleverness.'),
    '13 Frontend System Design': Q(hashId(category.id + 'm4'),
      'Frontend system design focuses on:',
      opt(['Data flow, state management, rendering, caching, and scaling the UI.', true],
          ['Only choosing a colour palette.', false], ['Writing one component.', false],
          ['Avoiding diagrams.', false]),
      'You must reason about architecture, not just implement a single feature.'),
    '14 Testing': Q(hashId(category.id + 'm4'),
      'The testing pyramid suggests:',
      opt(['Many unit tests, fewer integration, fewest e2e tests.', true],
          ['Only e2e tests.', false], ['No unit tests at all.', false], ['Random test counts.', false]),
      'Unit tests are cheap and numerous; e2e tests are slow and few.'),
    '15 Interview Questions': Q(hashId(category.id + 'm4'),
      'A strong interview answer should:',
      opt(['State the approach, trade-offs, and a concrete example.', true],
          ['Be as vague as possible.', false], ['Avoid examples.', false], ['Guess randomly.', false]),
      'Structured answers (approach → trade-offs → example) score highest.'),
    '16 Data Analytics Foundations': Q(hashId(category.id + 'm4'),
      'The first step in any analytics task is usually:',
      opt(['Understanding the business question and the data available.', true],
          ['Picking a random chart.', false], ['Deleting rows.', false], ['Skipping exploration.', false]),
      'Define the question and audit data quality before analysis.'),
    '17 Excel & Google Sheets for Analytics': Q(hashId(category.id + 'm4'),
      'Pivot tables are used to:',
      opt(['Summarise and aggregate large datasets interactively.', true],
          ['Write macros only.', false], ['Send emails.', false], ['Compile code.', false]),
      'Pivot tables quickly group, sum, and filter data without formulas.'),
    '18 SQL Database Mastery': Q(hashId(category.id + 'm4'),
      'A SQL `JOIN` is used to:',
      opt(['Combine rows from two or more tables based on a related column.', true],
          ['Delete tables.', false], ['Create a new database only.', false], ['Format numbers.', false]),
      'JOINs relate tables via keys (e.g. INNER, LEFT) to answer cross-table questions.'),
    '19 Python for Data Analytics': Q(hashId(category.id + 'm4'),
      'In Python analytics, pandas DataFrames are:',
      opt(['Tabular, column-oriented structures for fast data manipulation.', true],
          ['A type of image.', false], ['A CSS framework.', false], ['A database engine.', false]),
      'pandas provides vectorised operations over labelled 2D tables.'),
    '20 Data Visualization & Dashboards': Q(hashId(category.id + 'm4'),
      'A good dashboard should:',
      opt(['Show the right metrics clearly and enable decisions.', true],
          ['Include every possible chart.', false], ['Hide the numbers.', false],
          ['Use random colours only.', false]),
      'Dashboards must be legible and aligned to the decisions they support.')
  };
  if (specifics[folder]) base.push(specifics[folder]);
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
    const bankId = getBankForFolder(folder);

    // 1) per-topic questions for this module
    const topicQs = (topicQsByFolder[folder] || []).map(q => Object.assign({}, q));
    // 2) bank questions for this module's bank
    const bankQuestions = (bankQs[bankId] || []).map(q => Object.assign({}, q));
    // 3) fallback so module is never empty
    const fb = fallbackQuestions(cat);

    // Build a pool: prefer real questions, fill with bank, then fallback.
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

    // Cap to a reasonable module size (e.g. up to 25) but keep at least fallback.
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
