#!/usr/bin/env bash
# Rebuild the site from the report and publish it to the gh-pages branch,
# which GitHub Pages serves at https://kiaanwankhede.github.io/PROJ_AUTONOMOUS/
#
# Usage: site/deploy.sh ["commit message"]
set -euo pipefail

root=$(git rev-parse --show-toplevel)
msg=${1:-"Publish site from $(git -C "$root" rev-parse --short HEAD)"}

(cd "$root/site" && npm install --no-audit --no-fund --silent && node build.mjs)

tmp=$(mktemp -d)
work="$tmp/gh-pages"
cleanup() { cd "$root"; git worktree remove --force "$work" >/dev/null 2>&1 || true; rm -rf "$tmp"; }
trap cleanup EXIT

git -C "$root" fetch --quiet origin gh-pages
git -C "$root" worktree add --quiet --detach "$work" FETCH_HEAD
cp "$root/docs/index.html" "$work/index.html"
touch "$work/.nojekyll"

cd "$work"
git add -A
if git diff --cached --quiet; then
  echo "gh-pages is already up to date"
  exit 0
fi
git commit --quiet -m "$msg"
git push --quiet origin HEAD:gh-pages
echo "Published to gh-pages. GitHub Pages updates within a minute or two."
