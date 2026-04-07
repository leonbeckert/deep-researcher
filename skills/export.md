# Export

Converts a .md research report to .pdf (light and dark variants) and .docx using pandoc.

## Input

From the user:
- **File path:** Path to the .md file to convert (optional — defaults to the most recently created .md in `output/`)

From project files (do NOT ask):
- `templates/reference.docx` — DOCX reference document for styling

## When to Clarify

- Never. Export is fully automated. If dependencies are missing, run setup.sh and retry.

## Process

1. **Identify the source file.** If not specified, find the most recent .md in `output/*/`.

2. **Determine output paths.** Replace the `.md` extension with `.pdf`, `(Dark).pdf`, and `.docx`, keeping the **exact same base filename** in the **same directory**. Example: `output/topic/WebAssembly Performance in 2026 — 2026-03-11.md` → same base name with `.pdf`, `(Dark).pdf`, and `.docx`. The dark PDF inserts ` (Dark)` before the extension. Never invent a different filename — always derive from the source file. Remember to quote paths with spaces.

3. **Convert to PDF:**
   ```bash
   pandoc [input.md] -o [output.pdf] \
     --pdf-engine=typst \
     --include-in-header=templates/pdf-header.typ \
     --toc \
     --toc-depth=2
   ```
   The header template makes external links blue + underlined and renders footnote citations at page bottom with clickable URLs.

4. **Convert to dark PDF:**
   ```bash
   pandoc [input.md] -o "[base] (Dark).pdf" \
     --pdf-engine=typst \
     --include-in-header=templates/pdf-header-dark.typ \
     --toc \
     --toc-depth=2
   ```
   Uses the dark Typst template: light text on dark background with adjusted link colors and visible table borders.

5. **Convert to DOCX:**
   ```bash
   pandoc [input.md] -o [output.docx] \
     --reference-doc=templates/reference.docx \
     --toc \
     --toc-depth=3 \
     --highlight-style=kate
   ```

6. **Fix DOCX TOC page numbers:**
   ```bash
   python3 scripts/fix-docx-toc.py [output.docx]
   ```
   Runs LibreOffice headless to compute correct TOC page numbers. This is mandatory — pandoc cannot compute page numbers, so without this step the TOC is broken. If the script warns that LibreOffice is missing, run `bash setup.sh`.

7. **Validate outputs.** Check that all files exist and are non-empty:
   ```bash
   ls -la [output.pdf] "[output (Dark).pdf]" [output.docx]
   ```

8. **Report to user.** List the four output files (.md, .pdf, dark .pdf, .docx) with their paths and sizes.

## Troubleshooting

| Error | Fix |
|---|---|
| `pandoc: command not found` | Run `bash setup.sh` |
| `typst: command not found` | Run `brew install typst` |
| PDF has broken tables | Check markdown table syntax — pipes must align. For long tables, ensure `templates/pdf-header.typ` is included (makes tables page-breakable) |
| PDF has no syntax highlighting | Typst handles this automatically, check code fence language tags |
| DOCX TOC shows wrong page numbers | LibreOffice is missing. Run `bash setup.sh` to install, then re-run `python3 scripts/fix-docx-toc.py [file.docx]` |
| Word prompts "update fields?" on DOCX open | The DOCX was exported without LibreOffice. Re-run `python3 scripts/fix-docx-toc.py [file.docx]` with LibreOffice installed |
| Unicode chars missing in PDF | Typst uses system fonts natively, should work. If not, check font availability |
| YAML frontmatter appears in output | Ensure frontmatter is delimited by `---` on its own lines |
| Dark PDF has wrong colors or white bg | Check that `--include-in-header=templates/pdf-header-dark.typ` is used (not `pdf-header.typ`). The dark template must set `page(fill: luma(30))` |

## Rules

- Always convert to all formats (PDF, dark PDF, DOCX) — never skip one
- Never modify the source .md during export
- If conversion fails, report the error and the pandoc command that failed so the user can debug
- The attribution watermark at the end of the .md file MUST be preserved in both PDF and DOCX outputs. Pandoc passes markdown content through to both formats, so no special handling is needed — just verify the attribution is present in the source .md before converting
