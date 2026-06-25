# IssueCode AI 製題難度設定標準

這份文件給 AI 或人工出題者使用。目的：製作 Issue 題庫時，能穩定判定 `difficulty`，避免一星、二星、三星混亂。

## difficulty 欄位固定值

題庫 Markdown / JSON 只建議使用以下三種值：

```md
difficulty: beginner
difficulty: advanced
difficulty: senior
```

舊值仍可相容，但新題庫不要再優先使用：

| 舊值 | 新值 | 顯示 |
|---|---|---|
| `Easy` | `beginner` | ★ 一星｜初學者 |
| `Medium` | `advanced` | ★★ 二星｜進階 |
| `Hard` | `senior` | ★★★ 三星｜資深 |

## 一星｜初學者｜beginner

定位：確認基本名詞、入口、單一事實、單一步驟。

適合題型：

- 選擇題：問「第一步該看哪裡」、「哪個 action / Flag / 設定值是正確的」。
- 填空題：填明確名稱，例如 action、SP、Flag、設定 key、欄位名稱。
- 是非題：判斷單一觀念是否正確。

判定標準：

- 答案可以直接從 Issue 復盤文字、截圖、log、程式碼片段中找到。
- 不需要跨三層以上推理。
- 不要求提出修正方案。
- 不要求完整說明因果鏈。

範例：

```md
difficulty: beginner
prompt: Network 中用來查詢狀態的 action 名稱是 ________。
answer: RagneChange
```

## 二星｜進階｜advanced

定位：理解跨層資料流、條件判斷、設定語意、錯誤因果。

適合題型：

- 選擇題：問「哪個條件造成錯誤判斷」、「哪個分支會影響結果」。
- 填空題：填資料判斷依據，例如 Rows.Count、設定值語意、資料來源。
- 是非題：拆解容易誤判的因果，例如 API success 不等於業務 success。
- 概念題：要求串起 2～4 個關鍵概念。

判定標準：

- 需要理解 Web / API / Service / DB / SP 之間至少兩層以上關係。
- 需要知道資料存在、查詢條件、設定值、回傳欄位之間的關聯。
- 可以要求說明「為什麼」但不要求完整修正與部署策略。

範例：

```md
difficulty: advanced
prompt: 為什麼 CODE = Success 不一定代表畫面業務判斷成功？
keywords: CODE,API 成功 | Data.Pass | CheckInfo | 業務錯誤
```

## 三星｜資深｜senior

定位：完整根因分析、最小修正策略、風險控管、驗證與回滾。

適合題型：

- 概念題：說明從畫面到 SP 的完整追查鏈。
- 概念題：比較修正方案風險，說明為什麼某方案較安全。
- 選擇題：選出最小變更、最容易驗證、最容易回滾的修正策略。
- 是非題：判斷高風險部署觀念，例如「畫面 OK 就不用確認 DB definition」。

判定標準：

- 需要能描述完整因果鏈。
- 需要能提出或評估修正方案。
- 需要提到驗證、UAT、回歸測試、回滾、資料語意或部署風險。
- 答案不是單一欄位或單一名詞，而是工程判斷。

範例：

```md
difficulty: senior
prompt: 請說明為什麼只補 item=0 並使用 UNION，是比改資料或重寫 SP 更低風險的修正。
keywords: item=0,漏讀 | 最小變更 | UNION,去重 | 不改資料語意 | 驗證 | 回滾
```

## AI 出題時的判斷流程

請依序判斷：

1. 如果題目只考「記得某個名詞 / 值 / 入口」：用 `beginner`。
2. 如果題目要理解「兩層以上流程或資料條件」：用 `advanced`。
3. 如果題目要做「根因證明、修正策略、風險控管、驗證回滾」：用 `senior`。
4. 如果不確定，先看答案是否需要完整段落說明：
   - 不需要，通常是 `beginner` 或 `advanced`。
   - 需要，而且包含工程取捨，通常是 `senior`。

## 題型與難度建議

| 題型 | beginner | advanced | senior |
|---|---:|---:|---:|
| choice | 適合 | 適合 | 可用於策略選擇 |
| fill | 適合 | 可用於資料依據 | 較少使用 |
| boolean | 適合 | 適合 | 可用於風險觀念 |
| concept | 少用 | 適合 | 最適合 |

## 產題輸出要求

AI 產題時，每題都必須包含：

```md
groupId:
variantId:
type:
category:
difficulty:
prompt:
answer:
hint:
explanation:
```

雙語題庫建議同時包含：

```md
titleEn:
categoryEn:
promptEn:
hintEn:
explanationEn:
```

概念題必須包含：

```md
keywords:
modelAnswerEn:
```

如果有英文關鍵字，另外加：

```md
keywordsEn:
```

## 品質檢查清單

出題後逐題檢查：

- `difficulty` 是否只使用 `beginner / advanced / senior`。
- 一星題是否避免要求完整根因分析。
- 二星題是否至少有跨層或資料條件理解。
- 三星題是否包含工程判斷、修正策略或驗證回滾。
- 同一個 `groupId` 下的變體是否都在考同一個知識點。
- 概念題的 `keywords` 是否是概念群組，而不是一整句答案。
- `hint` 是否只提示方向，不直接洩漏完整答案。
