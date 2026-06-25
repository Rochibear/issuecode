// Built-in IssueCode question bank.
// Generated from Markdown with: node tools/generate-default-questions.mjs <question-bank-dir> questions.js
// Source files: 01-差假漏刷卡與事後期限.md, 02-加班與加班費.md, 03-申請單與赴陸.md, 04-車輛管理.md, 05-考核與語文能力.md, 06-補助津貼.md, 07-介接排班與召回.md

window.DEFAULT_QUESTIONS = [
  {
    "id": "OVERDUE-CONFIG-1",
    "groupId": "OVERDUE-CONFIG",
    "variantId": "OVERDUE-CONFIG-1",
    "groupTitle": {
      "zh": "事後期限扣不扣例假日的開關 DayOff.OverdueContainHoliday（-1含/0不含/假別清單；有快取；設定畫面會騙人）",
      "en": "OVERDUE-CONFIG"
    },
    "title": {
      "zh": "「事後申請期限要不要扣例假日」是由什麼控制？",
      "en": "What controls whether the post-application deadline excludes holidays?"
    },
    "type": "choice",
    "category": {
      "zh": "設定追查",
      "en": "Configuration tracing"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "差假／漏刷卡的「事後申請期限要不要扣掉例假日」，是由下列哪一項控制？",
      "en": "For leave/missed-punch records, what determines whether the post-application deadline excludes holidays?"
    },
    "hints": [
      {
        "zh": "它存在 sysconfig，用 keyname / varname 取出，且會被快取。",
        "en": "It lives in sysconfig, read by keyname/varname, and is cached."
      }
    ],
    "explanation": {
      "zh": "由單一設定 DayOff.OverdueContainHoliday 控制，存在 sysconfig 表（eipsc_keyname='DayOff'、eipsc_varname='OverdueContainHoliday'，值在 eipsc_varvalue），透過 Current.Application(\"DayOff.OverdueContainHoliday\", siteid) 讀取，且會被快取。",
      "en": "It is governed by the single setting DayOff.OverdueContainHoliday stored in sysconfig (eipsc_keyname='DayOff', eipsc_varname='OverdueContainHoliday', value in eipsc_varvalue), read via Current.Application(...) and cached."
    },
    "options": [
      {
        "zh": "sysconfig 表的單一設定 DayOff.OverdueContainHoliday",
        "en": "A single setting DayOff.OverdueContainHoliday in the sysconfig table"
      },
      {
        "zh": "各假別表單各自寫死的程式碼",
        "en": "Hard-coded logic in each leave form"
      },
      {
        "zh": "員工個人班表",
        "en": "The employee's personal shift schedule"
      },
      {
        "zh": "前端 JavaScript 參數",
        "en": "A frontend JavaScript parameter"
      }
    ],
    "answer": 0
  },
  {
    "id": "OVERDUE-CONFIG-2",
    "groupId": "OVERDUE-CONFIG",
    "variantId": "OVERDUE-CONFIG-2",
    "groupTitle": {
      "zh": "事後期限扣不扣例假日的開關 DayOff.OverdueContainHoliday（-1含/0不含/假別清單；有快取；設定畫面會騙人）",
      "en": "OVERDUE-CONFIG"
    },
    "title": {
      "zh": "OverdueContainHoliday 值為多少代表「所有差假都含例假日」？",
      "en": "Which value of OverdueContainHoliday means \"all leave types include holidays\"?"
    },
    "type": "fill",
    "category": {
      "zh": "設定追查",
      "en": "Configuration tracing"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "OverdueContainHoliday 設定值為 ________ 時，代表所有差假都「含」例假日（期限把週末也算進去，最嚴格）。",
      "en": "When OverdueContainHoliday is set to ________, all leave types \"include\" holidays (weekends are counted into the deadline — the strictest mode)."
    },
    "hints": [
      {
        "zh": "它也是 eipsc_default 的預設值。",
        "en": "It is also the eipsc_default value."
      }
    ],
    "explanation": {
      "zh": "-1＝所有差假含假日（最嚴）；0＝所有差假不含（跳過例假日）；一串用 | 隔開的假別 Vaid（如 2|5|9，其中 9＝漏刷卡）＝只有清單內的假別跳過例假日。",
      "en": "-1 = all leave types include holidays (strictest); 0 = all exclude (skip holidays); a |-separated list of leave Vaids (e.g. 2|5|9, where 9 = missed-punch) = only those listed types skip holidays."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "-1"
    ],
    "caseSensitive": false
  },
  {
    "id": "OVERDUE-CONFIG-3",
    "groupId": "OVERDUE-CONFIG",
    "variantId": "OVERDUE-CONFIG-3",
    "groupTitle": {
      "zh": "事後期限扣不扣例假日的開關 DayOff.OverdueContainHoliday（-1含/0不含/假別清單；有快取；設定畫面會騙人）",
      "en": "OVERDUE-CONFIG"
    },
    "title": {
      "zh": "設定畫面顯示 0 就代表資料庫存的也是 0 嗎？",
      "en": "Does the settings screen showing 0 guarantee the database stored 0?"
    },
    "type": "boolean",
    "category": {
      "zh": "根因判斷",
      "en": "Root-cause judgment"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "設定畫面顯示 OverdueContainHoliday=0，就一定代表 sysconfig 資料庫裡存的也是 0。",
      "en": "If the settings screen shows OverdueContainHoliday=0, the value stored in the sysconfig database must also be 0."
    },
    "hints": [
      {
        "zh": "2026-06 案件畫面顯示 0，但 DB 實際是 -1。",
        "en": "In the 2026-06 case the screen showed 0 but the DB actually held -1."
      }
    ],
    "explanation": {
      "zh": "設定畫面可能顯示「沒真的存進去」的值。該案件畫面顯示 0，但 sysconfig 實際是 -1（那個 0 從來沒存進去）。務必用 SQL 直接查 eipsc_varvalue，別相信畫面。",
      "en": "The settings screen may show a value that was never actually saved. In that case it showed 0 while sysconfig held -1. Always query eipsc_varvalue directly with SQL instead of trusting the screen."
    },
    "answer": false
  },
  {
    "id": "OVERDUE-CONFIG-4",
    "groupId": "OVERDUE-CONFIG",
    "variantId": "OVERDUE-CONFIG-4",
    "groupTitle": {
      "zh": "事後期限扣不扣例假日的開關 DayOff.OverdueContainHoliday（-1含/0不含/假別清單；有快取；設定畫面會騙人）",
      "en": "OVERDUE-CONFIG"
    },
    "title": {
      "zh": "請說明「週五漏刷、隔週一補申請卻被擋」如何用此設定排查？",
      "en": "Explain how to diagnose \"missed punch on Friday, blocked when re-applying the next Monday\" via this setting."
    },
    "type": "concept",
    "category": {
      "zh": "根因判斷",
      "en": "Root-cause judgment"
    },
    "difficulty": "senior",
    "prompt": {
      "zh": "請用自己的話說明：你會如何用 OverdueContainHoliday 設定，解釋並排查「週五漏刷卡、隔週一無法補申請」的案件。",
      "en": "In your own words, explain how you would use the OverdueContainHoliday setting to diagnose \"missed punch on Friday cannot be re-applied the following Monday.\""
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "OverdueContainHoliday",
        "sysconfig",
        "單一設定",
        "single setting"
      ],
      [
        "-1含",
        "0不含",
        "假別清單",
        "-1 includes",
        "0 excludes",
        "Vaid list"
      ],
      [
        "快取",
        "重載",
        "重啟AP",
        "cache",
        "reload",
        "restart AP"
      ],
      [
        "別信畫面",
        "SQL查eipsc_varvalue",
        "distrust screen",
        "query eipsc_varvalue"
      ],
      [
        "日曆天減例假日筆數",
        "大於期限才擋",
        "calendar days minus holiday count",
        "exceeds deadline then block"
      ]
    ],
    "modelAnswer": {
      "zh": "先用 SQL 直接查 sysconfig 的 eipsc_varvalue 確認真值，不要相信設定畫面。若是 -1，週末會被算進 1 天的期限，週五漏週一補＝日曆 3 天，3>1 被擋。要放行就改成 0 或含該假別 Vaid 的 | 清單；改完務必確認真的存了、且因為設定有快取要重載／重啟 AP 才生效。判斷數學是：扣假日分支用「(今天−漏刷日的日曆天)−期間例假日筆數 > 事後期限」才擋。",
      "en": "First query sysconfig.eipsc_varvalue directly with SQL to confirm the real value rather than trusting the screen. If it is -1, weekends count into the one-day deadline; Friday-missed re-applied Monday is 3 calendar days, 3>1 so it is blocked. To allow it, set 0 or a |-list containing that leave Vaid; after saving, verify it was actually stored and reload/restart the AP because the setting is cached. The math: the holiday-excluding branch blocks only when (today − missed-punch calendar days) − count of holidays in the span > deadline."
    }
  },
  {
    "id": "HOLIDAY-ITEM-1",
    "groupId": "HOLIDAY-ITEM",
    "variantId": "HOLIDAY-ITEM-1",
    "groupTitle": {
      "zh": "IsHoliday 與 HumanlyUtility_5/46 漏讀 humho_item=0（行事曆匯入寫的）→ 0 形同 -1",
      "en": "HOLIDAY-ITEM"
    },
    "title": {
      "zh": "為什麼「設成 0 並匯入行事曆」後，事後期限還是沒扣到例假日？",
      "en": "Why did the deadline still not exclude holidays even after setting 0 and importing the calendar?"
    },
    "type": "choice",
    "category": {
      "zh": "假日判斷邏輯",
      "en": "Holiday-detection logic"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "設定改成 0、也用「行事曆資料匯入」建好假日，但事後期限仍未扣例假日。最可能的根因是？",
      "en": "The setting was changed to 0 and holidays were created via \"calendar import,\" yet the deadline still did not exclude holidays. The most likely root cause is?"
    },
    "hints": [
      {
        "zh": "行事曆匯入寫的是哪一種 humho_item？扣假的 SP 讀得到嗎？",
        "en": "Which humho_item value does calendar import write, and can the deduction SP read it?"
      }
    ],
    "explanation": {
      "zh": "行事曆匯入（ImportCalendarService）寫的是 humho_item=0（全機關共通）。但扣假日的 SP HumanlyUtility_5（MOI）／_46（非 MOI）的非排班分支與 dbo.IsHoliday 只讀 item=1/2，漏了 item=0，所以匯入的六日／國定假看不到、扣不到，0 形同 -1。",
      "en": "Calendar import (ImportCalendarService) writes humho_item=0 (org-wide). But the deduction SPs HumanlyUtility_5 (MOI)/_46 (non-MOI) non-shift branch and dbo.IsHoliday only read item=1/2, missing item=0 — so imported weekends/national holidays are invisible and not deducted, making 0 behave like -1."
    },
    "options": [
      {
        "zh": "設定沒生效",
        "en": "The setting did not take effect"
      },
      {
        "zh": "前端沒重新整理",
        "en": "The frontend was not refreshed"
      },
      {
        "zh": "員工沒有班表",
        "en": "The employee has no shift schedule"
      },
      {
        "zh": "扣假日的 SP 與 IsHoliday 只讀 humho_item=1/2，漏讀匯入寫的 item=0",
        "en": "The deduction SP and IsHoliday only read humho_item=1/2 and miss item=0 written by import"
      }
    ],
    "answer": 3
  },
  {
    "id": "HOLIDAY-ITEM-2",
    "groupId": "HOLIDAY-ITEM",
    "variantId": "HOLIDAY-ITEM-2",
    "groupTitle": {
      "zh": "IsHoliday 與 HumanlyUtility_5/46 漏讀 humho_item=0（行事曆匯入寫的）→ 0 形同 -1",
      "en": "HOLIDAY-ITEM"
    },
    "title": {
      "zh": "行事曆匯入寫入 hum_holiday 的 humho_item 是哪個值？",
      "en": "Which humho_item value does calendar import write into hum_holiday?"
    },
    "type": "fill",
    "category": {
      "zh": "假日判斷邏輯",
      "en": "Holiday-detection logic"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "「行事曆資料匯入」寫入 hum_holiday 時，humho_item 的值是 ________（代表全機關共通、適用所有人）。",
      "en": "When \"calendar import\" writes to hum_holiday, humho_item is ________ (meaning org-wide, applies to everyone)."
    },
    "hints": [
      {
        "zh": "標準完整判斷是 item=0 OR (item=1 且 postid 符) OR (item=2 且 dn 符)。",
        "en": "The full standard check is item=0 OR (item=1 and postid matches) OR (item=2 and dn matches)."
      }
    ],
    "explanation": {
      "zh": "humho_item：0＝全機關共通（行事曆匯入／WebHR 年度行事曆寫的）；1＝全體或某職等（例假日設定手動建、舊種子）；2＝某單位／人員。標準完整判斷要把三種都算進去。",
      "en": "humho_item: 0 = org-wide (written by calendar import / WebHR annual calendar); 1 = all or a rank (manual holiday setup / legacy seed); 2 = a unit/person. The full standard check must include all three."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "0"
    ],
    "caseSensitive": false
  },
  {
    "id": "HOLIDAY-ITEM-3",
    "groupId": "HOLIDAY-ITEM",
    "variantId": "HOLIDAY-ITEM-3",
    "groupTitle": {
      "zh": "IsHoliday 與 HumanlyUtility_5/46 漏讀 humho_item=0（行事曆匯入寫的）→ 0 形同 -1",
      "en": "HOLIDAY-ITEM"
    },
    "title": {
      "zh": "全系統判斷某日是不是假日，都正確涵蓋 item=0 嗎？",
      "en": "Does every part of the system correctly include item=0 when checking if a day is a holiday?"
    },
    "type": "boolean",
    "category": {
      "zh": "假日判斷邏輯",
      "en": "Holiday-detection logic"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "系統各處判斷假日都採用完整判斷（含 item=0），所以一定都讀得到匯入的假日。",
      "en": "Every holiday check in the system uses the full rule (including item=0), so all of them can see imported holidays."
    },
    "hints": [
      {
        "zh": "班表／薪資等服務有讀 item=0，但 IsHoliday 與 HumanlyUtility_5/46 非排班分支沒有。",
        "en": "Shift/payroll services read item=0, but IsHoliday and the HumanlyUtility_5/46 non-shift branch do not."
      }
    ],
    "explanation": {
      "zh": "班表、個人行事曆、薪資等服務的確採完整判斷（含 item=0），但 dbo.IsHoliday 與差假事後期限扣假的 SP（HumanlyUtility_5/_46）的非排班分支只讀 item=1/2，這個不一致就是漏扣的真因。",
      "en": "Shift, personal calendar, and payroll services do use the full rule (including item=0), but dbo.IsHoliday and the leave-deadline deduction SPs (HumanlyUtility_5/_46) non-shift branch only read item=1/2 — this inconsistency is the real cause of the missing deduction."
    },
    "answer": false
  },
  {
    "id": "HOLIDAY-ITEM-4",
    "groupId": "HOLIDAY-ITEM",
    "variantId": "HOLIDAY-ITEM-4",
    "groupTitle": {
      "zh": "IsHoliday 與 HumanlyUtility_5/46 漏讀 humho_item=0（行事曆匯入寫的）→ 0 形同 -1",
      "en": "HOLIDAY-ITEM"
    },
    "title": {
      "zh": "請說明 item=0 漏讀問題的根因、影響範圍與治本方向。",
      "en": "Explain the root cause, blast radius, and proper fix for the item=0 omission."
    },
    "type": "concept",
    "category": {
      "zh": "假日判斷邏輯",
      "en": "Holiday-detection logic"
    },
    "difficulty": "senior",
    "prompt": {
      "zh": "請說明「IsHoliday／HumanlyUtility_5/46 漏讀 humho_item=0」的根因、會影響哪些功能，以及治本怎麼改、要注意什麼。",
      "en": "Explain the root cause of \"IsHoliday/HumanlyUtility_5/46 missing humho_item=0,\" which features it affects, the proper fix, and what to watch out for."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "humho_item=0",
        "行事曆匯入",
        "全機關共通",
        "calendar import",
        "org-wide"
      ],
      [
        "只讀item=1/2",
        "漏item=0",
        "only reads item=1/2",
        "misses item=0"
      ],
      [
        "非排班分支",
        "non-shift branch"
      ],
      [
        "補where humho_item=0 union",
        "add where humho_item=0 union"
      ],
      [
        "回歸測試",
        "IsHoliday影響廣",
        "加班時數",
        "regression test",
        "IsHoliday wide impact",
        "overtime"
      ]
    ],
    "modelAnswer": {
      "zh": "根因是行事曆匯入寫的假日為 item=0，但 IsHoliday 與 HumanlyUtility_5/46 的非排班分支只讀 item=1/2，看不到匯入的假日，導致非排班同仁的六日／國定假在事後期限不被扣，0 形同 -1。治本是在這些 SP 的非排班分支補上「where humho_item=0 and humho_date between …」的 UNION／判斷。要注意 HumanlyUtility_5 共用於所有差假、IsHoliday 用很廣（加班、時數），改完都要回歸測試。排班人員走另一條（讀 hum_wkrecord 的 classset<=0），不受此影響。",
      "en": "The root cause is that calendar import writes holidays as item=0, but IsHoliday and the HumanlyUtility_5/46 non-shift branch only read item=1/2, so imported holidays are invisible — non-shift staff's weekends/national holidays are not deducted from the deadline, making 0 behave like -1. The proper fix is to add a \"where humho_item=0 and humho_date between …\" UNION/condition to the non-shift branch of these SPs. Note HumanlyUtility_5 is shared by all leave types and IsHoliday is used very widely (overtime, hours), so both need regression testing. Shift staff use a different path (hum_wkrecord classset<=0) and are unaffected."
    }
  },
  {
    "id": "COMMONCLASS-VB-1",
    "groupId": "COMMONCLASS-VB",
    "variantId": "COMMONCLASS-VB-1",
    "groupTitle": {
      "zh": "RangeCheck 期限/例假邏輯在外部 VB 專案 CommonClassM，不在 C:\\flowing",
      "en": "COMMONCLASS-VB"
    },
    "title": {
      "zh": "差假／漏刷卡的 RangeCheck 期限與例假日邏輯放在哪裡？",
      "en": "Where does the RangeCheck deadline/holiday logic for leave/missed-punch live?"
    },
    "type": "choice",
    "category": {
      "zh": "程式碼定位",
      "en": "Code location"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "追查差假／漏刷卡事後期限與例假日邏輯時，核心 RangeCheck_* 程式碼實際在哪？",
      "en": "When investigating the leave/missed-punch deadline and holiday logic, where does the core RangeCheck_* code actually reside?"
    },
    "hints": [
      {
        "zh": "Flowing 是 C#，但這段是 VB，grep C:\\flowing 找不到。",
        "en": "Flowing is C#, but this code is VB — grepping C:\\flowing won't find it."
      }
    ],
    "explanation": {
      "zh": "EIP.CommonClass 對應 VB.NET 專案 CommonClass.vbproj，原始碼在 C:\\Code\\Project\\CommonClassM\\（在 C:\\flowing 之外）。期限／例假日／OverdueContainHoliday 的消費點在其 dayoff\\range\\RangeCheck_*.vb（如 RangeCheck_9.vb＝漏刷卡 type 9）。",
      "en": "EIP.CommonClass maps to the VB.NET project CommonClass.vbproj, source at C:\\Code\\Project\\CommonClassM\\ (outside C:\\flowing). The deadline/holiday/OverdueContainHoliday consumers live in dayoff\\range\\RangeCheck_*.vb (e.g. RangeCheck_9.vb = missed-punch type 9)."
    },
    "options": [
      {
        "zh": "C:\\flowing 的 C# 專案內",
        "en": "Inside the C# project at C:\\flowing"
      },
      {
        "zh": "外部 VB.NET 專案 CommonClass.vbproj（C:\\Code\\Project\\CommonClassM）",
        "en": "An external VB.NET project CommonClass.vbproj (C:\\Code\\Project\\CommonClassM)"
      },
      {
        "zh": "資料庫的 Stored Procedure",
        "en": "A database stored procedure"
      },
      {
        "zh": "前端 Vue 元件",
        "en": "A frontend Vue component"
      }
    ],
    "answer": 1
  },
  {
    "id": "COMMONCLASS-VB-2",
    "groupId": "COMMONCLASS-VB",
    "variantId": "COMMONCLASS-VB-2",
    "groupTitle": {
      "zh": "RangeCheck 期限/例假邏輯在外部 VB 專案 CommonClassM，不在 C:\\flowing",
      "en": "COMMONCLASS-VB"
    },
    "title": {
      "zh": "漏刷卡 type 9 對應的 RangeCheck 檔名是什麼？",
      "en": "What is the RangeCheck file name for missed-punch type 9?"
    },
    "type": "fill",
    "category": {
      "zh": "程式碼定位",
      "en": "Code location"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "漏刷卡（假別 type 9）的稽核邏輯放在 dayoff\\range\\ 底下的 ________.vb 檔。",
      "en": "The validation logic for missed-punch (leave type 9) is in dayoff\\range\\________.vb."
    },
    "hints": [
      {
        "zh": "命名規則是 RangeCheck_<假別type>.vb。",
        "en": "The naming convention is RangeCheck_<leaveType>.vb."
      }
    ],
    "explanation": {
      "zh": "每個假別一個檔，RangeCheck_9.vb＝漏刷卡 type 9，並繼承 RangeCheckParent / RangeCheckBase / RangeCheck 等基底類別。",
      "en": "One file per leave type; RangeCheck_9.vb = missed-punch type 9, inheriting bases RangeCheckParent / RangeCheckBase / RangeCheck."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "RangeCheck_9"
    ],
    "caseSensitive": false
  },
  {
    "id": "COMMONCLASS-VB-3",
    "groupId": "COMMONCLASS-VB",
    "variantId": "COMMONCLASS-VB-3",
    "groupTitle": {
      "zh": "RangeCheck 期限/例假邏輯在外部 VB 專案 CommonClassM，不在 C:\\flowing",
      "en": "COMMONCLASS-VB"
    },
    "title": {
      "zh": "只在 C:\\flowing（C# / .cs）裡 grep 就找得到這段邏輯嗎？",
      "en": "Can grepping only C:\\flowing (C#/.cs) find this logic?"
    },
    "type": "boolean",
    "category": {
      "zh": "程式碼定位",
      "en": "Code location"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "只要在 C:\\flowing 裡用 grep 搜尋 .cs 檔，就能找到差假期限與例假日的核心邏輯。",
      "en": "Grepping .cs files inside C:\\flowing is enough to find the core leave-deadline and holiday logic."
    },
    "hints": [
      {
        "zh": "那段是 VB，住在 repo 之外。",
        "en": "That code is VB and lives outside the repo."
      }
    ],
    "explanation": {
      "zh": "C:\\flowing 是 C# 專案，CommonClass 是 VB 且在 repo 外（C:\\Code\\Project\\CommonClassM）。只 grep C:\\flowing 或只看 .cs 會漏掉，要搜 C:\\Code\\Project\\CommonClassM\\**\\*.vb。C# 端只是呼叫 RangeCheckUtility.GetRangeCheck(...).Check()。",
      "en": "C:\\flowing is C#; CommonClass is VB and lives outside the repo (C:\\Code\\Project\\CommonClassM). Grepping only C:\\flowing or only .cs misses it — search C:\\Code\\Project\\CommonClassM\\**\\*.vb. The C# side merely calls RangeCheckUtility.GetRangeCheck(...).Check()."
    },
    "answer": false
  },
  {
    "id": "COMMONCLASS-VB-4",
    "groupId": "COMMONCLASS-VB",
    "variantId": "COMMONCLASS-VB-4",
    "groupTitle": {
      "zh": "RangeCheck 期限/例假邏輯在外部 VB 專案 CommonClassM，不在 C:\\flowing",
      "en": "COMMONCLASS-VB"
    },
    "title": {
      "zh": "請說明追查此類問題時，跨專案的搜尋與閱讀策略。",
      "en": "Explain the cross-project search/read strategy for this kind of bug."
    },
    "type": "concept",
    "category": {
      "zh": "程式碼定位",
      "en": "Code location"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "遇到「差假／漏刷卡／期限／例假／range-check」類問題，請說明為何不能停在 C# 呼叫點，以及正確的搜尋與閱讀路徑。",
      "en": "For \"leave/missed-punch/deadline/holiday/range-check\" bugs, explain why you must not stop at the C# call site, and the correct path to search and read."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "C#呼叫RangeCheckUtility.Check",
        "C# calls RangeCheckUtility.Check"
      ],
      [
        "真正邏輯在VB",
        "real logic in VB"
      ],
      [
        "C:\\Code\\Project\\CommonClassM"
      ],
      [
        "grep flowing會漏",
        "搜.vb",
        "grepping flowing misses",
        "search .vb"
      ],
      [
        "RangeCheck_type.vb及基底類別",
        "RangeCheck_type.vb and base classes"
      ]
    ],
    "modelAnswer": {
      "zh": "C# 端（C:\\flowing）只是呼叫 RangeCheckUtility.GetRangeCheck(...).Check()，真正的期限與例假日判斷在外部 VB 專案 CommonClass.vbproj。它在 Flowing.sln 是 ProjectReference，原始碼在 C:\\Code\\Project\\CommonClassM。所以只 grep C:\\flowing 會漏，必須去搜 C:\\Code\\Project\\CommonClassM\\**\\*.vb，讀對應假別的 RangeCheck_<type>.vb 與其基底類別（RangeCheckParent/Base）。",
      "en": "The C# side (C:\\flowing) only calls RangeCheckUtility.GetRangeCheck(...).Check(); the real deadline/holiday logic is in the external VB project CommonClass.vbproj. It is a ProjectReference in Flowing.sln with source at C:\\Code\\Project\\CommonClassM. Grepping only C:\\flowing misses it — search C:\\Code\\Project\\CommonClassM\\**\\*.vb and read the matching RangeCheck_<type>.vb plus its base classes (RangeCheckParent/Base)."
    }
  },
  {
    "id": "LEAVE-181-1",
    "groupId": "LEAVE-181",
    "variantId": "LEAVE-181-1",
    "groupTitle": {
      "zh": "補登休假選國外卻記成國內（取錯資料）",
      "en": "LEAVE-181"
    },
    "title": {
      "zh": "#181 差假資料補登「休假選國外卻記成國內」的根因是什麼？",
      "en": "What was the root cause of #181 \"vacation marked overseas recorded as domestic\" in leave backfill?"
    },
    "type": "choice",
    "category": {
      "zh": "資料處理",
      "en": "Data handling"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#181 差假資料補登，補登休假選「國外」卻被記成「國內」。最符合的根因類型是？",
      "en": "In #181 leave backfill, choosing \"overseas\" vacation was recorded as \"domestic.\" Which root-cause type best fits?"
    },
    "hints": [
      {
        "zh": "修正描述就是「修正取錯資料的問題」。",
        "en": "The fix was described as \"fix reading the wrong data.\""
      }
    ],
    "explanation": {
      "zh": "該 issue 的修正是「修正取錯資料的問題」——補登休假時，國內／國外的判定取到了錯誤的來源，導致國外被記成國內。屬於資料取用來源錯誤的類型。",
      "en": "The fix was \"correct reading the wrong data\" — during backfill, the domestic/overseas determination read from the wrong source, so overseas was recorded as domestic. It is a wrong-data-source bug."
    },
    "options": [
      {
        "zh": "前端樣式問題",
        "en": "A frontend styling issue"
      },
      {
        "zh": "資料庫連線逾時",
        "en": "Database timeout"
      },
      {
        "zh": "程式取錯資料（取到錯的來源欄位／參數）",
        "en": "The code read the wrong data (wrong source field/parameter)"
      },
      {
        "zh": "權限不足",
        "en": "Insufficient permission"
      }
    ],
    "answer": 2
  },
  {
    "id": "LEAVE-181-2",
    "groupId": "LEAVE-181",
    "variantId": "LEAVE-181-2",
    "groupTitle": {
      "zh": "補登休假選國外卻記成國內（取錯資料）",
      "en": "LEAVE-181"
    },
    "title": {
      "zh": "#181 這類「值對不上」的 bug，最該優先比對什麼？",
      "en": "For #181-style \"value mismatch\" bugs, what should you compare first?"
    },
    "type": "fill",
    "category": {
      "zh": "資料處理",
      "en": "Data handling"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "遇到「選 A 卻存成 B」的 bug，最該先比對使用者選的值與程式實際取用的 ________ 是否一致。",
      "en": "For a \"chose A but saved B\" bug, first compare the user's selected value against the actual ________ the code reads."
    },
    "hints": [
      {
        "zh": "通常是取錯欄位或傳錯參數。",
        "en": "Usually it is reading the wrong field or passing the wrong parameter."
      }
    ],
    "explanation": {
      "zh": "「選 A 存成 B」最常見是程式讀取了錯誤的來源欄位／傳入錯誤參數，導致使用者選擇與寫入值脫鉤；先核對輸入值與寫入值的對應鏈。",
      "en": "\"Chose A, saved B\" usually means the code read the wrong source field or passed the wrong parameter, decoupling the user's choice from the stored value; first trace the mapping chain from input to stored value."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "來源欄位",
      "參數",
      "變數",
      "source field",
      "parameter",
      "variable"
    ],
    "caseSensitive": false
  },
  {
    "id": "LEAVE-181-3",
    "groupId": "LEAVE-181",
    "variantId": "LEAVE-181-3",
    "groupTitle": {
      "zh": "補登休假選國外卻記成國內（取錯資料）",
      "en": "LEAVE-181"
    },
    "title": {
      "zh": "國內／國外記錯一定是資料庫存錯造成的嗎？",
      "en": "Is a domestic/overseas mix-up necessarily caused by bad stored data?"
    },
    "type": "boolean",
    "category": {
      "zh": "根因判斷",
      "en": "Root-cause judgment"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "補登休假國外被記成國內，一定是資料庫裡原本就存錯了。",
      "en": "Overseas vacation recorded as domestic during backfill must mean the data was already stored wrong in the database."
    },
    "hints": [
      {
        "zh": "#181 是程式補登當下取錯資料，不是 DB 原始資料壞掉。",
        "en": "#181 was the backfill code reading the wrong data, not corrupted source data."
      }
    ],
    "explanation": {
      "zh": "不一定。#181 的根因是補登程式取錯來源資料，是處理邏輯造成的錯誤寫入，而非資料庫原本就壞。要區分「來源資料錯」與「處理過程取錯」。",
      "en": "Not necessarily. #181's cause was the backfill code reading the wrong source — a processing error in what gets written, not pre-corrupted data. Distinguish \"bad source data\" from \"wrong read during processing.\""
    },
    "answer": false
  },
  {
    "id": "LEAVE-181-4",
    "groupId": "LEAVE-181",
    "variantId": "LEAVE-181-4",
    "groupTitle": {
      "zh": "補登休假選國外卻記成國內（取錯資料）",
      "en": "LEAVE-181"
    },
    "title": {
      "zh": "請說明你會如何追「選國外卻記國內」這個補登 bug。",
      "en": "Explain how you would trace the \"overseas recorded as domestic\" backfill bug."
    },
    "type": "concept",
    "category": {
      "zh": "資料處理",
      "en": "Data handling"
    },
    "difficulty": "senior",
    "prompt": {
      "zh": "請用自己的話說明：你會如何從「使用者選國外卻記成國內」追到根因並驗證修正。",
      "en": "In your own words, explain how you would trace from \"user chose overseas but it was recorded as domestic\" to the root cause and verify the fix."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "重現",
        "固定測試資料",
        "reproduce",
        "fixed test data"
      ],
      [
        "比對輸入值與寫入值",
        "compare input vs stored value"
      ],
      [
        "找國內外判定取用的欄位/參數",
        "find field/param for domestic-overseas"
      ],
      [
        "取錯來源",
        "wrong source"
      ],
      [
        "修正後回歸",
        "前後比對",
        "regression",
        "before-after compare"
      ]
    ],
    "modelAnswer": {
      "zh": "先用固定測試資料重現，記下使用者選的值與最後寫入 DB 的值。接著沿補登流程比對「國內／國外」是由哪個欄位或參數決定，找出程式取錯來源的那一行（#181 即取錯資料）。修正取用來源後，用同一筆測試資料重跑，確認選國外就記國外、且不影響國內案例，最後做回歸。",
      "en": "First reproduce with fixed test data, noting the user's chosen value versus what was written to the DB. Then trace the backfill flow to find which field/parameter decides domestic vs overseas, locating the line that reads the wrong source (#181 read wrong data). After fixing the source, rerun with the same test data to confirm overseas stays overseas and domestic cases are unaffected, then regression-test."
    }
  },
  {
    "id": "OT-116-1",
    "groupId": "OT-116",
    "variantId": "OT-116-1",
    "groupTitle": {
      "zh": "一般加班每月申請時數上限稽核失效（程式寫死規則）",
      "en": "OT-116"
    },
    "title": {
      "zh": "#116 申請一般加班「每月申請時數上限稽核失效」的根因？",
      "en": "Root cause of #116 \"monthly overtime cap check failing\" for general overtime?"
    },
    "type": "choice",
    "category": {
      "zh": "計算邏輯",
      "en": "Calculation logic"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#116 申請一般加班時，每月申請時數上限的稽核失效。最符合的根因是？",
      "en": "In #116, the monthly overtime-cap check failed for general overtime. Which root cause fits best?"
    },
    "hints": [
      {
        "zh": "修正描述是「修復程式寫死加班規則的 bug」。",
        "en": "The fix was \"fix the bug of hard-coded overtime rules.\""
      }
    ],
    "explanation": {
      "zh": "根因是程式把加班規則寫死，導致一般加班沒有正確套用每月申請時數上限的稽核；修正即移除寫死邏輯、改為依實際加班類別計算上限。",
      "en": "The cause was hard-coded overtime rules, so the monthly application-hour cap was not correctly applied to general overtime; the fix removed the hard-coding and computed the cap by the actual overtime type."
    },
    "options": [
      {
        "zh": "程式把加班規則寫死，沒按實際加班類別套用",
        "en": "The code hard-coded overtime rules instead of applying the actual overtime type"
      },
      {
        "zh": "資料庫沒存上限",
        "en": "The cap was not stored in DB"
      },
      {
        "zh": "前端沒送出表單",
        "en": "The frontend did not submit"
      },
      {
        "zh": "使用者權限不足",
        "en": "Insufficient user permission"
      }
    ],
    "answer": 0
  },
  {
    "id": "OT-116-2",
    "groupId": "OT-116",
    "variantId": "OT-116-2",
    "groupTitle": {
      "zh": "一般加班每月申請時數上限稽核失效（程式寫死規則）",
      "en": "OT-116"
    },
    "title": {
      "zh": "#116 這類「規則該由資料決定卻寫死」的反模式叫什麼？",
      "en": "What anti-pattern is \"rules that should be data-driven but are hard-coded,\" as in #116?"
    },
    "type": "fill",
    "category": {
      "zh": "計算邏輯",
      "en": "Calculation logic"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "把本應依資料／類別決定的規則直接寫進程式碼，導致換情境就失效，這種反模式常稱為把規則 ________。",
      "en": "Embedding rules that should depend on data/type directly in code (so they break in other scenarios) is the anti-pattern of ________ the rules."
    },
    "hints": [
      {
        "zh": "中文常講「寫死」。",
        "en": "In Chinese it's often called \"寫死\" (write-dead)."
      }
    ],
    "explanation": {
      "zh": "「寫死／hard-code」指把該由設定或資料決定的值或規則固定在程式碼中。#116 即因規則寫死，使一般加班的上限稽核失效。",
      "en": "\"Hard-coding\" means fixing values/rules in code that should come from configuration or data. #116's cap check failed because the rule was hard-coded."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "寫死",
      "hard code",
      "hardcode",
      "硬編碼",
      "hard-coding"
    ],
    "caseSensitive": false
  },
  {
    "id": "OT-116-3",
    "groupId": "OT-116",
    "variantId": "OT-116-3",
    "groupTitle": {
      "zh": "一般加班每月申請時數上限稽核失效（程式寫死規則）",
      "en": "OT-116"
    },
    "title": {
      "zh": "上限稽核失效一定代表資料庫沒設定上限嗎？",
      "en": "Does a failing cap check necessarily mean the cap is missing from the database?"
    },
    "type": "boolean",
    "category": {
      "zh": "根因判斷",
      "en": "Root-cause judgment"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "每月加班時數上限稽核失效，一定是因為資料庫沒有設定上限值。",
      "en": "A failing monthly overtime-cap check must be because the cap value is missing from the database."
    },
    "hints": [
      {
        "zh": "#116 是程式寫死規則，不是缺資料。",
        "en": "#116 was hard-coded rules, not missing data."
      }
    ],
    "explanation": {
      "zh": "不一定。#116 的上限值存在，但程式寫死規則沒去套用，導致稽核形同失效。失效可能來自規則套用邏輯，而非缺少資料。",
      "en": "Not necessarily. In #116 the cap existed, but hard-coded rules failed to apply it, so the check was effectively bypassed. Failure can stem from rule-application logic, not missing data."
    },
    "answer": false
  },
  {
    "id": "OT-116-4",
    "groupId": "OT-116",
    "variantId": "OT-116-4",
    "groupTitle": {
      "zh": "一般加班每月申請時數上限稽核失效（程式寫死規則）",
      "en": "OT-116"
    },
    "title": {
      "zh": "請說明你會如何驗證「每月加班上限稽核」確實生效。",
      "en": "Explain how you would verify the monthly overtime-cap check actually works."
    },
    "type": "concept",
    "category": {
      "zh": "計算邏輯",
      "en": "Calculation logic"
    },
    "difficulty": "senior",
    "prompt": {
      "zh": "修好 #116 後，請說明你會用哪些測試情境驗證每月加班申請時數上限稽核確實生效。",
      "en": "After fixing #116, explain the test scenarios you would use to verify the monthly overtime-application cap check works."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "邊界值",
        "剛好上限",
        "超過上限",
        "boundary",
        "exactly at cap",
        "over cap"
      ],
      [
        "不同加班類別",
        "一般/專案",
        "overtime types",
        "general/project"
      ],
      [
        "累計當月已申請時數",
        "accumulate month-to-date hours"
      ],
      [
        "不能寫死",
        "依資料/類別",
        "not hard-coded",
        "data/type driven"
      ],
      [
        "回歸",
        "既有案例不受影響",
        "regression",
        "existing cases unaffected"
      ]
    ],
    "modelAnswer": {
      "zh": "用邊界值測：當月累計剛好到上限、差一小時、超過上限各一筆，確認剛好到不擋、超過要擋。再用不同加班類別（一般／專案）驗證規則是依類別而非寫死。最後跑回歸確認原本可申請的案例不被誤擋。",
      "en": "Use boundary cases: month-to-date exactly at the cap, one hour short, and over the cap — confirm at-cap passes and over-cap is blocked. Test different overtime types (general/project) to confirm rules are type-driven, not hard-coded. Finally regression-test that previously valid applications are not wrongly blocked."
    }
  },
  {
    "id": "OT-94-1",
    "groupId": "OT-94",
    "variantId": "OT-94-1",
    "groupTitle": {
      "zh": "GetMemberWkrecords 例外錯誤 + 判斷邏輯寫反",
      "en": "OT-94"
    },
    "title": {
      "zh": "#94 GetMemberWkrecords 的問題本質是什麼？",
      "en": "What was the essence of the #94 GetMemberWkrecords problem?"
    },
    "type": "choice",
    "category": {
      "zh": "例外處理",
      "en": "Exception handling"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#94 修正 GetMemberWkrecords，主要修了兩件事，下列哪一組最符合？",
      "en": "#94 fixed GetMemberWkrecords for mainly two things — which pair fits best?"
    },
    "hints": [
      {
        "zh": "commit 寫「例外錯誤與邏輯寫反」。",
        "en": "The commit says \"exception error and inverted logic.\""
      }
    ],
    "explanation": {
      "zh": "#94 同時修了 GetMemberWkrecords 的例外錯誤，以及一段判斷邏輯寫反（條件 true/false 顛倒）的 bug。",
      "en": "#94 fixed both an exception error in GetMemberWkrecords and an inverted condition (true/false reversed)."
    },
    "options": [
      {
        "zh": "改 UI 樣式與翻譯",
        "en": "UI styling and i18n"
      },
      {
        "zh": "例外錯誤處理 + 判斷邏輯寫反",
        "en": "Exception handling + inverted condition logic"
      },
      {
        "zh": "新增欄位與索引",
        "en": "New column and index"
      },
      {
        "zh": "權限與登入",
        "en": "Permission and login"
      }
    ],
    "answer": 1
  },
  {
    "id": "OT-94-2",
    "groupId": "OT-94",
    "variantId": "OT-94-2",
    "groupTitle": {
      "zh": "GetMemberWkrecords 例外錯誤 + 判斷邏輯寫反",
      "en": "OT-94"
    },
    "title": {
      "zh": "「邏輯寫反」最典型是哪種錯誤？",
      "en": "\"Inverted logic\" most typically is which kind of mistake?"
    },
    "type": "fill",
    "category": {
      "zh": "例外處理",
      "en": "Exception handling"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "「邏輯寫反」最典型就是把判斷條件的 ________ 弄反（例如該用 > 卻用 <，或漏了 !）。",
      "en": "\"Inverted logic\" most typically means reversing the condition's ________ (e.g. using < instead of >, or missing a !)."
    },
    "hints": [
      {
        "zh": "想成條件的 true / false 對調。",
        "en": "Think of the condition's true/false being swapped."
      }
    ],
    "explanation": {
      "zh": "邏輯寫反指判斷結果的真假被顛倒，常見於比較運算子方向錯、漏寫否定（!）、或 AND/OR 用錯，使本該成立的分支走進相反路徑。",
      "en": "Inverted logic means the condition's truth value is reversed — wrong comparison direction, a missing negation (!), or AND/OR misused — so a branch that should hold takes the opposite path."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "真假",
      "true/false",
      "條件",
      "布林結果",
      "truth value",
      "condition",
      "boolean"
    ],
    "caseSensitive": false
  },
  {
    "id": "OT-94-3",
    "groupId": "OT-94",
    "variantId": "OT-94-3",
    "groupTitle": {
      "zh": "GetMemberWkrecords 例外錯誤 + 判斷邏輯寫反",
      "en": "OT-94"
    },
    "title": {
      "zh": "例外被吞掉時，回傳空資料一定比拋例外好嗎？",
      "en": "When an exception is swallowed, is returning empty data always better than throwing?"
    },
    "type": "boolean",
    "category": {
      "zh": "例外處理",
      "en": "Exception handling"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "為了避免畫面壞掉，把例外吞掉並回傳空資料，永遠是比較好的做法。",
      "en": "To avoid breaking the screen, swallowing the exception and returning empty data is always the better approach."
    },
    "hints": [
      {
        "zh": "吞例外會讓錯誤被掩蓋、難以追查。",
        "en": "Swallowing hides errors and makes them hard to trace."
      }
    ],
    "explanation": {
      "zh": "不對。吞例外回傳空資料會掩蓋真正錯誤，使用者看到「沒資料」卻不知出錯，追查更難。應記錄例外、回報或以可控方式處理，而非無聲吞掉。",
      "en": "No. Swallowing and returning empty data hides the real error; users see \"no data\" without knowing it failed, making tracing harder. Log the exception and surface/handle it controllably rather than silently swallowing."
    },
    "answer": false
  },
  {
    "id": "OT-94-4",
    "groupId": "OT-94",
    "variantId": "OT-94-4",
    "groupTitle": {
      "zh": "GetMemberWkrecords 例外錯誤 + 判斷邏輯寫反",
      "en": "OT-94"
    },
    "title": {
      "zh": "請說明「邏輯寫反」這類 bug 為何難發現、如何防範。",
      "en": "Explain why \"inverted logic\" bugs are hard to catch and how to prevent them."
    },
    "type": "concept",
    "category": {
      "zh": "例外處理",
      "en": "Exception handling"
    },
    "difficulty": "senior",
    "prompt": {
      "zh": "請說明像 #94「判斷邏輯寫反」這類 bug 為什麼常常上線才被發現，以及你會用什麼方式預防。",
      "en": "Explain why \"inverted condition\" bugs like #94 often surface only in production, and how you would prevent them."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "正常路徑也會過",
        "只在特定條件錯",
        "happy path still passes",
        "only fails on specific input"
      ],
      [
        "缺邊界/反例測試",
        "missing boundary/negative tests"
      ],
      [
        "單元測試涵蓋true和false",
        "unit tests cover both true and false"
      ],
      [
        "code review",
        "命名清楚",
        "clear naming"
      ],
      [
        "例外不要靜默吞掉",
        "don't silently swallow exceptions"
      ]
    ],
    "modelAnswer": {
      "zh": "邏輯寫反在正常路徑常常照樣通過，只有在特定條件才走錯分支，加上若例外又被靜默吞掉，畫面看起來正常只是資料怪，所以容易漏掉。預防方式：單元測試同時涵蓋條件成立與不成立兩種情形、補邊界與反例、條件命名清楚、code review 特別檢查比較方向與否定，並讓例外被記錄而非吞掉。",
      "en": "Inverted logic often still passes the happy path and only takes the wrong branch on specific inputs; if the exception is also silently swallowed, the screen looks fine but data is wrong, so it slips through. Prevention: unit tests covering both true and false cases, boundary and negative cases, clear condition naming, code review focused on comparison direction and negation, and logging exceptions instead of swallowing them."
    }
  },
  {
    "id": "OT-254-1",
    "groupId": "OT-254",
    "variantId": "OT-254-1",
    "groupTitle": {
      "zh": "單位加班費總表列印出現不該有的訂單（先讀再寫的競態條件，移入 DB 交易鎖）",
      "en": "OT-254"
    },
    "title": {
      "zh": "#254「列印出現選擇畫面沒有的訂單」屬於哪類問題？",
      "en": "#254 \"print shows an order not on the selection screen\" is which class of problem?"
    },
    "type": "choice",
    "category": {
      "zh": "競態條件",
      "en": "Race condition"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#254 單位加班費總表一般列印時，列印畫面出現選擇畫面沒有的訂單。根因屬於？",
      "en": "In #254, printing the unit overtime-pay summary showed an order absent from the selection screen. The cause is?"
    },
    "hints": [
      {
        "zh": "修正是把 ApplyNumber 訂單編號邏輯搬進 DB 交易鎖內。",
        "en": "The fix moved ApplyNumber order-number logic inside a DB transaction lock."
      }
    ],
    "explanation": {
      "zh": "根因是 ApplyNumber 訂單編號在沒有同步機制下先讀再寫，產生競態條件，造成兩次列印拿到非預期的訂單編號。修正是把編號邏輯移進 DB 交易鎖內，並讓 SP 回傳訂單編號。",
      "en": "The cause was generating the ApplyNumber by read-then-write without synchronization, a race condition that yielded an unexpected order number. The fix moved the numbering inside a DB transaction lock and had the SP return the order number."
    },
    "options": [
      {
        "zh": "前端快取",
        "en": "Frontend cache"
      },
      {
        "zh": "報表樣板損毀",
        "en": "Corrupted report template"
      },
      {
        "zh": "翻譯字串錯誤",
        "en": "Wrong translation string"
      },
      {
        "zh": "沒有同步機制下「先讀再寫」的競態條件",
        "en": "A \"read-then-write\" race condition without synchronization"
      }
    ],
    "answer": 3
  },
  {
    "id": "OT-254-2",
    "groupId": "OT-254",
    "variantId": "OT-254-2",
    "groupTitle": {
      "zh": "單位加班費總表列印出現不該有的訂單（先讀再寫的競態條件，移入 DB 交易鎖）",
      "en": "OT-254"
    },
    "title": {
      "zh": "#254 的修正把訂單編號邏輯移進什麼裡面？",
      "en": "#254's fix moved the order-numbering logic inside what?"
    },
    "type": "fill",
    "category": {
      "zh": "競態條件",
      "en": "Race condition"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#254 為避免競態條件，把 ApplyNumber 訂單編號邏輯移進 DB 的 ________ 內。",
      "en": "To avoid the race condition, #254 moved the ApplyNumber order-numbering logic inside the database ________."
    },
    "hints": [
      {
        "zh": "讓「讀＋寫」變成不可被打斷的原子操作。",
        "en": "Make the \"read + write\" an atomic, uninterruptible operation."
      }
    ],
    "explanation": {
      "zh": "把編號的讀與寫包進 DB 交易鎖內，使其成為原子操作，避免兩個請求同時先讀再寫拿到相同／錯誤編號。",
      "en": "Wrapping the read and write inside a DB transaction lock makes it atomic, preventing two concurrent requests from read-then-write to the same/wrong number."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "交易鎖",
      "transaction lock",
      "交易",
      "transaction"
    ],
    "caseSensitive": false
  },
  {
    "id": "OT-254-3",
    "groupId": "OT-254",
    "variantId": "OT-254-3",
    "groupTitle": {
      "zh": "單位加班費總表列印出現不該有的訂單（先讀再寫的競態條件，移入 DB 交易鎖）",
      "en": "OT-254"
    },
    "title": {
      "zh": "「先讀再寫」只要單機就不會有競態條件嗎？",
      "en": "Is \"read-then-write\" free of races as long as it's single-machine?"
    },
    "type": "boolean",
    "category": {
      "zh": "競態條件",
      "en": "Race condition"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "只要是同一台伺服器，「先讀再寫」就不會發生競態條件。",
      "en": "As long as it's the same server, \"read-then-write\" cannot cause a race condition."
    },
    "hints": [
      {
        "zh": "同機多執行緒／多請求並行就足以產生競態。",
        "en": "Concurrent threads/requests on one machine are enough to race."
      }
    ],
    "explanation": {
      "zh": "不對。即使同一台伺服器，多執行緒或多個並行請求同時「先讀再寫」就會競態。要靠交易鎖、唯一鍵或序列產生器等同步機制保證原子性。",
      "en": "No. Even on one server, multiple threads or concurrent requests doing read-then-write can race. You need synchronization — transaction locks, unique keys, or a sequence generator — to guarantee atomicity."
    },
    "answer": false
  },
  {
    "id": "OT-254-4",
    "groupId": "OT-254",
    "variantId": "OT-254-4",
    "groupTitle": {
      "zh": "單位加班費總表列印出現不該有的訂單（先讀再寫的競態條件，移入 DB 交易鎖）",
      "en": "OT-254"
    },
    "title": {
      "zh": "請說明「先讀再寫產生重複／錯誤編號」的成因與修法。",
      "en": "Explain the cause and fix for \"read-then-write producing duplicate/wrong numbers.\""
    },
    "type": "concept",
    "category": {
      "zh": "競態條件",
      "en": "Race condition"
    },
    "difficulty": "senior",
    "prompt": {
      "zh": "請用自己的話說明：為什麼「先讀目前最大編號再加一寫入」會出問題，以及有哪些修法。",
      "en": "In your own words, explain why \"read the current max number then write +1\" is problematic, and what fixes exist."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "兩請求同時讀到相同值",
        "two requests read same value"
      ],
      [
        "各自加一寫入",
        "重複或錯號",
        "each writes +1",
        "duplicate or wrong number"
      ],
      [
        "缺同步/原子性",
        "missing sync/atomicity"
      ],
      [
        "交易鎖",
        "序列",
        "唯一鍵",
        "SP回傳編號",
        "transaction lock",
        "sequence",
        "unique key",
        "SP returns number"
      ],
      [
        "改在DB內一次完成",
        "do it atomically in DB"
      ]
    ],
    "modelAnswer": {
      "zh": "因為兩個並行請求可能同時讀到相同的「目前最大編號」，各自加一後寫入，造成重複或拿到非預期編號，本質是缺少同步／原子性。修法包括：把讀＋寫放進 DB 交易鎖內成為原子操作（#254 做法），由 SP 直接回傳產生的編號；或改用資料庫序列、自動遞增、唯一鍵約束等機制，讓編號產生不再「先讀後寫」。",
      "en": "Two concurrent requests can read the same \"current max number,\" each add one and write, producing duplicates or unexpected numbers — fundamentally a lack of synchronization/atomicity. Fixes: wrap read+write in a DB transaction lock to make it atomic (#254's approach) and have the SP return the generated number; or use a database sequence, auto-increment, or unique-key constraint so numbering no longer relies on read-then-write."
    }
  },
  {
    "id": "OT-52-1",
    "groupId": "OT-52",
    "variantId": "OT-52-1",
    "groupTitle": {
      "zh": "個人勞基法加班費印領清冊倍率進位（費用優先往高倍率放、補休時數扣除）",
      "en": "OT-52"
    },
    "title": {
      "zh": "#52 個人勞基法加班費印領清冊「倍率進位問題」的調整原則？",
      "en": "What adjustment principle resolved #52's \"rate rounding problem\"?"
    },
    "type": "choice",
    "category": {
      "zh": "計算邏輯",
      "en": "Calculation logic"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#52 個人勞基法加班費印領清冊倍率進位問題，調整後費用的分配原則是？",
      "en": "In #52, after fixing the rate-rounding issue, how are amounts allocated?"
    },
    "hints": [
      {
        "zh": "commit：「費用的部份優先往高倍率的地方放」。",
        "en": "The commit: \"amounts go to the higher-rate buckets first.\""
      }
    ],
    "explanation": {
      "zh": "調整原則是費用優先往高倍率的地方放；同時修正倍率進位扣除補休時數的錯誤，使進位與補休扣除一致。",
      "en": "The principle is to allocate amounts to higher-rate buckets first, while also fixing the error in rounding that affected deducting comp-leave hours, keeping rounding and comp-leave deduction consistent."
    },
    "options": [
      {
        "zh": "平均分配到各倍率",
        "en": "Split evenly across rates"
      },
      {
        "zh": "全部歸到最低倍率",
        "en": "Put everything in the lowest rate"
      },
      {
        "zh": "費用優先往高倍率的地方放",
        "en": "Allocate amounts to the higher-rate buckets first"
      },
      {
        "zh": "隨機分配",
        "en": "Allocate randomly"
      }
    ],
    "answer": 2
  },
  {
    "id": "OT-52-2",
    "groupId": "OT-52",
    "variantId": "OT-52-2",
    "groupTitle": {
      "zh": "個人勞基法加班費印領清冊倍率進位（費用優先往高倍率放、補休時數扣除）",
      "en": "OT-52"
    },
    "title": {
      "zh": "#52 同時修正了倍率進位扣除什麼時數的錯誤？",
      "en": "#52 also fixed a rounding error in deducting which hours?"
    },
    "type": "fill",
    "category": {
      "zh": "計算邏輯",
      "en": "Calculation logic"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#52 除了倍率進位，也修正了倍率進位「扣除 ________ 時數」算錯的問題。",
      "en": "Besides rate rounding, #52 fixed an error in rounding when deducting ________ hours."
    },
    "hints": [
      {
        "zh": "加班可換成休假，那種時數。",
        "en": "The hours when overtime is converted to leave."
      }
    ],
    "explanation": {
      "zh": "補休時數＝加班改換休假的時數。#52 修正倍率進位時扣除補休時數算錯的問題，讓費用與補休扣除在進位上一致。",
      "en": "Comp-leave hours = overtime converted to leave. #52 fixed an error in deducting comp-leave hours during rate rounding so amounts and comp-leave deduction stay consistent under rounding."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "補休",
      "comp-leave",
      "compensatory leave"
    ],
    "caseSensitive": false
  },
  {
    "id": "OT-52-3",
    "groupId": "OT-52",
    "variantId": "OT-52-3",
    "groupTitle": {
      "zh": "個人勞基法加班費印領清冊倍率進位（費用優先往高倍率放、補休時數扣除）",
      "en": "OT-52"
    },
    "title": {
      "zh": "加班費倍率進位時，把費用優先放低倍率對員工較有利嗎？",
      "en": "When rounding overtime pay across rates, does allocating to the lowest rate first favor the employee?"
    },
    "type": "boolean",
    "category": {
      "zh": "計算邏輯",
      "en": "Calculation logic"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "加班費倍率進位時，把費用優先放到最低倍率，對員工比較有利。",
      "en": "When rounding overtime pay, allocating amounts to the lowest rate first is more favorable to the employee."
    },
    "hints": [
      {
        "zh": "#52 的原則正好相反，優先放高倍率。",
        "en": "#52's principle is the opposite — higher rate first."
      }
    ],
    "explanation": {
      "zh": "不對。倍率越高代表每小時加班費越高，#52 的原則是費用優先往高倍率放，這通常對員工較有利、也符合需求調整。",
      "en": "No. A higher rate means more pay per overtime hour; #52's principle allocates to higher rates first, generally more favorable and matching the requirement."
    },
    "answer": false
  },
  {
    "id": "OT-52-4",
    "groupId": "OT-52",
    "variantId": "OT-52-4",
    "groupTitle": {
      "zh": "個人勞基法加班費印領清冊倍率進位（費用優先往高倍率放、補休時數扣除）",
      "en": "OT-52"
    },
    "title": {
      "zh": "請說明加班費「倍率＋進位」計算容易出錯的點與驗證方式。",
      "en": "Explain the error-prone points of \"rate + rounding\" overtime-pay calculation and how to verify."
    },
    "type": "concept",
    "category": {
      "zh": "計算邏輯",
      "en": "Calculation logic"
    },
    "difficulty": "senior",
    "prompt": {
      "zh": "請說明加班費依倍率分段又要進位時，哪些地方容易算錯，以及你會怎麼驗證。",
      "en": "Explain where \"rate-tiered + rounding\" overtime-pay calculation tends to go wrong, and how you would verify it."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "進位時機",
        "先算後進或先進後算",
        "rounding timing",
        "round before or after"
      ],
      [
        "倍率分段順序",
        "高倍率優先",
        "rate tiering order",
        "higher rate first"
      ],
      [
        "補休時數同步扣除",
        "comp-leave hours deducted consistently"
      ],
      [
        "邊界",
        "剛好整除/有餘數",
        "boundary",
        "exact vs remainder"
      ],
      [
        "對表",
        "人工試算比對",
        "reconcile",
        "manual calc compare"
      ]
    ],
    "modelAnswer": {
      "zh": "容易出錯的點包括：進位時機（該先算總額再進位，還是各段先進位）、倍率分段的分配順序（#52 採高倍率優先）、以及補休時數要與費用用相同規則同步扣除，否則進位後對不上。驗證方式：用有餘數與剛好整除的邊界案例，人工試算各倍率金額與補休扣除後逐欄比對清冊，再回歸既有案例確認總額不變。",
      "en": "Error-prone points: rounding timing (round the total vs round each tier), the allocation order across rate tiers (#52 uses higher-rate-first), and deducting comp-leave hours by the same rule as the amounts so they reconcile after rounding. To verify: use boundary cases with and without remainders, hand-calculate each rate's amount and comp-leave deduction, compare column-by-column with the statement, then regression-test that totals are unchanged."
    }
  },
  {
    "id": "OT-96-1",
    "groupId": "OT-96",
    "variantId": "OT-96-1",
    "groupTitle": {
      "zh": "勞基法加班費差額進位（時薪不進位、最後才無條件進位）",
      "en": "OT-96"
    },
    "title": {
      "zh": "#96 勞基法加班費差額「補發金額」的進位處理原則？",
      "en": "#96's rounding principle for the \"back-pay difference\" of statutory overtime pay?"
    },
    "type": "choice",
    "category": {
      "zh": "計算邏輯",
      "en": "Calculation logic"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#96 勞基法加班費差額申請，補發金額的計算與進位原則是？",
      "en": "In #96 statutory overtime back-pay, how are the amount and rounding handled?"
    },
    "hints": [
      {
        "zh": "commit：時薪不進位直接算，計算後的補發金額最後才無條件進位。",
        "en": "The commit: hourly wage not rounded, final back-pay rounded up at the end."
      }
    ],
    "explanation": {
      "zh": "原則是時薪不做任何進位處理直接計算（參照勞基法加班費的算法），計算後得到的補發金額最後才做無條件進位，避免中間多次進位累積誤差。",
      "en": "The hourly wage is used without any rounding (following the statutory overtime method), and only the final computed back-pay is rounded up — avoiding accumulated error from rounding at intermediate steps."
    },
    "options": [
      {
        "zh": "時薪先無條件進位再計算",
        "en": "Round the hourly wage up first then compute"
      },
      {
        "zh": "時薪不做任何進位直接計算，最後補發金額才無條件進位",
        "en": "Compute with the hourly wage un-rounded, round up only the final back-pay"
      },
      {
        "zh": "每一步都四捨五入",
        "en": "Round at every step"
      },
      {
        "zh": "完全不進位",
        "en": "No rounding at all"
      }
    ],
    "answer": 1
  },
  {
    "id": "OT-96-2",
    "groupId": "OT-96",
    "variantId": "OT-96-2",
    "groupTitle": {
      "zh": "勞基法加班費差額進位（時薪不進位、最後才無條件進位）",
      "en": "OT-96"
    },
    "title": {
      "zh": "#96 補發金額最後採用哪一種進位法？",
      "en": "Which rounding method does #96 apply to the final back-pay?"
    },
    "type": "fill",
    "category": {
      "zh": "計算邏輯",
      "en": "Calculation logic"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#96 的補發金額在最後一步採用「________ 進位」（無條件進位到元）。",
      "en": "#96 applies \"________ rounding\" (round up to the dollar) to the final back-pay."
    },
    "hints": [
      {
        "zh": "不管小數多少都進位。",
        "en": "Always rounds up regardless of the decimal."
      }
    ],
    "explanation": {
      "zh": "無條件進位（ceiling）：不論小數部分多少都進位。#96 只在最後對補發金額做一次無條件進位，中間時薪不進位。",
      "en": "Round-up (ceiling): always rounds up regardless of the fraction. #96 applies it once to the final back-pay only, leaving the intermediate hourly wage un-rounded."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "無條件",
      "round-up",
      "ceiling"
    ],
    "caseSensitive": false
  },
  {
    "id": "OT-96-3",
    "groupId": "OT-96",
    "variantId": "OT-96-3",
    "groupTitle": {
      "zh": "勞基法加班費差額進位（時薪不進位、最後才無條件進位）",
      "en": "OT-96"
    },
    "title": {
      "zh": "每一步都進位，最後結果一定和「只在最後進位」相同嗎？",
      "en": "Does rounding at every step always equal rounding only at the end?"
    },
    "type": "boolean",
    "category": {
      "zh": "計算邏輯",
      "en": "Calculation logic"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "計算加班費差額時，每一步都進位和只在最後進位，結果一定相同。",
      "en": "When computing overtime back-pay, rounding at every step always yields the same result as rounding only at the end."
    },
    "hints": [
      {
        "zh": "中間多次進位會累積誤差。",
        "en": "Rounding repeatedly accumulates error."
      }
    ],
    "explanation": {
      "zh": "不同。每一步進位會累積多餘的進位誤差，使結果偏高；#96 因此規定時薪不進位、只在最後對補發金額無條件進位，確保金額正確。",
      "en": "Different. Rounding at each step accumulates extra rounding error, inflating the result; #96 therefore keeps the hourly wage un-rounded and rounds up only the final amount to keep it correct."
    },
    "answer": false
  },
  {
    "id": "OT-96-4",
    "groupId": "OT-96",
    "variantId": "OT-96-4",
    "groupTitle": {
      "zh": "勞基法加班費差額進位（時薪不進位、最後才無條件進位）",
      "en": "OT-96"
    },
    "title": {
      "zh": "請說明「進位時機」如何影響金額，以及正確做法。",
      "en": "Explain how \"rounding timing\" affects amounts, and the correct approach."
    },
    "type": "concept",
    "category": {
      "zh": "計算邏輯",
      "en": "Calculation logic"
    },
    "difficulty": "senior",
    "prompt": {
      "zh": "請說明在加班費／差額計算中，「進位的時機與次數」為什麼會影響最終金額，以及應遵循什麼原則。",
      "en": "Explain why the \"timing and number of roundings\" affects the final amount in overtime/back-pay calculation, and what principle to follow."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "中間進位累積誤差",
        "intermediate rounding accumulates error"
      ],
      [
        "時薪保留精度不進位",
        "keep hourly wage precise",
        "no rounding"
      ],
      [
        "最後一次進位",
        "round once at the end"
      ],
      [
        "法規/需求指定的進位法",
        "無條件進位",
        "rounding method per law/spec",
        "round-up"
      ],
      [
        "與既有清冊一致",
        "可驗算",
        "consistent with statements",
        "verifiable"
      ]
    ],
    "modelAnswer": {
      "zh": "因為每次進位都會把小數往上推，多步進位會累積誤差讓總額偏高，所以進位時機與次數會改變最終金額。正確原則是中間計算（如時薪）保留精度不進位，只在最後一次依法規／需求指定的進位法（#96 為無條件進位）對補發金額處理，這樣金額才正確且可驗算、與既有清冊一致。",
      "en": "Each rounding pushes the fraction up, so multiple roundings accumulate error and inflate the total — thus timing and count change the final amount. The correct principle: keep intermediate values (e.g. hourly wage) precise without rounding, and round only once at the end using the method required by law/spec (#96 uses round-up) on the back-pay, so the amount is correct, verifiable, and consistent with existing statements."
    }
  },
  {
    "id": "OT-176-1",
    "groupId": "OT-176",
    "variantId": "OT-176-1",
    "groupTitle": {
      "zh": "月加班時數稽核依「狀態＋加班日」取申請時數或核發時數",
      "en": "OT-176"
    },
    "title": {
      "zh": "#176 月加班時數稽核，核准的加班「加班日在昨天或之前」取哪個時數？",
      "en": "In #176, for an approved overtime whose date is yesterday or earlier, which hours are used?"
    },
    "type": "choice",
    "category": {
      "zh": "計算邏輯",
      "en": "Calculation logic"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#176 內政部客製月加班時數稽核：核准／補登核准／銷假中，當加班日為昨天或之前時，取哪一種時數？",
      "en": "In #176's customized monthly overtime check: for approved/backfilled-approved/leave-cancelling states, when the overtime date is yesterday or earlier, which hours are used?"
    },
    "hints": [
      {
        "zh": "加班日為今天或之後取申請時數；昨天或之前取核發時數。",
        "en": "Today or later uses applied hours; yesterday or earlier uses issued hours."
      }
    ],
    "explanation": {
      "zh": "#176 規則：申請中一律取申請時數；核准／補登核准／銷假中則看加班日——今天或之後取申請時數，昨天或之前取核發時數（理論上核准當下就算出核發時數）。",
      "en": "#176 rule: pending always uses applied hours; for approved/backfilled-approved/leave-cancelling, it depends on the overtime date — today or later uses applied hours, yesterday or earlier uses issued hours (issued hours are computed at approval)."
    },
    "options": [
      {
        "zh": "核發時數",
        "en": "Issued (granted) hours"
      },
      {
        "zh": "申請時數",
        "en": "Applied hours"
      },
      {
        "zh": "上限時數",
        "en": "Cap hours"
      },
      {
        "zh": "補休時數",
        "en": "Comp-leave hours"
      }
    ],
    "answer": 0
  },
  {
    "id": "OT-176-2",
    "groupId": "OT-176",
    "variantId": "OT-176-2",
    "groupTitle": {
      "zh": "月加班時數稽核依「狀態＋加班日」取申請時數或核發時數",
      "en": "OT-176"
    },
    "title": {
      "zh": "#176 規則中，「申請中」狀態一律取哪個時數？",
      "en": "Under #176, the \"pending\" state always uses which hours?"
    },
    "type": "fill",
    "category": {
      "zh": "計算邏輯",
      "en": "Calculation logic"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#176 月加班時數稽核中，狀態為「申請中」時一律取 ________ 時數。",
      "en": "In #176's monthly overtime check, the \"pending\" state always uses ________ hours."
    },
    "hints": [
      {
        "zh": "還沒核准，當然沒有核發時數。",
        "en": "Not approved yet, so there are no issued hours."
      }
    ],
    "explanation": {
      "zh": "申請中還沒核准、尚無核發時數，所以一律取申請時數；核發時數要核准當下才會計算出來。",
      "en": "Pending applications are not approved and have no issued hours, so applied hours are used; issued hours are computed only at approval."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "申請",
      "applied"
    ],
    "caseSensitive": false
  },
  {
    "id": "OT-176-3",
    "groupId": "OT-176",
    "variantId": "OT-176-3",
    "groupTitle": {
      "zh": "月加班時數稽核依「狀態＋加班日」取申請時數或核發時數",
      "en": "OT-176"
    },
    "title": {
      "zh": "月加班時數稽核對所有狀態都取同一種時數嗎？",
      "en": "Does the monthly overtime check use the same hours for all states?"
    },
    "type": "boolean",
    "category": {
      "zh": "計算邏輯",
      "en": "Calculation logic"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#176 月加班時數稽核，不論單據狀態與加班日，都取同一種時數來累計。",
      "en": "#176's monthly overtime check uses the same hours regardless of document status and overtime date."
    },
    "hints": [
      {
        "zh": "申請中、核准、加班日今天/昨天會取不同時數。",
        "en": "Pending vs approved, and today vs yesterday, use different hours."
      }
    ],
    "explanation": {
      "zh": "不對。#176 依狀態與加班日取不同時數：申請中取申請時數；核准等狀態下，加班日今天或之後取申請時數、昨天或之前取核發時數。",
      "en": "No. #176 uses different hours by status and date: pending uses applied hours; in approved-type states, today-or-later uses applied hours and yesterday-or-earlier uses issued hours."
    },
    "answer": false
  },
  {
    "id": "OT-176-4",
    "groupId": "OT-176",
    "variantId": "OT-176-4",
    "groupTitle": {
      "zh": "月加班時數稽核依「狀態＋加班日」取申請時數或核發時數",
      "en": "OT-176"
    },
    "title": {
      "zh": "請說明 #176 為何要依「狀態＋加班日」決定取申請或核發時數。",
      "en": "Explain why #176 chooses applied vs issued hours by \"status + overtime date.\""
    },
    "type": "concept",
    "category": {
      "zh": "計算邏輯",
      "en": "Calculation logic"
    },
    "difficulty": "senior",
    "prompt": {
      "zh": "請說明 #176 月加班時數稽核為什麼要用「狀態 + 加班日」來決定取申請時數或核發時數，這樣設計的合理性。",
      "en": "Explain why #176's monthly overtime check uses \"status + overtime date\" to decide between applied and issued hours, and why that design is reasonable."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "申請中無核發時數",
        "取申請時數",
        "pending has no issued hours",
        "use applied"
      ],
      [
        "核准後有核發時數",
        "approved has issued hours"
      ],
      [
        "加班日未到/今天之後仍可能變",
        "取申請",
        "date not passed/today or later may still change",
        "use applied"
      ],
      [
        "已過/昨天之前用實際核發",
        "past/yesterday or earlier use actual issued"
      ],
      [
        "累計貼近實際",
        "避免高估或低估",
        "accumulation closer to reality",
        "avoid over/under count"
      ]
    ],
    "modelAnswer": {
      "zh": "因為核發時數要核准當下才算得出來，申請中沒有核發時數，只能取申請時數。核准後，若加班日還沒過（今天或之後）實際時數仍可能變動，取申請時數較保守；加班日已過（昨天或之前）則已有確定的核發時數，取核發時數最貼近實際。這樣月累計才能既不高估也不低估，符合內政部客製需求。",
      "en": "Because issued hours are computed only at approval, pending applications have none and must use applied hours. After approval, if the overtime date hasn't passed (today or later) the actual hours may still change, so applied hours are the conservative choice; once the date has passed (yesterday or earlier) the issued hours are settled and best reflect reality. This keeps the monthly accumulation neither over- nor under-counted, matching the MOI customization."
    }
  },
  {
    "id": "OT-DISASTER-1",
    "groupId": "OT-DISASTER",
    "variantId": "OT-DISASTER-1",
    "groupTitle": {
      "zh": "OT-DISASTER",
      "en": "OT-DISASTER"
    },
    "title": {
      "zh": "#85 / #143 勾選「天災事變突發事件」後，加班稽核如何改變？",
      "en": "After checking \"natural disaster / emergency,\" how does #85/#143 change overtime validation?"
    },
    "type": "choice",
    "category": {
      "zh": "稽核規則",
      "en": "Validation rules"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#85 / #143 勾選天災事變突發事件後，加班稽核的調整是？",
      "en": "After checking natural-disaster/emergency in #85/#143, how is overtime validation adjusted?"
    },
    "hints": [
      {
        "zh": "#85 帶入屬性；#143 勾選後不稽核例假日不可加班。",
        "en": "#85 carries the attribute; #143 then skips the \"no overtime on holidays\" check."
      }
    ],
    "explanation": {
      "zh": "#85 在建立加班稽核用的假別資料時，帶入「勾選天災事變突發事件」的屬性；#143 則讓勾選後不再稽核「例假日不可加班」，因天災事變屬例外情形可於例假日加班。",
      "en": "#85 carries the \"disaster/emergency\" attribute when constructing the leave-data used for overtime validation; #143 then skips the \"no overtime on holidays\" rule, since disaster/emergency is an exception allowing holiday overtime."
    },
    "options": [
      {
        "zh": "一律不可加班",
        "en": "Overtime always forbidden"
      },
      {
        "zh": "需主管二次簽核",
        "en": "Requires a second supervisor approval"
      },
      {
        "zh": "加班時數自動歸零",
        "en": "Overtime hours auto-zeroed"
      },
      {
        "zh": "建立加班稽核用的假別資料時帶入該屬性，且不稽核「例假日不可加班」",
        "en": "Carry the attribute when building the validation leave-data, and skip \"no overtime on holidays\""
      }
    ],
    "answer": 3
  },
  {
    "id": "OT-DISASTER-2",
    "groupId": "OT-DISASTER",
    "variantId": "OT-DISASTER-2",
    "groupTitle": {
      "zh": "OT-DISASTER",
      "en": "OT-DISASTER"
    },
    "title": {
      "zh": "勾選天災事變後被放寬的是「例假日不可 ____」這條稽核。",
      "en": "Checking disaster/emergency relaxes the \"no ____ on holidays\" rule."
    },
    "type": "fill",
    "category": {
      "zh": "稽核規則",
      "en": "Validation rules"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "勾選天災事變突發事件後，被放寬的是「例假日不可 ________」這條稽核。",
      "en": "Checking disaster/emergency relaxes the \"no ________ on holidays\" validation rule."
    },
    "hints": [
      {
        "zh": "平時例假日不能做的那件事。",
        "en": "The thing normally not allowed on holidays."
      }
    ],
    "explanation": {
      "zh": "平時稽核「例假日不可加班」，但天災事變突發事件屬例外，勾選後即放寬此稽核，允許於例假日加班。",
      "en": "Normally \"no overtime on holidays\" is enforced, but disaster/emergency is an exception; checking it relaxes that rule and allows holiday overtime."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "加班",
      "overtime"
    ],
    "caseSensitive": false
  },
  {
    "id": "OT-DISASTER-3",
    "groupId": "OT-DISASTER",
    "variantId": "OT-DISASTER-3",
    "groupTitle": {
      "zh": "OT-DISASTER",
      "en": "OT-DISASTER"
    },
    "title": {
      "zh": "天災事變的例外，應該寫死在程式還是靠假別屬性帶入？",
      "en": "Should the disaster exception be hard-coded, or driven by a leave-data attribute?"
    },
    "type": "boolean",
    "category": {
      "zh": "稽核規則",
      "en": "Validation rules"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#85 的做法是把天災事變的例外屬性，帶進「建立加班稽核用的假別資料」裡，讓稽核依屬性判斷。",
      "en": "#85's approach carries the disaster-exception attribute into the \"leave-data built for overtime validation,\" so validation decides by the attribute."
    },
    "hints": [
      {
        "zh": "屬性帶入比把例外寫死更乾淨、好維護。",
        "en": "Carrying an attribute is cleaner and more maintainable than hard-coding the exception."
      }
    ],
    "explanation": {
      "zh": "對。#85 把勾選天災事變的屬性帶入稽核用假別資料，由稽核依屬性決定是否放寬，比把例外條件寫死更乾淨、好維護，也呼應 #116「不要寫死規則」的教訓。",
      "en": "Correct. #85 carries the disaster attribute into the validation leave-data so the check decides by the attribute — cleaner and more maintainable than hard-coding the exception, echoing #116's lesson against hard-coded rules."
    },
    "answer": true
  },
  {
    "id": "OT-DISASTER-4",
    "groupId": "OT-DISASTER",
    "variantId": "OT-DISASTER-4",
    "groupTitle": {
      "zh": "OT-DISASTER",
      "en": "OT-DISASTER"
    },
    "title": {
      "zh": "請說明「例外情形放寬稽核」如何設計才不會誤放行其他案件。",
      "en": "Explain how to design \"exception relaxes validation\" without wrongly passing other cases."
    },
    "type": "concept",
    "category": {
      "zh": "稽核規則",
      "en": "Validation rules"
    },
    "difficulty": "senior",
    "prompt": {
      "zh": "請說明像「勾選天災事變才放寬例假日加班稽核」這種例外，要怎麼設計與測試，才不會把不該放行的案件也放掉。",
      "en": "Explain how to design and test an exception like \"only disaster-checked allows holiday overtime\" so it doesn't also pass cases it shouldn't."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "例外屬性明確帶入",
        "不寫死",
        "exception attribute explicit",
        "not hard-coded"
      ],
      [
        "只在屬性為真時放寬",
        "relax only when attribute true"
      ],
      [
        "未勾選仍要擋例假日加班",
        "unchecked still blocks holiday overtime"
      ],
      [
        "測試勾/不勾兩種",
        "test checked and unchecked"
      ],
      [
        "回歸",
        "既有稽核不受影響",
        "regression",
        "existing checks intact"
      ]
    ],
    "modelAnswer": {
      "zh": "設計上把「天災事變」做成明確的屬性帶入稽核資料，而非寫死條件，稽核只在屬性為真時才放寬「例假日不可加班」。測試要同時涵蓋勾選（應放行例假日加班）與未勾選（仍應擋）兩種情形，並確認此放寬不會外溢到其他稽核（如時數上限）。最後回歸既有案例，確保一般加班的例假日稽核維持原狀。",
      "en": "Make \"disaster/emergency\" an explicit attribute carried into the validation data rather than a hard-coded condition, and relax \"no overtime on holidays\" only when that attribute is true. Test both checked (should allow holiday overtime) and unchecked (should still block), and confirm the relaxation doesn't leak into other checks (e.g. the hour cap). Finally regression-test so normal overtime's holiday rule stays unchanged."
    }
  },
  {
    "id": "FORM-154-1",
    "groupId": "FORM-154",
    "variantId": "FORM-154-1",
    "groupTitle": {
      "zh": "公假未具公差性質→不應有公務時數與可補休時數",
      "en": "FORM-154"
    },
    "title": {
      "zh": "#154 公假申請單「未具公差性質」時，不應有哪些時數？",
      "en": "In #154, when a public-leave form is \"not of official-duty nature,\" which hours should be absent?"
    },
    "type": "choice",
    "category": {
      "zh": "稽核規則",
      "en": "Validation rules"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#154 公假申請單，選擇「未具公差性質」時，不應該有哪些時數？",
      "en": "In #154, when \"not of official-duty nature\" is selected on a public-leave form, which hours should not exist?"
    },
    "hints": [
      {
        "zh": "未具公差性質＝沒有公務也沒有可補休。",
        "en": "Not official-duty means neither official-duty nor comp-leave-eligible hours."
      }
    ],
    "explanation": {
      "zh": "#154 規則：選擇「未具公差性質」時，該單不應有公務時數，也不應有可補休時數，因為沒有公差性質就不產生這兩種時數。",
      "en": "#154 rule: when \"not of official-duty nature\" is chosen, the form should have neither official-duty hours nor comp-leave-eligible hours, because without official-duty nature these two do not arise."
    },
    "options": [
      {
        "zh": "只有公務時數",
        "en": "Only official-duty hours"
      },
      {
        "zh": "公務時數與可補休時數",
        "en": "Both official-duty hours and comp-leave-eligible hours"
      },
      {
        "zh": "只有可補休時數",
        "en": "Only comp-leave-eligible hours"
      },
      {
        "zh": "加班時數",
        "en": "Overtime hours"
      }
    ],
    "answer": 1
  },
  {
    "id": "FORM-154-2",
    "groupId": "FORM-154",
    "variantId": "FORM-154-2",
    "groupTitle": {
      "zh": "公假未具公差性質→不應有公務時數與可補休時數",
      "en": "FORM-154"
    },
    "title": {
      "zh": "「具公差性質」才會產生公務時數與可 ____ 時數。",
      "en": "Only \"official-duty nature\" produces official-duty hours and ____ hours."
    },
    "type": "fill",
    "category": {
      "zh": "稽核規則",
      "en": "Validation rules"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "只有「具公差性質」的單，才會產生公務時數與可 ________ 時數。",
      "en": "Only forms \"of official-duty nature\" produce official-duty hours and ________-eligible hours."
    },
    "hints": [
      {
        "zh": "公差可換成休假。",
        "en": "Official duty can be converted to leave."
      }
    ],
    "explanation": {
      "zh": "可補休時數是因公差性質而生（執行公務可換補休）。沒有公差性質就不該有公務時數與可補休時數。",
      "en": "Comp-leave-eligible hours arise from official-duty nature (official duty can be converted to comp-leave). Without it, there should be neither official-duty nor comp-leave-eligible hours."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "補休",
      "comp-leave",
      "compensatory"
    ],
    "caseSensitive": false
  },
  {
    "id": "FORM-154-3",
    "groupId": "FORM-154",
    "variantId": "FORM-154-3",
    "groupTitle": {
      "zh": "公假未具公差性質→不應有公務時數與可補休時數",
      "en": "FORM-154"
    },
    "title": {
      "zh": "「未具公差性質」卻帶有公務時數，是正常的嗎？",
      "en": "Is it normal for a \"not official-duty\" form to carry official-duty hours?"
    },
    "type": "boolean",
    "category": {
      "zh": "稽核規則",
      "en": "Validation rules"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "一張選擇「未具公差性質」的申請單，仍帶有公務時數是正常合理的。",
      "en": "It is normal and valid for a form marked \"not of official-duty nature\" to still carry official-duty hours."
    },
    "hints": [
      {
        "zh": "未具公差性質就不該有公務時數。",
        "en": "Not official-duty means no official-duty hours."
      }
    ],
    "explanation": {
      "zh": "不正常。#154 即在處理這個矛盾：未具公差性質不應有公務時數與可補休時數，若仍帶有就是資料或邏輯有誤。",
      "en": "Not normal. #154 addresses exactly this contradiction: a \"not official-duty\" form should have neither official-duty nor comp-leave hours; if it does, the data or logic is wrong."
    },
    "answer": false
  },
  {
    "id": "FORM-154-4",
    "groupId": "FORM-154",
    "variantId": "FORM-154-4",
    "groupTitle": {
      "zh": "公假未具公差性質→不應有公務時數與可補休時數",
      "en": "FORM-154"
    },
    "title": {
      "zh": "請說明「性質決定可填欄位」這類規則的設計思路。",
      "en": "Explain the design idea behind \"nature determines fillable fields\" rules."
    },
    "type": "concept",
    "category": {
      "zh": "稽核規則",
      "en": "Validation rules"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "請說明像 #154「未具公差性質就不應有公務／可補休時數」這種「選項決定欄位是否存在」的規則，應如何設計與驗證。",
      "en": "Explain how to design and verify rules like #154 where \"an option decides whether certain fields exist,\" e.g. \"not official-duty means no official-duty/comp-leave hours.\""
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "性質為否",
        "清空/禁止相關時數",
        "nature is no",
        "clear/forbid related hours"
      ],
      [
        "前端隱藏+後端稽核雙重",
        "both frontend hide and backend validation"
      ],
      [
        "切換選項時重算",
        "recompute on option change"
      ],
      [
        "測試切換來回",
        "避免殘值",
        "test toggling back and forth",
        "no stale value"
      ],
      [
        "與既有單據一致",
        "consistent with existing forms"
      ]
    ],
    "modelAnswer": {
      "zh": "設計上要讓「性質」這個選項一旦為否，就清空並禁止相關時數（公務、可補休），且前端隱藏欄位與後端稽核要雙重把關，不能只靠前端。切換選項時要重算或清掉殘值，避免使用者先填再改性質留下舊值。驗證要測來回切換、空值與既有單據相容，確保「未具公差性質」永遠不帶這兩種時數。",
      "en": "The design should make the \"nature\" option, once set to no, clear and forbid the related hours (official-duty, comp-leave), enforced both by hiding fields on the frontend and by backend validation — never frontend only. On toggling the option, recompute or clear stale values so a user can't fill first then change nature leaving old values. Verify by toggling back and forth, testing empty values and compatibility with existing forms, ensuring \"not official-duty\" never carries those two hour types."
    }
  },
  {
    "id": "FORM-203-1",
    "groupId": "FORM-203",
    "variantId": "FORM-203-1",
    "groupTitle": {
      "zh": "出差公務時數被歸 0（模型共用，額外限制公假類別）",
      "en": "FORM-203"
    },
    "title": {
      "zh": "#203 出差申請單「執行公務時數被歸 0」修正時，為何要額外限制公假類別？",
      "en": "In #203, why did fixing \"official-duty hours zeroed\" need to additionally restrict the public-leave type?"
    },
    "type": "choice",
    "category": {
      "zh": "根因判斷",
      "en": "Root-cause judgment"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#203 修正出差申請單「執行公務時數被歸 0」，為什麼要額外限制公假類別？",
      "en": "In #203, why did the fix for \"official-duty hours zeroed\" need to additionally restrict the public-leave type?"
    },
    "hints": [
      {
        "zh": "commit：由於模型共用，額外限制公假類別。",
        "en": "The commit: because the model is shared, additionally restrict the public-leave type."
      }
    ],
    "explanation": {
      "zh": "出差與公假共用同一個模型，修改「未具公差性質就歸 0 公務／可補休時數」的條件時，會連帶影響共用該模型的公假，因此需額外限制公假類別，避免修正波及到不該動的情境。",
      "en": "Business trip and public leave share the same model. Changing the condition \"zero official-duty/comp-leave hours when not official-duty\" would also affect public leave reusing that model, so the public-leave type is additionally restricted to prevent the fix from spilling over."
    },
    "options": [
      {
        "zh": "公假比較重要",
        "en": "Public leave is more important"
      },
      {
        "zh": "法規要求",
        "en": "Legal requirement"
      },
      {
        "zh": "因為模型共用，調整歸 0 條件會影響到共用該模型的公假，需額外限制避免波及",
        "en": "Because the model is shared, changing the zeroing condition affects public leave that reuses it, so an extra restriction prevents spillover"
      },
      {
        "zh": "純粹為了畫面好看",
        "en": "Purely cosmetic"
      }
    ],
    "answer": 2
  },
  {
    "id": "FORM-203-2",
    "groupId": "FORM-203",
    "variantId": "FORM-203-2",
    "groupTitle": {
      "zh": "出差公務時數被歸 0（模型共用，額外限制公假類別）",
      "en": "FORM-203"
    },
    "title": {
      "zh": "#203 與 #154 都圍繞「未具公差性質就不該有公務時數與可 ____ 時數」。",
      "en": "Both #203 and #154 revolve around \"not official-duty means no official-duty and no ____ hours.\""
    },
    "type": "fill",
    "category": {
      "zh": "根因判斷",
      "en": "Root-cause judgment"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "#203 與 #154 都圍繞同一規則：未具公差性質，不應有公務時數及可 ________ 時數。",
      "en": "Both #203 and #154 revolve around the same rule: not official-duty means no official-duty hours and no ________ hours."
    },
    "hints": [
      {
        "zh": "與公差相關、可換成休假的時數。",
        "en": "The hours tied to official duty that convert to leave."
      }
    ],
    "explanation": {
      "zh": "兩個 issue 都在實作「未具公差性質就不應有公務時數與可補休時數」，#203 因模型共用而額外限制公假類別，#154 則直接針對公假單套用。",
      "en": "Both implement \"not official-duty means no official-duty or comp-leave hours\"; #203 additionally restricts the public-leave type due to the shared model, while #154 applies it directly to public-leave forms."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "補休",
      "comp-leave",
      "compensatory"
    ],
    "caseSensitive": false
  },
  {
    "id": "FORM-203-3",
    "groupId": "FORM-203",
    "variantId": "FORM-203-3",
    "groupTitle": {
      "zh": "出差公務時數被歸 0（模型共用，額外限制公假類別）",
      "en": "FORM-203"
    },
    "title": {
      "zh": "共用模型時，改一處的條件不會影響其他共用者嗎？",
      "en": "When sharing a model, does changing one place's condition not affect other consumers?"
    },
    "type": "boolean",
    "category": {
      "zh": "根因判斷",
      "en": "Root-cause judgment"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "因為是共用模型，所以只改出差的歸 0 條件，完全不會影響到公假。",
      "en": "Because the model is shared, changing only the business-trip zeroing condition has no effect on public leave at all."
    },
    "hints": [
      {
        "zh": "共用模型正是會互相影響，#203 才要額外限制公假。",
        "en": "A shared model is exactly what makes them affect each other; that's why #203 restricts public leave."
      }
    ],
    "explanation": {
      "zh": "不對。正因模型共用，改一處會波及所有共用者。#203 就是發現改歸 0 條件會影響公假，才額外加上公假類別的限制，避免誤傷。",
      "en": "No. Precisely because the model is shared, one change affects all consumers. #203 found that changing the zeroing condition would impact public leave, so it added a public-leave restriction to avoid collateral damage."
    },
    "answer": false
  },
  {
    "id": "FORM-203-4",
    "groupId": "FORM-203",
    "variantId": "FORM-203-4",
    "groupTitle": {
      "zh": "出差公務時數被歸 0（模型共用，額外限制公假類別）",
      "en": "FORM-203"
    },
    "title": {
      "zh": "請說明修改「共用模型」時的風險與防範作法。",
      "en": "Explain the risks of modifying a \"shared model\" and how to guard against them."
    },
    "type": "concept",
    "category": {
      "zh": "根因判斷",
      "en": "Root-cause judgment"
    },
    "difficulty": "senior",
    "prompt": {
      "zh": "請以 #203 為例，說明修改多張單據共用的模型／邏輯時有什麼風險，以及你會怎麼降低波及範圍。",
      "en": "Using #203, explain the risks of modifying a model/logic shared by multiple forms, and how you would limit the blast radius."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "共用模型",
        "改一處影響全部",
        "shared model",
        "one change affects all"
      ],
      [
        "先找出所有共用者/呼叫點",
        "find all consumers/call sites first"
      ],
      [
        "用類別/旗標限縮適用範圍",
        "scope by type/flag"
      ],
      [
        "回歸測試各共用單據",
        "regression-test each form"
      ],
      [
        "必要時拆分或加條件",
        "split or add condition if needed"
      ]
    ],
    "modelAnswer": {
      "zh": "風險是共用模型被多張單據（出差、公假等）使用，改一處的條件會同時改變所有共用者的行為，可能誤傷其他單據。降低波及的作法：先找出所有共用者與呼叫點，用類別或旗標把修正限縮到目標情境（#203 即額外限制公假類別），改完對每張共用單據都做回歸測試；若情境差異大，考慮拆分模型或加上明確條件分流。",
      "en": "The risk is that a shared model used by several forms (business trip, public leave, etc.) will, when one condition changes, alter behavior for all consumers and possibly harm others. To limit the blast radius: first identify all consumers/call sites, scope the fix to the target case with a type or flag (#203 restricted the public-leave type), and regression-test every form using the model; if the cases diverge enough, consider splitting the model or adding an explicit branching condition."
    }
  },
  {
    "id": "FORM-150-1",
    "groupId": "FORM-150",
    "variantId": "FORM-150-1",
    "groupTitle": {
      "zh": "公出頁面更新時公務時數被初始化為空值→稽核不過",
      "en": "FORM-150"
    },
    "title": {
      "zh": "#150 公出申請單「稽核不過」的根因是什麼？",
      "en": "What was the root cause of #150 \"public-out form fails validation\"?"
    },
    "type": "choice",
    "category": {
      "zh": "根因判斷",
      "en": "Root-cause judgment"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#150 公出申請單，頁面更新時未勾選「含假日」，結果稽核不過。根因是？",
      "en": "In #150, refreshing the public-out form without checking \"include holidays\" caused validation to fail. The cause is?"
    },
    "hints": [
      {
        "zh": "commit：未勾選含假日時，執行公務時數被初始化為空值。",
        "en": "The commit: without \"include holidays,\" official-duty hours were initialized to empty."
      }
    ],
    "explanation": {
      "zh": "根因是頁面更新時，在未勾選「含假日」的情況下，執行公務時數被初始化成空值（null），稽核要求該時數有值而判定不過。修正即避免在此情境下把時數清空。",
      "en": "The cause was that on page refresh, when \"include holidays\" was unchecked, official-duty hours were initialized to empty (null); validation requiring a value then failed. The fix avoids blanking the hours in that scenario."
    },
    "options": [
      {
        "zh": "頁面更新時執行公務時數被初始化為空值，稽核因此不過",
        "en": "On refresh, official-duty hours were initialized to empty, failing validation"
      },
      {
        "zh": "含假日預設應勾選",
        "en": "\"Include holidays\" should default to checked"
      },
      {
        "zh": "假日資料缺漏",
        "en": "Missing holiday data"
      },
      {
        "zh": "後端 API 逾時",
        "en": "Backend API timeout"
      }
    ],
    "answer": 0
  },
  {
    "id": "FORM-150-2",
    "groupId": "FORM-150",
    "variantId": "FORM-150-2",
    "groupTitle": {
      "zh": "公出頁面更新時公務時數被初始化為空值→稽核不過",
      "en": "FORM-150"
    },
    "title": {
      "zh": "#150 中被錯誤初始化為空值（null）的是哪個時數？",
      "en": "In #150, which hours were wrongly initialized to empty (null)?"
    },
    "type": "fill",
    "category": {
      "zh": "根因判斷",
      "en": "Root-cause judgment"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#150 公出申請單，頁面更新時被錯誤初始化為空值的是「執行 ________ 時數」。",
      "en": "In #150, the value wrongly initialized to empty on refresh was the \"official-duty ________ hours.\""
    },
    "hints": [
      {
        "zh": "公出執行的那種時數。",
        "en": "The kind of hours a public-out trip performs."
      }
    ],
    "explanation": {
      "zh": "是「執行公務時數」。頁面更新且未勾選含假日時被初始化為空值，導致稽核不過；修正是不在該情境清空它。",
      "en": "It is \"official-duty hours.\" On refresh with \"include holidays\" unchecked it was initialized to empty, failing validation; the fix is to not blank it in that scenario."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "公務",
      "official-duty",
      "duty"
    ],
    "caseSensitive": false
  },
  {
    "id": "FORM-150-3",
    "groupId": "FORM-150",
    "variantId": "FORM-150-3",
    "groupTitle": {
      "zh": "公出頁面更新時公務時數被初始化為空值→稽核不過",
      "en": "FORM-150"
    },
    "title": {
      "zh": "「空值（null）」和「0」在稽核時可以視為相同嗎？",
      "en": "Can \"null\" and \"0\" be treated the same during validation?"
    },
    "type": "boolean",
    "category": {
      "zh": "根因判斷",
      "en": "Root-cause judgment"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "在欄位稽核時，把空值（null）和 0 視為完全相同是安全的。",
      "en": "During field validation, treating null and 0 as identical is safe."
    },
    "hints": [
      {
        "zh": "#150 與 #113 都顯示 null 會造成稽核行為不同。",
        "en": "Both #150 and #113 show null causes different validation behavior."
      }
    ],
    "explanation": {
      "zh": "不安全。null（沒值）與 0（有值且為零）語意不同，稽核常把 null 當成「未填」而擋下。#150 因初始化為 null 稽核不過；#113 也特別對時數做不為 NULL 的檢查，可見要分清。",
      "en": "Not safe. null (no value) and 0 (a value of zero) mean different things; validation often treats null as \"not filled\" and blocks it. #150 failed because it was null; #113 specifically added not-NULL checks on hours — they must be distinguished."
    },
    "answer": false
  },
  {
    "id": "FORM-150-4",
    "groupId": "FORM-150",
    "variantId": "FORM-150-4",
    "groupTitle": {
      "zh": "公出頁面更新時公務時數被初始化為空值→稽核不過",
      "en": "FORM-150"
    },
    "title": {
      "zh": "請說明「頁面更新導致欄位被初始化」這類 bug 的成因與防範。",
      "en": "Explain the cause and prevention of \"refresh re-initializes a field\" bugs."
    },
    "type": "concept",
    "category": {
      "zh": "根因判斷",
      "en": "Root-cause judgment"
    },
    "difficulty": "senior",
    "prompt": {
      "zh": "請說明像 #150「頁面更新／切換選項時，欄位被錯誤初始化為空值」這類 bug 為何發生、如何防範與測試。",
      "en": "Explain why \"a field is wrongly re-initialized to empty on refresh/option toggle\" bugs like #150 happen, and how to prevent and test them."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "重新渲染/事件觸發時重設狀態",
        "re-render/event resets state"
      ],
      [
        "沒保留使用者已填值",
        "doesn't preserve user-entered value"
      ],
      [
        "null vs 已填",
        "稽核擋下",
        "null vs filled",
        "validation blocks"
      ],
      [
        "只在必要時重算",
        "保留既有值",
        "recompute only when needed",
        "keep existing value"
      ],
      [
        "測試切換/更新後值還在",
        "test value persists after toggle/refresh"
      ]
    ],
    "modelAnswer": {
      "zh": "這類 bug 多半是頁面重新渲染或某個事件（如切換含假日）觸發時，程式無條件重設欄位狀態，把使用者已填或既有的值清成 null，而稽核又把 null 當未填擋下。防範作法：只在真正必要時重算欄位，否則保留既有值；區分 null 與 0／有值的語意；切換選項時保留或正確帶入原值。測試要涵蓋「填值後更新頁面／切換選項」確認值仍在且稽核通過。",
      "en": "These bugs usually occur when a re-render or an event (e.g. toggling \"include holidays\") unconditionally resets the field state, blanking the user's entered or existing value to null, while validation treats null as \"not filled\" and blocks it. Prevention: recompute the field only when truly necessary, otherwise preserve the existing value; distinguish null from 0/filled semantics; on option toggles preserve or correctly carry the original value. Test \"enter value then refresh/toggle\" to confirm the value persists and validation passes."
    }
  },
  {
    "id": "FORM-113-1",
    "groupId": "FORM-113",
    "variantId": "FORM-113-1",
    "groupTitle": {
      "zh": "公出時數欄位新增不為 NULL 檢查",
      "en": "FORM-113"
    },
    "title": {
      "zh": "#113 公出申請單新增了哪種欄位檢查？",
      "en": "What kind of field check did #113 add to the public-out form?"
    },
    "type": "choice",
    "category": {
      "zh": "防呆檢查",
      "en": "Defensive checks"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "#113 公出申請單增加欄位檢查，主要對哪些欄位做了什麼檢查？",
      "en": "#113 added field checks to the public-out form — which fields and what check?"
    },
    "hints": [
      {
        "zh": "commit：對執行公務時數、交通路程時數作不為 NULL 值檢查。",
        "en": "The commit: not-NULL checks on official-duty hours and travel-time hours."
      }
    ],
    "explanation": {
      "zh": "#113 對「執行公務時數」與「交通路程時數」加上不為 NULL 的檢查，並刪除無效程式碼，避免空值流入後續計算或稽核造成問題。",
      "en": "#113 added not-NULL checks on \"official-duty hours\" and \"travel-time hours\" and removed dead code, preventing null values from flowing into later calculations or validation."
    },
    "options": [
      {
        "zh": "對所有文字欄位做長度檢查",
        "en": "Length check on all text fields"
      },
      {
        "zh": "對附件做大小檢查",
        "en": "Attachment size check"
      },
      {
        "zh": "對日期做格式檢查",
        "en": "Date format check"
      },
      {
        "zh": "對執行公務時數、交通路程時數做「不為 NULL」檢查",
        "en": "Not-NULL check on official-duty hours and travel-time hours"
      }
    ],
    "answer": 3
  },
  {
    "id": "FORM-113-2",
    "groupId": "FORM-113",
    "variantId": "FORM-113-2",
    "groupTitle": {
      "zh": "公出時數欄位新增不為 NULL 檢查",
      "en": "FORM-113"
    },
    "title": {
      "zh": "#113 對時數欄位加上的是「不為 ________」檢查。",
      "en": "#113 added a \"not-________\" check on the hour fields."
    },
    "type": "fill",
    "category": {
      "zh": "防呆檢查",
      "en": "Defensive checks"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "#113 對執行公務時數、交通路程時數加上的是「不為 ________ 值」的檢查。",
      "en": "#113 added a \"not-________ value\" check on official-duty hours and travel-time hours."
    },
    "hints": [
      {
        "zh": "與 #150 同一個主題：空值。",
        "en": "Same theme as #150: empty values."
      }
    ],
    "explanation": {
      "zh": "是不為 NULL（空值）的檢查。與 #150 呼應，時數欄位的空值會造成後續稽核或計算出錯，故先擋在輸入端。",
      "en": "A not-NULL (empty) check. Echoing #150, null hour fields break later validation/calculation, so they are guarded at the input boundary."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "NULL",
      "null",
      "空"
    ],
    "caseSensitive": false
  },
  {
    "id": "FORM-113-3",
    "groupId": "FORM-113",
    "variantId": "FORM-113-3",
    "groupTitle": {
      "zh": "公出時數欄位新增不為 NULL 檢查",
      "en": "FORM-113"
    },
    "title": {
      "zh": "對輸入欄位加上 NULL 檢查屬於哪一類防護？",
      "en": "Adding a NULL check on input fields is which kind of safeguard?"
    },
    "type": "boolean",
    "category": {
      "zh": "防呆檢查",
      "en": "Defensive checks"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "對輸入欄位加上「不為 NULL」檢查，屬於把問題擋在源頭的防呆／防禦性程式設計。",
      "en": "Adding a \"not-NULL\" check on input fields is defensive programming that stops problems at the source."
    },
    "hints": [
      {
        "zh": "在資料流入計算前先驗證。",
        "en": "Validate before data flows into computation."
      }
    ],
    "explanation": {
      "zh": "對。在資料進入計算或稽核前先檢查不為 NULL，是防禦性程式設計，能把空值問題擋在源頭，避免後續流程出錯（如 #150 的稽核不過）。",
      "en": "Yes. Checking not-NULL before data enters computation or validation is defensive programming, stopping null issues at the source and preventing downstream failures (like #150's validation failure)."
    },
    "answer": true
  },
  {
    "id": "FORM-113-4",
    "groupId": "FORM-113",
    "variantId": "FORM-113-4",
    "groupTitle": {
      "zh": "公出時數欄位新增不為 NULL 檢查",
      "en": "FORM-113"
    },
    "title": {
      "zh": "請說明欄位驗證該放前端、後端，還是兩者，以及為什麼。",
      "en": "Explain whether field validation belongs on the frontend, backend, or both, and why."
    },
    "type": "concept",
    "category": {
      "zh": "防呆檢查",
      "en": "Defensive checks"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "請說明像 #113 這種欄位不為 NULL 的檢查，應放前端、後端還是兩者都放，以及理由。",
      "en": "Explain whether a not-NULL field check like #113 should live on the frontend, backend, or both, and why."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "前端提升體驗",
        "即時提示",
        "frontend improves UX",
        "instant feedback"
      ],
      [
        "後端為最後防線",
        "不可繞過",
        "backend is last line",
        "cannot be bypassed"
      ],
      [
        "前端可被繞過/直接打API",
        "frontend can be bypassed/direct API"
      ],
      [
        "兩者都做",
        "後端為準",
        "do both",
        "backend authoritative"
      ],
      [
        "空值會污染計算與稽核",
        "null pollutes calc and validation"
      ]
    ],
    "modelAnswer": {
      "zh": "應該兩者都做。前端檢查提升體驗、即時提示使用者，但前端可被繞過（直接打 API、改請求），所以後端必須是最後防線、以後端為準。像 #113 的時數不為 NULL 檢查，若只放前端，惡意或異常請求仍會讓空值流入計算與稽核造成錯誤；後端把關才能確保資料正確。",
      "en": "Both. Frontend checks improve UX and give instant feedback, but the frontend can be bypassed (direct API calls, tampered requests), so the backend must be the authoritative last line of defense. For #113's not-NULL hour check, frontend-only would still let abnormal or malicious requests push nulls into calculation and validation; backend enforcement guarantees correct data."
    }
  },
  {
    "id": "FORM-166-1",
    "groupId": "FORM-166",
    "variantId": "FORM-166-1",
    "groupTitle": {
      "zh": "赴大陸非公務事由，只有「其他」才出現自由輸入框",
      "en": "FORM-166"
    },
    "title": {
      "zh": "#166 赴大陸地區申請表「非公務事由」的 UI 規則修正是什麼？",
      "en": "What UI rule did #166 fix for the \"non-official reason\" on the mainland-China application form?"
    },
    "type": "choice",
    "category": {
      "zh": "前端互動",
      "en": "Frontend interaction"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "#166 十職等以下赴大陸地區申請表，修正了「非公務事由選項」的哪個 bug？",
      "en": "In #166, what bug was fixed for the \"non-official reason option\" on the mainland-China form (rank 10 and below)?"
    },
    "hints": [
      {
        "zh": "commit：只有理由項目為「其他」，才有可自行填寫的輸入框。",
        "en": "The commit: only when the reason is \"Other\" is there a free-text input."
      }
    ],
    "explanation": {
      "zh": "#166 修正後，只有當理由項目選「其他」時，才顯示可自行填寫的輸入框；選其他既有選項則不該出現該輸入框。",
      "en": "After #166, the free-text input appears only when the reason is \"Other\"; selecting any predefined option should not show that input."
    },
    "options": [
      {
        "zh": "任何理由都能填寫輸入框",
        "en": "Any reason shows the text input"
      },
      {
        "zh": "只有理由項目為「其他」時，才出現可自行填寫的輸入框",
        "en": "Only when the reason is \"Other\" does the free-text input appear"
      },
      {
        "zh": "移除了輸入框",
        "en": "The input was removed"
      },
      {
        "zh": "輸入框變成必填",
        "en": "The input became mandatory"
      }
    ],
    "answer": 1
  },
  {
    "id": "FORM-166-2",
    "groupId": "FORM-166",
    "variantId": "FORM-166-2",
    "groupTitle": {
      "zh": "赴大陸非公務事由，只有「其他」才出現自由輸入框",
      "en": "FORM-166"
    },
    "title": {
      "zh": "#166 只有選哪個選項才會出現自由輸入框？",
      "en": "In #166, which option reveals the free-text input?"
    },
    "type": "fill",
    "category": {
      "zh": "前端互動",
      "en": "Frontend interaction"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "#166 中，只有理由項目選擇「________」時，才會出現可自行填寫的輸入框。",
      "en": "In #166, the free-text input appears only when the reason option is \"________.\""
    },
    "hints": [
      {
        "zh": "預設選項之外的那個。",
        "en": "The catch-all beyond the predefined options."
      }
    ],
    "explanation": {
      "zh": "是「其他」。這是常見的 UI 模式：選「其他」才開放自由文字輸入，選既有選項則隱藏輸入框。",
      "en": "It is \"Other.\" This is a common UI pattern: choosing \"Other\" enables free-text input; predefined options hide it."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "其他",
      "Other"
    ],
    "caseSensitive": false
  },
  {
    "id": "FORM-166-3",
    "groupId": "FORM-166",
    "variantId": "FORM-166-3",
    "groupTitle": {
      "zh": "赴大陸非公務事由，只有「其他」才出現自由輸入框",
      "en": "FORM-166"
    },
    "title": {
      "zh": "「選其他才顯示輸入框」這種連動，只做前端顯示就夠了嗎？",
      "en": "For \"show the input only when Other,\" is frontend display alone enough?"
    },
    "type": "boolean",
    "category": {
      "zh": "前端互動",
      "en": "Frontend interaction"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "「選其他才顯示輸入框」這種連動，只要前端控制顯示／隱藏就完全足夠，後端不必處理。",
      "en": "For \"show the input only when Other,\" frontend show/hide alone is fully sufficient and the backend need not handle it."
    },
    "hints": [
      {
        "zh": "還要考慮切換後殘留值與後端驗證一致性。",
        "en": "Consider stale values after toggling and backend consistency."
      }
    ],
    "explanation": {
      "zh": "不夠。除了顯示控制，還要處理：切換回非「其他」時清掉殘留的自由文字、後端驗證「非其他卻帶了自由文字」或「選其他卻沒填」的不一致。只靠前端顯示無法保證資料正確。",
      "en": "Not enough. Beyond show/hide, you must clear stale free-text when switching away from \"Other,\" and have the backend validate inconsistencies like \"not Other but free-text present\" or \"Other but empty.\" Frontend display alone cannot guarantee correct data."
    },
    "answer": false
  },
  {
    "id": "FORM-166-4",
    "groupId": "FORM-166",
    "variantId": "FORM-166-4",
    "groupTitle": {
      "zh": "赴大陸非公務事由，只有「其他」才出現自由輸入框",
      "en": "FORM-166"
    },
    "title": {
      "zh": "請說明「選項連動欄位顯示」的正確實作與測試重點。",
      "en": "Explain the correct implementation and test focus for \"option-driven field visibility.\""
    },
    "type": "concept",
    "category": {
      "zh": "前端互動",
      "en": "Frontend interaction"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "請說明像 #166「選其他才出現輸入框」這種選項連動顯示欄位，要怎麼正確實作與測試，避免殘留值或資料不一致。",
      "en": "Explain how to correctly implement and test \"option reveals a field\" like #166, avoiding stale values or data inconsistency."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "選其他顯示",
        "其他選項隱藏",
        "Other shows",
        "others hide"
      ],
      [
        "切換時清空殘留值",
        "clear stale value on switch"
      ],
      [
        "後端驗證一致性",
        "其他需填/非其他不帶",
        "backend validates consistency",
        "Other requires/non-Other carries none"
      ],
      [
        "必填條件隨選項變",
        "required condition varies by option"
      ],
      [
        "測試各選項切換來回",
        "test toggling all options back and forth"
      ]
    ],
    "modelAnswer": {
      "zh": "正確實作是：選「其他」時顯示並要求填寫自由輸入框，選其他選項則隱藏且清空殘留值；必填條件要隨選項變動。後端也要驗證一致性——選「其他」卻沒填要擋、非「其他」卻帶自由文字要清掉或拒絕。測試重點是各選項間來回切換確認輸入框正確顯示／隱藏、殘留值被清掉、且送出資料與選項一致。",
      "en": "Correct implementation: when \"Other\" is selected, show and require the free-text input; for other options, hide it and clear any stale value, with the required-flag varying by option. The backend must also validate consistency — block \"Other\" with empty text, and clear or reject free-text when the option is not \"Other.\" Test focus: toggle among options back and forth to confirm the input shows/hides correctly, stale values are cleared, and submitted data matches the chosen option."
    }
  },
  {
    "id": "VEH-253-1",
    "groupId": "VEH-253",
    "variantId": "VEH-253-1",
    "groupTitle": {
      "zh": "費用比較表下載 not exists（正式環境 WAF 誤判 SQL injection，改 ExportExcelJson）",
      "en": "VEH-253"
    },
    "title": {
      "zh": "#253「費用比較表下載出現 not exists」在正式環境的真因是什麼？",
      "en": "What was the real production cause of #253 \"comparison report download shows not exists\"?"
    },
    "type": "choice",
    "category": {
      "zh": "資安・環境差異",
      "en": "Security / environment difference"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#253 公務車輛各項費用比較表下載出現 not exists，且測試機無法重現。正式環境的真因是？",
      "en": "In #253, downloading the vehicle cost-comparison report showed \"not exists,\" and the test machine couldn't reproduce it. The real production cause was?"
    },
    "hints": [
      {
        "zh": "測試機無法重現＋正式環境才發生＝環境層（WAF）差異。",
        "en": "Can't reproduce on test + only in production = an environment-layer (WAF) difference."
      }
    ],
    "explanation": {
      "zh": "真因是正式環境的 WAF（Web 應用防火牆）把呼叫 ExportExcel 的請求誤判為 SQL injection 而擋下，導致「not exists」。測試機沒有同樣的 WAF 規則所以無法重現。",
      "en": "The real cause was the production WAF (Web Application Firewall) misclassifying the ExportExcel request as SQL injection and blocking it, producing \"not exists.\" The test machine lacked the same WAF rules, so it couldn't reproduce."
    },
    "options": [
      {
        "zh": "報表檔案真的不存在",
        "en": "The report file really did not exist"
      },
      {
        "zh": "資料庫權限不足",
        "en": "Insufficient DB permission"
      },
      {
        "zh": "正式環境被 WAF 判斷為 SQL injection 而擋下請求",
        "en": "Production WAF flagged the request as SQL injection and blocked it"
      },
      {
        "zh": "磁碟空間不足",
        "en": "Disk full"
      }
    ],
    "answer": 2
  },
  {
    "id": "VEH-253-2",
    "groupId": "VEH-253",
    "variantId": "VEH-253-2",
    "groupTitle": {
      "zh": "費用比較表下載 not exists（正式環境 WAF 誤判 SQL injection，改 ExportExcelJson）",
      "en": "VEH-253"
    },
    "title": {
      "zh": "#253 依資安人員建議，擴充了什麼格式的 ExportExcel 呼叫路徑？",
      "en": "Per security staff's advice in #253, what request format was added for ExportExcel?"
    },
    "type": "fill",
    "category": {
      "zh": "資安・環境差異",
      "en": "Security / environment difference"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#253 按內政部資安人員建議，擴充以 ________ 格式呼叫 ExportExcel 的新路徑（ExportExcelJson）。",
      "en": "Per MOI security staff's advice, #253 added a new ExportExcel path that sends the request as ________ format (ExportExcelJson)."
    },
    "hints": [
      {
        "zh": "新路徑叫 ExportExcelJson。",
        "en": "The new path is called ExportExcelJson."
      }
    ],
    "explanation": {
      "zh": "改用 JSON 格式（POST body）傳送參數呼叫 ExportExcel（新路徑 ExportExcelJson），避免參數以 query string／易被 WAF 誤判為 SQL injection 的形式出現。同時也拔掉 debuglog、讓 Aspose.Cells 載入 HTML 時不解析公式。",
      "en": "Switching to JSON (POST body) to pass parameters to ExportExcel (new path ExportExcelJson) avoids passing them in a query-string form that the WAF mistook for SQL injection. The fix also removed debug logs and made Aspose.Cells skip formula parsing when loading HTML."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "JSON",
      "json"
    ],
    "caseSensitive": false
  },
  {
    "id": "VEH-253-3",
    "groupId": "VEH-253",
    "variantId": "VEH-253-3",
    "groupTitle": {
      "zh": "費用比較表下載 not exists（正式環境 WAF 誤判 SQL injection，改 ExportExcelJson）",
      "en": "VEH-253"
    },
    "title": {
      "zh": "測試機無法重現，是否就代表問題不存在？",
      "en": "If the test machine can't reproduce it, does that mean the problem doesn't exist?"
    },
    "type": "boolean",
    "category": {
      "zh": "資安・環境差異",
      "en": "Security / environment difference"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "測試機完全無法重現某個下載錯誤，就代表正式環境其實沒有問題。",
      "en": "If the test machine cannot reproduce a download error at all, the production environment actually has no problem."
    },
    "hints": [
      {
        "zh": "#253 正是測試機重現不出、正式環境卻因 WAF 真的壞掉。",
        "en": "#253 is exactly: not reproducible on test, but truly broken in production due to WAF."
      }
    ],
    "explanation": {
      "zh": "不對。#253 顯示問題可能來自正式環境特有的環境層（WAF、反向代理、權限、設定）。測試機沒有相同 WAF 規則自然重現不出，但正式環境確實壞掉。要比對環境差異而非斷定無事。",
      "en": "No. #253 shows the problem can come from production-specific environment layers (WAF, reverse proxy, permissions, config). The test machine lacks the same WAF rules so it can't reproduce, yet production is genuinely broken. Compare environment differences rather than concluding nothing is wrong."
    },
    "answer": false
  },
  {
    "id": "VEH-253-4",
    "groupId": "VEH-253",
    "variantId": "VEH-253-4",
    "groupTitle": {
      "zh": "費用比較表下載 not exists（正式環境 WAF 誤判 SQL injection，改 ExportExcelJson）",
      "en": "VEH-253"
    },
    "title": {
      "zh": "請說明「測試機正常、正式環境壞掉」這類問題的追查策略。",
      "en": "Explain the strategy for \"works on test, broken in production\" problems."
    },
    "type": "concept",
    "category": {
      "zh": "資安・環境差異",
      "en": "Security / environment difference"
    },
    "difficulty": "senior",
    "prompt": {
      "zh": "請以 #253 為例，說明遇到「測試機重現不出、只在正式環境發生」的問題，你會如何縮小範圍找到根因。",
      "en": "Using #253, explain how you would narrow down the root cause of a problem that only happens in production and can't be reproduced on test."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "比對環境差異",
        "WAF/proxy/權限/設定",
        "compare environment differences",
        "WAF/proxy/permission/config"
      ],
      [
        "看正式環境請求是否到後端",
        "網路層攔截",
        "check if request reaches backend",
        "network-layer block"
      ],
      [
        "暫時插debuglog後拔掉",
        "temporary debug log then remove"
      ],
      [
        "與資安人員協作",
        "collaborate with security staff"
      ],
      [
        "改傳輸格式繞過誤判",
        "JSON/POST",
        "change transport to bypass false positive"
      ]
    ],
    "modelAnswer": {
      "zh": "先承認可能是環境層差異，比對測試機與正式環境的 WAF、反向代理、權限與設定。確認請求是否真的到達後端——若被網路層（WAF）攔截，後端根本沒收到，就會出現像 not exists 的假象。可暫時插 debuglog 觀察、與資安人員協作確認攔截規則（#253 即 WAF 誤判 SQL injection），再用改傳輸格式（改 JSON／POST）繞過誤判，最後拔掉 debuglog 並回歸。",
      "en": "First accept it may be an environment-layer difference and compare WAF, reverse proxy, permissions, and config between test and production. Verify whether the request actually reaches the backend — if a network layer (WAF) blocks it, the backend never receives it, producing a false symptom like \"not exists.\" Temporarily add debug logging to observe, collaborate with security staff to confirm the blocking rule (#253 was WAF misclassifying SQL injection), then change the transport format (to JSON/POST) to bypass the false positive, and finally remove the debug log and regression-test."
    }
  },
  {
    "id": "VEH-173-1",
    "groupId": "VEH-173",
    "variantId": "VEH-173-1",
    "groupTitle": {
      "zh": "派車單 NullReferenceException",
      "en": "VEH-173"
    },
    "title": {
      "zh": "#173 派車單出現 NullReferenceException，本質是什麼？",
      "en": "What is the essence of #173's NullReferenceException on the dispatch form?"
    },
    "type": "choice",
    "category": {
      "zh": "例外處理",
      "en": "Exception handling"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "#173 指派車輛駕駛時，派車單出現 NullReferenceException。它本質是？",
      "en": "In #173, assigning a driver threw a NullReferenceException on the dispatch form. Its essence is?"
    },
    "hints": [
      {
        "zh": "NullReference＝用了還沒指派／為 null 的物件。",
        "en": "NullReference = using an object that is null/unassigned."
      }
    ],
    "explanation": {
      "zh": "NullReferenceException 是存取了值為 null 的物件成員（屬性／方法）。#173 派車單在某情境下某物件為 null 卻被取用而拋例外；修正即補上判空或正確初始化，並調整列印頁面。",
      "en": "A NullReferenceException is accessing a member (property/method) of a null object. In #173 some object was null in a scenario but was used, throwing the exception; the fix added null checks/proper initialization and adjusted the print page."
    },
    "options": [
      {
        "zh": "程式存取了一個為 null 的物件成員",
        "en": "Accessing a member of a null object"
      },
      {
        "zh": "資料庫連線錯誤",
        "en": "A DB connection error"
      },
      {
        "zh": "權限不足",
        "en": "Insufficient permission"
      },
      {
        "zh": "網路逾時",
        "en": "Network timeout"
      }
    ],
    "answer": 0
  },
  {
    "id": "VEH-173-2",
    "groupId": "VEH-173",
    "variantId": "VEH-173-2",
    "groupTitle": {
      "zh": "派車單 NullReferenceException",
      "en": "VEH-173"
    },
    "title": {
      "zh": "NullReferenceException 通常代表存取了值為 ________ 的物件。",
      "en": "A NullReferenceException usually means accessing an object whose value is ________."
    },
    "type": "fill",
    "category": {
      "zh": "例外處理",
      "en": "Exception handling"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "NullReferenceException 通常代表程式存取了值為 ________ 的物件的成員。",
      "en": "A NullReferenceException usually means the program accessed a member of an object whose value is ________."
    },
    "hints": [
      {
        "zh": "物件還沒被建立／指派。",
        "en": "The object was never created/assigned."
      }
    ],
    "explanation": {
      "zh": "值為 null 代表物件尚未建立或未被指派。對 null 取屬性或呼叫方法就會拋 NullReferenceException。",
      "en": "A null value means the object was never created or assigned. Reading a property or calling a method on null throws a NullReferenceException."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "null",
      "NULL",
      "空"
    ],
    "caseSensitive": false
  },
  {
    "id": "VEH-173-3",
    "groupId": "VEH-173",
    "variantId": "VEH-173-3",
    "groupTitle": {
      "zh": "派車單 NullReferenceException",
      "en": "VEH-173"
    },
    "title": {
      "zh": "加上 try-catch 把 NullReferenceException 吞掉，就算修好了嗎？",
      "en": "Does wrapping the NullReferenceException in try-catch count as fixing it?"
    },
    "type": "boolean",
    "category": {
      "zh": "例外處理",
      "en": "Exception handling"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "用 try-catch 把派車單的 NullReferenceException 包起來吞掉，就算把問題修好了。",
      "en": "Wrapping the dispatch form's NullReferenceException in a try-catch to swallow it counts as fixing the problem."
    },
    "hints": [
      {
        "zh": "那只是隱藏症狀，沒處理「為何是 null」。",
        "en": "That only hides the symptom, not why it's null."
      }
    ],
    "explanation": {
      "zh": "不算。吞掉例外只是隱藏症狀，沒解決「為何物件是 null」。正確做法是找出 null 的來源（未初始化／查無資料／傳錯參數），補上判空或修正資料流，必要時給合理預設或友善訊息。",
      "en": "No. Swallowing only hides the symptom, not why the object is null. The right approach is to find the source of null (uninitialized / no data found / wrong parameter), add null checks or fix the data flow, and provide a sensible default or friendly message where appropriate."
    },
    "answer": false
  },
  {
    "id": "VEH-173-4",
    "groupId": "VEH-173",
    "variantId": "VEH-173-4",
    "groupTitle": {
      "zh": "派車單 NullReferenceException",
      "en": "VEH-173"
    },
    "title": {
      "zh": "請說明你會如何定位並根治派車單的 NullReferenceException。",
      "en": "Explain how you would locate and properly fix the dispatch form's NullReferenceException."
    },
    "type": "concept",
    "category": {
      "zh": "例外處理",
      "en": "Exception handling"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "請說明遇到 #173 這種 NullReferenceException，你會如何從堆疊找到出錯的物件、確認 null 來源並根治。",
      "en": "Explain how, for a NullReferenceException like #173, you would use the stack trace to find the offending object, confirm the null source, and fix it properly."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "看stack trace定位行號",
        "read stack trace for line"
      ],
      [
        "哪個物件為null",
        "which object is null"
      ],
      [
        "追來源",
        "未初始化/查無資料/傳錯參數",
        "trace source",
        "uninitialized/no data/wrong param"
      ],
      [
        "判空或正確初始化",
        "非吞例外",
        "null check or proper init",
        "not swallow"
      ],
      [
        "重現情境並回歸",
        "reproduce scenario and regression"
      ]
    ],
    "modelAnswer": {
      "zh": "先看堆疊追蹤（stack trace）定位拋例外的行號與物件，確認是哪個物件為 null。接著往回追 null 的來源——是沒初始化、查無資料回傳 null、還是傳錯參數導致取不到。根治是針對來源補上判空或正確初始化（必要時給合理預設或明確訊息），而不是用 try-catch 吞掉。最後重現原情境驗證不再拋例外並回歸列印頁面。",
      "en": "First read the stack trace to locate the throwing line and object and confirm which object is null. Then trace back to the null source — uninitialized, a query returning null, or a wrong parameter causing a miss. Fix at the source with a null check or proper initialization (a sensible default or clear message where needed), not by swallowing it in try-catch. Finally reproduce the scenario to confirm it no longer throws and regression-test the print page."
    }
  },
  {
    "id": "VEH-175-1",
    "groupId": "VEH-175",
    "variantId": "VEH-175-1",
    "groupTitle": {
      "zh": "車輛資料維護新增重複車牌稽核",
      "en": "VEH-175"
    },
    "title": {
      "zh": "#175 車輛資料維護新增了什麼稽核？",
      "en": "What validation did #175 add to vehicle data maintenance?"
    },
    "type": "choice",
    "category": {
      "zh": "資料完整性",
      "en": "Data integrity"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "#175 車輛資料維護新增了哪種稽核？",
      "en": "What check did #175 add to vehicle data maintenance?"
    },
    "hints": [
      {
        "zh": "避免同一車牌被建立兩次。",
        "en": "Prevent the same plate from being created twice."
      }
    ],
    "explanation": {
      "zh": "#175 新增重複車牌稽核，防止建立或維護車輛資料時出現重複車牌，確保車牌的唯一性與資料完整性。",
      "en": "#175 added a duplicate license-plate check to prevent duplicate plates when creating or maintaining vehicle data, ensuring plate uniqueness and data integrity."
    },
    "options": [
      {
        "zh": "車齡上限稽核",
        "en": "Vehicle age cap"
      },
      {
        "zh": "重複車牌稽核",
        "en": "Duplicate license-plate check"
      },
      {
        "zh": "油耗稽核",
        "en": "Fuel-consumption check"
      },
      {
        "zh": "駕駛人數稽核",
        "en": "Driver-count check"
      }
    ],
    "answer": 1
  },
  {
    "id": "VEH-175-2",
    "groupId": "VEH-175",
    "variantId": "VEH-175-2",
    "groupTitle": {
      "zh": "車輛資料維護新增重複車牌稽核",
      "en": "VEH-175"
    },
    "title": {
      "zh": "#175 的稽核確保了車牌的什麼特性？",
      "en": "#175's check ensures which property of the license plate?"
    },
    "type": "fill",
    "category": {
      "zh": "資料完整性",
      "en": "Data integrity"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "#175 新增重複車牌稽核，主要確保車牌的「________性」（不可重複）。",
      "en": "#175's duplicate-plate check mainly ensures the plate's \"________ness\" (no duplicates)."
    },
    "hints": [
      {
        "zh": "同一個車牌只能有一筆。",
        "en": "A plate may have only one record."
      }
    ],
    "explanation": {
      "zh": "確保車牌的唯一性——同一車牌不可重複建立，避免後續派車、費用統計等出現對應錯誤。",
      "en": "It ensures plate uniqueness — the same plate cannot be created twice, avoiding mapping errors in later dispatch and cost reports."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "唯一",
      "unique",
      "唯一性",
      "uniqueness"
    ],
    "caseSensitive": false
  },
  {
    "id": "VEH-175-3",
    "groupId": "VEH-175",
    "variantId": "VEH-175-3",
    "groupTitle": {
      "zh": "車輛資料維護新增重複車牌稽核",
      "en": "VEH-175"
    },
    "title": {
      "zh": "只在前端做重複車牌檢查就能保證不重複嗎？",
      "en": "Does a frontend-only duplicate-plate check guarantee no duplicates?"
    },
    "type": "boolean",
    "category": {
      "zh": "資料完整性",
      "en": "Data integrity"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "只要在前端做重複車牌檢查，就能完全保證資料庫不會出現重複車牌。",
      "en": "A frontend-only duplicate-plate check fully guarantees no duplicate plates in the database."
    },
    "hints": [
      {
        "zh": "並行寫入與繞過前端都可能造成重複。",
        "en": "Concurrent writes and bypassing the frontend can still create duplicates."
      }
    ],
    "explanation": {
      "zh": "不能。前端檢查可被繞過，且兩個並行請求可能都通過檢查再寫入（競態）。要保證唯一，最可靠是資料庫唯一鍵約束，搭配後端稽核，前端僅作即時提示。",
      "en": "No. Frontend checks can be bypassed, and two concurrent requests may both pass the check then write (a race). The most reliable guarantee is a database unique constraint plus backend validation, with the frontend only for instant feedback."
    },
    "answer": false
  },
  {
    "id": "VEH-175-4",
    "groupId": "VEH-175",
    "variantId": "VEH-175-4",
    "groupTitle": {
      "zh": "車輛資料維護新增重複車牌稽核",
      "en": "VEH-175"
    },
    "title": {
      "zh": "請說明「保證車牌不重複」最可靠的多層防護設計。",
      "en": "Explain the most reliable multi-layer design to guarantee unique plates."
    },
    "type": "concept",
    "category": {
      "zh": "資料完整性",
      "en": "Data integrity"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "請說明若要確保車牌不重複，從前端到資料庫應有哪些層次的防護，以及為何不能只靠一層。",
      "en": "Explain the layers of protection from frontend to database needed to ensure unique plates, and why one layer is not enough."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "前端即時提示體驗",
        "frontend instant feedback UX"
      ],
      [
        "後端稽核不可繞過",
        "backend validation cannot be bypassed"
      ],
      [
        "DB唯一鍵為最終保證",
        "DB unique key is final guarantee"
      ],
      [
        "競態下仍可能重複",
        "需DB約束",
        "races can still duplicate",
        "need DB constraint"
      ],
      [
        "既有重複資料先清理",
        "clean existing duplicates first"
      ]
    ],
    "modelAnswer": {
      "zh": "應做多層：前端即時提示提升體驗、後端稽核作為不可繞過的把關、資料庫唯一鍵約束作為最終保證。只靠前端會被繞過、只靠應用層稽核在並行寫入下仍可能競態而重複，唯有 DB 唯一鍵能在任何情況下擋住。導入唯一約束前還要先清理既有重複資料，否則建立約束會失敗。",
      "en": "Use multiple layers: frontend instant feedback for UX, backend validation as a non-bypassable gate, and a database unique constraint as the final guarantee. Frontend-only can be bypassed; application-level checks can still race under concurrent writes; only a DB unique key blocks duplicates in all cases. Before adding the constraint, clean up existing duplicate data, or creating the constraint will fail."
    }
  },
  {
    "id": "VEH-79-1",
    "groupId": "VEH-79",
    "variantId": "VEH-79-1",
    "groupTitle": {
      "zh": "需設定/移除駕駛車輛但車輛維護列表為空",
      "en": "VEH-79"
    },
    "title": {
      "zh": "#79「需設定及移除駕駛車輛，但車輛維護列表為空」最該先確認什麼？",
      "en": "For #79 \"need to set/remove driver vehicles but the list is empty,\" what to verify first?"
    },
    "type": "choice",
    "category": {
      "zh": "問題追蹤",
      "en": "Issue tracing"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#79 反映「需設定及移除駕駛車輛，但車輛維護列表為空」。第一步最該先確認什麼？",
      "en": "#79 reports \"need to set/remove driver vehicles, but the maintenance list is empty.\" What should you verify first?"
    },
    "hints": [
      {
        "zh": "「列表為空」先分清是真的沒資料，還是被條件／權限過濾。",
        "en": "\"Empty list\" — distinguish truly no data from filtered by conditions/permissions."
      }
    ],
    "explanation": {
      "zh": "列表為空要先分清是「真的沒有資料」還是「資料被查詢條件、權限或單位範圍過濾掉」。先看後端 API 是否回傳空、SQL 的 where 條件、以及登入者的權限／單位範圍，再決定方向。",
      "en": "An empty list must first be distinguished as \"genuinely no data\" vs \"data filtered out by query conditions, permissions, or unit scope.\" Check whether the backend API returns empty, the SQL where clause, and the user's permission/unit scope before deciding."
    },
    "options": [
      {
        "zh": "直接重建所有車輛資料",
        "en": "Rebuild all vehicle data"
      },
      {
        "zh": "先改前端樣式",
        "en": "Change frontend styling first"
      },
      {
        "zh": "重啟伺服器",
        "en": "Restart the server"
      },
      {
        "zh": "確認查詢條件與權限是否把資料過濾掉，以及後端是否真的回傳空",
        "en": "Check whether query conditions/permissions filtered the data out, and whether the backend actually returns empty"
      }
    ],
    "answer": 3
  },
  {
    "id": "VEH-79-2",
    "groupId": "VEH-79",
    "variantId": "VEH-79-2",
    "groupTitle": {
      "zh": "需設定/移除駕駛車輛但車輛維護列表為空",
      "en": "VEH-79"
    },
    "title": {
      "zh": "排查「列表為空」時，最常見的非「真的沒資料」原因是被 ________ 過濾。",
      "en": "When diagnosing an empty list, the most common non-\"no data\" cause is being filtered by ________."
    },
    "type": "fill",
    "category": {
      "zh": "問題追蹤",
      "en": "Issue tracing"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "排查「列表為空」時，除了真的沒資料，最常見的原因是資料被查詢條件或 ________ 範圍過濾掉。",
      "en": "When diagnosing an empty list, besides truly no data, the most common cause is data filtered out by query conditions or ________ scope."
    },
    "hints": [
      {
        "zh": "登入者看得到的範圍。",
        "en": "The scope the logged-in user can see."
      }
    ],
    "explanation": {
      "zh": "常見原因是權限／單位範圍或查詢條件把資料過濾掉，使列表看起來為空。要對照登入者可視範圍與 SQL 條件確認。",
      "en": "A common cause is permission/unit scope or query conditions filtering data out, making the list appear empty. Compare the user's visible scope against the SQL conditions to confirm."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "權限",
      "單位",
      "權限/單位",
      "permission",
      "unit",
      "permission/unit"
    ],
    "caseSensitive": false
  },
  {
    "id": "VEH-79-3",
    "groupId": "VEH-79",
    "variantId": "VEH-79-3",
    "groupTitle": {
      "zh": "需設定/移除駕駛車輛但車輛維護列表為空",
      "en": "VEH-79"
    },
    "title": {
      "zh": "列表為空就一定代表資料庫裡真的沒有資料嗎？",
      "en": "Does an empty list necessarily mean the database truly has no data?"
    },
    "type": "boolean",
    "category": {
      "zh": "問題追蹤",
      "en": "Issue tracing"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "畫面上車輛維護列表為空，就一定代表資料庫裡真的沒有車輛資料。",
      "en": "An empty vehicle-maintenance list on screen necessarily means the database truly has no vehicle data."
    },
    "hints": [
      {
        "zh": "可能有資料但被條件／權限擋掉。",
        "en": "Data may exist but be blocked by conditions/permissions."
      }
    ],
    "explanation": {
      "zh": "不一定。資料可能存在，但被查詢條件、權限或單位範圍過濾，或前端渲染／API 回傳路徑出錯而沒顯示。要直接查 DB 與 API 回應確認資料是否真的存在。",
      "en": "Not necessarily. Data may exist but be filtered by conditions, permissions, or unit scope, or not displayed due to a frontend-render/API-path error. Query the DB and inspect the API response directly to confirm whether data exists."
    },
    "answer": false
  },
  {
    "id": "VEH-79-4",
    "groupId": "VEH-79",
    "variantId": "VEH-79-4",
    "groupTitle": {
      "zh": "需設定/移除駕駛車輛但車輛維護列表為空",
      "en": "VEH-79"
    },
    "title": {
      "zh": "請說明「列表應有資料卻為空」的系統化排查順序。",
      "en": "Explain a systematic order for diagnosing \"the list should have data but is empty.\""
    },
    "type": "concept",
    "category": {
      "zh": "問題追蹤",
      "en": "Issue tracing"
    },
    "difficulty": "senior",
    "prompt": {
      "zh": "請說明遇到 #79 這種「應該有資料、列表卻為空」的問題，你會用什麼順序由前到後排查。",
      "en": "Explain the front-to-back order you would use to diagnose a \"should have data but the list is empty\" problem like #79."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "看Network API回應是否真為空",
        "check Network API response empty or not"
      ],
      [
        "若API有資料則前端渲染問題",
        "if API has data then frontend render issue"
      ],
      [
        "若API空則查後端SQL/where條件",
        "if API empty then check backend SQL/where"
      ],
      [
        "權限/單位範圍過濾",
        "permission/unit scope filter"
      ],
      [
        "用DB直接查確認資料存在",
        "固定測試帳號",
        "query DB directly to confirm data",
        "fixed test account"
      ]
    ],
    "modelAnswer": {
      "zh": "先看瀏覽器 Network，確認 API 回應是否真的為空：若 API 有回資料、列表卻空，問題在前端渲染或繫結；若 API 回空，再往後追後端 SQL 與 where 條件、權限與單位範圍是否把資料過濾掉。同時用 SQL 直接查 DB 確認資料是否真的存在。用固定測試帳號（已知該看到資料）比對，逐層縮小到是「沒資料、被過濾、還是沒渲染」。",
      "en": "First check the browser Network tab to see whether the API response is truly empty: if the API returns data but the list is empty, the issue is frontend rendering/binding; if the API returns empty, trace back to the backend SQL/where clause and whether permission/unit scope filtered the data. In parallel, query the DB directly to confirm whether data actually exists. Use a fixed test account known to have visible data to compare, narrowing layer by layer to \"no data, filtered out, or not rendered.\""
    }
  },
  {
    "id": "ASSESS-266-1",
    "groupId": "ASSESS-266",
    "variantId": "ASSESS-266-1",
    "groupTitle": {
      "zh": "ASSESS-266",
      "en": "ASSESS-266"
    },
    "title": {
      "zh": "#266/#111「考核系統無語文能力認證資料」的關鍵根因是什麼？",
      "en": "What was the key root cause of #266/#111 \"no language-ability certification data in the assessment system\"?"
    },
    "type": "choice",
    "category": {
      "zh": "例外處理",
      "en": "Exception handling"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#266/#111 考核系統中無語文能力認證資料。AssessBaseService 的關鍵根因是？",
      "en": "In #266/#111, there was no language-ability data in the assessment system. The key cause in AssessBaseService was?"
    },
    "hints": [
      {
        "zh": "commit：加入判斷資料格式，避免 GetAbility() 外層 try-catch 回傳整批空白資訊。",
        "en": "The commit: add format checks to avoid GetAbility()'s outer try-catch returning a whole blank batch."
      }
    ],
    "explanation": {
      "zh": "根因是 GetAbility() 外層包了一個大 try-catch，只要某一筆語文資料格式異常拋例外，就整批被 catch 接住、回傳空白，使所有語文能力認證都不見。修正是加入資料格式判斷，避免單筆異常拖垮整批。",
      "en": "The cause was a large outer try-catch around GetAbility(): if any single language record had a bad format and threw, the whole batch was caught and returned blank, hiding all certifications. The fix added per-record format checks so one bad record doesn't drag down the batch."
    },
    "options": [
      {
        "zh": "資料庫沒有任何語文資料",
        "en": "The database had no language data at all"
      },
      {
        "zh": "前端沒有顯示元件",
        "en": "The frontend had no display component"
      },
      {
        "zh": "GetAbility() 外層 try-catch 在某筆資料格式異常時，回傳整批空白資訊",
        "en": "GetAbility()'s outer try-catch returned an entire batch of blank info when one record had a bad format"
      },
      {
        "zh": "權限被鎖",
        "en": "Permission was locked"
      }
    ],
    "answer": 2
  },
  {
    "id": "ASSESS-266-2",
    "groupId": "ASSESS-266",
    "variantId": "ASSESS-266-2",
    "groupTitle": {
      "zh": "ASSESS-266",
      "en": "ASSESS-266"
    },
    "title": {
      "zh": "#266/#111 把語文能力 CODE_CODE 的分類判斷從幾碼改成幾碼？",
      "en": "In #266/#111, the language CODE_CODE classification changed from how many digits to how many?"
    },
    "type": "fill",
    "category": {
      "zh": "資料處理",
      "en": "Data handling"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#266/#111 把語言能力 CODE_CODE 的分類判斷，從「________ 碼」改成「三碼」（CODE_NAME 改為語言簡稱顯示）。",
      "en": "#266/#111 changed the language CODE_CODE classification from \"________ digits\" to \"three digits\" (CODE_NAME shown as a language abbreviation)."
    },
    "hints": [
      {
        "zh": "三筆只出現一筆，是因為分類太粗（碼數不夠）。",
        "en": "Three records collapsing to one was because the classification was too coarse (too few digits)."
      }
    ],
    "explanation": {
      "zh": "原本用 CODE_CODE 前兩碼分類，粒度太粗導致「三筆語文認證只出現一筆」（不同語言被歸成同一類）。改成三碼後分類更細，CODE_NAME 也改為語言簡稱顯示。（註：此 code 三碼對應的做法後續又被移除調整。）",
      "en": "It originally classified by the first two digits of CODE_CODE, too coarse, causing \"three certifications showing as one\" (different languages grouped together). Switching to three digits made classification finer, and CODE_NAME was shown as a language abbreviation. (Note: the three-digit code mapping was later removed/adjusted.)"
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "兩",
      "二",
      "2",
      "two"
    ],
    "caseSensitive": false
  },
  {
    "id": "ASSESS-266-3",
    "groupId": "ASSESS-266",
    "variantId": "ASSESS-266-3",
    "groupTitle": {
      "zh": "ASSESS-266",
      "en": "ASSESS-266"
    },
    "title": {
      "zh": "在迴圈外層包一個大 try-catch，是處理「單筆資料異常」的好做法嗎？",
      "en": "Is wrapping a whole loop in one big outer try-catch a good way to handle \"one bad record\"?"
    },
    "type": "boolean",
    "category": {
      "zh": "例外處理",
      "en": "Exception handling"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "為了避免程式中斷，在處理多筆資料的迴圈最外層包一個大 try-catch，是處理單筆資料異常的好做法。",
      "en": "To avoid crashing, wrapping the outermost level of a multi-record loop in one big try-catch is a good way to handle a single bad record."
    },
    "hints": [
      {
        "zh": "#266 就是吃了這個虧：一筆壞，整批空白。",
        "en": "#266 was bitten by exactly this: one bad record blanked the whole batch."
      }
    ],
    "explanation": {
      "zh": "不好。外層大 try-catch 會讓「任一筆異常」整批失敗，掩蓋問題（#266 即整批回空白）。較好的做法是縮小 try 範圍、逐筆處理／驗證資料格式，讓壞的那筆被略過或標記，其餘正常顯示，並記錄錯誤。",
      "en": "Not good. A big outer try-catch makes \"any single bad record\" fail the whole batch, hiding the problem (#266 returned a blank batch). Better: narrow the try scope, process/validate per record so a bad one is skipped or flagged while the rest display normally, and log the error."
    },
    "answer": false
  },
  {
    "id": "ASSESS-266-4",
    "groupId": "ASSESS-266",
    "variantId": "ASSESS-266-4",
    "groupTitle": {
      "zh": "ASSESS-266",
      "en": "ASSESS-266"
    },
    "title": {
      "zh": "請說明「過大的 try-catch 範圍」造成的危害與正確的例外處理粒度。",
      "en": "Explain the harm of \"too broad a try-catch scope\" and the correct exception-handling granularity."
    },
    "type": "concept",
    "category": {
      "zh": "例外處理",
      "en": "Exception handling"
    },
    "difficulty": "senior",
    "prompt": {
      "zh": "請以 #266 為例，說明把 try-catch 範圍包得太大會造成什麼問題，以及處理批次資料時正確的例外粒度與防範。",
      "en": "Using #266, explain the problems caused by too broad a try-catch scope, and the correct exception granularity and safeguards when processing batch data."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "大try-catch一筆壞全批失敗",
        "big try-catch",
        "one bad fails all"
      ],
      [
        "掩蓋錯誤",
        "回空白難追查",
        "hides error",
        "blank batch hard to trace"
      ],
      [
        "逐筆try或先驗證格式",
        "per-record try or validate format first"
      ],
      [
        "壞的略過/標記",
        "其餘正常",
        "skip/flag bad",
        "rest succeed"
      ],
      [
        "記錄log不要靜默吞",
        "log",
        "don't silently swallow"
      ]
    ],
    "modelAnswer": {
      "zh": "把 try-catch 範圍包太大，任何一筆資料異常都會讓整批落入 catch 而失敗，#266 就是因此回傳整批空白，使用者以為沒資料，且錯誤被吞掉很難追查。正確的粒度是縮小 try 範圍、逐筆處理或先驗證資料格式，讓壞的那筆被略過或標記、其餘照常顯示，並把例外記錄到 log 而非靜默吞掉，這樣既不中斷整體又能定位問題資料。",
      "en": "Too broad a try-catch makes any single bad record drop the whole batch into catch and fail; #266 returned an entirely blank batch, so users thought there was no data and the swallowed error was hard to trace. The correct granularity is to narrow the try scope, process per record or validate format first, so a bad record is skipped or flagged while the rest display normally, and log the exception instead of swallowing it — keeping the whole from breaking while still pinpointing the bad data."
    }
  },
  {
    "id": "ASSESS-269-1",
    "groupId": "ASSESS-269",
    "variantId": "ASSESS-269-1",
    "groupTitle": {
      "zh": "評核表標題/條列文字修改、註記字型改 9px",
      "en": "ASSESS-269"
    },
    "title": {
      "zh": "#269 考核系統評核表的調整重點是什麼？",
      "en": "What was the focus of #269's adjustment to the assessment form?"
    },
    "type": "choice",
    "category": {
      "zh": "前端樣式",
      "en": "Frontend styling"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "#269 考核系統裡評核表的調整，主要是？",
      "en": "#269's adjustment to the assessment form was mainly?"
    },
    "hints": [
      {
        "zh": "標題、條列文字修改＋註記字型 9px。",
        "en": "Title and bullet text edits + 9px annotation font."
      }
    ],
    "explanation": {
      "zh": "#269 是版面／文字調整：修改評核表標題與條列文字，並把註記文字字型改成 9px。屬於前端顯示樣式調整，不涉及邏輯或資料。",
      "en": "#269 is a layout/text adjustment: edit the form title and bullet text and set the annotation font to 9px. It is a frontend styling change, not logic or data."
    },
    "options": [
      {
        "zh": "改資料庫結構",
        "en": "Change DB schema"
      },
      {
        "zh": "修改評核表標題、條列文字，並把註記字型改成 9px",
        "en": "Edit the form title and bullet text, and set the annotation font to 9px"
      },
      {
        "zh": "新增簽核流程",
        "en": "Add an approval flow"
      },
      {
        "zh": "調整權限",
        "en": "Adjust permissions"
      }
    ],
    "answer": 1
  },
  {
    "id": "ASSESS-269-2",
    "groupId": "ASSESS-269",
    "variantId": "ASSESS-269-2",
    "groupTitle": {
      "zh": "評核表標題/條列文字修改、註記字型改 9px",
      "en": "ASSESS-269"
    },
    "title": {
      "zh": "#269 把註記字型改成多少 px？",
      "en": "To how many px did #269 set the annotation font?"
    },
    "type": "fill",
    "category": {
      "zh": "前端樣式",
      "en": "Frontend styling"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "#269 把考核評核表的註記文字字型改成 ________ px。",
      "en": "#269 set the annotation font of the assessment form to ________ px."
    },
    "hints": [
      {
        "zh": "個位數，很小的字。",
        "en": "Single digit, a very small font."
      }
    ],
    "explanation": {
      "zh": "改成 9px。這是純前端樣式（CSS／樣式設定）調整，讓註記文字以較小字級呈現。",
      "en": "Set to 9px. This is a pure frontend styling (CSS) change, rendering annotation text at a smaller size."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "9"
    ],
    "caseSensitive": false
  },
  {
    "id": "ASSESS-269-3",
    "groupId": "ASSESS-269",
    "variantId": "ASSESS-269-3",
    "groupTitle": {
      "zh": "評核表標題/條列文字修改、註記字型改 9px",
      "en": "ASSESS-269"
    },
    "title": {
      "zh": "像 #269 這種純文字／字型調整，通常需要改後端或資料庫嗎？",
      "en": "Does a pure text/font change like #269 usually require backend or database changes?"
    },
    "type": "boolean",
    "category": {
      "zh": "前端樣式",
      "en": "Frontend styling"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "像 #269 修改標題文字、把註記字型改 9px，通常需要同時改後端邏輯與資料庫。",
      "en": "A change like #269 (editing title text, 9px annotation font) usually requires changing backend logic and the database too."
    },
    "hints": [
      {
        "zh": "多半只動前端樣式／樣板。",
        "en": "It usually only touches frontend styling/templates."
      }
    ],
    "explanation": {
      "zh": "通常不需要。文字與字型調整多半只動前端樣式或樣板檔，不涉及後端邏輯或資料庫。但仍要確認列印／匯出版面是否一致受影響。",
      "en": "Usually not. Text and font changes mostly touch frontend styling or template files, not backend logic or the database. Still, verify the print/export layout is consistently affected."
    },
    "answer": false
  },
  {
    "id": "ASSESS-269-4",
    "groupId": "ASSESS-269",
    "variantId": "ASSESS-269-4",
    "groupTitle": {
      "zh": "評核表標題/條列文字修改、註記字型改 9px",
      "en": "ASSESS-269"
    },
    "title": {
      "zh": "請說明前端字型／版面調整雖小，仍要注意哪些驗證點。",
      "en": "Explain what verification points still matter even for small font/layout changes."
    },
    "type": "concept",
    "category": {
      "zh": "前端樣式",
      "en": "Frontend styling"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "請說明像 #269 這種字型／文字版面調整雖然單純，上線前仍應檢查哪些地方。",
      "en": "Explain what to check before release for a simple font/text-layout change like #269."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "列印/PDF匯出版面是否一致",
        "print/PDF export layout consistent"
      ],
      [
        "不同瀏覽器/解析度顯示",
        "different browsers/resolutions"
      ],
      [
        "字太小可讀性/換行",
        "too small readability/wrapping"
      ],
      [
        "不影響其他共用樣式",
        "doesn't affect other shared styles"
      ],
      [
        "標題文字與需求一致",
        "title text matches requirement"
      ]
    ],
    "modelAnswer": {
      "zh": "雖然只是字型與文字調整，仍要確認：列印與 PDF 匯出的版面是否一致套用（評核表常要列印）、不同瀏覽器與解析度下的顯示、9px 是否太小影響可讀性或換行、以及該樣式是否被其他畫面共用而被波及。最後核對標題與條列文字確實符合需求文字。",
      "en": "Even a font/text change should be verified for: consistent application in print and PDF export (assessment forms are often printed), display across browsers and resolutions, whether 9px is too small for readability or causes wrapping, and whether the style is shared by other screens and thus affected. Finally confirm the title and bullet text exactly match the requirement."
    }
  },
  {
    "id": "ASSESS-139-1",
    "groupId": "ASSESS-139",
    "variantId": "ASSESS-139-1",
    "groupTitle": {
      "zh": "覆評人作業調整（多層評核流程）",
      "en": "ASSESS-139"
    },
    "title": {
      "zh": "#139「覆評人作業調整」中，「覆評」相對於「初評」的角色是什麼？",
      "en": "In #139 \"reviewer adjustment,\" what is the role of the \"re-reviewer\" relative to the \"initial reviewer\"?"
    },
    "type": "choice",
    "category": {
      "zh": "考核流程",
      "en": "Assessment workflow"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "考核系統的「覆評人」相對於「初評人」，角色通常是？",
      "en": "In the assessment system, the \"re-reviewer\" relative to the \"initial reviewer\" usually plays what role?"
    },
    "hints": [
      {
        "zh": "「覆」＝再一次、複核。",
        "en": "\"覆\" means again / re-check."
      }
    ],
    "explanation": {
      "zh": "覆評人是在初評（第一層評核）之後進行複核或第二層評核的角色。#139 調整覆評人作業，屬於考核流程中評核層級／權責的調整。",
      "en": "The re-reviewer performs a re-check or second-level assessment after the initial review. #139 adjusts the re-reviewer's operation — a change to the assessment workflow's review levels/authority."
    },
    "options": [
      {
        "zh": "在初評之後進行複核／第二層評核的人",
        "en": "The one who re-reviews / does second-level assessment after the initial review"
      },
      {
        "zh": "第一個評核的人",
        "en": "The first to assess"
      },
      {
        "zh": "只負責列印",
        "en": "Only handles printing"
      },
      {
        "zh": "與初評完全無關",
        "en": "Unrelated to the initial review"
      }
    ],
    "answer": 0
  },
  {
    "id": "ASSESS-139-2",
    "groupId": "ASSESS-139",
    "variantId": "ASSESS-139-2",
    "groupTitle": {
      "zh": "覆評人作業調整（多層評核流程）",
      "en": "ASSESS-139"
    },
    "title": {
      "zh": "考核中先做的是「初評」，之後由覆評人進行的是「____評」。",
      "en": "In assessment, the first step is \"initial review,\" then the re-reviewer does the \"____review.\""
    },
    "type": "fill",
    "category": {
      "zh": "考核流程",
      "en": "Assessment workflow"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "考核流程中先由初評人「初評」，之後由覆評人進行「________評」。",
      "en": "In the assessment flow, the initial reviewer does the \"initial review,\" then the re-reviewer does the \"____review.\""
    },
    "hints": [
      {
        "zh": "對應「覆評人」。",
        "en": "Matches \"re-reviewer (覆評人).\""
      }
    ],
    "explanation": {
      "zh": "是「覆評」。考核常採初評→覆評的多層評核，覆評人對初評結果複核，#139 即調整覆評人這一層的作業。",
      "en": "It is \"re-review.\" Assessment often uses initial-then-re-review multi-level evaluation; the re-reviewer checks the initial result, and #139 adjusts the re-reviewer's operation."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "覆",
      "re",
      "re-review"
    ],
    "caseSensitive": false
  },
  {
    "id": "ASSESS-139-3",
    "groupId": "ASSESS-139",
    "variantId": "ASSESS-139-3",
    "groupTitle": {
      "zh": "覆評人作業調整（多層評核流程）",
      "en": "ASSESS-139"
    },
    "title": {
      "zh": "調整「覆評人作業」時，可以忽略它對既有考核流程其他層級的影響嗎？",
      "en": "When adjusting \"re-reviewer operation,\" can you ignore its impact on other levels of the existing flow?"
    },
    "type": "boolean",
    "category": {
      "zh": "考核流程",
      "en": "Assessment workflow"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "調整覆評人作業時，因為只動到覆評這一層，所以不必考慮對初評或後續關卡的影響。",
      "en": "When adjusting the re-reviewer's operation, since only the re-review level is touched, there is no need to consider the impact on the initial review or later stages."
    },
    "hints": [
      {
        "zh": "評核是連動流程，動一層常影響前後關卡的權責與資料。",
        "en": "Assessment is a linked flow; changing one level often affects adjacent stages' authority and data."
      }
    ],
    "explanation": {
      "zh": "不對。考核是多層連動流程，調整覆評人作業可能影響初評資料的承接、後續關卡的權責與顯示。需確認整條流程的權責、可編輯範圍與資料流仍一致。",
      "en": "No. Assessment is a multi-level linked flow; changing the re-reviewer's operation can affect how initial-review data is carried forward and the authority/display of later stages. Verify that authority, editable scope, and data flow remain consistent across the whole flow."
    },
    "answer": false
  },
  {
    "id": "ASSESS-139-4",
    "groupId": "ASSESS-139",
    "variantId": "ASSESS-139-4",
    "groupTitle": {
      "zh": "覆評人作業調整（多層評核流程）",
      "en": "ASSESS-139"
    },
    "title": {
      "zh": "請說明調整多層評核流程（如覆評人作業）時的注意事項。",
      "en": "Explain what to watch for when adjusting a multi-level assessment flow (e.g. re-reviewer operation)."
    },
    "type": "concept",
    "category": {
      "zh": "考核流程",
      "en": "Assessment workflow"
    },
    "difficulty": "senior",
    "prompt": {
      "zh": "請說明像 #139 調整覆評人作業這類「動到多層評核流程」的需求，應釐清與驗證哪些面向。",
      "en": "Explain what aspects to clarify and verify when a requirement adjusts a multi-level assessment flow, like #139's re-reviewer change."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "釐清各層權責",
        "誰可評/可改",
        "clarify each level's authority",
        "who can assess/edit"
      ],
      [
        "初評到覆評的資料承接",
        "data carried from initial to re-review"
      ],
      [
        "權限與可編輯範圍",
        "permission and editable scope"
      ],
      [
        "流程順序與關卡",
        "flow order and stages"
      ],
      [
        "測試各角色情境並回歸",
        "test each role scenario and regression"
      ]
    ],
    "modelAnswer": {
      "zh": "先釐清各評核層級的權責——誰能評、誰能改、覆評人能否覆寫初評。確認初評到覆評的資料如何承接、權限與可編輯範圍是否正確、流程順序與關卡是否受影響。實作後要以不同角色（初評人、覆評人）的情境分別測試，確認看得到的資料與可做的操作符合需求，並回歸既有考核案例確保前後關卡不被波及。",
      "en": "First clarify each level's authority — who can assess, who can edit, whether the re-reviewer may override the initial review. Confirm how data is carried from initial to re-review, that permissions and editable scope are correct, and that flow order/stages are unaffected. After implementation, test scenarios for each role (initial reviewer, re-reviewer) to confirm visible data and allowed actions match the requirement, and regression-test existing assessment cases so adjacent stages aren't disturbed."
    }
  },
  {
    "id": "SUBSIDY-135-1",
    "groupId": "SUBSIDY-135",
    "variantId": "SUBSIDY-135-1",
    "groupTitle": {
      "zh": "SUBSIDY-135",
      "en": "SUBSIDY-135"
    },
    "title": {
      "zh": "#135/#136 子女教育補助「狀態判斷 bug」的根本困難是什麼？",
      "en": "What was the underlying difficulty behind #135/#136's \"status judgment bug\"?"
    },
    "type": "choice",
    "category": {
      "zh": "狀態判斷",
      "en": "State determination"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#135/#136 修正子女教育補助的狀態判斷 bug，根本困難在於？",
      "en": "In #135/#136, the status-judgment bug for child-education subsidy stemmed from?"
    },
    "hints": [
      {
        "zh": "commit：沒有涵蓋全部狀態的單一欄位，要靠 humef_status、humef_exportdate 判斷。",
        "en": "The commit: no single field covers all states; status is judged from humef_status and humef_exportdate."
      }
    ],
    "explanation": {
      "zh": "根本困難是系統沒有一個能涵蓋全部狀態的單一欄位，因此各功能只能依實際處理，用 humef_status 與 humef_exportdate 等多個欄位組合來推斷狀態，容易判斷不一致而出 bug。",
      "en": "The core difficulty is the absence of a single field covering all states, so each feature must infer status from a combination of fields like humef_status and humef_exportdate — making inconsistent judgments and bugs likely."
    },
    "options": [
      {
        "zh": "狀態欄位太多",
        "en": "Too many status fields"
      },
      {
        "zh": "前端沒有狀態下拉",
        "en": "The frontend lacks a status dropdown"
      },
      {
        "zh": "資料庫不支援狀態",
        "en": "The DB doesn't support status"
      },
      {
        "zh": "目前沒有「涵蓋全部狀態的單一欄位」，只能靠多個欄位組合判斷",
        "en": "There is no single field covering all states, so status must be inferred from multiple fields"
      }
    ],
    "answer": 3
  },
  {
    "id": "SUBSIDY-135-2",
    "groupId": "SUBSIDY-135",
    "variantId": "SUBSIDY-135-2",
    "groupTitle": {
      "zh": "SUBSIDY-135",
      "en": "SUBSIDY-135"
    },
    "title": {
      "zh": "#135/#136 用來判斷狀態的兩個欄位是 humef_status 與 ________？",
      "en": "Which two fields does #135/#136 use to judge status — humef_status and ________?"
    },
    "type": "fill",
    "category": {
      "zh": "狀態判斷",
      "en": "State determination"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#135/#136 因無單一狀態欄位，改以 humef_status 與 ________ 來判斷單據狀態。",
      "en": "Lacking a single status field, #135/#136 judges the document status using humef_status and ________."
    },
    "hints": [
      {
        "zh": "一個是狀態碼，一個是「匯出／核銷日期」。",
        "en": "One is a status code, one is the \"export/write-off date.\""
      }
    ],
    "explanation": {
      "zh": "是 humef_exportdate（匯出／核銷日期）。配合 humef_status，用「有沒有匯出日期」等條件組合判斷單據處於哪個狀態。",
      "en": "It is humef_exportdate (export/write-off date). Combined with humef_status, conditions like \"has an export date\" are used to determine which state the document is in."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "humef_exportdate"
    ],
    "caseSensitive": false
  },
  {
    "id": "SUBSIDY-135-3",
    "groupId": "SUBSIDY-135",
    "variantId": "SUBSIDY-135-3",
    "groupTitle": {
      "zh": "SUBSIDY-135",
      "en": "SUBSIDY-135"
    },
    "title": {
      "zh": "子女教育補助在「核銷後」還可以修改申請單內容嗎？",
      "en": "Can the child-education subsidy form be edited after write-off?"
    },
    "type": "boolean",
    "category": {
      "zh": "狀態判斷",
      "en": "State determination"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "依 #135/#136，承辦核銷後仍可繼續修改子女教育補助的申請單內容。",
      "en": "Per #135/#136, the handler can still edit the child-education subsidy form after write-off."
    },
    "hints": [
      {
        "zh": "核銷是最後修改機會，核銷後不允許再改。",
        "en": "Write-off is the last chance to edit; after it, no more edits."
      }
    ],
    "explanation": {
      "zh": "不行。#135/#136 明定承辦核銷為最後修改機會，核銷後不允許再修改申請單內容。這也需要靠正確的狀態判斷來鎖定。",
      "en": "No. #135/#136 specifies write-off is the last chance to edit; after write-off, the form content cannot be changed. This also relies on correct status determination to lock it."
    },
    "answer": false
  },
  {
    "id": "SUBSIDY-135-4",
    "groupId": "SUBSIDY-135",
    "variantId": "SUBSIDY-135-4",
    "groupTitle": {
      "zh": "SUBSIDY-135",
      "en": "SUBSIDY-135"
    },
    "title": {
      "zh": "請說明「沒有單一狀態欄位」時，狀態判斷為何易錯與如何穩健處理。",
      "en": "Explain why status judgment is error-prone without a single status field, and how to handle it robustly."
    },
    "type": "concept",
    "category": {
      "zh": "狀態判斷",
      "en": "State determination"
    },
    "difficulty": "senior",
    "prompt": {
      "zh": "請說明像 #135/#136「沒有涵蓋全部狀態的單一欄位、要靠多欄位組合判斷」時，為什麼容易出錯，以及你會如何讓判斷穩健一致。",
      "en": "Explain why status judgment is error-prone when there is \"no single field covering all states and status must be inferred from multiple fields,\" as in #135/#136, and how you would make it robust and consistent."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "多欄位組合",
        "各功能各判各的易不一致",
        "multi-field combination",
        "each feature judges differently",
        "inconsistent"
      ],
      [
        "漏掉某種狀態組合",
        "misses some state combination"
      ],
      [
        "集中成共用判斷/單一來源",
        "centralize into shared logic/single source"
      ],
      [
        "列出完整狀態真值表",
        "enumerate full state truth table"
      ],
      [
        "鎖定核銷後不可改",
        "測各狀態",
        "lock after write-off",
        "test each state"
      ]
    ],
    "modelAnswer": {
      "zh": "因為要靠多個欄位（humef_status、humef_exportdate…）的組合推斷狀態，各功能各自判斷時容易不一致，也可能漏掉某種欄位組合而判錯。穩健的做法是把狀態判斷集中成共用方法／單一來源，先列出完整的狀態真值表（哪些欄位組合對應哪個狀態），所有功能都呼叫同一套邏輯；並針對「核銷後不可修改」等規則明確鎖定。測試要涵蓋每一種狀態與邊界組合，確保各畫面判斷一致。",
      "en": "Because status is inferred from a combination of fields (humef_status, humef_exportdate, …), each feature judging on its own easily becomes inconsistent and may miss some field combination and misjudge. The robust approach is to centralize status judgment into a shared method/single source, first enumerating a full state truth table (which field combinations map to which state) and having all features call the same logic; and explicitly lock rules like \"no edit after write-off.\" Test every state and boundary combination to ensure all screens judge consistently."
    }
  },
  {
    "id": "SUBSIDY-133-1",
    "groupId": "SUBSIDY-133",
    "variantId": "SUBSIDY-133-1",
    "groupTitle": {
      "zh": "核銷可編輯→需保存操作紀錄（變更前後都存；批次核銷不改資料另計）",
      "en": "SUBSIDY-133"
    },
    "title": {
      "zh": "#133 為什麼核銷時要保存操作紀錄？",
      "en": "Why does #133 require saving an operation log during write-off?"
    },
    "type": "choice",
    "category": {
      "zh": "稽核軌跡",
      "en": "Audit trail"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#133 子女教育補助費核銷，為什麼需要保存操作紀錄？",
      "en": "In #133, why must an operation log be saved during child-education subsidy write-off?"
    },
    "hints": [
      {
        "zh": "commit：核銷可以編輯申請單內容，資料有變動的話，變更前後都要存。",
        "en": "The commit: write-off can edit the form; if data changes, save before and after."
      }
    ],
    "explanation": {
      "zh": "因為核銷時承辦可以編輯申請單內容，屬於「會改動資料」的操作，所以需保存操作紀錄，且資料有變動時要把變更前、後的值都存下來，留下可追溯的稽核軌跡。",
      "en": "Because during write-off the handler can edit the form — a data-changing operation — an operation log is needed, and when data changes both the before and after values must be saved, leaving a traceable audit trail."
    },
    "options": [
      {
        "zh": "核銷不會改資料但仍要記",
        "en": "Write-off changes nothing but must be logged"
      },
      {
        "zh": "因為核銷時可以編輯申請單內容，資料有變動就要把變更前後都存下來",
        "en": "Because write-off allows editing the form, so when data changes, before and after must be saved"
      },
      {
        "zh": "只為了統計次數",
        "en": "Only to count occurrences"
      },
      {
        "zh": "法律強制每筆都要錄影",
        "en": "The law mandates recording every action"
      }
    ],
    "answer": 1
  },
  {
    "id": "SUBSIDY-133-2",
    "groupId": "SUBSIDY-133",
    "variantId": "SUBSIDY-133-2",
    "groupTitle": {
      "zh": "核銷可編輯→需保存操作紀錄（變更前後都存；批次核銷不改資料另計）",
      "en": "SUBSIDY-133"
    },
    "title": {
      "zh": "#133 中，資料有變動時要保存變更「前」與變更「____」的值。",
      "en": "In #133, when data changes, save the \"before\" and \"____\" values."
    },
    "type": "fill",
    "category": {
      "zh": "稽核軌跡",
      "en": "Audit trail"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "#133 規定資料有變動時，要把變更「前」與變更「________」的值都存下來。",
      "en": "#133 requires saving both the \"before\" and \"____\" values when data changes."
    },
    "hints": [
      {
        "zh": "才能完整重建這次改了什麼。",
        "en": "So you can fully reconstruct what changed."
      }
    ],
    "explanation": {
      "zh": "是變更「後」。同時保存變更前與變更後的值，才能完整呈現這次操作改了什麼，符合稽核可追溯的要求。",
      "en": "It is \"after.\" Saving both before and after values fully captures what the operation changed, meeting the requirement for a traceable audit trail."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "後",
      "after"
    ],
    "caseSensitive": false
  },
  {
    "id": "SUBSIDY-133-3",
    "groupId": "SUBSIDY-133",
    "variantId": "SUBSIDY-133-3",
    "groupTitle": {
      "zh": "核銷可編輯→需保存操作紀錄（變更前後都存；批次核銷不改資料另計）",
      "en": "SUBSIDY-133"
    },
    "title": {
      "zh": "#133 中「批次核銷」和一般核銷的操作紀錄處理相同嗎？",
      "en": "In #133, is batch write-off's log handling the same as normal write-off?"
    },
    "type": "boolean",
    "category": {
      "zh": "稽核軌跡",
      "en": "Audit trail"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "依 #133，批次核銷和一般核銷一樣會改動資料，所以操作紀錄處理方式完全相同。",
      "en": "Per #133, batch write-off changes data just like normal write-off, so its log handling is identical."
    },
    "hints": [
      {
        "zh": "批次核銷不會改動資料，所以與核銷分開處理。",
        "en": "Batch write-off doesn't change data, so it's handled separately."
      }
    ],
    "explanation": {
      "zh": "不同。#133 指出批次核銷不會改動資料，因此操作紀錄與（會改資料的）核銷分開處理——只有真的有資料變動時才需要存變更前後值。",
      "en": "Different. #133 notes batch write-off does not change data, so its logging is separated from (data-changing) write-off — before/after values are saved only when data actually changes."
    },
    "answer": false
  },
  {
    "id": "SUBSIDY-133-4",
    "groupId": "SUBSIDY-133",
    "variantId": "SUBSIDY-133-4",
    "groupTitle": {
      "zh": "核銷可編輯→需保存操作紀錄（變更前後都存；批次核銷不改資料另計）",
      "en": "SUBSIDY-133"
    },
    "title": {
      "zh": "請說明「可編輯的核銷」應如何設計稽核軌跡。",
      "en": "Explain how to design the audit trail for an \"editable write-off.\""
    },
    "type": "concept",
    "category": {
      "zh": "稽核軌跡",
      "en": "Audit trail"
    },
    "difficulty": "senior",
    "prompt": {
      "zh": "請說明像 #133「核銷時可編輯申請單」這種會改資料的操作，應如何設計操作／稽核紀錄才完整又不冗餘。",
      "en": "Explain how to design an operation/audit log for a data-changing operation like #133 (editable write-off) so it is complete yet not redundant."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "有變動才記",
        "變更前後值",
        "log only on change",
        "before-after values"
      ],
      [
        "不改資料的批次操作分開或不記",
        "separate or skip no-change batch ops"
      ],
      [
        "記錄人/時間/動作",
        "record who/when/action"
      ],
      [
        "可追溯誰在何時改了什麼",
        "traceable who changed what when"
      ],
      [
        "避免重複/冗餘紀錄",
        "avoid duplicate/redundant logs"
      ]
    ],
    "modelAnswer": {
      "zh": "設計原則是「有變動才記、且記下變更前後值」。對會改資料的核銷，每次有欄位變動就保存變更前與變更後的值，並記錄操作人、時間與動作，達到「誰在何時改了什麼」可追溯。對不改資料的操作（如 #133 的批次核銷）則與核銷紀錄分開處理或不重複記錄，避免產生大量無意義的冗餘紀錄。",
      "en": "The principle is \"log only when something changes, recording before and after values.\" For data-changing write-offs, whenever a field changes, save its before and after values along with the operator, timestamp, and action, achieving traceability of \"who changed what when.\" For non-changing operations (like #133's batch write-off), handle them separately from or skip the write-off log to avoid generating large amounts of meaningless redundant records."
    }
  },
  {
    "id": "SUBSIDY-54-1",
    "groupId": "SUBSIDY-54",
    "variantId": "SUBSIDY-54-1",
    "groupTitle": {
      "zh": "生活津貼（結婚/喪葬/生育）申請頁與列印頁皆未帶出俸點資料",
      "en": "SUBSIDY-54"
    },
    "title": {
      "zh": "#54 生活津貼補助（結婚、喪葬、生育）的問題是什麼？",
      "en": "What was the problem in #54 for living-allowance subsidies (marriage, funeral, birth)?"
    },
    "type": "choice",
    "category": {
      "zh": "資料帶出",
      "en": "Data population"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#54 生活津貼補助（結婚、喪葬、生育），在哪些頁面出現什麼問題？",
      "en": "In #54, on which pages and what problem occurred for the living-allowance subsidies?"
    },
    "hints": [
      {
        "zh": "commit：申請頁面、列印頁面皆無帶出俸點資料。",
        "en": "The commit: both the application and print pages failed to show salary-point data."
      }
    ],
    "explanation": {
      "zh": "#54 的問題是生活津貼補助的申請頁面與列印頁面都沒有帶出「俸點」資料。津貼金額常依俸點計算，缺俸點會導致顯示／計算不正確。",
      "en": "#54's problem was that both the application and print pages failed to populate \"salary-point\" data for living-allowance subsidies. Since allowance amounts often derive from salary points, missing them causes incorrect display/calculation."
    },
    "options": [
      {
        "zh": "只有列印頁面缺資料",
        "en": "Only the print page lacked data"
      },
      {
        "zh": "金額計算錯誤",
        "en": "Wrong amount"
      },
      {
        "zh": "申請頁面與列印頁面皆未帶出俸點資料",
        "en": "Both the application page and print page failed to populate salary-point data"
      },
      {
        "zh": "無法送出申請",
        "en": "Cannot submit"
      }
    ],
    "answer": 2
  },
  {
    "id": "SUBSIDY-54-2",
    "groupId": "SUBSIDY-54",
    "variantId": "SUBSIDY-54-2",
    "groupTitle": {
      "zh": "生活津貼（結婚/喪葬/生育）申請頁與列印頁皆未帶出俸點資料",
      "en": "SUBSIDY-54"
    },
    "title": {
      "zh": "#54 兩個頁面都沒帶出的是哪一種資料？",
      "en": "What kind of data did both pages in #54 fail to populate?"
    },
    "type": "fill",
    "category": {
      "zh": "資料帶出",
      "en": "Data population"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "#54 中，申請頁面與列印頁面都沒有帶出「________」資料（津貼金額常依此計算）。",
      "en": "In #54, both the application and print pages failed to populate \"________\" data (allowance amounts often depend on it)."
    },
    "hints": [
      {
        "zh": "公務人員薪資計算的基準點數。",
        "en": "The point value that civil-servant pay is based on."
      }
    ],
    "explanation": {
      "zh": "是「俸點」資料。俸點是公務人員薪資的計算基準，津貼金額常依俸點換算，兩頁面都漏帶會造成顯示與計算錯誤。",
      "en": "It is \"salary-point\" data. Salary points are the basis for civil-servant pay, and allowance amounts are often converted from them; missing them on both pages causes display and calculation errors."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "俸點",
      "salary point",
      "salary points"
    ],
    "caseSensitive": false
  },
  {
    "id": "SUBSIDY-54-3",
    "groupId": "SUBSIDY-54",
    "variantId": "SUBSIDY-54-3",
    "groupTitle": {
      "zh": "生活津貼（結婚/喪葬/生育）申請頁與列印頁皆未帶出俸點資料",
      "en": "SUBSIDY-54"
    },
    "title": {
      "zh": "申請頁與列印頁同時缺同一種資料，比較可能是各自的 bug 還是共用來源問題？",
      "en": "When the application and print pages both lack the same data, is it more likely two separate bugs or a shared-source problem?"
    },
    "type": "boolean",
    "category": {
      "zh": "問題追蹤",
      "en": "Issue tracing"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "申請頁面與列印頁面同時都沒帶出俸點，比較可能是兩頁面各自獨立壞掉，而非共用的取數來源出問題。",
      "en": "Both the application and print pages missing salary points is more likely two independent breakages than a shared data-source problem."
    },
    "hints": [
      {
        "zh": "兩頁同缺同一種資料，先懷疑共用的取數來源。",
        "en": "Two pages missing the same data — first suspect the shared data source."
      }
    ],
    "explanation": {
      "zh": "不對。兩個頁面同時缺同一種資料，更可能是它們共用的取數來源／服務沒正確回傳俸點，而非各自獨立壞掉。應優先檢查共用的資料取得邏輯。",
      "en": "No. Both pages missing the same data more likely points to a shared data source/service not returning salary points correctly, rather than two independent breakages. Check the shared data-fetch logic first."
    },
    "answer": false
  },
  {
    "id": "SUBSIDY-54-4",
    "groupId": "SUBSIDY-54",
    "variantId": "SUBSIDY-54-4",
    "groupTitle": {
      "zh": "生活津貼（結婚/喪葬/生育）申請頁與列印頁皆未帶出俸點資料",
      "en": "SUBSIDY-54"
    },
    "title": {
      "zh": "請說明你會如何追「俸點沒帶出」並避免改 A 壞 B。",
      "en": "Explain how you would trace \"salary points not populated\" and avoid fixing A while breaking B."
    },
    "type": "concept",
    "category": {
      "zh": "問題追蹤",
      "en": "Issue tracing"
    },
    "difficulty": "senior",
    "prompt": {
      "zh": "請說明遇到 #54「申請頁與列印頁都沒帶出俸點」，你會如何定位共用根因並安全修正。",
      "en": "Explain how, for #54 (both pages missing salary points), you would locate the shared root cause and fix it safely."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "兩頁同缺",
        "先查共用取數來源/服務",
        "both pages missing",
        "check shared fetch source/service"
      ],
      [
        "確認俸點查詢條件/關聯是否正確",
        "verify salary-point query/join correct"
      ],
      [
        "API回應是否有俸點",
        "API response contains salary points"
      ],
      [
        "修共用點要回歸兩頁",
        "fixing shared point",
        "regress both pages"
      ],
      [
        "固定測試員工驗證前後",
        "fixed test employee",
        "verify before/after"
      ]
    ],
    "modelAnswer": {
      "zh": "因為兩頁面同缺同一資料，先假設是共用的取數來源或服務沒正確回傳俸點，從 API／服務層確認回應裡有沒有俸點、查詢條件與關聯（員工↔俸點）是否正確。找到共用根因後在該處修正，但要注意這是兩頁共用點，改完必須同時回歸申請頁與列印頁、以及其他可能共用同來源的功能。用已知有俸點的固定測試員工，比對修正前後兩頁都正確帶出。",
      "en": "Since both pages miss the same data, first assume a shared fetch source or service isn't returning salary points correctly; check at the API/service layer whether the response contains salary points and whether the query conditions and joins (employee↔salary point) are correct. After finding the shared root cause, fix it there, but because it is a shared point, regression-test both the application and print pages plus any other features using the same source. Use a fixed test employee known to have salary points to confirm both pages populate correctly before and after."
    }
  },
  {
    "id": "API-198-1",
    "groupId": "API-198",
    "variantId": "API-198-1",
    "groupTitle": {
      "zh": "對外 API 出勤記錄沒傳回值（查詢人員補上在職且未刪除條件）",
      "en": "API-198"
    },
    "title": {
      "zh": "#198「EIP 呼叫差勤出勤記錄沒傳回值」的修正是什麼？",
      "en": "What was the fix for #198 \"EIP calling the attendance API returns nothing\"?"
    },
    "type": "choice",
    "category": {
      "zh": "介接・查詢條件",
      "en": "Integration / query condition"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#198 對外 api，本部 EIP 呼叫差勤出勤記錄卻沒傳回值。修正方向是？",
      "en": "In #198, EIP calling the attendance-record API returned nothing. The fix was?"
    },
    "hints": [
      {
        "zh": "commit：查詢人員加上在職且未刪除條件。",
        "en": "The commit: add \"active and not deleted\" to the person query."
      }
    ],
    "explanation": {
      "zh": "修正是查詢人員時加上「在職且未刪除」的條件。原本可能因撈到已離職／已刪除或條件不對而沒正確對應到人員，導致出勤記錄傳不回值。",
      "en": "The fix added an \"active and not deleted\" condition to the person query. Previously it might match leavers/deleted records or use wrong conditions, failing to map to the person and returning no attendance records."
    },
    "options": [
      {
        "zh": "加大逾時時間",
        "en": "Increase the timeout"
      },
      {
        "zh": "增加重試次數",
        "en": "Add retries"
      },
      {
        "zh": "改用非同步呼叫",
        "en": "Use async calls"
      },
      {
        "zh": "查詢人員加上「在職且未刪除」的條件",
        "en": "Add an \"active and not deleted\" condition to the person query"
      }
    ],
    "answer": 3
  },
  {
    "id": "API-198-2",
    "groupId": "API-198",
    "variantId": "API-198-2",
    "groupTitle": {
      "zh": "對外 API 出勤記錄沒傳回值（查詢人員補上在職且未刪除條件）",
      "en": "API-198"
    },
    "title": {
      "zh": "#198 查詢人員補上的兩個條件是「在職」與「未 ____」。",
      "en": "The two conditions #198 added to the person query are \"active\" and \"not ____.\""
    },
    "type": "fill",
    "category": {
      "zh": "介接・查詢條件",
      "en": "Integration / query condition"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "#198 查詢人員時補上的兩個條件是「在職」與「未 ________」。",
      "en": "The two conditions #198 added to the person query are \"active\" and \"not ________.\""
    },
    "hints": [
      {
        "zh": "常見的軟刪除旗標。",
        "en": "A common soft-delete flag."
      }
    ],
    "explanation": {
      "zh": "是「未刪除」。常見以軟刪除旗標標記資料，查詢時若沒排除已刪除（與非在職）人員，就可能對應錯誤或撈不到正確出勤資料。",
      "en": "It is \"not deleted.\" Data is often soft-deleted via a flag; if the query doesn't exclude deleted (and non-active) people, it can map incorrectly or fail to fetch the right attendance data."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "刪除",
      "deleted"
    ],
    "caseSensitive": false
  },
  {
    "id": "API-198-3",
    "groupId": "API-198",
    "variantId": "API-198-3",
    "groupTitle": {
      "zh": "對外 API 出勤記錄沒傳回值（查詢人員補上在職且未刪除條件）",
      "en": "API-198"
    },
    "title": {
      "zh": "對外 API 沒傳回值，一定是出勤資料不存在嗎？",
      "en": "If the external API returns nothing, must the attendance data not exist?"
    },
    "type": "boolean",
    "category": {
      "zh": "介接・查詢條件",
      "en": "Integration / query condition"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "對外 API 呼叫差勤出勤記錄沒傳回值，就一定是該員根本沒有出勤資料。",
      "en": "If the external attendance API returns nothing, the employee must simply have no attendance data."
    },
    "hints": [
      {
        "zh": "#198 是查詢條件（人員對應）有問題，不是沒資料。",
        "en": "#198 was a query-condition (person matching) issue, not missing data."
      }
    ],
    "explanation": {
      "zh": "不一定。#198 顯示沒傳回值可能是查詢人員的條件不對（沒加在職／未刪除），對應不到正確人員，而非真的沒有出勤資料。要先確認查詢條件與人員對應是否正確。",
      "en": "Not necessarily. #198 shows a no-return can be caused by wrong person-query conditions (missing active/not-deleted), failing to match the right person — not genuinely missing data. First verify the query conditions and person mapping."
    },
    "answer": false
  },
  {
    "id": "API-198-4",
    "groupId": "API-198",
    "variantId": "API-198-4",
    "groupTitle": {
      "zh": "對外 API 出勤記錄沒傳回值（查詢人員補上在職且未刪除條件）",
      "en": "API-198"
    },
    "title": {
      "zh": "請說明對外介接 API「查無資料」時的排查重點。",
      "en": "Explain the diagnostic focus when an external integration API \"finds no data.\""
    },
    "type": "concept",
    "category": {
      "zh": "介接・查詢條件",
      "en": "Integration / query condition"
    },
    "difficulty": "senior",
    "prompt": {
      "zh": "請說明像 #198 這種對外 API 呼叫卻查無／沒傳回資料，你會如何分層排查並找出根因。",
      "en": "Explain how you would diagnose, layer by layer, an external API call like #198 that returns no data, and find the root cause."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "確認傳入參數/識別碼正確",
        "verify input params/identifier correct"
      ],
      [
        "查詢條件",
        "在職/未刪除/單位範圍",
        "query conditions",
        "active/not deleted/scope"
      ],
      [
        "人員對應是否撈到正確人",
        "person mapping matches right person"
      ],
      [
        "直接用SQL重跑查詢比對",
        "rerun query in SQL to compare"
      ],
      [
        "區分真的沒資料vs條件過濾",
        "distinguish truly no data vs filtered"
      ]
    ],
    "modelAnswer": {
      "zh": "先確認呼叫端傳入的參數與識別碼正確（對到的是同一個人）。接著檢查後端查詢條件——是否因在職／未刪除／單位範圍等條件把人員或資料過濾掉（#198 即缺在職與未刪除條件）。用 SQL 直接重跑該查詢，比對加不加條件的差異，確認人員對應是否撈到正確的人。最後區分究竟是「真的沒資料」還是「條件過濾掉」，再對症修正並回歸介接。",
      "en": "First verify the caller's input parameters and identifiers are correct (matching the same person). Then check the backend query conditions — whether active/not-deleted/unit-scope conditions filtered out the person or data (#198 lacked active and not-deleted). Rerun the query directly in SQL, comparing with and without conditions to confirm whether the person mapping fetched the right person. Finally distinguish \"truly no data\" from \"filtered out,\" fix accordingly, and regression-test the integration."
    }
  },
  {
    "id": "API-182-1",
    "groupId": "API-182",
    "variantId": "API-182-1",
    "groupTitle": {
      "zh": "人事行政總處差勤平台報送格式調整、擴充未休假加班資料、paytype 下拉",
      "en": "API-182"
    },
    "title": {
      "zh": "#182 差勤平台資料介接的主要調整是什麼？",
      "en": "What was the main adjustment in #182's attendance-platform integration?"
    },
    "type": "choice",
    "category": {
      "zh": "介接・格式",
      "en": "Integration / format"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#182 本部（人事行政總處）差勤平台資料介接，主要調整為？",
      "en": "In #182, the main adjustment to the MOI (DGPA) attendance-platform integration was?"
    },
    "hints": [
      {
        "zh": "commit：調整資料報送介接傳輸格式，擴充未休假加班資料。",
        "en": "The commit: adjust the report transmission format and add un-taken-leave overtime data."
      }
    ],
    "explanation": {
      "zh": "#182 調整對人事行政總處差勤平台的資料報送傳輸格式，擴充未休假加班資料、並微調差假與加班資料；同時休假保留天數設定擴充了請領類型 paytype 下拉與批次修改。",
      "en": "#182 adjusted the transmission format for reporting to the DGPA attendance platform, added un-taken-leave overtime data, and tweaked leave/overtime data; it also extended the leave-carryover setting with a paytype dropdown and batch editing."
    },
    "options": [
      {
        "zh": "調整資料報送介接傳輸格式，並擴充未休假加班資料、微調差假與加班資料",
        "en": "Adjust the report transmission format, add un-taken-leave overtime data, and tweak leave and overtime data"
      },
      {
        "zh": "改用新資料庫",
        "en": "Switch to a new database"
      },
      {
        "zh": "移除介接",
        "en": "Remove the integration"
      },
      {
        "zh": "只改前端畫面",
        "en": "Only change the frontend"
      }
    ],
    "answer": 0
  },
  {
    "id": "API-182-2",
    "groupId": "API-182",
    "variantId": "API-182-2",
    "groupTitle": {
      "zh": "人事行政總處差勤平台報送格式調整、擴充未休假加班資料、paytype 下拉",
      "en": "API-182"
    },
    "title": {
      "zh": "#182 休假保留天數設定擴充了哪個下拉選單？",
      "en": "Which dropdown did #182 add to the leave-carryover setting?"
    },
    "type": "fill",
    "category": {
      "zh": "介接・格式",
      "en": "Integration / format"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#182 在休假保留天數設定中，擴充了請領類型 ________ 的下拉選單，並新增批次修改。",
      "en": "In #182, the leave-carryover setting added a dropdown for the claim type ________, plus batch editing."
    },
    "hints": [
      {
        "zh": "英文欄名，pay + type。",
        "en": "The English field name, pay + type."
      }
    ],
    "explanation": {
      "zh": "是 paytype（請領類型）。擴充下拉選單讓使用者選擇請領類型，並在表格下方新增批次修改設定，方便一次調整多筆。",
      "en": "It is paytype (claim type). The dropdown lets users choose a claim type, and batch editing was added below the table to adjust many rows at once."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "paytype"
    ],
    "caseSensitive": false
  },
  {
    "id": "API-182-3",
    "groupId": "API-182",
    "variantId": "API-182-3",
    "groupTitle": {
      "zh": "人事行政總處差勤平台報送格式調整、擴充未休假加班資料、paytype 下拉",
      "en": "API-182"
    },
    "title": {
      "zh": "調整對外報送的「傳輸格式」時，可以不顧對方平台的規格嗎？",
      "en": "When adjusting the outbound \"transmission format,\" can you ignore the receiving platform's spec?"
    },
    "type": "boolean",
    "category": {
      "zh": "介接・格式",
      "en": "Integration / format"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "調整差勤平台資料報送的傳輸格式時，只要我方系統能產生即可，不必嚴格符合對方平台規格。",
      "en": "When adjusting the attendance-platform report format, it's enough that our system can produce it; strictly matching the receiving platform's spec isn't necessary."
    },
    "hints": [
      {
        "zh": "介接是雙方約定，格式不合對方就無法解析。",
        "en": "Integration is a mutual contract; a mismatched format can't be parsed by the other side."
      }
    ],
    "explanation": {
      "zh": "不對。介接傳輸格式是雙方約定，必須嚴格符合接收平台（人事行政總處）的規格，否則對方無法正確解析或拒收。調整格式時要以對方規格為準並充分驗證。",
      "en": "No. The integration format is a mutual contract and must strictly match the receiving platform's (DGPA) spec, or it cannot be parsed or will be rejected. Adjust to their spec and validate thoroughly."
    },
    "answer": false
  },
  {
    "id": "API-182-4",
    "groupId": "API-182",
    "variantId": "API-182-4",
    "groupTitle": {
      "zh": "人事行政總處差勤平台報送格式調整、擴充未休假加班資料、paytype 下拉",
      "en": "API-182"
    },
    "title": {
      "zh": "請說明調整對外介接「傳輸格式」時應注意的相容性與驗證。",
      "en": "Explain the compatibility and verification concerns when adjusting an outbound integration format."
    },
    "type": "concept",
    "category": {
      "zh": "介接・格式",
      "en": "Integration / format"
    },
    "difficulty": "senior",
    "prompt": {
      "zh": "請說明像 #182 調整對外差勤平台報送格式、又擴充資料欄位時，要注意哪些相容性與驗證重點。",
      "en": "Explain the compatibility and verification points when adjusting an outbound report format and adding fields, as in #182."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "嚴格符合對方規格/文件",
        "strictly match their spec/doc"
      ],
      [
        "欄位順序/型別/編碼一致",
        "field order/type/encoding consistent"
      ],
      [
        "擴充欄位不破壞既有解析",
        "向後相容",
        "added fields don't break existing parsing",
        "backward compatible"
      ],
      [
        "用對方測試環境驗證",
        "validate in their test environment"
      ],
      [
        "邊界資料",
        "未休假加班/差假",
        "boundary data",
        "un-taken-leave overtime/leave"
      ]
    ],
    "modelAnswer": {
      "zh": "要以接收平台的規格文件為準，確認欄位順序、型別、編碼與分隔等都一致；擴充新欄位（如未休假加班）時要確保不破壞對方既有解析、盡量向後相容。上線前用對方提供的測試環境實際報送驗證，並用邊界資料（未休假加班、各種差假與加班）測試格式與數值正確。最後保留可回滾的舊格式或版本切換，以防對方尚未準備好。",
      "en": "Follow the receiving platform's spec document, ensuring field order, types, encoding, and delimiters all match; when adding new fields (e.g. un-taken-leave overtime), ensure existing parsing isn't broken and stay backward compatible where possible. Before go-live, actually submit through their test environment to validate, and test the format and values with boundary data (un-taken-leave overtime, various leave and overtime). Finally keep a rollback path to the old format or a version switch in case the other side isn't ready."
    }
  },
  {
    "id": "SHIFT-215-1",
    "groupId": "SHIFT-215",
    "variantId": "SHIFT-215-1",
    "groupTitle": {
      "zh": "隊長佔缺單位→hum_note 寫 humnt_depid=佔缺單位/humnt_agent=480；查詢依 humnt_depid",
      "en": "SHIFT-215"
    },
    "title": {
      "zh": "#215 隊長自動輪值班表，寫入 hum_note 時 humnt_agent 取什麼值？",
      "en": "In #215, when writing hum_note, what value is used for humnt_agent?"
    },
    "type": "choice",
    "category": {
      "zh": "排班・佔缺單位",
      "en": "Shift / borrowed unit"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#215 隊長自動輪值班表寫入 hum_note 時，humnt_depid 取佔缺單位，humnt_agent 取？",
      "en": "In #215, when the captain auto-rotation roster writes hum_note, humnt_depid uses the borrowed unit and humnt_agent uses?"
    },
    "hints": [
      {
        "zh": "commit：humnt_agent 固定 480；humnt_depid 取 depidOrigin（佔缺單位）。",
        "en": "The commit: humnt_agent fixed at 480; humnt_depid uses depidOrigin (borrowed unit)."
      }
    ],
    "explanation": {
      "zh": "#215 寫入 hum_note 時，humnt_depid 取佔缺單位 depidOrigin、humnt_agent 固定為 480。單位排班單人設定中，若職稱關鍵字含「隊長」也照此處理；單位超時加班費清冊查詢則改為直接根據 humnt_depid。",
      "en": "In #215, when writing hum_note, humnt_depid uses the borrowed unit depidOrigin and humnt_agent is fixed at 480. In the single-person shift setting, if the title contains \"captain\" it is handled the same way; the unit overtime-pay statement query then filters directly by humnt_depid."
    },
    "options": [
      {
        "zh": "登入者 uid",
        "en": "The login uid"
      },
      {
        "zh": "固定值 480",
        "en": "The fixed value 480"
      },
      {
        "zh": "隨機值",
        "en": "A random value"
      },
      {
        "zh": "原單位 depid",
        "en": "The original unit depid"
      }
    ],
    "answer": 1
  },
  {
    "id": "SHIFT-215-2",
    "groupId": "SHIFT-215",
    "variantId": "SHIFT-215-2",
    "groupTitle": {
      "zh": "隊長佔缺單位→hum_note 寫 humnt_depid=佔缺單位/humnt_agent=480；查詢依 humnt_depid",
      "en": "SHIFT-215"
    },
    "title": {
      "zh": "#215 中，職稱關鍵字含什麼字時要取佔缺單位 depidOrigin？",
      "en": "In #215, which title keyword triggers using the borrowed unit depidOrigin?"
    },
    "type": "fill",
    "category": {
      "zh": "排班・佔缺單位",
      "en": "Shift / borrowed unit"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#215 單位排班單人設定中，若職稱關鍵字含「________」，humnt_depid 取佔缺單位 depidOrigin。",
      "en": "In #215's single-person shift setting, if the title contains \"________,\" humnt_depid uses the borrowed unit depidOrigin."
    },
    "hints": [
      {
        "zh": "這個 issue 的主角職稱。",
        "en": "The title this issue centers on."
      }
    ],
    "explanation": {
      "zh": "是「隊長」。隊長因佔缺於其他單位，排班與加班費歸屬要以佔缺單位 depidOrigin 計算，故依職稱關鍵字判斷後寫入正確的 humnt_depid。",
      "en": "It is \"captain.\" Because a captain occupies a slot in another unit, shift and overtime-pay attribution must use the borrowed unit depidOrigin, so the correct humnt_depid is written after matching the title keyword."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "隊長",
      "captain"
    ],
    "caseSensitive": false
  },
  {
    "id": "SHIFT-215-3",
    "groupId": "SHIFT-215",
    "variantId": "SHIFT-215-3",
    "groupTitle": {
      "zh": "隊長佔缺單位→hum_note 寫 humnt_depid=佔缺單位/humnt_agent=480；查詢依 humnt_depid",
      "en": "SHIFT-215"
    },
    "title": {
      "zh": "#215 單位超時加班費清冊查詢，depid 改為直接依 humnt_depid 嗎？",
      "en": "In #215, does the unit overtime-pay statement query filter directly by humnt_depid?"
    },
    "type": "boolean",
    "category": {
      "zh": "排班・佔缺單位",
      "en": "Shift / borrowed unit"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#215 中，單位超時加班費清冊查詢時，depid 改為直接根據 humnt_depid 來判斷。",
      "en": "In #215, the unit overtime-pay statement query was changed to filter directly by humnt_depid."
    },
    "hints": [
      {
        "zh": "commit 明寫：查詢時 depid 改為直接根據 humnt_depid。",
        "en": "The commit states: the query was changed to filter directly by humnt_depid."
      }
    ],
    "explanation": {
      "zh": "對。為了讓佔缺隊長的加班費正確歸到佔缺單位，#215 把單位超時加班費清冊查詢的 depid 改為直接依 humnt_depid（寫入時已存佔缺單位）判斷，使寫入與查詢口徑一致。",
      "en": "Correct. To attribute a borrowed captain's overtime pay to the borrowed unit, #215 changed the statement query's depid to filter directly by humnt_depid (which already stores the borrowed unit on write), keeping write and read consistent."
    },
    "answer": true
  },
  {
    "id": "SHIFT-215-4",
    "groupId": "SHIFT-215",
    "variantId": "SHIFT-215-4",
    "groupTitle": {
      "zh": "隊長佔缺單位→hum_note 寫 humnt_depid=佔缺單位/humnt_agent=480；查詢依 humnt_depid",
      "en": "SHIFT-215"
    },
    "title": {
      "zh": "請說明「佔缺單位」情境下，排班與加班費歸屬為何要特別處理。",
      "en": "Explain why shift and overtime-pay attribution need special handling in a \"borrowed unit\" scenario."
    },
    "type": "concept",
    "category": {
      "zh": "排班・佔缺單位",
      "en": "Shift / borrowed unit"
    },
    "difficulty": "senior",
    "prompt": {
      "zh": "請說明像 #215 隊長「佔缺於其他單位」時，為什麼排班寫入與加班費清冊查詢都要用佔缺單位，且寫入與查詢口徑要一致。",
      "en": "Explain why, when a captain \"occupies a slot in another unit\" as in #215, both the roster write and the overtime-pay query must use the borrowed unit, and why write and read must be consistent."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "佔缺單位depidOrigin非原單位",
        "borrowed unit depidOrigin not original"
      ],
      [
        "歸屬要算到實際服務/佔缺單位",
        "attribution to actual serving/borrowed unit"
      ],
      [
        "寫入humnt_depid存佔缺單位",
        "write humnt_depid stores borrowed unit"
      ],
      [
        "查詢也依humnt_depid",
        "口徑一致",
        "query also by humnt_depid",
        "consistent"
      ],
      [
        "不一致會漏算或算錯單位",
        "inconsistency causes missing/wrong unit"
      ]
    ],
    "modelAnswer": {
      "zh": "因為佔缺隊長實際服務／佔缺在另一個單位（depidOrigin），排班與加班費應歸到佔缺單位而非原單位，否則統計會算到錯的單位。#215 在寫入 hum_note 時就把 humnt_depid 存成佔缺單位、humnt_agent 固定 480，並讓加班費清冊查詢也直接依 humnt_depid 判斷——關鍵是寫入與查詢用同一個口徑（humnt_depid），口徑不一致就會漏算或歸錯單位。",
      "en": "Because a borrowed captain actually serves/occupies a slot in another unit (depidOrigin), shift and overtime pay should be attributed to the borrowed unit, not the original, or statistics land on the wrong unit. #215 stores humnt_depid as the borrowed unit (and fixes humnt_agent at 480) on writing hum_note, and makes the overtime-pay query also filter directly by humnt_depid — the key is that write and read use the same basis (humnt_depid); an inconsistency would cause missing counts or wrong-unit attribution."
    }
  },
  {
    "id": "RECALL-168-1",
    "groupId": "RECALL-168",
    "variantId": "RECALL-168-1",
    "groupTitle": {
      "zh": "RECALL-168",
      "en": "RECALL-168"
    },
    "title": {
      "zh": "#168 召回申請單新增「用餐休息時數」後，申請時數如何計算？",
      "en": "After #168 added \"meal-break hours\" to the recall form, how are applied hours computed?"
    },
    "type": "choice",
    "category": {
      "zh": "計算邏輯",
      "en": "Calculation logic"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "#168 召回申請單新增用餐休息時數欄位後，申請時數的計算方式是？",
      "en": "After #168 added a meal-break-hours field to the recall form, how are applied hours computed?"
    },
    "hints": [
      {
        "zh": "commit：申請時數扣除用餐休息時數後，未逾上限取申請時數。",
        "en": "The commit: subtract meal-break hours; if within the cap, use the applied figure."
      }
    ],
    "explanation": {
      "zh": "#168 新增用餐休息時數欄位，申請時數要先扣除用餐休息時數（用餐不計入工作／召回時數），扣除後若未逾上限，即取該申請時數。#275 後續再對用餐時數相關文字做調整。",
      "en": "#168 added a meal-break-hours field; applied hours first subtract meal-break hours (meals don't count as work/recall time), and if the result is within the cap, that applied figure is used. #275 later adjusted the wording about meal hours."
    },
    "options": [
      {
        "zh": "申請時數加上用餐休息時數",
        "en": "Add meal-break hours to applied hours"
      },
      {
        "zh": "用餐休息時數不影響任何計算",
        "en": "Meal-break hours affect nothing"
      },
      {
        "zh": "用餐休息時數即申請時數",
        "en": "Meal-break hours equal applied hours"
      },
      {
        "zh": "申請時數扣除用餐休息時數後，若未逾上限則取該申請時數",
        "en": "Subtract meal-break hours from applied hours; if within the cap, use that applied figure"
      }
    ],
    "answer": 3
  },
  {
    "id": "RECALL-168-2",
    "groupId": "RECALL-168",
    "variantId": "RECALL-168-2",
    "groupTitle": {
      "zh": "RECALL-168",
      "en": "RECALL-168"
    },
    "title": {
      "zh": "#168 計算召回申請時數時，要先「____除」用餐休息時數。",
      "en": "In #168, computing recall applied hours first \"____\" the meal-break hours."
    },
    "type": "fill",
    "category": {
      "zh": "計算邏輯",
      "en": "Calculation logic"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "#168 計算召回申請時數時，要先「________除」用餐休息時數（用餐不計入時數）。",
      "en": "In #168, computing recall applied hours first \"____\" the meal-break hours (meals don't count)."
    },
    "hints": [
      {
        "zh": "用餐不算工作，所以要減掉。",
        "en": "Meals aren't work, so they're removed."
      }
    ],
    "explanation": {
      "zh": "是「扣除」。用餐休息不屬於召回工作時間，因此申請時數要先扣除用餐休息時數，再判斷是否逾上限。",
      "en": "It is \"subtract/deduct.\" Meal breaks are not recall working time, so applied hours subtract meal-break hours first, then the cap is checked."
    },
    "placeholder": {
      "zh": "請輸入答案",
      "en": "Type your answer"
    },
    "answers": [
      "扣",
      "subtract",
      "deduct"
    ],
    "caseSensitive": false
  },
  {
    "id": "RECALL-168-3",
    "groupId": "RECALL-168",
    "variantId": "RECALL-168-3",
    "groupTitle": {
      "zh": "RECALL-168",
      "en": "RECALL-168"
    },
    "title": {
      "zh": "召回期間的用餐休息時間，應計入申請（工作）時數嗎？",
      "en": "Should meal-break time during recall count toward applied (working) hours?"
    },
    "type": "boolean",
    "category": {
      "zh": "計算邏輯",
      "en": "Calculation logic"
    },
    "difficulty": "beginner",
    "prompt": {
      "zh": "召回期間的用餐休息時間，應該計入申請（工作）時數。",
      "en": "Meal-break time during a recall should count toward the applied (working) hours."
    },
    "hints": [
      {
        "zh": "#168 正是要把用餐休息時數扣掉。",
        "en": "#168 specifically subtracts meal-break hours."
      }
    ],
    "explanation": {
      "zh": "不應計入。用餐休息不是工作時間，#168 即新增用餐休息時數欄位並從申請時數中扣除，避免把用餐時間當成召回工作時數計薪。",
      "en": "It should not. Meal breaks are not working time; #168 added a meal-break-hours field and subtracts it from applied hours, avoiding counting meal time as paid recall work."
    },
    "answer": false
  },
  {
    "id": "RECALL-168-4",
    "groupId": "RECALL-168",
    "variantId": "RECALL-168-4",
    "groupTitle": {
      "zh": "RECALL-168",
      "en": "RECALL-168"
    },
    "title": {
      "zh": "請說明在召回時數計算中加入「用餐休息扣除」的考量與測試。",
      "en": "Explain the considerations and tests for adding \"meal-break deduction\" to recall-hour calculation."
    },
    "type": "concept",
    "category": {
      "zh": "計算邏輯",
      "en": "Calculation logic"
    },
    "difficulty": "advanced",
    "prompt": {
      "zh": "請說明 #168 在召回申請時數中加入「扣除用餐休息時數」時，要考慮哪些情況與如何測試。",
      "en": "Explain the cases to consider and how to test when #168 adds \"deduct meal-break hours\" to recall applied hours."
    },
    "hints": [],
    "explanation": {
      "zh": "",
      "en": ""
    },
    "placeholder": {
      "zh": "請用自己的話說明",
      "en": "Explain in your own words"
    },
    "keywords": [
      [
        "用餐不計入工作時數",
        "先扣除",
        "meals not working time",
        "deduct first"
      ],
      [
        "扣除後再比對上限",
        "compare against cap after deduction"
      ],
      [
        "邊界",
        "用餐時數為0/超過總時數",
        "boundary",
        "meal hours 0/exceeding total"
      ],
      [
        "不可扣成負數",
        "must not go negative"
      ],
      [
        "測有/無用餐並回歸既有召回",
        "test with/without meals and regress existing recalls"
      ]
    ],
    "modelAnswer": {
      "zh": "要先確立用餐休息不計入工作時數的原則，計算時從申請時數扣除用餐休息時數，扣除後再與上限比對（未逾上限取申請時數）。要處理邊界：用餐時數為 0、用餐時數超過或等於總時數（不可扣成負數）、以及逾上限時的取值。測試涵蓋有填／未填用餐時數兩種情形，並回歸既有召回案例確認原本正確的計算不受影響。",
      "en": "First establish that meal breaks don't count as working time, so the calculation subtracts meal-break hours from applied hours and then compares against the cap (within cap → use the applied figure). Handle boundaries: meal hours of 0, meal hours equal to or exceeding total (must not go negative), and the value taken when over the cap. Test both with and without meal hours entered, and regression-test existing recall cases to confirm previously correct calculations are unaffected."
    }
  }
];
