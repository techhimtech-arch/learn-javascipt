# Quiz JSON Schema

Every quiz file is plain JSON so it works offline (PWA) and is easy to add/edit.

## Single question (shared by all quiz files)

```json
{
  "id": "js-engine-q1",
  "topic": "JavaScript Engine",
  "question": "Which engine powers both Chrome and Node.js?",
  "options": [
    { "id": "a", "text": "SpiderMonkey" },
    { "id": "b", "text": "V8" },
    { "id": "c", "text": "Chakra" },
    { "id": "d", "text": "JavaScriptCore" }
  ],
  "correctOptionId": "b",
  "explanation": "V8 is Google's open-source engine used in Chrome and Node.js.",
  "difficulty": "easy",          // optional: "easy" | "medium" | "hard"
  "tags": ["engine", "runtime"]  // optional
}
```

- `id` — unique within the file (and ideally globally). Use `<topic-slug>-q<n>`.
- `correctOptionId` — must match one `options[].id`.
- `explanation` — shown after answering (for revision).

## Per-topic file  →  `<NN - Topic Name>.quiz.json`

Lives next to its `.md` in the same numbered folder.

```json
{
  "schemaVersion": "1.0",
  "type": "topic",
  "topicPath": "01 JavaScript Fundamentals/001 - JavaScript Engine.md",
  "title": "JavaScript Engine Quiz",
  "createdAt": "2026-08-12",
  "questions": [ /* ...Question[] */ ]
}
```

`aggregate_quizzes.js` reads every `*.quiz.json`, derives the `topicId`
(`topicPath` minus `.md`, lowercased, non-alphanumerics → `-`) and writes
`quizzes/quiz-index.json` so the app can show a "Take Quiz" button per topic.

## Bank file  →  `quizzes/banks/<bankId>.json`

Auto-generated. Do **not** edit by hand — edit the per-topic files instead.

```json
{
  "schemaVersion": "1.0",
  "type": "bank",
  "bankId": "interview",
  "title": "Interview Practice Bank",
  "icon": "❓",
  "description": "...",
  "questionCount": 42,
  "generatedAt": "2026-08-12T...Z",
  "questions": [ /* flattened Question[] with _srcTopic / _srcPath */ ]
}
```

Bank assignment (by topic folder):
- `interview` → folder `15 Interview Questions`
- `angular`   → folders `08`–`14` (RxJS → Testing)
- `concepts`  → everything else (JS/TS/HTML/CSS/Data Analytics)

## How to add a new quiz

1. Create `<NN - Topic>.quiz.json` beside the `.md`.
2. Add questions (aim 8–20 each).
3. Run `node aggregate_quizzes.js` (or push — CI regenerates banks).
4. Done. The "Take Quiz" button + bank picker pick it up automatically.

Progress (attempts, scores) is stored in **IndexedDB** (`QuizDB`) and falls back
to localStorage when IndexedDB is unavailable.
