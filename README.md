# IssueCode

以實際 Issue 復盤內容製作的離線測驗 Web 小程式。

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

- 選擇、填空、是非與概念題
- 測驗前設定提示與偷看答案次數
- 每題計分、總分、作答時間與暱稱紀錄
- 挑戰紀錄與自訂題庫保存在瀏覽器 `localStorage`
- 支援結構化 Markdown 與 JSON 題庫匯入

概念題依關鍵概念群組的覆蓋率自動計分。提示題最高 8 分，偷看答案的題目為 0 分。

## 題庫匯入

Markdown 格式可參考 `sample-questions.md`。每題以 `## Q:` 開頭，`type` 支援：

- `choice`：`options` 以 `|` 分隔，`answer` 為從 0 開始的選項索引。
- `fill`：`answer` 可用 `|` 提供多個可接受答案。
- `boolean`：`answer` 使用 `true` 或 `false`。
- `concept`：`keywords` 用 `|` 分隔概念群組，同群組同義詞用逗號分隔；`answer` 是參考答案。

JSON 欄位與 `questions.js` 內建題庫相同，可匯入單一物件或陣列。
