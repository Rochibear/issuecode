# IssueCode 自訂題庫範例

## Q: 修改 SP 時應使用哪個指令？
type: choice
category: SQL
difficulty: Easy
prompt: 為保留既有物件與權限，修改 HumanlyUtility_5 時應使用哪個指令？
options: DROP PROCEDURE | ALTER PROCEDURE | DELETE PROCEDURE | UPDATE PROCEDURE
answer: 1
hint: 不需要先移除既有 SP。
explanation: 使用 ALTER 修改既有 Stored Procedure，避免 DROP + CREATE 帶來額外風險。

## Q: Flag 11 的意義
type: fill
category: 核心邏輯
difficulty: Medium
prompt: RangeCheck_9.Check() 中，Flag 11 代表哪一類問題？
answer: 時間重複 | 已有資料 | 重複申請
hint: 它出現在 OverlapCardlog 檢查後。
explanation: 查到申請時段已有重疊資料時，會回傳 Flag 11。

## Q: 追查方法
type: concept
category: 方法論
difficulty: Hard
prompt: 說明如何從畫面錯誤追到真正的 Stored Procedure。
keywords: F12,Network,請求 | action,RagneChange | Service,VB | SP,Stored Procedure
answer: 用 F12 Network 找請求與回傳欄位，再沿 Web、API、Service、VB 的呼叫鏈追到 SP。
hint: 先取得可跨層搜尋的識別字。
explanation: 呼叫鏈識別字比畫面翻譯後的中文訊息可靠。
