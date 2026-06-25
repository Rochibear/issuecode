# IssueCode

以實際 Issue 復盤內容製作的離線測驗 Web 小程式。

線上版本：<https://rochibear.github.io/issuecode/>

## 執行

可直接開啟 `index.html`，或在此目錄啟動任一靜態檔案伺服器：

```powershell
python -m http.server 4173
```

然後開啟 `http://127.0.0.1:4173`。

## 在其他電腦使用

1. 將 `IssueCode-portable.zip` 複製到另一台電腦並解壓縮。
2. 直接雙擊 `index.html` 即可使用，不需安裝後端或資料庫。
3. 若瀏覽器限制本機檔案，可在解壓縮資料夾執行 `python -m http.server 4173`，再開啟 `http://127.0.0.1:4173`。

挑戰紀錄與自行匯入的題目使用瀏覽器 `localStorage`，因此每台電腦、每個瀏覽器各自保存，不會自動同步。

## 功能

- 選擇、填空、是非、概念、多選、排序、配對、情境與程式題
- 同一知識點可建立多種題型變體，每次只隨機抽一種
- 介面支援中文、英文、中英雙語同時呈現
- 測驗前設定提示與偷看答案次數
- 測驗前可選難度：一星（初學者）、二星（進階）、三星（資深）
- 每題計分、總分、作答時間與暱稱紀錄
- 結果頁並列作答與參考答案，概念題以異色關鍵字顯示命中／缺漏
- 挑戰紀錄與自訂題庫保存在瀏覽器 `localStorage`
- 題庫管理會同時列出內建題庫與匯入題庫
- 支援結構化 Markdown 與 JSON 題庫匯入，舊的純中文格式仍可使用

概念題依關鍵概念群組的覆蓋率自動計分，關鍵字可同時放中文與英文同義詞。程式題目前為題目／測資／參考解呈現與文字作答，不執行 C# 編譯判題。提示題最高 8 分，偷看答案的題目為 0 分。

## 內建基本題庫

`questions.js` 目前內建 126 題，來自 `issue-題庫` Markdown 題庫：36 個 issue group。基本題庫仍以同一個 `groupId` 每次只隨機抽其中一種題型；新增樣本包含多選、排序、配對、情境與 C# 程式題。

如需用新版 Markdown 題庫重新產生內建題庫：

```powershell
node tools/generate-default-questions.mjs "C:\Users\hgiga\Desktop\issue-題庫" questions.js
```

產生後建議執行基本檢查：

```powershell
node -e "global.window={}; require('./questions.js'); console.log(window.DEFAULT_QUESTIONS.length)"
```

## 題庫匯入

Markdown 格式可參考 `sample-questions.md`；未來製作新 Issue 題庫時可直接複製 `issue-question-template.md`。如果要交給 AI 產題，先給它 `ai-difficulty-standard.md` 作為難度判定標準。每題以 `## Q:` 開頭，`type` 支援：

使用相同 `groupId` 可將數題歸為同一知識點；每次測驗只會從該群組隨機抽一題。`variantId` 用來顯示 A-1、A-2 等題型編號。

`difficulty` 用來標示題目難度，建議使用：

- `beginner`：一星，初學者
- `advanced`：二星，進階
- `senior`：三星，資深

舊格式 `Easy`、`Medium`、`Hard` 仍可匯入，系統會自動對應為一星、二星、三星。

- `choice`：`options` 以 `|` 分隔，`answer` 為從 0 開始的選項索引。
- `fill`：`answer` 可用 `|` 提供多個可接受答案。
- `boolean`：`answer` 使用 `true` 或 `false`。
- `concept`：`keywords` 用 `|` 分隔概念群組，同群組同義詞用逗號分隔；`answer` 是參考答案。
- `multi`：多選題，`answer` 使用逗號分隔正解索引，例如 `0,1,3`。
- `ordering`：排序題，`answer` 使用逗號分隔正確順序索引，例如 `1,2,0,3`。
- `matching`：配對題，使用 `left` / `right`，`answer` 使用 `左索引-右索引`，例如 `0-1,1-2,2-0`。
- `scenario`：情境題，使用 `scenario` 加上一個選擇題式子題。
- `code`：程式題，支援 `lang`、`signature`、`constraints`、`examples`、`tests`、`solution`、`complexity`。

可選的雙語欄位：

- `titleEn`
- `promptEn`
- `categoryEn`
- `optionsEn`
- `answerEn`
- `hintEn`
- `keywordsEn`
- `modelAnswerEn`
- `explanationEn`

JSON 欄位與 `questions.js` 內建題庫相同，可匯入單一物件或陣列。
