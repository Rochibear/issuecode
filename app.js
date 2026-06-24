(function () {
  "use strict";

  const STORAGE = {
    questions: "issuecode.customQuestions.v1",
    history: "issuecode.history.v1",
    nickname: "issuecode.nickname.v1"
  };

  const TYPE_LABELS = {
    choice: "選擇題",
    fill: "填空題",
    boolean: "是非題",
    concept: "概念題"
  };

  const app = document.querySelector("#app");
  const fileInput = document.querySelector("#question-import");
  const state = {
    view: "home",
    hintLimit: 3,
    peekLimit: 1,
    customQuestions: loadJson(STORAGE.questions, []),
    session: null,
    timerId: null
  };

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

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalizeText(value) {
    return String(value ?? "").trim().toLocaleLowerCase("zh-Hant").replace(/\s+/g, " ");
  }

  function formatTime(seconds) {
    const safe = Math.max(0, Number(seconds) || 0);
    const minutes = Math.floor(safe / 60);
    return `${String(minutes).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
  }

  function formatDate(iso) {
    return new Intl.DateTimeFormat("zh-TW", {
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
    node.textContent = message;
    region.append(node);
    setTimeout(() => node.remove(), 3200);
  }

  function setActiveNav(view) {
    document.querySelectorAll(".nav-item").forEach((button) => {
      button.classList.toggle("active", button.dataset.view === view);
    });
  }

  function navigate(view) {
    if (state.session && !state.session.completed && view !== "quiz") {
      if (!window.confirm("目前測驗尚未完成，離開後本次進度不會保留。確定離開？")) return;
      stopTimer();
      state.session = null;
    }
    state.view = view;
    setActiveNav(view);
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function render() {
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
          <span class="allowance-title">${label}</span>
          <div class="stepper" data-key="${key}">
            <button type="button" data-step="-1" aria-label="減少${label}">−</button>
            <output>${value}</output>
            <button type="button" data-step="1" aria-label="增加${label}">＋</button>
          </div>
        </div>
        <p>${description} 可設定 ${min}–${max} 次。</p>
      </div>
    `;
  }

  function renderHome() {
    const questions = allQuestions();
    const history = loadJson(STORAGE.history, []);
    const savedName = localStorage.getItem(STORAGE.nickname) || "";
    app.innerHTML = `
      <section class="page">
        <p class="eyebrow">Issue-driven learning / 01</p>
        <h1 class="hero-title">不是背答案，<br><span>是練出追問題的路徑。</span></h1>
        <p class="hero-copy">以「漏刷卡事後期限」Issue 為題材，從畫面一路追到 Stored Procedure。每次練習會打亂題目，留下分數、時間與暱稱。</p>

        <div class="home-grid">
          <section class="panel setup-panel">
            <div class="panel-header">
              <div>
                <h2>開始本次挑戰</h2>
                <p>先設定求助額度。使用提示會折分，偷看答案則該題不計分。</p>
              </div>
              <span class="count-badge">${questions.length} QUESTIONS</span>
            </div>

            <div class="form-group">
              <label class="form-label" for="nickname">挑戰者暱稱</label>
              <input id="nickname" class="text-input" maxlength="20" autocomplete="nickname" placeholder="例如：Dana" value="${escapeHtml(savedName)}" />
            </div>

            <div class="allowance-grid">
              ${renderAllowance("hint", "提示次數", "每使用一次，該題最高 8 分。", state.hintLimit, 0, 9)}
              ${renderAllowance("peek", "偷看答案", "偷看後該題最高分為 0。", state.peekLimit, 0, 5)}
            </div>

            <div class="start-row">
              <div class="score-note"><strong>計分規則</strong><br>每題 10 分 · 概念題按關鍵概念覆蓋率計分</div>
              <button class="primary-btn" data-action="start">開始挑戰 →</button>
            </div>
          </section>

          <aside class="panel brief-panel">
            <div class="brief-head">
              <span>CASE BRIEF / #2026-06</span>
              <h3>漏刷卡事後申請期限<br>未扣除例假日</h3>
            </div>
            <ol class="brief-list">
              <li><span class="brief-number">01</span><div><strong>定位入口</strong><small>Network 找 RagneChange 與 CheckInfo</small></div></li>
              <li><span class="brief-number">02</span><div><strong>沿呼叫鏈下鑽</strong><small>Web → API → Service → VB → SP</small></div></li>
              <li><span class="brief-number">03</span><div><strong>驗證根因</strong><small>HumanlyUtility_5 漏讀 item=0</small></div></li>
              <li><span class="brief-number">04</span><div><strong>控制修正風險</strong><small>最小 UNION、UAT、回歸與回滾</small></div></li>
            </ol>
            <div class="tag-row"><span class="tag">C#</span><span class="tag">VB.NET</span><span class="tag">SQL</span><span class="tag">ROOT CAUSE</span></div>
          </aside>
        </div>
        ${history.length ? `<p class="score-note" style="margin-top:18px">本機已有 ${history.length} 筆挑戰紀錄。資料不會上傳。</p>` : ""}
      </section>
    `;
  }

  function startQuiz() {
    const nickname = document.querySelector("#nickname")?.value.trim();
    if (!nickname) {
      toast("請先輸入挑戰者暱稱。", "error");
      document.querySelector("#nickname")?.focus();
      return;
    }
    localStorage.setItem(STORAGE.nickname, nickname);
    const questions = shuffle(allQuestions());
    state.session = {
      nickname,
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
    const hintText = answer.hintsUsed ? question.hints.slice(0, answer.hintsUsed).join("\n") : "";
    const peekText = answer.peeked ? getAnswerLabel(question) : "";

    app.innerHTML = `
      <section class="quiz-page">
        <div class="quiz-status">
          <div id="timer" class="timer">${formatTime(session.elapsed)}</div>
          <div class="progress-track" aria-label="測驗進度"><div class="progress-fill" style="width:${progress}%"></div></div>
          <div class="question-count">${session.index + 1} / ${session.questions.length}</div>
        </div>
        <div class="quiz-layout">
          <aside class="quiz-sidebar">
            <div class="sidebar-head">Question map</div>
            <div class="question-map">${session.questions.map((_, index) => `<button class="question-dot ${index === session.index ? "current" : ""} ${session.answers[index].score !== null ? "done" : ""}" aria-label="第 ${index + 1} 題">${String(index + 1).padStart(2, "0")}</button>`).join("")}</div>
            <div class="sidebar-summary">完成目前題目後才會前進。<br>答案送出後無法返回修改。</div>
          </aside>

          <article class="question-card">
            <div class="question-meta">
              <span class="difficulty ${question.difficulty.toLowerCase()}">${escapeHtml(question.difficulty)}</span>
              <span class="question-type">${TYPE_LABELS[question.type]}</span>
              <span class="question-type">${escapeHtml(question.category || "一般")}</span>
              <span class="question-number">ISSUE-${String(session.index + 1).padStart(3, "0")}</span>
            </div>
            <h1>${escapeHtml(question.title)}</h1>
            <p class="question-prompt">${escapeHtml(question.prompt)}</p>
            <div class="answer-zone">${renderAnswerControl(question, answer)}</div>
            ${hintText ? `<div class="hint-box"><strong>提示</strong><br>${escapeHtml(hintText).replaceAll("\n", "<br>")}</div>` : ""}
            ${peekText ? `<div class="peek-box"><strong>參考答案</strong><br>${escapeHtml(peekText)}</div>` : ""}
            <div class="question-footer">
              <span class="keyboard-note">SELECT / TYPE YOUR ANSWER</span>
              <button class="primary-btn" data-action="submit-answer">送出答案 →</button>
            </div>
          </article>

          <aside class="quiz-tools">
            <div class="tools-head">Assistance</div>
            <div class="tool-card">
              <div class="tool-top"><strong>提示</strong><span class="tool-count">${session.hintsRemaining} LEFT</span></div>
              <p>逐步揭露線索。該題使用後最高 8 分。</p>
              <button class="secondary-btn" data-action="hint" ${session.hintsRemaining <= 0 || answer.hintsUsed >= question.hints.length ? "disabled" : ""}>取得提示</button>
            </div>
            <div class="tool-card">
              <div class="tool-top"><strong>偷看答案</strong><span class="tool-count">${session.peeksRemaining} LEFT</span></div>
              <p>直接顯示參考答案，該題不再計分。</p>
              <button class="ghost-btn" data-action="peek" ${session.peeksRemaining <= 0 || answer.peeked ? "disabled" : ""}>顯示答案</button>
            </div>
            <div class="tool-card">
              <div class="tool-top"><strong>本次規則</strong></div>
              <div class="score-rule">
                <div class="rule-row"><span>完整答對</span><strong>10 pts</strong></div>
                <div class="rule-row"><span>使用提示</span><strong>max 8</strong></div>
                <div class="rule-row"><span>偷看答案</span><strong>0 pts</strong></div>
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
          <span>${escapeHtml(option)}</span>
        </label>`).join("")}</div>`;
    }
    if (question.type === "boolean") {
      return `<div class="boolean-grid">
        <label class="choice-option"><input type="radio" name="answer" value="true" ${answer.value === true ? "checked" : ""} /><span class="option-key">O</span><span>正確</span></label>
        <label class="choice-option"><input type="radio" name="answer" value="false" ${answer.value === false ? "checked" : ""} /><span class="option-key">X</span><span>錯誤</span></label>
      </div>`;
    }
    if (question.type === "concept") {
      return `<textarea class="answer-input" id="text-answer" placeholder="${escapeHtml(question.placeholder || "輸入答案")}">${escapeHtml(answer.value || "")}</textarea>`;
    }
    return `<input class="answer-input" id="text-answer" placeholder="${escapeHtml(question.placeholder || "輸入答案")}" value="${escapeHtml(answer.value || "")}" />`;
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

  function getAnswerLabel(question) {
    if (question.type === "choice") return question.options[question.answer];
    if (question.type === "boolean") return question.answer ? "正確" : "錯誤";
    if (question.type === "fill") return question.answers[0];
    return question.modelAnswer;
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

  function grade(question, value, answerState) {
    let ratio = 0;
    if (question.type === "choice" || question.type === "boolean") {
      ratio = value === question.answer ? 1 : 0;
    } else if (question.type === "fill") {
      const input = question.caseSensitive ? String(value).trim() : normalizeText(value);
      ratio = question.answers.some((candidate) => (question.caseSensitive ? String(candidate).trim() : normalizeText(candidate)) === input) ? 1 : 0;
    } else if (question.type === "concept") {
      const input = normalizeText(value);
      const hits = question.keywords.filter((group) => group.some((keyword) => input.includes(normalizeText(keyword)))).length;
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
      toast("請先作答再送出。", "error");
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
      questionCount: session.questions.length
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
    const headline = record.percentage >= 85 ? "根因已鎖定。" : record.percentage >= 60 ? "呼叫鏈已接上。" : "還有幾個斷點待補。";
    app.innerHTML = `
      <section class="page">
        <p class="eyebrow">Challenge complete</p>
        <div class="panel results-hero">
          <div class="score-ring" style="--score:${record.percentage}">
            <div class="score-value"><strong>${record.percentage}</strong><span>${record.score} / ${record.max} PTS</span></div>
          </div>
          <div class="result-copy">
            <h1>${headline}</h1>
            <p>${escapeHtml(record.nickname)}，本次完成 ${record.questionCount} 題，${correctCount} 題達到通過標準。概念題以關鍵概念覆蓋率計分。</p>
            <div class="result-meta">
              <span class="meta-pill">TIME ${formatTime(record.elapsed)}</span>
              <span class="meta-pill">HINT ${record.hintsUsed}</span>
              <span class="meta-pill">PEEK ${record.peeksUsed}</span>
              <span class="meta-pill">${formatDate(record.completedAt)}</span>
            </div>
            <div class="result-actions">
              <button class="primary-btn" data-action="retry">再挑戰一次</button>
              <button class="secondary-btn" data-action="history">查看紀錄</button>
            </div>
          </div>
        </div>

        <div class="section-heading" style="margin-top:38px">
          <div><h1>逐題結果</h1><p>偷看答案的題目固定為 0 分；提示題最高 8 分。</p></div>
        </div>
        <div class="review-list">
          ${session.questions.map((question, index) => {
            const answer = session.answers[index];
            return `<div class="review-item">
              <span class="review-status ${answer.correct ? "pass" : ""}">${answer.correct ? "✓" : "×"}</span>
              <div><strong>${escapeHtml(question.title)}</strong><small>參考：${escapeHtml(getAnswerLabel(question))}${answer.peeked ? " · 已偷看" : answer.hintsUsed ? ` · 使用 ${answer.hintsUsed} 次提示` : ""}</small></div>
              <span class="review-points">${answer.score} / 10</span>
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
          <div><p class="eyebrow">Local records</p><h1>挑戰紀錄</h1><p>最多保留 50 筆，只存在這個瀏覽器。</p></div>
          ${history.length ? '<button class="danger-btn" data-action="clear-history">清除紀錄</button>' : ""}
        </div>
        ${history.length ? `
          <div class="table-wrap"><table class="data-table">
            <thead><tr><th>暱稱</th><th>分數</th><th>答題數</th><th>時間</th><th>提示 / 偷看</th><th>完成時間</th></tr></thead>
            <tbody>${history.map((record) => `<tr><td><strong>${escapeHtml(record.nickname)}</strong></td><td>${record.percentage}%</td><td>${record.questionCount}</td><td>${formatTime(record.elapsed)}</td><td>${record.hintsUsed} / ${record.peeksUsed}</td><td>${formatDate(record.completedAt)}</td></tr>`).join("")}</tbody>
          </table></div>` : `
          <div class="empty-state"><strong>還沒有挑戰紀錄</strong><p>完成第一次 Issue 測驗後，結果會出現在這裡。</p><button class="primary-btn" data-action="home">開始練習</button></div>`}
      </section>`;
  }

  function renderLibrary() {
    const questions = allQuestions();
    const counts = Object.keys(TYPE_LABELS).reduce((result, type) => {
      result[type] = questions.filter((question) => question.type === type).length;
      return result;
    }, {});
    app.innerHTML = `
      <section class="page">
        <div class="section-heading">
          <div><p class="eyebrow">Question library</p><h1>題庫管理</h1><p>內建題庫不會被覆蓋；匯入的題目會追加並儲存在本機。</p></div>
          ${state.customQuestions.length ? '<button class="danger-btn" data-action="clear-custom">移除匯入題目</button>' : ""}
        </div>
        <div class="library-grid">
          <section class="panel library-panel">
            <div class="panel-header"><div><h2>題型分布</h2><p>目前共 ${questions.length} 題，其中 ${state.customQuestions.length} 題為自行匯入。</p></div><span class="count-badge">${questions.length} TOTAL</span></div>
            <div class="type-stats">
              ${Object.entries(TYPE_LABELS).map(([type, label]) => `<div class="stat-card"><strong>${counts[type]}</strong><span>${label}</span></div>`).join("")}
            </div>
            <details class="format-guide">
              <summary>查看 Markdown 題庫格式</summary>
              <pre>## Q: SP 修正方式
type: choice
category: SQL
difficulty: Medium
options: DROP 重建 | UNION 補 item=0 | 改資料 | 忽略
answer: 1
hint: 選擇最小變更
explanation: 只補漏讀的合法類別。

## Q: 期限錯誤 Flag
type: fill
answer: 10 | Flag 10</pre>
            </details>
          </section>
          <section class="panel library-panel">
            <div class="import-zone">
              <div>
                <span class="import-icon">＋Q</span>
                <strong>匯入新的題目</strong>
                <p>支援結構化 Markdown 與 JSON。JSON 可使用單一題目或題目陣列。</p>
                <button class="primary-btn" data-action="import">選擇 .md / .json</button>
              </div>
            </div>
          </section>
        </div>
      </section>`;
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
        type,
        title,
        prompt: fields.prompt || title,
        category: fields.category || "匯入題庫",
        difficulty: fields.difficulty || "Medium",
        hints: fields.hint ? fields.hint.split("|").map((item) => item.trim()) : ["回到題目中的關鍵名詞思考。"],
        explanation: fields.explanation || "此題由 Markdown 匯入。"
      };
      if (type === "choice") {
        question.options = (fields.options || "").split("|").map((item) => item.trim()).filter(Boolean);
        question.answer = Number(fields.answer);
      } else if (type === "boolean") {
        question.answer = ["true", "1", "yes", "是", "正確"].includes(normalizeText(fields.answer));
      } else if (type === "fill") {
        question.answers = (fields.answer || "").split("|").map((item) => item.trim()).filter(Boolean);
        question.caseSensitive = fields.casesensitive === "true";
      } else if (type === "concept") {
        question.keywords = (fields.keywords || "").split("|").map((group) => group.split(",").map((item) => item.trim()).filter(Boolean)).filter((group) => group.length);
        question.modelAnswer = fields.answer || fields.modelanswer || "請依課程內容回答。";
      }
      return question;
    });
  }

  function validateQuestion(question, index) {
    const prefix = `第 ${index + 1} 題`;
    if (!question || typeof question !== "object") throw new Error(`${prefix}格式不正確`);
    if (!TYPE_LABELS[question.type]) throw new Error(`${prefix}的 type 不支援`);
    if (!question.title || !question.prompt) throw new Error(`${prefix}缺少 title 或 prompt`);
    if (question.type === "choice" && (!Array.isArray(question.options) || question.options.length < 2 || !Number.isInteger(Number(question.answer)) || Number(question.answer) < 0 || Number(question.answer) >= question.options.length)) throw new Error(`${prefix}選項或答案索引不正確`);
    if (question.type === "fill" && (!Array.isArray(question.answers) || !question.answers.length)) throw new Error(`${prefix}缺少可接受答案`);
    if (question.type === "boolean" && typeof question.answer !== "boolean") throw new Error(`${prefix}答案必須是 true/false`);
    if (question.type === "concept" && (!Array.isArray(question.keywords) || !question.keywords.length || !question.modelAnswer)) throw new Error(`${prefix}缺少 keywords 或 modelAnswer`);
    question.id ||= `import-${Date.now()}-${index}`;
    if (question.type === "choice") question.answer = Number(question.answer);
    if (question.type === "concept") question.keywords = question.keywords.map((group) => Array.isArray(group) ? group : [group]);
    question.category ||= "匯入題庫";
    question.difficulty = ["Easy", "Medium", "Hard"].includes(question.difficulty) ? question.difficulty : "Medium";
    question.hints = Array.isArray(question.hints) && question.hints.length ? question.hints : ["回到題目中的關鍵名詞思考。"];
    question.explanation ||= "此題由外部題庫匯入。";
    return question;
  }

  async function importQuestions(file) {
    try {
      const text = await file.text();
      const raw = file.name.toLowerCase().endsWith(".json") ? JSON.parse(text) : parseMarkdown(text);
      const list = (Array.isArray(raw) ? raw : [raw]).map(validateQuestion);
      if (!list.length) throw new Error("找不到題目。Markdown 題目需以 ## Q: 開頭");
      const existingIds = new Set(allQuestions().map((question) => question.id));
      const unique = list.filter((question) => !existingIds.has(question.id));
      if (!unique.length) throw new Error("題目 ID 已存在，沒有可新增的題目");
      state.customQuestions.push(...unique);
      localStorage.setItem(STORAGE.questions, JSON.stringify(state.customQuestions));
      renderLibrary();
      toast(`已匯入 ${unique.length} 題。`);
    } catch (error) {
      toast(`匯入失敗：${error.message}`, "error");
    } finally {
      fileInput.value = "";
    }
  }

  document.addEventListener("click", (event) => {
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
    if (action === "clear-history" && window.confirm("確定清除所有本機挑戰紀錄？")) {
      localStorage.removeItem(STORAGE.history);
      renderHistory();
    }
    if (action === "clear-custom" && window.confirm("確定移除所有自行匯入的題目？")) {
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
