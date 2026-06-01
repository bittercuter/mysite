# bittercute.dev

[bittercute.dev](https://bittercute.dev) のソースコード。

## スタック

- Vite + React + TypeScript
- Tailwind CSS v4
- Biome (Lint / Format)
- ホスティング: Cloudflare Pages (Git 連携)
- CI: GitHub Actions

## 開発

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ に本番ビルド
npm run preview  # ビルド成果物の確認
npm run lint     # Biome lint
npm run check    # Biome lint + format 自動修正
```

## デプロイ (Cloudflare Pages の Git 連携)

API トークンを発行せず、Cloudflare が GitHub の push を検知して自分でビルド・デプロイします。

```
git push origin main → Cloudflare が webhook 受信 → ビルド → 本番反映
PR を作成            → Preview デプロイ + PR にコメントで URL 通知
```

### 初回セットアップ

1. [Cloudflare ダッシュボード](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. GitHub アカウントを連携し、`bittercuter/mysite` を選択
3. Build 設定:

   | 項目 | 値 |
   |---|---|
   | **Project name** | `bittercute` |
   | **Production branch** | `main` |
   | **Framework preset** | `Vite` |
   | **Build command** | `npm run build` |
   | **Build output directory** | `dist` |
   | **Environment variables** | `NODE_VERSION=22` |

4. **Save and Deploy**
5. デプロイ完了後 **Custom domains** で `bittercute.dev` を追加

### なぜ Git 連携か

- **API Token を発行しない**(漏洩のリスクを根絶)
- GitHub ↔ Cloudflare の OAuth で認証され、長期トークンを自分で管理する必要がない
- GitHub Actions の CI(`Build & Verify` / `CodeQL`)を **Branch Protection の必須チェック**にすれば、CI 通過済みコードしか main に入らない → Cloudflare はその main をビルドするので、結果として CI ゲートが効く

### ローカルから手動デプロイ (緊急時用)

```bash
npx wrangler pages deploy dist --project-name=bittercute
```

このときだけ一時的に API Token を発行 → 使用後すぐ revoke すれば長期保持しなくて済みます。

## セキュリティ

| 仕組み | 内容 |
|---|---|
| **API Token を持たない** | Cloudflare の Git 連携で OAuth 認証、long-lived secret なし |
| **CodeQL** | `.github/workflows/codeql.yml` — JS/TS と Actions の脆弱性を週次スキャン |
| **Dependabot** | `.github/dependabot.yml` — npm / Actions の更新 PR を毎週月曜に自動生成 |
| **harden-runner** | Actions ランナーの egress を監査 |
| **最小権限** | workflow は `contents: read` のみ |
| **persist-credentials: false** | checkout 後のトークン残留を防止 |

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

### GitHub 側で 1 回だけ手動 ON にしておくと安全

- **Settings → Code security**: `Secret scanning` / `Push protection` / `Code scanning` をすべて有効化
- **Settings → Actions → General → Workflow permissions**: `Read repository contents and packages permissions` をデフォルトに

### 脆弱性報告

[SECURITY.md](./SECURITY.md) を参照してください。

## 構成

```
.github/
  workflows/
    ci.yml          # Lint + 型チェック + ビルド検証
    codeql.yml      # CodeQL セキュリティスキャン
  dependabot.yml    # 依存関係の自動更新
scripts/
  setup-branch-protection.sh
SECURITY.md
src/
  App.tsx           # ページ本体
  index.css         # Tailwind v4 エントリ
  main.tsx
public/
  favicon.svg
  apple-touch-icon.svg
index.html
biome.json
tsconfig.json
vite.config.ts
```
