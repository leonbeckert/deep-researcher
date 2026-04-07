#!/usr/bin/env bash
# Build minified Tailwind v4 CSS from tailwind-src.html.
# Output is written to stdout so it can be redirected or piped.
#
# Usage:
#   bash build-css.sh > /tmp/tw.css
#   bash build-css.sh | pbcopy    # macOS clipboard
#
# The generated CSS is pasted between the <style> tags in worker.js.
set -euo pipefail
cd "$(dirname "$0")"

# Tailwind CLI can't read from process substitution (it fs.stats the path),
# so the entrypoint is a tiny on-disk file checked in alongside this script.
npx @tailwindcss/cli \
  --input tailwind-entry.css \
  --content tailwind-src.html \
  --minify
