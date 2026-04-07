# Sub-Agent Prompt Templates — Reusable prompts for research sub-agents

## Why sub-agents write to files

The main agent orchestrates 4-12 parallel sub-agents per research task (3-4 at Deep, up to 12 at Deepest). If each sub-agent dumped its full findings into a return message, the main agent's 200K context window would fill before synthesis and Claude Code's auto-compaction would summarize the raw findings away — destroying the research quality.

The fix: **sub-agents write their full findings to a file on disk and return only a short reference.** The main agent reads files just-in-time during synthesis. Disk-backed findings survive compaction; in-message findings do not.

Every template below follows this contract:
1. The main agent assigns an `[OUTPUT_FILE]` path in the prompt
2. The sub-agent writes the full structured findings to that file
3. The sub-agent returns only the path + a 5-line summary
4. The sub-agent does NOT echo findings back in its message

## Research Thread Sub-Agent

Use this template for each parallel research thread during the decomposition phase.

```
You are researching a specific aspect of [TOPIC] for a deep-research report. You write your full findings to a file on disk and return only a brief reference to the main agent.

**Thread focus:** [SPECIFIC_ANGLE]
**Output file (REQUIRED):** [OUTPUT_FILE]
**Report language:** [LANGUAGE]

## Step 1 — Research

1. Run multiple WebSearch queries on this angle. Include the current year in at least one query for freshness.
2. For each promising result, use WebFetch to extract the actual content.
3. If WebFetch returns empty or insufficient content (JS-heavy page), note the URL — do NOT try Playwright yourself; the main agent handles fallback.
4. For PDF sources: note the URL — do NOT download yourself; the main agent handles PDFs.

## Step 2 — Source labelling

Label each source by what it IS (use the exact type name):
- Meta-Analysis, Systematic Review, Journal Article, Clinical Trial
- Official Documentation, Government Report, Industry Report, Conference Paper
- News Article, Press Release, Blog Post, Forum Post
- Add qualifiers if applicable: (Preprint), (Abstract Only), (Retracted)

For German-language reports, use German type labels:
- Meta-Analyse, Systematische Übersichtsarbeit, Fachartikel, Klinische Studie
- Offizielle Dokumentation, Behördenbericht, Branchenbericht, Konferenzbeitrag
- Nachrichtenartikel, Pressemitteilung, Blogbeitrag, Forenbeitrag
- Qualifiers: (Preprint), (Nur Abstract), (Zurückgezogen)

For other languages, translate the labels accordingly.

## Step 3 — Write your findings to the output file

Use the Write tool to create [OUTPUT_FILE] with this exact structure:

~~~markdown
---
thread: [thread-NN]
focus: [SPECIFIC_ANGLE]
status: complete
findings_count: N
sources_count: M
language: [en|de|...]
---

# [Thread NN — Short title]

## Findings

### Finding 1: [headline claim in one sentence]
- **Source URL:** https://...
- **Source Type:** Journal Article
- **Date:** 2026-02-15
- **Detail:** 2-5 sentences. Include the specific number, quote, mechanism, or example that makes this finding useful for synthesis. The main agent will read this verbatim during report writing — favor concrete detail over terse summary.
- **Relevance:** One sentence on why this matters for the topic.

### Finding 2: ...
[continue for every finding]

## Sources Discovered

| # | Title | URL | Type | Date | Used in Findings |
|---|---|---|---|---|---|
| 1 | ... | https://... | Journal Article | 2026-02-15 | 1, 3 |
| 2 | ... | ... | ... | ... | 2 |

## Synthesis Notes

- **Strongest claims (multi-source):** claims supported by 2+ independent sources
- **Open questions:** things this thread surfaced but couldn't answer
- **Conflicts found:** contradictions between sources, with which sources hold which view
- **Cross-thread relevance:** topics that overlap with other likely research threads
~~~

**Quality bar:**
- Every finding must have a real URL — no fabrication
- Conflicting information: report both sides as separate findings, do not collapse
- 5 strong findings with quotes/numbers beat 15 vague restatements
- If you cannot find enough sources for this angle, write what you have and note it in Synthesis Notes

## Step 4 — Return to the main agent

After writing the file, return ONLY this short summary as your final message:

~~~
DONE.
File: [OUTPUT_FILE]
Findings: N
Sources: M
Themes: theme1, theme2, theme3
Gaps: one line on what you couldn't cover
Playwright needed: comma-separated URLs that returned empty via WebFetch | none
PDFs to download: comma-separated URLs of PDF sources | none
Blocker: none | one line
~~~

**CRITICAL — context discipline:** Do NOT echo findings back in the message. Do NOT include the file's contents. Do NOT summarize each source individually in the return message. The main agent will Read the file directly when synthesizing the report. Returning the full content defeats the purpose of writing to disk and will overflow the main agent's context window — corrupting the entire research run.
```

## Gap Analysis Sub-Agent

Use this template during the second pass (Deeper/Deepest) to find what was missed. The main agent passes the manifest summaries, NOT the full thread files — gap sub-agents need only enough context to spot what's missing.

```
You are searching for gaps in deep-research findings on [TOPIC]. You write your gap-fill findings to a file on disk and return only a brief reference.

**Existing thread manifest (one-line summaries from each completed thread):**
[MANIFEST_SUMMARIES]

**Output file (REQUIRED):** [OUTPUT_FILE]
**Report language:** [LANGUAGE]

## Your task

1. From the manifest, identify angles, subtopics, or perspectives NOT covered or only superficially covered
2. For each gap, run targeted WebSearch queries
3. Use WebFetch to extract content from promising results
4. Write all findings to [OUTPUT_FILE] using the same structure as research threads (frontmatter + Findings + Sources Discovered + Synthesis Notes)

**Look specifically for:**
- Technical details that were mentioned in the manifest but not explained
- Alternative approaches or competing solutions not covered
- Recent developments (last 6 months) that may have been missed
- Quantitative data (benchmarks, statistics, adoption rates) where only qualitative claims exist
- Geographic or industry-specific variations

## File structure

Use the same file structure as a research thread (frontmatter, Findings, Sources Discovered, Synthesis Notes). In Synthesis Notes additionally include:
- **Gap addressed:** which gap from the manifest this fills
- **Modifies existing finding:** if any thread's claim should be revised based on what you found

## Source labelling

Same descriptive type labels as research threads (Meta-Analysis, Journal Article, etc., or German equivalents for German reports).

## Return format

After writing the file, return ONLY:

~~~
DONE.
File: [OUTPUT_FILE]
Findings: N
Sources: M
Gaps addressed: brief list
Themes: theme1, theme2
Playwright needed: comma-separated URLs | none
PDFs to download: comma-separated URLs | none
Blocker: none | one line
~~~

**CRITICAL — context discipline:** Do NOT echo findings back in the message. The main agent reads the file directly during synthesis.
```

## Contrarian Search Sub-Agent (Deepest only)

Use this template to actively seek opposing viewpoints and critiques. The main agent passes a short list of mainstream claims, NOT the full thread files.

```
You are searching for opposing viewpoints and critiques on [TOPIC] for a deep-research report. You write findings to a file on disk and return only a brief reference.

**Mainstream position (key claims and consensus from research so far):**
[KEY_CLAIMS_SUMMARY]

**Output file (REQUIRED):** [OUTPUT_FILE]
**Report language:** [LANGUAGE]

## Your task

1. Search explicitly for critiques, limitations, failures, and opposing views
2. Use queries like: "[TOPIC] criticism", "[TOPIC] problems", "[TOPIC] alternatives", "why not [TOPIC]", "[TOPIC] failed", "[TOPIC] limitations"
3. Look for sources that challenge the mainstream claims listed above
4. Distinguish legitimate technical critiques from uninformed complaints
5. Write your findings to [OUTPUT_FILE]

## File structure

Use the same file structure as a research thread (frontmatter, Findings, Sources Discovered, Synthesis Notes). For EACH Finding additionally include two fields:
- **Challenges:** which mainstream claim this contests (quote it briefly)
- **Substantive?:** "yes — legitimate technical/empirical challenge" OR "no — marginal objection or uninformed take"

In Synthesis Notes, list which mainstream claims survived contrarian scrutiny and which need hedging in the final report.

## Source labelling

Same descriptive type labels as research threads.

## Return format

After writing the file, return ONLY:

~~~
DONE.
File: [OUTPUT_FILE]
Findings: N
Sources: M
Substantive challenges: count of "yes" findings
Marginal objections: count of "no" findings
Themes: theme1, theme2
Playwright needed: comma-separated URLs | none
PDFs to download: comma-separated URLs | none
Blocker: none | one line
~~~

**CRITICAL — context discipline:** Do NOT echo findings back in the message. The main agent reads the file directly during synthesis.
```

## Playwright Fallback Sub-Agent

Use when WebFetch returns empty for a URL that likely has valuable content. This is a one-off extraction with low token volume — no file write needed; the main agent merges the result into the relevant thread file itself.

```
A URL returned empty content via WebFetch, likely because it requires JavaScript rendering.

**URL:** [URL]
**Expected content:** [WHAT_WE_EXPECT_TO_FIND]

**Steps:**
1. Use browser_navigate to load the URL
2. Use browser_wait_for to ensure the page has loaded (wait for a text marker if known)
3. Use browser_snapshot to get the accessibility tree
4. If there are cookie/popup banners, identify the dismiss button in the snapshot and browser_click it, then snapshot again
5. Extract the relevant content from the snapshot
6. Use browser_close when done

**Return:** The extracted content with the source URL, or "content not accessible" if the page blocks automated access.
```
