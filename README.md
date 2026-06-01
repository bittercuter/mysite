# bittercute.dev

[bittercute.dev](https://bittercute.dev) のソースコード。

## スタック

- Vite + React + TypeScript
- Tailwind CSS v4
- Biome (Lint / Format)
- ホスティング: Cloudflare Pages
- CI/CD: GitHub Actions

## 開発

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ に本番ビルド
npm run preview  # ビルド成果物の確認
npm run lint     # Biome lint
npm run check    # Biome lint + format 自動修正
```

## デプロイ (GitHub Actions → Cloudflare Pages)

`main` への push で本番、PR で Preview デプロイが自動実行されます。
ワークフロー: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)

### 初回セットアップ

#### 1. Cloudflare 側

1. Cloudflare ダッシュボード → **Workers & Pages** → **Create** → **Pages** → **Direct Upload**
2. Project name に `bittercute` を入力して作成（中身は空でOK、Actions が後で push する）
3. 作成後 **Custom domains** で `bittercute.dev` を追加

#### 2. API トークン作成

1. Cloudflare ダッシュボード右上のアイコン → **My Profile** → **API Tokens** → **Create Token**
2. テンプレート **"Edit Cloudflare Workers"** を選択（または Custom で `Account > Cloudflare Pages > Edit` 権限を付与）
3. 生成されたトークンをコピー
4. **Account ID** は Workers & Pages のサイドバーから取得

#### 3. GitHub Secrets を登録

リポジトリの **Settings → Secrets and variables → Actions → New repository secret** で以下を追加:

| Name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | 上で作成した API トークン |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare アカウント ID |

以上で `git push origin main` するたびに本番デプロイされます。

### ワークフローの動作

| トリガー | 動作 |
|---|---|
| `push` to `main` | 本番デプロイ (`bittercute.dev`) |
| `pull_request` | Preview デプロイ + PR にコメントで URL 通知 |
| 手動 (`workflow_dispatch`) | 任意のブランチで実行可 |

各ジョブで `npm ci` → `npm run lint` → `npm run build` → `wrangler pages deploy` を実行します。

### ローカルから直接デプロイ (緊急時用)

```bash
npx wrangler pages deploy dist --project-name=bittercute
```

## セキュリティ

| 仕組み | 内容 |
|---|---|
| **CodeQL** | `.github/workflows/codeql.yml` — JS/TS と Actions の脆弱性を週次スキャン |
| **Dependabot** | `.github/dependabot.yml` — npm / Actions の更新 PR を毎週月曜に自動生成 |
| **harden-runner** | Actions ランナーの egress を監査 (audit モード) |
| **最小権限** | workflow 全体は `contents: read`、deploy ジョブのみ追加権限 |
| **fork PR ガード** | fork からの PR では deploy をスキップして Secrets を保護 |
| **persist-credentials: false** | checkout 後のトークン残留を防止 |
| **アーティファクト分離** | build と deploy を別ジョブに分け、ビルド成果物のみ受け渡し |

### ブランチ保護の設定

`main` を保護して force push / 削除を禁止し、CI 通過を必須にします。

```bash
# gh CLI ログイン済みで実行
bash scripts/setup-branch-protection.sh
```

適用される内容:
- `main` への直接 push 禁止 (PR 必須)
- CI チェック (`Build & Verify`, `CodeQL Analyze`) の通過必須
- 会話の解決必須
- 線形履歴必須 (merge commit 禁止)
- force push / ブランチ削除 禁止
- Dependabot のセキュリティ自動修正を有効化

### 脆弱性報告

[SECURITY.md](./SECURITY.md) を参照してください。

## 構成

```
.github/
  workflows/
    deploy.yml    # CI/CD (Cloudflare Pages)
    codeql.yml    # CodeQL セキュリティスキャン
  dependabot.yml  # 依存関係の自動更新
scripts/
  setup-branch-protection.sh
SECURITY.md
src/
  App.tsx         # ページ本体
  index.css       # Tailwind v4 エントリ
  main.tsx
public/
  favicon.svg
  apple-touch-icon.svg
index.html
biome.json
tsconfig.json
vite.config.ts
```
