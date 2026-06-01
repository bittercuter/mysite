#!/usr/bin/env bash
# main ブランチに保護ルールを適用するスクリプト
# 前提: gh CLI ログイン済み (gh auth login)
# 実行: bash scripts/setup-branch-protection.sh

set -euo pipefail

REPO="${REPO:-$(gh repo view --json nameWithOwner -q .nameWithOwner)}"
BRANCH="${BRANCH:-main}"

echo "Applying branch protection to ${REPO}@${BRANCH}..."

gh api -X PUT "repos/${REPO}/branches/${BRANCH}/protection" \
  --input - <<'JSON'
{
  "required_status_checks": {
    "strict": true,
    "contexts": [
      "Build & Verify",
      "Analyze (javascript-typescript)",
      "Analyze (actions)"
    ]
  },
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": false,
    "required_approving_review_count": 0,
    "require_last_push_approval": false
  },
  "restrictions": null,
  "required_linear_history": true,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "required_conversation_resolution": true,
  "lock_branch": false,
  "allow_fork_syncing": true
}
JSON

echo "Enabling Dependabot security updates..."
gh api -X PUT "repos/${REPO}/automated-security-fixes" || true
gh api -X PUT "repos/${REPO}/vulnerability-alerts" || true

echo "Done. Branch protection applied to ${BRANCH}."
