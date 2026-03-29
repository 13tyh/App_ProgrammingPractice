# App Programming Practice

Vue 3 + Vite で作られた、JavaScript / Vue の実装演習アプリです。

この README は、実装コードを起点にしたリバースエンジニアリングで整理しています。

## 1. このプロジェクトが何をするか

- JavaScript コースと Vue コースを切り替えて問題演習できる
- 問題一覧で検索 / 難易度 / 未完了 / 再挑戦期限フィルタが使える
- 解答画面でコード実行・チェック・リセットができる
- 学習履歴と再挑戦キューを localStorage で永続化する
- 学習ログから連続日数や日次進捗を可視化する

## 2. 実装から確認した現状仕様

### 問題バンク規模

- JavaScript 問題: 239
- Vue 問題: 202

### 画面構成

- `/js-practice`: JavaScript 問題一覧
- `/js-practice/:id`: JavaScript 解答画面
- `/vue-practice`: Vue 問題一覧
- `/vue-practice/:id`: Vue 解答画面

### 解答チェックの挙動

- JS 解答画面:
	- Web Worker で実行し、タイムアウト付きで無限ループを抑止
	- 実行ログ比較 + 必須トークンでチェック
- Vue 解答画面:
	- コメント除去後の比較
	- template/script 構造チェック
	- 必要時は script を Worker で簡易実行検証

### 学習管理

- `useSolvedTasks`:
	- 完了状態、学習履歴、再挑戦キューを保存
	- 書き込みは短い遅延バッチで最適化
	- 不正解時は 7 日後の再挑戦キューへ登録
- `useLearningMetrics`:
	- レベル別達成率
	- 直近 7 日の学習数
	- 連続学習日数
	- 今日の達成数

## 3. 技術スタック

- フロントエンド: Vue 3, Vue Router 5
- ビルド: Vite 8
- エディタ: vue-codemirror + CodeMirror
- テスト: Vitest, @vue/test-utils, jsdom
- パッケージ運用: Bun（`bun.lock` 管理）

## 4. ディレクトリ構成（主要部）

```text
src/
	components/         # 共通UIコンポーネント
	composables/        # 一覧制御・保存・メトリクス
	constants/          # 問題バンク
	router/             # ルーティング
	views/              # 一覧画面 / 解答画面

test/
	component/          # 単体テスト（UIコンポーネント）
	unit/               # ユニットテスト（composable中心）
```

## 5. セットアップ（Bun前提）

```bash
bun install
```

開発サーバー:

```bash
bun run dev
```

ビルド:

```bash
bun run build
```

## 6. npm scripts

`package.json` に以下が定義されています。

- `dev`: 開発サーバー起動
- `build`: 本番ビルド
- `preview`: ビルド結果のプレビュー
- `test`: 全テスト実行
- `test:watch`: 監視モード
- `test:component`: `test/component` のみ実行
- `test:unit`: `test/unit` のみ実行

## 7. テスト方針

- 単体テスト (`test/component`):
	- 共通UIコンポーネントの表示・イベント emit・状態変化を検証
- ユニットテスト (`test/unit`):
	- composable の絞り込み、保存、学習メトリクス計算を検証

## 8. CI/CD（GitHub Actions）

- ワークフロー: `.github/workflows/ci-cd.yml`
- CI:
	- main への push と pull request で実行
	- Bun で依存解決後、component/unit テストと build を実行
- CD:
	- main への push 時のみ実行
	- GitHub Pages 用に build し、dist を Pages へデプロイ

GitHub Pages の公開に必要な設定:

- GitHub リポジトリ Settings > Pages > Source を GitHub Actions にする

このリポジトリでは Pages 配信用のベースパスを `/App_ProgrammingPractice/` に設定しています。

## 9. 既知事項

- `src/style.css` の `clamp(...)` に対して、環境依存でエディタ診断警告が出る場合があります。
- 直近のビルドとテストは通過しています（実行環境: Windows, Node/Bun）。

## 10. 今後の拡張ポイント

- 判定ロジックの厳格化（ASTベース比較など）
- 演習データの外部化（JSON/DB）
- 学習履歴の可視化拡張（週次/月次）
- E2E テスト導入（Playwright など）
