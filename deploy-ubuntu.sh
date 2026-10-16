#!/usr/bin/env bash
# Deploy this independent demo project, without touching the current client's website.
set -Eeuo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SLUG="a-one-taxi-services-redesign"
cd "$ROOT"
command -v git >/dev/null || { echo 'Missing git'; exit 1; }
command -v gh >/dev/null || { echo 'Missing GitHub CLI (gh)'; exit 1; }
if ! gh auth status >/dev/null 2>&1; then echo 'Log into GitHub first: gh auth login'; exit 1; fi
if [ ! -d .git ]; then git init -b main; fi
cat > .gitignore <<'EOF'
.env
.env.*
.vercel/
.DS_Store
node_modules/
EOF
git add -A
if ! git diff --cached --quiet; then git commit -m "Redesign A-One Taxi Services UI"; fi
if git remote get-url origin >/dev/null 2>&1; then
  git push -u origin main
else
  gh repo create "$SLUG" --private --source=. --remote=origin --push
fi
echo 'GitHub pushed. Requesting an independent Vercel preview...'
if command -v vercel >/dev/null 2>&1; then VERCEL='vercel'; else VERCEL='npx --yes vercel'; fi
$VERCEL --prod --yes --scope shayo-victors-projects || {
  echo 'Vercel CLI deployment was not confirmed. Check Vercel dashboard; GitHub push succeeded.'
  exit 2
}
