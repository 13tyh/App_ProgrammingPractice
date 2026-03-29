const baseVueTasks = [
  {
    id: 1,
    title: 'refでカウント表示',
    level: '初級',
    topic: 'ref',
    duration: '8分',
    problem: 'refでcountを作り、ボタンで +1 できるようにしてください。',
    starter:
      '<script setup>\n// ここを実装\n</script>\n\n<template>\n  <p>{{ count }}</p>\n  <button @click="increment">+1</button>\n</template>',
    hint: 'ref と関数をscript setupで定義し、templateで使います。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst count = ref(0)\nconst increment = () => {\n  count.value += 1\n}\n</script>',
    checks: ['import { ref } from "vue"', 'const count = ref(0)', 'count.value += 1']
  },
  {
    id: 2,
    title: 'computedで税込み金額',
    level: '初級',
    topic: 'computed',
    duration: '10分',
    problem: 'priceから税込み金額(taxIncluded)をcomputedで作ってください。',
    starter:
      '<script setup>\n// ここを実装\n</script>\n\n<template>\n  <p>{{ taxIncluded }}</p>\n</template>',
    hint: 'computed(() => ...) で導出値を作ります。',
    answer:
      '<script setup>\nimport { ref, computed } from "vue"\nconst price = ref(1000)\nconst taxIncluded = computed(() => Math.floor(price.value * 1.1))\n</script>',
    checks: ['computed(() =>', 'price.value']
  },
  {
    id: 3,
    title: 'v-modelで入力反映',
    level: '初級',
    topic: 'v-model',
    duration: '8分',
    problem: 'inputとnameをv-modelでバインドし、下にそのまま表示してください。',
    starter:
      '<script setup>\n// ここを実装\n</script>\n\n<template>\n  <input />\n  <p></p>\n</template>',
    hint: 'input側と表示側で同じrefを使います。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst name = ref("")\n</script>\n\n<template>\n  <input v-model="name" />\n  <p>{{ name }}</p>\n</template>',
    checks: ['v-model="name"', '{{ name }}']
  },
  {
    id: 4,
    title: 'v-forでリスト表示',
    level: '初級',
    topic: 'v-for',
    duration: '10分',
    problem: 'todos配列をv-forで描画し、keyを指定してください。',
    starter:
      '<script setup>\nconst todos = [{ id: 1, text: "A" }, { id: 2, text: "B" }]\n</script>\n\n<template>\n  <ul>\n    <li>TODO</li>\n  </ul>\n</template>',
    hint: 'v-for="todo in todos" と :key="todo.id" の組み合わせです。',
    answer:
      '<template>\n  <ul>\n    <li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li>\n  </ul>\n</template>',
    checks: ['v-for="todo in todos"', ':key="todo.id"']
  },
  {
    id: 5,
    title: 'v-if/v-elseで状態表示',
    level: '初級',
    topic: 'v-if',
    duration: '8分',
    problem: 'isLoadingがtrueならLoading、falseならDoneを表示してください。',
    starter:
      '<script setup>\nconst isLoading = false\n</script>\n\n<template>\n  <p>状態</p>\n</template>',
    hint: 'v-if と v-else を使います。',
    answer:
      '<template>\n  <p v-if="isLoading">Loading...</p>\n  <p v-else>Done</p>\n</template>',
    checks: ['v-if="isLoading"', 'v-else']
  },
  {
    id: 6,
    title: 'watchで入力監視',
    level: '中級',
    topic: 'watch',
    duration: '12分',
    problem: 'keywordをwatchして、変更時にconsole.logしてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'watch(keyword, (newValue) => { ... }) の形です。',
    answer:
      '<script setup>\nimport { ref, watch } from "vue"\nconst keyword = ref("")\nwatch(keyword, (newValue) => {\n  console.log(newValue)\n})\n</script>',
    checks: ['watch(', 'console.log(newValue)']
  },
  {
    id: 7,
    title: 'watchEffectで自動追跡',
    level: '中級',
    topic: 'watchEffect',
    duration: '12分',
    problem: 'countが変わるたびにwatchEffect内でログ出力してください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'watchEffect(() => { ... }) は依存を自動追跡します。',
    answer:
      '<script setup>\nimport { ref, watchEffect } from "vue"\nconst count = ref(0)\nwatchEffect(() => {\n  console.log(count.value)\n})\n</script>',
    checks: ['watchEffect(() =>', 'count.value']
  },
  {
    id: 8,
    title: 'props受け取り',
    level: '中級',
    topic: 'defineProps',
    duration: '12分',
    problem: 'name(string)とage(number)をpropsで受け取って表示してください。',
    starter:
      '<script setup>\n// ここを実装\n</script>\n\n<template>\n  <p></p>\n</template>',
    hint: 'defineProps({ ... }) またはdefineProps<{...}>で定義できます。',
    answer:
      '<script setup>\nconst props = defineProps({\n  name: String,\n  age: Number\n})\n</script>\n\n<template>\n  <p>{{ props.name }} ({{ props.age }})</p>\n</template>',
    checks: ['defineProps', 'name', 'age']
  },
  {
    id: 9,
    title: 'emitで親へ通知',
    level: '中級',
    topic: 'defineEmits',
    duration: '14分',
    problem: 'ボタン押下で emit("submit", { ok: true }) を発火してください。',
    starter:
      '<script setup>\n// ここを実装\n</script>\n\n<template>\n  <button>送信</button>\n</template>',
    hint: 'defineEmits でemit関数を作り、クリックハンドラから呼びます。',
    answer:
      '<script setup>\nconst emit = defineEmits(["submit"])\nconst onSubmit = () => {\n  emit("submit", { ok: true })\n}\n</script>\n\n<template>\n  <button @click="onSubmit">送信</button>\n</template>',
    checks: ['defineEmits', 'emit("submit"', '@click="onSubmit"']
  },
  {
    id: 10,
    title: 'onMountedで初期取得',
    level: '中級',
    topic: 'onMounted + fetch',
    duration: '16分',
    problem: 'onMountedで/api/profileを取得し、profileへ代入してください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'onMounted(async () => { ... }) の中でfetchします。',
    answer:
      '<script setup>\nimport { ref, onMounted } from "vue"\nconst profile = ref(null)\nonMounted(async () => {\n  const res = await fetch("/api/profile")\n  profile.value = await res.json()\n})\n</script>',
    checks: ['onMounted(async () =>', 'fetch("/api/profile")', 'profile.value']
  },
  {
    id: 11,
    title: 'computed + filter検索',
    level: '中級',
    topic: 'computed + filter',
    duration: '14分',
    problem: 'keywordに応じてusersを絞り込む filteredUsers をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'users.value.filter(...) をcomputedで返します。',
    answer:
      '<script setup>\nimport { ref, computed } from "vue"\nconst keyword = ref("")\nconst users = ref([{ name: "Taro" }, { name: "Hanako" }])\nconst filteredUsers = computed(() =>\n  users.value.filter((u) => u.name.toLowerCase().includes(keyword.value.toLowerCase()))\n)\n</script>',
    checks: ['const filteredUsers = computed(() =>', 'filter((u) =>', 'keyword.value']
  },
  {
    id: 12,
    title: 'フォーム送信処理',
    level: '上級',
    topic: 'v-model + fetch',
    duration: '18分',
    problem: 'name/emailをv-modelで受け取り、submit時にJSON POSTしてください。',
    starter:
      '<script setup>\n// ここを実装\n</script>\n\n<template>\n  <form>\n    <input />\n    <input />\n    <button type="submit">保存</button>\n  </form>\n</template>',
    hint: 'submit.prevent と JSON.stringify、Content-Type指定を忘れずに。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst name = ref("")\nconst email = ref("")\nconst submit = async () => {\n  await fetch("/api/users", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({ name: name.value, email: email.value })\n  })\n}\n</script>\n\n<template>\n  <form @submit.prevent="submit">\n    <input v-model="name" />\n    <input v-model="email" />\n    <button type="submit">保存</button>\n  </form>\n</template>',
    checks: ['@submit.prevent="submit"', 'JSON.stringify', '"Content-Type": "application/json"']
  },
  {
    id: 13,
    title: 'provide/inject連携',
    level: '上級',
    topic: 'provide + inject',
    duration: '16分',
    problem: '親でprovide("theme", "dark")し、子でinjectして表示するコードを書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: '親: provide / 子: inject をそれぞれ使います。',
    answer:
      '<script setup>\nimport { provide, inject } from "vue"\nprovide("theme", "dark")\nconst theme = inject("theme", "light")\n</script>',
    checks: ['provide("theme", "dark")', 'inject("theme"']
  },
  {
    id: 14,
    title: 'router遷移処理',
    level: '上級',
    topic: 'useRouter',
    duration: '14分',
    problem: 'ボタン押下で /js-practice へ遷移する goPractice を作ってください。',
    starter:
      '<script setup>\n// ここを実装\n</script>\n\n<template>\n  <button>Go</button>\n</template>',
    hint: 'const router = useRouter() を使って push します。',
    answer:
      '<script setup>\nimport { useRouter } from "vue-router"\nconst router = useRouter()\nconst goPractice = () => router.push("/js-practice")\n</script>\n\n<template>\n  <button @click="goPractice">Go</button>\n</template>',
    checks: ['useRouter()', 'router.push("/js-practice")', '@click="goPractice"']
  },
  {
    id: 15,
    title: '実務: ローディング/エラー管理',
    level: '実務',
    topic: 'try/catch/finally + ref',
    duration: '20分',
    problem: 'API取得処理で loading/error/data の3状態を管理してください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'loadingはfinallyで必ずfalseへ戻します。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst loading = ref(false)\nconst error = ref("")\nconst data = ref(null)\n\nconst load = async () => {\n  loading.value = true\n  error.value = ""\n  try {\n    const res = await fetch("/api/data")\n    if (!res.ok) throw new Error("API error")\n    data.value = await res.json()\n  } catch (e) {\n    error.value = e.message\n  } finally {\n    loading.value = false\n  }\n}\n</script>',
    checks: ['loading.value = true', 'catch (e)', 'finally', 'loading.value = false']
  },
  {
    id: 16,
    title: '実務: 一覧のソート/フィルタ/検索',
    level: '実務',
    topic: 'computed + toSorted + filter',
    duration: '22分',
    problem:
      'productsをkeywordで絞り込み、price昇順で並べた visibleProducts をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'filter後にtoSortedで非破壊ソートします。',
    answer:
      '<script setup>\nimport { ref, computed } from "vue"\nconst keyword = ref("")\nconst products = ref([{ name: "A", price: 300 }, { name: "B", price: 100 }])\nconst visibleProducts = computed(() =>\n  products.value\n    .filter((p) => p.name.toLowerCase().includes(keyword.value.toLowerCase()))\n    .toSorted((a, b) => a.price - b.price)\n)\n</script>',
    checks: ['const visibleProducts = computed(() =>', '.filter((p) =>', '.toSorted((a, b) => a.price - b.price)']
  },
  {
    id: 17,
    title: '基礎: state駆動カウンタ',
    level: '初級',
    topic: 'state + ref',
    duration: '8分',
    problem: 'countをrefで作成し、ボタン押下でcount++する最小実装を書いてください。',
    starter:
      '<template>\n  <button>Count: {{ count }}</button>\n</template>\n\n<script setup>\n// ここを実装\n</script>',
    hint: 'countはref(0)、クリックは@clickでcount++です。',
    answer:
      '<template>\n  <button @click="count++">Count: {{ count }}</button>\n</template>\n\n<script setup>\nimport { ref } from "vue"\nconst count = ref(0)\n</script>',
    checks: ['import { ref } from "vue"', 'const count = ref(0)', '@click="count++"']
  },
  {
    id: 18,
    title: '基礎: reactiveフォーム初期化',
    level: '初級',
    topic: 'reactive',
    duration: '10分',
    problem: 'email/password/rememberを持つformをreactiveで定義してください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'reactive({ email: "", password: "", remember: false }) の形です。',
    answer:
      '<script setup>\nimport { reactive } from "vue"\nconst form = reactive({\n  email: "",\n  password: "",\n  remember: false\n})\n</script>',
    checks: ['import { reactive } from "vue"', 'const form = reactive({', 'remember: false']
  },
  {
    id: 19,
    title: '基礎: reactiveを安全更新',
    level: '中級',
    topic: 'Object.assign',
    duration: '10分',
    problem: 'reactiveのform参照を保ったままemailだけ更新するコードを書いてください。',
    starter:
      '<script setup>\nimport { reactive } from "vue"\nconst form = reactive({ email: "", password: "" })\n// ここに更新処理を追加\n</script>',
    hint: 'Object.assign(form, { email: "a@a.com" }) を使います。',
    answer:
      '<script setup>\nimport { reactive } from "vue"\nconst form = reactive({ email: "", password: "" })\nObject.assign(form, { email: "a@a.com" })\n</script>',
    checks: ['Object.assign(form, { email: "a@a.com" })']
  },
  {
    id: 20,
    title: '基礎: computedでフルネーム',
    level: '初級',
    topic: 'computed',
    duration: '10分',
    problem: 'first/lastからfullNameをcomputedで作成してください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: '`${last.value} ${first.value}` をcomputedで返します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst first = ref("Taro")\nconst last = ref("Yamada")\nconst fullName = computed(() => `${last.value} ${first.value}`)\n</script>',
    checks: ['const fullName = computed(() =>', 'last.value', 'first.value']
  },
  {
    id: 21,
    title: '基礎: watchで副作用分離',
    level: '中級',
    topic: 'watch',
    duration: '12分',
    problem: 'keyword変更時に非同期処理を呼ぶwatchを実装してください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'watch(keyword, async (k) => { ... }) の形にします。',
    answer:
      '<script setup>\nimport { ref, watch } from "vue"\nconst keyword = ref("")\nwatch(keyword, async (k) => {\n  await fetch(`/api/search?q=${encodeURIComponent(k)}`)\n})\n</script>',
    checks: ['watch(keyword, async (k) =>', 'fetch(`']
  },
  {
    id: 22,
    title: '基礎: 子からlikeイベント通知',
    level: '中級',
    topic: 'defineEmits',
    duration: '10分',
    problem: 'LikeButtonコンポーネントでlikeイベントをemitしてください。',
    starter:
      '<script setup>\n// ここを実装\n</script>\n\n<template>\n  <button>Like</button>\n</template>',
    hint: 'const emit = defineEmits(["like"]) と @click="emit(\'like\')" を使います。',
    answer:
      '<script setup>\nconst emit = defineEmits(["like"])\n</script>\n\n<template>\n  <button @click="emit(\'like\')">Like</button>\n</template>',
    checks: ['defineEmits(["like"])', '@click="emit(\'like\')"']
  },
  {
    id: 23,
    title: '基礎: TextFieldのv-model対応',
    level: '中級',
    topic: 'v-model component',
    duration: '14分',
    problem: 'TextFieldでmodelValueとupdate:modelValueを使った入力コンポーネントを作ってください。',
    starter:
      '<script setup>\n// ここを実装\n</script>\n\n<template>\n  <label>\n    <input />\n  </label>\n</template>',
    hint: 'defineProps + defineEmits + @input を組み合わせます。',
    answer:
      '<script setup>\nconst props = defineProps({\n  modelValue: { type: String, default: "" },\n  label: { type: String, default: "" }\n})\nconst emit = defineEmits(["update:modelValue"])\nconst onInput = (e) => emit("update:modelValue", e.target.value)\n</script>\n\n<template>\n  <label>\n    {{ props.label }}\n    <input :value="props.modelValue" @input="onInput" />\n  </label>\n</template>',
    checks: ['modelValue', 'update:modelValue', '@input="onInput"']
  },
  {
    id: 24,
    title: '基礎: Cardのslot受け取り',
    level: '中級',
    topic: 'slot',
    duration: '10分',
    problem: 'title props と default slot を持つCardコンポーネントを作ってください。',
    starter:
      '<script setup>\n// ここを実装\n</script>\n\n<template>\n  <div class="card"></div>\n</template>',
    hint: 'definePropsと<slot />を使います。',
    answer:
      '<script setup>\ndefineProps({ title: { type: String, required: true } })\n</script>\n\n<template>\n  <div class="card">\n    <h3>{{ title }}</h3>\n    <div><slot /></div>\n  </div>\n</template>',
    checks: ['defineProps({ title:', '<slot />']
  },
  {
    id: 25,
    title: '実務: 一覧取得の3状態管理',
    level: '実務',
    topic: 'onMounted + try/catch',
    duration: '18分',
    problem: 'users/loading/errorを管理し、onMountedでfetchUsersを呼ぶ構成を書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'finallyでloadingをfalseに戻します。',
    answer:
      '<script setup>\nimport { onMounted, ref } from "vue"\nconst users = ref([])\nconst loading = ref(false)\nconst error = ref(false)\n\nasync function fetchUsers() {\n  loading.value = true\n  error.value = false\n  try {\n    users.value = await api.getUsers()\n  } catch (e) {\n    error.value = true\n  } finally {\n    loading.value = false\n  }\n}\n\nonMounted(fetchUsers)\n</script>',
    checks: ['onMounted(fetchUsers)', 'loading.value = true', 'finally']
  },
  {
    id: 26,
    title: '実務: debounce検索 + requestId',
    level: '実務',
    topic: 'watch + race condition',
    duration: '22分',
    problem: 'keyword監視で300ms debounceし、requestIdで競合を防ぐ処理を書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'timerとrequestIdをletで持ち、watch内でclearTimeoutします。',
    answer:
      '<script setup>\nimport { ref, watch } from "vue"\nconst keyword = ref("")\nconst results = ref([])\nlet timer = null\nlet requestId = 0\n\nconst run = async (q) => {\n  const id = ++requestId\n  const res = await api.search(q)\n  if (id === requestId) results.value = res\n}\n\nwatch(keyword, (q) => {\n  if (timer) clearTimeout(timer)\n  timer = setTimeout(() => {\n    if (q.trim()) run(q)\n    else results.value = []\n  }, 300)\n})\n</script>',
    checks: ['let requestId = 0', 'watch(keyword, (q) =>', 'if (id === requestId)']
  },
  {
    id: 27,
    title: '実務: モーダル開閉の局所state',
    level: '中級',
    topic: 'local state',
    duration: '8分',
    problem: 'openのrefでModalの開閉を制御するコードを書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'open = ref(false) と v-if / @close を組み合わせます。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst open = ref(false)\n</script>\n\n<template>\n  <button @click="open = true">Open</button>\n  <Modal v-if="open" @close="open = false" />\n</template>',
    checks: ['const open = ref(false)', 'v-if="open"', '@close="open = false"']
  },
  {
    id: 28,
    title: '実務: 二重送信防止フォーム',
    level: '実務',
    topic: 'submitting',
    duration: '18分',
    problem: 'submitting/success/errorを持つsubmit関数を実装し、finallyで解除してください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'submit開始時に初期化し、catchでエラー文言を設定します。',
    answer:
      '<script setup>\nimport { reactive, ref } from "vue"\nconst form = reactive({ email: "", password: "" })\nconst submitting = ref(false)\nconst success = ref(false)\nconst error = ref(null)\n\nconst submit = async () => {\n  submitting.value = true\n  success.value = false\n  error.value = null\n  try {\n    await api.save(form)\n    success.value = true\n  } catch (e) {\n    error.value = "送信に失敗しました"\n  } finally {\n    submitting.value = false\n  }\n}\n</script>',
    checks: ['const submitting = ref(false)', 'submitting.value = true', 'submitting.value = false']
  },
  {
    id: 29,
    title: '実務: URLクエリ同期',
    level: '上級',
    topic: 'useRoute/useRouter',
    duration: '14分',
    problem: 'keywordをroute.queryと同期し、watchでrouter.replaceしてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'const keyword = ref(route.query.keyword ?? "") から始めます。',
    answer:
      '<script setup>\nimport { ref, watch } from "vue"\nimport { useRoute, useRouter } from "vue-router"\nconst route = useRoute()\nconst router = useRouter()\nconst keyword = ref(route.query.keyword ?? "")\n\nwatch(keyword, (k) => {\n  router.replace({ query: { ...route.query, keyword: k || undefined } })\n})\n</script>',
    checks: ['useRoute()', 'useRouter()', 'router.replace({ query:']
  },
  {
    id: 30,
    title: '実務: Pinia Auth Store',
    level: '上級',
    topic: 'pinia',
    duration: '20分',
    problem: 'auth storeでuser/token/loading, isLoggedIn getter, login/logout actionsを実装してください。',
    starter: '// stores/auth.ts\n// ここを実装',
    hint: 'defineStore("auth", { state, getters, actions }) の基本形です。',
    answer:
      'import { defineStore } from "pinia"\n\nexport const useAuthStore = defineStore("auth", {\n  state: () => ({ user: null, token: null, loading: false }),\n  getters: { isLoggedIn: (state) => !!state.user },\n  actions: {\n    async login(email, password) {\n      this.loading = true\n      try {\n        const res = await api.login({ email, password })\n        this.user = res.user\n        this.token = res.token\n      } finally {\n        this.loading = false\n      }\n    },\n    logout() {\n      this.user = null\n      this.token = null\n    }\n  }\n})',
    checks: ['defineStore("auth"', 'isLoggedIn', 'async login(email, password)', 'logout()']
  },
  {
    id: 31,
    title: '実務: ページング取得Composable',
    level: '実務',
    topic: 'watch array',
    duration: '20分',
    problem: 'page/pageSize監視で再取得し、totalPagesをcomputedで返すComposableを書いてください。',
    starter: '// usePaginationFetch.ts\n// ここを実装',
    hint: 'watch([page, pageSize], fetchPage, { immediate: true }) を使います。',
    answer:
      'import { computed, ref, watch } from "vue"\n\nexport function usePaginationFetch() {\n  const page = ref(1)\n  const pageSize = ref(20)\n  const total = ref(0)\n  const items = ref([])\n\n  const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))\n\n  const fetchPage = async () => {\n    const res = await api.getUsers({ page: page.value, pageSize: pageSize.value })\n    items.value = res.items\n    total.value = res.total\n  }\n\n  watch([page, pageSize], fetchPage, { immediate: true })\n\n  return { page, pageSize, totalPages, items, fetchPage }\n}',
    checks: ['watch([page, pageSize], fetchPage, { immediate: true })', 'const totalPages = computed(() =>']
  },
  {
    id: 32,
    title: '実務: Optimistic UIでtodo追加',
    level: '実務',
    topic: 'optimistic update',
    duration: '18分',
    problem: 'tempIdを使って先にUI反映し、失敗時にロールバックするaddTodoを書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'tryで置換、catchでfilter除外します。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst todos = ref([])\n\nconst addTodo = async (title) => {\n  const tempId = `temp-${Date.now()}`\n  const optimistic = { id: tempId, title }\n  todos.value = [optimistic, ...todos.value]\n\n  try {\n    const created = await api.createTodo({ title })\n    todos.value = todos.value.map((t) => (t.id === tempId ? created : t))\n  } catch (e) {\n    todos.value = todos.value.filter((t) => t.id !== tempId)\n    throw e\n  }\n}\n</script>',
    checks: ['const tempId = `temp-${Date.now()}`', 'todos.value = [optimistic, ...todos.value]', 'todos.value = todos.value.filter((t) => t.id !== tempId)']
  },
  {
    id: 33,
    title: '実務: localStorageへ下書き保存',
    level: '中級',
    topic: 'watch + localStorage',
    duration: '10分',
    problem: 'draftをwatchしてlocalStorageへ保存する処理を書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: '初期値はlocalStorage.getItem(key) ?? "" で取ります。',
    answer:
      '<script setup>\nimport { ref, watch } from "vue"\nconst key = "draft:profile"\nconst draft = ref(localStorage.getItem(key) ?? "")\nwatch(draft, (v) => {\n  localStorage.setItem(key, v)\n})\n</script>',
    checks: ['const draft = ref(localStorage.getItem(key) ?? "")', 'watch(draft, (v) =>', 'localStorage.setItem(key, v)']
  },
  {
    id: 34,
    title: '実務: ルートガードで認証保護',
    level: '上級',
    topic: 'beforeEach',
    duration: '14分',
    problem: 'requiresAuthのとき未ログインなら/loginへリダイレクトするbeforeEachを書いてください。',
    starter: '// router.ts\n// ここを実装',
    hint: 'to.meta.requiresAuth と auth.isLoggedIn を判定します。',
    answer:
      'router.beforeEach((to) => {\n  const auth = useAuthStore()\n  if (to.meta.requiresAuth && !auth.isLoggedIn) {\n    return { path: "/login", query: { redirect: to.fullPath } }\n  }\n})',
    checks: ['router.beforeEach((to) =>', 'to.meta.requiresAuth && !auth.isLoggedIn', 'redirect: to.fullPath']
  },
  {
    id: 35,
    title: '実務: useFetch Composable',
    level: '上級',
    topic: 'composable',
    duration: '16分',
    problem: 'data/loading/error/executeを返すuseFetch(fetcher)を実装してください。',
    starter: '// useFetch.ts\n// ここを実装',
    hint: 'execute内でtry/catch/finallyし、最後にreturnします。',
    answer:
      'import { ref } from "vue"\n\nexport function useFetch(fetcher) {\n  const data = ref(null)\n  const loading = ref(false)\n  const error = ref(null)\n\n  const execute = async () => {\n    loading.value = true\n    error.value = null\n    try {\n      data.value = await fetcher()\n    } catch (e) {\n      error.value = e\n    } finally {\n      loading.value = false\n    }\n  }\n\n  return { data, loading, error, execute }\n}',
    checks: ['export function useFetch(fetcher)', 'const data = ref(null)', 'return { data, loading, error, execute }']
  },
  {
    id: 36,
    title: '実務: ログインフォームの基本形',
    level: '中級',
    topic: 'form template',
    duration: '14分',
    problem: 'reactive form + loading/error + submitを持つログイン処理を実装してください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'formはreactive、loading/errorはrefで持ちます。',
    answer:
      '<script setup>\nimport { reactive, ref } from "vue"\nconst form = reactive({ email: "", password: "" })\nconst loading = ref(false)\nconst error = ref(null)\n\nconst submit = async () => {\n  loading.value = true\n  error.value = null\n  try {\n    await api.login(form)\n  } catch (e) {\n    error.value = "ログインに失敗しました"\n  } finally {\n    loading.value = false\n  }\n}\n</script>',
    checks: ['const form = reactive({ email: "", password: "" })', 'const loading = ref(false)', 'await api.login(form)']
  },
  {
    id: 37,
    title: '実務: チェックボックス絞り込みcomputed',
    level: '中級',
    topic: 'computed filter',
    duration: '10分',
    problem: 'showDoneの状態でvisibleTasksを切り替えるcomputedを書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'showDone ? tasks : tasks.filter(...) の形です。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst showDone = ref(false)\nconst tasks = ref([])\n\nconst visibleTasks = computed(() => {\n  return showDone.value ? tasks.value : tasks.value.filter((t) => !t.done)\n})\n</script>',
    checks: ['const visibleTasks = computed(() =>', 'showDone.value ? tasks.value : tasks.value.filter((t) => !t.done)']
  },
  {
    id: 38,
    title: '実務: マッチング候補カード一覧',
    level: '実務',
    topic: 'computed + sort',
    duration: '16分',
    problem: 'distanceとratingからscoreを計算し、候補をscore降順に並べる visibleCandidates を作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'computed内でmapしてscoreを付け、toSortedで降順にします。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst candidates = ref([{ id: 1, distanceKm: 3, rating: 4.5 }])\nconst visibleCandidates = computed(() =>\n  candidates.value\n    .map((c) => ({ ...c, score: c.rating * 20 - c.distanceKm }))\n    .toSorted((a, b) => b.score - a.score)\n)\n</script>',
    checks: ['const visibleCandidates = computed(() =>', 'score: c.rating * 20 - c.distanceKm', '.toSorted((a, b) => b.score - a.score)']
  },
  {
    id: 39,
    title: '実務: WebSocket接続状態表示',
    level: '上級',
    topic: 'onMounted + onBeforeUnmount',
    duration: '16分',
    problem: 'WebSocket接続のopen/closeでstatusを更新するコードを書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'onMountedで接続し、onBeforeUnmountでcloseします。',
    answer:
      '<script setup>\nimport { onBeforeUnmount, onMounted, ref } from "vue"\nconst status = ref("disconnected")\nlet socket\n\nonMounted(() => {\n  socket = new WebSocket("wss://example.com/stream")\n  socket.addEventListener("open", () => (status.value = "connected"))\n  socket.addEventListener("close", () => (status.value = "disconnected"))\n})\n\nonBeforeUnmount(() => socket?.close())\n</script>',
    checks: ['const status = ref("disconnected")', 'onMounted(() => {', 'onBeforeUnmount(() => socket?.close())']
  },
  {
    id: 40,
    title: '実務: 支払いフォームのバリデーション',
    level: '中級',
    topic: 'computed',
    duration: '14分',
    problem: 'cardNumberとcvvを元に canSubmit をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: '長さ条件をBooleanでまとめます。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst cardNumber = ref("")\nconst cvv = ref("")\nconst canSubmit = computed(() => cardNumber.value.length === 16 && cvv.value.length === 3)\n</script>',
    checks: ['const cardNumber = ref("")', 'const cvv = ref("")', 'const canSubmit = computed(() =>']
  },
  {
    id: 41,
    title: '実務: AIチャット送信中状態',
    level: '中級',
    topic: 'ref + try/finally',
    duration: '14分',
    problem: 'sendMessage実行中だけisSending=trueになる処理を書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'finallyで必ずfalseへ戻します。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst isSending = ref(false)\nconst sendMessage = async (content) => {\n  isSending.value = true\n  try {\n    await api.chat({ content })\n  } finally {\n    isSending.value = false\n  }\n}\n</script>',
    checks: ['const isSending = ref(false)', 'isSending.value = true', 'isSending.value = false']
  },
  {
    id: 42,
    title: '実務: 通知フィード無限スクロール',
    level: '上級',
    topic: 'onMounted + window scroll',
    duration: '18分',
    problem: '画面下部到達時にloadMoreを呼ぶスクロール監視を実装してください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'イベント登録/解除を忘れないようにします。',
    answer:
      '<script setup>\nimport { onBeforeUnmount, onMounted } from "vue"\nconst loadMore = async () => {\n  await api.fetchNext()\n}\nconst onScroll = () => {\n  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 80\n  if (nearBottom) loadMore()\n}\nonMounted(() => window.addEventListener("scroll", onScroll))\nonBeforeUnmount(() => window.removeEventListener("scroll", onScroll))\n</script>',
    checks: ['const onScroll = () =>', 'window.addEventListener("scroll", onScroll)', 'window.removeEventListener("scroll", onScroll)']
  },
  {
    id: 43,
    title: '実務: 価格表示フォーマッタComposable利用',
    level: '初級',
    topic: 'computed + Intl',
    duration: '10分',
    problem: 'amountを日本円表示する formattedAmount をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }) を使います。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst amount = ref(1200)\nconst formattedAmount = computed(() =>\n  new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(amount.value)\n)\n</script>',
    checks: ['const amount = ref(1200)', 'new Intl.NumberFormat("ja-JP"', 'const formattedAmount = computed(() =>']
  },
  {
    id: 44,
    title: '実務: 2つの検索条件をwatch',
    level: '中級',
    topic: 'watch array source',
    duration: '12分',
    problem: 'keywordとstatusのどちらか変更時にも検索を呼ぶwatchを書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'watch([keyword, status], ...) 形式を使います。',
    answer:
      '<script setup>\nimport { ref, watch } from "vue"\nconst keyword = ref("")\nconst status = ref("all")\nwatch([keyword, status], ([k, s]) => {\n  searchApi({ keyword: k, status: s })\n})\n</script>',
    checks: ['watch([keyword, status], ([k, s]) => {', 'searchApi({ keyword: k, status: s })']
  },
  {
    id: 45,
    title: '実務: Router query 同期のページ番号',
    level: '上級',
    topic: 'useRoute + useRouter + watch',
    duration: '16分',
    problem: 'page ref を route.query.page と同期する処理を書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'watch(page, ...) で router.replace します。',
    answer:
      '<script setup>\nimport { ref, watch } from "vue"\nimport { useRoute, useRouter } from "vue-router"\nconst route = useRoute()\nconst router = useRouter()\nconst page = ref(Number(route.query.page ?? 1))\nwatch(page, (v) => {\n  router.replace({ query: { ...route.query, page: String(v) } })\n})\n</script>',
    checks: ['const page = ref(Number(route.query.page ?? 1))', 'watch(page, (v) => {', 'router.replace({ query: { ...route.query, page: String(v) } })']
  },
  {
    id: 46,
    title: '実務: 楽観的いいね更新',
    level: '上級',
    topic: 'optimistic update',
    duration: '16分',
    problem: 'likeCountを先に+1し、失敗したら元に戻す toggleLike を書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'prevを保持してcatchでロールバックします。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst likeCount = ref(0)\nconst toggleLike = async () => {\n  const prev = likeCount.value\n  likeCount.value += 1\n  try {\n    await api.like()\n  } catch {\n    likeCount.value = prev\n  }\n}\n</script>',
    checks: ['const prev = likeCount.value', 'likeCount.value += 1', 'likeCount.value = prev']
  },
  {
    id: 47,
    title: '実務: フォームdirty判定',
    level: '中級',
    topic: 'computed + JSON.stringify',
    duration: '12分',
    problem: 'initialFormとの比較でisDirtyをcomputedにしてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'シンプル実装ではJSON.stringify比較が使えます。',
    answer:
      '<script setup>\nimport { computed, reactive } from "vue"\nconst initialForm = { name: "", email: "" }\nconst form = reactive({ ...initialForm })\nconst isDirty = computed(() => JSON.stringify(form) !== JSON.stringify(initialForm))\n</script>',
    checks: ['const form = reactive({ ...initialForm })', 'const isDirty = computed(() =>', 'JSON.stringify(form) !== JSON.stringify(initialForm)']
  },
  {
    id: 48,
    title: '実務: モーダルESC閉じ',
    level: '中級',
    topic: 'keydown event',
    duration: '12分',
    problem: 'Escapeキー押下でopenをfalseにする処理を実装してください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'onMounted/onBeforeUnmountでイベント管理します。',
    answer:
      '<script setup>\nimport { onBeforeUnmount, onMounted, ref } from "vue"\nconst open = ref(false)\nconst onKeydown = (event) => {\n  if (event.key === "Escape") open.value = false\n}\nonMounted(() => window.addEventListener("keydown", onKeydown))\nonBeforeUnmount(() => window.removeEventListener("keydown", onKeydown))\n</script>',
    checks: ['if (event.key === "Escape") open.value = false', 'window.addEventListener("keydown", onKeydown)', 'window.removeEventListener("keydown", onKeydown)']
  },
  {
    id: 49,
    title: '実務: 残り文字数表示',
    level: '初級',
    topic: 'computed',
    duration: '8分',
    problem: 'maxLengthとmessageから残り文字数remainingをcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'maxLength - message.length の式です。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst maxLength = 140\nconst message = ref("")\nconst remaining = computed(() => maxLength - message.value.length)\n</script>',
    checks: ['const message = ref("")', 'const remaining = computed(() => maxLength - message.value.length)']
  },
  {
    id: 50,
    title: '実務: APIエラー分類表示',
    level: '上級',
    topic: 'try/catch',
    duration: '14分',
    problem: 'statusコードでerrorTypeを分類するload処理を書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: '404/not-found, 500/server-error などに分けます。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst errorType = ref("")\nconst load = async () => {\n  try {\n    await api.fetchResource()\n    errorType.value = ""\n  } catch (e) {\n    if (e.status === 404) errorType.value = "not-found"\n    else if (e.status >= 500) errorType.value = "server-error"\n    else errorType.value = "unknown"\n  }\n}\n</script>',
    checks: ['if (e.status === 404) errorType.value = "not-found"', 'else if (e.status >= 500) errorType.value = "server-error"']
  },
  {
    id: 51,
    title: '実務: タブUIの現在値管理',
    level: '初級',
    topic: 'ref',
    duration: '8分',
    problem: 'activeTabをrefで管理し、setTab(tab)で更新してください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'activeTab.valueへ代入します。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst activeTab = ref("overview")\nconst setTab = (tab) => {\n  activeTab.value = tab\n}\n</script>',
    checks: ['const activeTab = ref("overview")', 'activeTab.value = tab']
  },
  {
    id: 52,
    title: '実務: 高コスト計算のmemo化',
    level: '中級',
    topic: 'computed',
    duration: '10分',
    problem: 'itemsの合計をtotalCostとしてcomputedにしてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'reduceをcomputedの中で使います。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst items = ref([{ price: 1200, qty: 2 }])\nconst totalCost = computed(() => items.value.reduce((sum, i) => sum + i.price * i.qty, 0))\n</script>',
    checks: ['const totalCost = computed(() =>', 'items.value.reduce((sum, i) => sum + i.price * i.qty, 0)']
  },
  {
    id: 53,
    title: '実務: ユーザー入力debounce',
    level: '上級',
    topic: 'watch + setTimeout',
    duration: '16分',
    problem: 'keyword変更を300ms待って検索APIを叩くwatchを書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'timerを外側に置いてclearTimeoutします。',
    answer:
      '<script setup>\nimport { ref, watch } from "vue"\nconst keyword = ref("")\nlet timer\nwatch(keyword, (v) => {\n  clearTimeout(timer)\n  timer = setTimeout(() => searchApi(v), 300)\n})\n</script>',
    checks: ['let timer', 'clearTimeout(timer)', 'setTimeout(() => searchApi(v), 300)']
  },
  {
    id: 54,
    title: '実務: ファイルアップロード進捗',
    level: '上級',
    topic: 'ref + XMLHttpRequest',
    duration: '18分',
    problem: 'uploadProgressを0-100で更新する uploadFile(file) の骨組みを書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'xhr.upload.onprogress で percent を更新します。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst uploadProgress = ref(0)\nconst uploadFile = (file) => {\n  const xhr = new XMLHttpRequest()\n  xhr.upload.onprogress = (e) => {\n    if (e.lengthComputable) uploadProgress.value = Math.round((e.loaded / e.total) * 100)\n  }\n  xhr.open("POST", "/api/upload")\n  const formData = new FormData()\n  formData.append("file", file)\n  xhr.send(formData)\n}\n</script>',
    checks: ['const uploadProgress = ref(0)', 'xhr.upload.onprogress = (e) => {', 'uploadProgress.value = Math.round((e.loaded / e.total) * 100)']
  },
  {
    id: 55,
    title: '実務: 多言語ラベル切替',
    level: '中級',
    topic: 'computed + object map',
    duration: '12分',
    problem: 'localeに応じてlabelを返す computed を作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: '辞書オブジェクトを用意して locale.value で参照します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst locale = ref("ja")\nconst dict = { ja: "保存", en: "Save" }\nconst label = computed(() => dict[locale.value] ?? dict.ja)\n</script>',
    checks: ['const locale = ref("ja")', 'const dict = { ja: "保存", en: "Save" }', 'const label = computed(() => dict[locale.value] ?? dict.ja)']
  },
  {
    id: 56,
    title: '実務: レビュー期限バッジ表示',
    level: '中級',
    topic: 'computed + Date',
    duration: '12分',
    problem: 'nextReviewAtが現在以前ならisDue=trueを返すcomputedを書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'Dateのミリ秒で比較します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst nextReviewAt = ref("2026-03-30T00:00:00.000Z")\nconst isDue = computed(() => new Date(nextReviewAt.value).getTime() <= Date.now())\n</script>',
    checks: ['const nextReviewAt = ref(', 'const isDue = computed(() => new Date(nextReviewAt.value).getTime() <= Date.now())']
  },
  {
    id: 57,
    title: '実務: ステップフォーム遷移',
    level: '中級',
    topic: 'ref + computed',
    duration: '12分',
    problem: 'currentStepを管理し、isFirst/isLastをcomputedで返す実装を書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'step数は totalSteps 定数で比較します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst totalSteps = 4\nconst currentStep = ref(1)\nconst isFirst = computed(() => currentStep.value === 1)\nconst isLast = computed(() => currentStep.value === totalSteps)\n</script>',
    checks: ['const currentStep = ref(1)', 'const isFirst = computed(() => currentStep.value === 1)', 'const isLast = computed(() => currentStep.value === totalSteps)']
  },
  {
    id: 58,
    title: '初級: v-showで表示切替',
    level: '初級',
    topic: 'v-show',
    duration: '8分',
    problem: 'isOpenがtrueの時だけ説明文を表示するv-showを書いてください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst isOpen = ref(false)\n</script>\n\n<template>\n  <p>説明文</p>\n</template>',
    hint: 'v-show="isOpen" を使います。',
    answer: '<template>\n  <p v-show="isOpen">説明文</p>\n</template>',
    checks: ['v-show="isOpen"']
  },
  {
    id: 59,
    title: '初級: クラスの条件バインド',
    level: '初級',
    topic: ':class',
    duration: '8分',
    problem: 'isActiveがtrueのときactiveクラスを付けるバインドを書いてください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst isActive = ref(true)\n</script>\n\n<template>\n  <div>Card</div>\n</template>',
    hint: ':class="{ active: isActive }" の形です。',
    answer: '<template>\n  <div :class="{ active: isActive }">Card</div>\n</template>',
    checks: [':class="{ active: isActive }"']
  },
  {
    id: 60,
    title: '中級: スタイルの動的バインド',
    level: '中級',
    topic: ':style',
    duration: '10分',
    problem: 'sizeに応じてfontSizeを変えるstyleバインドを書いてください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst size = ref(18)\n</script>\n\n<template>\n  <p>Text</p>\n</template>',
    hint: ':style="{ fontSize: `${size}px` }" の形です。',
    answer: '<template>\n  <p :style="{ fontSize: `${size}px` }">Text</p>\n</template>',
    checks: [':style="{ fontSize: `${size}px` }"']
  },
  {
    id: 61,
    title: '初級: v-model.number',
    level: '初級',
    topic: 'v-model modifier',
    duration: '8分',
    problem: 'number入力を数値として受けるv-modelを書いてください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst qty = ref(0)\n</script>\n\n<template>\n  <input type="number" />\n</template>',
    hint: '.number修飾子を使います。',
    answer: '<template>\n  <input type="number" v-model.number="qty" />\n</template>',
    checks: ['v-model.number="qty"']
  },
  {
    id: 62,
    title: '中級: watch immediate実行',
    level: '中級',
    topic: 'watch',
    duration: '10分',
    problem: 'keywordのwatchを初回実行するように書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: '第3引数に { immediate: true } を渡します。',
    answer:
      '<script setup>\nimport { ref, watch } from "vue"\nconst keyword = ref("")\nwatch(keyword, (v) => {\n  console.log(v)\n}, { immediate: true })\n</script>',
    checks: ['watch(keyword, (v) => {', '{ immediate: true }']
  },
  {
    id: 63,
    title: '初級: disabled制御',
    level: '初級',
    topic: ':disabled',
    duration: '8分',
    problem: 'isSubmitting中だけボタンをdisabledにしてください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst isSubmitting = ref(false)\n</script>\n\n<template>\n  <button>送信</button>\n</template>',
    hint: ':disabled="isSubmitting" です。',
    answer: '<template>\n  <button :disabled="isSubmitting">送信</button>\n</template>',
    checks: [':disabled="isSubmitting"']
  },
  {
    id: 64,
    title: '中級: emitsの型付きpayload設計',
    level: '中級',
    topic: 'defineEmits',
    duration: '10分',
    problem: 'saveイベントで { id, title } をemitする実装を書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'defineEmitsとハンドラ関数を作ります。',
    answer:
      '<script setup>\nconst emit = defineEmits(["save"])\nconst onSave = () => emit("save", { id: 1, title: "Task" })\n</script>',
    checks: ['const emit = defineEmits(["save"])', 'emit("save", { id: 1, title: "Task" })']
  },
  {
    id: 65,
    title: '初級: 配列件数の表示',
    level: '初級',
    topic: 'computed',
    duration: '8分',
    problem: 'todosの件数をtodoCountとしてcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'todos.value.length を返します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst todos = ref([])\nconst todoCount = computed(() => todos.value.length)\n</script>',
    checks: ['const todoCount = computed(() => todos.value.length)']
  },
  {
    id: 66,
    title: '中級: 並び替えcomputed',
    level: '中級',
    topic: 'computed + toSorted',
    duration: '12分',
    problem: 'productsをprice昇順で返す sortedProducts をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'toSortedで非破壊ソートします。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst products = ref([{ name: "A", price: 300 }, { name: "B", price: 100 }])\nconst sortedProducts = computed(() => products.value.toSorted((a, b) => a.price - b.price))\n</script>',
    checks: ['const sortedProducts = computed(() =>', 'toSorted((a, b) => a.price - b.price)']
  },
  {
    id: 67,
    title: '初級: 入力文字数カウント',
    level: '初級',
    topic: 'v-model + computed',
    duration: '8分',
    problem: 'name入力の文字数をnameLengthとして表示できるようにしてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'computed(() => name.value.length) で作れます。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst name = ref("")\nconst nameLength = computed(() => name.value.length)\n</script>',
    checks: ['const name = ref("")', 'const nameLength = computed(() => name.value.length)']
  },
  {
    id: 68,
    title: '中級: 複数条件でフィルタ',
    level: '中級',
    topic: 'computed filter',
    duration: '12分',
    problem: 'keywordとonlyActiveでusersを絞り込むvisibleUsersを作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: '条件を順に適用すると読みやすいです。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst keyword = ref("")\nconst onlyActive = ref(false)\nconst users = ref([{ name: "Taro", active: true }])\nconst visibleUsers = computed(() =>\n  users.value.filter((u) => {\n    const hit = u.name.toLowerCase().includes(keyword.value.toLowerCase())\n    const activeOk = onlyActive.value ? u.active : true\n    return hit && activeOk\n  })\n)\n</script>',
    checks: ['const visibleUsers = computed(() =>', 'const activeOk = onlyActive.value ? u.active : true']
  },
  {
    id: 69,
    title: '初級: keydown Enter送信',
    level: '初級',
    topic: '@keydown.enter',
    duration: '8分',
    problem: 'inputでEnter押下時にsubmitを呼ぶテンプレートを書いてください。',
    starter: '<script setup>\nconst submit = () => {}\n</script>\n\n<template>\n  <input />\n</template>',
    hint: '@keydown.enter="submit" を使います。',
    answer: '<template>\n  <input @keydown.enter="submit" />\n</template>',
    checks: ['@keydown.enter="submit"']
  },
  {
    id: 70,
    title: '中級: propsの既定値設定',
    level: '中級',
    topic: 'defineProps',
    duration: '10分',
    problem: 'titleは必須、sizeは既定値"md"のprops定義を書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'オブジェクト形式でrequired/defaultを指定します。',
    answer:
      '<script setup>\nconst props = defineProps({\n  title: { type: String, required: true },\n  size: { type: String, default: "md" }\n})\n</script>',
    checks: ['title: { type: String, required: true }', 'size: { type: String, default: "md" }']
  },
  {
    id: 71,
    title: '初級: 配列追加ハンドラ',
    level: '初級',
    topic: 'ref array',
    duration: '8分',
    problem: 'itemsにnewItemをpushする addItem(newItem) を実装してください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst items = ref([])\n// ここを実装\n</script>',
    hint: 'items.value.push(newItem) です。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst items = ref([])\nconst addItem = (newItem) => {\n  items.value.push(newItem)\n}\n</script>',
    checks: ['const addItem = (newItem) => {', 'items.value.push(newItem)']
  },
  {
    id: 72,
    title: '中級: 入力値trim監視',
    level: '中級',
    topic: 'watch',
    duration: '10分',
    problem: 'nameの変更時にtrim済み値をconsole出力するwatchを書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'watch(name, (v) => console.log(v.trim())) です。',
    answer:
      '<script setup>\nimport { ref, watch } from "vue"\nconst name = ref("")\nwatch(name, (v) => {\n  console.log(v.trim())\n})\n</script>',
    checks: ['watch(name, (v) => {', 'console.log(v.trim())']
  },
  {
    id: 73,
    title: '初級: ボタン文言切替',
    level: '初級',
    topic: 'computed',
    duration: '8分',
    problem: 'isSavingに応じてボタン文言を切り替える submitLabel をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: '三項演算子で "保存中..." / "保存" を返します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst isSaving = ref(false)\nconst submitLabel = computed(() => isSaving.value ? "保存中..." : "保存")\n</script>',
    checks: ['const submitLabel = computed(() => isSaving.value ? "保存中..." : "保存")']
  },
  {
    id: 74,
    title: '中級: computed setterで双方向',
    level: '中級',
    topic: 'computed getter/setter',
    duration: '12分',
    problem: 'firstName/lastNameからfullNameをgetter/setter付きcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'set側でsplitして代入します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst firstName = ref("Taro")\nconst lastName = ref("Yamada")\nconst fullName = computed({\n  get: () => `${firstName.value} ${lastName.value}`,\n  set: (v) => {\n    const [f, l] = v.split(" ")\n    firstName.value = f ?? ""\n    lastName.value = l ?? ""\n  }\n})\n</script>',
    checks: ['const fullName = computed({', 'get: () => `${firstName.value} ${lastName.value}`', 'set: (v) => {']
  },
  {
    id: 75,
    title: '初級: checkbox配列バインド',
    level: '初級',
    topic: 'v-model array',
    duration: '8分',
    problem: '選択タグをselectedTags配列へv-modelするテンプレートを書いてください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst selectedTags = ref([])\n</script>\n\n<template>\n  <input type="checkbox" value="js" />\n</template>',
    hint: 'checkboxに v-model="selectedTags" を付けます。',
    answer: '<template>\n  <input type="checkbox" value="js" v-model="selectedTags" />\n</template>',
    checks: ['v-model="selectedTags"']
  },
  {
    id: 76,
    title: '中級: watchで前回値比較',
    level: '中級',
    topic: 'watch oldValue',
    duration: '10分',
    problem: 'countの新旧値をログ出力するwatchを書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'watch(count, (newV, oldV) => ...) の形です。',
    answer:
      '<script setup>\nimport { ref, watch } from "vue"\nconst count = ref(0)\nwatch(count, (newV, oldV) => {\n  console.log(`count: ${oldV} -> ${newV}`)\n})\n</script>',
    checks: ['watch(count, (newV, oldV) => {', 'console.log(`count: ${oldV} -> ${newV}`)']
  },
  {
    id: 77,
    title: '中級: 条件付きemit',
    level: '中級',
    topic: 'defineEmits + if',
    duration: '10分',
    problem: 'validがtrueのときだけsubmitイベントをemitする submitIfValid(valid) を作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'if (valid) emit("submit") です。',
    answer:
      '<script setup>\nconst emit = defineEmits(["submit"])\nconst submitIfValid = (valid) => {\n  if (valid) emit("submit")\n}\n</script>',
    checks: ['const emit = defineEmits(["submit"])', 'if (valid) emit("submit")']
  },
  {
    id: 78,
    title: '初級: v-ifとv-else-if分岐',
    level: '初級',
    topic: 'v-if',
    duration: '8分',
    problem: 'scoreに応じてA/B/Cを表示するv-if分岐を書いてください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst score = ref(75)\n</script>\n\n<template>\n  <p>結果</p>\n</template>',
    hint: 'v-if / v-else-if / v-else を使います。',
    answer:
      '<template>\n  <p v-if="score >= 80">A</p>\n  <p v-else-if="score >= 60">B</p>\n  <p v-else>C</p>\n</template>',
    checks: ['v-if="score >= 80"', 'v-else-if="score >= 60"', 'v-else']
  },
  {
    id: 79,
    title: '中級: 複数v-model連動',
    level: '中級',
    topic: 'v-model',
    duration: '10分',
    problem: 'firstName/lastName入力と fullName 表示を作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'computedで連結表示すると整理しやすいです。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst firstName = ref("")\nconst lastName = ref("")\nconst fullName = computed(() => `${firstName.value} ${lastName.value}`.trim())\n</script>',
    checks: ['const firstName = ref("")', 'const lastName = ref("")', 'const fullName = computed(() => `${firstName.value} ${lastName.value}`.trim())']
  },
  {
    id: 80,
    title: '初級: 条件でplaceholder切替',
    level: '初級',
    topic: 'bind attr',
    duration: '8分',
    problem: 'isEmailModeに応じてinputのplaceholderを切り替えてください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst isEmailMode = ref(true)\n</script>\n\n<template>\n  <input />\n</template>',
    hint: ':placeholder へ三項演算子を渡します。',
    answer:
      '<template>\n  <input :placeholder="isEmailMode ? \"メールアドレス\" : \"ユーザー名\"" />\n</template>',
    checks: [':placeholder="isEmailMode ?']
  },
  {
    id: 81,
    title: '中級: 配列削除ハンドラ',
    level: '中級',
    topic: 'filter',
    duration: '10分',
    problem: 'id指定でtodosから要素を除外する removeTodo(id) を作ってください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst todos = ref([{ id: 1, text: "A" }])\n// ここを実装\n</script>',
    hint: 'filterで id !== target を残します。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst todos = ref([{ id: 1, text: "A" }])\nconst removeTodo = (id) => {\n  todos.value = todos.value.filter((t) => t.id !== id)\n}\n</script>',
    checks: ['const removeTodo = (id) => {', 'todos.value = todos.value.filter((t) => t.id !== id)']
  },
  {
    id: 82,
    title: '初級: 文字列長でバリデーション',
    level: '初級',
    topic: 'computed',
    duration: '8分',
    problem: 'passwordが8文字以上か返す isStrong をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'password.value.length >= 8 を返します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst password = ref("")\nconst isStrong = computed(() => password.value.length >= 8)\n</script>',
    checks: ['const password = ref("")', 'const isStrong = computed(() => password.value.length >= 8)']
  },
  {
    id: 83,
    title: '中級: ローディング中の二重送信防止',
    level: '中級',
    topic: 'if guard',
    duration: '10分',
    problem: 'isSubmittingがtrueなら早期returnする submit() を書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: '関数先頭で if (isSubmitting.value) return を入れます。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst isSubmitting = ref(false)\nconst submit = async () => {\n  if (isSubmitting.value) return\n  isSubmitting.value = true\n  try {\n    await api.submit()\n  } finally {\n    isSubmitting.value = false\n  }\n}\n</script>',
    checks: ['if (isSubmitting.value) return', 'isSubmitting.value = true', 'isSubmitting.value = false']
  },
  {
    id: 84,
    title: '初級: ラジオ選択の反映',
    level: '初級',
    topic: 'v-model radio',
    duration: '8分',
    problem: 'planをラジオのv-modelで選択できるようにしてください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst plan = ref("free")\n</script>\n\n<template>\n  <input type="radio" value="free" />\n</template>',
    hint: 'radioそれぞれに v-model="plan" を付けます。',
    answer:
      '<template>\n  <input type="radio" value="free" v-model="plan" />\n  <input type="radio" value="pro" v-model="plan" />\n</template>',
    checks: ['value="free" v-model="plan"', 'value="pro" v-model="plan"']
  },
  {
    id: 85,
    title: '中級: watchで同期保存',
    level: '中級',
    topic: 'watch + localStorage',
    duration: '10分',
    problem: 'settingsをwatchしてlocalStorageへ保存してください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'オブジェクトならdeep:trueを使います。',
    answer:
      '<script setup>\nimport { reactive, watch } from "vue"\nconst settings = reactive({ theme: "light", compact: false })\nwatch(settings, (v) => {\n  localStorage.setItem("settings", JSON.stringify(v))\n}, { deep: true })\n</script>',
    checks: ['watch(settings, (v) => {', 'localStorage.setItem("settings", JSON.stringify(v))', '{ deep: true }']
  },
  {
    id: 86,
    title: '初級: ボタンの活性制御',
    level: '初級',
    topic: ':disabled',
    duration: '8分',
    problem: 'nameが空なら送信ボタンを無効化してください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst name = ref("")\n</script>\n\n<template>\n  <button>送信</button>\n</template>',
    hint: ':disabled="!name.trim()" が簡単です。',
    answer: '<template>\n  <button :disabled="!name.trim()">送信</button>\n</template>',
    checks: [':disabled="!name.trim()"']
  },
  {
    id: 87,
    title: '中級: ページ内タブフィルタ',
    level: '中級',
    topic: 'computed + filter',
    duration: '12分',
    problem: 'activeTabに応じてitemsを絞る visibleItems をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'activeTabが"all"なら全件、それ以外は一致条件です。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst activeTab = ref("all")\nconst items = ref([{ type: "news" }])\nconst visibleItems = computed(() =>\n  activeTab.value === "all" ? items.value : items.value.filter((i) => i.type === activeTab.value)\n)\n</script>',
    checks: ['const visibleItems = computed(() =>', 'activeTab.value === "all" ? items.value : items.value.filter((i) => i.type === activeTab.value)']
  },
  {
    id: 88,
    title: '初級: フォーム初期化処理',
    level: '初級',
    topic: 'reactive',
    duration: '8分',
    problem: 'reactive formを初期値へ戻す resetForm() を作ってください。',
    starter: '<script setup>\nimport { reactive } from "vue"\nconst form = reactive({ name: "", email: "" })\n// ここを実装\n</script>',
    hint: 'Object.assign(form, { ... }) でまとめて戻せます。',
    answer:
      '<script setup>\nimport { reactive } from "vue"\nconst form = reactive({ name: "", email: "" })\nconst resetForm = () => {\n  Object.assign(form, { name: "", email: "" })\n}\n</script>',
    checks: ['const resetForm = () => {', 'Object.assign(form, { name: "", email: "" })']
  },
  {
    id: 89,
    title: '中級: watchEffectでAPI再取得',
    level: '中級',
    topic: 'watchEffect',
    duration: '12分',
    problem: 'userIdが変わるたびにプロフィール取得するwatchEffectを書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'watchEffect内でuserId.valueを参照します。',
    answer:
      '<script setup>\nimport { ref, watchEffect } from "vue"\nconst userId = ref(1)\nconst profile = ref(null)\nwatchEffect(async () => {\n  profile.value = await api.fetchProfile(userId.value)\n})\n</script>',
    checks: ['watchEffect(async () => {', 'api.fetchProfile(userId.value)']
  },
  {
    id: 90,
    title: '初級: リスト空状態表示',
    level: '初級',
    topic: 'v-if',
    duration: '8分',
    problem: 'itemsが0件なら「データなし」を表示するテンプレートを書いてください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst items = ref([])\n</script>\n\n<template>\n  <ul><li>item</li></ul>\n</template>',
    hint: 'v-if/v-elseで分岐します。',
    answer:
      '<template>\n  <p v-if="items.length === 0">データなし</p>\n  <ul v-else><li v-for="item in items" :key="item.id">{{ item.name }}</li></ul>\n</template>',
    checks: ['v-if="items.length === 0"', 'v-for="item in items" :key="item.id"']
  },
  {
    id: 91,
    title: '中級: emitで入力確定通知',
    level: '中級',
    topic: 'defineEmits',
    duration: '10分',
    problem: 'Enterで emit("confirm", value) する onEnter(value) を実装してください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'defineEmitsでconfirmを宣言します。',
    answer:
      '<script setup>\nconst emit = defineEmits(["confirm"])\nconst onEnter = (value) => {\n  emit("confirm", value)\n}\n</script>',
    checks: ['const emit = defineEmits(["confirm"])', 'emit("confirm", value)']
  },
  {
    id: 92,
    title: '初級: シンプルトグル関数',
    level: '初級',
    topic: 'ref boolean',
    duration: '8分',
    problem: 'isOpenを反転する toggle() を作ってください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst isOpen = ref(false)\n// ここを実装\n</script>',
    hint: 'isOpen.value = !isOpen.value です。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst isOpen = ref(false)\nconst toggle = () => {\n  isOpen.value = !isOpen.value\n}\n</script>',
    checks: ['const toggle = () => {', 'isOpen.value = !isOpen.value']
  },
  {
    id: 93,
    title: '中級: route param監視',
    level: '中級',
    topic: 'useRoute + watch',
    duration: '12分',
    problem: 'route.params.id変更時にfetchDetailを呼ぶwatchを書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'watch(() => route.params.id, ...) の形です。',
    answer:
      '<script setup>\nimport { watch } from "vue"\nimport { useRoute } from "vue-router"\nconst route = useRoute()\nwatch(() => route.params.id, (id) => {\n  fetchDetail(id)\n})\n</script>',
    checks: ['watch(() => route.params.id, (id) => {', 'fetchDetail(id)']
  },
  {
    id: 94,
    title: '初級: 数値加算ボタン',
    level: '初級',
    topic: '@click',
    duration: '8分',
    problem: 'ボタン押下でcountを+5する処理を書いてください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst count = ref(0)\n</script>\n\n<template>\n  <button>+5</button>\n</template>',
    hint: '@clickでcount += 5 します。',
    answer: '<template>\n  <button @click="count += 5">+5</button>\n</template>',
    checks: ['@click="count += 5"']
  },
  {
    id: 95,
    title: '中級: 非同期初期化関数',
    level: '中級',
    topic: 'onMounted async',
    duration: '12分',
    problem: 'onMountedでinit()を呼び、loadingを適切に更新してください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'loadingはtry/finallyで戻します。',
    answer:
      '<script setup>\nimport { onMounted, ref } from "vue"\nconst loading = ref(false)\nconst init = async () => {\n  loading.value = true\n  try {\n    await api.init()\n  } finally {\n    loading.value = false\n  }\n}\nonMounted(init)\n</script>',
    checks: ['const loading = ref(false)', 'try {', 'onMounted(init)']
  },
  {
    id: 96,
    title: '初級: 入力クリアボタン',
    level: '初級',
    topic: 'v-model + click',
    duration: '8分',
    problem: 'keyword入力を空文字へ戻す clearKeyword() を作ってください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst keyword = ref("")\n// ここを実装\n</script>',
    hint: 'keyword.value = "" です。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst keyword = ref("")\nconst clearKeyword = () => {\n  keyword.value = ""\n}\n</script>',
    checks: ['const clearKeyword = () => {', 'keyword.value = ""']
  },
  {
    id: 97,
    title: '中級: 配列先頭へ追加',
    level: '中級',
    topic: 'spread',
    duration: '10分',
    problem: 'items先頭にnewItemを追加する prependItem(newItem) を作ってください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst items = ref([])\n// ここを実装\n</script>',
    hint: 'items.value = [newItem, ...items.value] です。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst items = ref([])\nconst prependItem = (newItem) => {\n  items.value = [newItem, ...items.value]\n}\n</script>',
    checks: ['const prependItem = (newItem) => {', 'items.value = [newItem, ...items.value]']
  },
  {
    id: 98,
    title: '初級: readonly computed表示',
    level: '初級',
    topic: 'computed',
    duration: '8分',
    problem: 'priceとqtyからsubtotalをcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'price.value * qty.value を返します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst price = ref(1200)\nconst qty = ref(2)\nconst subtotal = computed(() => price.value * qty.value)\n</script>',
    checks: ['const subtotal = computed(() => price.value * qty.value)']
  },
  {
    id: 99,
    title: '中級: toRefでprops参照',
    level: '中級',
    topic: 'toRef',
    duration: '10分',
    problem: 'propsのkeywordをtoRefで参照しwatchするコードを書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'const keyword = toRef(props, "keyword") です。',
    answer:
      '<script setup>\nimport { toRef, watch } from "vue"\nconst props = defineProps({ keyword: String })\nconst keyword = toRef(props, "keyword")\nwatch(keyword, (v) => console.log(v))\n</script>',
    checks: ['const keyword = toRef(props, "keyword")', 'watch(keyword, (v) => console.log(v))']
  },
  {
    id: 100,
    title: '初級: v-bind省略記法',
    level: '初級',
    topic: ':prop',
    duration: '8分',
    problem: 'imgのsrcへavatarUrlをバインドしてください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst avatarUrl = ref("/avatar.png")\n</script>\n\n<template>\n  <img />\n</template>',
    hint: ':src="avatarUrl" を使います。',
    answer: '<template>\n  <img :src="avatarUrl" alt="avatar" />\n</template>',
    checks: [':src="avatarUrl"']
  },
  {
    id: 101,
    title: '中級: shallowRefでインスタンス保持',
    level: '中級',
    topic: 'shallowRef',
    duration: '10分',
    problem: 'chartインスタンスをshallowRefで保持し、onMountedで代入してください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'shallowRef(null) を使います。',
    answer:
      '<script setup>\nimport { onMounted, shallowRef } from "vue"\nconst chart = shallowRef(null)\nonMounted(() => {\n  chart.value = createChart()\n})\n</script>',
    checks: ['const chart = shallowRef(null)', 'chart.value = createChart()']
  },
  {
    id: 102,
    title: '初級: ラベルの大文字表示',
    level: '初級',
    topic: 'computed + toUpperCase',
    duration: '8分',
    problem: 'labelを大文字化して表示する upperLabel をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'label.value.toUpperCase() です。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst label = ref("save")\nconst upperLabel = computed(() => label.value.toUpperCase())\n</script>',
    checks: ['const upperLabel = computed(() => label.value.toUpperCase())']
  },
  {
    id: 103,
    title: '中級: watch停止関数の利用',
    level: '中級',
    topic: 'watch stop',
    duration: '10分',
    problem: 'watchを作成し、条件達成時にstop()で監視停止するコードを書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'watchの戻り値がstop関数です。',
    answer:
      '<script setup>\nimport { ref, watch } from "vue"\nconst count = ref(0)\nconst stop = watch(count, (v) => {\n  if (v >= 3) stop()\n})\n</script>',
    checks: ['const stop = watch(count, (v) => {', 'if (v >= 3) stop()']
  },
  {
    id: 104,
    title: '初級: v-for index表示',
    level: '初級',
    topic: 'v-for',
    duration: '8分',
    problem: 'v-forでindexとitem名を表示してください。',
    starter: '<script setup>\nconst items = [{ id: 1, name: "A" }]\n</script>\n\n<template>\n  <ul><li>item</li></ul>\n</template>',
    hint: '(item, index) in items の形です。',
    answer: '<template>\n  <ul><li v-for="(item, index) in items" :key="item.id">{{ index }}: {{ item.name }}</li></ul>\n</template>',
    checks: ['v-for="(item, index) in items"', '{{ index }}: {{ item.name }}']
  },
  {
    id: 105,
    title: '中級: computedで辞書参照',
    level: '中級',
    topic: 'computed',
    duration: '10分',
    problem: 'statusコードに応じた文言を返す statusText をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: '辞書オブジェクトを用意して参照します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst status = ref("ok")\nconst statusMap = { ok: "正常", ng: "異常" }\nconst statusText = computed(() => statusMap[status.value] ?? "不明")\n</script>',
    checks: ['const statusMap = { ok: "正常", ng: "異常" }', 'const statusText = computed(() => statusMap[status.value] ?? "不明")']
  },
  {
    id: 106,
    title: '初級: 入力上限の表示',
    level: '初級',
    topic: 'maxlength + computed',
    duration: '8分',
    problem: 'messageの残り入力可能数をremainingとして表示してください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'max - message.value.length です。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst max = 50\nconst message = ref("")\nconst remaining = computed(() => max - message.value.length)\n</script>',
    checks: ['const remaining = computed(() => max - message.value.length)']
  },
  {
    id: 107,
    title: '中級: 関数propsのデフォルト',
    level: '中級',
    topic: 'defineProps',
    duration: '10分',
    problem: 'onSubmit propsを関数型で受け、未指定時は空関数をデフォルトにしてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'default: () => () => {} の形です。',
    answer:
      '<script setup>\nconst props = defineProps({\n  onSubmit: { type: Function, default: () => () => {} }\n})\n</script>',
    checks: ['onSubmit: { type: Function, default: () => () => {} }']
  },
  {
    id: 108,
    title: '初級: 複数class文字列結合',
    level: '初級',
    topic: ':class array',
    duration: '8分',
    problem: 'baseClassとsizeClassを配列classバインドで適用してください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst baseClass = ref("btn")\nconst sizeClass = ref("btn-sm")\n</script>\n\n<template>\n  <button>保存</button>\n</template>',
    hint: ':class="[baseClass, sizeClass]" です。',
    answer: '<template>\n  <button :class="[baseClass, sizeClass]">保存</button>\n</template>',
    checks: [':class="[baseClass, sizeClass]"']
  },
  {
    id: 109,
    title: '中級: フォーム送信前のtrim整形',
    level: '中級',
    topic: 'computed',
    duration: '10分',
    problem: 'form.name/emailをtrimしたpayloadをcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'computedで整形済みオブジェクトを返します。',
    answer:
      '<script setup>\nimport { computed, reactive } from "vue"\nconst form = reactive({ name: "", email: "" })\nconst payload = computed(() => ({ name: form.name.trim(), email: form.email.trim() }))\n</script>',
    checks: ['const payload = computed(() => ({ name: form.name.trim(), email: form.email.trim() }))']
  },
  {
    id: 110,
    title: '初級: :keyにindexを使わない例',
    level: '初級',
    topic: 'v-for key',
    duration: '8分',
    problem: 'v-forで user.id をkeyにして描画してください。',
    starter: '<script setup>\nconst users = [{ id: 1, name: "Taro" }]\n</script>\n\n<template>\n  <div>user</div>\n</template>',
    hint: ':key="user.id" を使います。',
    answer: '<template>\n  <div v-for="user in users" :key="user.id">{{ user.name }}</div>\n</template>',
    checks: ['v-for="user in users" :key="user.id"']
  },
  {
    id: 111,
    title: '中級: 複数watchソースのオブジェクト化',
    level: '中級',
    topic: 'watch',
    duration: '10分',
    problem: 'keyword/page変更時に query オブジェクトを組み立ててログ出力してください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'watch([keyword, page], ([k, p]) => ...) です。',
    answer:
      '<script setup>\nimport { ref, watch } from "vue"\nconst keyword = ref("")\nconst page = ref(1)\nwatch([keyword, page], ([k, p]) => {\n  const query = { keyword: k, page: p }\n  console.log(query)\n})\n</script>',
    checks: ['watch([keyword, page], ([k, p]) => {', 'const query = { keyword: k, page: p }']
  },
  {
    id: 112,
    title: '初級: onMountedでフォーカス',
    level: '初級',
    topic: 'ref + onMounted',
    duration: '8分',
    problem: 'inputRefをonMountedでfocusしてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'template refを使います。',
    answer:
      '<script setup>\nimport { onMounted, ref } from "vue"\nconst inputRef = ref(null)\nonMounted(() => inputRef.value?.focus())\n</script>',
    checks: ['const inputRef = ref(null)', 'onMounted(() => inputRef.value?.focus())']
  },
  {
    id: 113,
    title: '中級: emitsの多イベント定義',
    level: '中級',
    topic: 'defineEmits',
    duration: '10分',
    problem: 'save/cancelの2イベントを定義し、ハンドラでemitしてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'defineEmits(["save", "cancel"]) です。',
    answer:
      '<script setup>\nconst emit = defineEmits(["save", "cancel"])\nconst onSave = () => emit("save")\nconst onCancel = () => emit("cancel")\n</script>',
    checks: ['const emit = defineEmits(["save", "cancel"])', 'emit("save")', 'emit("cancel")']
  },
  {
    id: 114,
    title: '初級: 単語数カウント',
    level: '初級',
    topic: 'computed',
    duration: '8分',
    problem: 'textの単語数をwordCountとしてcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'trimして空なら0、そうでなければsplitします。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst text = ref("")\nconst wordCount = computed(() => {\n  const t = text.value.trim()\n  return t ? t.split(/\\s+/).length : 0\n})\n</script>',
    checks: ['const wordCount = computed(() => {', 'return t ? t.split(/\\s+/).length : 0']
  },
  {
    id: 115,
    title: '中級: route変更で再取得',
    level: '中級',
    topic: 'watch + useRoute',
    duration: '10分',
    problem: 'route.fullPath変更時にreload()を呼ぶwatchを書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'watch(() => route.fullPath, () => reload()) です。',
    answer:
      '<script setup>\nimport { watch } from "vue"\nimport { useRoute } from "vue-router"\nconst route = useRoute()\nwatch(() => route.fullPath, () => reload())\n</script>',
    checks: ['watch(() => route.fullPath, () => reload())']
  },
  {
    id: 116,
    title: '初級: 数値入力の最小値制御',
    level: '初級',
    topic: 'computed',
    duration: '8分',
    problem: 'qtyが0未満にならない normalizedQty をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'Math.max(0, qty.value) です。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst qty = ref(0)\nconst normalizedQty = computed(() => Math.max(0, qty.value))\n</script>',
    checks: ['const normalizedQty = computed(() => Math.max(0, qty.value))']
  },
  {
    id: 117,
    title: '中級: 配列更新の不変操作',
    level: '中級',
    topic: 'map',
    duration: '10分',
    problem: 'id一致要素のdoneを切り替える toggleDone(id) を不変更新で作ってください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst todos = ref([{ id: 1, done: false }])\n// ここを実装\n</script>',
    hint: 'mapで対象だけdoneを反転します。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst todos = ref([{ id: 1, done: false }])\nconst toggleDone = (id) => {\n  todos.value = todos.value.map((t) => (t.id === id ? { ...t, done: !t.done } : t))\n}\n</script>',
    checks: ['const toggleDone = (id) => {', 'todos.value = todos.value.map((t) => (t.id === id ? { ...t, done: !t.done } : t))']
  },
  {
    id: 118,
    title: '初級: mapで表示用ラベル生成',
    level: '初級',
    topic: 'map',
    duration: '10分',
    problem: 'usersから `name (role)` 形式のlabelsをcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'users.value.map(...) をcomputedで返します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst users = ref([{ name: "Taro", role: "admin" }])\nconst labels = computed(() => users.value.map((u) => `${u.name} (${u.role})`))\n</script>',
    checks: ['const labels = computed(() => users.value.map((u) => `${u.name} (${u.role})`))']
  },
  {
    id: 119,
    title: '中級: filterで有効ユーザー抽出',
    level: '中級',
    topic: 'filter',
    duration: '10分',
    problem: 'usersから active=true のみ返す activeUsers をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'filter((u) => u.active) を使います。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst users = ref([{ name: "A", active: true }, { name: "B", active: false }])\nconst activeUsers = computed(() => users.value.filter((u) => u.active))\n</script>',
    checks: ['const activeUsers = computed(() => users.value.filter((u) => u.active))']
  },
  {
    id: 120,
    title: '初級: findで対象商品取得',
    level: '初級',
    topic: 'find',
    duration: '10分',
    problem: 'productsからselectedIdに一致する item をcomputedで返してください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'find((p) => p.id === selectedId.value) です。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst selectedId = ref(1)\nconst products = ref([{ id: 1, name: "PC" }])\nconst selectedItem = computed(() => products.value.find((p) => p.id === selectedId.value))\n</script>',
    checks: ['const selectedItem = computed(() => products.value.find((p) => p.id === selectedId.value))']
  },
  {
    id: 121,
    title: '中級: reduceで合計金額算出',
    level: '中級',
    topic: 'reduce',
    duration: '12分',
    problem: 'cartの price * qty 合計を totalAmount としてcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'reduce初期値0で合算します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst cart = ref([{ price: 1000, qty: 2 }])\nconst totalAmount = computed(() => cart.value.reduce((sum, c) => sum + c.price * c.qty, 0))\n</script>',
    checks: ['const totalAmount = computed(() => cart.value.reduce((sum, c) => sum + c.price * c.qty, 0))']
  },
  {
    id: 122,
    title: '初級: includesでタグ選択判定',
    level: '初級',
    topic: 'includes',
    duration: '8分',
    problem: 'selectedTagsに"vue"が含まれるか返す hasVueTag をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'selectedTags.value.includes("vue") を返します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst selectedTags = ref(["js"])\nconst hasVueTag = computed(() => selectedTags.value.includes("vue"))\n</script>',
    checks: ['const hasVueTag = computed(() => selectedTags.value.includes("vue"))']
  },
  {
    id: 123,
    title: '中級: Object.keys/valuesで統計',
    level: '中級',
    topic: 'Object.keys + Object.values',
    duration: '12分',
    problem: 'scoreMapから keys数と合計値を返す stats をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'Object.keysとObject.valuesを両方使います。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst scoreMap = ref({ a: 10, b: 20 })\nconst stats = computed(() => ({\n  count: Object.keys(scoreMap.value).length,\n  sum: Object.values(scoreMap.value).reduce((s, v) => s + v, 0)\n}))\n</script>',
    checks: ['Object.keys(scoreMap.value).length', 'Object.values(scoreMap.value).reduce((s, v) => s + v, 0)']
  },
  {
    id: 124,
    title: '初級: スプレッドで配列更新',
    level: '初級',
    topic: '...spread',
    duration: '8分',
    problem: 'items末尾にnewItemを追加する addItem(newItem) を実装してください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst items = ref([])\n// ここを実装\n</script>',
    hint: 'items.value = [...items.value, newItem] です。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst items = ref([])\nconst addItem = (newItem) => {\n  items.value = [...items.value, newItem]\n}\n</script>',
    checks: ['items.value = [...items.value, newItem]']
  },
  {
    id: 125,
    title: '中級: async/await + fetchで初期取得',
    level: '中級',
    topic: 'async/await + fetch',
    duration: '12分',
    problem: 'onMountedで /api/me を取得し user に代入する処理を書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'await fetch(...); await res.json() の順です。',
    answer:
      '<script setup>\nimport { onMounted, ref } from "vue"\nconst user = ref(null)\nonMounted(async () => {\n  const res = await fetch("/api/me")\n  user.value = await res.json()\n})\n</script>',
    checks: ['onMounted(async () => {', 'const res = await fetch("/api/me")', 'user.value = await res.json()']
  },
  {
    id: 126,
    title: '初級: JSON.stringifyで保存',
    level: '初級',
    topic: 'JSON.stringify',
    duration: '8分',
    problem: 'formをJSON文字列化してdraftJsonを作るcomputedを書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'computed(() => JSON.stringify(form.value)) の形です。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst form = ref({ name: "", email: "" })\nconst draftJson = computed(() => JSON.stringify(form.value))\n</script>',
    checks: ['const draftJson = computed(() => JSON.stringify(form.value))']
  },
  {
    id: 127,
    title: '中級: JSON.parseで復元',
    level: '中級',
    topic: 'JSON.parse',
    duration: '10分',
    problem: '文字列stateJsonをparseし、失敗時は空オブジェクトを返す parseState(stateJson) を作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'try/catchでJSON.parseを保護します。',
    answer:
      '<script setup>\nconst parseState = (stateJson) => {\n  try {\n    return JSON.parse(stateJson)\n  } catch {\n    return {}\n  }\n}\n</script>',
    checks: ['return JSON.parse(stateJson)', 'return {}']
  },
  {
    id: 128,
    title: '初級: mapでパンくず生成',
    level: '初級',
    topic: 'map',
    duration: '10分',
    problem: 'pathSegmentsからパンくず表示用の "index: label" 文字列配列を作る breadcrumbs をcomputedで実装してください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'mapでindexとlabelを組み合わせます。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst pathSegments = ref(["home", "products", "detail"])\nconst breadcrumbs = computed(() => pathSegments.value.map((label, index) => `${index}: ${label}`))\n</script>',
    checks: ['const breadcrumbs = computed(() => pathSegments.value.map((label, index) => `${index}: ${label}`))']
  },
  {
    id: 129,
    title: '中級: filterで未読通知のみ表示',
    level: '中級',
    topic: 'filter',
    duration: '10分',
    problem: 'notificationsから read が false の通知だけ返す unreadNotifications をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'filter((n) => !n.read) を使います。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst notifications = ref([{ id: 1, read: false }, { id: 2, read: true }])\nconst unreadNotifications = computed(() => notifications.value.filter((n) => !n.read))\n</script>',
    checks: ['const unreadNotifications = computed(() => notifications.value.filter((n) => !n.read))']
  },
  {
    id: 130,
    title: '初級: findで優先配送先を決定',
    level: '初級',
    topic: 'find',
    duration: '10分',
    problem: 'addressesから isPrimary が true の配送先を返す primaryAddress をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'find((a) => a.isPrimary) です。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst addresses = ref([{ id: 1, isPrimary: false }, { id: 2, isPrimary: true }])\nconst primaryAddress = computed(() => addresses.value.find((a) => a.isPrimary))\n</script>',
    checks: ['const primaryAddress = computed(() => addresses.value.find((a) => a.isPrimary))']
  },
  {
    id: 131,
    title: '中級: reduceでフォーム入力率を計算',
    level: '中級',
    topic: 'reduce',
    duration: '12分',
    problem: 'formFieldsのうち value が空でない項目数を使って completionRate(%) を返すcomputedを作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'filledCountをreduceで数え、全件数で割ります。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst formFields = ref([{ value: "A" }, { value: "" }, { value: "B" }])\nconst completionRate = computed(() => {\n  const filledCount = formFields.value.reduce((count, field) => count + (field.value ? 1 : 0), 0)\n  return Math.floor((filledCount / formFields.value.length) * 100)\n})\n</script>',
    checks: ['const filledCount = formFields.value.reduce((count, field) => count + (field.value ? 1 : 0), 0)', 'return Math.floor((filledCount / formFields.value.length) * 100)']
  },
  {
    id: 132,
    title: '初級: includesで機能フラグ判定',
    level: '初級',
    topic: 'includes',
    duration: '8分',
    problem: 'enabledFeaturesに "beta-dashboard" が含まれるか返す hasBetaDashboard をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'includes("beta-dashboard") を使います。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst enabledFeatures = ref(["search", "export"])\nconst hasBetaDashboard = computed(() => enabledFeatures.value.includes("beta-dashboard"))\n</script>',
    checks: ['const hasBetaDashboard = computed(() => enabledFeatures.value.includes("beta-dashboard"))']
  },
  {
    id: 133,
    title: '中級: Object.keysでクエリ文字列化',
    level: '中級',
    topic: 'Object.keys',
    duration: '12分',
    problem: 'queryオブジェクトを "k=v&..." 形式にする queryString をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'Object.keys(query.value).map(...).join("&") を使います。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst query = ref({ page: 2, keyword: "vue" })\nconst queryString = computed(() => Object.keys(query.value).map((key) => `${key}=${query.value[key]}`).join("&"))\n</script>',
    checks: ['Object.keys(query.value).map((key) => `${key}=${query.value[key]}`).join("&")']
  },
  {
    id: 134,
    title: '初級: Object.valuesで合計金額表示',
    level: '初級',
    topic: 'Object.values',
    duration: '10分',
    problem: 'priceMapの値を合計する totalPrice をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'Object.values(...).reduce(...) で合計します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst priceMap = ref({ a: 1200, b: 800, c: 500 })\nconst totalPrice = computed(() => Object.values(priceMap.value).reduce((sum, price) => sum + price, 0))\n</script>',
    checks: ['const totalPrice = computed(() => Object.values(priceMap.value).reduce((sum, price) => sum + price, 0))']
  },
  {
    id: 135,
    title: '中級: スプレッドでフォーム初期化',
    level: '中級',
    topic: '...spread',
    duration: '10分',
    problem: 'defaultFormとsavedDraftをマージしてform初期値を作る初期化処理を書いてください。savedDraftがnullならdefaultFormのみ使用します。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: '...defaultForm と ...(savedDraft || {}) を使います。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst defaultForm = { name: "", email: "", phone: "" }\nconst savedDraft = null\nconst form = ref({ ...defaultForm, ...(savedDraft || {}) })\n</script>',
    checks: ['const form = ref({ ...defaultForm, ...(savedDraft || {}) })']
  },
  {
    id: 136,
    title: '初級: async/await + fetchで選択肢取得',
    level: '初級',
    topic: 'async/await + fetch',
    duration: '12分',
    problem: 'onMountedで /api/categories を取得して categories に格納する処理を書いてください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'fetch後にres.json()をawaitして代入します。',
    answer:
      '<script setup>\nimport { onMounted, ref } from "vue"\nconst categories = ref([])\nonMounted(async () => {\n  const res = await fetch("/api/categories")\n  categories.value = await res.json()\n})\n</script>',
    checks: ['onMounted(async () => {', 'const res = await fetch("/api/categories")', 'categories.value = await res.json()']
  },
  {
    id: 137,
    title: '中級: JSON.parse/stringifyでローカル下書き更新',
    level: '中級',
    topic: 'JSON.parse + JSON.stringify',
    duration: '12分',
    problem: 'draftJson文字列とpatchを受けてマージしたJSON文字列を返す mergeDraftJson(draftJson, patch) を作ってください。parse失敗時はpatchのみを返します。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'try/catchでJSON.parseを保護し、最後にJSON.stringifyします。',
    answer:
      '<script setup>\nconst mergeDraftJson = (draftJson, patch) => {\n  try {\n    const current = JSON.parse(draftJson)\n    return JSON.stringify({ ...current, ...patch })\n  } catch {\n    return JSON.stringify({ ...patch })\n  }\n}\n</script>',
    checks: ['const current = JSON.parse(draftJson)', 'return JSON.stringify({ ...current, ...patch })', 'return JSON.stringify({ ...patch })']
  },
  {
    id: 138,
    title: '初級: mapでプロフィール表示名生成',
    level: '初級',
    topic: 'map',
    duration: '10分',
    problem: 'membersから `name (@account)` 形式を作る displayNames をcomputedで実装してください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'mapでテンプレート文字列へ変換します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst members = ref([{ name: "Taro", account: "taro01" }])\nconst displayNames = computed(() => members.value.map((m) => `${m.name} (@${m.account})`))\n</script>',
    checks: ['const displayNames = computed(() => members.value.map((m) => `${m.name} (@${m.account})`))']
  },
  {
    id: 139,
    title: '中級: mapで検索候補フォーマット',
    level: '中級',
    topic: 'map',
    duration: '10分',
    problem: 'suggestionsを `{ id, text }` へ変換する normalizedSuggestions をcomputedで作ってください。textはlabelを使います。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'mapで新オブジェクトを返します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst suggestions = ref([{ id: 1, label: "Vue" }])\nconst normalizedSuggestions = computed(() => suggestions.value.map((s) => ({ id: s.id, text: s.label })))\n</script>',
    checks: ['const normalizedSuggestions = computed(() => suggestions.value.map((s) => ({ id: s.id, text: s.label })))']
  },
  {
    id: 140,
    title: '初級: filterで在庫あり商品だけ表示',
    level: '初級',
    topic: 'filter',
    duration: '8分',
    problem: 'productsから stock > 0 のみ返す inStockProducts をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'filterで stock > 0 を条件にします。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst products = ref([{ id: 1, stock: 0 }, { id: 2, stock: 5 }])\nconst inStockProducts = computed(() => products.value.filter((p) => p.stock > 0))\n</script>',
    checks: ['const inStockProducts = computed(() => products.value.filter((p) => p.stock > 0))']
  },
  {
    id: 141,
    title: '中級: filterで当月予定のみ抽出',
    level: '中級',
    topic: 'filter',
    duration: '10分',
    problem: 'eventsから month が currentMonth と一致する要素だけ返す monthlyEvents をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'currentMonth.value と比較します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst currentMonth = ref(3)\nconst events = ref([{ month: 3, title: "A" }, { month: 4, title: "B" }])\nconst monthlyEvents = computed(() => events.value.filter((e) => e.month === currentMonth.value))\n</script>',
    checks: ['const monthlyEvents = computed(() => events.value.filter((e) => e.month === currentMonth.value))']
  },
  {
    id: 142,
    title: '初級: findで選択中プランを取得',
    level: '初級',
    topic: 'find',
    duration: '8分',
    problem: 'plansから selectedPlanId に一致する要素を返す selectedPlan をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'find((p) => p.id === selectedPlanId.value) です。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst selectedPlanId = ref("pro")\nconst plans = ref([{ id: "free" }, { id: "pro" }])\nconst selectedPlan = computed(() => plans.value.find((p) => p.id === selectedPlanId.value))\n</script>',
    checks: ['const selectedPlan = computed(() => plans.value.find((p) => p.id === selectedPlanId.value))']
  },
  {
    id: 143,
    title: '中級: findで最初のエラーフィールド取得',
    level: '中級',
    topic: 'find',
    duration: '10分',
    problem: 'fields配列から error が true の最初の要素を返す firstErrorField をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'find((f) => f.error) を使います。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst fields = ref([{ key: "name", error: false }, { key: "email", error: true }])\nconst firstErrorField = computed(() => fields.value.find((f) => f.error))\n</script>',
    checks: ['const firstErrorField = computed(() => fields.value.find((f) => f.error))']
  },
  {
    id: 144,
    title: '初級: reduceで買い物合計を算出',
    level: '初級',
    topic: 'reduce',
    duration: '10分',
    problem: 'cartの qty 合計を返す totalQty をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'reduce初期値0で加算します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst cart = ref([{ qty: 1 }, { qty: 3 }])\nconst totalQty = computed(() => cart.value.reduce((sum, item) => sum + item.qty, 0))\n</script>',
    checks: ['const totalQty = computed(() => cart.value.reduce((sum, item) => sum + item.qty, 0))']
  },
  {
    id: 145,
    title: '中級: reduceでカテゴリ別売上集計',
    level: '中級',
    topic: 'reduce',
    duration: '12分',
    problem: 'sales配列を category ごとの売上合計オブジェクトにする salesByCategory をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'reduceでacc[category]に加算します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst sales = ref([{ category: "book", amount: 1000 }, { category: "book", amount: 500 }])\nconst salesByCategory = computed(() => sales.value.reduce((acc, row) => {\n  acc[row.category] = (acc[row.category] || 0) + row.amount\n  return acc\n}, {}))\n</script>',
    checks: ['const salesByCategory = computed(() => sales.value.reduce((acc, row) => {', 'acc[row.category] = (acc[row.category] || 0) + row.amount']
  },
  {
    id: 146,
    title: '初級: includesで選択済み判定',
    level: '初級',
    topic: 'includes',
    duration: '8分',
    problem: 'selectedIdsに currentId が含まれるか返す isSelected をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'selectedIds.value.includes(currentId.value) です。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst selectedIds = ref([1, 3, 5])\nconst currentId = ref(3)\nconst isSelected = computed(() => selectedIds.value.includes(currentId.value))\n</script>',
    checks: ['const isSelected = computed(() => selectedIds.value.includes(currentId.value))']
  },
  {
    id: 147,
    title: '中級: includesで入力NGワード判定',
    level: '中級',
    topic: 'includes',
    duration: '10分',
    problem: 'textにblockedWordsのいずれかが含まれるか返す hasBlockedWord をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'some + includes の組み合わせを使います。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst text = ref("hello vue")\nconst blockedWords = ref(["spam", "hack"])\nconst hasBlockedWord = computed(() => blockedWords.value.some((word) => text.value.includes(word)))\n</script>',
    checks: ['const hasBlockedWord = computed(() => blockedWords.value.some((word) => text.value.includes(word)))']
  },
  {
    id: 148,
    title: '初級: Object.keysで入力項目数を表示',
    level: '初級',
    topic: 'Object.keys',
    duration: '8分',
    problem: 'formオブジェクトのキー数を返す fieldCount をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'Object.keys(form.value).length です。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst form = ref({ name: "", email: "", phone: "" })\nconst fieldCount = computed(() => Object.keys(form.value).length)\n</script>',
    checks: ['const fieldCount = computed(() => Object.keys(form.value).length)']
  },
  {
    id: 149,
    title: '中級: Object.keysで変更キー一覧作成',
    level: '中級',
    topic: 'Object.keys',
    duration: '12分',
    problem: 'beforeとafterを比較し、値が変わったキー配列を返す changedKeys をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'Object.keys(after.value).filter(...) を使います。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst before = ref({ name: "A", role: "user" })\nconst after = ref({ name: "B", role: "user" })\nconst changedKeys = computed(() => Object.keys(after.value).filter((key) => before.value[key] !== after.value[key]))\n</script>',
    checks: ['const changedKeys = computed(() => Object.keys(after.value).filter((key) => before.value[key] !== after.value[key]))']
  },
  {
    id: 150,
    title: '初級: Object.valuesで通知総数を算出',
    level: '初級',
    topic: 'Object.values',
    duration: '10分',
    problem: 'countByTypeオブジェクトの値合計を返す totalNotifications をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'Object.values + reduce を使います。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst countByType = ref({ info: 2, warn: 1, error: 3 })\nconst totalNotifications = computed(() => Object.values(countByType.value).reduce((sum, n) => sum + n, 0))\n</script>',
    checks: ['const totalNotifications = computed(() => Object.values(countByType.value).reduce((sum, n) => sum + n, 0))']
  },
  {
    id: 151,
    title: '中級: Object.valuesで最大値を取得',
    level: '中級',
    topic: 'Object.values',
    duration: '10分',
    problem: 'scoreMapから最大値を返す maxScore をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'Object.values後にMath.maxを使います。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst scoreMap = ref({ a: 12, b: 28, c: 19 })\nconst maxScore = computed(() => Math.max(...Object.values(scoreMap.value)))\n</script>',
    checks: ['const maxScore = computed(() => Math.max(...Object.values(scoreMap.value)))']
  },
  {
    id: 152,
    title: '初級: スプレッドでタグ追加',
    level: '初級',
    topic: '...spread',
    duration: '8分',
    problem: 'tagsの末尾にnewTagを追加する addTag(newTag) を実装してください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst tags = ref(["vue"])\n// ここを実装\n</script>',
    hint: 'tags.value = [...tags.value, newTag] です。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst tags = ref(["vue"])\nconst addTag = (newTag) => {\n  tags.value = [...tags.value, newTag]\n}\n</script>',
    checks: ['tags.value = [...tags.value, newTag]']
  },
  {
    id: 153,
    title: '中級: スプレッドでユーザー更新',
    level: '中級',
    topic: '...spread',
    duration: '12分',
    problem: 'userオブジェクトのnameのみ更新する updateName(nextName) を実装してください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst user = ref({ id: 1, name: "Taro", role: "admin" })\n// ここを実装\n</script>',
    hint: 'user.value = { ...user.value, name: nextName } です。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst user = ref({ id: 1, name: "Taro", role: "admin" })\nconst updateName = (nextName) => {\n  user.value = { ...user.value, name: nextName }\n}\n</script>',
    checks: ['user.value = { ...user.value, name: nextName }']
  },
  {
    id: 154,
    title: '初級: async/awaitでお知らせ一覧取得',
    level: '初級',
    topic: 'async/await + fetch',
    duration: '10分',
    problem: 'onMountedで /api/notices を取得し notices に代入してください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'fetch後にjsonをawaitして代入します。',
    answer:
      '<script setup>\nimport { onMounted, ref } from "vue"\nconst notices = ref([])\nonMounted(async () => {\n  const res = await fetch("/api/notices")\n  notices.value = await res.json()\n})\n</script>',
    checks: ['const res = await fetch("/api/notices")', 'notices.value = await res.json()']
  },
  {
    id: 155,
    title: '中級: async/awaitで送信中状態を管理',
    level: '中級',
    topic: 'async/await + fetch',
    duration: '12分',
    problem: 'submit(payload)でisSubmittingをtrueにし、POST完了後falseへ戻す処理を書いてください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst isSubmitting = ref(false)\n// ここを実装\n</script>',
    hint: 'try/finallyでfalseへ戻します。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst isSubmitting = ref(false)\nconst submit = async (payload) => {\n  isSubmitting.value = true\n  try {\n    await fetch("/api/submit", {\n      method: "POST",\n      headers: { "Content-Type": "application/json" },\n      body: JSON.stringify(payload)\n    })\n  } finally {\n    isSubmitting.value = false\n  }\n}\n</script>',
    checks: ['isSubmitting.value = true', 'isSubmitting.value = false']
  },
  {
    id: 156,
    title: '初級: JSON.stringifyで検索条件を保存',
    level: '初級',
    topic: 'JSON.stringify',
    duration: '8分',
    problem: 'filtersをJSON文字列化して filterJson をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'computed(() => JSON.stringify(filters.value)) を使います。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst filters = ref({ keyword: "", page: 1 })\nconst filterJson = computed(() => JSON.stringify(filters.value))\n</script>',
    checks: ['const filterJson = computed(() => JSON.stringify(filters.value))']
  },
  {
    id: 157,
    title: '中級: JSON.parseでドラフト復元',
    level: '中級',
    topic: 'JSON.parse',
    duration: '10分',
    problem: 'jsonTextをparseしてフォーム初期値へ使う parseDraft(jsonText) を作ってください。失敗時は空オブジェクトです。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'try/catchでJSON.parseを保護します。',
    answer:
      '<script setup>\nconst parseDraft = (jsonText) => {\n  try {\n    return JSON.parse(jsonText)\n  } catch {\n    return {}\n  }\n}\n</script>',
    checks: ['return JSON.parse(jsonText)', 'return {}']
  },
  {
    id: 158,
    title: '初級: map+includesで選択フラグ付与',
    level: '初級',
    topic: 'map + includes',
    duration: '10分',
    problem: 'itemsとselectedIdsから selected を付与した decoratedItems をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'mapで展開しつつ includes で判定します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst items = ref([{ id: 1, name: "A" }, { id: 2, name: "B" }])\nconst selectedIds = ref([2])\nconst decoratedItems = computed(() => items.value.map((item) => ({ ...item, selected: selectedIds.value.includes(item.id) })))\n</script>',
    checks: ['const decoratedItems = computed(() => items.value.map((item) => ({ ...item, selected: selectedIds.value.includes(item.id) })))']
  },
  {
    id: 159,
    title: '中級: filter+mapで公開ID一覧化',
    level: '中級',
    topic: 'filter + map',
    duration: '10分',
    problem: 'postsから公開済みのみ抽出しid配列を返す publishedIds をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'filterしてからmapでidを取り出します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst posts = ref([{ id: 1, status: "draft" }, { id: 2, status: "published" }])\nconst publishedIds = computed(() => posts.value.filter((p) => p.status === "published").map((p) => p.id))\n</script>',
    checks: ['const publishedIds = computed(() => posts.value.filter((p) => p.status === "published").map((p) => p.id))']
  },
  {
    id: 160,
    title: '初級: reduce+Object.valuesで平均計算',
    level: '初級',
    topic: 'reduce + Object.values',
    duration: '10分',
    problem: 'scoreMapの平均を返す averageScore をcomputedで作ってください。件数0なら0です。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'Object.valuesで配列化してsum/lengthを計算します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst scoreMap = ref({ a: 80, b: 70 })\nconst averageScore = computed(() => {\n  const values = Object.values(scoreMap.value)\n  if (!values.length) return 0\n  const sum = values.reduce((acc, n) => acc + n, 0)\n  return sum / values.length\n})\n</script>',
    checks: ['const values = Object.values(scoreMap.value)', 'const sum = values.reduce((acc, n) => acc + n, 0)']
  },
  {
    id: 161,
    title: '中級: Object.keys+reduceで空欄項目抽出',
    level: '中級',
    topic: 'Object.keys + reduce',
    duration: '12分',
    problem: 'formから空文字のキーを配列で返す blankKeys をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'Object.keys(form.value).reduce(...) を使います。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst form = ref({ name: "", email: "a@x.com", phone: "" })\nconst blankKeys = computed(() => Object.keys(form.value).reduce((acc, key) => {\n  if (form.value[key] === "") acc.push(key)\n  return acc\n}, []))\n</script>',
    checks: ['const blankKeys = computed(() => Object.keys(form.value).reduce((acc, key) => {', 'if (form.value[key] === "") acc.push(key)']
  },
  {
    id: 162,
    title: '初級: async/awaitで単一データ取得',
    level: '初級',
    topic: 'async/await + fetch',
    duration: '10分',
    problem: 'loadUser(id) を作り、`/api/users/:id` を取得して user に代入してください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'fetch後にjson()をawaitして代入します。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst user = ref(null)\nconst loadUser = async (id) => {\n  const res = await fetch(`/api/users/${id}`)\n  user.value = await res.json()\n}\n</script>',
    checks: ['const res = await fetch(`/api/users/${id}`)', 'user.value = await res.json()']
  },
  {
    id: 163,
    title: '中級: Promise.allで2リソース初期読込',
    level: '中級',
    topic: 'async/await + fetch',
    duration: '12分',
    problem: 'onMountedで `/api/profile` と `/api/settings` を並列取得し、profile/settingsへ代入してください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'Promise.allでfetchとjsonをまとめて待ちます。',
    answer:
      '<script setup>\nimport { onMounted, ref } from "vue"\nconst profile = ref(null)\nconst settings = ref(null)\nonMounted(async () => {\n  const [profileRes, settingsRes] = await Promise.all([fetch("/api/profile"), fetch("/api/settings")])\n  const [profileData, settingsData] = await Promise.all([profileRes.json(), settingsRes.json()])\n  profile.value = profileData\n  settings.value = settingsData\n})\n</script>',
    checks: ['const [profileRes, settingsRes] = await Promise.all([fetch("/api/profile"), fetch("/api/settings")])', 'profile.value = profileData', 'settings.value = settingsData']
  },
  {
    id: 164,
    title: '初級: JSON.parse+includesでお気に入り判定',
    level: '初級',
    topic: 'JSON.parse + includes',
    duration: '10分',
    problem: 'favoritesJson文字列とtargetIdから含有判定する isFavorite をcomputedで作ってください。parse失敗時はfalseです。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'try/catchでparseしてincludesを使います。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst favoritesJson = ref("[1,2,3]")\nconst targetId = ref(2)\nconst isFavorite = computed(() => {\n  try {\n    const ids = JSON.parse(favoritesJson.value)\n    return Array.isArray(ids) && ids.includes(targetId.value)\n  } catch {\n    return false\n  }\n})\n</script>',
    checks: ['const ids = JSON.parse(favoritesJson.value)', 'return Array.isArray(ids) && ids.includes(targetId.value)']
  },
  {
    id: 165,
    title: '中級: Object.keysでクエリ未入力判定',
    level: '中級',
    topic: 'Object.keys',
    duration: '10分',
    problem: 'queryオブジェクトが全て空文字ならtrueを返す isQueryEmpty をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'Object.keys(query.value).every(...) を使います。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst query = ref({ keyword: "", category: "" })\nconst isQueryEmpty = computed(() => Object.keys(query.value).every((key) => query.value[key] === ""))\n</script>',
    checks: ['const isQueryEmpty = computed(() => Object.keys(query.value).every((key) => query.value[key] === ""))']
  },
  {
    id: 166,
    title: '初級: スプレッドで通知設定更新',
    level: '初級',
    topic: '...spread',
    duration: '10分',
    problem: 'prefs.notification.sound を切り替える toggleSound() を実装してください。',
    starter: '<script setup>\nimport { ref } from "vue"\nconst prefs = ref({ notification: { sound: true, push: true } })\n// ここを実装\n</script>',
    hint: 'ネストしたオブジェクトを段階的にスプレッドします。',
    answer:
      '<script setup>\nimport { ref } from "vue"\nconst prefs = ref({ notification: { sound: true, push: true } })\nconst toggleSound = () => {\n  prefs.value = {\n    ...prefs.value,\n    notification: {\n      ...prefs.value.notification,\n      sound: !prefs.value.notification.sound\n    }\n  }\n}\n</script>',
    checks: ['sound: !prefs.value.notification.sound']
  },
  {
    id: 167,
    title: '中級: JSON.stringifyで送信ペイロード作成',
    level: '中級',
    topic: 'JSON.stringify',
    duration: '10分',
    problem: 'formとmetaをまとめてJSON文字列化する buildSubmitBody(form, meta) を作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'オブジェクトを作ってJSON.stringifyします。',
    answer:
      '<script setup>\nconst buildSubmitBody = (form, meta) => {\n  return JSON.stringify({ form, meta })\n}\n</script>',
    checks: ['return JSON.stringify({ form, meta })']
  },
  {
    id: 168,
    title: 'Regexで数字入力のみ許可判定',
    level: '初級',
    topic: 'RegExp',
    duration: '10分',
    problem: 'inputTextが数字のみか判定する isDigits をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: '/^\\d+$/.test(inputText.value) を使います。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst inputText = ref("")\nconst isDigits = computed(() => /^\\d+$/.test(inputText.value))\n</script>',
    checks: ['const isDigits = computed(() => /^\\d+$/.test(inputText.value))']
  },
  {
    id: 169,
    title: 'メール形式エラー表示',
    level: '中級',
    topic: 'RegExp validation',
    duration: '12分',
    problem: 'emailが不正なら true を返す hasEmailError をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: '簡易メールRegexを使って否定判定します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst email = ref("")\nconst hasEmailError = computed(() => !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value))\n</script>',
    checks: ['const hasEmailError = computed(() => !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value))']
  },
  {
    id: 170,
    title: '電話番号フォーマット検証',
    level: '中級',
    topic: 'RegExp validation',
    duration: '12分',
    problem: 'phoneが 090-1234-5678 または 09012345678 形式か判定する isValidPhone をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: '2パターンを | でつなぎます。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst phone = ref("")\nconst isValidPhone = computed(() => /^(\\d{11}|\\d{3}-\\d{4}-\\d{4})$/.test(phone.value))\n</script>',
    checks: ['const isValidPhone = computed(() => /^(\\d{11}|\\d{3}-\\d{4}-\\d{4})$/.test(phone.value))']
  },
  {
    id: 171,
    title: '郵便番号入力の検証',
    level: '初級',
    topic: 'RegExp validation',
    duration: '10分',
    problem: 'zipが 123-4567 形式か判定する isValidZip をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: '/^\\d{3}-\\d{4}$/ を使います。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst zip = ref("")\nconst isValidZip = computed(() => /^\\d{3}-\\d{4}$/.test(zip.value))\n</script>',
    checks: ['const isValidZip = computed(() => /^\\d{3}-\\d{4}$/.test(zip.value))']
  },
  {
    id: 172,
    title: 'パスワード強度メーター判定',
    level: '中級',
    topic: 'RegExp validation',
    duration: '14分',
    problem: 'passwordが英字+数字を含む8文字以上なら "strong"、それ以外は "weak" を返す passwordStrength をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'Regex.test結果を三項演算子で返します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst password = ref("")\nconst passwordStrength = computed(() => /^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$/.test(password.value) ? "strong" : "weak")\n</script>',
    checks: ['const passwordStrength = computed(() => /^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$/.test(password.value) ? "strong" : "weak")']
  },
  {
    id: 173,
    title: 'URL入力の形式判定',
    level: '初級',
    topic: 'RegExp',
    duration: '10分',
    problem: 'urlがhttp/httpsで始まるか判定する isHttpUrl をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: '/^https?:\\/\\// を使います。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst url = ref("")\nconst isHttpUrl = computed(() => /^https?:\\/\\/.+/.test(url.value))\n</script>',
    checks: ['const isHttpUrl = computed(() => /^https?:\\/\\/.+/.test(url.value))']
  },
  {
    id: 174,
    title: '数字以外を除去して整形',
    level: '初級',
    topic: 'RegExp replace',
    duration: '10分',
    problem: 'rawPhoneから数字以外を除去した normalizedPhone をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'replace(/[^0-9]/g, "") を使います。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst rawPhone = ref("090-1234-5678")\nconst normalizedPhone = computed(() => rawPhone.value.replace(/[^0-9]/g, ""))\n</script>',
    checks: ['const normalizedPhone = computed(() => rawPhone.value.replace(/[^0-9]/g, ""))']
  },
  {
    id: 175,
    title: 'フォームのRegex一括バリデーション',
    level: '実務',
    topic: 'RegExp form validation',
    duration: '16分',
    problem: 'form(email, phone, zip)を検証して、エラーキー配列を返す validationErrors をcomputedで作ってください。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: '各項目ごとに判定し、NGなら配列へpushします。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst form = ref({ email: "", phone: "", zip: "" })\nconst validationErrors = computed(() => {\n  const errors = []\n  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(form.value.email)) errors.push("email")\n  if (!/^(\\d{11}|\\d{3}-\\d{4}-\\d{4})$/.test(form.value.phone)) errors.push("phone")\n  if (!/^\\d{3}-\\d{4}$/.test(form.value.zip)) errors.push("zip")\n  return errors\n})\n</script>',
    checks: ['const validationErrors = computed(() => {', 'errors.push("email")', 'errors.push("phone")', 'errors.push("zip")']
  },
  {
    id: 176,
    title: '入力欄の即時エラーメッセージ',
    level: '中級',
    topic: 'RegExp UI validation',
    duration: '14分',
    problem: 'usernameが英数字4〜12文字でなければメッセージを返す usernameError をcomputedで作ってください。正しければ空文字を返します。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: 'test結果で空文字かエラー文を返します。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst username = ref("")\nconst usernameError = computed(() => /^[A-Za-z0-9]{4,12}$/.test(username.value) ? "" : "ユーザー名は英数字4〜12文字で入力してください")\n</script>',
    checks: ['const usernameError = computed(() => /^[A-Za-z0-9]{4,12}$/.test(username.value) ? "" : "ユーザー名は英数字4〜12文字で入力してください")']
  },
  {
    id: 177,
    title: '禁止語チェック（大文字小文字無視）',
    level: '実務',
    topic: 'RegExp flags',
    duration: '12分',
    problem: 'commentに spam または scam が含まれるか返す hasBlockedWord をcomputedで作ってください。大文字小文字は区別しません。',
    starter: '<script setup>\n// ここを実装\n</script>',
    hint: '/(spam|scam)/i を使います。',
    answer:
      '<script setup>\nimport { computed, ref } from "vue"\nconst comment = ref("")\nconst hasBlockedWord = computed(() => /(spam|scam)/i.test(comment.value))\n</script>',
    checks: ['const hasBlockedWord = computed(() => /(spam|scam)/i.test(comment.value))']
  }
]

const levelFocusMap = {
  初級: 'Vueの基本構文を正しく書けること',
  中級: '状態管理とイベント処理を意図通りに構成できること',
  上級: 'コンポーネント連携やルーティングを破綻なく設計できること',
  実務: '非同期処理や例外系を含めた実装を安全に扱えること'
}

const specOverrides = {
  1: {
    assumptions: ['countの初期値は0とする', '1クリックごとに+1のみ行う'],
    ioExamples: ['初期表示: 0, 1回クリック後: 1'],
    outOfScope: ['減算ボタンやリセット機能は不要']
  },
  2: {
    assumptions: [
      '消費税率は 10%（taxRate = 0.1）で固定する',
      '税込み金額は小数点以下を切り捨てる（Math.floor）',
      '初期価格は price = 1000 を利用する'
    ],
    ioExamples: [
      'price = 1000 のとき taxIncluded = 1100',
      'price = 1980 のとき taxIncluded = 2178'
    ],
    outOfScope: [
      '軽減税率など複数税率の考慮は不要',
      '通貨フォーマット（3桁区切り）対応は不要'
    ]
  },
  3: {
    assumptions: ['nameの初期値は空文字とする', 'v-modelで双方向バインドする'],
    ioExamples: ['inputに "Vue" と入力したら下段表示も "Vue"'],
    outOfScope: ['バリデーションやtrim処理は不要']
  },
  4: {
    assumptions: ['starterのtodos配列をそのまま利用する', 'keyはtodo.idを使う'],
    ioExamples: ['2件のliが順番どおり表示される'],
    outOfScope: ['削除・追加処理の実装は不要']
  },
  5: {
    assumptions: ['isLoading=trueでLoading, falseでDoneを表示する', '同時表示はしない'],
    ioExamples: ['isLoading=falseならDoneのみ表示'],
    outOfScope: ['ローディングの実時間制御は不要']
  },
  6: {
    assumptions: ['watch対象はkeywordのみ', 'ログ出力はnewValueを使う'],
    ioExamples: ['keywordがabcに変わった時 consoleにabcを出力'],
    outOfScope: ['API連携やdebounceは不要']
  },
  7: {
    assumptions: ['watchEffectは初回実行される前提', 'count.value参照で依存登録する'],
    ioExamples: ['count変更のたびに最新値が出力される'],
    outOfScope: ['停止処理(onInvalidate)は不要']
  },
  8: {
    assumptions: ['nameはString, ageはNumberで受け取る', 'templateでprops経由表示する'],
    ioExamples: ['name=Taro, age=20で "Taro (20)" 表示'],
    outOfScope: ['propsの厳密バリデーションは不要']
  },
  9: {
    assumptions: ['イベント名はsubmit固定', 'payloadは{ ok: true }固定'],
    ioExamples: ['送信ボタン押下でsubmitイベント1回発火'],
    outOfScope: ['API送信や多重クリック防止は不要']
  },
  10: {
    assumptions: ['onMountedで1回のみ取得する', 'レスポンスはjsonとしてprofileへ代入する'],
    ioExamples: ['onMounted後にprofile.valueがオブジェクトになる'],
    outOfScope: ['エラーUIとリトライ処理は不要']
  },
  11: {
    assumptions: ['検索は大文字小文字を区別しない', '部分一致(includes)で判定する'],
    ioExamples: ['keyword=taでTaroが残る'],
    outOfScope: ['日本語かな漢字変換の曖昧検索は不要']
  },
  12: {
    assumptions: ['submitは@submit.preventで発火する', 'POST bodyはname/emailの2項目のみ'],
    ioExamples: ['送信時にapplication/jsonでPOSTされる'],
    outOfScope: ['入力バリデーションとトースト表示は不要']
  },
  13: {
    assumptions: ['provideキーはtheme固定', 'injectのデフォルトはlight'],
    ioExamples: ['provideありならdark, なしならlight'],
    outOfScope: ['階層コンポーネント分割の実装は不要']
  },
  14: {
    assumptions: ['遷移先は/js-practice固定', 'useRouter().pushを使う'],
    ioExamples: ['Go押下で/js-practiceへ遷移'],
    outOfScope: ['遷移前確認ダイアログは不要']
  },
  15: {
    assumptions: ['load開始時にloading=true/error初期化する', 'finallyで必ずloading=falseに戻す'],
    ioExamples: ['成功時:data更新, 失敗時:error更新, 最終的にloading=false'],
    outOfScope: ['再試行ボタンや指数バックオフは不要']
  },
  16: {
    assumptions: ['keywordは小文字比較で検索', '並び順はprice昇順固定'],
    ioExamples: ['A:300, B:100 なら visibleProductsはB,A順'],
    outOfScope: ['降順切替や複合ソートは不要']
  },
  17: {
    assumptions: ['クリック式はcount++でよい', '表示文言はCount: {{ count }}を維持する'],
    ioExamples: ['初期0, 2回クリックで2'],
    outOfScope: ['別メソッド化やcomputed化は不要']
  },
  18: {
    assumptions: ['formはreactiveで1オブジェクトにまとめる', 'rememberの初期値はfalse'],
    ioExamples: ['email/passwordは空文字で開始'],
    outOfScope: ['送信処理の実装は不要']
  },
  19: {
    assumptions: ['参照維持のため再代入せずObject.assignを使う', '更新対象はemailのみ'],
    ioExamples: ['password値は保持されたままemailだけ変更'],
    outOfScope: ['部分更新ヘルパー関数化は不要']
  },
  20: {
    assumptions: ['fullNameは"姓 名"の順で結合する', 'スペース1つで連結する'],
    ioExamples: ['Yamada + Taro => "Yamada Taro"'],
    outOfScope: ['ミドルネーム対応は不要']
  },
  21: {
    assumptions: ['watchコールバックはasyncで記述する', 'keyword変更ごとに検索APIを呼ぶ'],
    ioExamples: ['keyword更新時に/api/search?q=...を呼び出し'],
    outOfScope: ['キャンセル制御とdebounceは不要']
  },
  22: {
    assumptions: ['イベント名はlike固定', 'クリック時にemit("like")を直接呼ぶ'],
    ioExamples: ['Likeボタン押下でlikeイベント1回発火'],
    outOfScope: ['二重いいね防止は不要']
  },
  23: {
    assumptions: ['propsはmodelValue/labelを受ける', '入力時にupdate:modelValueをemitする'],
    ioExamples: ['入力 "abc" でemit("update:modelValue", "abc")'],
    outOfScope: ['IME最適化や遅延更新は不要']
  },
  24: {
    assumptions: ['titleは必須props', '本文はdefault slotで受ける'],
    ioExamples: ['title表示 + slot内容表示の2領域構成'],
    outOfScope: ['header/footerのnamed slotは不要']
  },
  25: {
    assumptions: ['fetchUsersはasync関数で定義する', 'onMounted(fetchUsers)で初回取得する'],
    ioExamples: ['開始時loading=true, 終了時loading=false'],
    outOfScope: ['ページングやキャッシュは不要']
  },
  26: {
    assumptions: ['debounce時間は300ms固定', 'requestId一致時のみ結果反映する'],
    ioExamples: ['後発リクエストのみresultsを更新'],
    outOfScope: ['AbortController実装は不要']
  },
  27: {
    assumptions: ['openはref(false)で管理', 'closeイベントでfalseへ戻す'],
    ioExamples: ['Open押下で表示, closeで非表示'],
    outOfScope: ['フォーカストラップ実装は不要']
  },
  28: {
    assumptions: ['送信中フラグはsubmittingで一元管理', 'finallyで必ずsubmitting=false'],
    ioExamples: ['成功時success=true, 失敗時error文字列設定'],
    outOfScope: ['フィールド単位エラー表示は不要']
  },
  29: {
    assumptions: ['初期値はroute.query.keywordを使う', '更新はrouter.replaceで履歴を汚さない'],
    ioExamples: ['keyword空文字ならqueryから削除(undefined)'],
    outOfScope: ['双方向同期の循環防止ロジックは不要']
  },
  30: {
    assumptions: ['store名はauth固定', 'isLoggedInはuserの真偽で判定する'],
    ioExamples: ['login後 user/tokenセット, logoutで両方null'],
    outOfScope: ['永続化(localStorage)は不要']
  },
  31: {
    assumptions: ['初期page=1,pageSize=20', 'watchはimmediate:trueで初回取得する'],
    ioExamples: ['total=95,pageSize=20 => totalPages=5'],
    outOfScope: ['サーバーエラー処理は不要']
  },
  32: {
    assumptions: ['tempIdで即時反映し先頭挿入する', '失敗時はtempId項目を除外してロールバック'],
    ioExamples: ['成功時temp行がcreatedへ置換される'],
    outOfScope: ['再試行キューは不要']
  },
  33: {
    assumptions: ['storage keyはdraft:profileを使う', 'watchで変更ごとに即保存する'],
    ioExamples: ['draft入力更新でlocalStorage値も更新'],
    outOfScope: ['保存頻度の間引き(throttle)は不要']
  },
  34: {
    assumptions: ['requiresAuth=true かつ未ログインで/loginへ遷移', 'redirectにto.fullPathを保持する'],
    ioExamples: ['保護ページアクセス時に/login?redirect=...へ'],
    outOfScope: ['ロール権限制御は不要']
  },
  35: {
    assumptions: ['execute開始でloading=true,error=null', 'finallyでloading=falseに戻す'],
    ioExamples: ['成功時data更新, 失敗時error更新'],
    outOfScope: ['自動再実行(auto fetch)は不要']
  },
  36: {
    assumptions: ['formはreactive、loading/errorはrefで管理', 'submit内でtry/catch/finallyを使う'],
    ioExamples: ['submit開始でloading=true, 終了でfalse'],
    outOfScope: ['remember meや2FA対応は不要']
  },
  37: {
    assumptions: ['showDone=trueなら全件表示', 'falseならdone=falseのみ表示'],
    ioExamples: ['showDone=false時に未完了タスクのみvisibleTasksへ残る'],
    outOfScope: ['並び替えや検索の同時対応は不要']
  }
}

const buildSpec = (task) => {
  const base = {
    assumptions: [
      '問題文にない値は starter / answer の初期値を採用する',
      'リアクティブ更新は Vue の標準API（ref/reactive/computed/watch）で実装する'
    ],
    ioExamples: [
      'チェックボタン押下時に必須トークンが確認できる状態にする',
      'リセット後は starter と同じ状態へ戻る'
    ],
    outOfScope: ['UIデザインの作り込みは評価対象外']
  }

  const override = specOverrides[task.id] ?? {}
  return {
    assumptions: [...base.assumptions, ...(override.assumptions ?? [])],
    ioExamples: [...base.ioExamples, ...(override.ioExamples ?? [])],
    outOfScope: [...base.outOfScope, ...(override.outOfScope ?? [])]
  }
}

const buildDesign = (task) => {
  const checks = Array.isArray(task.checks) ? task.checks : []
  const topChecks = checks.slice(0, 4)

  const requirements = [
    ...topChecks.map((token, index) => `${index + 1}. ${token} を実装に含める`),
    '命名は問題文で指定された変数名・関数名を維持する',
    '不要な副作用を増やさず最小実装で通す'
  ]

  const steps = [
    'starterを確認し、追加が必要なstate・関数・template要素を列挙する',
    'script setup側で必要な宣言を先に実装する',
    'template側でイベント・表示・バインドを接続する',
    'checksと照らして不足トークンを埋める'
  ]

  const acceptance = [
    `主達成条件: ${task.problem}`,
    ...topChecks.map((token) => `検証条件: ${token} がコードに含まれる`),
    'リセット後に再実装しても同じ結果になる'
  ]

  const pitfalls = [
    'refの値更新は value を忘れない',
    'watch内の非同期処理は二重実行や競合を意識する',
    'defineProps/defineEmitsはscript setupのトップレベルで定義する'
  ]

  return {
    objective: `${task.level}の到達目標: ${levelFocusMap[task.level] ?? '要件を満たす実装ができること'}`,
    requirements,
    steps,
    acceptance,
    pitfalls,
    review: `レビュー観点: ${task.topic} を使う理由を1文で説明できるか確認する`
  }
}

const inferParamHint = (name) => {
  const key = String(name).toLowerCase()
  if (/id|index|page|count|total/.test(key)) return `${name}: 数値（例: 1, 20）`
  if (/keyword|name|email|phone|text|label/.test(key)) return `${name}: 文字列（例: "sample"）`
  if (/list|items|users|orders|tags|arr|array/.test(key)) return `${name}: 配列（例: [1, 2, 3]）`
  if (/event|emit|callback|fn/.test(key)) return `${name}: 関数やイベントペイロード`
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
    : ['この問題は主にstateとtemplate構造を組み立てるタイプです']

  const conditions = [
    'script setup と template の役割を分けて実装する',
    '問題文の変数名・イベント名を維持する',
    task.hint
  ]

  return {
    functionSignature: firstSignature
      ? `${firstSignature.name}(${firstSignature.params.join(', ')})`
      : '関数シグネチャ指定なし',
    argumentHints,
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

const starDifficultyMap = buildStarDifficultyMap(baseVueTasks)

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

const normalizeTitle = (title) =>
  String(title)
    .replace(/^\s*(初級|中級|上級|実務)\s*:\s*/u, '')
    .trim()

export const vueTasks = baseVueTasks.map((task) => {
  const warning = buildMutationWarning(task)
  return {
    ...task,
    title: normalizeTitle(task.title),
    starDifficulty: starDifficultyMap.get(task.id) ?? 3,
    mutationWarningMeta: warning,
    mutationWarning: warning?.detail ?? null,
    mutationWarningShort: warning?.short ?? null,
    mutationWarningLevel: warning?.level ?? null,
    design: buildDesign(task),
    spec: buildSpec(task),
    thinking: buildThinking(task)
  }
})
