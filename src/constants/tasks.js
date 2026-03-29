const baseTasks = [
  {
    id: 1,
    title: 'mapで商品名リスト作成',
    level: '初級',
    topic: 'array',
    duration: '5分',
    problem: '商品オブジェクト配列から name だけを取り出した新しい配列を作ってください。',
    starter: "const products = [{ name: 'PC' }, { name: 'Mouse' }, { name: 'Desk' }]",
    hint: 'Array.prototype.map() は各要素を変換して新配列を返します。',
    answer: "const names = products.map((p) => p.name) // ['PC', 'Mouse', 'Desk']"
  },
  {
    id: 2,
    title: 'reduceで売上合計',
    level: '初級',
    topic: 'reduce',
    duration: '5分',
    problem: '注文金額配列 [1200, 800, 1500] の合計を reduce で計算してください。',
    starter: 'const prices = [1200, 800, 1500]',
    hint: '空配列対策として初期値 0 を渡すのが MDN 推奨パターンです。',
    answer: 'const total = prices.reduce((sum, price) => sum + price, 0) // 3500'
  },
  {
    id: 3,
    title: 'try/catchでJSON検証',
    level: '初級',
    topic: 'try...catch',
    duration: '8分',
    problem: '文字列が有効なJSONか判定する isValidJSON(text) を作ってください。',
    starter: 'function isValidJSON(text) {\n  // ここを実装\n}',
    hint: 'JSON.parse を try で実行し、例外なら false を返します。',
    answer: 'function isValidJSON(text) {\n  try {\n    JSON.parse(text)\n    return true\n  } catch {\n    return false\n  }\n}'
  },
  {
    id: 4,
    title: 'toISOStringでUTC化',
    level: '初級',
    topic: 'Date',
    duration: '8分',
    problem: 'Dateオブジェクトを UTC の ISO 文字列へ変換する関数を作成してください。',
    starter: 'function toApiDate(date) {\n  // ここを実装\n}',
    hint: 'Date.prototype.toISOString() は常に Z 付きUTC文字列を返します。',
    answer: 'function toApiDate(date) {\n  return date.toISOString()\n}'
  },
  {
    id: 5,
    title: 'map + parseInt罠回避',
    level: '中級',
    topic: 'array',
    duration: '10分',
    problem:
      "['10', '11', '12'] を数値配列に変換してください。map(parseInt) を使わないこと。",
    starter: "const raw = ['10', '11', '12']",
    hint: 'map は index を第2引数で渡すので parseInt に直接渡すと崩れます。',
    answer: 'const nums = raw.map((v) => Number(v)) // [10, 11, 12]'
  },
  {
    id: 6,
    title: 'Promise.all同時実行',
    level: '中級',
    topic: 'Promise',
    duration: '12分',
    problem:
      'fetchProfile() と fetchNotifications() を並列で待ち、結果を { profile, notifications } で返してください。',
    starter: 'async function loadDashboard() {\n  // ここを実装\n}',
    hint: 'await を2回直列に書くのではなく Promise.all で同時に待ちます。',
    answer:
      'async function loadDashboard() {\n  const [profile, notifications] = await Promise.all([\n    fetchProfile(),\n    fetchNotifications()\n  ])\n  return { profile, notifications }\n}'
  },
  {
    id: 7,
    title: 'Fetchのokチェック',
    level: '中級',
    topic: 'Fetch',
    duration: '12分',
    problem:
      'fetchでJSON取得時、response.ok が false なら Error を throw する fetchJSON(url) を作ってください。',
    starter: 'async function fetchJSON(url) {\n  // ここを実装\n}',
    hint: 'fetch は 404 でも reject せず fulfill される点に注意します。',
    answer:
      'async function fetchJSON(url) {\n  const response = await fetch(url)\n  if (!response.ok) {\n    throw new Error(`Response status: ${response.status}`)\n  }\n  return response.json()\n}'
  },
  {
    id: 8,
    title: 'Intl.NumberFormat通貨表示',
    level: '中級',
    topic: 'Intl',
    duration: '10分',
    problem:
      '金額123456.789を ja-JP / JPY の通貨形式で表示する formatYen(value) を作成してください。',
    starter: 'function formatYen(value) {\n  // ここを実装\n}',
    hint: 'new Intl.NumberFormat(locale, options).format(value) を使います。',
    answer:
      "function formatYen(value) {\n  return new Intl.NumberFormat('ja-JP', {\n    style: 'currency',\n    currency: 'JPY'\n  }).format(value)\n}"
  },
  {
    id: 9,
    title: 'reduceの初期値設計',
    level: '上級',
    topic: 'reduce',
    duration: '15分',
    problem:
      '空配列でも落ちない maxOrNull(numbers) を reduce で実装し、空なら null を返してください。',
    starter: 'function maxOrNull(numbers) {\n  // ここを実装\n}',
    hint: 'numbers.length を先に判定し、reduceには初期値を明示します。',
    answer:
      'function maxOrNull(numbers) {\n  if (numbers.length === 0) return null\n  return numbers.reduce((max, n) => (n > max ? n : max), numbers[0])\n}'
  },
  {
    id: 10,
    title: 'Promise.all fail-fast対策',
    level: '上級',
    topic: 'Promise',
    duration: '18分',
    problem:
      'Promise.allで全結果を取得したいです。各Promiseを失敗しても結果配列に残る形へ変換してください。',
    starter: 'async function collectAll(promises) {\n  // ここを実装\n}',
    hint: '各 promise に catch を生やして値化してから Promise.all します。',
    answer:
      'async function collectAll(promises) {\n  const safe = promises.map((p) =>\n    p.then((value) => ({ ok: true, value })).catch((error) => ({ ok: false, error }))\n  )\n  return Promise.all(safe)\n}'
  },
  {
    id: 11,
    title: 'Fetchキャンセル処理',
    level: '上級',
    topic: 'Fetch',
    duration: '20分',
    problem:
      '3秒で自動中断する fetchWithTimeout(url, ms) を AbortController で実装してください。',
    starter: 'async function fetchWithTimeout(url, ms = 3000) {\n  // ここを実装\n}',
    hint: 'setTimeout で controller.abort() を呼び、finallyでタイマー解除します。',
    answer:
      'async function fetchWithTimeout(url, ms = 3000) {\n  const controller = new AbortController()\n  const timer = setTimeout(() => controller.abort(), ms)\n  try {\n    return await fetch(url, { signal: controller.signal })\n  } finally {\n    clearTimeout(timer)\n  }\n}'
  },
  {
    id: 12,
    title: 'エラー分類して再throw',
    level: '上級',
    topic: 'try...catch',
    duration: '15分',
    problem:
      'RangeErrorだけ握りつぶし、それ以外は再throwする executeSafely(fn) を作成してください。',
    starter: 'function executeSafely(fn) {\n  // ここを実装\n}',
    hint: 'catch (e) 内で instanceof RangeError を条件分岐します。',
    answer:
      'function executeSafely(fn) {\n  try {\n    return fn()\n  } catch (e) {\n    if (e instanceof RangeError) return null\n    throw e\n  }\n}'
  },
  {
    id: 13,
    title: 'ダッシュボード初期取得',
    level: '実務',
    topic: 'Promise + Fetch',
    duration: '25分',
    problem:
      'ユーザー情報・案件一覧・通知を同時取得し、いずれか失敗時はログを残して空配列でフォールバックしてください。',
    starter:
      'async function loadInitialData() {\n  // fetchUser, fetchProjects, fetchNotifications を使う\n}',
    hint: 'Promise.all + 個別catchでフォールバックする設計にします。',
    answer:
      'async function loadInitialData() {\n  const [user, projects, notifications] = await Promise.all([\n    fetchUser().catch(() => null),\n    fetchProjects().catch(() => []),\n    fetchNotifications().catch(() => [])\n  ])\n  return { user, projects, notifications }\n}'
  },
  {
    id: 14,
    title: 'APIレスポンス正規化',
    level: '実務',
    topic: 'map + reduce',
    duration: '25分',
    problem:
      '注文API配列を [{ id, total, createdAtISO }] へ整形し、総額を同時に返す normalizeOrders を作ってください。',
    starter: 'function normalizeOrders(rawOrders) {\n  // ここを実装\n}',
    hint: 'mapで整形し、reduceでtotal合計を計算します。',
    answer:
      'function normalizeOrders(rawOrders) {\n  const orders = rawOrders.map((o) => ({\n    id: o.id,\n    total: o.amount,\n    createdAtISO: new Date(o.createdAt).toISOString()\n  }))\n  const totalAmount = orders.reduce((sum, o) => sum + o.total, 0)\n  return { orders, totalAmount }\n}'
  },
  {
    id: 15,
    title: '金額表示ユーティリティ',
    level: '実務',
    topic: 'Intl',
    duration: '20分',
    problem:
      'localeとcurrencyを引数で受ける formatMoney(value, locale, currency) を作成してください。',
    starter: 'function formatMoney(value, locale, currency) {\n  // ここを実装\n}',
    hint: 'Intl.NumberFormat の options に style: currency を渡します。',
    answer:
      "function formatMoney(value, locale, currency) {\n  return new Intl.NumberFormat(locale, {\n    style: 'currency',\n    currency\n  }).format(value)\n}"
  },
  {
    id: 16,
    title: 'finallyでローディング解除',
    level: '実務',
    topic: 'try...catch...finally',
    duration: '18分',
    problem:
      '非同期処理で成功/失敗に関係なく loading を false に戻す submitForm を実装してください。',
    starter:
      'async function submitForm(payload, setLoading) {\n  // 成功時は save(payload)、失敗時は throw、最後に loading を戻す\n}',
    hint: 'finally は例外や return があっても必ず実行されます。',
    answer:
      'async function submitForm(payload, setLoading) {\n  setLoading(true)\n  try {\n    return await save(payload)\n  } catch (e) {\n    throw e\n  } finally {\n    setLoading(false)\n  }\n}'
  },
  {
    id: 17,
    title: 'filterで有効データ抽出',
    level: '初級',
    topic: 'filter',
    duration: '8分',
    problem:
      'users配列から isActive が true の要素だけを抽出して activeUsers を作成してください。',
    starter:
      "const users = [{ name: 'A', isActive: true }, { name: 'B', isActive: false }, { name: 'C', isActive: true }]",
    hint: 'filter の戻り値は条件に一致した要素の shallow copy です。',
    answer: 'const activeUsers = users.filter((u) => u.isActive)'
  },
  {
    id: 18,
    title: 'allSettledで結果一覧化',
    level: '中級',
    topic: 'Promise.allSettled',
    duration: '12分',
    problem:
      '複数API呼び出しを allSettled で待ち、fulfilled と rejected の件数を返す集計関数を作ってください。',
    starter: 'async function summarizeSettled(promises) {\n  // ここを実装\n}',
    hint: 'allSettled の各要素は status が fulfilled/rejected です。',
    answer:
      'async function summarizeSettled(promises) {\n  const results = await Promise.allSettled(promises)\n  const fulfilled = results.filter((r) => r.status === "fulfilled").length\n  const rejected = results.filter((r) => r.status === "rejected").length\n  return { fulfilled, rejected }\n}'
  },
  {
    id: 19,
    title: 'URLSearchParamsでGETクエリ作成',
    level: '中級',
    topic: 'URLSearchParams',
    duration: '12分',
    problem:
      'keyword と page を受け取り、/search?keyword=...&page=... 形式のURL文字列を返してください。',
    starter: 'function buildSearchUrl(keyword, page) {\n  // ここを実装\n}',
    hint: 'URLSearchParams を append して最後に toString() で連結します。',
    answer:
      'function buildSearchUrl(keyword, page) {\n  const params = new URLSearchParams()\n  params.append("keyword", keyword)\n  params.append("page", String(page))\n  return `/search?${params.toString()}`\n}'
  },
  {
    id: 20,
    title: 'filterで入力検証クリーニング',
    level: '上級',
    topic: 'filter',
    duration: '15分',
    problem:
      'オブジェクト配列から id が有限数かつ 0 でない要素だけ残す sanitizeItems(items) を作成してください。',
    starter: 'function sanitizeItems(items) {\n  // ここを実装\n}',
    hint: 'Number.isFinite(item.id) と item.id !== 0 を組み合わせます。',
    answer:
      'function sanitizeItems(items) {\n  return items.filter((item) => Number.isFinite(item.id) && item.id !== 0)\n}'
  },
  {
    id: 21,
    title: 'allSettledで障害時フォールバック',
    level: '上級',
    topic: 'Promise.allSettled',
    duration: '18分',
    problem:
      'user/task/notice の3APIを allSettled で処理し、失敗した項目だけデフォルト値を入れて返してください。',
    starter:
      'async function loadWithFallback() {\n  // getUser, getTasks, getNotices を使う\n}',
    hint: 'results[index] の status を見て value / デフォルトを分岐します。',
    answer:
      'async function loadWithFallback() {\n  const [u, t, n] = await Promise.allSettled([getUser(), getTasks(), getNotices()])\n  return {\n    user: u.status === "fulfilled" ? u.value : null,\n    tasks: t.status === "fulfilled" ? t.value : [],\n    notices: n.status === "fulfilled" ? n.value : []\n  }\n}'
  },
  {
    id: 22,
    title: 'URLSearchParams複数値対応',
    level: '実務',
    topic: 'URLSearchParams',
    duration: '22分',
    problem:
      'tags配列を重複キーでクエリ化する buildProductQuery({ keyword, tags }) を実装してください。',
    starter:
      'function buildProductQuery({ keyword, tags }) {\n  // 例: ?keyword=pc&tag=vue&tag=js\n}',
    hint: '同一キーの複数値は append を繰り返して追加します。',
    answer:
      'function buildProductQuery({ keyword, tags }) {\n  const params = new URLSearchParams()\n  params.append("keyword", keyword)\n  tags.forEach((tag) => params.append("tag", tag))\n  return `?${params.toString()}`\n}'
  },
  {
    id: 23,
    title: 'forEachで副作用ログ収集',
    level: '初級',
    topic: 'forEach',
    duration: '8分',
    problem: 'orders配列をforEachで走査し、idだけを logs 配列へ push してください。',
    starter: "const orders = [{ id: 101 }, { id: 102 }, { id: 103 }]\nconst logs = []",
    hint: 'forEach は戻り値ではなく副作用処理向きです。',
    answer: 'orders.forEach((o) => logs.push(o.id)) // logs: [101, 102, 103]'
  },
  {
    id: 24,
    title: 'flatMapでネスト配列展開',
    level: '中級',
    topic: 'flatMap',
    duration: '10分',
    problem: 'users配列から全ユーザーのrolesを1次元配列にしてください。',
    starter:
      "const users = [{ roles: ['admin', 'editor'] }, { roles: ['viewer'] }, { roles: [] }]",
    hint: 'map + flat(1) を1回で書けるのが flatMap です。',
    answer: 'const roles = users.flatMap((u) => u.roles) // ["admin", "editor", "viewer"]'
  },
  {
    id: 25,
    title: 'findで1件取得',
    level: '初級',
    topic: 'find',
    duration: '8分',
    problem: 'productsから id === 3 の商品を1件取得してください。',
    starter: "const products = [{ id: 1 }, { id: 3 }, { id: 5 }]",
    hint: 'find は最初に一致した1件を返し、なければ undefined です。',
    answer: 'const target = products.find((p) => p.id === 3)'
  },
  {
    id: 26,
    title: 'findIndexで位置取得',
    level: '初級',
    topic: 'findIndex',
    duration: '8分',
    problem: 'emails配列で support@example.com のindexを取得してください。',
    starter: "const emails = ['a@ex.com', 'support@example.com', 'c@ex.com']",
    hint: '見つからない場合は -1 が返ります。',
    answer: 'const idx = emails.findIndex((e) => e === "support@example.com")'
  },
  {
    id: 27,
    title: 'includes/some/every判定',
    level: '中級',
    topic: 'includes + some + every',
    duration: '12分',
    problem:
      'tagsに "vue" が含まれるか、scoresに60以上が1つでもあるか、全員18歳以上かを判定してください。',
    starter:
      "const tags = ['js', 'vue', 'api']\nconst scores = [40, 72, 30]\nconst users = [{ age: 20 }, { age: 18 }]",
    hint: '存在確認は includes、条件付き存在は some、全件条件は every です。',
    answer:
      'const hasVue = tags.includes("vue")\nconst hasPass = scores.some((s) => s >= 60)\nconst allAdult = users.every((u) => u.age >= 18)'
  },
  {
    id: 28,
    title: 'sortとtoSortedの違い',
    level: '中級',
    topic: 'sort + toSorted',
    duration: '12分',
    problem: 'numbersを昇順に並べつつ、元配列を壊さない sortedCopy を作成してください。',
    starter: 'const numbers = [5, 2, 9, 1]',
    hint: 'sort は破壊的、toSorted は非破壊です。',
    answer:
      'const sortedCopy = numbers.toSorted((a, b) => a - b)\nconst sortedMutate = [...numbers].sort((a, b) => a - b)'
  },
  {
    id: 29,
    title: 'reverseとtoReversedの違い',
    level: '中級',
    topic: 'reverse + toReversed',
    duration: '10分',
    problem: 'arrを逆順コピーしつつ、元arrを保持する reversedCopy を作ってください。',
    starter: 'const arr = [1, 2, 3, 4]',
    hint: 'toReversed は非破壊で逆順配列を返します。',
    answer: 'const reversedCopy = arr.toReversed()\nconst reversedMutate = [...arr].reverse()'
  },
  {
    id: 30,
    title: 'sliceとspliceの使い分け',
    level: '中級',
    topic: 'slice + splice',
    duration: '12分',
    problem: 'itemsから先頭2件をsliceでコピーし、別配列targetのindex1へ"X"をspliceで挿入してください。',
    starter: "const items = ['a', 'b', 'c', 'd']\nconst target = ['p', 'q', 'r']",
    hint: 'slice は非破壊コピー、splice は破壊的変更です。',
    answer:
      'const firstTwo = items.slice(0, 2)\ntarget.splice(1, 0, "X") // target: ["p", "X", "q", "r"]'
  },
  {
    id: 31,
    title: 'concatとflatで配列加工',
    level: '初級',
    topic: 'concat + flat',
    duration: '10分',
    problem: 'a,bを結合し、nestedを1段平坦化した配列を作成してください。',
    starter: 'const a = [1, 2]\nconst b = [3, 4]\nconst nested = [1, [2, 3], [4]]',
    hint: 'concat で結合、flat(1) で1段平坦化できます。',
    answer: 'const merged = a.concat(b)\nconst flattened = nested.flat(1)'
  },
  {
    id: 32,
    title: 'push/pop/shift/unshift基礎',
    level: '初級',
    topic: 'push + pop + shift + unshift',
    duration: '8分',
    problem: 'queue配列の末尾追加・末尾削除・先頭削除・先頭追加を順に実装してください。',
    starter: 'const queue = ["b", "c"]',
    hint: '末尾: push/pop、先頭: unshift/shift です。',
    answer: 'queue.push("d")\nqueue.pop()\nqueue.shift()\nqueue.unshift("a")'
  },
  {
    id: 33,
    title: 'Object.keys/values/entries',
    level: '初級',
    topic: 'Object.keys + Object.values + Object.entries',
    duration: '10分',
    problem: 'profileオブジェクトからkey配列・value配列・entry配列を取得してください。',
    starter: 'const profile = { name: "Taro", age: 22, role: "dev" }',
    hint: '3つとも静的メソッドで返り値は配列です。',
    answer:
      'const keys = Object.keys(profile)\nconst values = Object.values(profile)\nconst entries = Object.entries(profile)'
  },
  {
    id: 34,
    title: 'fromEntriesで再オブジェクト化',
    level: '中級',
    topic: 'Object.fromEntries',
    duration: '10分',
    problem: 'entries配列をオブジェクトへ戻し、nameだけ大文字化してください。',
    starter: 'const entries = [["name", "taro"], ["age", 22]]',
    hint: 'entriesをmapで変換してから Object.fromEntries を使います。',
    answer:
      'const normalized = Object.fromEntries(entries.map(([k, v]) => [k, k === "name" ? String(v).toUpperCase() : v]))'
  },
  {
    id: 35,
    title: 'assignとスプレッドでマージ',
    level: '中級',
    topic: 'Object.assign + spread',
    duration: '10分',
    problem: 'baseとpatchをマージし、nameだけ"new"に上書きしたオブジェクトを2通りで作成してください。',
    starter: 'const base = { id: 1, name: "old" }\nconst patch = { active: true }',
    hint: 'Object.assign と { ...obj } の両方を試します。',
    answer:
      'const merged1 = Object.assign({}, base, patch, { name: "new" })\nconst merged2 = { ...base, ...patch, name: "new" }'
  },
  {
    id: 36,
    title: 'hasOwnPropertyで所有確認',
    level: '初級',
    topic: 'hasOwnProperty',
    duration: '8分',
    problem: 'userが own property として "email" を持つか判定してください。',
    starter: 'const user = { name: "A", email: "a@example.com" }',
    hint: 'prototype由来ではなく自前プロパティかを判定します。',
    answer: 'const hasEmail = user.hasOwnProperty("email")'
  },
  {
    id: 37,
    title: 'String検索メソッドセット',
    level: '初級',
    topic: 'includes + startsWith + endsWith',
    duration: '8分',
    problem: 'textに"vue"を含むか、"Hello"で始まるか、"!"で終わるか判定してください。',
    starter: 'const text = "Hello vue world!"',
    hint: '3つとも真偽値を返します。',
    answer:
      'const hasVue = text.includes("vue")\nconst starts = text.startsWith("Hello")\nconst ends = text.endsWith("!")'
  },
  {
    id: 38,
    title: 'split/join/trim/大小文字変換',
    level: '初級',
    topic: 'split + join + trim + toLowerCase + toUpperCase',
    duration: '10分',
    problem: '"  Vue,React,Angular  " をtrim後に分割し、すべて小文字で "|" 連結してください。',
    starter: 'const raw = "  Vue,React,Angular  "',
    hint: 'trim -> split -> map -> join の順が書きやすいです。',
    answer:
      'const normalized = raw.trim().split(",").map((s) => s.toLowerCase()).join("|")\nconst loud = raw.trim().toUpperCase()'
  },
  {
    id: 39,
    title: 'replaceとreplaceAllの使い分け',
    level: '中級',
    topic: 'replace + replaceAll',
    duration: '10分',
    problem: 'message内の最初の"-"だけ置換した結果と、全"-"置換の結果を作成してください。',
    starter: 'const message = "2026-03-29-logs"',
    hint: 'replace は1つ、replaceAll はすべて置換します。',
    answer:
      'const once = message.replace("-", "/")\nconst all = message.replaceAll("-", "/")'
  },
  {
    id: 40,
    title: 'Promise.thenで後続処理',
    level: '初級',
    topic: 'Promise.then',
    duration: '8分',
    problem: 'fetchUserName() の結果を then で受け取り、"USER: " を付けて返してください。',
    starter: 'function getLabel() {\n  // fetchUserName は Promise<string>\n}',
    hint: 'then の戻り値は次の Promise の解決値になります。',
    answer: 'function getLabel() {\n  return fetchUserName().then((name) => `USER: ${name}`)\n}'
  },
  {
    id: 41,
    title: 'setTimeout/setInterval制御',
    level: '中級',
    topic: 'setTimeout + setInterval',
    duration: '12分',
    problem: '1秒ごとにcountを増やし、5秒後に停止するタイマーを実装してください。',
    starter: 'let count = 0\nfunction startCounter() {\n  // ここを実装\n}',
    hint: 'setInterval のIDを clearInterval に渡し、停止は setTimeout で行います。',
    answer:
      'let count = 0\nfunction startCounter() {\n  const intervalId = setInterval(() => {\n    count += 1\n  }, 1000)\n  setTimeout(() => clearInterval(intervalId), 5000)\n}'
  },
  {
    id: 42,
    title: 'Number/parseInt/parseFloat変換',
    level: '初級',
    topic: 'Number + parseInt + parseFloat',
    duration: '10分',
    problem: '"42" と "3.14" をそれぞれ数値化し、整数/小数を使い分けてください。',
    starter: 'const a = "42"\nconst b = "3.14px"',
    hint: 'Number は厳密、parse系は先頭から読める範囲を変換します。',
    answer: 'const n1 = Number(a)\nconst n2 = parseInt(b, 10)\nconst n3 = parseFloat(b)'
  },
  {
    id: 43,
    title: 'Math丸めと乱数',
    level: '初級',
    topic: 'Math.floor + Math.ceil + Math.round + Math.random',
    duration: '10分',
    problem: 'value=3.6 の切り捨て/切り上げ/四捨五入と、1〜10の乱数整数を作成してください。',
    starter: 'const value = 3.6',
    hint: '乱数整数は floor(random * 範囲) + 最小値 で作れます。',
    answer:
      'const down = Math.floor(value)\nconst up = Math.ceil(value)\nconst nearest = Math.round(value)\nconst random1to10 = Math.floor(Math.random() * 10) + 1'
  },
  {
    id: 44,
    title: 'Date取得メソッド基礎',
    level: '初級',
    topic: 'new Date + getFullYear + getMonth + getDate',
    duration: '10分',
    problem: '現在日付から年/月/日を取得し、YYYY-M-D形式文字列を作成してください。',
    starter: 'const now = new Date()',
    hint: 'getMonth() は 0始まりなので +1 が必要です。',
    answer:
      'const year = now.getFullYear()\nconst month = now.getMonth() + 1\nconst day = now.getDate()\nconst ymd = `${year}-${month}-${day}`'
  },
  {
    id: 45,
    title: 'JSON stringify/parse往復',
    level: '初級',
    topic: 'JSON.stringify + JSON.parse',
    duration: '8分',
    problem: 'payloadオブジェクトをJSON文字列化し、再度オブジェクトへ戻してください。',
    starter: 'const payload = { id: 1, name: "A" }',
    hint: 'API送信前は stringify、受信後は parse が基本です。',
    answer: 'const body = JSON.stringify(payload)\nconst restored = JSON.parse(body)'
  },
  {
    id: 46,
    title: 'typeof/isArray/instanceof判定',
    level: '中級',
    topic: 'typeof + Array.isArray + instanceof',
    duration: '10分',
    problem: 'valueが文字列か、listが配列か、errがErrorインスタンスか判定してください。',
    starter: 'const value = "hello"\nconst list = [1, 2]\nconst err = new Error("x")',
    hint: '配列判定は typeof ではなく Array.isArray を使います。',
    answer:
      'const isString = typeof value === "string"\nconst isArray = Array.isArray(list)\nconst isError = err instanceof Error'
  },
  {
    id: 47,
    title: 'ES6実務構文セット',
    level: '実務',
    topic: 'destructuring + spread + optional chaining + nullish coalescing',
    duration: '15分',
    problem:
      'userからnameを分割代入し、新配列をspreadで作り、ネスト名を optional chaining + ?? で安全取得してください。',
    starter:
      'const user = { name: "Taro", profile: null }\nconst arr = [1, 2]\n// ここを実装',
    hint: '?. と ?? を組み合わせると null/undefined でも落ちにくくなります。',
    answer:
      'const { name } = user\nconst newArr = [...arr, 3]\nconst safeName = user?.profile?.name ?? "名無し"'
  },
  {
    id: 48,
    title: 'Map/Set基礎運用',
    level: '実務',
    topic: 'Map + Set',
    duration: '15分',
    problem: 'Mapへ key/value を保存して取得し、配列の重複を Set で削除してください。',
    starter: 'const pairs = [["a", 1], ["b", 2]]\nconst raw = [1, 2, 2, 3, 3]',
    hint: 'Mapは set/get、Setは重複排除に使えます。',
    answer:
      'const map = new Map(pairs)\nmap.set("c", 3)\nconst c = map.get("c")\nconst unique = Array.from(new Set(raw))'
  },
  {
    id: 49,
    title: '実務コンボ: API取得→filter→map',
    level: '実務',
    topic: 'fetch + filter + map',
    duration: '18分',
    problem:
      'users APIを取得し、isActiveなユーザーのname配列だけ返す loadActiveUserNames を実装してください。',
    starter: 'async function loadActiveUserNames() {\n  // ここを実装\n}',
    hint: 'await fetch(...).then(...) の後に filter と map をつなげます。',
    answer:
      'async function loadActiveUserNames() {\n  const users = await fetch("/api/users").then((r) => r.json())\n  return users.filter((u) => u.isActive).map((u) => u.name)\n}'
  },
  {
    id: 50,
    title: '実務コンボ: fetcher + エラーハンドリング',
    level: '実務',
    topic: 'fetch + async/await + try/catch',
    duration: '18分',
    problem:
      'fetcher(url)を作成し、ok判定失敗で Error を投げ、呼び出し側で try/catch してください。',
    starter:
      'const fetcher = async (url) => {\n  // ここを実装\n}\n\nasync function run() {\n  // ここを実装\n}',
    hint: 'res.ok を必ず確認し、呼び出し側で例外処理します。',
    answer:
      'const fetcher = async (url) => {\n  const res = await fetch(url)\n  if (!res.ok) throw new Error("API error")\n  return res.json()\n}\n\nasync function run() {\n  try {\n    return await fetcher("/api")\n  } catch (e) {\n    console.error(e)\n    return null\n  }\n}'
  },
  {
    id: 51,
    title: '実務コンボ: reduceグループ化 + 重複排除',
    level: '上級',
    topic: 'reduce + Set',
    duration: '20分',
    problem:
      'usersをroleごとにグループ化し、全role一覧は重複排除して返してください。',
    starter: 'function groupUsers(users) {\n  // ここを実装\n}',
    hint: 'acc[key] ??= [] を使うと初期化が簡潔です。',
    answer:
      'function groupUsers(users) {\n  const grouped = users.reduce((acc, user) => {\n    acc[user.role] ??= []\n    acc[user.role].push(user)\n    return acc\n  }, {})\n  const uniqueRoles = [...new Set(users.map((u) => u.role))]\n  return { grouped, uniqueRoles }\n}'
  },
  {
    id: 52,
    title: '実務コンボ: インクリメンタル検索 + debounce',
    level: '実務',
    topic: 'filter + includes + toLowerCase + debounce',
    duration: '22分',
    problem:
      'name検索を大文字小文字無視で実装し、debounceでAPI連打を防いでください。',
    starter:
      'const debounce = (fn, delay) => {\n  let t\n  return (...args) => {\n    clearTimeout(t)\n    t = setTimeout(() => fn(...args), delay)\n  }\n}\n\nfunction searchUsers(users, keyword) {\n  // ここを実装\n}',
    hint: '文字列は trim + toLowerCase で正規化してから includes します。',
    answer:
      'function searchUsers(users, keyword) {\n  const q = keyword.trim().toLowerCase()\n  return users.filter((u) => u.name.toLowerCase().includes(q))\n}\n\nconst debouncedSearch = debounce(searchUsers, 300)'
  },
  {
    id: 53,
    title: '実務コンボ: 非破壊ソート + 1件取得 + 安全アクセス',
    level: '上級',
    topic: 'toSorted + find + optional chaining + nullish',
    duration: '20分',
    problem:
      'usersを年齢昇順で非破壊ソートし、targetIdユーザーのprofile.nameを安全取得してください。',
    starter: 'function pickUserName(users, targetId) {\n  // ここを実装\n}',
    hint: 'toSortedで並べ替え後、findと ?. ?? を組み合わせます。',
    answer:
      'function pickUserName(users, targetId) {\n  const sorted = users.toSorted((a, b) => a.age - b.age)\n  const user = sorted.find((u) => u.id === targetId)\n  return user?.profile?.name ?? "名無し"\n}'
  },
  {
    id: 54,
    title: '実務コンボ: フォーム送信JSON化 + 条件付きプロパティ',
    level: '実務',
    topic: 'fetch + JSON.stringify + spread',
    duration: '18分',
    problem:
      'nameは必須、ageはある時だけ含めるpayloadを作り、POST送信してください。',
    starter: 'async function submit(name, age) {\n  // ここを実装\n}',
    hint: '...(age && { age }) で条件付き追加できます。',
    answer:
      'async function submit(name, age) {\n  const payload = {\n    name,\n    ...(age && { age })\n  }\n\n  await fetch("/api", {\n    method: "POST",\n    body: JSON.stringify(payload),\n    headers: { "Content-Type": "application/json" }\n  })\n}'
  },
  {
    id: 55,
    title: '実務コンボ: クエリ取得 + クエリ生成',
    level: '実務',
    topic: 'URLSearchParams + URL',
    duration: '18分',
    problem:
      'location.searchからid取得し、/api/users?page=2 のURLをURL APIで生成してください。',
    starter: 'function buildUrls(locationLike) {\n  // ここを実装\n}',
    hint: '取得は new URLSearchParams(...).get、生成は new URL(...).searchParams.set です。',
    answer:
      'function buildUrls(locationLike) {\n  const params = new URLSearchParams(locationLike.search)\n  const id = params.get("id")\n\n  const url = new URL("/api/users", locationLike.origin)\n  url.searchParams.set("page", 2)\n\n  return { id, url: url.toString() }\n}'
  },
  {
    id: 56,
    title: '実務コンボ: structuredClone + セキュア分割代入',
    level: '上級',
    topic: 'structuredClone + destructuring rest',
    duration: '16分',
    problem:
      'userをディープコピーしてpasswordを除外した safeUser を作成してください。',
    starter: 'function sanitizeUser(user) {\n  // ここを実装\n}',
    hint: 'まず structuredClone し、その後に { password, ...rest } で除外します。',
    answer:
      'function sanitizeUser(user) {\n  const copy = structuredClone(user)\n  const { password, ...safeUser } = copy\n  return safeUser\n}'
  },
  {
    id: 57,
    title: '実務コンボ: Promise.all並列 + loading finally',
    level: '実務',
    topic: 'Promise.all + try/finally',
    duration: '20分',
    problem:
      'users/postsを並列取得し、loadingを必ずfalseへ戻す loadPageData を作成してください。',
    starter:
      'let loading = false\nasync function loadPageData() {\n  // ここを実装\n}',
    hint: '状態解除は finally へ寄せると漏れません。',
    answer:
      'let loading = false\nasync function loadPageData() {\n  loading = true\n  try {\n    const [users, posts] = await Promise.all([\n      fetch("/api/users").then((r) => r.json()),\n      fetch("/api/posts").then((r) => r.json())\n    ])\n    return { users, posts }\n  } finally {\n    loading = false\n  }\n}'
  },
  {
    id: 58,
    title: '実務コンボ: fromEntries + Map + flatMap',
    level: '実務',
    topic: 'Object.fromEntries + Map + flatMap',
    duration: '22分',
    problem:
      'usersからidキーobjectとMapを作成し、postsからtags一覧をflatMapで抽出してください。',
    starter:
      'function normalize(users, posts) {\n  // ここを実装\n}',
    hint: '高速検索用に object と Map の2系統を用意する練習です。',
    answer:
      'function normalize(users, posts) {\n  const userObj = Object.fromEntries(users.map((u) => [u.id, u]))\n  const userMap = new Map(users.map((u) => [u.id, u]))\n  const tags = posts.flatMap((p) => p.tags)\n  return { userObj, userMap, tags }\n}'
  },
  {
    id: 59,
    title: '実務コンボ: with/at/条件付き配列追加',
    level: '上級',
    topic: 'with + at + spread',
    duration: '18分',
    problem:
      'arrのindex更新を非破壊で行い、末尾取得し、isAdmin時のみadminItemsを追加してください。',
    starter:
      'function updateList(arr, index, newValue, base, isAdmin, adminItems) {\n  // ここを実装\n}',
    hint: 'with と at はどちらも非破壊アクセス/更新に便利です。',
    answer:
      'function updateList(arr, index, newValue, base, isAdmin, adminItems) {\n  const updated = arr.with(index, newValue)\n  const last = updated.at(-1)\n  const list = [\n    ...base,\n    ...(isAdmin ? adminItems : [])\n  ]\n  return { updated, last, list }\n}'
  },
  {
    id: 60,
    title: '実務コンボ: every/some + localStorage保存復元',
    level: '実務',
    topic: 'every + some + localStorage + JSON',
    duration: '18分',
    problem:
      'usersの全active判定とadmin存在判定を行い、userをlocalStorageへ保存して復元してください。',
    starter: 'function persistUser(users, user) {\n  // ここを実装\n}',
    hint: '保存時は stringify、復元時は parse を使います。',
    answer:
      'function persistUser(users, user) {\n  const allActive = users.every((u) => u.active)\n  const hasAdmin = users.some((u) => u.role === "admin")\n\n  localStorage.setItem("user", JSON.stringify(user))\n  const restored = JSON.parse(localStorage.getItem("user"))\n\n  return { allActive, hasAdmin, restored }\n}'
  },
  {
    id: 61,
    title: '配列の平均値を出す',
    level: '初級',
    topic: 'reduce',
    duration: '8分',
    problem: 'scores配列の平均値を返す calcAverage(scores) を作成してください。',
    starter: 'function calcAverage(scores) {\n  // ここを実装\n}',
    hint: '合計をreduceで計算し、lengthで割ります。空配列対応も考えると良いです。',
    answer:
      'function calcAverage(scores) {\n  if (scores.length === 0) return 0\n  const total = scores.reduce((sum, s) => sum + s, 0)\n  return total / scores.length\n}'
  },
  {
    id: 62,
    title: '文字列をキャメルケース化',
    level: '初級',
    topic: 'split + map + join',
    duration: '10分',
    problem: '"user profile name" を userProfileName に変換してください。',
    starter: 'function toCamel(text) {\n  // ここを実装\n}',
    hint: '先頭単語は小文字のまま、それ以降の先頭を大文字化します。',
    answer:
      'function toCamel(text) {\n  return text\n    .trim()\n    .toLowerCase()\n    .split(" ")\n    .map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1)))\n    .join("")\n}'
  },
  {
    id: 63,
    title: 'ID配列をCSVへ',
    level: '初級',
    topic: 'map + join',
    duration: '8分',
    problem: 'users配列からidを取り出して "1,2,3" 形式で返してください。',
    starter: 'function idsToCsv(users) {\n  // ここを実装\n}',
    hint: 'mapでid配列を作ってjoinします。',
    answer: 'function idsToCsv(users) {\n  return users.map((u) => u.id).join(",")\n}'
  },
  {
    id: 64,
    title: 'roleごとの人数を集計',
    level: '中級',
    topic: 'reduce',
    duration: '12分',
    problem: 'users配列から role ごとの件数オブジェクトを作成してください。',
    starter: 'function countByRole(users) {\n  // ここを実装\n}',
    hint: 'acc[role] = (acc[role] ?? 0) + 1 の形が使えます。',
    answer:
      'function countByRole(users) {\n  return users.reduce((acc, user) => {\n    acc[user.role] = (acc[user.role] ?? 0) + 1\n    return acc\n  }, {})\n}'
  },
  {
    id: 65,
    title: '配列の差分を作る',
    level: '中級',
    topic: 'filter + includes',
    duration: '10分',
    problem: 'aにあってbにない値だけを返す diff(a, b) を作成してください。',
    starter: 'function diff(a, b) {\n  // ここを実装\n}',
    hint: 'b.includes(x) の否定を使います。',
    answer: 'function diff(a, b) {\n  return a.filter((x) => !b.includes(x))\n}'
  },
  {
    id: 66,
    title: 'URLから複数パラメータ取得',
    level: '中級',
    topic: 'URLSearchParams',
    duration: '12分',
    problem: 'search文字列から page と sort を取得しオブジェクトで返してください。',
    starter: 'function readQuery(search) {\n  // ここを実装\n}',
    hint: 'URLSearchParams.get は見つからないと null を返します。',
    answer:
      'function readQuery(search) {\n  const params = new URLSearchParams(search)\n  return {\n    page: params.get("page"),\n    sort: params.get("sort")\n  }\n}'
  },
  {
    id: 67,
    title: '任意キーでソート関数生成',
    level: '中級',
    topic: 'toSorted',
    duration: '14分',
    problem: 'keyを受けてオブジェクト配列を昇順ソートする sortBy(list, key) を作ってください。',
    starter: 'function sortBy(list, key) {\n  // ここを実装\n}',
    hint: 'toSorted((a,b)=>...) で非破壊ソートします。',
    answer:
      'function sortBy(list, key) {\n  return list.toSorted((a, b) => {\n    if (a[key] < b[key]) return -1\n    if (a[key] > b[key]) return 1\n    return 0\n  })\n}'
  },
  {
    id: 68,
    title: 'allSettledの失敗理由だけ抽出',
    level: '上級',
    topic: 'Promise.allSettled',
    duration: '16分',
    problem: 'promises実行後、rejectedのreasonだけ配列で返してください。',
    starter: 'async function collectErrors(promises) {\n  // ここを実装\n}',
    hint: 'status === "rejected" をfilterして reason をmapします。',
    answer:
      'async function collectErrors(promises) {\n  const results = await Promise.allSettled(promises)\n  return results.filter((r) => r.status === "rejected").map((r) => r.reason)\n}'
  },
  {
    id: 69,
    title: 'deep copy後に安全更新',
    level: '上級',
    topic: 'structuredClone + spread',
    duration: '16分',
    problem: 'userをdeep copyし、profile.nameだけ更新した新オブジェクトを返してください。',
    starter: 'function renameUser(user, newName) {\n  // ここを実装\n}',
    hint: 'structuredClone後にネストを上書きすると安全です。',
    answer:
      'function renameUser(user, newName) {\n  const copy = structuredClone(user)\n  copy.profile = { ...copy.profile, name: newName }\n  return copy\n}'
  },
  {
    id: 70,
    title: '正常系だけMap化',
    level: '上級',
    topic: 'filter + Map',
    duration: '14分',
    problem: 'activeなusersのみを id => user のMapにしてください。',
    starter: 'function activeUserMap(users) {\n  // ここを実装\n}',
    hint: 'filterしてからmap([id,user])でMapへ渡します。',
    answer:
      'function activeUserMap(users) {\n  return new Map(users.filter((u) => u.active).map((u) => [u.id, u]))\n}'
  },
  {
    id: 71,
    title: 'ページングURLビルダー',
    level: '実務',
    topic: 'URL + URLSearchParams',
    duration: '18分',
    problem: 'baseUrl, page, limit を受けてページングURLを返す関数を作ってください。',
    starter: 'function buildPagingUrl(baseUrl, page, limit) {\n  // ここを実装\n}',
    hint: 'URLオブジェクトの searchParams を使うと安全です。',
    answer:
      'function buildPagingUrl(baseUrl, page, limit) {\n  const url = new URL(baseUrl, location.origin)\n  url.searchParams.set("page", String(page))\n  url.searchParams.set("limit", String(limit))\n  return url.toString()\n}'
  },
  {
    id: 72,
    title: 'フィルタ条件をクエリ化',
    level: '実務',
    topic: 'Object.entries + URLSearchParams',
    duration: '18分',
    problem: 'filtersオブジェクトの空値を除外し、クエリ文字列を返してください。',
    starter: 'function filtersToQuery(filters) {\n  // ここを実装\n}',
    hint: 'Object.entriesで回して truthy のみ append します。',
    answer:
      'function filtersToQuery(filters) {\n  const params = new URLSearchParams()\n  Object.entries(filters).forEach(([k, v]) => {\n    if (v) params.append(k, String(v))\n  })\n  return params.toString()\n}'
  },
  {
    id: 73,
    title: 'APIレスポンス正規化v2',
    level: '実務',
    topic: 'map + optional chaining + nullish',
    duration: '20分',
    problem: 'rawUsersを {id, name, city} 配列へ変換し、city欠損時は"unknown"にしてください。',
    starter: 'function normalizeUsers(rawUsers) {\n  // ここを実装\n}',
    hint: 'u?.address?.city ?? "unknown" の形が使えます。',
    answer:
      'function normalizeUsers(rawUsers) {\n  return rawUsers.map((u) => ({\n    id: u.id,\n    name: u.name,\n    city: u?.address?.city ?? "unknown"\n  }))\n}'
  },
  {
    id: 74,
    title: 'タグ検索の前処理',
    level: '中級',
    topic: 'trim + toLowerCase + split + filter',
    duration: '12分',
    problem: '入力文字列を正規化してタグ配列にし、空要素を除去してください。',
    starter: 'function parseTags(input) {\n  // ここを実装\n}',
    hint: 'split後にtrimし、長さ0の要素をfilterで落とします。',
    answer:
      'function parseTags(input) {\n  return input\n    .toLowerCase()\n    .split(",")\n    .map((s) => s.trim())\n    .filter((s) => s.length > 0)\n}'
  },
  {
    id: 75,
    title: '遅延保存のdebounceラッパー',
    level: '上級',
    topic: 'setTimeout + clearTimeout',
    duration: '16分',
    problem: 'save関数をdebounceする createDebouncedSave(save, delay) を作ってください。',
    starter: 'function createDebouncedSave(save, delay) {\n  // ここを実装\n}',
    hint: 'クロージャにtimerを持たせます。',
    answer:
      'function createDebouncedSave(save, delay) {\n  let timer\n  return (...args) => {\n    clearTimeout(timer)\n    timer = setTimeout(() => save(...args), delay)\n  }\n}'
  },
  {
    id: 76,
    title: '配列の最後から2番目',
    level: '上級',
    topic: 'at',
    duration: '8分',
    problem: 'arrの最後から2番目の要素を安全に返してください。なければnull。',
    starter: 'function secondLast(arr) {\n  // ここを実装\n}',
    hint: 'at(-2) を使い、undefined時はnullにします。',
    answer: 'function secondLast(arr) {\n  return arr.at(-2) ?? null\n}'
  },
  {
    id: 77,
    title: 'withで非破壊置換',
    level: '中級',
    topic: 'with',
    duration: '10分',
    problem: 'arrのindex位置だけnewValueに差し替えた新配列を返してください。',
    starter: 'function replaceAt(arr, index, newValue) {\n  // ここを実装\n}',
    hint: 'with(index, value) は元配列を変更しません。',
    answer: 'function replaceAt(arr, index, newValue) {\n  return arr.with(index, newValue)\n}'
  },
  {
    id: 78,
    title: 'localStorageセーフ読み込み',
    level: '実務',
    topic: 'localStorage + JSON.parse + try/catch',
    duration: '14分',
    problem: 'keyを受けてJSONを安全に復元し、失敗時はfallbackを返す関数を作成してください。',
    starter: 'function readStorage(key, fallback) {\n  // ここを実装\n}',
    hint: 'JSON.parseは例外が出る可能性があります。',
    answer:
      'function readStorage(key, fallback) {\n  try {\n    const raw = localStorage.getItem(key)\n    return raw ? JSON.parse(raw) : fallback\n  } catch {\n    return fallback\n  }\n}'
  },
  {
    id: 79,
    title: 'Promise.allで依存なし先読み',
    level: '実務',
    topic: 'Promise.all + fetch',
    duration: '18分',
    problem: 'profile/settings/notifications を並列取得して1つのオブジェクトで返してください。',
    starter: 'async function preloadAll() {\n  // ここを実装\n}',
    hint: 'Promise.allの配列順と受け取り順を合わせます。',
    answer:
      'async function preloadAll() {\n  const [profile, settings, notifications] = await Promise.all([\n    fetch("/api/profile").then((r) => r.json()),\n    fetch("/api/settings").then((r) => r.json()),\n    fetch("/api/notifications").then((r) => r.json())\n  ])\n  return { profile, settings, notifications }\n}'
  },
  {
    id: 80,
    title: '条件付き更新payload作成',
    level: '実務',
    topic: 'spread + nullish + Boolean',
    duration: '16分',
    problem: 'name必須、emailとphoneは値がある時のみ含めるpayloadを作って返してください。',
    starter: 'function buildUpdatePayload(name, email, phone) {\n  // ここを実装\n}',
    hint: '...(email && { email }) のような条件付き展開を使います。',
    answer:
      'function buildUpdatePayload(name, email, phone) {\n  return {\n    name: name ?? "",\n    ...(email && { email }),\n    ...(phone && { phone }),\n    isValid: !!name\n  }\n}'
  },
  {
    id: 81,
    title: 'マッチング候補スコア付け',
    level: '実務',
    topic: 'map + sort',
    duration: '18分',
    problem: 'candidatesに対して score を計算し、高い順で返す rankCandidates(candidates) を作ってください。',
    starter: 'function rankCandidates(candidates) {\n  // candidate: { id, distanceKm, rating }\n  // ここを実装\n}',
    hint: 'mapでscoreを追加し、sortで降順に並べます。',
    answer:
      'function rankCandidates(candidates) {\n  return candidates\n    .map((c) => ({ ...c, score: c.rating * 20 - c.distanceKm }))\n    .sort((a, b) => b.score - a.score)\n}'
  },
  {
    id: 82,
    title: 'ストリーミング差分反映',
    level: '上級',
    topic: 'Map + forEach',
    duration: '16分',
    problem: '既存itemsへupdates差分を適用して最新配列を返す mergeStreamItems(items, updates) を作ってください。',
    starter: 'function mergeStreamItems(items, updates) {\n  // update: { id, ...patch }\n  // ここを実装\n}',
    hint: 'idをキーにMap化してからupdatesを上書きします。',
    answer:
      'function mergeStreamItems(items, updates) {\n  const byId = new Map(items.map((item) => [item.id, item]))\n  updates.forEach((u) => byId.set(u.id, { ...(byId.get(u.id) ?? {}), ...u }))\n  return [...byId.values()]\n}'
  },
  {
    id: 83,
    title: '決済金額の端数処理',
    level: '中級',
    topic: 'Math + Number',
    duration: '12分',
    problem: '小数金額を最小通貨単位(整数)へ変換する toMinorUnit(amount) を作ってください。',
    starter: 'function toMinorUnit(amount) {\n  // amount: 1234.56\n  // ここを実装\n}',
    hint: 'Math.round(amount * 100) で2桁小数を整数化します。',
    answer: 'function toMinorUnit(amount) {\n  return Math.round(Number(amount) * 100)\n}'
  },
  {
    id: 84,
    title: 'AI応答のJSON安全抽出',
    level: '上級',
    topic: 'try...catch + JSON.parse',
    duration: '14分',
    problem: 'AI文字列応答からJSONを抽出し、失敗時はnullを返す parseAiJson(text) を作ってください。',
    starter: 'function parseAiJson(text) {\n  // ここを実装\n}',
    hint: '最初の{から最後の}を切り出してparseします。',
    answer:
      'function parseAiJson(text) {\n  try {\n    const start = text.indexOf("{")\n    const end = text.lastIndexOf("}")\n    if (start === -1 || end === -1 || end < start) return null\n    return JSON.parse(text.slice(start, end + 1))\n  } catch {\n    return null\n  }\n}'
  },
  {
    id: 85,
    title: 'ページングカーソル作成',
    level: '中級',
    topic: 'URLSearchParams',
    duration: '12分',
    problem: 'cursorとlimitから /api/feed?cursor=...&limit=... を作る buildCursorUrl(cursor, limit) を作ってください。',
    starter: 'function buildCursorUrl(cursor, limit) {\n  // ここを実装\n}',
    hint: 'cursorがnullなら付けない条件分岐を入れます。',
    answer:
      'function buildCursorUrl(cursor, limit) {\n  const params = new URLSearchParams()\n  if (cursor) params.append("cursor", cursor)\n  params.append("limit", String(limit))\n  return `/api/feed?${params.toString()}`\n}'
  },
  {
    id: 86,
    title: 'Webhook署名ヘッダー生成',
    level: '中級',
    topic: 'template literal',
    duration: '10分',
    problem: 'timestampとsignatureから `t=...,v1=...` を返す buildSignatureHeader を作ってください。',
    starter: 'function buildSignatureHeader(timestamp, signature) {\n  // ここを実装\n}',
    hint: '文字列連結はテンプレートリテラルが簡潔です。',
    answer: 'function buildSignatureHeader(timestamp, signature) {\n  return `t=${timestamp},v1=${signature}`\n}'
  },
  {
    id: 87,
    title: '在庫の安全減算',
    level: '中級',
    topic: 'map + Math.max',
    duration: '12分',
    problem: '対象idの在庫をqtyだけ減らし、0未満にしない decreaseStock(items, id, qty) を作ってください。',
    starter: 'function decreaseStock(items, id, qty) {\n  // ここを実装\n}',
    hint: '対象外はそのまま返し、対象だけMath.maxで下限0にします。',
    answer:
      'function decreaseStock(items, id, qty) {\n  return items.map((item) =>\n    item.id === id ? { ...item, stock: Math.max(0, item.stock - qty) } : item\n  )\n}'
  },
  {
    id: 88,
    title: '監査ログ整形',
    level: '初級',
    topic: 'map + toISOString',
    duration: '10分',
    problem: 'logsを { actor, action, atISO } へ変換する normalizeAudit(logs) を作ってください。',
    starter: 'function normalizeAudit(logs) {\n  // ここを実装\n}',
    hint: 'Date文字列は new Date(...).toISOString() で統一します。',
    answer:
      'function normalizeAudit(logs) {\n  return logs.map((l) => ({\n    actor: l.user,\n    action: l.type,\n    atISO: new Date(l.at).toISOString()\n  }))\n}'
  },
  {
    id: 89,
    title: 'feature flag適用',
    level: '中級',
    topic: 'reduce',
    duration: '12分',
    problem: 'flags配列を { key: enabled } 形式へ変換する toFlagMap(flags) を作ってください。',
    starter: 'function toFlagMap(flags) {\n  // flags: [{ key, enabled }]\n  // ここを実装\n}',
    hint: 'reduceの初期値は空オブジェクトを使います。',
    answer:
      'function toFlagMap(flags) {\n  return flags.reduce((acc, f) => {\n    acc[f.key] = Boolean(f.enabled)\n    return acc\n  }, {})\n}'
  },
  {
    id: 90,
    title: '支払い手段の優先選択',
    level: '上級',
    topic: 'find + sort',
    duration: '14分',
    problem: 'isDefault優先、同率ならupdatedAt新しい順で先頭を返す pickPrimaryMethod(methods) を作ってください。',
    starter: 'function pickPrimaryMethod(methods) {\n  // ここを実装\n}',
    hint: '並び替え条件を先に決めると実装しやすいです。',
    answer:
      'function pickPrimaryMethod(methods) {\n  if (!methods.length) return null\n  return [...methods].sort((a, b) => {\n    if (a.isDefault !== b.isDefault) return a.isDefault ? -1 : 1\n    return new Date(b.updatedAt) - new Date(a.updatedAt)\n  })[0]\n}'
  },
  {
    id: 91,
    title: 'レート制限待機',
    level: '初級',
    topic: 'Promise + setTimeout',
    duration: '8分',
    problem: 'ms待機する sleep(ms) をPromiseで作成してください。',
    starter: 'function sleep(ms) {\n  // ここを実装\n}',
    hint: 'new Promise(resolve => setTimeout(resolve, ms)) の形です。',
    answer: 'function sleep(ms) {\n  return new Promise((resolve) => setTimeout(resolve, ms))\n}'
  },
  {
    id: 92,
    title: 'CSV行パース',
    level: '中級',
    topic: 'split + trim',
    duration: '10分',
    problem: '1行CSVを分割し空白除去する parseCsvLine(line) を作ってください。',
    starter: 'function parseCsvLine(line) {\n  // ここを実装\n}',
    hint: 'split(",") の後に map(trim) します。',
    answer: 'function parseCsvLine(line) {\n  return line.split(",").map((cell) => cell.trim())\n}'
  },
  {
    id: 93,
    title: '通貨別合計集計',
    level: '上級',
    topic: 'reduce',
    duration: '16分',
    problem: 'paymentsを通貨コード単位で合計する sumByCurrency(payments) を作ってください。',
    starter: 'function sumByCurrency(payments) {\n  // payment: { currency, amount }\n  // ここを実装\n}',
    hint: 'acc[currency] = (acc[currency] ?? 0) + amount の形です。',
    answer:
      'function sumByCurrency(payments) {\n  return payments.reduce((acc, p) => {\n    acc[p.currency] = (acc[p.currency] ?? 0) + p.amount\n    return acc\n  }, {})\n}'
  },
  {
    id: 94,
    title: '検索候補ハイライト',
    level: '中級',
    topic: 'replace + RegExp',
    duration: '14分',
    problem: 'text内のkeyword一致部分を <mark>...</mark> で囲う highlight(text, keyword) を作ってください。',
    starter: 'function highlight(text, keyword) {\n  // ここを実装\n}',
    hint: 'keyword空はそのまま返し、g+iオプションで置換します。',
    answer:
      'function highlight(text, keyword) {\n  if (!keyword) return text\n  const escaped = keyword.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")\n  return text.replace(new RegExp(escaped, "gi"), (m) => `<mark>${m}</mark>`)\n}'
  },
  {
    id: 95,
    title: 'APIレスポンス時間測定',
    level: '中級',
    topic: 'performance.now',
    duration: '10分',
    problem: '非同期関数fnの実行時間(ms)を返す measureAsync(fn) を作ってください。',
    starter: 'async function measureAsync(fn) {\n  // ここを実装\n}',
    hint: '開始/終了時刻を取り、await fn() して差分を返します。',
    answer:
      'async function measureAsync(fn) {\n  const start = performance.now()\n  await fn()\n  return Math.round(performance.now() - start)\n}'
  },
  {
    id: 96,
    title: 'AIトークン上限トリム',
    level: '中級',
    topic: 'slice',
    duration: '10分',
    problem: '文字列をmaxChars以内に切り詰める trimPrompt(prompt, maxChars) を作ってください。',
    starter: 'function trimPrompt(prompt, maxChars) {\n  // ここを実装\n}',
    hint: '長さが上限以下ならそのまま返します。',
    answer:
      'function trimPrompt(prompt, maxChars) {\n  return prompt.length <= maxChars ? prompt : prompt.slice(0, maxChars)\n}'
  },
  {
    id: 97,
    title: '冪等キー生成',
    level: '中級',
    topic: 'template literal + Date.now',
    duration: '8分',
    problem: 'prefixとuserIdから冪等キーを作る buildIdempotencyKey(prefix, userId) を作ってください。',
    starter: 'function buildIdempotencyKey(prefix, userId) {\n  // ここを実装\n}',
    hint: 'prefix-userId-timestamp の連結にします。',
    answer: 'function buildIdempotencyKey(prefix, userId) {\n  return `${prefix}-${userId}-${Date.now()}`\n}'
  },
  {
    id: 98,
    title: '価格帯フィルタ',
    level: '初級',
    topic: 'filter',
    duration: '8分',
    problem: 'productsから min <= price <= max の要素のみ返す filterByPriceRange を作ってください。',
    starter: 'function filterByPriceRange(products, min, max) {\n  // ここを実装\n}',
    hint: '比較演算子を2つ並べた条件で絞り込みます。',
    answer:
      'function filterByPriceRange(products, min, max) {\n  return products.filter((p) => p.price >= min && p.price <= max)\n}'
  },
  {
    id: 99,
    title: '不要キー除外',
    level: '中級',
    topic: 'Object.entries + fromEntries',
    duration: '12分',
    problem: 'objから値がnull/undefinedのキーを除外する compactObject(obj) を作ってください。',
    starter: 'function compactObject(obj) {\n  // ここを実装\n}',
    hint: 'entries -> filter -> fromEntries の順に処理します。',
    answer:
      'function compactObject(obj) {\n  return Object.fromEntries(\n    Object.entries(obj).filter(([, value]) => value != null)\n  )\n}'
  },
  {
    id: 100,
    title: '並列取得と部分失敗通知',
    level: '実務',
    topic: 'Promise.allSettled',
    duration: '18分',
    problem: 'API群をallSettledで実行し、成功データ配列と失敗件数を返す collectDataWithErrors を作ってください。',
    starter: 'async function collectDataWithErrors(promises) {\n  // ここを実装\n}',
    hint: 'fulfilledのみmapして取り出し、rejected件数を数えます。',
    answer:
      'async function collectDataWithErrors(promises) {\n  const results = await Promise.allSettled(promises)\n  const data = results.filter((r) => r.status === "fulfilled").map((r) => r.value)\n  const errorCount = results.filter((r) => r.status === "rejected").length\n  return { data, errorCount }\n}'
  },
  {
    id: 101,
    title: 'nullish coalescingで既定値',
    level: '初級',
    topic: '??',
    duration: '8分',
    problem: 'valueがnull/undefinedのときだけfallbackを返す withFallback(value, fallback) を作ってください。',
    starter: 'function withFallback(value, fallback) {\n  // ここを実装\n}',
    hint: '|| ではなく ?? を使います。',
    answer: 'function withFallback(value, fallback) {\n  return value ?? fallback\n}'
  },
  {
    id: 102,
    title: 'optional chainingで安全参照',
    level: '初級',
    topic: '?.',
    duration: '8分',
    problem: 'user.profile.name を安全に取得し、なければ "guest" を返す getUserName(user) を作ってください。',
    starter: 'function getUserName(user) {\n  // ここを実装\n}',
    hint: '?. と ?? を組み合わせると簡潔です。',
    answer: 'function getUserName(user) {\n  return user?.profile?.name ?? "guest"\n}'
  },
  {
    id: 103,
    title: '重複除去ユーティリティ',
    level: '中級',
    topic: 'Set',
    duration: '10分',
    problem: '文字列配列の重複を除いた新配列を返す uniqueStrings(items) を作ってください。',
    starter: 'function uniqueStrings(items) {\n  // ここを実装\n}',
    hint: 'Setから配列へ戻すにはスプレッドを使います。',
    answer: 'function uniqueStrings(items) {\n  return [...new Set(items)]\n}'
  },
  {
    id: 104,
    title: 'groupByでカテゴリ集計',
    level: '中級',
    topic: 'reduce',
    duration: '12分',
    problem: 'itemsを category ごとの配列にまとめる groupByCategory(items) を作ってください。',
    starter: 'function groupByCategory(items) {\n  // item: { category, ... }\n  // ここを実装\n}',
    hint: 'acc[key] ??= [] で初期化できます。',
    answer:
      'function groupByCategory(items) {\n  return items.reduce((acc, item) => {\n    const key = item.category\n    acc[key] ??= []\n    acc[key].push(item)\n    return acc\n  }, {})\n}'
  },
  {
    id: 105,
    title: '文字列パディング',
    level: '初級',
    topic: 'padStart',
    duration: '8分',
    problem: '番号を4桁ゼロ埋めする formatCode(n) を作ってください。',
    starter: 'function formatCode(n) {\n  // ここを実装\n}',
    hint: 'String(n).padStart(4, "0") を使います。',
    answer: 'function formatCode(n) {\n  return String(n).padStart(4, "0")\n}'
  },
  {
    id: 106,
    title: '配列をチャンク分割',
    level: '中級',
    topic: 'for + slice',
    duration: '12分',
    problem: 'arrをsizeごとに分割した2次元配列を返す chunk(arr, size) を作ってください。',
    starter: 'function chunk(arr, size) {\n  // ここを実装\n}',
    hint: 'forをsize刻みで回し、sliceで切り出します。',
    answer:
      'function chunk(arr, size) {\n  const out = []\n  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))\n  return out\n}'
  },
  {
    id: 107,
    title: '日時フォーマット(YYYY-MM-DD)',
    level: '初級',
    topic: 'Date',
    duration: '10分',
    problem: 'Dateを YYYY-MM-DD 形式の文字列へ変換する formatDate(date) を作ってください。',
    starter: 'function formatDate(date) {\n  // ここを実装\n}',
    hint: 'getMonth()+1 は2桁化が必要です。',
    answer:
      'function formatDate(date) {\n  const y = date.getFullYear()\n  const m = String(date.getMonth() + 1).padStart(2, "0")\n  const d = String(date.getDate()).padStart(2, "0")\n  return `${y}-${m}-${d}`\n}'
  },
  {
    id: 108,
    title: '配列の差分抽出',
    level: '中級',
    topic: 'filter + Set',
    duration: '10分',
    problem: 'aからbに含まれない要素だけ返す diff(a, b) を作ってください。',
    starter: 'function diff(a, b) {\n  // ここを実装\n}',
    hint: 'bをSet化すると高速です。',
    answer: 'function diff(a, b) {\n  const bSet = new Set(b)\n  return a.filter((v) => !bSet.has(v))\n}'
  },
  {
    id: 109,
    title: '真偽値の件数カウント',
    level: '初級',
    topic: 'filter',
    duration: '8分',
    problem: 'flags配列のtrueの数を返す countTrue(flags) を作ってください。',
    starter: 'function countTrue(flags) {\n  // ここを実装\n}',
    hint: 'filter(Boolean).length が使えます。',
    answer: 'function countTrue(flags) {\n  return flags.filter(Boolean).length\n}'
  },
  {
    id: 110,
    title: 'ソートキーを複数条件で比較',
    level: '中級',
    topic: 'sort',
    duration: '12分',
    problem: 'usersを age昇順、同年齢はname昇順で並べる sortUsers(users) を作ってください。',
    starter: 'function sortUsers(users) {\n  // ここを実装\n}',
    hint: '1つ目条件が同じ時に2つ目条件へ進みます。',
    answer:
      'function sortUsers(users) {\n  return [...users].sort((a, b) => (a.age - b.age) || a.name.localeCompare(b.name))\n}'
  },
  {
    id: 111,
    title: 'includesで禁止語判定',
    level: '初級',
    topic: 'includes',
    duration: '8分',
    problem: 'textに禁止語badが含まれるか返す hasBadWord(text) を作ってください。',
    starter: 'function hasBadWord(text) {\n  // ここを実装\n}',
    hint: '大小文字を無視するなら toLowerCase します。',
    answer: 'function hasBadWord(text) {\n  return text.toLowerCase().includes("bad")\n}'
  },
  {
    id: 112,
    title: 'Promise直列実行',
    level: '中級',
    topic: 'for...of + await',
    duration: '14分',
    problem: 'tasks(関数配列)を順番に実行して結果配列を返す runSeries(tasks) を作ってください。',
    starter: 'async function runSeries(tasks) {\n  // ここを実装\n}',
    hint: 'for...of内で await task() します。',
    answer:
      'async function runSeries(tasks) {\n  const out = []\n  for (const task of tasks) out.push(await task())\n  return out\n}'
  },
  {
    id: 113,
    title: 'startsWithで拡張子判定',
    level: '初級',
    topic: 'startsWith + endsWith',
    duration: '8分',
    problem: 'ファイル名が .png で終わるか返す isPng(filename) を作ってください。',
    starter: 'function isPng(filename) {\n  // ここを実装\n}',
    hint: 'endsWith(".png") を使います。',
    answer: 'function isPng(filename) {\n  return filename.toLowerCase().endsWith(".png")\n}'
  },
  {
    id: 114,
    title: '先頭N件だけ取得',
    level: '中級',
    topic: 'slice',
    duration: '8分',
    problem: '配列の先頭n件を返す take(arr, n) を作ってください。',
    starter: 'function take(arr, n) {\n  // ここを実装\n}',
    hint: 'slice(0, n) です。',
    answer: 'function take(arr, n) {\n  return arr.slice(0, n)\n}'
  },
  {
    id: 115,
    title: '空文字の除去',
    level: '初級',
    topic: 'filter + trim',
    duration: '8分',
    problem: '文字列配列から空文字/空白のみ要素を除去する compactStrings(items) を作ってください。',
    starter: 'function compactStrings(items) {\n  // ここを実装\n}',
    hint: 'trim後に長さ判定します。',
    answer: 'function compactStrings(items) {\n  return items.filter((s) => s.trim().length > 0)\n}'
  },
  {
    id: 116,
    title: 'オブジェクトキーの並び替え',
    level: '中級',
    topic: 'Object.keys + sort',
    duration: '10分',
    problem: 'objのキーを昇順に並べた配列を返す sortedKeys(obj) を作ってください。',
    starter: 'function sortedKeys(obj) {\n  // ここを実装\n}',
    hint: 'Object.keys(obj).sort() で作れます。',
    answer: 'function sortedKeys(obj) {\n  return Object.keys(obj).sort()\n}'
  },
  {
    id: 117,
    title: '最小/最大の同時取得',
    level: '初級',
    topic: 'Math.min + Math.max',
    duration: '8分',
    problem: 'numbers配列のmin/maxを返す getRange(numbers) を作ってください。',
    starter: 'function getRange(numbers) {\n  // ここを実装\n}',
    hint: 'スプレッドで Math.min / Math.max に渡せます。',
    answer:
      'function getRange(numbers) {\n  return { min: Math.min(...numbers), max: Math.max(...numbers) }\n}'
  },
  {
    id: 118,
    title: '文字列テンプレート置換',
    level: '中級',
    topic: 'replaceAll',
    duration: '10分',
    problem: 'テンプレート内の {name} を実名へ置換する renderName(template, name) を作ってください。',
    starter: 'function renderName(template, name) {\n  // ここを実装\n}',
    hint: 'replaceAll("{name}", name) が簡単です。',
    answer: 'function renderName(template, name) {\n  return template.replaceAll("{name}", name)\n}'
  },
  {
    id: 119,
    title: 'ランダム整数生成',
    level: '初級',
    topic: 'Math.random',
    duration: '8分',
    problem: 'min以上max以下の整数を返す randomInt(min, max) を作ってください。',
    starter: 'function randomInt(min, max) {\n  // ここを実装\n}',
    hint: 'Math.floor(Math.random() * (max - min + 1)) + min です。',
    answer:
      'function randomInt(min, max) {\n  return Math.floor(Math.random() * (max - min + 1)) + min\n}'
  },
  {
    id: 120,
    title: 'APIレスポンスok判定ヘルパー',
    level: '中級',
    topic: 'ternary + optional chaining',
    duration: '10分',
    problem: 'res.okならjsonを返し、そうでなければnullを返す readIfOk(res) を作ってください。',
    starter: 'async function readIfOk(res) {\n  // ここを実装\n}',
    hint: 'res?.ok を条件にします。',
    answer: 'async function readIfOk(res) {\n  return res?.ok ? res.json() : null\n}'
  },
  {
    id: 121,
    title: 'OR条件で検索',
    level: '初級',
    topic: 'filter + includes',
    duration: '8分',
    problem: 'titleまたはbodyにkeywordを含む要素だけ返す searchPosts(posts, keyword) を作ってください。',
    starter: 'function searchPosts(posts, keyword) {\n  // ここを実装\n}',
    hint: 'toLowerCaseして比較すると扱いやすいです。',
    answer:
      'function searchPosts(posts, keyword) {\n  const q = keyword.toLowerCase()\n  return posts.filter((p) => p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q))\n}'
  },
  {
    id: 122,
    title: '数値レンジ正規化',
    level: '中級',
    topic: 'Math.min + Math.max',
    duration: '10分',
    problem: 'min,maxの順が逆でも [small, large] を返す normalizeRange(min, max) を作ってください。',
    starter: 'function normalizeRange(min, max) {\n  // ここを実装\n}',
    hint: 'Math.min / Math.max を組み合わせます。',
    answer: 'function normalizeRange(min, max) {\n  return [Math.min(min, max), Math.max(min, max)]\n}'
  },
  {
    id: 123,
    title: '改行区切りリスト化',
    level: '初級',
    topic: 'split',
    duration: '8分',
    problem: '改行テキストを行配列にする toLines(text) を作ってください。',
    starter: 'function toLines(text) {\n  // ここを実装\n}',
    hint: 'split("\\n") です。',
    answer: 'function toLines(text) {\n  return text.split("\\n")\n}'
  },
  {
    id: 124,
    title: '空配列でも平均値計算',
    level: '中級',
    topic: 'reduce',
    duration: '10分',
    problem: 'numbersの平均を返し、空配列なら0を返す averageOrZero(numbers) を作ってください。',
    starter: 'function averageOrZero(numbers) {\n  // ここを実装\n}',
    hint: '合計をreduceで計算後に長さで割ります。',
    answer:
      'function averageOrZero(numbers) {\n  if (!numbers.length) return 0\n  const sum = numbers.reduce((acc, n) => acc + n, 0)\n  return sum / numbers.length\n}'
  },
  {
    id: 125,
    title: '先頭文字だけ大文字化',
    level: '初級',
    topic: 'slice + toUpperCase',
    duration: '8分',
    problem: '文字列の先頭だけ大文字にする capitalize(text) を作ってください。',
    starter: 'function capitalize(text) {\n  // ここを実装\n}',
    hint: '空文字の時はそのまま返します。',
    answer:
      'function capitalize(text) {\n  if (!text) return text\n  return text[0].toUpperCase() + text.slice(1)\n}'
  },
  {
    id: 126,
    title: '重み付き合計',
    level: '中級',
    topic: 'reduce',
    duration: '12分',
    problem: 'itemsの amount * weight を合計する weightedTotal(items) を作ってください。',
    starter: 'function weightedTotal(items) {\n  // item: { amount, weight }\n  // ここを実装\n}',
    hint: 'reduceで1つの数値にまとめます。',
    answer:
      'function weightedTotal(items) {\n  return items.reduce((sum, item) => sum + item.amount * item.weight, 0)\n}'
  },
  {
    id: 127,
    title: '先頭一致の真偽判定',
    level: '初級',
    topic: 'startsWith',
    duration: '8分',
    problem: 'pathが"/admin"で始まるか返す isAdminPath(path) を作ってください。',
    starter: 'function isAdminPath(path) {\n  // ここを実装\n}',
    hint: 'startsWith("/admin") を使います。',
    answer: 'function isAdminPath(path) {\n  return path.startsWith("/admin")\n}'
  },
  {
    id: 128,
    title: '2配列の共通要素',
    level: '中級',
    topic: 'filter + Set',
    duration: '10分',
    problem: 'aとbの共通要素を返す intersect(a, b) を作ってください。',
    starter: 'function intersect(a, b) {\n  // ここを実装\n}',
    hint: '片方をSet化して判定します。',
    answer: 'function intersect(a, b) {\n  const bSet = new Set(b)\n  return a.filter((x) => bSet.has(x))\n}'
  },
  {
    id: 129,
    title: '配列先頭の安全取得',
    level: '初級',
    topic: 'at',
    duration: '8分',
    problem: '配列先頭要素を返し、空ならnullを返す firstOrNull(arr) を作ってください。',
    starter: 'function firstOrNull(arr) {\n  // ここを実装\n}',
    hint: 'arr.at(0) ?? null で書けます。',
    answer: 'function firstOrNull(arr) {\n  return arr.at(0) ?? null\n}'
  },
  {
    id: 130,
    title: '日付の新しい順ソート',
    level: '中級',
    topic: 'sort + Date',
    duration: '10分',
    problem: 'itemsをupdatedAtの新しい順で並べる sortByUpdated(items) を作ってください。',
    starter: 'function sortByUpdated(items) {\n  // ここを実装\n}',
    hint: 'new Date(b.updatedAt) - new Date(a.updatedAt) の比較です。',
    answer:
      'function sortByUpdated(items) {\n  return [...items].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))\n}'
  },
  {
    id: 131,
    title: '前後空白の統一除去',
    level: '初級',
    topic: 'trim',
    duration: '8分',
    problem: '配列内の各文字列をtrimした新配列を返す trimAll(items) を作ってください。',
    starter: 'function trimAll(items) {\n  // ここを実装\n}',
    hint: 'mapで各要素を変換します。',
    answer: 'function trimAll(items) {\n  return items.map((s) => s.trim())\n}'
  },
  {
    id: 132,
    title: '数値文字列だけ抽出',
    level: '中級',
    topic: 'filter + Number',
    duration: '10分',
    problem: '文字列配列から数値へ変換できる要素だけ返す pickNumericStrings(values) を作ってください。',
    starter: 'function pickNumericStrings(values) {\n  // ここを実装\n}',
    hint: 'Number.isNaN(Number(v)) で判定できます。',
    answer:
      'function pickNumericStrings(values) {\n  return values.filter((v) => !Number.isNaN(Number(v)))\n}'
  },
  {
    id: 133,
    title: '偶数だけ抽出',
    level: '初級',
    topic: 'filter',
    duration: '8分',
    problem: 'numbers配列から偶数だけ返す evenNumbers(numbers) を作ってください。',
    starter: 'function evenNumbers(numbers) {\n  // ここを実装\n}',
    hint: 'n % 2 === 0 です。',
    answer: 'function evenNumbers(numbers) {\n  return numbers.filter((n) => n % 2 === 0)\n}'
  },
  {
    id: 134,
    title: 'URL末尾スラッシュ除去',
    level: '中級',
    topic: 'replace',
    duration: '10分',
    problem: 'URL末尾の"/"だけ取り除く stripTrailingSlash(url) を作ってください。',
    starter: 'function stripTrailingSlash(url) {\n  // ここを実装\n}',
    hint: '正規表現 /\/$/ を使います。',
    answer: 'function stripTrailingSlash(url) {\n  return url.replace(/\/$/, "")\n}'
  },
  {
    id: 135,
    title: 'インデックス付きラベル作成',
    level: '初級',
    topic: 'map',
    duration: '8分',
    problem: 'itemsを "1. xxx" 形式へ変換する toIndexedLabels(items) を作ってください。',
    starter: 'function toIndexedLabels(items) {\n  // ここを実装\n}',
    hint: 'mapの第2引数indexを使います。',
    answer: 'function toIndexedLabels(items) {\n  return items.map((item, i) => `${i + 1}. ${item}`)\n}'
  },
  {
    id: 136,
    title: 'エラー再試行ラッパー',
    level: '中級',
    topic: 'for + try/catch',
    duration: '14分',
    problem: 'fnを最大retries回まで試行する retry(fn, retries) を作ってください。',
    starter: 'async function retry(fn, retries) {\n  // ここを実装\n}',
    hint: '最後まで失敗したら最後のエラーをthrowします。',
    answer:
      'async function retry(fn, retries) {\n  let lastError\n  for (let i = 0; i < retries; i += 1) {\n    try {\n      return await fn()\n    } catch (e) {\n      lastError = e\n    }\n  }\n  throw lastError\n}'
  },
  {
    id: 137,
    title: '配列結合文字列生成',
    level: '初級',
    topic: 'join',
    duration: '8分',
    problem: 'tags配列を ", " 区切り文字列へ変換する joinTags(tags) を作ってください。',
    starter: 'function joinTags(tags) {\n  // ここを実装\n}',
    hint: 'join(", ") を使います。',
    answer: 'function joinTags(tags) {\n  return tags.join(", ")\n}'
  },
  {
    id: 138,
    title: '先頭一致の高速判定集合',
    level: '中級',
    topic: 'some',
    duration: '10分',
    problem: 'prefixesのどれかでtextが始まるか判定する startsWithAny(text, prefixes) を作ってください。',
    starter: 'function startsWithAny(text, prefixes) {\n  // ここを実装\n}',
    hint: 'prefixes.some(...) で書けます。',
    answer: 'function startsWithAny(text, prefixes) {\n  return prefixes.some((p) => text.startsWith(p))\n}'
  },
  {
    id: 139,
    title: '0埋め時刻フォーマット',
    level: '初級',
    topic: 'padStart',
    duration: '8分',
    problem: 'h,m から HH:MM 文字列を返す formatTime(h, m) を作ってください。',
    starter: 'function formatTime(h, m) {\n  // ここを実装\n}',
    hint: 'String(...).padStart(2, "0") を使います。',
    answer:
      'function formatTime(h, m) {\n  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`\n}'
  },
  {
    id: 140,
    title: 'ページ情報計算',
    level: '中級',
    topic: 'Math.ceil',
    duration: '10分',
    problem: 'totalとpageSizeからtotalPagesを返す calcTotalPages(total, pageSize) を作ってください。',
    starter: 'function calcTotalPages(total, pageSize) {\n  // ここを実装\n}',
    hint: 'Math.ceil(total / pageSize) を使います。',
    answer: 'function calcTotalPages(total, pageSize) {\n  return Math.ceil(total / pageSize)\n}'
  },
  {
    id: 141,
    title: 'URLオブジェクトでhost取得',
    level: '初級',
    topic: 'URL',
    duration: '8分',
    problem: 'URL文字列からhostnameを返す getHost(url) を作ってください。',
    starter: 'function getHost(url) {\n  // ここを実装\n}',
    hint: 'new URL(url).hostname を使います。',
    answer: 'function getHost(url) {\n  return new URL(url).hostname\n}'
  },
  {
    id: 142,
    title: '配列をオブジェクト化',
    level: '中級',
    topic: 'Object.fromEntries',
    duration: '10分',
    problem: 'users配列を id をキーにした辞書へ変換する indexById(users) を作ってください。',
    starter: 'function indexById(users) {\n  // ここを実装\n}',
    hint: 'mapで [id, user] ペアを作って fromEntries します。',
    answer:
      'function indexById(users) {\n  return Object.fromEntries(users.map((u) => [u.id, u]))\n}'
  },
  {
    id: 143,
    title: '配列生成ユーティリティ',
    level: '初級',
    topic: 'Array.from',
    duration: '8分',
    problem: '1..n の連番配列を作る createRange(n) を作ってください。',
    starter: 'function createRange(n) {\n  // ここを実装\n}',
    hint: 'Array.from({ length: n }, (_, i) => i + 1) です。',
    answer: 'function createRange(n) {\n  return Array.from({ length: n }, (_, i) => i + 1)\n}'
  },
  {
    id: 144,
    title: 'deep copyの安全作成',
    level: '中級',
    topic: 'structuredClone',
    duration: '10分',
    problem: 'objの深いコピーを返す cloneDeep(obj) を作ってください。',
    starter: 'function cloneDeep(obj) {\n  // ここを実装\n}',
    hint: 'structuredClone を使います。',
    answer: 'function cloneDeep(obj) {\n  return structuredClone(obj)\n}'
  },
  {
    id: 145,
    title: '存在しない値を除外',
    level: '初級',
    topic: 'filter',
    duration: '8分',
    problem: '配列から null と undefined を除外する compactNullish(values) を作ってください。',
    starter: 'function compactNullish(values) {\n  // ここを実装\n}',
    hint: 'value != null 判定を使います。',
    answer: 'function compactNullish(values) {\n  return values.filter((v) => v != null)\n}'
  },
  {
    id: 146,
    title: '安全な整数判定',
    level: '中級',
    topic: 'Number.isSafeInteger',
    duration: '10分',
    problem: 'idが安全な整数か返す isSafeId(id) を作ってください。',
    starter: 'function isSafeId(id) {\n  // ここを実装\n}',
    hint: 'Number.isSafeInteger(id) を使います。',
    answer: 'function isSafeId(id) {\n  return Number.isSafeInteger(id)\n}'
  },
  {
    id: 147,
    title: '文字列反転',
    level: '初級',
    topic: 'split + reverse + join',
    duration: '8分',
    problem: '文字列を反転して返す reverseText(text) を作ってください。',
    starter: 'function reverseText(text) {\n  // ここを実装\n}',
    hint: 'split(""), reverse(), join("") の順です。',
    answer: 'function reverseText(text) {\n  return text.split("").reverse().join("")\n}'
  },
  {
    id: 148,
    title: 'Promise.raceで先着取得',
    level: '中級',
    topic: 'Promise.race',
    duration: '12分',
    problem: '複数Promiseの先に完了した値を返す firstResolved(promises) を作ってください。',
    starter: 'async function firstResolved(promises) {\n  // ここを実装\n}',
    hint: 'Promise.race(promises) をawaitします。',
    answer: 'async function firstResolved(promises) {\n  return Promise.race(promises)\n}'
  },
  {
    id: 149,
    title: '末尾n文字取得',
    level: '初級',
    topic: 'slice',
    duration: '8分',
    problem: '文字列の末尾n文字を返す tail(text, n) を作ってください。',
    starter: 'function tail(text, n) {\n  // ここを実装\n}',
    hint: 'slice(-n) を使います。',
    answer: 'function tail(text, n) {\n  return text.slice(-n)\n}'
  },
  {
    id: 150,
    title: 'TTL有効期限判定',
    level: '中級',
    topic: 'Date.now',
    duration: '10分',
    problem: 'savedAtとttlMsから期限切れか判定する isExpired(savedAt, ttlMs) を作ってください。',
    starter: 'function isExpired(savedAt, ttlMs) {\n  // ここを実装\n}',
    hint: 'Date.now() - savedAt > ttlMs です。',
    answer: 'function isExpired(savedAt, ttlMs) {\n  return Date.now() - savedAt > ttlMs\n}'
  },
  {
    id: 151,
    title: '文字列配列を小文字化',
    level: '初級',
    topic: 'map + toLowerCase',
    duration: '8分',
    problem: '文字列配列をすべて小文字へ変換する lowerAll(words) を作ってください。',
    starter: 'function lowerAll(words) {\n  // ここを実装\n}',
    hint: 'mapで変換します。',
    answer: 'function lowerAll(words) {\n  return words.map((w) => w.toLowerCase())\n}'
  },
  {
    id: 152,
    title: 'バッチ送信ペイロード作成',
    level: '中級',
    topic: 'map',
    duration: '10分',
    problem: 'ids配列を { id } 配列へ変換する toBatchPayload(ids) を作ってください。',
    starter: 'function toBatchPayload(ids) {\n  // ここを実装\n}',
    hint: 'map((id) => ({ id })) です。',
    answer: 'function toBatchPayload(ids) {\n  return ids.map((id) => ({ id }))\n}'
  },
  {
    id: 153,
    title: 'ISO日時の時刻だけ取得',
    level: '初級',
    topic: 'split',
    duration: '8分',
    problem: 'ISO文字列から HH:MM:SS を返す extractTime(iso) を作ってください。',
    starter: 'function extractTime(iso) {\n  // ここを実装\n}',
    hint: 'Tで分割後、Z除去します。',
    answer:
      'function extractTime(iso) {\n  const time = iso.split("T")[1] ?? ""\n  return time.replace("Z", "")\n}'
  },
  {
    id: 154,
    title: 'map値の合計',
    level: '中級',
    topic: 'Map + reduce',
    duration: '12分',
    problem: 'Map<number>の値合計を返す sumMapValues(map) を作ってください。',
    starter: 'function sumMapValues(map) {\n  // ここを実装\n}',
    hint: '[...map.values()] をreduceします。',
    answer: 'function sumMapValues(map) {\n  return [...map.values()].reduce((sum, n) => sum + n, 0)\n}'
  },
  {
    id: 155,
    title: '先頭一致件数カウント',
    level: '初級',
    topic: 'filter + startsWith',
    duration: '8分',
    problem: 'prefixで始まる文字列の件数を返す countByPrefix(items, prefix) を作ってください。',
    starter: 'function countByPrefix(items, prefix) {\n  // ここを実装\n}',
    hint: 'filter後のlengthです。',
    answer:
      'function countByPrefix(items, prefix) {\n  return items.filter((item) => item.startsWith(prefix)).length\n}'
  },
  {
    id: 156,
    title: '全要素ユニーク判定',
    level: '中級',
    topic: 'Set',
    duration: '10分',
    problem: '配列に重複がないか判定する isUniqueArray(arr) を作ってください。',
    starter: 'function isUniqueArray(arr) {\n  // ここを実装\n}',
    hint: 'new Set(arr).size と arr.length を比較します。',
    answer: 'function isUniqueArray(arr) {\n  return new Set(arr).size === arr.length\n}'
  },
  {
    id: 157,
    title: '固定小数点表示',
    level: '初級',
    topic: 'toFixed',
    duration: '8分',
    problem: '数値を小数2桁文字列へ変換する to2Decimal(value) を作ってください。',
    starter: 'function to2Decimal(value) {\n  // ここを実装\n}',
    hint: 'Number(value).toFixed(2) です。',
    answer: 'function to2Decimal(value) {\n  return Number(value).toFixed(2)\n}'
  },
  {
    id: 158,
    title: '既定値マージ',
    level: '中級',
    topic: 'spread',
    duration: '10分',
    problem: 'defaultsをbaseにしてoptionsを上書きする mergeOptions(defaults, options) を作ってください。',
    starter: 'function mergeOptions(defaults, options) {\n  // ここを実装\n}',
    hint: 'オブジェクトスプレッドでマージします。',
    answer: 'function mergeOptions(defaults, options) {\n  return { ...defaults, ...options }\n}'
  },
  {
    id: 159,
    title: '先頭一致削除',
    level: '初級',
    topic: 'replace',
    duration: '8分',
    problem: '文字列先頭の"#"を1つ除去する stripHash(text) を作ってください。',
    starter: 'function stripHash(text) {\n  // ここを実装\n}',
    hint: 'replace(/^#/, "") を使います。',
    answer: 'function stripHash(text) {\n  return text.replace(/^#/, "")\n}'
  },
  {
    id: 160,
    title: '実行結果をResult型化',
    level: '中級',
    topic: 'try/catch',
    duration: '12分',
    problem: 'fn実行結果を { ok, value/error } で返す toResult(fn) を作ってください。',
    starter: 'async function toResult(fn) {\n  // ここを実装\n}',
    hint: '成功時ok:true、失敗時ok:falseです。',
    answer:
      'async function toResult(fn) {\n  try {\n    return { ok: true, value: await fn() }\n  } catch (error) {\n    return { ok: false, error }\n  }\n}'
  },
  {
    id: 161,
    title: 'mapで配送ラベル生成',
    level: '初級',
    topic: 'map',
    duration: '8分',
    problem: 'orders配列から `#注文ID-顧客名` 形式のラベル配列を作ってください。',
    starter: 'function buildShippingLabels(orders) {\n  // ここを実装\n}',
    hint: 'mapで文字列変換します。',
    answer:
      'function buildShippingLabels(orders) {\n  return orders.map((o) => `#${o.id}-${o.customer}`)\n}'
  },
  {
    id: 162,
    title: 'mapで通貨換算',
    level: '中級',
    topic: 'map',
    duration: '10分',
    problem: 'pricesを通貨レートで円換算し、整数へ丸めた配列を返してください。',
    starter: 'function convertToYen(prices, rate) {\n  // ここを実装\n}',
    hint: 'map内で amount * rate を Math.round します。',
    answer:
      'function convertToYen(prices, rate) {\n  return prices.map((amount) => Math.round(amount * rate))\n}'
  },
  {
    id: 163,
    title: 'filterで平日のみ抽出',
    level: '初級',
    topic: 'filter',
    duration: '8分',
    problem: 'day配列から土日を除外した配列を返してください。',
    starter: 'function pickWeekdays(days) {\n  // ここを実装\n}',
    hint: 'sat/sun 以外を残します。',
    answer:
      'function pickWeekdays(days) {\n  return days.filter((d) => d !== "sat" && d !== "sun")\n}'
  },
  {
    id: 164,
    title: 'filterで異常値検知',
    level: '中級',
    topic: 'filter',
    duration: '10分',
    problem: 'センサー値配列から閾値upperを超えた値だけ返してください。',
    starter: 'function detectAnomalies(values, upper) {\n  // ここを実装\n}',
    hint: 'value > upper の条件です。',
    answer:
      'function detectAnomalies(values, upper) {\n  return values.filter((value) => value > upper)\n}'
  },
  {
    id: 165,
    title: 'findで未払い請求を1件取得',
    level: '初級',
    topic: 'find',
    duration: '8分',
    problem: 'invoicesから status が "unpaid" の最初の要素を返してください。',
    starter: 'function findFirstUnpaid(invoices) {\n  // ここを実装\n}',
    hint: 'findは最初の1件を返します。',
    answer:
      'function findFirstUnpaid(invoices) {\n  return invoices.find((invoice) => invoice.status === "unpaid")\n}'
  },
  {
    id: 166,
    title: 'findで期限切れチケット検索',
    level: '中級',
    topic: 'find',
    duration: '10分',
    problem: 'ticketsから dueAt が now より前の最初の要素を返してください。',
    starter: 'function findFirstOverdue(tickets, now) {\n  // ここを実装\n}',
    hint: 'Dateミリ秒で比較します。',
    answer:
      'function findFirstOverdue(tickets, now) {\n  const nowMs = new Date(now).getTime()\n  return tickets.find((t) => new Date(t.dueAt).getTime() < nowMs)\n}'
  },
  {
    id: 167,
    title: 'reduceで数量合計',
    level: '初級',
    topic: 'reduce',
    duration: '8分',
    problem: 'cart配列の qty を合計して返してください。',
    starter: 'function totalQty(cart) {\n  // ここを実装\n}',
    hint: 'reduce初期値は0にします。',
    answer:
      'function totalQty(cart) {\n  return cart.reduce((sum, item) => sum + item.qty, 0)\n}'
  },
  {
    id: 168,
    title: 'reduceで月別売上集計',
    level: '中級',
    topic: 'reduce',
    duration: '12分',
    problem: 'ordersを month("YYYY-MM") ごとの売上合計オブジェクトへ集計してください。',
    starter: 'function sumByMonth(orders) {\n  // ここを実装\n}',
    hint: 'acc[month] を加算します。',
    answer:
      'function sumByMonth(orders) {\n  return orders.reduce((acc, order) => {\n    acc[order.month] = (acc[order.month] ?? 0) + order.total\n    return acc\n  }, {})\n}'
  },
  {
    id: 169,
    title: 'includesで権限判定',
    level: '初級',
    topic: 'includes',
    duration: '8分',
    problem: 'roles配列に"admin"が含まれるか返してください。',
    starter: 'function hasAdminRole(roles) {\n  // ここを実装\n}',
    hint: 'roles.includes("admin") です。',
    answer: 'function hasAdminRole(roles) {\n  return roles.includes("admin")\n}'
  },
  {
    id: 170,
    title: 'includesで拒否ドメイン判定',
    level: '中級',
    topic: 'includes',
    duration: '10分',
    problem: 'emailのドメインがdenyListに含まれるか判定してください。',
    starter: 'function isDeniedEmail(email, denyList) {\n  // ここを実装\n}',
    hint: '@以降を取り出してincludesで確認します。',
    answer:
      'function isDeniedEmail(email, denyList) {\n  const domain = email.split("@")[1] ?? ""\n  return denyList.includes(domain)\n}'
  },
  {
    id: 171,
    title: 'Object.keysで項目数取得',
    level: '初級',
    topic: 'Object.keys',
    duration: '8分',
    problem: 'オブジェクトのキー数を返す countFields(obj) を作ってください。',
    starter: 'function countFields(obj) {\n  // ここを実装\n}',
    hint: 'Object.keys(obj).length です。',
    answer: 'function countFields(obj) {\n  return Object.keys(obj).length\n}'
  },
  {
    id: 172,
    title: 'Object.valuesで最大値取得',
    level: '中級',
    topic: 'Object.values',
    duration: '10分',
    problem: 'scoreMapオブジェクトの最大スコアを返してください。',
    starter: 'function maxScore(scoreMap) {\n  // ここを実装\n}',
    hint: 'Object.valuesをMath.maxへ渡します。',
    answer:
      'function maxScore(scoreMap) {\n  const values = Object.values(scoreMap)\n  return values.length ? Math.max(...values) : null\n}'
  },
  {
    id: 173,
    title: 'スプレッドで配列追加',
    level: '初級',
    topic: '...spread',
    duration: '8分',
    problem: 'tags配列の末尾にnewTagを追加した新配列を返してください。',
    starter: 'function appendTag(tags, newTag) {\n  // ここを実装\n}',
    hint: '[...tags, newTag] を返します。',
    answer: 'function appendTag(tags, newTag) {\n  return [...tags, newTag]\n}'
  },
  {
    id: 174,
    title: 'スプレッドで条件付き上書き',
    level: '中級',
    topic: '...spread',
    duration: '10分',
    problem: 'isAdminがtrueの時だけ role: "admin" を付与する buildUser(base, isAdmin) を作ってください。',
    starter: 'function buildUser(base, isAdmin) {\n  // ここを実装\n}',
    hint: '...(isAdmin && { role: "admin" }) が使えます。',
    answer:
      'function buildUser(base, isAdmin) {\n  return {\n    ...base,\n    ...(isAdmin && { role: "admin" })\n  }\n}'
  },
  {
    id: 175,
    title: 'async/awaitで1件取得',
    level: '初級',
    topic: 'async/await',
    duration: '8分',
    problem: 'getProfile() をawaitして profile.name を返す getProfileName() を作ってください。',
    starter: 'async function getProfileName() {\n  // ここを実装\n}',
    hint: 'await getProfile() の戻り値からnameを返します。',
    answer:
      'async function getProfileName() {\n  const profile = await getProfile()\n  return profile.name\n}'
  },
  {
    id: 176,
    title: 'async/awaitで逐次処理',
    level: '中級',
    topic: 'async/await',
    duration: '12分',
    problem: 'idsを順番にfetchUserByIdして結果配列を返す loadUsersInOrder(ids) を作ってください。',
    starter: 'async function loadUsersInOrder(ids) {\n  // ここを実装\n}',
    hint: 'for...of + awaitで順序を保ちます。',
    answer:
      'async function loadUsersInOrder(ids) {\n  const users = []\n  for (const id of ids) users.push(await fetchUserById(id))\n  return users\n}'
  },
  {
    id: 177,
    title: 'fetchでGET + json',
    level: '初級',
    topic: 'fetch',
    duration: '8分',
    problem: 'urlを受けてJSONを返す simpleGet(url) を作ってください。',
    starter: 'async function simpleGet(url) {\n  // ここを実装\n}',
    hint: 'await fetch(url) 後に response.json() です。',
    answer:
      'async function simpleGet(url) {\n  const response = await fetch(url)\n  return response.json()\n}'
  },
  {
    id: 178,
    title: 'fetchでPATCH送信',
    level: '中級',
    topic: 'fetch',
    duration: '12分',
    problem: 'idとpatchを受け取りPATCHで更新する patchUser(id, patch) を作ってください。',
    starter: 'async function patchUser(id, patch) {\n  // ここを実装\n}',
    hint: 'method, headers, body(JSON.stringify) を指定します。',
    answer:
      'async function patchUser(id, patch) {\n  const response = await fetch(`/api/users/${id}`, {\n    method: "PATCH",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify(patch)\n  })\n  return response.json()\n}'
  },
  {
    id: 179,
    title: 'JSON.stringifyで保存文字列化',
    level: '初級',
    topic: 'JSON.stringify',
    duration: '8分',
    problem: 'settingsオブジェクトをlocalStorage保存向け文字列へ変換する serializeSettings を作ってください。',
    starter: 'function serializeSettings(settings) {\n  // ここを実装\n}',
    hint: 'JSON.stringify(settings) を返します。',
    answer: 'function serializeSettings(settings) {\n  return JSON.stringify(settings)\n}'
  },
  {
    id: 180,
    title: 'JSON.parseで配列検証',
    level: '中級',
    topic: 'JSON.parse',
    duration: '10分',
    problem: 'json文字列を配列として復元し、配列でなければ空配列を返す parseArrayOrEmpty を作ってください。',
    starter: 'function parseArrayOrEmpty(json) {\n  // ここを実装\n}',
    hint: 'parse後にArray.isArrayで判定します。',
    answer:
      'function parseArrayOrEmpty(json) {\n  try {\n    const parsed = JSON.parse(json)\n    return Array.isArray(parsed) ? parsed : []\n  } catch {\n    return []\n  }\n}'
  },
  {
    id: 181,
    title: 'mapで通知文面を生成',
    level: '初級',
    topic: 'map',
    duration: '8分',
    problem: 'notifications配列から `【type】message` 形式の文字列配列を返す formatNotifications(notifications) を作ってください。',
    starter: 'function formatNotifications(notifications) {\n  // ここを実装\n}',
    hint: 'mapで各要素をテンプレート文字列に変換します。',
    answer:
      'function formatNotifications(notifications) {\n  return notifications.map((n) => `【${n.type}】${n.message}`)\n}'
  },
  {
    id: 182,
    title: 'filterで公開記事だけ抽出',
    level: '中級',
    topic: 'filter',
    duration: '10分',
    problem: 'posts配列から status が "published" の記事だけ返す getPublishedPosts(posts) を作ってください。',
    starter: 'function getPublishedPosts(posts) {\n  // ここを実装\n}',
    hint: 'filterの条件でstatusを比較します。',
    answer:
      'function getPublishedPosts(posts) {\n  return posts.filter((post) => post.status === "published")\n}'
  },
  {
    id: 183,
    title: 'findで現在ログインユーザー取得',
    level: '初級',
    topic: 'find',
    duration: '8分',
    problem: 'users配列から isCurrent が true のユーザーを返す getCurrentUser(users) を作ってください。',
    starter: 'function getCurrentUser(users) {\n  // ここを実装\n}',
    hint: 'findで最初の一致要素を返します。',
    answer:
      'function getCurrentUser(users) {\n  return users.find((user) => user.isCurrent)\n}'
  },
  {
    id: 184,
    title: 'reduceでタグ別件数を集計',
    level: '中級',
    topic: 'reduce',
    duration: '12分',
    problem: 'articles配列から tag ごとの件数オブジェクトを返す countByTag(articles) を作ってください。',
    starter: 'function countByTag(articles) {\n  // ここを実装\n}',
    hint: 'reduceで累積オブジェクトを更新します。',
    answer:
      'function countByTag(articles) {\n  return articles.reduce((acc, article) => {\n    acc[article.tag] = (acc[article.tag] || 0) + 1\n    return acc\n  }, {})\n}'
  },
  {
    id: 185,
    title: 'includesで権限判定',
    level: '初級',
    topic: 'includes',
    duration: '8分',
    problem: 'roles配列に "admin" が含まれるか返す canAccessAdmin(roles) を作ってください。',
    starter: 'function canAccessAdmin(roles) {\n  // ここを実装\n}',
    hint: 'includes("admin") を返します。',
    answer:
      'function canAccessAdmin(roles) {\n  return roles.includes("admin")\n}'
  },
  {
    id: 186,
    title: 'Object.keysで差分フィールド抽出',
    level: '中級',
    topic: 'Object.keys',
    duration: '12分',
    problem: 'before/afterオブジェクトを比較し、値が変わったキー配列を返す getChangedFields(before, after) を作ってください。',
    starter: 'function getChangedFields(before, after) {\n  // ここを実装\n}',
    hint: 'Object.keys(after)を走査して比較します。',
    answer:
      'function getChangedFields(before, after) {\n  return Object.keys(after).filter((key) => before[key] !== after[key])\n}'
  },
  {
    id: 187,
    title: 'Object.valuesで在庫合計',
    level: '初級',
    topic: 'Object.values',
    duration: '10分',
    problem: 'inventoryオブジェクトの値を合計して返す getTotalStock(inventory) を作ってください。',
    starter: 'function getTotalStock(inventory) {\n  // ここを実装\n}',
    hint: 'Object.values + reduce で合計します。',
    answer:
      'function getTotalStock(inventory) {\n  return Object.values(inventory).reduce((sum, qty) => sum + qty, 0)\n}'
  },
  {
    id: 188,
    title: 'スプレッドでクエリ条件マージ',
    level: '中級',
    topic: '...spread',
    duration: '10分',
    problem: 'baseQueryにoverridesを上書きマージして返す buildQuery(baseQuery, overrides) を作ってください。',
    starter: 'function buildQuery(baseQuery, overrides) {\n  // ここを実装\n}',
    hint: 'return { ...baseQuery, ...overrides } です。',
    answer:
      'function buildQuery(baseQuery, overrides) {\n  return { ...baseQuery, ...overrides }\n}'
  },
  {
    id: 189,
    title: 'async/awaitで2API直列取得',
    level: '初級',
    topic: 'async/await + fetch',
    duration: '12分',
    problem: 'userIdを受けて user と profile を順に取得し { user, profile } を返す fetchUserBundle(userId) を作ってください。',
    starter: 'async function fetchUserBundle(userId) {\n  // ここを実装\n}',
    hint: '2回fetchしてそれぞれjson()をawaitします。',
    answer:
      'async function fetchUserBundle(userId) {\n  const userRes = await fetch(`/api/users/${userId}`)\n  const user = await userRes.json()\n  const profileRes = await fetch(`/api/users/${userId}/profile`)\n  const profile = await profileRes.json()\n  return { user, profile }\n}'
  },
  {
    id: 190,
    title: 'JSON.parse/stringifyで安全更新',
    level: '中級',
    topic: 'JSON.parse + JSON.stringify',
    duration: '12分',
    problem: 'json文字列の設定を更新して再度文字列で返す updateSettingsJson(settingsJson, patch) を作ってください。parse失敗時はpatchのみを文字列化して返します。',
    starter: 'function updateSettingsJson(settingsJson, patch) {\n  // ここを実装\n}',
    hint: 'try/catchでJSON.parseを保護して最後にJSON.stringifyします。',
    answer:
      'function updateSettingsJson(settingsJson, patch) {\n  try {\n    const current = JSON.parse(settingsJson)\n    return JSON.stringify({ ...current, ...patch })\n  } catch {\n    return JSON.stringify({ ...patch })\n  }\n}'
  },
  {
    id: 191,
    title: 'mapで商品名一覧を整形',
    level: '初級',
    topic: 'map',
    duration: '8分',
    problem: 'products配列から `#id name` 形式の文字列配列を返す formatProductNames(products) を作ってください。',
    starter: 'function formatProductNames(products) {\n  // ここを実装\n}',
    hint: 'mapで各要素を文字列に変換します。',
    answer: 'function formatProductNames(products) {\n  return products.map((p) => `#${p.id} ${p.name}`)\n}'
  },
  {
    id: 192,
    title: 'mapでAPIレスポンスをUI型へ変換',
    level: '中級',
    topic: 'map',
    duration: '10分',
    problem: 'users配列を `{ label, value }` 形式へ変換する toSelectOptions(users) を作ってください。labelはname、valueはidです。',
    starter: 'function toSelectOptions(users) {\n  // ここを実装\n}',
    hint: 'mapで新しいオブジェクトを返します。',
    answer:
      'function toSelectOptions(users) {\n  return users.map((u) => ({ label: u.name, value: u.id }))\n}'
  },
  {
    id: 193,
    title: 'filterで期限切れクーポン除外',
    level: '初級',
    topic: 'filter',
    duration: '10分',
    problem: 'coupons配列から expired が false の要素のみ返す getAvailableCoupons(coupons) を作ってください。',
    starter: 'function getAvailableCoupons(coupons) {\n  // ここを実装\n}',
    hint: 'filterで !expired を条件にします。',
    answer:
      'function getAvailableCoupons(coupons) {\n  return coupons.filter((coupon) => !coupon.expired)\n}'
  },
  {
    id: 194,
    title: 'filterで価格帯検索',
    level: '中級',
    topic: 'filter',
    duration: '10分',
    problem: 'items配列から minPrice以上maxPrice以下の要素を返す filterByPriceRange(items, minPrice, maxPrice) を作ってください。',
    starter: 'function filterByPriceRange(items, minPrice, maxPrice) {\n  // ここを実装\n}',
    hint: 'priceの上下限を同時に判定します。',
    answer:
      'function filterByPriceRange(items, minPrice, maxPrice) {\n  return items.filter((item) => item.price >= minPrice && item.price <= maxPrice)\n}'
  },
  {
    id: 195,
    title: 'findで最初の未完了タスク取得',
    level: '初級',
    topic: 'find',
    duration: '8分',
    problem: 'tasks配列から done が false の最初の要素を返す getFirstPendingTask(tasks) を作ってください。',
    starter: 'function getFirstPendingTask(tasks) {\n  // ここを実装\n}',
    hint: 'findで条件に合う先頭1件を返します。',
    answer:
      'function getFirstPendingTask(tasks) {\n  return tasks.find((task) => !task.done)\n}'
  },
  {
    id: 196,
    title: 'findでSKU一致アイテム取得',
    level: '中級',
    topic: 'find',
    duration: '10分',
    problem: 'catalog配列とskuを受け取り、一致する商品を返す findBySku(catalog, sku) を作ってください。',
    starter: 'function findBySku(catalog, sku) {\n  // ここを実装\n}',
    hint: 'item.sku === sku で比較します。',
    answer: 'function findBySku(catalog, sku) {\n  return catalog.find((item) => item.sku === sku)\n}'
  },
  {
    id: 197,
    title: 'reduceで注文点数を合計',
    level: '初級',
    topic: 'reduce',
    duration: '10分',
    problem: 'orderItems配列のqtyを合計して返す countOrderItems(orderItems) を作ってください。',
    starter: 'function countOrderItems(orderItems) {\n  // ここを実装\n}',
    hint: '初期値0でreduceします。',
    answer:
      'function countOrderItems(orderItems) {\n  return orderItems.reduce((sum, item) => sum + item.qty, 0)\n}'
  },
  {
    id: 198,
    title: 'reduceでユーザーをID辞書化',
    level: '中級',
    topic: 'reduce',
    duration: '12分',
    problem: 'users配列を `{ [id]: user }` の形に変換する indexUsersById(users) を作ってください。',
    starter: 'function indexUsersById(users) {\n  // ここを実装\n}',
    hint: 'reduceの累積値をオブジェクトにします。',
    answer:
      'function indexUsersById(users) {\n  return users.reduce((acc, user) => {\n    acc[user.id] = user\n    return acc\n  }, {})\n}'
  },
  {
    id: 199,
    title: 'includesで拡張子許可判定',
    level: '初級',
    topic: 'includes',
    duration: '8分',
    problem: 'allowedExtensions配列にextが含まれるか判定する isAllowedExtension(allowedExtensions, ext) を作ってください。',
    starter: 'function isAllowedExtension(allowedExtensions, ext) {\n  // ここを実装\n}',
    hint: 'includes(ext) を返します。',
    answer:
      'function isAllowedExtension(allowedExtensions, ext) {\n  return allowedExtensions.includes(ext)\n}'
  },
  {
    id: 200,
    title: 'includesで危険語チェック',
    level: '中級',
    topic: 'includes',
    duration: '10分',
    problem: 'textに禁止ワード配列のいずれかが含まれるか返す containsBlockedWord(text, blockedWords) を作ってください。',
    starter: 'function containsBlockedWord(text, blockedWords) {\n  // ここを実装\n}',
    hint: 'someとincludesを組み合わせます。',
    answer:
      'function containsBlockedWord(text, blockedWords) {\n  return blockedWords.some((word) => text.includes(word))\n}'
  },
  {
    id: 201,
    title: 'Object.keysで空オブジェクト判定',
    level: '初級',
    topic: 'Object.keys',
    duration: '8分',
    problem: 'objが空オブジェクトならtrueを返す isEmptyObject(obj) を作ってください。',
    starter: 'function isEmptyObject(obj) {\n  // ここを実装\n}',
    hint: 'Object.keys(obj).length を使います。',
    answer: 'function isEmptyObject(obj) {\n  return Object.keys(obj).length === 0\n}'
  },
  {
    id: 202,
    title: 'Object.keysで必須項目不足を検出',
    level: '中級',
    topic: 'Object.keys',
    duration: '12分',
    problem: 'payloadとrequiredKeysを受け取り、欠けているキー配列を返す getMissingKeys(payload, requiredKeys) を作ってください。',
    starter: 'function getMissingKeys(payload, requiredKeys) {\n  // ここを実装\n}',
    hint: 'payload側のキー一覧を取り、requiredKeysをfilterします。',
    answer:
      'function getMissingKeys(payload, requiredKeys) {\n  const presentKeys = Object.keys(payload)\n  return requiredKeys.filter((key) => !presentKeys.includes(key))\n}'
  },
  {
    id: 203,
    title: 'Object.valuesで平均評価を計算',
    level: '初級',
    topic: 'Object.values',
    duration: '10分',
    problem: 'ratingsオブジェクトの平均値を返す calcAverageRating(ratings) を作ってください。値が0件なら0を返します。',
    starter: 'function calcAverageRating(ratings) {\n  // ここを実装\n}',
    hint: 'Object.valuesで配列化し、件数0を先に処理します。',
    answer:
      'function calcAverageRating(ratings) {\n  const values = Object.values(ratings)\n  if (!values.length) return 0\n  const sum = values.reduce((total, score) => total + score, 0)\n  return sum / values.length\n}'
  },
  {
    id: 204,
    title: 'Object.valuesで売上上位判定',
    level: '中級',
    topic: 'Object.values',
    duration: '10分',
    problem: 'salesMapの最大売上を返す getMaxSales(salesMap) を作ってください。データがなければ0を返します。',
    starter: 'function getMaxSales(salesMap) {\n  // ここを実装\n}',
    hint: 'Object.valuesの結果にMath.maxを使います。',
    answer:
      'function getMaxSales(salesMap) {\n  const values = Object.values(salesMap)\n  return values.length ? Math.max(...values) : 0\n}'
  },
  {
    id: 205,
    title: 'スプレッドで配列先頭に追加',
    level: '初級',
    topic: '...spread',
    duration: '8分',
    problem: 'items配列の先頭にnewItemを追加した新配列を返す prependItem(items, newItem) を作ってください。',
    starter: 'function prependItem(items, newItem) {\n  // ここを実装\n}',
    hint: '[newItem, ...items] を返します。',
    answer: 'function prependItem(items, newItem) {\n  return [newItem, ...items]\n}'
  },
  {
    id: 206,
    title: 'スプレッドでネスト設定を更新',
    level: '中級',
    topic: '...spread',
    duration: '12分',
    problem: 'settingsのnotifications.emailだけをnewValueで更新する updateEmailNotification(settings, newValue) を作ってください。',
    starter: 'function updateEmailNotification(settings, newValue) {\n  // ここを実装\n}',
    hint: 'ネストしたオブジェクトもスプレッドでコピーします。',
    answer:
      'function updateEmailNotification(settings, newValue) {\n  return {\n    ...settings,\n    notifications: {\n      ...settings.notifications,\n      email: newValue\n    }\n  }\n}'
  },
  {
    id: 207,
    title: 'async/awaitで商品詳細取得',
    level: '初級',
    topic: 'async/await + fetch',
    duration: '10分',
    problem: 'productIdを受けて `/api/products/:id` からJSONを返す fetchProduct(productId) を作ってください。',
    starter: 'async function fetchProduct(productId) {\n  // ここを実装\n}',
    hint: 'fetchしてjson()を返します。',
    answer:
      'async function fetchProduct(productId) {\n  const res = await fetch(`/api/products/${productId}`)\n  return res.json()\n}'
  },
  {
    id: 208,
    title: 'async/awaitでレスポンス状態検証',
    level: '中級',
    topic: 'async/await + fetch',
    duration: '12分',
    problem: 'urlを受けてGETし、res.okがfalseならErrorをthrow、trueならJSONを返す fetchOrThrow(url) を作ってください。',
    starter: 'async function fetchOrThrow(url) {\n  // ここを実装\n}',
    hint: 'if (!res.ok) throw new Error(...) を入れます。',
    answer:
      'async function fetchOrThrow(url) {\n  const res = await fetch(url)\n  if (!res.ok) throw new Error("Request failed")\n  return res.json()\n}'
  },
  {
    id: 209,
    title: 'fetchでJSON POST送信',
    level: '初級',
    topic: 'fetch',
    duration: '10分',
    problem: 'payloadを `/api/contact` にPOSTし、JSONレスポンスを返す sendContact(payload) を作ってください。',
    starter: 'async function sendContact(payload) {\n  // ここを実装\n}',
    hint: 'method, headers, body(JSON.stringify) を指定します。',
    answer:
      'async function sendContact(payload) {\n  const res = await fetch("/api/contact", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify(payload)\n  })\n  return res.json()\n}'
  },
  {
    id: 210,
    title: 'fetchでクエリ付き検索',
    level: '中級',
    topic: 'fetch',
    duration: '12分',
    problem: 'keywordをクエリにつけて `/api/search` を呼び出しJSONを返す searchByKeyword(keyword) を作ってください。',
    starter: 'async function searchByKeyword(keyword) {\n  // ここを実装\n}',
    hint: 'encodeURIComponentでkeywordをエスケープします。',
    answer:
      'async function searchByKeyword(keyword) {\n  const q = encodeURIComponent(keyword)\n  const res = await fetch(`/api/search?keyword=${q}`)\n  return res.json()\n}'
  },
  {
    id: 211,
    title: 'JSON.parseで文字列配列復元',
    level: '初級',
    topic: 'JSON.parse',
    duration: '8分',
    problem: 'jsonTextを配列として復元する parseStringList(jsonText) を作ってください。失敗時は空配列を返します。',
    starter: 'function parseStringList(jsonText) {\n  // ここを実装\n}',
    hint: 'try/catchでJSON.parseを保護します。',
    answer:
      'function parseStringList(jsonText) {\n  try {\n    const parsed = JSON.parse(jsonText)\n    return Array.isArray(parsed) ? parsed : []\n  } catch {\n    return []\n  }\n}'
  },
  {
    id: 212,
    title: 'JSON.parseで設定の型を補正',
    level: '中級',
    topic: 'JSON.parse',
    duration: '10分',
    problem: 'jsonTextをparseし、themeが文字列でなければ"light"を設定して返す parseConfigWithTheme(jsonText) を作ってください。',
    starter: 'function parseConfigWithTheme(jsonText) {\n  // ここを実装\n}',
    hint: 'parse後にtypeofでthemeを確認します。',
    answer:
      'function parseConfigWithTheme(jsonText) {\n  try {\n    const config = JSON.parse(jsonText)\n    return {\n      ...config,\n      theme: typeof config.theme === "string" ? config.theme : "light"\n    }\n  } catch {\n    return { theme: "light" }\n  }\n}'
  },
  {
    id: 213,
    title: 'JSON.stringifyでクエリキャッシュキー作成',
    level: '初級',
    topic: 'JSON.stringify',
    duration: '8分',
    problem: 'paramsオブジェクトからキャッシュキー文字列を返す createCacheKey(params) を作ってください。',
    starter: 'function createCacheKey(params) {\n  // ここを実装\n}',
    hint: 'JSON.stringify(params) を返します。',
    answer: 'function createCacheKey(params) {\n  return JSON.stringify(params)\n}'
  },
  {
    id: 214,
    title: 'JSON.stringifyで監査ログ行を作成',
    level: '中級',
    topic: 'JSON.stringify',
    duration: '10分',
    problem: 'action, actorId, payloadを受けて監査ログJSON文字列を返す buildAuditLog(action, actorId, payload) を作ってください。timestampはDate.now()を使います。',
    starter: 'function buildAuditLog(action, actorId, payload) {\n  // ここを実装\n}',
    hint: 'オブジェクトを組み立ててJSON.stringifyします。',
    answer:
      'function buildAuditLog(action, actorId, payload) {\n  return JSON.stringify({\n    action,\n    actorId,\n    payload,\n    timestamp: Date.now()\n  })\n}'
  },
  {
    id: 215,
    title: 'map+includesで選択状態を付与',
    level: '初級',
    topic: 'map + includes',
    duration: '10分',
    problem: 'items配列とselectedIds配列を受け取り、各要素に selected(boolean) を追加した配列を返す addSelectedFlag(items, selectedIds) を作ってください。',
    starter: 'function addSelectedFlag(items, selectedIds) {\n  // ここを実装\n}',
    hint: 'map内でselectedIds.includes(item.id)を使います。',
    answer:
      'function addSelectedFlag(items, selectedIds) {\n  return items.map((item) => ({\n    ...item,\n    selected: selectedIds.includes(item.id)\n  }))\n}'
  },
  {
    id: 216,
    title: 'filter+mapで公開タイトル一覧化',
    level: '中級',
    topic: 'filter + map',
    duration: '10分',
    problem: 'posts配列から公開済みのみ抽出し、タイトル配列を返す listPublishedTitles(posts) を作ってください。',
    starter: 'function listPublishedTitles(posts) {\n  // ここを実装\n}',
    hint: 'filter後にmapでtitleを取り出します。',
    answer:
      'function listPublishedTitles(posts) {\n  return posts.filter((p) => p.status === "published").map((p) => p.title)\n}'
  },
  {
    id: 217,
    title: 'reduce+Object.valuesで平均注文額',
    level: '初級',
    topic: 'reduce + Object.values',
    duration: '10分',
    problem: 'orderAmountMapの平均値を返す calcAverageOrderAmount(orderAmountMap) を作ってください。データがない場合は0を返します。',
    starter: 'function calcAverageOrderAmount(orderAmountMap) {\n  // ここを実装\n}',
    hint: 'Object.valuesで配列化してsum/lengthを計算します。',
    answer:
      'function calcAverageOrderAmount(orderAmountMap) {\n  const amounts = Object.values(orderAmountMap)\n  if (!amounts.length) return 0\n  const sum = amounts.reduce((total, amount) => total + amount, 0)\n  return sum / amounts.length\n}'
  },
  {
    id: 218,
    title: 'async/awaitで並列取得統合',
    level: '中級',
    topic: 'async/await + fetch',
    duration: '12分',
    problem: 'dashboardデータとして `/api/stats` と `/api/alerts` を並列取得し `{ stats, alerts }` を返す fetchDashboardData() を作ってください。',
    starter: 'async function fetchDashboardData() {\n  // ここを実装\n}',
    hint: 'Promise.allで2つのfetchを待機します。',
    answer:
      'async function fetchDashboardData() {\n  const [statsRes, alertsRes] = await Promise.all([\n    fetch("/api/stats"),\n    fetch("/api/alerts")\n  ])\n  const [stats, alerts] = await Promise.all([statsRes.json(), alertsRes.json()])\n  return { stats, alerts }\n}'
  },
  {
    id: 219,
    title: 'JSON.parse+includesでお気に入り判定',
    level: '初級',
    topic: 'JSON.parse + includes',
    duration: '10分',
    problem: 'favoritesJson(配列JSON)とitemIdを受け取り、含まれていればtrueを返す isFavoriteFromJson(favoritesJson, itemId) を作ってください。失敗時はfalseです。',
    starter: 'function isFavoriteFromJson(favoritesJson, itemId) {\n  // ここを実装\n}',
    hint: 'parseしてincludesを使います。',
    answer:
      'function isFavoriteFromJson(favoritesJson, itemId) {\n  try {\n    const ids = JSON.parse(favoritesJson)\n    return Array.isArray(ids) && ids.includes(itemId)\n  } catch {\n    return false\n  }\n}'
  },
  {
    id: 220,
    title: 'Object.keys+reduceで空値キー抽出',
    level: '中級',
    topic: 'Object.keys + reduce',
    duration: '12分',
    problem: 'formオブジェクトから値が空文字のキー配列を返す listBlankFields(form) を作ってください。',
    starter: 'function listBlankFields(form) {\n  // ここを実装\n}',
    hint: 'Object.keys(form)をreduceして条件一致キーをpushします。',
    answer:
      'function listBlankFields(form) {\n  return Object.keys(form).reduce((acc, key) => {\n    if (form[key] === "") acc.push(key)\n    return acc\n  }, [])\n}'
  },
  {
    id: 221,
    title: 'Regexで数字のみ判定',
    level: '初級',
    topic: 'RegExp',
    duration: '8分',
    problem: '文字列が半角数字のみで構成されるか判定する isDigitsOnly(text) を作ってください。空文字はfalseです。',
    starter: 'function isDigitsOnly(text) {\n  // ここを実装\n}',
    hint: '^\\d+$ のパターンを使います。',
    answer: 'function isDigitsOnly(text) {\n  return /^\\d+$/.test(text)\n}'
  },
  {
    id: 222,
    title: 'Regexで英数字ID検証',
    level: '初級',
    topic: 'RegExp validation',
    duration: '10分',
    problem: '6〜12文字の英数字のみ許可する validateUserId(userId) を作ってください。',
    starter: 'function validateUserId(userId) {\n  // ここを実装\n}',
    hint: '^[A-Za-z0-9]{6,12}$ を使います。',
    answer: 'function validateUserId(userId) {\n  return /^[A-Za-z0-9]{6,12}$/.test(userId)\n}'
  },
  {
    id: 223,
    title: 'メール形式バリデーション',
    level: '中級',
    topic: 'RegExp validation',
    duration: '12分',
    problem: 'メールアドレス形式を簡易判定する isValidEmail(email) を作ってください。',
    starter: 'function isValidEmail(email) {\n  // ここを実装\n}',
    hint: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$ のような簡易正規表現を使います。',
    answer: 'function isValidEmail(email) {\n  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)\n}'
  },
  {
    id: 224,
    title: '電話番号のハイフン許容判定',
    level: '中級',
    topic: 'RegExp validation',
    duration: '12分',
    problem: '090-1234-5678 または 09012345678 形式を許可する isValidPhone(phone) を作ってください。',
    starter: 'function isValidPhone(phone) {\n  // ここを実装\n}',
    hint: '^(\\d{11}|\\d{3}-\\d{4}-\\d{4})$ を使います。',
    answer: 'function isValidPhone(phone) {\n  return /^(\\d{11}|\\d{3}-\\d{4}-\\d{4})$/.test(phone)\n}'
  },
  {
    id: 225,
    title: '郵便番号フォーマット判定',
    level: '初級',
    topic: 'RegExp',
    duration: '8分',
    problem: '123-4567 形式のみ許可する isValidZip(zip) を作ってください。',
    starter: 'function isValidZip(zip) {\n  // ここを実装\n}',
    hint: '^\\d{3}-\\d{4}$ を使います。',
    answer: 'function isValidZip(zip) {\n  return /^\\d{3}-\\d{4}$/.test(zip)\n}'
  },
  {
    id: 226,
    title: 'パスワード強度チェック',
    level: '中級',
    topic: 'RegExp validation',
    duration: '14分',
    problem: '8文字以上で英字と数字を含むか判定する isStrongPassword(password) を作ってください。',
    starter: 'function isStrongPassword(password) {\n  // ここを実装\n}',
    hint: '先読み (?=.*[A-Za-z])(?=.*\\d) と長さ条件を組み合わせます。',
    answer: 'function isStrongPassword(password) {\n  return /^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$/.test(password)\n}'
  },
  {
    id: 227,
    title: 'URL形式の簡易判定',
    level: '中級',
    topic: 'RegExp validation',
    duration: '12分',
    problem: 'http:// または https:// で始まるURLを判定する isHttpUrl(url) を作ってください。',
    starter: 'function isHttpUrl(url) {\n  // ここを実装\n}',
    hint: '^https?:\\/\\/ を先頭に置きます。',
    answer: 'function isHttpUrl(url) {\n  return /^https?:\\/\\/.+/.test(url)\n}'
  },
  {
    id: 228,
    title: 'バリデーションエラー収集',
    level: '実務',
    topic: 'RegExp form validation',
    duration: '16分',
    problem: 'form({ email, phone, zip })を受け取り、不正項目名の配列を返す validateContactForm(form) を作ってください。',
    starter: 'function validateContactForm(form) {\n  // ここを実装\n}',
    hint: '各フィールドをRegexで判定し、NGならerrorsへpushします。',
    answer:
      'function validateContactForm(form) {\n  const errors = []\n  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(form.email)) errors.push("email")\n  if (!/^(\\d{11}|\\d{3}-\\d{4}-\\d{4})$/.test(form.phone)) errors.push("phone")\n  if (!/^\\d{3}-\\d{4}$/.test(form.zip)) errors.push("zip")\n  return errors\n}'
  },
  {
    id: 229,
    title: '入力から数字だけ抽出',
    level: '初級',
    topic: 'RegExp replace',
    duration: '8分',
    problem: '文字列から数字以外を除去して返す extractDigits(text) を作ってください。',
    starter: 'function extractDigits(text) {\n  // ここを実装\n}',
    hint: 'replace(/[^0-9]/g, "") を使います。',
    answer: 'function extractDigits(text) {\n  return text.replace(/[^0-9]/g, "")\n}'
  },
  {
    id: 230,
    title: '複数行メッセージの禁止語検知',
    level: '実務',
    topic: 'RegExp flags',
    duration: '15分',
    problem: 'text内に禁止語(spam, scam)が大文字小文字無視で含まれるか返す hasBlockedWords(text) を作ってください。',
    starter: 'function hasBlockedWords(text) {\n  // ここを実装\n}',
    hint: '/(spam|scam)/i を使って test します。',
    answer: 'function hasBlockedWords(text) {\n  return /(spam|scam)/i.test(text)\n}'
  }
]

const inferParamHint = (name) => {
  const key = String(name).toLowerCase()
  if (/url|path/.test(key)) return `${name}: URL文字列（例: "/api/items"）`
  if (/ms|delay|timeout/.test(key)) return `${name}: ミリ秒の数値（例: 3000）`
  if (/id|index|page|count|total/.test(key)) return `${name}: 数値（例: 1, 20）`
  if (/keyword|name|email|phone|text|label/.test(key)) return `${name}: 文字列（例: "sample"）`
  if (/list|items|users|orders|tags|numbers|arr|array|promises/.test(key)) {
    return `${name}: 配列（例: [1, 2, 3]）`
  }
  if (/fn|callback/.test(key)) return `${name}: 関数（例: () => {}）`
  if (/payload|data|user|order|item|profile|settings/.test(key)) {
    return `${name}: オブジェクト（例: { id: 1 }）`
  }
  return `${name}: 問題文に沿った値`
}

const extractFunctionSignatures = (source) => {
  const signatures = []
  const pattern = /function\s+([A-Za-z_$][\w$]*)\s*\(([^)]*)\)/g
  let match = pattern.exec(source)
  while (match) {
    const params = match[2]
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
    signatures.push({ name: match[1], params })
    match = pattern.exec(source)
  }
  return signatures
}

const extractStarterSamples = (source) => {
  const items = []
  const pattern = /(?:const|let)\s+([A-Za-z_$][\w$]*)\s*=\s*([^\n;]+)/g
  let match = pattern.exec(source)
  while (match) {
    items.push(`${match[1]} = ${match[2].trim()}`)
    match = pattern.exec(source)
  }
  return items.slice(0, 3)
}

const buildThinking = (task) => {
  const signatures = [
    ...extractFunctionSignatures(task.starter),
    ...extractFunctionSignatures(task.answer)
  ]
  const firstSignature = signatures[0]
  const argumentHints = firstSignature
    ? firstSignature.params.length
      ? firstSignature.params.map((param) => inferParamHint(param))
      : ['引数なしの関数です']
    : ['スターター内の変数を入力値として扱って実装する']

  const starterSamples = extractStarterSamples(task.starter)
  const conditions = [
    '関数名・変数名は問題文で指定された名前を維持する',
    '返り値がある問題は return を忘れない',
    task.hint
  ]

  return {
    functionSignature: firstSignature
      ? `${firstSignature.name}(${firstSignature.params.join(', ')})`
      : '関数シグネチャ指定なし',
    argumentHints,
    starterSamples,
    conditions
  }
}

const buildStarDifficultyMap = (taskList) => {
  const grouped = taskList.reduce((acc, task) => {
    if (!acc[task.level]) acc[task.level] = []
    acc[task.level].push(task)
    return acc
  }, {})

  const starsById = new Map()

  Object.values(grouped).forEach((items) => {
    const sorted = [...items].sort((a, b) => a.id - b.id)
    const length = sorted.length
    sorted.forEach((task, index) => {
      const star = Math.floor((index * 5) / length) + 1
      starsById.set(task.id, Math.max(1, Math.min(5, star)))
    })
  })

  return starsById
}

const starDifficultyMap = buildStarDifficultyMap(baseTasks)

const destructiveMethods = new Set([
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse',
  'fill',
  'copyWithin'
])

const extractMutationSignals = (source) => {
  const destructive = []
  const pattern = /\.([A-Za-z_$][\w$]*)\s*\(/g
  let match = pattern.exec(source)

  while (match) {
    const methodName = match[1]
    if (destructiveMethods.has(methodName) && !destructive.includes(methodName)) {
      destructive.push(methodName)
    }
    match = pattern.exec(source)
  }

  const hasAssignToEmptyObject = /Object\.assign\s*\(\s*\{\s*\}\s*,/.test(source)
  const hasAssignToExistingTarget = /Object\.assign\s*\(\s*(?!\{\s*\}\s*,)[^,]+,/.test(source)

  return {
    destructive,
    hasAssignToEmptyObject,
    hasAssignToExistingTarget
  }
}

const buildMutationWarning = (task) => {
  const source = `${task.starter}\n${task.answer}\n${task.hint}`
  const signals = extractMutationSignals(source)
  const methods = [...signals.destructive]

  if (signals.hasAssignToEmptyObject) methods.push('Object.assign({}, ...)')
  if (signals.hasAssignToExistingTarget) methods.push('Object.assign(target, ...)')
  if (!methods.length) return null

  const hasHighRisk = signals.destructive.length > 0 || signals.hasAssignToExistingTarget
  const level = hasHighRisk ? 'high' : 'caution'
  const short = hasHighRisk ? '破壊的操作あり' : '参照更新の注意あり'

  const detail = hasHighRisk
    ? `注意: 破壊的メソッド（${methods.join(', ')}）を使う問題です。元データを書き換えるため、共有参照の値まで意図せず変わり、状態不整合・バグ調査の難化につながります。必要ならコピー（例: [...arr], { ...obj }）してから操作してください。`
    : `注意: ${methods.join(', ')} はコピー先を明示すれば安全に使えますが、targetを誤ると元データ更新につながります。コピー対象を確認して実装してください。`

  return { level, short, detail, methods }
}



export const tasks = baseTasks.map((task) => {
  const warning = buildMutationWarning(task)
  return {
    ...task,
    title: task.title,
    starDifficulty: starDifficultyMap.get(task.id) ?? 3,
    mutationWarningMeta: warning,
    mutationWarning: warning?.detail ?? null,
    mutationWarningShort: warning?.short ?? null,
    mutationWarningLevel: warning?.level ?? null,
    thinking: buildThinking(task)
  }
})
