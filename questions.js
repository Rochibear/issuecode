window.DEFAULT_QUESTIONS = (() => {
  const groups = [
    {
      groupId: "A",
      category: { zh: "問題追蹤", en: "Issue tracing" },
      title: { zh: "從畫面錯誤追到後端", en: "Trace a UI symptom to the backend" },
      variants: [
        {
          type: "choice",
          difficulty: "Easy",
          title: { zh: "第一個可靠線索", en: "First reliable clue" },
          prompt: {
            zh: "當畫面顯示不符合預期時，最適合先取得哪一種證據，避免只靠猜測？",
            en: "When the screen behaves unexpectedly, what evidence should you capture first instead of guessing?"
          },
          options: [
            { zh: "先修改資料庫資料再看結果", en: "Change database data first and observe" },
            { zh: "用 F12 Network 找請求、action 與 Response 欄位", en: "Use F12 Network to inspect the request, action, and response fields" },
            { zh: "直接重啟網站服務", en: "Restart the web service immediately" },
            { zh: "先把設定值改成 -1", en: "Change the setting to -1 first" }
          ],
          answer: 1,
          hints: [
            { zh: "畫面錯誤通常只是結果，先抓請求與回傳內容。", en: "The UI symptom is usually only the result; capture request and response data first." }
          ],
          explanation: {
            zh: "F12 Network 能看到 RagneChange 與 CheckInfo，後續才有依據追 Web、API、Service、VB 與 SP。",
            en: "F12 Network exposes RagneChange and CheckInfo, giving you evidence to trace Web, API, Service, VB, and the SP."
          }
        },
        {
          type: "fill",
          difficulty: "Easy",
          title: { zh: "Network 裡的 action 名稱", en: "Action name in Network" },
          prompt: {
            zh: "這次追查時，Network 看到用來查詢狀態的 action 名稱是 ________。",
            en: "During the trace, the action name used to query the status in Network was ________."
          },
          placeholder: { zh: "輸入 action 名稱", en: "Enter the action name" },
          answers: ["RagneChange"],
          caseSensitive: false,
          hints: [
            { zh: "名稱開頭是 Ragne，不是 Range。", en: "The name starts with Ragne, not Range." }
          ],
          explanation: {
            zh: "RagneChange 是畫面到 Web Controller 的關鍵入口，可用來接續追 API 呼叫。",
            en: "RagneChange is the key entry from the UI to the Web Controller and lets you continue tracing API calls."
          }
        },
        {
          type: "boolean",
          difficulty: "Easy",
          title: { zh: "Web Controller 的責任", en: "Responsibility of the Web Controller" },
          prompt: {
            zh: "Web Controller 會自己完成所有判斷，不需要呼叫 API 或 Service。",
            en: "The Web Controller completes all validation by itself and does not need API or Service calls."
          },
          answer: false,
          hints: [
            { zh: "注意 ApiGetData(...) 這類呼叫。", en: "Look for calls such as ApiGetData(...)." }
          ],
          explanation: {
            zh: "Web Controller 主要整理參數並呼叫 API，真正判斷會繼續往 Service、VB 與 SP 下鑽。",
            en: "The Web Controller mainly prepares parameters and calls the API; real validation continues through Service, VB, and the SP."
          }
        },
        {
          type: "concept",
          difficulty: "Hard",
          title: { zh: "說明完整追查路徑", en: "Explain the full trace path" },
          prompt: {
            zh: "請說明如何從畫面錯誤一路追到真正的 Stored Procedure。",
            en: "Explain how to trace from the UI symptom down to the actual Stored Procedure."
          },
          placeholder: {
            zh: "寫出你的追查步驟，可以中英混合回答。",
            en: "Write your trace steps. Chinese, English, or both are accepted."
          },
          keywords: [
            ["F12", "Network", "請求", "request"],
            ["RagneChange", "action"],
            ["CheckInfo", "Response", "回傳欄位", "response field"],
            ["Web", "API"],
            ["Service", "VB"],
            ["SP", "Stored Procedure", "預存程序"]
          ],
          modelAnswer: {
            zh: "先用 F12 Network 重現並取得 RagneChange 與 CheckInfo，再沿 Web、API、Service、VB 的呼叫鏈追到 Stored Procedure。",
            en: "Use F12 Network to reproduce the issue and capture RagneChange and CheckInfo, then follow Web, API, Service, and VB calls to the Stored Procedure."
          },
          hints: [
            { zh: "答案至少要包含 Network、action、response 與後端呼叫鏈。", en: "Include Network, action, response, and the backend call chain." }
          ],
          explanation: {
            zh: "穩定的追查不是從資料庫亂改，而是用畫面證據建立可重現的呼叫鏈。",
            en: "A reliable investigation starts from reproducible UI evidence, not random database changes."
          }
        }
      ]
    },
    {
      groupId: "B",
      category: { zh: "設定語意", en: "Setting semantics" },
      title: { zh: "設定值與日期計算", en: "Settings and date calculation" },
      variants: [
        {
          type: "choice",
          difficulty: "Easy",
          title: { zh: "設定值 0 的意義", en: "Meaning of setting value 0" },
          prompt: {
            zh: "在這次案例中，DayOff.OverdueContainHoliday 設定值為多少時，代表計算時要納入例假日？",
            en: "In this case, which DayOff.OverdueContainHoliday value means holidays should be included in the calculation?"
          },
          options: ["-1", "0", "1", "20|5"],
          answer: 1,
          hints: [
            { zh: "-1 不是納入例假日，而是另一個舊語意。", en: "-1 does not mean include holidays; it carries another legacy meaning." }
          ],
          explanation: {
            zh: "0 代表納入例假日；-1 代表不納入。後續判斷會看 SP 回傳的例假日筆數。",
            en: "0 means holidays are included; -1 means they are excluded. Later checks rely on holiday rows returned by the SP."
          }
        },
        {
          type: "fill",
          difficulty: "Medium",
          title: { zh: "超過期限的判斷依據", en: "Basis for overdue judgment" },
          prompt: {
            zh: "判斷是否超過 After 設定時，會用 ________ 來決定是否已跨過例假日。",
            en: "When checking whether the After setting is exceeded, ________ is used to determine whether holidays were crossed."
          },
          placeholder: { zh: "輸入判斷依據", en: "Enter the basis" },
          answers: ["SP 撈到的例假日筆數", "例假日筆數", "假日數", "Rows.Count", "db.GetDataTable.Rows.Count", "holiday rows", "holiday count"],
          caseSensitive: false,
          hints: [
            { zh: "重點不是畫面欄位，而是 HumanlyUtility_5 查出的資料列。", en: "The key is not the UI field, but the rows returned by HumanlyUtility_5." }
          ],
          explanation: {
            zh: "若 SP 沒撈到應有的例假日資料，Rows.Count 會錯，後續 After 判斷也會錯。",
            en: "If the SP misses expected holiday rows, Rows.Count is wrong, so the After judgment becomes wrong."
          }
        },
        {
          type: "boolean",
          difficulty: "Easy",
          title: { zh: "設定值 -1 的語意", en: "Meaning of setting value -1" },
          prompt: {
            zh: "DayOff.OverdueContainHoliday = -1 代表納入例假日計算。",
            en: "DayOff.OverdueContainHoliday = -1 means holidays are included in the calculation."
          },
          answer: false,
          hints: [
            { zh: "-1 是舊語意，不是這次要修正的納入分支。", en: "-1 is the legacy meaning, not the include-holidays branch being fixed here." }
          ],
          explanation: {
            zh: "-1 代表不納入例假日；納入例假日的設定值是 0。",
            en: "-1 means holidays are excluded; the include-holidays value is 0."
          }
        },
        {
          type: "concept",
          difficulty: "Medium",
          title: { zh: "說明設定值與 After 的關係", en: "Explain the setting and After relationship" },
          prompt: {
            zh: "請說明設定值 0、例假日筆數與 After 判斷之間的關係。",
            en: "Explain the relationship among setting value 0, holiday row count, and the After judgment."
          },
          placeholder: {
            zh: "可用中文、英文或中英混合說明。",
            en: "You may answer in Chinese, English, or both."
          },
          keywords: [
            ["設定值 0", "OverdueContainHoliday=0", "value 0"],
            ["納入例假日", "include holiday", "holiday included"],
            ["例假日筆數", "holiday rows", "Rows.Count"],
            ["SP", "Stored Procedure"],
            ["After", "期限", "deadline"],
            ["判斷錯誤", "wrong judgment", "miscalculation"]
          ],
          modelAnswer: {
            zh: "設定值 0 代表納入例假日，程式會用 SP 回傳的例假日筆數來判斷是否超過 After；如果 SP 漏資料，After 判斷就會被低估或錯判。",
            en: "Value 0 means holidays are included. The program uses holiday rows returned by the SP to decide whether After is exceeded; if the SP misses rows, the judgment is underestimated or wrong."
          },
          hints: [
            { zh: "把設定值、SP 回傳筆數、After 判斷三件事串起來。", en: "Connect the setting value, SP row count, and After judgment." }
          ],
          explanation: {
            zh: "這題測的是資料語意，而不是單純記設定值。",
            en: "This tests the data semantics, not just memorizing the setting value."
          }
        }
      ]
    },
    {
      groupId: "C",
      category: { zh: "Flag 流程", en: "Flag flow" },
      title: { zh: "Flag 如何一路回到畫面", en: "How a Flag returns to the UI" },
      variants: [
        {
          type: "choice",
          difficulty: "Easy",
          title: { zh: "前端錯誤 Flag", en: "Frontend error flag" },
          prompt: {
            zh: "RangeCheck_9.Check() 裡哪個 Flag 代表畫面會顯示錯誤訊息？",
            en: "Which Flag in RangeCheck_9.Check() means the UI will show an error message?"
          },
          options: ["Flag 1", "Flag 9", "Flag 10", "Flag 11"],
          answer: 2,
          hints: [
            { zh: "Flag 9 不是這次畫面訊息的來源。", en: "Flag 9 is not the source of this UI message." }
          ],
          explanation: {
            zh: "錯誤分支會設定 result.Flag = 10，之後再轉成 CheckInfo 回到前端。",
            en: "The error branch sets result.Flag = 10, which is later converted into CheckInfo for the frontend."
          }
        },
        {
          type: "fill",
          difficulty: "Easy",
          title: { zh: "填入錯誤 Flag", en: "Fill in the error Flag" },
          prompt: {
            zh: "會讓畫面顯示錯誤訊息的 Flag 是 ________。",
            en: "The Flag that makes the screen show an error message is ________."
          },
          placeholder: { zh: "輸入數字或 Flag", en: "Enter the number or Flag" },
          answers: ["10", "Flag 10", "Flag=10"],
          caseSensitive: false,
          hints: [
            { zh: "答案是兩位數。", en: "The answer is a two-digit number." }
          ],
          explanation: {
            zh: "Flag 10 會透過 get_Message 取得訊息，最後回到 CheckInfo。",
            en: "Flag 10 uses get_Message to produce the message that returns as CheckInfo."
          }
        },
        {
          type: "boolean",
          difficulty: "Medium",
          title: { zh: "API 成功不代表業務成功", en: "API success is not business success" },
          prompt: {
            zh: "APIResult 的 CODE = Success，就代表畫面一定不會顯示業務錯誤。",
            en: "If APIResult CODE = Success, the UI will never show a business error."
          },
          answer: false,
          hints: [
            { zh: "業務判斷通常藏在 Data.Pass 或 CheckInfo。", en: "Business validation usually sits in Data.Pass or CheckInfo." }
          ],
          explanation: {
            zh: "CODE 只代表 API 呼叫成功；業務是否通過還要看 Data.Pass 與 Data.CheckInfo。",
            en: "CODE only means the API call succeeded; business pass/fail still depends on Data.Pass and Data.CheckInfo."
          }
        },
        {
          type: "concept",
          difficulty: "Hard",
          title: { zh: "Flag 到畫面的傳遞鏈", en: "Flag propagation to the UI" },
          prompt: {
            zh: "請說明 Flag 10 如何從後端判斷一路變成畫面上的錯誤訊息。",
            en: "Explain how Flag 10 becomes the error message shown on the screen."
          },
          placeholder: {
            zh: "描述 RangeCheck、Service、API、Web 與畫面之間的傳遞。",
            en: "Describe the propagation through RangeCheck, Service, API, Web, and UI."
          },
          keywords: [
            ["Flag 10", "Flag=10"],
            ["RangeCheck_9", "RangeCheck"],
            ["get_Message", "message", "訊息"],
            ["CheckInfo"],
            ["Service"],
            ["API", "JSON", "Web", "frontend", "前端"]
          ],
          modelAnswer: {
            zh: "RangeCheck_9 產生 Flag 10，Service 透過 get_Message 轉成 CheckInfo，再由 API/Web 以 JSON 回傳，前端讀到 CheckInfo 後顯示錯誤訊息。",
            en: "RangeCheck_9 produces Flag 10. The Service converts it into CheckInfo through get_Message, API/Web returns it as JSON, and the frontend displays the error from CheckInfo."
          },
          hints: [
            { zh: "答案要包含 Flag、get_Message、CheckInfo 與 API/Web 回傳。", en: "Include Flag, get_Message, CheckInfo, and API/Web response." }
          ],
          explanation: {
            zh: "不要只看 HTTP 成功，還要看業務錯誤如何被包在回傳資料中。",
            en: "Do not stop at HTTP success; inspect how the business error is carried in the response data."
          }
        }
      ]
    },
    {
      groupId: "D",
      category: { zh: "根因", en: "Root cause" },
      title: { zh: "item=0 漏讀問題", en: "Missing item=0 data" },
      variants: [
        {
          type: "choice",
          difficulty: "Medium",
          title: { zh: "真正根因", en: "Actual root cause" },
          prompt: {
            zh: "設定值為 0 時資料庫有例假日資料，但程式仍判斷錯誤。根因是哪一個？",
            en: "When the setting is 0, holiday data exists in the database but validation is still wrong. What is the root cause?"
          },
          options: [
            { zh: "RagneChange action 名稱拼錯", en: "The RagneChange action name is misspelled" },
            { zh: "humva_after 一定要設成 -1", en: "humva_after must be set to -1" },
            { zh: "HumanlyUtility_5 只讀 item=1/2，漏掉 item=0", en: "HumanlyUtility_5 reads only item=1/2 and misses item=0" },
            { zh: "前端沒有送出使用者帳號", en: "The frontend does not send the user account" }
          ],
          answer: 2,
          hints: [
            { zh: "資料存在但查不到，通常要看 WHERE 條件。", en: "If data exists but is not returned, inspect the WHERE conditions." }
          ],
          explanation: {
            zh: "SP 原本只查 item=1/2，導致代表例假日的 item=0 沒被計入。",
            en: "The SP originally queried only item=1/2, so item=0 holiday rows were not counted."
          }
        },
        {
          type: "fill",
          difficulty: "Easy",
          title: { zh: "漏掉的 item", en: "Missing item" },
          prompt: {
            zh: "代表例假日、但原本沒有被 HumanlyUtility_5 查到的 hum_holiday.humho_item 是 ________。",
            en: "The hum_holiday.humho_item value that represents holidays but was missed by HumanlyUtility_5 is ________."
          },
          placeholder: { zh: "輸入 item 值", en: "Enter the item value" },
          answers: ["0", "item=0", "item = 0"],
          caseSensitive: false,
          hints: [
            { zh: "不是 postid 或 dn 綁定的 item。", en: "It is not the item tied to postid or dn." }
          ],
          explanation: {
            zh: "item=0 是獨立的例假日來源，原查詢漏掉它才造成 Rows.Count 錯誤。",
            en: "item=0 is an independent holiday source. Missing it made Rows.Count wrong."
          }
        },
        {
          type: "boolean",
          difficulty: "Medium",
          title: { zh: "item=0 的資料特性", en: "Data characteristic of item=0" },
          prompt: {
            zh: "hum_holiday.humho_item = 0 是例假日資料，不一定綁定 postid 或 dn。",
            en: "hum_holiday.humho_item = 0 is holiday data and is not necessarily tied to postid or dn."
          },
          answer: true,
          hints: [
            { zh: "它是一般例假日來源，不是個人或職位分支。", en: "It is a general holiday source, not a person or position branch." }
          ],
          explanation: {
            zh: "item=0 代表例假日資料，應該被納入設定值 0 的計算。",
            en: "item=0 represents holiday data and should be included when the setting value is 0."
          }
        },
        {
          type: "concept",
          difficulty: "Hard",
          title: { zh: "證明根因是 item=0", en: "Prove item=0 is the root cause" },
          prompt: {
            zh: "請說明如何用設定值、資料表與 SP 查詢條件證明根因是漏讀 item=0。",
            en: "Explain how settings, tables, and SP query conditions prove that the root cause is missing item=0."
          },
          placeholder: {
            zh: "說明資料存在、查詢漏掉、Rows.Count 變錯的因果鏈。",
            en: "Explain the chain: data exists, query misses it, Rows.Count becomes wrong."
          },
          keywords: [
            ["設定值 0", "OverdueContainHoliday=0", "value 0"],
            ["hum_holiday", "holiday table"],
            ["item=0", "item = 0"],
            ["SP", "HumanlyUtility_5", "Stored Procedure"],
            ["item=1/2", "只查", "only item 1/2"],
            ["Rows.Count", "筆數 0", "row count"]
          ],
          modelAnswer: {
            zh: "設定值已是 0，hum_holiday 也有 item=0 的例假日資料；但 HumanlyUtility_5 原本只查 item=1/2，導致 Rows.Count 沒算到例假日，因此根因是 SP 查詢漏讀 item=0。",
            en: "The setting is 0 and hum_holiday contains item=0 holiday rows, but HumanlyUtility_5 only queried item=1/2. Rows.Count missed the holidays, proving the SP query missed item=0."
          },
          hints: [
            { zh: "不要只說『SP 錯』，要說清楚哪個 WHERE 條件漏了什麼資料。", en: "Do not only say 'the SP is wrong'; identify which WHERE condition missed what data." }
          ],
          explanation: {
            zh: "根因證明必須同時覆蓋設定、資料存在、查詢條件與錯誤結果。",
            en: "Root-cause proof should cover the setting, existing data, query condition, and wrong result."
          }
        }
      ]
    },
    {
      groupId: "E",
      category: { zh: "SQL 修正", en: "SQL fix" },
      title: { zh: "最小範圍修正 SP", en: "Minimal Stored Procedure fix" },
      variants: [
        {
          type: "choice",
          difficulty: "Medium",
          title: { zh: "最小風險修正", en: "Lowest-risk fix" },
          prompt: {
            zh: "哪一種 SP 修正方式最符合最小變更、容易驗證與容易回滾的原則？",
            en: "Which SP fix best follows minimal change, easy validation, and easy rollback?"
          },
          options: [
            { zh: "把所有 item=0 都改成 item=1", en: "Change all item=0 rows to item=1" },
            { zh: "新增大量 INSERT 產生補償資料", en: "Insert a large amount of compensating data" },
            { zh: "在原查詢補上 item=0 來源，並用 UNION 去重", en: "Add the item=0 source to the query and use UNION to deduplicate" },
            { zh: "完全重寫整支 SP 與所有呼叫端", en: "Rewrite the entire SP and every caller" }
          ],
          answer: 2,
          hints: [
            { zh: "優先修查詢，不要改資料語意。", en: "Prefer fixing the query, not changing data semantics." }
          ],
          explanation: {
            zh: "只補原本漏讀的 item=0，並以 UNION 去重，是範圍最小且可驗證的修法。",
            en: "Adding only the missing item=0 source and deduplicating with UNION keeps the change small and verifiable."
          }
        },
        {
          type: "fill",
          difficulty: "Easy",
          title: { zh: "去重用的 SQL 關鍵字", en: "SQL keyword for deduplication" },
          prompt: {
            zh: "補上 item=0 查詢分支時，為了避免重複資料，應使用 ________ 而不是 UNION ALL。",
            en: "When adding the item=0 branch, use ________ instead of UNION ALL to avoid duplicate rows."
          },
          placeholder: { zh: "輸入 SQL 關鍵字", en: "Enter the SQL keyword" },
          answers: ["UNION"],
          caseSensitive: false,
          hints: [
            { zh: "這個關鍵字預設會做去重。", en: "This keyword deduplicates by default." }
          ],
          explanation: {
            zh: "UNION 會去除重複列；UNION ALL 不會。",
            en: "UNION removes duplicate rows; UNION ALL does not."
          }
        },
        {
          type: "boolean",
          difficulty: "Medium",
          title: { zh: "UNION 的目的", en: "Purpose of UNION" },
          prompt: {
            zh: "使用 UNION 而不是 UNION ALL，可以降低重複資料造成筆數判斷錯誤的風險。",
            en: "Using UNION instead of UNION ALL reduces the risk of duplicate rows causing wrong row-count judgments."
          },
          answer: true,
          hints: [
            { zh: "重點是 Rows.Count 不能被重複列放大。", en: "Rows.Count must not be inflated by duplicate rows." }
          ],
          explanation: {
            zh: "UNION 的去重特性可避免重複例假日列影響 Rows.Count。",
            en: "UNION deduplication prevents duplicate holiday rows from affecting Rows.Count."
          }
        },
        {
          type: "concept",
          difficulty: "Hard",
          title: { zh: "說明修正為何風險低", en: "Explain why the fix is low risk" },
          prompt: {
            zh: "請說明為何只補 item=0 並使用 UNION，是比改資料或重寫 SP 更低風險的修正。",
            en: "Explain why adding item=0 with UNION is lower risk than changing data or rewriting the SP."
          },
          placeholder: {
            zh: "說明最小變更、去重、資料語意與回滾。",
            en: "Mention minimal change, deduplication, data semantics, and rollback."
          },
          keywords: [
            ["item=0", "漏讀", "missing item"],
            ["最小", "只新增", "minimal", "small change"],
            ["UNION", "去重", "deduplicate"],
            ["資料語意", "不改資料", "data semantics"],
            ["既有", "不動排班", "existing behavior"],
            ["風險", "回滾", "rollback", "low risk"]
          ],
          modelAnswer: {
            zh: "修正只補上原本漏讀的 item=0，使用 UNION 去重，不改既有資料語意、排班分支或其他查詢，因此變更小、容易驗證與回滾。",
            en: "The fix only adds the missing item=0 branch, uses UNION to deduplicate, and does not change existing data semantics, schedule branches, or other queries, making it easy to validate and roll back."
          },
          hints: [
            { zh: "把『少動什麼』與『多補什麼』講清楚。", en: "Explain what stays untouched and what is added." }
          ],
          explanation: {
            zh: "工程修正不只要能過，還要能被安全部署、驗證與回滾。",
            en: "A fix must not only work; it must be safe to deploy, verify, and roll back."
          }
        }
      ]
    },
    {
      groupId: "F",
      category: { zh: "驗證部署", en: "Validation" },
      title: { zh: "跨環境確認與驗證", en: "Cross-environment validation" },
      variants: [
        {
          type: "choice",
          difficulty: "Hard",
          title: { zh: "部署前最該比對的項目", en: "Most important pre-deploy comparison" },
          prompt: {
            zh: "SP 修正前，最應該比對哪一項，避免改錯環境或改錯版本？",
            en: "Before changing the SP, what should be compared to avoid editing the wrong environment or version?"
          },
          options: [
            { zh: "只比對畫面截圖", en: "Only compare screenshots" },
            { zh: "只比對瀏覽器快取", en: "Only compare browser cache" },
            { zh: "比對不同 DB 環境的 SP definition 與資料來源", en: "Compare SP definitions and data sources across DB environments" },
            { zh: "不需要比對，直接改正式環境", en: "No comparison; change production directly" }
          ],
          answer: 2,
          hints: [
            { zh: "SP 是在 DB 裡，版本與環境一定要確認。", en: "The SP lives in the DB; version and environment must be confirmed." }
          ],
          explanation: {
            zh: "跨 DB 比對 definition 與資料來源，能避免在錯誤環境套錯腳本。",
            en: "Comparing definitions and data sources across DBs prevents applying scripts to the wrong environment."
          }
        },
        {
          type: "fill",
          difficulty: "Medium",
          title: { zh: "ALTER PROCEDURE 前要確認的環境", en: "Environment to confirm before ALTER PROCEDURE" },
          prompt: {
            zh: "使用 ALTER PROCEDURE 前，至少要確認目標 ________ 與 SP definition 是正確版本。",
            en: "Before ALTER PROCEDURE, confirm the target ________ and SP definition are the correct version."
          },
          placeholder: { zh: "輸入環境或系統層級", en: "Enter the environment/system level" },
          answers: ["DB", "資料庫", "Database", "database environment", "資料庫環境"],
          caseSensitive: false,
          hints: [
            { zh: "EIP1、eip2 這類名稱通常指向不同資料庫環境。", en: "Names like EIP1 and eip2 usually point to different database environments." }
          ],
          explanation: {
            zh: "確認 DB 與 definition 是避免誤改、漏改與難以回滾的基本動作。",
            en: "Confirming DB and definition prevents wrong edits, missed edits, and rollback difficulty."
          }
        },
        {
          type: "boolean",
          difficulty: "Medium",
          title: { zh: "只看畫面就足夠", en: "UI-only validation is enough" },
          prompt: {
            zh: "修正後只要畫面不再出錯，就不需要確認 DB 的 SP definition。",
            en: "After the fix, if the UI no longer errors, there is no need to confirm the DB SP definition."
          },
          answer: false,
          hints: [
            { zh: "畫面通過只能代表其中一條路徑正常。", en: "A passing UI only proves one path works." }
          ],
          explanation: {
            zh: "仍需確認 DB definition、測試資料與回滾腳本，避免環境差異或後續部署問題。",
            en: "You still need to confirm DB definition, test data, and rollback scripts to avoid environment drift or deployment issues."
          }
        },
        {
          type: "concept",
          difficulty: "Hard",
          title: { zh: "驗證與回滾計畫", en: "Validation and rollback plan" },
          prompt: {
            zh: "請說明一次安全的 SP 修正應包含哪些驗證與回滾步驟。",
            en: "Explain what validation and rollback steps a safe SP fix should include."
          },
          placeholder: {
            zh: "可包含 DB、definition、UAT、測試資料、前後比較與回滾。",
            en: "Mention DB, definition, UAT, test data, before/after comparison, and rollback."
          },
          keywords: [
            ["DB", "資料庫", "Database", "EIP1", "eip2"],
            ["definition", "SP 定義", "版本"],
            ["UAT", "測試環境", "staging"],
            ["測試資料", "uid", "test data"],
            ["前後比較", "before", "after"],
            ["回滾", "rollback", "備份", "backup"]
          ],
          modelAnswer: {
            zh: "先確認目標 DB 與 SP definition，保留修改前 definition；在 UAT 用固定測試資料重現前後差異，確認 item=0 被計入且沒有重複列，再準備 rollback 腳本與部署紀錄。",
            en: "Confirm the target DB and SP definition, keep the pre-change definition, reproduce before/after differences in UAT with fixed test data, verify item=0 is counted without duplicates, then prepare rollback scripts and deployment notes."
          },
          hints: [
            { zh: "答案要同時有部署前確認、部署後驗證與失敗回復。", en: "Include pre-deploy checks, post-deploy validation, and failure recovery." }
          ],
          explanation: {
            zh: "驗證流程要能證明修正有效，也要能在失敗時安全回復。",
            en: "Validation must prove the fix works and provide a safe path back if it fails."
          }
        }
      ]
    }
  ];

  return groups.flatMap((group) =>
    group.variants.map((question, index) => ({
      id: `${group.groupId}-${index + 1}`,
      groupId: group.groupId,
      variantId: `${group.groupId}-${index + 1}`,
      groupTitle: group.title,
      category: group.category,
      ...question
    }))
  );
})();
