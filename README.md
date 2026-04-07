# Deep Researcher

Quellenbasierte Recherche-Reports per KI — mit Inline-Zitaten, automatischem PDF/DOCX-Export und Quellenbewertung.

**[deep-research.leon.fm](https://deep-research.leon.fm)**

---

AI-powered research agent that produces structured reports with inline citations, source type classification, and automatic PDF/DOCX export. Works with [Claude Code](https://code.claude.com) (Desktop & CLI) and [OpenAI Codex CLI](https://github.com/openai/codex).

## Quickstart

### 1. Download

Download und entpacken:

```bash
# Option A: ZIP von GitHub
# → https://github.com/leonbeckert/deep-researcher/releases/latest/download/deep-researcher.zip

# Option B: Git Clone
git clone https://github.com/leonbeckert/deep-researcher.git
```

### 2. Ordner öffnen

**Claude Desktop:**
1. Oben auf **Code** klicken
2. **Local** wählen
3. **Select folder** → den `deep-researcher` Ordner auswählen

**Claude Code CLI:**
```bash
cd deep-researcher && claude
```

**OpenAI Codex CLI:**
```bash
cd deep-researcher && codex --full-auto
```

### 3. Abhängigkeiten installieren

Beim ersten Mal einfach sagen:

> "Installiere die Abhängigkeiten"

Der Agent führt `setup.sh` automatisch aus. Funktioniert auf macOS und Linux. Auf Windows werden die manuellen Installationsbefehle angezeigt.

**Voraussetzung:** Claude oder Codex muss Bash-Befehle ausführen dürfen. In Claude Desktop ggf. bei der ersten Abfrage bestätigen.

### 4. Recherchieren

> "Recherchiere [dein Thema]"

Oder auf Englisch:

> "Research [your topic]"

Das war's. Der Agent liefert einen Report als `.md`, `.pdf` und `.docx` in `output/[thema]/`.

## Tiefenstufen

| | Deep | Deeper | Deepest |
|---|---|---|---|
| Quellen | 10-20 | 20-40 | 40+ |
| Parallele Agents | 3-4 | 5-6 | 7-8 |
| Recherche-Durchläufe | 1 | 2 + Lückenanalyse | 3+ Lückenanalyse + Gegenrecherche |
| Reportlänge | 2.000-4.000 Wörter | 5.000-10.000 Wörter | 10.000+ Wörter |

Standard ist **Deep**. Für mehr Tiefe:

> "Recherchiere [Thema] auf Deeper-Stufe"

## Features

- **Inline-Zitate** — Jede Behauptung wird mit Quelle belegt
- **Quellenbewertung** — Quellen werden nach Typ klassifiziert (z.B. Journal Article, Meta-Analysis, Blog Post)
- **Lückenanalyse** — Ab Deeper-Stufe: automatische Identifikation von Forschungslücken
- **Gegenrecherche** — Auf Deepest-Stufe: dedizierte Suche nach Gegenargumenten
- **Automatischer Export** — PDF (via Typst) und DOCX (via Pandoc) werden automatisch erstellt
- **Mehrsprachig** — Reports auf Deutsch oder Englisch

## Systemvoraussetzungen

- macOS, Linux oder Windows (mit WSL)
- [Claude Desktop](https://claude.ai/download), [Claude Code CLI](https://code.claude.com) oder [OpenAI Codex CLI](https://github.com/openai/codex)
- Bezahlter Claude- oder ChatGPT-Plan

Dependencies (werden von `setup.sh` installiert):
- pandoc, typst, poppler, tesseract, Node.js, Playwright

## Lizenz

[Deep Researcher License v1.0](LICENSE) — Nutzung frei, Attribution in generierten Reports ist Pflicht.

---

Erstellt von [Leon Beckert](https://leon.fm) | [deep-research.leon.fm](https://deep-research.leon.fm)
