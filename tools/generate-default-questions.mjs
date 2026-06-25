import fs from "node:fs";
import path from "node:path";

const TYPE_MAP = new Set(["choice", "fill", "boolean", "concept", "multi", "ordering", "matching", "scenario", "code"]);
const DIFFICULTY_MAP = {
  easy: "beginner",
  beginner: "beginner",
  medium: "advanced",
  advanced: "advanced",
  hard: "senior",
  senior: "senior"
};

const [sourceDirArg, outputFileArg = "questions.js"] = process.argv.slice(2);

if (!sourceDirArg) {
  console.error("Usage: node tools/generate-default-questions.mjs <question-bank-dir> [output-file]");
  process.exit(1);
}

const sourceDir = path.resolve(sourceDirArg);
const outputFile = path.resolve(outputFileArg);

function normalizeDifficulty(value = "advanced") {
  const normalized = String(value).trim().toLowerCase();
  return DIFFICULTY_MAP[normalized] || "advanced";
}

function splitList(value = "") {
  return String(value)
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

function bilingual(zh, en) {
  const zhText = String(zh || "").trim();
  const enText = String(en || "").trim();
  if (zhText && enText) return { zh: zhText, en: enText };
  if (zhText) return { zh: zhText, en: zhText };
  if (enText) return { zh: enText, en: enText };
  return { zh: "", en: "" };
}

function buildList(zh, en) {
  const zhList = splitList(zh);
  const enList = splitList(en);
  const length = Math.max(zhList.length, enList.length);
  return Array.from({ length }, (_, index) => bilingual(zhList[index] || enList[index], enList[index] || zhList[index]));
}

function unique(items) {
  return [...new Set(items.map((item) => String(item).trim()).filter(Boolean))];
}

function parseCsv(value = "") {
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseIndexList(value = "") {
  return parseCsv(value).map((item) => Number(item)).filter((item) => Number.isInteger(item));
}

function parsePairs(value = "") {
  return parseCsv(value)
    .map((item) => item.split("-").map((part) => Number(part.trim())))
    .filter((pair) => pair.length === 2 && pair.every((part) => Number.isInteger(part)));
}

function parseFields(lines) {
  const fields = {};
  let currentKey = "";

  for (const line of lines) {
    const match = line.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/);
    if (match) {
      currentKey = match[1].toLowerCase();
      fields[currentKey] = match[2].trim();
      continue;
    }

    if (currentKey) {
      fields[currentKey] = `${fields[currentKey] ? `${fields[currentKey]}\n` : ""}${line}`;
    }
  }

  return fields;
}

function parseIndex() {
  const indexFile = path.join(sourceDir, "00-INDEX.md");
  if (!fs.existsSync(indexFile)) return new Map();

  const text = fs.readFileSync(indexFile, "utf8");
  const map = new Map();
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^-\s+`([^`]+)`：(.+)$/);
    if (!match) continue;
    map.set(match[1], match[2].trim());
  }
  return map;
}

function parseQuestionBlock(block, fileName) {
  const lines = block.split(/\r?\n/);
  const titleLine = lines.shift()?.replace(/^## Q:\s*/, "").trim() || "";
  const fields = parseFields(lines);

  const groupId = fields.groupid;
  const type = String(fields.type || "").trim().toLowerCase();
  if (!groupId) throw new Error(`${fileName}: missing groupId for "${titleLine}"`);
  if (!TYPE_MAP.has(type)) throw new Error(`${fileName}: unsupported type "${type}" for "${titleLine}"`);

  const question = {
    id: fields.variantid || `${groupId}-${titleLine}`,
    groupId,
    variantId: fields.variantid || `${groupId}-${type}`,
    groupTitle: bilingual(fields.grouptitle || groupId, fields.grouptitleen || groupId),
    title: bilingual(titleLine, fields.titleen),
    type,
    category: bilingual(fields.category, fields.categoryen),
    difficulty: normalizeDifficulty(fields.difficulty),
    prompt: bilingual(fields.prompt || titleLine, fields.prompten || fields.titleen || titleLine),
    hints: splitList(fields.hint).map((hint, index) => bilingual(hint, splitList(fields.hinten)[index] || hint)),
    explanation: bilingual(fields.explanation, fields.explanationen)
  };

  if (type === "choice" || type === "scenario") {
    const options = splitList(fields.options);
    const optionsEn = splitList(fields.optionsen);
    question.options = options.map((option, index) => bilingual(option, optionsEn[index] || option));
    question.answer = Number(fields.answer);
  }

  if (type === "scenario") {
    question.scenario = bilingual(fields.scenario, fields.scenarioen);
  }

  if (type === "multi") {
    const options = splitList(fields.options);
    const optionsEn = splitList(fields.optionsen);
    question.options = options.map((option, index) => bilingual(option, optionsEn[index] || option));
    question.answer = parseIndexList(fields.answer);
  }

  if (type === "ordering") {
    const options = splitList(fields.options);
    const optionsEn = splitList(fields.optionsen);
    question.options = options.map((option, index) => bilingual(option, optionsEn[index] || option));
    question.answer = parseIndexList(fields.answer);
    question.placeholder = bilingual(fields.placeholder || "例：B,C,A,D", fields.placeholderen || "Example: B,C,A,D");
  }

  if (type === "matching") {
    const left = splitList(fields.left);
    const leftEn = splitList(fields.leften);
    const right = splitList(fields.right);
    const rightEn = splitList(fields.righten);
    question.left = left.map((item, index) => bilingual(item, leftEn[index] || item));
    question.right = right.map((item, index) => bilingual(item, rightEn[index] || item));
    question.answer = parsePairs(fields.answer);
    question.placeholder = bilingual(fields.placeholder || "例：A-2,B-3,C-1", fields.placeholderen || "Example: A-2,B-3,C-1");
  }

  if (type === "fill") {
    question.placeholder = bilingual(fields.placeholder || "請輸入答案", fields.placeholderen || "Type your answer");
    question.answers = unique([...splitList(fields.answer), ...splitList(fields.answeren)]);
    question.caseSensitive = false;
  }

  if (type === "boolean") {
    question.answer = /^(true|yes|1|是|正確)$/i.test(fields.answer || "");
  }

  if (type === "concept") {
    const keywordGroups = splitList(fields.keywords);
    const keywordGroupsEn = splitList(fields.keywordsen);
    question.placeholder = bilingual(fields.placeholder || "請用自己的話說明", fields.placeholderen || "Explain in your own words");
    question.keywords = keywordGroups.map((group, index) =>
      unique([
        ...group.split(",").map((item) => item.trim()),
        ...(keywordGroupsEn[index] || "").split(",").map((item) => item.trim())
      ])
    );
    question.modelAnswer = bilingual(fields.answer, fields.modelansweren || fields.answeren || fields.explanationen);
  }

  if (type === "code") {
    question.lang = fields.lang || "text";
    question.signature = fields.signature || "";
    question.constraints = bilingual(fields.constraints, fields.constraintsen);
    question.examples = buildList(fields.examples, fields.examplesen);
    question.tests = splitList(fields.tests);
    question.solution = fields.solution || "";
    question.complexity = bilingual(fields.complexity, fields.complexityen);
    question.placeholder = bilingual(fields.placeholder || "請貼上你的解法", fields.placeholderen || "Paste your solution");
    question.modelAnswer = fields.solution || fields.answer || "";
  }

  return question;
}

function parseQuestionFile(fileName, groupTitleMap) {
  const text = fs.readFileSync(path.join(sourceDir, fileName), "utf8");
  const blocks = text
    .split(/\n(?=## Q:\s*)/)
    .map((block) => block.trim())
    .filter((block) => block.startsWith("## Q:"));

  return blocks.map((block) => {
    const question = parseQuestionBlock(block, fileName);
    const title = groupTitleMap.get(question.groupId);
    if (title) question.groupTitle = bilingual(title, question.groupId);
    return question;
  });
}

const groupTitleMap = parseIndex();
const files = fs
  .readdirSync(sourceDir)
  .filter((file) => /^\d{2}-.+\.md$/u.test(file) && file !== "00-INDEX.md")
  .sort((a, b) => a.localeCompare(b, "zh-Hant"));

const questions = files.flatMap((file) => parseQuestionFile(file, groupTitleMap));
const groups = new Set(questions.map((question) => question.groupId));
const difficultyCounts = questions.reduce((counts, question) => {
  counts[question.difficulty] = (counts[question.difficulty] || 0) + 1;
  return counts;
}, {});

const output = `// Built-in IssueCode question bank.
// Generated from Markdown with: node tools/generate-default-questions.mjs <question-bank-dir> questions.js
// Source files: ${files.join(", ")}

window.DEFAULT_QUESTIONS = ${JSON.stringify(questions, null, 2)};
`;

fs.writeFileSync(outputFile, output, "utf8");

console.log(`Generated ${questions.length} questions across ${groups.size} groups.`);
console.log(JSON.stringify(difficultyCounts, null, 2));
