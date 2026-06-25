# IssueCode 未來 Issue 題庫製作範本

使用方式：

1. 複製此檔，改成你的 Issue 名稱，例如 `issue-2026-xxx.md`。
2. 每一個「知識點」使用同一個 `groupId`，例如 `ISSUE001`。
3. 同一個知識點可建立 4 種題型：選擇、填空、是非、概念。
4. 匯入後，每次練習會從同一個 `groupId` 只隨機抽一題。
5. 如果只要中文，可以刪掉 `titleEn`、`promptEn`、`optionsEn`、`answerEn`、`hintEn`、`keywordsEn`、`modelAnswerEn`、`explanationEn`。

---

## Q: 這個 Issue 第一個應該確認的線索是什麼？
titleEn: What is the first clue to verify in this issue?
groupId: ISSUE001
variantId: ISSUE001-1
type: choice
category: 問題追蹤
categoryEn: Issue tracing
difficulty: Easy
prompt: 當畫面或流程出現異常時，第一步最適合先取得哪一種證據？
promptEn: When a screen or flow behaves unexpectedly, which evidence should be captured first?
options: 直接修改資料 | 查看瀏覽器 Network 請求與回應 | 重啟服務 | 先改設定值
optionsEn: Change data directly | Inspect browser Network request and response | Restart the service | Change configuration first
answer: 1
hint: 先取得可重現、可跨層追蹤的資訊。
hintEn: Capture reproducible information that can be traced across layers.
explanation: 可靠的 Issue 追查應從可觀察證據開始，例如 request、response、action、錯誤訊息或識別欄位。
explanationEn: Reliable issue tracing starts from observable evidence such as request, response, action, error message, or identifier fields.

## Q: 這個 Issue 的關鍵 action / API / SP 名稱是什麼？
titleEn: What is the key action / API / SP name in this issue?
groupId: ISSUE001
variantId: ISSUE001-2
type: fill
category: 問題追蹤
categoryEn: Issue tracing
difficulty: Easy
prompt: 這次追查中，最適合拿來跨層搜尋的關鍵名稱是 ________。
promptEn: In this investigation, the key name best used for cross-layer searching is ________.
answer: TODO_ACTION_OR_SP_NAME | TODO_API_NAME
answerEn: TODO_ACTION_OR_SP_NAME | TODO_API_NAME
hint: 可以填 action、API method、Service method 或 Stored Procedure 名稱。
hintEn: This can be an action, API method, Service method, or Stored Procedure name.
explanation: 填空題適合檢查明確名詞，例如 action、Flag、SP、設定 key 或欄位名稱。
explanationEn: Fill-in questions are useful for exact terms such as actions, Flags, SPs, setting keys, or field names.

## Q: 這個 Issue 的根因是在前端嗎？
titleEn: Is the root cause of this issue in the frontend?
groupId: ISSUE001
variantId: ISSUE001-3
type: boolean
category: 根因判斷
categoryEn: Root-cause judgment
difficulty: Medium
prompt: 只要畫面顯示錯誤，就代表根因一定在前端程式。
promptEn: If the screen shows an error, the root cause must be in frontend code.
answer: false
hint: 畫面通常只是最後呈現結果，還要往後追資料與判斷來源。
hintEn: The screen is usually only the final presentation; trace the data and validation source.
explanation: 是非題適合檢查容易誤判的觀念。畫面錯誤可能來自前端、API、Service、DB、Stored Procedure 或資料本身。
explanationEn: True/false questions are useful for common misconceptions. UI errors can originate from frontend, API, Service, DB, Stored Procedure, or data.

## Q: 請說明這個 Issue 的完整追查路徑與根因。
titleEn: Explain the full trace path and root cause of this issue.
groupId: ISSUE001
variantId: ISSUE001-4
type: concept
category: 根因判斷
categoryEn: Root-cause judgment
difficulty: Hard
prompt: 請用自己的話說明：你會如何從畫面現象追到真正根因，最後如何驗證修正有效。
promptEn: Explain in your own words how you would trace from the UI symptom to the real root cause and verify the fix.
keywords: 畫面現象,錯誤訊息,UI | Network,request,response | action,API,Service | DB,Stored Procedure,SP | 根因,資料條件,設定值 | 驗證,UAT,回歸測試,回滾
keywordsEn: UI symptom,error message | Network,request,response | action,API,Service | DB,Stored Procedure,SP | root cause,data condition,setting | validation,UAT,regression test,rollback
answer: 先重現畫面現象並取得 Network request/response，再用 action 或識別欄位沿 Web、API、Service、DB/SP 追查。確認資料條件或設定值造成錯誤後，以最小變更修正，最後用固定測試資料驗證前後差異並準備回滾方式。
modelAnswerEn: Reproduce the UI symptom and capture Network request/response, then use the action or identifier fields to trace through Web, API, Service, and DB/SP. After confirming the data condition or setting that caused the issue, apply the smallest safe fix, verify before/after behavior with fixed test data, and prepare a rollback path.
hint: 概念題不用一字不漏，重點是命中關鍵概念。
hintEn: Concept answers do not need exact wording; they need to cover the key concepts.
explanation: 概念題會用 `keywords` / `keywordsEn` 的概念群組計分。每個 `|` 是一組概念；同一組內用逗號放同義詞。
explanationEn: Concept questions are scored using keyword groups from `keywords` / `keywordsEn`. Each `|` separates a concept group; commas separate synonyms within the same group.
