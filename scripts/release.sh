#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

ASSET_NAME="deep-researcher.zip"
REPO="leonbeckert/deep-researcher"

usage() {
  cat <<'EOF'
Usage:
  bash scripts/release.sh <tag>

Example:
  bash scripts/release.sh v1.2.0

What it does:
  1. Verifies the git tag exists locally
  2. Builds deep-researcher.zip from that tag via git archive
  3. Creates or updates the GitHub Release for the tag via gh CLI
  4. Uploads the asset as deep-researcher.zip

Prerequisites:
  - gh CLI installed and authenticated
  - git remote tag already pushed to origin
EOF
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

TAG="${1:-}"
if [[ -z "$TAG" ]]; then
  usage
  exit 1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "gh CLI is required. Install it from https://cli.github.com/" >&2
  exit 1
fi

if ! command -v git >/dev/null 2>&1; then
  echo "git is required." >&2
  exit 1
fi

if ! git rev-parse --verify --quiet "$TAG^{tag}" >/dev/null; then
  echo "Tag '$TAG' does not exist locally." >&2
  echo "Create and push it first:" >&2
  echo "  git tag $TAG" >&2
  echo "  git push origin $TAG" >&2
  exit 1
fi

if ! git ls-remote --exit-code --tags origin "refs/tags/$TAG" >/dev/null 2>&1; then
  echo "Tag '$TAG' is not on origin." >&2
  echo "Push it first: git push origin $TAG" >&2
  exit 1
fi

echo "Building $ASSET_NAME from $TAG..."
rm -f "$ASSET_NAME"
git archive --format=zip --output "$ASSET_NAME" "$TAG"

if gh release view "$TAG" --repo "$REPO" >/dev/null 2>&1; then
  echo "Release $TAG already exists. Replacing asset..."
  gh release upload "$TAG" "$ASSET_NAME" \
    --repo "$REPO" \
    --clobber
else
  echo "Creating release $TAG..."
  gh release create "$TAG" "$ASSET_NAME" \
    --repo "$REPO" \
    --title "$TAG" \
    --generate-notes
fi

echo
echo "Published release asset:"
echo "  https://github.com/$REPO/releases/latest/download/$ASSET_NAME"
