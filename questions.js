window.DEFAULT_QUESTIONS = [
  {
    id: "issue-chain-01",
    type: "choice",
    category: "呼叫鏈",
    difficulty: "Easy",
    title: "第一個可靠的追查線索",
    prompt: "畫面只顯示「事後申請期限錯誤」，你要追到真正判斷邏輯。最有效的第一步是什麼？",
    options: [
      "全域搜尋錯誤中文",
      "F12 Network 重現操作，找請求名稱與 Response 欄位",
      "先重建整份行事曆",
      "直接修改 sysconfig 為 -1"
    ],
    answer: 1,
    hints: [
      "錯誤中文可能是 DB 訊息翻譯，未必存在程式碼中。",
      "先找出瀏覽器實際呼叫的 action，以及回傳錯誤的欄位名。"
    ],
    explanation: "從 Network 可拿到 RagneChange 與 CheckInfo，再沿 Web → API → Service → VB → SP 追蹤，比搜尋顯示文字可靠。"
  },
  {
    id: "issue-config-02",
    type: "choice",
    category: "設定",
    difficulty: "Easy",
    title: "例假日是否計入期限",
    prompt: "若事後申請期限要扣除六日，DayOff.OverdueContainHoliday 應設為哪個值？",
    options: ["-1", "0", "1", "20|5"],
    answer: 1,
    hints: ["-1 代表含假日，會使用純日曆天。"],
    explanation: "0 代表扣假日，以工作日概念計算；-1 則是含假日。"
  },
  {
    id: "issue-flag-03",
    type: "fill",
    category: "核心邏輯",
    difficulty: "Easy",
    title: "期限錯誤 Flag",
    prompt: "RangeCheck_9.Check() 中，「事後申請期限錯誤」對應的 Flag 是多少？",
    placeholder: "輸入數字",
    answers: ["10"],
    caseSensitive: false,
    hints: ["提前申請期限錯誤是 Flag 9。"],
    explanation: "事後期限判斷失敗時設定 result.Flag = 10，之後再由 get_Message(10) 轉成中文訊息。"
  },
  {
    id: "issue-web-04",
    type: "boolean",
    category: "呼叫鏈",
    difficulty: "Easy",
    title: "Web Controller 的責任",
    prompt: "Web 層的 FormLeakApplyController.RagneChange 會直接計算期限是否逾期。",
    answer: false,
    hints: ["觀察 ApiGetData(...) 的用途。"],
    explanation: "Web Controller 只接資料、補 siteid、轉發 API，再把結果以 JSON 回傳；真正邏輯在更下層。"
  },
  {
    id: "issue-formula-05",
    type: "fill",
    category: "核心邏輯",
    difficulty: "Medium",
    title: "期限公式",
    prompt: "完成公式：日曆天差 − ________ > After 時，會回傳 Flag 10。",
    placeholder: "輸入缺少的計算項目",
    answers: ["SP 撈到的例假日筆數", "例假日筆數", "假日數", "Rows.Count", "db.GetDataTable.Rows.Count"],
    caseSensitive: false,
    hints: ["這個值來自 HumanlyUtility_5 的回傳資料列數。"],
    explanation: "扣假日分支以日曆天差減去 SP 回傳的假日筆數，再與事後期限 After 比較。"
  },
  {
    id: "issue-root-06",
    type: "choice",
    category: "根因",
    difficulty: "Medium",
    title: "真正的根因",
    prompt: "設定已為 0、正式機也有六日資料，週五漏刷仍無法在週一補登。根因是什麼？",
    options: [
      "RagneChange 拼字錯誤，路由完全沒有執行",
      "hum_vacation.humva_after 應設為 -1",
      "HumanlyUtility_5 非排班分支漏讀 humho_item = 0",
      "登入者不能替別人申請"
    ],
    answer: 2,
    hints: [
      "正式機的六日與國定假資料都存在。",
      "行事曆匯入寫入的是 item=0。"
    ],
    explanation: "SP 只讀 item=1/2，漏了代表全機關共通假日的 item=0，導致 Rows.Count 為 0。"
  },
  {
    id: "issue-item-07",
    type: "boolean",
    category: "資料語意",
    difficulty: "Medium",
    title: "item=0 的適用範圍",
    prompt: "hum_holiday.humho_item = 0 代表全機關共通假日，不需要再比對 postid 或 dn。",
    answer: true,
    hints: ["它是行事曆匯入六日與國定假的類別。"],
    explanation: "item=0 本身即代表全機關適用，因此新增查詢只需限制日期範圍。"
  },
  {
    id: "issue-fix-08",
    type: "choice",
    category: "修正",
    difficulty: "Medium",
    title: "最低風險的修正",
    prompt: "下列哪個修正最符合對症、最小風險原則？",
    options: [
      "改行事曆匯入，將所有 item=0 改寫成 item=1",
      "每年手動 INSERT 六日資料",
      "在 SP 非排班分支新增 item=0 查詢並以 UNION 合併",
      "把所有客戶的 SP 一次重構成同一支"
    ],
    answer: 2,
    hints: ["不要破壞既有資料語意，也不要擴大本次變更範圍。"],
    explanation: "只補上漏讀的合法類別，並保留既有五段查詢與排班分支，是最小且可回滾的修正。"
  },
  {
    id: "issue-union-09",
    type: "boolean",
    category: "SQL",
    difficulty: "Medium",
    title: "UNION 的風險控制",
    prompt: "使用 UNION 而不是 UNION ALL，可避免同一天同時符合多種假日來源時被重複扣除。",
    answer: true,
    hints: ["關鍵在集合去重。"],
    explanation: "UNION 會去除重複日期，避免 Rows.Count 因同一日多筆來源而膨脹。"
  },
  {
    id: "issue-risk-10",
    type: "choice",
    category: "上線",
    difficulty: "Hard",
    title: "回歸測試範圍",
    prompt: "HumanlyUtility_5 修正後，最合理的回歸測試範圍是？",
    options: [
      "只測漏刷卡的週五到週一案例",
      "只測系統管理員帳號",
      "涵蓋同 DB 所有使用此 SP 的差假事後期限，並區分排班／非排班",
      "不用測試，因為 UNION 一定安全"
    ],
    answer: 2,
    hints: ["這支 SP 並非只服務漏刷卡。"],
    explanation: "同一 DB 內所有差假事後期限可能共用此 SP，且排班與非排班走不同分支。"
  },
  {
    id: "issue-concept-11",
    type: "concept",
    category: "方法論",
    difficulty: "Hard",
    title: "從畫面追到資料庫",
    prompt: "請用自己的話說明：為什麼追查這類 Issue 時，應沿著「呼叫鏈識別字」前進，而不是只搜尋畫面錯誤中文？",
    placeholder: "寫下你的追查思路…",
    keywords: [
      ["network", "f12", "請求"],
      ["action", "ragnechange", "呼叫鏈"],
      ["checkinfo", "response", "回傳欄位"],
      ["db", "資料庫", "翻譯", "get_message"]
    ],
    modelAnswer: "先用 F12 Network 重現並取得請求 action（RagneChange）與 Response 欄位（CheckInfo），再沿 Web、API、Service、VB、SP 逐層追蹤。錯誤中文可能由 DB 的 get_Message 翻譯產生，程式碼中未必存在，因此只搜中文容易走錯方向。",
    hints: [
      "答案可包含 Network、action 名、Response 欄位。",
      "再想想錯誤中文的來源為何不可靠。"
    ],
    explanation: "識別字能跨越每一層的呼叫邊界；畫面文案則可能直到最後才由資料庫翻譯出來。"
  },
  {
    id: "issue-concept-12",
    type: "concept",
    category: "風險控制",
    difficulty: "Hard",
    title: "上線前的三項必要確認",
    prompt: "請列出這次 SP 修正上線前至少三項必要確認。",
    placeholder: "例如：確認…、備份…、測試…",
    keywords: [
      ["db", "資料庫", "eip1", "eip2"],
      ["備份", "definition", "回滾"],
      ["uat", "測試機", "測試"],
      ["回歸", "其他差假", "影響範圍"],
      ["真員工", "uid", "非排班"]
    ],
    modelAnswer: "確認套用的 DB 就是土測資料所在 DB；備份既有 SP 定義並準備回滾；先在 UAT 套用；用真實非排班員工驗證週五到週一與週二案例；回歸同 DB 其他差假表單。",
    hints: [
      "先避免改錯資料庫。",
      "再考慮回滾能力與影響範圍。"
    ],
    explanation: "資料庫目標、可回滾性、代表性案例與共用範圍，是這次變更的主要風險。"
  }
];
