window.DEFAULT_QUESTIONS = (() => {
  const groups = [
    {
      groupId: "A",
      category: "呼叫鏈",
      title: "從畫面追到程式核心",
      variants: [
        {
          type: "choice",
          difficulty: "Easy",
          title: "第一個可靠的追查線索",
          prompt: "畫面只顯示「事後申請期限錯誤」，最有效的第一步是什麼？",
          options: ["全域搜尋錯誤中文", "F12 Network 重現並找請求名稱與 Response 欄位", "先重建行事曆", "直接把設定改成 -1"],
          answer: 1,
          hints: ["錯誤中文可能由 DB 翻譯，程式碼中未必存在。"],
          explanation: "先取得 RagneChange 與 CheckInfo，再沿呼叫鏈追蹤。"
        },
        {
          type: "fill",
          difficulty: "Easy",
          title: "跨層搜尋的 action 名稱",
          prompt: "本案從 Network 找到、可用來跨 Web 與 API 搜尋的 action 名稱是 ________。",
          placeholder: "輸入 action 名稱",
          answers: ["RagneChange"],
          caseSensitive: false,
          hints: ["原始程式中的拼字少了一個字母，但六處一致。"],
          explanation: "RagneChange 雖然拼字不標準，但各層一致，因此能作為可靠識別字。"
        },
        {
          type: "boolean",
          difficulty: "Easy",
          title: "Web Controller 的責任",
          prompt: "Web 層的 FormLeakApplyController.RagneChange 會直接計算期限是否逾期。",
          answer: false,
          hints: ["觀察 ApiGetData(...) 的用途。"],
          explanation: "Web Controller 只補 siteid、轉發 API，再把結果回傳瀏覽器。"
        },
        {
          type: "concept",
          difficulty: "Hard",
          title: "說明完整追查路徑",
          prompt: "請說明如何從畫面錯誤一路追到真正的 Stored Procedure。",
          placeholder: "寫下你的追查步驟…",
          keywords: [["F12", "Network", "請求"], ["RagneChange", "action"], ["CheckInfo", "Response", "回傳欄位"], ["Web", "API"], ["Service", "VB"], ["SP", "Stored Procedure"]],
          modelAnswer: "先用 F12 Network 重現並取得 RagneChange 與 CheckInfo，再沿 Web、API、Service、VB 的呼叫鏈追到 Stored Procedure。",
          hints: ["答案應包含 Network、action、Response 欄位與各層呼叫鏈。"],
          explanation: "呼叫鏈識別字能跨層追蹤，比只搜尋畫面中文可靠。"
        }
      ]
    },
    {
      groupId: "B",
      category: "設定與期限",
      title: "扣除例假日的設定與公式",
      variants: [
        {
          type: "choice",
          difficulty: "Easy",
          title: "例假日是否計入期限",
          prompt: "若事後申請期限要扣除六日，DayOff.OverdueContainHoliday 應設為哪個值？",
          options: ["-1", "0", "1", "20|5"],
          answer: 1,
          hints: ["-1 代表含假日，會使用純日曆天。"],
          explanation: "0 代表扣假日；-1 代表含假日。"
        },
        {
          type: "fill",
          difficulty: "Medium",
          title: "期限公式",
          prompt: "完成公式：日曆天差 − ________ > After 時，會回傳期限錯誤。",
          placeholder: "輸入缺少的計算項目",
          answers: ["SP 撈到的例假日筆數", "例假日筆數", "假日數", "Rows.Count", "db.GetDataTable.Rows.Count"],
          caseSensitive: false,
          hints: ["這個值來自 HumanlyUtility_5 的資料列數。"],
          explanation: "扣假日分支會以日曆天差減去 SP 回傳的假日筆數。"
        },
        {
          type: "boolean",
          difficulty: "Easy",
          title: "設定值 -1 的語意",
          prompt: "DayOff.OverdueContainHoliday = -1 代表扣除六日與國定假日。",
          answer: false,
          hints: ["-1 是較嚴格的純日曆天算法。"],
          explanation: "-1 代表含假日；要扣除假日應設為 0。"
        },
        {
          type: "concept",
          difficulty: "Medium",
          title: "說明週五到週一案例",
          prompt: "請說明期限 1 日且扣假日時，為什麼週五漏刷應能在週一補登。",
          placeholder: "用公式與日期說明…",
          keywords: [["週五"], ["週一"], ["六日", "週末", "例假日"], ["扣除", "不計"], ["1 日", "一天", "After"]],
          modelAnswer: "週五到週一的日曆天差會扣除六、日兩個例假日，剩餘工作日差為 1，沒有大於 After=1，因此週一仍可補登。",
          hints: ["把六、日從日曆天差中扣掉，再與 After=1 比較。"],
          explanation: "判斷條件是結果大於 After 才逾期，不是大於等於。"
        }
      ]
    },
    {
      groupId: "C",
      category: "Flag 與回傳",
      title: "Flag 如何變成畫面錯誤",
      variants: [
        {
          type: "choice",
          difficulty: "Easy",
          title: "事後期限錯誤 Flag",
          prompt: "RangeCheck_9.Check() 中，哪個 Flag 代表事後申請期限錯誤？",
          options: ["Flag 1", "Flag 9", "Flag 10", "Flag 11"],
          answer: 2,
          hints: ["Flag 9 是事前期限錯誤。"],
          explanation: "事後期限判斷失敗時設定 result.Flag = 10。"
        },
        {
          type: "fill",
          difficulty: "Easy",
          title: "填寫期限錯誤 Flag",
          prompt: "「事後申請期限錯誤」對應的 Flag 是 ________。",
          placeholder: "輸入數字",
          answers: ["10", "Flag 10"],
          caseSensitive: false,
          hints: ["它緊接在扣假日公式後。"],
          explanation: "Flag 10 最後由 get_Message 轉成中文錯誤。"
        },
        {
          type: "boolean",
          difficulty: "Medium",
          title: "API 成功與規則通過",
          prompt: "APIResult 的 CODE = Success，代表漏刷卡期限檢查一定通過。",
          answer: false,
          hints: ["傳輸層狀態與 Data.Pass 是不同層次。"],
          explanation: "CODE 只代表 API 呼叫成功；規則結果在 Data.Pass 與 Data.CheckInfo。"
        },
        {
          type: "concept",
          difficulty: "Hard",
          title: "Flag 到畫面訊息的旅程",
          prompt: "請說明 Flag 10 如何一路成為瀏覽器上的「事後申請期限錯誤」。",
          placeholder: "描述資料回傳路徑…",
          keywords: [["Flag 10", "Flag=10"], ["get_Message", "翻譯"], ["CheckInfo"], ["Service"], ["API", "JSON"], ["瀏覽器", "畫面"]],
          modelAnswer: "RangeCheck_9 回傳 Flag 10，Service 透過 get_Message 轉成 CheckInfo，再經 API、Web JSON 回到瀏覽器顯示。",
          hints: ["從 RangeCheck_9、Service、API、Web、瀏覽器依序描述。"],
          explanation: "錯誤中文在靠近回傳端才產生，因此程式核心常看不到中文字串。"
        }
      ]
    },
    {
      groupId: "D",
      category: "根因",
      title: "item=0 遺漏",
      variants: [
        {
          type: "choice",
          difficulty: "Medium",
          title: "真正的根因",
          prompt: "設定為 0、正式機也有六日資料，週五仍不能在週一補登。根因是什麼？",
          options: ["RagneChange 拼字錯誤", "humva_after 應設為 -1", "HumanlyUtility_5 非排班分支漏讀 item=0", "登入者不能替別人申請"],
          answer: 2,
          hints: ["正式機六日資料存在，而且類別都是 item=0。"],
          explanation: "SP 只讀 item=1/2，導致共通假日沒有被扣除。"
        },
        {
          type: "fill",
          difficulty: "Easy",
          title: "共通假日的 item 值",
          prompt: "行事曆匯入的全機關共通假日，hum_holiday.humho_item 值為 ________。",
          placeholder: "輸入數字",
          answers: ["0", "item=0", "item = 0"],
          caseSensitive: false,
          hints: ["它不需要比對 postid 或 dn。"],
          explanation: "六日與國定假日以 item=0 表示全機關共通。"
        },
        {
          type: "boolean",
          difficulty: "Medium",
          title: "item=0 的適用範圍",
          prompt: "hum_holiday.humho_item = 0 代表全機關共通假日，不需要再比對 postid 或 dn。",
          answer: true,
          hints: ["這是行事曆匯入的假日類別。"],
          explanation: "item=0 本身就代表所有人適用。"
        },
        {
          type: "concept",
          difficulty: "Hard",
          title: "用證據證明根因",
          prompt: "請用設定、正式機資料與 SP 行為三方面，說明為何根因是漏讀 item=0。",
          placeholder: "分別列出三類證據…",
          keywords: [["設定 0", "OverdueContainHoliday=0"], ["hum_holiday", "正式機資料"], ["item=0", "item = 0"], ["SP", "HumanlyUtility_5"], ["item=1/2", "漏讀"], ["Rows.Count", "假日數 0"]],
          modelAnswer: "設定已是 0，正式機 hum_holiday 也存在 item=0 的六日資料；但 HumanlyUtility_5 非排班分支只讀 item=1/2，使 Rows.Count 沒算到假日，因此可證明是 SP 漏讀 item=0。",
          hints: ["不要只說結論，要包含設定、資料與程式三種證據。"],
          explanation: "設定正確、資料存在、查詢漏讀，三者能排除設定與資料問題。"
        }
      ]
    },
    {
      groupId: "E",
      category: "SQL 修正",
      title: "最小風險 SP 修正",
      variants: [
        {
          type: "choice",
          difficulty: "Medium",
          title: "最低風險的修正",
          prompt: "下列哪個修正最符合對症、最小風險原則？",
          options: ["把所有 item=0 改寫成 item=1", "每年手動 INSERT 六日", "在非排班分支新增 item=0 查詢並以 UNION 合併", "一次重構所有客戶 SP"],
          answer: 2,
          hints: ["不要破壞既有資料語意，也不要擴大變更範圍。"],
          explanation: "只補漏讀的合法類別，保留既有查詢，是最小修正。"
        },
        {
          type: "fill",
          difficulty: "Easy",
          title: "避免重複扣日的集合運算",
          prompt: "新增 item=0 查詢時，應使用 ________ 而不是 UNION ALL，避免同一天重複計算。",
          placeholder: "輸入 SQL 關鍵字",
          answers: ["UNION"],
          caseSensitive: false,
          hints: ["需要集合去重功能。"],
          explanation: "UNION 會去除重複日期；UNION ALL 不會。"
        },
        {
          type: "boolean",
          difficulty: "Medium",
          title: "UNION 的風險控制",
          prompt: "使用 UNION 而不是 UNION ALL，可避免同一天符合多種假日來源時被重複扣除。",
          answer: true,
          hints: ["關鍵在集合去重。"],
          explanation: "UNION 可確保同一日期只被 Rows.Count 計算一次。"
        },
        {
          type: "concept",
          difficulty: "Hard",
          title: "說明修正為何風險最低",
          prompt: "請說明在非排班分支補 item=0 UNION，為何比改匯入資料或重構 SP 更安全。",
          placeholder: "從對症、一致性與回退風險說明…",
          keywords: [["item=0", "漏讀"], ["最小", "只新增"], ["UNION", "去重"], ["資料語意", "不改資料"], ["既有", "不動排班"], ["風險", "回滾"]],
          modelAnswer: "修正只補上原本漏讀的 item=0，使用 UNION 去重，不改既有資料語意、排班分支或其他查詢，因此變更小、容易驗證與回滾。",
          hints: ["答案可涵蓋不改資料、UNION 去重、保留既有分支。"],
          explanation: "最小修正能降低非預期影響，也最容易回滾。"
        }
      ]
    },
    {
      groupId: "F",
      category: "上線風險",
      title: "部署、驗證與回歸",
      variants: [
        {
          type: "choice",
          difficulty: "Hard",
          title: "回歸測試範圍",
          prompt: "HumanlyUtility_5 修正後，最合理的回歸測試範圍是？",
          options: ["只測週五到週一", "只測系統管理員", "涵蓋同 DB 所有共用此 SP 的差假，並區分排班／非排班", "不用測試"],
          answer: 2,
          hints: ["這支 SP 並非只服務漏刷卡。"],
          explanation: "同一 DB 內其他差假也可能共用此 SP。"
        },
        {
          type: "fill",
          difficulty: "Medium",
          title: "上線前最先確認的目標",
          prompt: "套用 ALTER PROCEDURE 前，必須先確認修改的 ________ 就是土測資料所在的位置。",
          placeholder: "輸入關鍵對象",
          answers: ["DB", "資料庫", "Database"],
          caseSensitive: false,
          hints: ["EIP1 與 eip2 的差異曾造成疑慮。"],
          explanation: "改錯 DB 會造成腳本成功但問題完全沒有修正。"
        },
        {
          type: "boolean",
          difficulty: "Medium",
          title: "只測漏刷卡是否足夠",
          prompt: "因本案源自漏刷卡，只驗證漏刷卡表單即可，不必回歸其他差假。",
          answer: false,
          hints: ["HumanlyUtility_5 是共用 SP。"],
          explanation: "同 DB 的其他差假事後期限也可能受影響，必須納入回歸。"
        },
        {
          type: "concept",
          difficulty: "Hard",
          title: "上線前的必要確認",
          prompt: "請列出這次 SP 修正上線前至少三項必要確認。",
          placeholder: "例如：確認…、備份…、測試…",
          keywords: [["DB", "資料庫", "EIP1", "eip2"], ["備份", "definition", "回滾"], ["UAT", "測試機"], ["真員工", "uid", "非排班"], ["週五", "週一", "週二"], ["回歸", "其他差假"]],
          modelAnswer: "確認目標 DB、備份既有 SP 並準備回滾、先在 UAT 套用、用真實非排班員工驗證週五到週一與週二案例，並回歸同 DB 其他差假。",
          hints: ["先避免改錯 DB，再考慮回滾與共用影響。"],
          explanation: "資料庫目標、可回滾性、代表性案例與共用範圍是主要風險。"
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
