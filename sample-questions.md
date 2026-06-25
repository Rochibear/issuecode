# IssueCode 自訂題庫範例

舊格式的純中文題目仍可匯入；若要雙語呈現，可加上 `titleEn`、`promptEn`、`optionsEn`、`answerEn`、`hintEn`、`keywordsEn`、`modelAnswerEn`、`explanationEn` 等欄位。

## Q: 修改 SP 時應使用哪個指令？
titleEn: Which command should be used to modify an SP?
groupId: E
variantId: E-5
type: choice
category: SQL
categoryEn: SQL
difficulty: Easy
prompt: 為保留既有物件與權限，修改 HumanlyUtility_5 時應使用哪個指令？
promptEn: To preserve the existing object and permissions, which command should be used to modify HumanlyUtility_5?
options: DROP PROCEDURE | ALTER PROCEDURE | DELETE PROCEDURE | UPDATE PROCEDURE
optionsEn: DROP PROCEDURE | ALTER PROCEDURE | DELETE PROCEDURE | UPDATE PROCEDURE
answer: 1
hint: 不需要先移除既有 SP。
hintEn: You do not need to remove the existing SP first.
explanation: 使用 ALTER 修改既有 Stored Procedure，避免 DROP + CREATE 帶來額外風險。
explanationEn: ALTER modifies the existing Stored Procedure and avoids the extra risk of DROP + CREATE.

## Q: Flag 11 的意義
titleEn: Meaning of Flag 11
groupId: C
variantId: C-5
type: fill
category: 核心邏輯
categoryEn: Core logic
difficulty: Medium
prompt: RangeCheck_9.Check() 中，Flag 11 代表哪一類問題？
promptEn: In RangeCheck_9.Check(), what kind of issue does Flag 11 represent?
answer: 時間重複 | 已有資料 | 重複申請
answerEn: overlapping time | duplicate request | existing data
hint: 它出現在 OverlapCardlog 檢查後。
hintEn: It appears after the OverlapCardlog check.
explanation: 查到申請時段已有重疊資料時，會回傳 Flag 11。
explanationEn: Flag 11 is returned when the requested time range overlaps existing data.

## Q: 追查方法
titleEn: Trace method
groupId: A
variantId: A-5
type: concept
category: 方法論
categoryEn: Method
difficulty: Hard
prompt: 說明如何從畫面錯誤追到真正的 Stored Procedure。
promptEn: Explain how to trace from a UI symptom to the actual Stored Procedure.
keywords: F12,Network,請求 | action,RagneChange | Service,VB | SP,Stored Procedure
keywordsEn: F12,Network,request | action,RagneChange | Service,VB | SP,Stored Procedure
answer: 用 F12 Network 找請求與回傳欄位，再沿 Web、API、Service、VB 的呼叫鏈追到 SP。
modelAnswerEn: Use F12 Network to find the request and response fields, then follow the Web, API, Service, and VB call chain to the SP.
hint: 先取得可跨層搜尋的識別字。
hintEn: First capture identifiers that can be searched across layers.
explanation: 呼叫鏈識別字比畫面翻譯後的中文訊息可靠。
explanationEn: Call-chain identifiers are more reliable than translated UI messages.
