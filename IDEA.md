i want to continuously add andupdate learning material and i want to update it to make topics wise quiz mabe i can have a json which has quiz questions and options to answer  and eve explan . the progree of user will be stored in browsr indexed db ..and it can also work offline PWA type .. right now we have .md file ..but that same topic will have json file also that will contain 20 quiz questions for the same topic .

## Quiz System (IMPLEMENTED)
- Every topic can have a `<name>.md.quiz.json` next to its `.md` (per-topic quiz, 4-option MCQ + explanation). See `quiz-schema.md`.
- CI (`aggregate_quizzes.js`) scans all `*.quiz.json`, builds `quizzes/quiz-index.json` (topicId -> file) and 3 curated banks:
  - `interview` (mixed real interview Qs), `angular` (RxJS/Angular deep), `concepts` (core JS/TS/HTML/CSS/Analytics).
- `generate_module_quizzes.js` builds ONE quiz per module (all 21 categories) so **every module is quiz-able** even before per-topic files exist. It pulls real per-topic + bank questions first, then fills with conceptual fallback Qs (never empty, never "todo").
- Browser app (`js/app.js`) exposes `window.startQuiz(kind, id)` where kind ∈ {bank, module, topic}. Quizzes open via the 🧩 header button (banks/modules) or the per-topic "🧩 Take Quiz" button inside an article.
- Progress saved offline in IndexedDB (`js/db.js`) with localStorage fallback. PWA: `manifest.webmanifest` + `sw.js` (offline app shell + quiz JSON).
- **Workflow:** add `.quiz.json` next to any `.md` → commit → deploy regenerates banks + module quizzes. Always keep IDEA.md updated when changing the quiz architecture.
