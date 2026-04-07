# Research

Orchestrates the full research pipeline: decompose topic into threads, spawn parallel sub-agents, synthesize findings, and export.

## Input

From the user:
- **Topic:** What to research (required)
- **Depth tier:** Deep, Deeper, or Deepest (optional — defaults to Deep)
- **Language:** en or de (optional — defaults to en)

From project files (do NOT ask):
- `docs/sub-agent-prompts.md` — sub-agent prompt templates
- `docs/credibility-framework.md` — source evaluation criteria

## When to Clarify

- If the topic has multiple distinct meanings (e.g., "research Mercury" — planet, element, or car brand), ask with options
- If the topic is a single word with no obvious interpretation, ask for a brief description
- Never ask about report structure, citation format, or output format — these are fixed

## Process

### Phase 1: Decomposition

Analyze the topic and split it into independent research threads. The number of threads should match the sub-agent count for the depth tier:
- Deep: 3-4 threads
- Deeper: 5-6 threads
- Deepest: 7-8 threads

Good decomposition means threads are independent and collectively exhaustive. Example for "WebAssembly performance":
1. Core architecture and how WASM execution works
2. Benchmarks and performance comparisons vs native/JS
3. Real-world adoption and production use cases
4. Toolchain and developer experience
5. Limitations and known performance pitfalls (Deeper+)
6. Future roadmap and upcoming features (Deeper+)

### Phase 2: Parallel Research (file-based handoff)

**Why file-based:** At Deepest tier you launch up to 12 sub-agents across Phases 2/3/4. If each one returned its findings as a chat message, the main agent's 200K context would fill before synthesis and Claude Code's auto-compaction would summarize the raw findings away. Sub-agents MUST write their findings to disk and return only a short reference. See `docs/sub-agent-prompts.md` → "Why sub-agents write to files" for the rationale.

**Step 2.1 — Pre-create the research-notes directory:**
```bash
mkdir -p output/[topic-slug]/research-notes
```

**Step 2.2 — Pre-allocate one output file path per thread.** Use a stable naming scheme so the main agent and sub-agents agree on paths:
- `output/[topic-slug]/research-notes/thread-01-[short-slug].md`
- `output/[topic-slug]/research-notes/thread-02-[short-slug].md`
- ... one per thread

The `[short-slug]` is a 1-3 word kebab-case label derived from the thread focus (e.g. `architecture`, `benchmarks`, `production-use`).

**Step 2.3 — Launch sub-agents.** For each thread, use the Agent tool with the Research Thread template from `docs/sub-agent-prompts.md`. Fill in:
- `[TOPIC]` — the overall research topic
- `[SPECIFIC_ANGLE]` — this thread's focus
- `[OUTPUT_FILE]` — the pre-allocated path from Step 2.2 (full path, not relative)
- `[LANGUAGE]` — `en`, `de`, or other ISO code; defaults to `en`

Use `subagent_type: "general-purpose"`. Sub-agents must have Write tool access to create thread files; `general-purpose` provides this.

Set `run_in_background: true` for all sub-agents.

**Language adaptation:** If the user requested non-English output, the sub-agent prompt's `[LANGUAGE]` field handles this. Sub-agents will search in both the target language and English when appropriate, and write findings in the target language. The synthesis in Phase 5 is then written in that language.

**Step 2.4 — Wait for all sub-agents to complete.** Each should return the short DONE summary (path + counts + themes + flagged URLs). If any sub-agent dumps full findings into the message instead of returning the short summary, that is a contract violation — note it but proceed; the file on disk is still authoritative.

**Step 2.5 — Confirm files exist:**
```bash
ls -la output/[topic-slug]/research-notes/
```
Every pre-allocated thread file must be present and non-empty. If a sub-agent failed to write its file, re-launch that single thread.

**Playwright fallback:** Sub-agents flag URLs that returned empty via WebFetch in their `Playwright needed:` line. The main agent handles fallback directly using Playwright MCP (`browser_navigate` → `browser_wait_for` → `browser_snapshot` → `browser_close`). Append the extracted content as a new Finding in the relevant thread file using the Edit tool — do not create a new file for one-off Playwright extractions.

**PDF handling:** Sub-agents flag PDF URLs in their `PDFs to download:` line. The main agent handles all PDFs:
1. Download with `curl -sL -o output/[topic-slug]/downloads/[filename].pdf [url]` (create the `downloads/` directory first)
2. Read with Read tool if ≤100 pages
3. Use `pdftotext output/[topic-slug]/downloads/[filename].pdf output/[topic-slug]/downloads/[filename].txt` for larger files
4. Append findings as new entries in the relevant thread file using Edit, OR write a dedicated `pdf-NN-[slug].md` file in `research-notes/` for PDFs that span multiple threads

### Phase 2.5: Build the Manifest

After all Phase 2 sub-agents have completed and files are confirmed on disk, write `output/[topic-slug]/research-notes/manifest.md`. This is the **compaction-proof index** that the main agent uses for the rest of the run — it survives any context compaction because it lives on disk.

Format:
```markdown
---
topic: [Topic Title]
language: [en|de|...]
depth: [Deep|Deeper|Deepest]
phase: 2-complete
created: [YYYY-MM-DDTHH:MMZ]
---

# Research Manifest — [Topic Title]

## Threads (Phase 2)

| Thread | File | Focus | Findings | Sources | Themes |
|---|---|---|---|---|---|
| 01 | research-notes/thread-01-architecture.md | Core architecture and execution model | 7 | 9 | stack VM, validation, linear memory |
| 02 | research-notes/thread-02-benchmarks.md | Performance benchmarks vs native/JS | 6 | 8 | SIMD, cold-start, JIT comparison |
| ... | ... | ... | ... | ... | ... |

## Flagged for follow-up (from sub-agent return summaries)

- **Playwright needed:** [list any URLs flagged across threads, with which thread flagged them]
- **PDFs to download:** [list any URLs flagged]
- **Gaps noticed by sub-agents:** [collected from each return summary]
- **Sub-agent blockers:** [any errors or content access issues]

## Phase 3 plan (Deeper/Deepest only)

[After running gap analysis, append a "Threads (Phase 3 — Gap Analysis)" section with the same columns]

## Phase 4 plan (Deepest only)

[After running contrarian search, append a "Threads (Phase 4 — Contrarian)" section]
```

Build the manifest from the sub-agent return summaries you already have in your context — you do NOT need to read every thread file at this point. The manifest is built from cheap pointers.

After writing the manifest, you may immediately drop the per-sub-agent return messages from active focus — everything you need is now on disk in `manifest.md` and the thread files.

### Phase 3: Gap Analysis (Deeper and Deepest only)

**Read `manifest.md` first** if any time has passed or context has compacted since Phase 2.5. The manifest is your authoritative index.

Identify gaps using ONLY the manifest's themes/gaps columns and the sub-agent return summaries — do NOT batch-read all thread files at this point. If you genuinely need to inspect one or two thread files to formulate good gap prompts, read them individually, but keep it minimal.

Identify:
- Angles not covered or only superficially covered
- Claims made without sufficient source diversity
- Questions raised by the research but not answered

**Pre-allocate gap output files:**
- `output/[topic-slug]/research-notes/gap-01-[short-slug].md`
- `output/[topic-slug]/research-notes/gap-02-[short-slug].md`
- ...

**Launch 2-3 gap sub-agents** using the Gap Analysis template from `docs/sub-agent-prompts.md`. Pass:
- `[TOPIC]`, `[OUTPUT_FILE]`, `[LANGUAGE]` as in Phase 2
- `[MANIFEST_SUMMARIES]` — paste the manifest's Threads table (the one-line themes per thread). Do NOT paste full thread files into the gap prompt — that defeats the file-based handoff.

Use `subagent_type: "general-purpose"` and `run_in_background: true`.

After all gap sub-agents return, append their entries to `manifest.md` under a new "Threads (Phase 3 — Gap Analysis)" section. Confirm files on disk with `ls`.

### Phase 4: Contrarian Search (Deepest only)

**Read `manifest.md` first** if context has compacted.

Build a short "key claims summary" — 5-10 bullet points of the strongest mainstream claims from Phases 2 and 3. Derive these from manifest themes plus minimal targeted reads of 1-3 thread files if needed. Do NOT batch-read everything.

**Pre-allocate contrarian output file:**
- `output/[topic-slug]/research-notes/contrarian-01.md`

**Launch the contrarian sub-agent** using the Contrarian template from `docs/sub-agent-prompts.md`. Pass:
- `[TOPIC]`, `[OUTPUT_FILE]`, `[LANGUAGE]`
- `[KEY_CLAIMS_SUMMARY]` — your 5-10 bullets

Use `subagent_type: "general-purpose"` and `run_in_background: true`.

After it returns, append its entry to `manifest.md` under a new "Threads (Phase 4 — Contrarian)" section.

### Phase 5: Synthesis

Weave all findings into a structured .md report.

**Critical context discipline for synthesis** — read this before starting:

- Findings live in `output/[topic-slug]/research-notes/*.md`, NOT in your conversation history. Even if you remember some findings from sub-agent return summaries, those summaries were intentionally lossy. The thread files are authoritative.
- **Reading budget — do not batch-read.** Do not read all thread files at once before starting to write. That would just shift the same overflow into Read tool results. Instead, follow this loop for each report section:
  1. Identify which 2-3 thread files contain the findings for the current section (use `manifest.md` as the index)
  2. Read those 2-3 files
  3. Draft that section with full citations
  4. Move on to the next section — earlier files can drop from your active focus
- **The manifest is your map.** Always read `output/[topic-slug]/research-notes/manifest.md` first at the start of synthesis. Use its Themes column to plan which threads feed which sections of your report.
- If context compaction happens mid-synthesis: re-read the manifest, identify which sections are still unwritten, and continue. The files on disk are durable.

**Synthesis steps:**

1. **Confirm output directory exists:** `mkdir -p output/[topic-slug]`
2. **Read `output/[topic-slug]/research-notes/manifest.md`** to refresh your view of available threads.
3. **Plan the report structure adaptively.** Based on the topic, manifest themes, and intended audience, choose a structure that makes sense. There is no rigid template — but most reports benefit from:
   - A summary section at the top (key takeaways)
   - Logical sections organized by theme or question
   - A section on limitations, gaps, or open questions (use sub-agent "Synthesis Notes" → Open questions and Gaps)
   - At Deepest tier: a contrarian/critique section drawing from `contrarian-01.md`
   - Footnote definitions at the bottom (these ARE the source list — do not add a separate numbered table)
4. **Map sections → thread files.** Write a brief internal mapping (you do not need to save it) like:
   - Section "How WASM Execution Works" → thread-01-architecture.md, thread-04-toolchain.md
   - Section "Performance Benchmarks" → thread-02-benchmarks.md, gap-01-cold-start.md
   - Section "Limitations and Critiques" → thread-05-pitfalls.md, contrarian-01.md
5. **Write section by section.** For each section:
   - Read the 2-3 mapped thread files (use the Read tool — full file)
   - Draft the section using inline citations directly from those files' Findings entries
   - Move to the next section
6. **Write with footnote citations.** Every factual claim gets a pandoc footnote: `claim text[^source-id]`. Footnote definitions go at the end: `[^source-id]: [Description](url) — Source Type, Date`. Use descriptive IDs (e.g., `[^van-dongen-2003]`). Reuse the same ID when citing the same source again. Group inference statements clearly: "Based on [source A] and [source B], it appears that..." with both footnotes after the claim.
7. **Flag under-sourced claims:** `> **[Under-sourced]** claim text`
8. **Include code snippets** when they illustrate a point relevant to the topic
9. **Add metadata** at the top of the report:
   ```
   ---
   title: [Topic Title — in report language]
   author: Deep Researcher (deep-research.leon.fm)
   depth: [Deep/Deeper/Deepest]
   sources: [count]
   date: [YYYY-MM-DD]
   ---
   ```
   Pandoc embeds `title`, `author`, and `date` as document metadata in both PDF and DOCX — attribution is baked into every exported file by design.
10. **Derive the filename** from the YAML frontmatter: `{title} — {date}.md`. Strip characters unsafe for filenames (`: / \ * ? " < > |`). Example: title "WebAssembly Performance in 2026", date "2026-03-11" → `WebAssembly Performance in 2026 — 2026-03-11.md`. All three output files (.md, .pdf, .docx) share the same base name.

### Phase 5.5: Lint & Verify

Before export, run the report through two checks:

1. **Lint** (automatic — runs via hook on Write to `output/*/*.md`). The lint script checks:
   - YAML frontmatter is present with `title`, `author`, `depth`, `sources`, `date`
   - Source count meets tier minimum
   - No uncited factual claims (heuristic: paragraphs with statistics/dates but no inline URL)

   If the hook flags issues, fix them before proceeding.

2. **Verify** (automatic for Deep, expanded for Deeper/Deepest). Run the verify skill:
   - Deep: spot-check top 5 claims
   - Deeper: all citations from Meta-Analyses, Systematic Reviews, Journal Articles, and Clinical Trials
   - Deepest: verify all citations

### Phase 6: Export

Run the export skill to convert the .md to .pdf (light and dark variants) and .docx. **This phase is mandatory unless the user explicitly requested specific formats only (e.g., "just markdown").** Do not silently skip export. If export fails, report the error — do not proceed without it.

## Source Count Validation

Before finishing synthesis, count unique source URLs. If below the tier minimum:
- Deep: minimum 10 → if under, note in the report footer: "Note: This report includes [N] unique sources, below the target of 10-20 for Deep-tier research."
- Deeper: minimum 20 → run one more targeted search pass. If still under after the extra pass, note the shortfall in the report footer.
- Deepest: minimum 40 → run additional passes until sources are exhausted or minimum is met. If still under, note the shortfall and explain what was attempted.

## Good Example (abbreviated)

```markdown
---
title: WebAssembly Performance in 2026
author: Deep Researcher (deep-research.leon.fm)
depth: Deep
sources: 14
date: 2026-03-11
---

# WebAssembly Performance in 2026

## Key Takeaways

- WASM execution is within 10-20% of native performance for compute-heavy tasks[^nicholson-bench-2026]
- Garbage collection support landed in all major browsers, enabling languages like Java and C# to compile efficiently[^wasm-roadmap]
- The primary bottleneck remains DOM interop overhead, not raw computation[^nicholson-dom-2026]

## How WASM Execution Works

WebAssembly uses a stack-based virtual machine with near-native execution speed[^wasm-spec] because...

> **[Under-sourced]** Some reports suggest WASM cold-start times have improved by 3x since 2024, but no systematic benchmark data was found to confirm this.

[^nicholson-bench-2026]: [Nicholson — WASM Benchmark Suite 2026](https://example.com/benchmark-2026) — Journal Article, 2026
[^wasm-roadmap]: [WebAssembly Roadmap](https://webassembly.org/roadmap/) — Official Documentation, 2026
[^nicholson-dom-2026]: [Nicholson — DOM Interop Analysis](https://example.com/dom-analysis) — Conference Paper, 2026
[^wasm-spec]: [WebAssembly Spec — Semantics](https://webassembly.org/docs/semantics/) — Official Documentation, 2026
```

## Bad Example

```markdown
# WebAssembly Performance

WebAssembly is very fast and efficient. It's used by many companies for high-performance web applications. Studies show it can be up to 20x faster than JavaScript in some cases.

The technology was created by the W3C and is supported by all major browsers.
```

**What's wrong:** No citations anywhere. "Studies show" without a source is a hallucinated citation. "20x faster" is an unsourced claim. "Very fast and efficient" is vague. No metadata, no footnotes, no source list.

## Rules

- **Never skip Phase 6 (export)** unless the user explicitly requested only specific formats. The default expectation is .md + .pdf + .docx.
- **Every report MUST have YAML frontmatter** with `title`, `author`, `depth`, `sources`, `date`. This is not optional — pandoc uses `title`, `author`, and `date` for document metadata, and the lint hook checks for all fields.
- **The filename is derived from YAML frontmatter**: `{title} — {date}.md` in `output/[topic-slug]/`. Sub-agent thread files live in `output/[topic-slug]/research-notes/`.
- **Use the footnote citation format**: `claim text[^source-id]` with definitions at document end: `[^source-id]: [Description](url) — Source Type, Date`. The lint hook checks for source type annotations.
- When in doubt about a claim, flag it under-sourced rather than dropping it
- Sub-agent prompts must include the full context — sub-agents do not see your conversation history
- Always create the output directory before writing files
- **Sub-agents write findings to disk, not chat.** Always pre-allocate `[OUTPUT_FILE]` paths and pass them in every sub-agent prompt. Never ask a sub-agent to "return findings as a message" — that violates the file-based handoff contract and corrupts the research run by overflowing context. See `docs/sub-agent-prompts.md` for the rationale.
- **Use `subagent_type: "general-purpose"` for all research/gap/contrarian sub-agents.** Sub-agents need Write tool access to create thread files.
- **Always build `manifest.md` after Phase 2** and append to it after Phases 3 and 4. The manifest is the compaction-proof index — synthesis depends on it.
- **Read thread files just-in-time during Phase 5 synthesis.** Never batch-read all thread files at once. Read 2-3 per section, write the section, move on.
- **Every report MUST end with the attribution watermark** as defined in CLAUDE.md (Attribution section). This is a LICENSE requirement enforced by hooks — the lint script and stop hook will block completion without it. For German reports use the German attribution, for English reports use the English attribution.
