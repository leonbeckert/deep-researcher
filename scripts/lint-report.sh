#!/usr/bin/env bash
# lint-report.sh — Validates a deep-researcher report against quality gates.
# Called automatically via PostToolUse hook on Write to output/*/*.md.
# Also runnable manually: ./scripts/lint-report.sh "output/topic-slug/Title — Date.md"
#
# Exit 0 = pass, exit 1 = issues found (prints warnings to stderr).

set -euo pipefail

FILE="${1:?Usage: lint-report.sh <path-to-report.md>}"

if [[ ! -f "$FILE" ]]; then
  echo "LINT ERROR: File not found: $FILE" >&2
  exit 1
fi

ERRORS=0
WARNINGS=0

# --- 1. File extension ---
BASENAME=$(basename "$FILE")
if [[ "$BASENAME" != *.md ]]; then
  echo "LINT ERROR: Report must be a .md file, got '$BASENAME'" >&2
  ((ERRORS++))
fi

# --- 2. YAML frontmatter ---
if ! head -1 "$FILE" | grep -q '^---$'; then
  echo "LINT ERROR: Missing YAML frontmatter (file must start with ---)" >&2
  ((ERRORS++))
else
  # Check required fields
  # Extract frontmatter (between first and second ---)
  FRONTMATTER=$(awk '/^---$/{n++; next} n==1{print} n==2{exit}' "$FILE")

  for FIELD in title author depth sources date; do
    if ! echo "$FRONTMATTER" | grep -q "^${FIELD}:"; then
      echo "LINT ERROR: Missing frontmatter field: $FIELD" >&2
      ((ERRORS++))
    fi
  done

  # Check depth is valid
  DEPTH=$(echo "$FRONTMATTER" | grep '^depth:' | sed 's/depth: *//' | tr -d '"' | tr -d "'")
  if [[ -n "$DEPTH" ]] && [[ "$DEPTH" != "Deep" && "$DEPTH" != "Deeper" && "$DEPTH" != "Deepest" ]]; then
    echo "LINT ERROR: Invalid depth tier: '$DEPTH' (must be Deep, Deeper, or Deepest)" >&2
    ((ERRORS++))
  fi

  # Check source count meets tier minimum
  SOURCE_COUNT=$(echo "$FRONTMATTER" | grep '^sources:' | sed 's/sources: *//' | tr -d '"' | tr -d "'")
  if [[ -n "$DEPTH" && -n "$SOURCE_COUNT" ]]; then
    case "$DEPTH" in
      Deep)
        if (( SOURCE_COUNT < 10 )); then
          echo "LINT WARNING: Source count ($SOURCE_COUNT) below Deep tier minimum (10)" >&2
          ((WARNINGS++))
        fi
        ;;
      Deeper)
        if (( SOURCE_COUNT < 20 )); then
          echo "LINT WARNING: Source count ($SOURCE_COUNT) below Deeper tier minimum (20)" >&2
          ((WARNINGS++))
        fi
        ;;
      Deepest)
        if (( SOURCE_COUNT < 40 )); then
          echo "LINT WARNING: Source count ($SOURCE_COUNT) below Deepest tier minimum (40)" >&2
          ((WARNINGS++))
        fi
        ;;
    esac
  fi
fi

# --- 3. Source type annotations ---
# Check that footnote definitions contain source type labels (English or German)
# English: Journal Article, Meta-Analysis, Blog Post, etc.
# German: Fachartikel, Meta-Analyse, Blogbeitrag, etc.
TYPE_ANNOTATIONS=$(grep -cE '(Journal Article|Meta-Analysis|Systematic Review|Clinical Trial|Official Documentation|Government Report|Industry Report|Conference Paper|Technical Report|Case Study|News Article|Press Release|Blog Post|Forum Post|Dataset|Book|Fachartikel|Meta-Analyse|Systematische Übersichtsarbeit|Klinische Studie|Offizielle Dokumentation|Behördenbericht|Branchenbericht|Konferenzbeitrag|Technischer Bericht|Fallstudie|Nachrichtenartikel|Pressemitteilung|Blogbeitrag|Forenbeitrag|Datensatz|Buch)' "$FILE" 2>/dev/null || echo 0)
if (( TYPE_ANNOTATIONS < 3 )); then
  echo "LINT WARNING: Few source type annotations found ($TYPE_ANNOTATIONS). Footnote citations should include a source type (e.g., Journal Article / Fachartikel, Meta-Analysis / Meta-Analyse)." >&2
  ((WARNINGS++))
fi

# --- 4. Citations ---
# Count footnote references [^...] in the body text
FOOTNOTE_REFS=$(grep -oE '\[\^[^]]+\]' "$FILE" 2>/dev/null | wc -l | tr -d ' ')
# Also count inline links [text](url) for backward compatibility
INLINE_LINKS=$(grep -oE '\[[^]]+\]\(https?://[^)]+\)' "$FILE" 2>/dev/null | wc -l | tr -d ' ')
CITATION_COUNT=$((FOOTNOTE_REFS > INLINE_LINKS ? FOOTNOTE_REFS : INLINE_LINKS))
if (( CITATION_COUNT < 5 )); then
  echo "LINT WARNING: Very few citations found ($CITATION_COUNT). Every factual claim needs a source." >&2
  ((WARNINGS++))
fi

# --- 5. Under-sourced flags ---
# Not an error if absent, but check the pattern is correct when present
if grep -q '\[Under-sourced\]' "$FILE" && ! grep -qE '>\s*\*\*\[Under-sourced\]\*\*' "$FILE"; then
  echo "LINT WARNING: Under-sourced flags found but not in correct format. Use: > **[Under-sourced]** claim text" >&2
  ((WARNINGS++))
fi

# --- 6. Export filename consistency ---
# If exports exist, verify they match the source filename
DIR=$(dirname "$FILE")
BASE=$(basename "$FILE" .md)
for EXT in pdf docx; do
  # Check if any export of this type exists in the directory
  EXPORT_COUNT=$(find "$DIR" -maxdepth 1 -name "*.${EXT}" 2>/dev/null | wc -l | tr -d ' ')
  if (( EXPORT_COUNT > 0 )); then
    # Exports exist — check they match the source filename
    if [[ ! -f "${DIR}/${BASE}.${EXT}" ]]; then
      ACTUAL=$(find "$DIR" -maxdepth 1 -name "*.${EXT}" -exec basename {} \;)
      echo "LINT ERROR: Export filename mismatch — expected '${BASE}.${EXT}' but found '${ACTUAL}'" >&2
      ((ERRORS++))
    fi
  fi
done

# --- 7. Footnote definitions ---
# Check that footnote definitions exist (these serve as the source list)
FOOTNOTE_DEFS=$(grep -cE '^\[\^[^]]+\]:' "$FILE" 2>/dev/null || echo 0)
if (( FOOTNOTE_DEFS < 3 )); then
  echo "LINT WARNING: Few footnote definitions found ($FOOTNOTE_DEFS). Footnote definitions at the end of the report serve as the source list." >&2
  ((WARNINGS++))
fi

# --- 8. Attribution watermark (LICENSE REQUIREMENT) ---
if ! grep -q 'deep-research\.leon\.fm' "$FILE"; then
  echo "LINT ERROR: Missing attribution watermark (required by LICENSE). Every report must end with the Deep Researcher attribution line." >&2
  ((ERRORS++))
fi

# --- Summary ---
if (( ERRORS > 0 )); then
  echo "LINT FAILED: $ERRORS error(s), $WARNINGS warning(s)" >&2
  exit 1
elif (( WARNINGS > 0 )); then
  echo "LINT PASSED with $WARNINGS warning(s)" >&2
  exit 0
else
  echo "LINT PASSED: All checks passed." >&2
  exit 0
fi
