(function () {
  "use strict";

  const STORAGE = {
    questions: "issuecode.customQuestions.v1",
    history: "issuecode.history.v1",
    nickname: "issuecode.nickname.v1",
    language: "issuecode.language.v1",
    difficulty: "issuecode.difficulty.v1"
  };

  const LANGUAGES = [
    { id: "zh", label: "中文", shortLabel: "中", description: { zh: "只顯示中文", en: "Chinese only" } },
    { id: "en", label: "English", shortLabel: "EN", description: { zh: "只顯示英文", en: "English only" } },
    { id: "both", label: "中英並行", shortLabel: "中 / EN", description: { zh: "中文與英文同時呈現", en: "Chinese and English shown together" } }
  ];

  const TYPE_LABELS = {
    choice: { zh: "選擇題", en: "Multiple choice" },
    fill: { zh: "填空題", en: "Fill in the blank" },
    boolean: { zh: "是非題", en: "True / False" },
    concept: { zh: "概念題", en: "Concept" }
  };

  const BOOL_LABELS = {
    correct: { zh: "正確", en: "True" },
    incorrect: { zh: "錯誤", en: "False" }
  };

  const DIFFICULTY_LEVELS = [
    { id: "all", legacy: "", stars: "✦", label: { zh: "全部難度", en: "All levels" }, description: { zh: "從所有難度隨機抽題", en: "Sample from every difficulty" } },
    { id: "beginner", legacy: "Easy", stars: "★", label: { zh: "一星｜初學者", en: "1 star | Beginner" }, description: { zh: "適合熟悉名詞、流程入口與基本判斷", en: "For terms, entry points, and basic judgments" } },
    { id: "advanced", legacy: "Medium", stars: "★★", label: { zh: "二星｜進階", en: "2 stars | Advanced" }, description: { zh: "適合追資料語意、條件與跨層關係", en: "For data semantics, conditions, and cross-layer links" } },
    { id: "senior", legacy: "Hard", stars: "★★★", label: { zh: "三星｜資深", en: "3 stars | Senior" }, description: { zh: "適合完整根因、修正策略與驗證回滾", en: "For root cause, fix strategy, validation, and rollback" } }
  ];

  const FALLBACK_TEXT = {
    importedCategory: { zh: "匯入題庫", en: "Imported" },
    importedHint: { zh: "回到題目中的關鍵名詞思考。", en: "Start from the key terms in the question." },
    importedExplanation: { zh: "此題由外部題庫匯入。", en: "This question was imported from an external file." },
    modelAnswer: { zh: "請依課程內容回答。", en: "Answer according to the training material." },
    answerPlaceholder: { zh: "輸入答案", en: "Type your answer" },
    noAnswer: { zh: "未作答", en: "No answer" }
  };

  const app = document.querySelector("#app");
  const fileInput = document.querySelector("#question-import");
  const state = {
    view: "home",
    hintLimit: 3,
    peekLimit: 1,
    language: normalizeLanguage(localStorage.getItem(STORAGE.language) || "both"),
    difficulty: normalizeDifficulty(localStorage.getItem(STORAGE.difficulty) || "all"),
    customQuestions: loadJson(STORAGE.questions, []),
    session: null,
    timerId: null
  };

  function normalizeLanguage(value) {
    return LANGUAGES.some((item) => item.id === value) ? value : "both";
  }

  function normalizeDifficulty(value) {
    const raw = normalizeText(value);
    const aliases = {
      "": "all",
      all: "all",
      any: "all",
      全部: "all",
      easy: "beginner",
      beginner: "beginner",
      junior: "beginner",
      "1": "beginner",
      "1 star": "beginner",
      "one star": "beginner",
      一星: "beginner",
      初學者: "beginner",
      medium: "advanced",
      advanced: "advanced",
      intermediate: "advanced",
      "2": "advanced",
      "2 star": "advanced",
      "two star": "advanced",
      二星: "advanced",
      進階: "advanced",
      hard: "senior",
      senior: "senior",
      expert: "senior",
      "3": "senior",
      "3 star": "senior",
      "three star": "senior",
      三星: "senior",
      三顆星: "senior",
      資深: "senior"
    };
    return aliases[raw] || (DIFFICULTY_LEVELS.some((item) => item.id === value) ? value : "advanced");
  }

  function difficultyLevel(value) {
    const id = normalizeDifficulty(value || "advanced");
    return DIFFICULTY_LEVELS.find((item) => item.id === id && item.id !== "all") || DIFFICULTY_LEVELS[2];
  }

  function difficultyFilter(value = state.difficulty) {
    const id = normalizeDifficulty(value);
    return DIFFICULTY_LEVELS.find((item) => item.id === id) || DIFFICULTY_LEVELS[0];
  }

  function difficultyMatches(question) {
    return state.difficulty === "all" || normalizeDifficulty(question.difficulty) === state.difficulty;
  }

  function activeLanguage() {
    return state.language === "en" ? "en" : "zh";
  }

  function isI18n(value) {
    return value && typeof value === "object" && !Array.isArray(value);
  }

  function textOf(value, lang = activeLanguage()) {
    if (isI18n(value)) return String(value[lang] ?? value.zh ?? value.en ?? "");
    return String(value ?? "");
  }

  function plainText(value, lang = activeLanguage()) {
    return textOf(value, lang);
  }

  function renderText(value, className = "") {
    if (state.language === "both" && isI18n(value)) {
      const zh = textOf(value, "zh");
      const en = textOf(value, "en");
      if (zh && en && zh !== en) {
        return `<span class="bi-text ${className}"><span>${escapeHtml(zh)}</span><small>${escapeHtml(en)}</small></span>`;
      }
    }
    return escapeHtml(plainText(value));
  }

  function textCandidates(value) {
    if (Array.isArray(value)) return value.flatMap(textCandidates);
    if (isI18n(value)) return [value.zh, value.en].filter(Boolean).map(String);
    return [value].filter((item) => item !== null && item !== undefined && item !== "").map(String);
  }

  function loadJson(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      return parsed ?? fallback;
    } catch (_) {
      return fallback;
    }
  }

  function allQuestions() {
    return [...window.DEFAULT_QUESTIONS, ...state.customQuestions];
  }

  function groupedQuestions(questions = allQuestions()) {
    const groups = new Map();
    questions.forEach((question) => {
      const key = question.groupId || question.id;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(question);
    });
    return [...groups.entries()].map(([id, variants]) => ({ id, variants }));
  }

  function selectSessionQuestions() {
    return shuffle(groupedQuestions()
      .map((group) => ({ ...group, variants: group.variants.filter(difficultyMatches) }))
      .filter((group) => group.variants.length)
      .map((group) => shuffle(group.variants)[0]));
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalizeText(value) {
    return String(value ?? "")
      .trim()
      .toLocaleLowerCase("zh-Hant")
      .replace(/[，。；、/|]+/g, " ")
      .replace(/\s+/g, " ");
  }

  function formatTime(seconds) {
    const safe = Math.max(0, Number(seconds) || 0);
    const minutes = Math.floor(safe / 60);
    return `${String(minutes).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
  }

  function formatDate(iso) {
    const locale = state.language === "en" ? "en-US" : "zh-TW";
    return new Intl.DateTimeFormat(locale, {
      month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false
    }).format(new Date(iso));
  }

  function shuffle(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[target]] = [copy[target], copy[index]];
    }
    return copy;
  }

  function toast(message, kind = "") {
    const region = document.querySelector("#toast-region");
    const node = document.createElement("div");
    node.className = `toast ${kind}`;
    node.textContent = plainText(message);
    region.append(node);
    setTimeout(() => node.remove(), 3200);
  }

  function renderLanguageSwitch(mode = "compact") {
    return `
      <div class="language-control ${mode}">
        <span class="language-label">${renderText({ zh: "語系顯示", en: "Language" })}</span>
        <div class="language-switch ${mode === "panel" ? "large" : "compact"}" data-language-switch role="group" aria-label="${escapeHtml(plainText({ zh: "語系顯示切換", en: "Language display switch" }))}">
          ${LANGUAGES.map((item) => `
            <button type="button" class="${state.language === item.id ? "active" : ""}" data-language="${item.id}" aria-pressed="${state.language === item.id}">
              <strong>${escapeHtml(mode === "panel" ? item.label : item.shortLabel)}</strong>
              ${mode === "panel" ? `<small>${renderText(item.description)}</small>` : ""}
            </button>`).join("")}
        </div>
      </div>`;
  }

  function difficultyStats() {
    const questions = allQuestions();
    return DIFFICULTY_LEVELS.reduce((result, level) => {
      const filtered = level.id === "all" ? questions : questions.filter((question) => normalizeDifficulty(question.difficulty) === level.id);
      result[level.id] = {
        variants: filtered.length,
        topics: groupedQuestions(filtered).length
      };
      return result;
    }, {});
  }

  function renderDifficultySelector() {
    const stats = difficultyStats();
    return `
      <div class="difficulty-card">
        <div class="selector-head">
          <div>
            <span class="language-label">${renderText({ zh: "題型難度", en: "Difficulty" })}</span>
            <p>${renderText({ zh: "測驗者可先選難度；題庫製作時用 difficulty 直接標示，往後會自動判定。", en: "Choose a level before practice. Future question files use the difficulty field for automatic filtering." })}</p>
          </div>
          <span class="count-badge">${escapeHtml(state.difficulty === "all" ? "ALL" : difficultyLevel(state.difficulty).stars)}</span>
        </div>
        <div class="difficulty-switch" role="group" aria-label="${escapeHtml(plainText({ zh: "選擇題型難度", en: "Choose question difficulty" }))}">
          ${DIFFICULTY_LEVELS.map((level) => `
            <button type="button" class="${state.difficulty === level.id ? "active" : ""}" data-difficulty="${level.id}" aria-pressed="${state.difficulty === level.id}">
              <strong>${level.id === "all" ? "ALL" : escapeHtml(level.stars)}</strong>
              <span>${renderText(level.label)}</span>
              <small>${renderText(level.description)} · ${stats[level.id].topics} topics / ${stats[level.id].variants} variants</small>
            </button>`).join("")}
        </div>
      </div>`;
  }

  function renderDifficultyBadge(question) {
    const level = difficultyLevel(question.difficulty);
    return `<span class="difficulty ${level.id}"><strong>${escapeHtml(level.stars)}</strong> ${renderText(level.label)}</span>`;
  }

  function syncLanguageSwitches() {
    const switches = [...new Set([...document.querySelectorAll("#language-switch, [data-language-switch]")])];
    switches.forEach((switcher) => {
      const isLarge = switcher.classList.contains("large");
      switcher.innerHTML = LANGUAGES.map((item) => `
        <button type="button" class="${state.language === item.id ? "active" : ""}" data-language="${item.id}" aria-pressed="${state.language === item.id}">
          <strong>${escapeHtml(isLarge ? item.label : item.shortLabel)}</strong>
          ${isLarge ? `<small>${renderText(item.description)}</small>` : ""}
        </button>`).join("");
    });
  }

  function renderChrome() {
    document.documentElement.lang = state.language === "en" ? "en" : "zh-Hant";
    document.title = plainText({ zh: "IssueCode｜把問題復盤練成直覺", en: "IssueCode | Debug Practice Lab" });
    document.querySelector(".brand")?.setAttribute("aria-label", plainText({ zh: "回到首頁", en: "Back to home" }));
    const brandSmall = document.querySelector(".brand small");
    if (brandSmall) brandSmall.textContent = plainText({ zh: "Debug Practice Lab", en: "Debug Practice Lab" });
    const nav = document.querySelector(".topnav");
    nav?.setAttribute("aria-label", plainText({ zh: "主要導覽", en: "Main navigation" }));
    document.querySelector('[data-view="home"]').textContent = plainText({ zh: "首頁", en: "Home" });
    document.querySelector('[data-view="history"]').textContent = plainText({ zh: "紀錄", en: "Records" });
    document.querySelector('[data-view="library"]').textContent = plainText({ zh: "題庫", en: "Library" });
    syncLanguageSwitches();
    const localMode = document.querySelector("#local-mode-label");
    if (localMode) localMode.textContent = plainText({ zh: "LOCAL MODE", en: "LOCAL MODE" });
  }

  function setActiveNav(view) {
    document.querySelectorAll(".nav-item").forEach((button) => {
      button.classList.toggle("active", button.dataset.view === view);
    });
  }

  function navigate(view) {
    if (state.session && !state.session.completed && view !== "quiz") {
      const ok = window.confirm(plainText({
        zh: "離開測驗會中止目前作答，確定要離開嗎？",
        en: "Leaving will stop the current quiz. Continue?"
      }));
      if (!ok) return;
      stopTimer();
      state.session = null;
    }
    state.view = view;
    setActiveNav(view);
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function render() {
    renderChrome();
    if (state.view === "home") renderHome();
    if (state.view === "quiz") renderQuiz();
    if (state.view === "results") renderResults();
    if (state.view === "history") renderHistory();
    if (state.view === "library") renderLibrary();
    app.focus({ preventScroll: true });
  }

  function renderAllowance(key, label, description, value, min, max) {
    return `
      <div class="allowance-card">
        <div class="allowance-top">
          <span class="allowance-title">${renderText(label)}</span>
          <div class="stepper" data-key="${key}">
            <button type="button" data-step="-1" aria-label="${escapeHtml(plainText({ zh: `減少${textOf(label, "zh")}`, en: `Decrease ${textOf(label, "en")}` }))}">−</button>
            <output>${value}</output>
            <button type="button" data-step="1" aria-label="${escapeHtml(plainText({ zh: `增加${textOf(label, "zh")}`, en: `Increase ${textOf(label, "en")}` }))}">＋</button>
          </div>
        </div>
        <p>${renderText(description)} ${escapeHtml(plainText({ zh: `可設定 ${min}～${max} 次。`, en: `Range: ${min}-${max}.` }))}</p>
      </div>
    `;
  }

  function renderHome() {
    const questions = allQuestions();
    const groups = groupedQuestions(questions);
    const eligibleQuestions = state.difficulty === "all" ? questions : questions.filter(difficultyMatches);
    const eligibleGroups = groupedQuestions(eligibleQuestions);
    const history = loadJson(STORAGE.history, []);
    const savedName = localStorage.getItem(STORAGE.nickname) || "";
    app.innerHTML = `
      <section class="page">
        <p class="eyebrow">Issue-driven learning / 01</p>
        <h1 class="hero-title">${renderText({ zh: "IssueCode", en: "IssueCode" })}<br><span>${renderText({ zh: "把問題復盤練成直覺", en: "Turn reviews into debugging instinct" })}</span></h1>
        <p class="hero-copy">${renderText({
          zh: "以 Issue 為題材，從畫面一路追到 Stored Procedure。每次練習會打亂題目，留下分數、時間與暱稱。",
          en: "Practice with an issue case, tracing from the screen down to the Stored Procedure. Each run shuffles questions and stores score, time, and nickname locally."
        })}</p>

        <div class="home-grid">
          <section class="panel setup-panel">
            <div class="panel-header">
              <div>
                <h2>${renderText({ zh: "開始練習設定", en: "Practice setup" })}</h2>
                <p>${renderText({
                  zh: "先設定提示與偷看答案的次數；提示會降低該題最高分，偷看答案該題為 0 分。",
                  en: "Set hint and peek limits first. Hints cap that question at 8 points; peeking makes it 0 points."
                })}</p>
              </div>
              <span class="count-badge">${groups.length} TOPICS / ${questions.length} VARIANTS</span>
            </div>

            <div class="language-card">
              ${renderLanguageSwitch("panel")}
            </div>

            ${renderDifficultySelector()}

            <div class="form-group">
              <label class="form-label" for="nickname">${renderText({ zh: "練習暱稱", en: "Nickname" })}</label>
              <input id="nickname" class="text-input" maxlength="20" autocomplete="nickname" placeholder="${escapeHtml(plainText({ zh: "例如：Dana", en: "e.g. Dana" }))}" value="${escapeHtml(savedName)}" />
            </div>

            <div class="allowance-grid">
              ${renderAllowance("hint", { zh: "提示次數", en: "Hints" }, { zh: "每次提示會揭露方向，該題最高 8 分。", en: "Each hint reveals direction and caps that question at 8 points." }, state.hintLimit, 0, 9)}
              ${renderAllowance("peek", { zh: "偷看答案", en: "Peek answer" }, { zh: "直接看參考答案，該題不計分。", en: "Show the reference answer; that question earns 0 points." }, state.peekLimit, 0, 5)}
            </div>

            <div class="start-row">
              <div class="score-note"><strong>${renderText({ zh: "隨機規則", en: "Random rule" })}</strong><br>${renderText({ zh: `每個知識點只抽一種符合難度的題型，本次會有 ${eligibleGroups.length} 題。`, en: `One matching variant per topic. This run will have ${eligibleGroups.length} questions.` })}</div>
              <button class="primary-btn" data-action="start">${renderText({ zh: "開始練習 →", en: "Start practice →" })}</button>
            </div>
          </section>

          <aside class="panel brief-panel">
            <div class="brief-head">
              <span>CASE BRIEF / #2026-06</span>
              <h3>${renderText({ zh: "從畫面症狀追到資料來源", en: "Trace the symptom to the data source" })}</h3>
            </div>
            <ol class="brief-list">
              <li><span class="brief-number">01</span><div><strong>${renderText({ zh: "重現與取證", en: "Reproduce and capture" })}</strong><small>Network · RagneChange · CheckInfo</small></div></li>
              <li><span class="brief-number">02</span><div><strong>${renderText({ zh: "沿呼叫鏈下鑽", en: "Follow the call chain" })}</strong><small>Web · API · Service · VB · SP</small></div></li>
              <li><span class="brief-number">03</span><div><strong>${renderText({ zh: "定位根因", en: "Locate root cause" })}</strong><small>HumanlyUtility_5 · item=0</small></div></li>
              <li><span class="brief-number">04</span><div><strong>${renderText({ zh: "最小修正與驗證", en: "Minimal fix and validation" })}</strong><small>UNION · UAT · rollback</small></div></li>
            </ol>
            <div class="tag-row"><span class="tag">C#</span><span class="tag">VB.NET</span><span class="tag">SQL</span><span class="tag">ROOT CAUSE</span></div>
          </aside>
        </div>
        ${history.length ? `<p class="score-note" style="margin-top:18px">${renderText({ zh: `本機已有 ${history.length} 筆練習紀錄。`, en: `${history.length} local practice records are stored.` })}</p>` : ""}
      </section>
    `;
  }

  function startQuiz() {
    const nickname = document.querySelector("#nickname")?.value.trim();
    if (!nickname) {
      toast({ zh: "請先輸入練習暱稱。", en: "Enter a nickname first." }, "error");
      document.querySelector("#nickname")?.focus();
      return;
    }
    localStorage.setItem(STORAGE.nickname, nickname);
    localStorage.setItem(STORAGE.difficulty, state.difficulty);
    const questions = selectSessionQuestions();
    if (!questions.length) {
      toast({ zh: "目前題庫沒有符合這個難度的題目，請改選其他難度或匯入題庫。", en: "No questions match this difficulty. Choose another level or import more questions." }, "error");
      return;
    }
    state.session = {
      nickname,
      difficulty: state.difficulty,
      questions,
      index: 0,
      answers: questions.map(() => ({ value: null, hintsUsed: 0, peeked: false, score: null, correct: null })),
      hintLimit: state.hintLimit,
      peekLimit: state.peekLimit,
      hintsRemaining: state.hintLimit,
      peeksRemaining: state.peekLimit,
      startedAt: Date.now(),
      elapsed: 0,
      completed: false
    };
    state.view = "quiz";
    setActiveNav("");
    startTimer();
    renderQuiz();
  }

  function startTimer() {
    stopTimer();
    state.timerId = window.setInterval(() => {
      if (!state.session || state.session.completed) return;
      state.session.elapsed = Math.floor((Date.now() - state.session.startedAt) / 1000);
      const timer = document.querySelector("#timer");
      if (timer) timer.textContent = formatTime(state.session.elapsed);
    }, 1000);
  }

  function stopTimer() {
    if (state.timerId) window.clearInterval(state.timerId);
    state.timerId = null;
  }

  function currentQuestion() {
    return state.session.questions[state.session.index];
  }

  function renderQuiz() {
    const session = state.session;
    if (!session) return navigate("home");
    const question = currentQuestion();
    const answer = session.answers[session.index];
    const progress = (session.index / session.questions.length) * 100;
    const hintHtml = answer.hintsUsed ? question.hints.slice(0, answer.hintsUsed).map((hint) => renderText(hint)).join("<br>") : "";
    const peekHtml = answer.peeked ? renderAnswerLabel(question) : "";
    const mapMode = session.questions.length > 18 ? "compact" : "standard";

    app.innerHTML = `
      <section class="quiz-page">
        <div class="quiz-status">
          <div id="timer" class="timer">${formatTime(session.elapsed)}</div>
          <div class="progress-track" aria-label="${escapeHtml(plainText({ zh: "測驗進度", en: "Quiz progress" }))}"><div class="progress-fill" style="width:${progress}%"></div></div>
          <div class="question-count">${session.index + 1} / ${session.questions.length}</div>
        </div>
        <div class="quiz-layout">
          <aside class="quiz-sidebar">
            <div class="sidebar-head">Question map</div>
            <div class="question-map ${mapMode}">${session.questions.map((item, index) => `<button class="question-dot ${index === session.index ? "current" : ""} ${session.answers[index].score !== null ? "done" : ""}" aria-label="${escapeHtml(plainText({ zh: `第 ${index + 1} 題`, en: `Question ${index + 1}` }))}"><span>${escapeHtml(item.groupId || String(index + 1).padStart(2, "0"))}</span><small>${escapeHtml(item.variantId || item.id || "")}</small></button>`).join("")}</div>
            <div class="sidebar-summary">${renderText({ zh: "每組只出一種題型；同一知識點不會在同次練習重複出現。", en: "Only one variant is selected per topic in a single run." })}</div>
          </aside>

          <article class="question-card">
            <div class="question-meta">
              ${renderDifficultyBadge(question)}
              <span class="question-type">${renderText(TYPE_LABELS[question.type])}</span>
              <span class="question-type">${renderText(question.category || FALLBACK_TEXT.importedCategory)}</span>
              <span class="question-number">${escapeHtml(question.variantId || `ISSUE-${String(session.index + 1).padStart(3, "0")}`)}</span>
            </div>
            <h1>${renderText(question.title)}</h1>
            <p class="question-prompt">${renderText(question.prompt)}</p>
            <div class="answer-zone">${renderAnswerControl(question, answer)}</div>
            ${hintHtml ? `<div class="hint-box"><strong>${renderText({ zh: "提示", en: "Hint" })}</strong><br>${hintHtml}</div>` : ""}
            ${peekHtml ? `<div class="peek-box"><strong>${renderText({ zh: "參考答案", en: "Reference answer" })}</strong><br>${peekHtml}</div>` : ""}
            <div class="question-footer">
              <span class="keyboard-note">SELECT / TYPE YOUR ANSWER</span>
              <button class="primary-btn" data-action="submit-answer">${renderText({ zh: "送出答案 →", en: "Submit answer →" })}</button>
            </div>
          </article>

          <aside class="quiz-tools">
            <div class="tools-head">Assistance</div>
            <div class="tool-card">
              <div class="tool-top"><strong>${renderText({ zh: "提示", en: "Hint" })}</strong><span class="tool-count">${session.hintsRemaining} LEFT</span></div>
              <p>${renderText({ zh: "提供下一步方向；使用後該題最高 8 分。", en: "Reveal the next direction; max score becomes 8." })}</p>
              <button class="secondary-btn" data-action="hint" ${session.hintsRemaining <= 0 || answer.hintsUsed >= question.hints.length ? "disabled" : ""}>${renderText({ zh: "取得提示", en: "Get hint" })}</button>
            </div>
            <div class="tool-card">
              <div class="tool-top"><strong>${renderText({ zh: "偷看答案", en: "Peek answer" })}</strong><span class="tool-count">${session.peeksRemaining} LEFT</span></div>
              <p>${renderText({ zh: "直接顯示參考答案，該題不再計分。", en: "Show the reference answer; this question earns 0 points." })}</p>
              <button class="ghost-btn" data-action="peek" ${session.peeksRemaining <= 0 || answer.peeked ? "disabled" : ""}>${renderText({ zh: "顯示答案", en: "Show answer" })}</button>
            </div>
            <div class="tool-card">
              <div class="tool-top"><strong>${renderText({ zh: "計分規則", en: "Scoring" })}</strong></div>
              <div class="score-rule">
                <div class="rule-row"><span>${renderText({ zh: "完整答對", en: "Correct" })}</span><strong>10 pts</strong></div>
                <div class="rule-row"><span>${renderText({ zh: "使用提示", en: "With hint" })}</span><strong>max 8</strong></div>
                <div class="rule-row"><span>${renderText({ zh: "偷看答案", en: "Peeked" })}</span><strong>0 pts</strong></div>
              </div>
            </div>
          </aside>
        </div>
      </section>`;
  }

  function renderAnswerControl(question, answer) {
    if (question.type === "choice") {
      return `<div class="choice-list">${question.options.map((option, index) => `
        <label class="choice-option">
          <input type="radio" name="answer" value="${index}" ${String(answer.value) === String(index) ? "checked" : ""} />
          <span class="option-key">${String.fromCharCode(65 + index)}</span>
          <span>${renderText(option)}</span>
        </label>`).join("")}</div>`;
    }
    if (question.type === "boolean") {
      return `<div class="boolean-grid">
        <label class="choice-option"><input type="radio" name="answer" value="true" ${answer.value === true ? "checked" : ""} /><span class="option-key">O</span><span>${renderText(BOOL_LABELS.correct)}</span></label>
        <label class="choice-option"><input type="radio" name="answer" value="false" ${answer.value === false ? "checked" : ""} /><span class="option-key">X</span><span>${renderText(BOOL_LABELS.incorrect)}</span></label>
      </div>`;
    }
    if (question.type === "concept") {
      return `<textarea class="answer-input" id="text-answer" placeholder="${escapeHtml(plainText(question.placeholder || FALLBACK_TEXT.answerPlaceholder))}">${escapeHtml(answer.value || "")}</textarea>`;
    }
    return `<input class="answer-input" id="text-answer" placeholder="${escapeHtml(plainText(question.placeholder || FALLBACK_TEXT.answerPlaceholder))}" value="${escapeHtml(answer.value || "")}" />`;
  }

  function useHint() {
    const session = state.session;
    const question = currentQuestion();
    const answer = session.answers[session.index];
    if (session.hintsRemaining <= 0 || answer.hintsUsed >= question.hints.length) return;
    answer.hintsUsed += 1;
    session.hintsRemaining -= 1;
    renderQuiz();
  }

  function usePeek() {
    const session = state.session;
    const answer = session.answers[session.index];
    if (session.peeksRemaining <= 0 || answer.peeked) return;
    answer.peeked = true;
    session.peeksRemaining -= 1;
    renderQuiz();
  }

  function answerValue(question) {
    if (question.type === "choice") return question.options[question.answer];
    if (question.type === "boolean") return question.answer ? BOOL_LABELS.correct : BOOL_LABELS.incorrect;
    if (question.type === "fill") return {
      zh: question.answers.map((item) => textOf(item, "zh")).join("／"),
      en: question.answers.map((item) => textOf(item, "en")).join(" / ")
    };
    return question.modelAnswer;
  }

  function renderAnswerLabel(question) {
    return renderText(answerValue(question));
  }

  function renderUserAnswerLabel(question, value, correct) {
    let label = value;
    if (question.type === "choice") label = question.options[value] ?? FALLBACK_TEXT.noAnswer;
    if (question.type === "boolean") label = value === true ? BOOL_LABELS.correct : value === false ? BOOL_LABELS.incorrect : FALLBACK_TEXT.noAnswer;
    const content = question.type === "choice" || question.type === "boolean" ? renderText(label) : escapeHtml(String(label || plainText(FALLBACK_TEXT.noAnswer)));
    return `<p class="answer-value ${correct ? "correct" : "incorrect"}">${content}</p>`;
  }

  function getKeywordResults(question, value) {
    if (question.type !== "concept") return [];
    const input = normalizeText(value);
    return question.keywords.map((group) => {
      const terms = textCandidates(group);
      return {
        label: unique(terms).join(" / "),
        matched: terms.some((keyword) => input.includes(normalizeText(keyword)))
      };
    });
  }

  function renderReviewDetails(question, answer) {
    const keywords = getKeywordResults(question, answer.value);
    return `
      <div class="review-detail">
        <div class="answer-compare">
          <div class="answer-block">
            <span>${renderText({ zh: "你的答案", en: "Your answer" })}</span>
            ${renderUserAnswerLabel(question, answer.value, answer.correct)}
          </div>
          <div class="answer-block">
            <span>${renderText({ zh: "參考答案", en: "Reference answer" })}</span>
            <p class="answer-value reference">${renderAnswerLabel(question)}</p>
          </div>
        </div>
        ${keywords.length ? `
          <div class="keyword-review">
            <span class="keyword-title">${renderText({ zh: "關鍵字命中", en: "Keyword hits" })} ${keywords.filter((item) => item.matched).length} / ${keywords.length}</span>
            <div class="keyword-list">${keywords.map((item) => `<span class="keyword-chip ${item.matched ? "matched" : "missed"}">${item.matched ? "✓" : "×"} ${escapeHtml(item.label)}</span>`).join("")}</div>
          </div>` : ""}
        <p class="review-explanation"><strong>${renderText({ zh: "解析", en: "Explanation" })}</strong>${renderText(question.explanation)}</p>
      </div>`;
  }

  function collectAnswer(question) {
    if (question.type === "choice") {
      const selected = document.querySelector('input[name="answer"]:checked');
      return selected ? Number(selected.value) : null;
    }
    if (question.type === "boolean") {
      const selected = document.querySelector('input[name="answer"]:checked');
      return selected ? selected.value === "true" : null;
    }
    return document.querySelector("#text-answer")?.value.trim() || null;
  }

  function fillMatches(question, value) {
    const input = normalizeText(value);
    return question.answers.some((candidate) => {
      return textCandidates(candidate).some((accepted) => {
        const normalized = normalizeText(accepted);
        if (!normalized) return false;
        if (question.caseSensitive) return String(value).trim() === String(accepted).trim();
        return input === normalized || input.includes(normalized);
      });
    });
  }

  function grade(question, value, answerState) {
    let ratio = 0;
    if (question.type === "choice" || question.type === "boolean") {
      ratio = value === question.answer ? 1 : 0;
    } else if (question.type === "fill") {
      ratio = fillMatches(question, value) ? 1 : 0;
    } else if (question.type === "concept") {
      const input = normalizeText(value);
      const hits = question.keywords.filter((group) => textCandidates(group).some((keyword) => input.includes(normalizeText(keyword)))).length;
      ratio = hits / question.keywords.length;
    }
    const maxScore = answerState.peeked ? 0 : answerState.hintsUsed > 0 ? 8 : 10;
    return { score: Math.round(ratio * maxScore), correct: ratio >= 0.75, ratio };
  }

  function submitAnswer() {
    const session = state.session;
    const question = currentQuestion();
    const answerState = session.answers[session.index];
    const value = collectAnswer(question);
    if (value === null || value === "") {
      toast({ zh: "請先作答再送出。", en: "Answer before submitting." }, "error");
      return;
    }
    answerState.value = value;
    Object.assign(answerState, grade(question, value, answerState));

    if (session.index < session.questions.length - 1) {
      session.index += 1;
      renderQuiz();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      finishQuiz();
    }
  }

  function finishQuiz() {
    const session = state.session;
    session.elapsed = Math.floor((Date.now() - session.startedAt) / 1000);
    session.completed = true;
    stopTimer();
    const earned = session.answers.reduce((sum, item) => sum + item.score, 0);
    const max = session.questions.length * 10;
    const record = {
      id: `run-${Date.now()}`,
      nickname: session.nickname,
      score: earned,
      max,
      percentage: Math.round((earned / max) * 100),
      elapsed: session.elapsed,
      hintsUsed: session.hintLimit - session.hintsRemaining,
      peeksUsed: session.peekLimit - session.peeksRemaining,
      completedAt: new Date().toISOString(),
      questionCount: session.questions.length,
      difficulty: session.difficulty || "all"
    };
    const history = loadJson(STORAGE.history, []);
    history.unshift(record);
    localStorage.setItem(STORAGE.history, JSON.stringify(history.slice(0, 50)));
    session.record = record;
    state.view = "results";
    renderResults();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderResults() {
    const session = state.session;
    if (!session?.completed) return navigate("home");
    const record = session.record;
    const correctCount = session.answers.filter((item) => item.correct).length;
    const headline = record.percentage >= 85
      ? { zh: "根因判讀穩定", en: "Root-cause reading is solid" }
      : record.percentage >= 60
        ? { zh: "方向正確，還能補強", en: "Good direction, still improvable" }
        : { zh: "建議重跑一次呼叫鏈", en: "Run the call chain again" };
    app.innerHTML = `
      <section class="page">
        <p class="eyebrow">Challenge complete</p>
        <div class="panel results-hero">
          <div class="score-ring" style="--score:${record.percentage}">
            <div class="score-value"><strong>${record.percentage}</strong><span>${record.score} / ${record.max} PTS</span></div>
          </div>
          <div class="result-copy">
            <h1>${renderText(headline)}</h1>
            <p>${escapeHtml(record.nickname)}，${renderText({ zh: `本次完成 ${record.questionCount} 題，${correctCount} 題達到通過標準。概念題以關鍵概念覆蓋率計分。`, en: `you completed ${record.questionCount} questions. ${correctCount} met the passing threshold. Concept questions are scored by keyword coverage.` })}</p>
            <div class="result-meta">
              <span class="meta-pill">TIME ${formatTime(record.elapsed)}</span>
              <span class="meta-pill">LEVEL ${renderText(difficultyFilter(record.difficulty).label)}</span>
              <span class="meta-pill">HINT ${record.hintsUsed}</span>
              <span class="meta-pill">PEEK ${record.peeksUsed}</span>
              <span class="meta-pill">${formatDate(record.completedAt)}</span>
            </div>
            <div class="result-actions">
              <button class="primary-btn" data-action="retry">${renderText({ zh: "再練一次", en: "Practice again" })}</button>
              <button class="secondary-btn" data-action="history">${renderText({ zh: "查看紀錄", en: "View records" })}</button>
            </div>
          </div>
        </div>

        <div class="section-heading" style="margin-top:38px">
          <div><h1>${renderText({ zh: "作答回顧", en: "Answer review" })}</h1><p>${renderText({ zh: "會顯示你填了什麼、錯在哪裡，以及概念題命中或缺漏的關鍵字。", en: "Shows what you answered, what went wrong, and matched or missed keywords for concept questions." })}</p></div>
        </div>
        <div class="review-list">
          ${session.questions.map((question, index) => {
            const answer = session.answers[index];
            const assist = answer.peeked
              ? plainText({ zh: "已偷看", en: "Peeked" })
              : answer.hintsUsed
                ? plainText({ zh: `使用 ${answer.hintsUsed} 次提示`, en: `${answer.hintsUsed} hint(s)` })
                : "";
            return `<div class="review-item">
              <div class="review-summary">
                <span class="review-status ${answer.correct ? "pass" : ""}">${answer.correct ? "✓" : "×"}</span>
                <div><strong>${escapeHtml(question.variantId || question.id)} · ${renderText(question.title)}</strong><small>${renderText(TYPE_LABELS[question.type])}${assist ? ` · ${escapeHtml(assist)}` : ""}</small></div>
                <span class="review-points">${answer.score} / 10</span>
              </div>
              ${renderReviewDetails(question, answer)}
            </div>`;
          }).join("")}
        </div>
      </section>`;
  }

  function renderHistory() {
    const history = loadJson(STORAGE.history, []);
    app.innerHTML = `
      <section class="page">
        <div class="section-heading">
          <div><p class="eyebrow">Local records</p><h1>${renderText({ zh: "練習紀錄", en: "Practice records" })}</h1><p>${renderText({ zh: "最多保留最近 50 筆，資料只存在這台瀏覽器。", en: "Keeps the latest 50 records in this browser only." })}</p></div>
          ${history.length ? `<button class="danger-btn" data-action="clear-history">${renderText({ zh: "清除紀錄", en: "Clear records" })}</button>` : ""}
        </div>
        ${history.length ? `
          <div class="table-wrap"><table class="data-table">
            <thead><tr><th>${renderText({ zh: "暱稱", en: "Nickname" })}</th><th>${renderText({ zh: "分數", en: "Score" })}</th><th>${renderText({ zh: "難度", en: "Level" })}</th><th>${renderText({ zh: "題數", en: "Questions" })}</th><th>${renderText({ zh: "時間", en: "Time" })}</th><th>${renderText({ zh: "提示 / 偷看", en: "Hint / Peek" })}</th><th>${renderText({ zh: "完成時間", en: "Completed" })}</th></tr></thead>
            <tbody>${history.map((record) => `<tr><td><strong>${escapeHtml(record.nickname)}</strong></td><td>${record.percentage}%</td><td>${renderText(difficultyFilter(record.difficulty || "all").label)}</td><td>${record.questionCount}</td><td>${formatTime(record.elapsed)}</td><td>${record.hintsUsed} / ${record.peeksUsed}</td><td>${formatDate(record.completedAt)}</td></tr>`).join("")}</tbody>
          </table></div>` : `
          <div class="empty-state"><strong>${renderText({ zh: "還沒有紀錄", en: "No records yet" })}</strong><p>${renderText({ zh: "完成一次練習後，分數、時間與暱稱會顯示在這裡。", en: "After a run, score, time, and nickname will appear here." })}</p><button class="primary-btn" data-action="home">${renderText({ zh: "回首頁練習", en: "Back to practice" })}</button></div>`}
      </section>`;
  }

  function renderLibrary() {
    const questions = allQuestions();
    const groups = groupedQuestions(questions);
    const counts = Object.keys(TYPE_LABELS).reduce((result, type) => {
      result[type] = questions.filter((question) => question.type === type).length;
      return result;
    }, {});
    const difficultyCounts = DIFFICULTY_LEVELS.filter((level) => level.id !== "all").map((level) => ({
      ...level,
      count: questions.filter((question) => normalizeDifficulty(question.difficulty) === level.id).length
    }));
    app.innerHTML = `
      <section class="page">
        <div class="section-heading">
          <div><p class="eyebrow">Question library</p><h1>${renderText({ zh: "題庫管理", en: "Question library" })}</h1><p>${renderText({ zh: "內建題庫與匯入題庫會同時顯示；匯入資料保存在本機瀏覽器。", en: "Built-in and imported questions are shown together; imports are stored in this browser." })}</p></div>
          ${state.customQuestions.length ? `<button class="danger-btn" data-action="clear-custom">${renderText({ zh: "清除匯入題庫", en: "Clear imports" })}</button>` : ""}
        </div>
        <div class="library-grid">
          <section class="panel library-panel">
            <div class="panel-header"><div><h2>${renderText({ zh: "題型變體", en: "Question variants" })}</h2><p>${renderText({ zh: `${questions.length} 個題型變體，分屬 ${groups.length} 個知識點；每次每組只抽一題。`, en: `${questions.length} variants across ${groups.length} topics; each run samples one variant per topic.` })}</p></div><span class="count-badge">${groups.length} TOPICS</span></div>
            <div class="type-stats">
              ${Object.entries(TYPE_LABELS).map(([type, label]) => `<div class="stat-card"><strong>${counts[type]}</strong><span>${renderText(label)}</span></div>`).join("")}
            </div>
            <div class="type-stats difficulty-stats">
              ${difficultyCounts.map((level) => `<div class="stat-card"><strong>${escapeHtml(level.stars)}</strong><span>${renderText(level.label)} · ${level.count}</span></div>`).join("")}
            </div>
            <div class="library-split">
              ${renderQuestionInventory({ zh: "內建基本題庫", en: "Built-in base library" }, window.DEFAULT_QUESTIONS, { zh: "系統預設題目", en: "Default questions" })}
              ${renderQuestionInventory({ zh: "匯入題庫（新）", en: "Imported library (new)" }, state.customQuestions, { zh: "尚未匯入新題目", en: "No imported questions yet" })}
            </div>
            <details class="format-guide">
              <summary>${renderText({ zh: "查看 Markdown 題庫格式", en: "View Markdown question format" })}</summary>
              <pre>## Q: SP 修正策略
titleEn: Stored Procedure fix strategy
groupId: E
variantId: E-5
type: choice
category: SQL
categoryEn: SQL
difficulty: advanced
prompt: 哪一種改法最小、最容易驗證？
promptEn: Which change is smallest and easiest to verify?
options: DROP 重建 | 用 UNION 補 item=0 | 改全部查詢 | 只改畫面
optionsEn: Drop and recreate | Add item=0 with UNION | Change every query | UI only
answer: 1
hint: 不要擴大資料語意。
hintEn: Do not expand the data semantics.
explanation: 只補漏掉的來源，風險最小。
explanationEn: Add only the missing source to keep risk low.</pre>
            </details>
          </section>
          <section class="panel library-panel">
            <div class="import-zone">
              <div>
                <span class="import-icon">＋</span>
                <strong>${renderText({ zh: "匯入新題庫", en: "Import questions" })}</strong>
                <p>${renderText({ zh: "支援 Markdown 或 JSON。相同 groupId 代表同一知識點，每次練習只會隨機抽其中一種題型。舊格式純中文題庫也能匯入。", en: "Markdown and JSON are supported. The same groupId means one topic; each run samples one variant. Existing Chinese-only files still work." })}</p>
                <button class="primary-btn" data-action="import">${renderText({ zh: "選擇 .md / .json", en: "Choose .md / .json" })}</button>
              </div>
            </div>
          </section>
        </div>
      </section>`;
  }

  function renderQuestionInventory(title, questions, emptyText) {
    const groups = groupedQuestions(questions);
    return `
      <div class="source-box">
        <div class="source-head">
          <strong>${renderText(title)}</strong>
          <span>${questions.length} ${plainText({ zh: "題", en: "items" })}</span>
        </div>
        ${questions.length ? `<div class="source-list">${groups.map((group) => {
          const first = group.variants[0];
          return `<div class="source-item">
            <div><strong>${escapeHtml(group.id)} · ${renderText(first.groupTitle || first.title)}</strong><small>${group.variants.length} variants</small></div>
            <div class="variant-list">${group.variants.map((question) => {
              const level = difficultyLevel(question.difficulty);
              return `<span>${escapeHtml(question.variantId || question.id)} · ${escapeHtml(level.stars)} · ${renderText(TYPE_LABELS[question.type])}</span>`;
            }).join("")}</div>
          </div>`;
        }).join("")}</div>` : `<p class="source-empty">${renderText(emptyText)}</p>`}
      </div>`;
  }

  function bilingual(zh, en) {
    const zhValue = String(zh || "").trim();
    const enValue = String(en || "").trim();
    if (enValue) return { zh: zhValue || enValue, en: enValue };
    return zhValue;
  }

  function splitPipe(value) {
    return String(value || "").split("|").map((item) => item.trim()).filter(Boolean);
  }

  function buildBilingualList(zhValue, enValue) {
    const zhList = splitPipe(zhValue);
    const enList = splitPipe(enValue);
    const length = Math.max(zhList.length, enList.length);
    if (!length) return [FALLBACK_TEXT.importedHint];
    return Array.from({ length }, (_, index) => bilingual(zhList[index] || "", enList[index] || ""));
  }

  function mergeKeywordFields(zhValue, enValue) {
    const zhGroups = splitPipe(zhValue).map((group) => group.split(",").map((item) => item.trim()).filter(Boolean));
    const enGroups = splitPipe(enValue).map((group) => group.split(",").map((item) => item.trim()).filter(Boolean));
    const length = Math.max(zhGroups.length, enGroups.length);
    return Array.from({ length }, (_, index) => unique([...(zhGroups[index] || []), ...(enGroups[index] || [])])).filter((group) => group.length);
  }

  function parseBoolean(value) {
    return ["true", "1", "yes", "y", "是", "正確", "true / correct"].includes(normalizeText(value));
  }

  function parseMarkdown(text) {
    const blocks = text.split(/^##\s+Q:\s*/gmi).slice(1);
    return blocks.map((block, index) => {
      const lines = block.trim().split(/\r?\n/);
      const title = lines.shift().trim();
      const fields = {};
      lines.forEach((line) => {
        const match = line.match(/^([a-zA-Z]+):\s*(.*)$/);
        if (match) fields[match[1].toLowerCase()] = match[2].trim();
      });
      const type = fields.type || "choice";
      const question = {
        id: `import-md-${Date.now()}-${index}`,
        groupId: fields.groupid || "",
        variantId: fields.variantid || "",
        type,
        title: bilingual(title, fields.titleen),
        prompt: bilingual(fields.prompt || title, fields.prompten || fields.titleen),
        category: bilingual(fields.category || textOf(FALLBACK_TEXT.importedCategory, "zh"), fields.categoryen),
        difficulty: normalizeDifficulty(fields.difficulty || "advanced"),
        hints: buildBilingualList(fields.hint, fields.hinten),
        explanation: bilingual(fields.explanation || textOf(FALLBACK_TEXT.importedExplanation, "zh"), fields.explanationen)
      };
      if (type === "choice") {
        const options = splitPipe(fields.options);
        const optionsEn = splitPipe(fields.optionsen);
        question.options = options.map((option, optionIndex) => bilingual(option, optionsEn[optionIndex]));
        question.answer = Number(fields.answer);
      } else if (type === "boolean") {
        question.answer = parseBoolean(fields.answer);
      } else if (type === "fill") {
        question.answers = unique([...splitPipe(fields.answer), ...splitPipe(fields.answeren)]);
        question.caseSensitive = fields.casesensitive === "true";
      } else if (type === "concept") {
        question.keywords = mergeKeywordFields(fields.keywords, fields.keywordsen);
        question.modelAnswer = bilingual(fields.modelanswer || fields.answer || textOf(FALLBACK_TEXT.modelAnswer, "zh"), fields.modelansweren || fields.answeren);
      }
      return question;
    });
  }

  function validateQuestion(question, index) {
    const prefix = plainText({ zh: `第 ${index + 1} 題`, en: `Question ${index + 1}` });
    if (!question || typeof question !== "object") throw new Error(`${prefix}: invalid format`);
    if (!TYPE_LABELS[question.type]) throw new Error(`${prefix}: unsupported type`);
    if (!textOf(question.title) || !textOf(question.prompt)) throw new Error(`${prefix}: missing title or prompt`);
    if (question.type === "choice" && (!Array.isArray(question.options) || question.options.length < 2 || !Number.isInteger(Number(question.answer)) || Number(question.answer) < 0 || Number(question.answer) >= question.options.length)) throw new Error(`${prefix}: invalid options or answer index`);
    if (question.type === "fill" && (!Array.isArray(question.answers) || !question.answers.length)) throw new Error(`${prefix}: missing accepted answers`);
    if (question.type === "boolean" && typeof question.answer !== "boolean") question.answer = parseBoolean(question.answer);
    if (question.type === "concept" && (!Array.isArray(question.keywords) || !question.keywords.length || !question.modelAnswer)) throw new Error(`${prefix}: missing keywords or modelAnswer`);
    question.id ||= `import-${Date.now()}-${index}`;
    question.variantId ||= question.id;
    if (question.type === "choice") question.answer = Number(question.answer);
    if (question.type === "concept") question.keywords = question.keywords.map((group) => Array.isArray(group) ? group : [group]);
    question.category ||= FALLBACK_TEXT.importedCategory;
    question.difficulty = normalizeDifficulty(question.difficulty || "advanced");
    question.hints = Array.isArray(question.hints) && question.hints.length ? question.hints : [FALLBACK_TEXT.importedHint];
    question.explanation ||= FALLBACK_TEXT.importedExplanation;
    return question;
  }

  async function importQuestions(file) {
    try {
      const text = await file.text();
      const raw = file.name.toLowerCase().endsWith(".json") ? JSON.parse(text) : parseMarkdown(text);
      const list = (Array.isArray(raw) ? raw : [raw]).map(validateQuestion);
      if (!list.length) throw new Error(plainText({ zh: "沒有可匯入的題目；Markdown 題目請以 ## Q: 開頭。", en: "No importable questions. Markdown questions must start with ## Q:." }));
      const existingIds = new Set(allQuestions().map((question) => question.id));
      const uniqueQuestions = list.filter((question) => !existingIds.has(question.id));
      if (!uniqueQuestions.length) throw new Error(plainText({ zh: "題目 ID 已存在，沒有新增題目。", en: "Question IDs already exist; nothing was added." }));
      state.customQuestions.push(...uniqueQuestions);
      localStorage.setItem(STORAGE.questions, JSON.stringify(state.customQuestions));
      renderLibrary();
      toast({ zh: `已匯入 ${uniqueQuestions.length} 題。`, en: `Imported ${uniqueQuestions.length} question(s).` });
    } catch (error) {
      toast({ zh: `匯入失敗：${error.message}`, en: `Import failed: ${error.message}` }, "error");
    } finally {
      fileInput.value = "";
    }
  }

  function unique(items) {
    return [...new Set(items.filter((item) => item !== null && item !== undefined && String(item).trim() !== "").map((item) => String(item).trim()))];
  }

  document.addEventListener("click", (event) => {
    const languageButton = event.target.closest("[data-language]");
    if (languageButton) {
      const nickname = document.querySelector("#nickname")?.value || "";
      state.language = normalizeLanguage(languageButton.dataset.language);
      localStorage.setItem(STORAGE.language, state.language);
      render();
      if (state.view === "home" && document.querySelector("#nickname")) document.querySelector("#nickname").value = nickname;
      return;
    }

    const difficultyButton = event.target.closest("[data-difficulty]");
    if (difficultyButton) {
      const nickname = document.querySelector("#nickname")?.value || "";
      state.difficulty = normalizeDifficulty(difficultyButton.dataset.difficulty);
      localStorage.setItem(STORAGE.difficulty, state.difficulty);
      render();
      if (state.view === "home" && document.querySelector("#nickname")) document.querySelector("#nickname").value = nickname;
      return;
    }

    const nav = event.target.closest("[data-view]");
    if (nav) return navigate(nav.dataset.view);

    const step = event.target.closest("[data-step]");
    if (step) {
      const key = step.parentElement.dataset.key;
      const delta = Number(step.dataset.step);
      const property = key === "hint" ? "hintLimit" : "peekLimit";
      const max = key === "hint" ? 9 : 5;
      state[property] = Math.max(0, Math.min(max, state[property] + delta));
      const nickname = document.querySelector("#nickname")?.value || "";
      renderHome();
      document.querySelector("#nickname").value = nickname;
      return;
    }

    const action = event.target.closest("[data-action]")?.dataset.action;
    if (!action) return;
    if (action === "home") navigate("home");
    if (action === "start") startQuiz();
    if (action === "hint") useHint();
    if (action === "peek") usePeek();
    if (action === "submit-answer") submitAnswer();
    if (action === "retry") navigate("home");
    if (action === "history") navigate("history");
    if (action === "import") fileInput.click();
    if (action === "clear-history" && window.confirm(plainText({ zh: "確定要清除全部練習紀錄嗎？", en: "Clear all practice records?" }))) {
      localStorage.removeItem(STORAGE.history);
      renderHistory();
    }
    if (action === "clear-custom" && window.confirm(plainText({ zh: "確定要清除全部匯入題目嗎？", en: "Clear all imported questions?" }))) {
      state.customQuestions = [];
      localStorage.removeItem(STORAGE.questions);
      renderLibrary();
    }
  });

  fileInput.addEventListener("change", () => {
    const [file] = fileInput.files;
    if (file) importQuestions(file);
  });

  window.addEventListener("keydown", (event) => {
    if (state.view === "quiz" && event.key === "Enter" && !event.shiftKey && document.activeElement?.tagName !== "TEXTAREA") {
      event.preventDefault();
      submitAnswer();
    }
  });

  render();
})();
