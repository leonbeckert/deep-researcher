# Source Classification Framework

How to classify and label sources during research. Every citation in a report carries two pieces of metadata: a **source type** (what kind of source it is) and optionally a **status qualifier** (caveats about access or review state).

## Source Types

Use the descriptive label that best matches what the source actually is. The reader decides how much weight to give it — your job is to describe accurately, not to judge.

### Canonical Vocabulary

These labels cover ~95% of sources. Use them as-is for consistency across reports.

| Source Type | What it is | Examples |
|---|---|---|
| **Meta-Analysis** | Quantitative synthesis of multiple studies | Cochrane reviews, pooled-effect analyses |
| **Systematic Review** | Structured literature review with explicit methodology | Scoping reviews, PRISMA-guided reviews |
| **Journal Article** | Peer-reviewed published research | Papers in Nature, PLOS ONE, Frontiers, etc. |
| **Clinical Trial** | Registered interventional study with defined endpoints | RCTs, Phase III trials, crossover studies |
| **Official Documentation** | Authoritative technical or legal documentation | API docs, RFCs, W3C specs, regulation text |
| **Government Report** | Publication by a government or regulatory body | CDC guidelines, EU regulations, census data, BAuA studies |
| **Industry Report** | Analysis from a recognized research firm or institution | Gartner, McKinsey, Fraunhofer reports |
| **Conference Paper** | Peer-reviewed conference proceedings | NeurIPS, ACL, ICML, IEEE papers |
| **Technical Report** | Non-peer-reviewed technical document | White papers, working papers, internal reports |
| **Case Study** | Documented real-world implementation | Published case studies with methodology |
| **News Article** | Journalism from an established outlet | Reporting from NYT, Spektrum, Ars Technica |
| **Press Release** | Organization announcing research or a product | University press offices, company announcements |
| **Blog Post** | Personal or company blog | Engineering blogs, Medium posts, personal sites |
| **Forum Post** | Community discussion | Reddit, Stack Overflow, Hacker News threads |
| **Dataset** | Primary data collection or benchmark suite | Census data, benchmark results, survey datasets |
| **Book** | Published book or textbook | Monographs, edited volumes, textbook chapters |

If none of the canonical types fit, use any short descriptive label (e.g., "Patent", "Podcast Transcript", "Legal Filing"). The goal is clarity, not taxonomy compliance.

### German Labels (for German-language reports)

When the report is written in German, use German source type labels. The canonical mapping:

| English | Deutsch |
|---|---|
| Meta-Analysis | Meta-Analyse |
| Systematic Review | Systematische Übersichtsarbeit |
| Journal Article | Fachartikel |
| Clinical Trial | Klinische Studie |
| Official Documentation | Offizielle Dokumentation |
| Government Report | Behördenbericht |
| Industry Report | Branchenbericht |
| Conference Paper | Konferenzbeitrag |
| Technical Report | Technischer Bericht |
| Case Study | Fallstudie |
| News Article | Nachrichtenartikel |
| Press Release | Pressemitteilung |
| Blog Post | Blogbeitrag |
| Forum Post | Forenbeitrag |
| Dataset | Datensatz |
| Book | Buch |

Status qualifiers in German: **(Preprint)**, **(Nur Abstract)**, **(Zurückgezogen)**, **(Übersetzt)**, **(Archiviert)**.

### Choosing Between Similar Types

- A Cochrane review is a **Meta-Analysis**, not just a Systematic Review — it quantitatively pools data.
- A university press release about a study is a **Press Release**, not a Journal Article — the study itself would be the Journal Article.
- An arXiv paper is a **Journal Article (Preprint)** — add the status qualifier, not a different type.
- Official API documentation is **Official Documentation**, not a Blog Post, even if it's hosted on a blog-like platform.
- A Gartner Magic Quadrant is an **Industry Report**, not a Journal Article — it's analysis, not primary research.

## Status Qualifiers

Append in parentheses after the source type when applicable. These flag important caveats that affect how much the reader should trust the source.

| Qualifier | When to use | Example |
|---|---|---|
| **(Preprint)** | Not yet peer-reviewed — arXiv, bioRxiv, SSRN, medRxiv | Journal Article (Preprint) |
| **(Abstract Only)** | Full text was paywalled; only the abstract was read | Journal Article (Abstract Only) |
| **(Retracted)** | Paper has been retracted — include only if the retraction itself is relevant | Journal Article (Retracted) |
| **(Translated)** | Content was machine-translated from another language | Government Report (Translated) |
| **(Archived)** | Accessed via Wayback Machine or similar archive | Blog Post (Archived) |

Multiple qualifiers can combine: `Journal Article (Preprint, Translated)`.

**When NOT to use qualifiers:** If the source is a standard, accessible, peer-reviewed publication — no qualifier needed. Don't add "(Peer-Reviewed)" as a qualifier; that's the default assumption for Journal Articles.

## CRAAP Evaluation Criteria

Before citing any source, evaluate it against these five dimensions. This is an internal evaluation process — the result is your choice of source type and qualifier, not a separate label in the output.

| Criterion | Question | Red Flags |
|---|---|---|
| **Currency** | When was it published/updated? | No date, 5+ years old for fast-moving topics |
| **Relevance** | Does it directly address the research question? | Tangentially related, clickbait title |
| **Authority** | Who published it? What are their credentials? | Anonymous, no institutional backing, self-published without expertise |
| **Accuracy** | Is it supported by evidence? Can claims be verified? | No citations, contradicts established sources, emotional language |
| **Purpose** | Why does this source exist? | Selling a product, political agenda, satire, entertainment |

A source that fails multiple CRAAP criteria should either be excluded or, if included, flagged with the appropriate status qualifier and hedged in the report text.

## Hedging Rules by Source Type

Not all sources carry equal weight. Use appropriate hedging language based on source type:

| Source types | Hedging level | Example phrasing |
|---|---|---|
| Meta-Analysis, Systematic Review, Clinical Trial, Government Report | **Direct claim** | "Research shows X" / "X is Y" |
| Journal Article, Official Documentation, Conference Paper, Dataset | **Attributed claim** | "A study found X" / "According to [source], X" |
| Industry Report, Technical Report, Case Study, News Article | **Contextual** | "Industry analysis suggests X" / "[Source] reports that X" |
| Press Release, Blog Post, Forum Post | **Hedged** | "Practitioners report X" / "Anecdotal evidence suggests X" / "According to [author], X" |

When a claim is supported by sources at different hedging levels, lead with the strongest source and note corroboration: "A meta-analysis found X [source], consistent with industry reports from [source]."

## Conflicting Sources

When sources disagree:

1. **Same source type, different conclusions** — present both positions with citations. Note sample sizes, methodologies, or populations that might explain the difference. Do not pick a winner unless one study clearly supersedes the other (e.g., larger sample, more recent data).

2. **Different source types** — stronger types take precedence in framing, but still mention the disagreement. A meta-analysis overrides a single blog post, but if a widely-cited blog post contradicts a journal article, the disagreement is worth noting.

3. **Include the tension** — conflicting sources are a feature, not a bug. Flag them explicitly: "While [meta-analysis] found X, [industry report] suggests Y, possibly because..."

## Citation Format in Reports

Reports use **pandoc footnotes** for citations. Each factual claim gets a footnote reference; the footnote contains the source description, URL, type, and date.

### In the markdown source

```markdown
Claim text supported by research.[^source-id]

Another claim from the same source.[^source-id]

A different claim from a different source.[^other-source]

[^source-id]: [Source Description](https://url) — Journal Article, 2025
[^other-source]: [Other Description](https://url) — Meta-Analysis, 2024
```

**Rules:**
- Footnote IDs should be descriptive (e.g., `[^van-dongen-2003]`, `[^baua-licht-2023]`), not bare numbers.
- Reuse the same footnote ID when citing the same source multiple times — pandoc will use the same footnote number for all references.
- Footnote definitions go at the end of the document. They ARE the source list — do not add a separate numbered table.
- The footnote text format is: `[Description](url) — Source Type, Date`
- Include status qualifiers when applicable: `[Description](url) — Journal Article (Preprint), 2025`

### In the rendered output

- **PDF**: Superscript numbers in body text, full citations at page bottom with clickable URLs.
- **DOCX**: Native Word footnotes with clickable URLs.
- **Markdown viewers**: Footnotes rendered at document bottom.

### Under-sourced claims

When a claim cannot be adequately sourced, flag it:

```markdown
> **[Under-sourced]** Claim text that lacks sufficient citation.
```

Include the claim — the reader decides whether to keep it. Do not silently drop unsupported claims.
