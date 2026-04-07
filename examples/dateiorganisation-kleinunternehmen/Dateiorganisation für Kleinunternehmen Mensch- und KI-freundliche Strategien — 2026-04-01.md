---
title: "Dateiorganisation für Kleinunternehmen: Mensch- und KI-freundliche Strategien"
depth: Deep
sources: 20
date: 2026-04-01
author: Deep Researcher (deep-research.leon.fm)
---

# Dateiorganisation für Kleinunternehmen: Mensch- und KI-freundliche Strategien

## Kernaussagen

- **Maximal 3 Ordnerebenen, maximal 7 Ordner pro Ebene.** Das 7-Ordner-System[^buero-kaizen-ordner] ist der pragmatischste Ansatz für deutsche Kleinunternehmen — psychologisch fundiert, KI-kompatibel und GoBD-tauglich. Johnny.Decimal bietet mehr Struktur, PARA ist für Wissensmanagement gedacht, nicht für Unternehmensdokumente.
- **GoBD-Compliance ist Pflicht, nicht Kür.** Seit dem BEG IV 2025[^haufe-fristen] gelten verkürzte Aufbewahrungsfristen (Buchungsbelege 8 statt 10 Jahre), aber die E-Rechnungspflicht[^bmf-erechnung] ab 2025 (Empfang) und 2028 (Versand) erfordert neue digitale Infrastruktur — auch für Kleinunternehmer.
- **Markdown mit YAML-Frontmatter ist das KI-optimale Format.** Cloudflare zeigt: Markdown verbraucht 80 % weniger Tokens als HTML[^cloudflare-markdown]. YAML-Frontmatter ermöglicht 30–40 % höhere Extraktionsgenauigkeit[^trysteakhouse-frontmatter] gegenüber Fließtext.
- **AGENTS.md ist der neue Standard.** Von der Linux Foundation verwaltet[^linuxfoundation-agentic] und in über 60.000 Projekten genutzt, gibt eine einzelne Markdown-Datei allen gängigen KI-Agenten Projektkontext.
- **Paperless-ngx + sevDesk ist ein starkes Duo für technikaffine Gründer.** Paperless-ngx übernimmt OCR und Dokumentenarchivierung, sevDesk die Buchhaltung mit DATEV-Export[^datev-schnittstellen]. Eine Open-Source-Bridge[^github-paperless-sevdesk] verbindet beide automatisch.

## 1. Ordnungssysteme im Vergleich

Drei etablierte Systeme konkurrieren um die Organisation von Geschäftsdateien. Keines ist perfekt — die Wahl hängt von Unternehmensgröße, Branche und der Rolle von KI-Agenten ab.

### 1.1 Das 7-Ordner-System (Empfehlung für deutsche KMU)

Das im deutschsprachigen Raum verbreitete Framework basiert auf der Millerschen Zahl[^sekretaria-7ordner] — das menschliche Arbeitsgedächtnis verarbeitet 7 ± 2 Elemente gleichzeitig. Daraus ergeben sich drei Regeln: maximal 7 Ordner pro Ebene, maximal 3 Ebenen tief, jedes Dokument in 3 Klicks erreichbar.

Die empfohlene Nummerierung (`01-Finanzen`, `02-Kunden`, ...) erzwingt deterministische Sortierung — ein Vorteil, der auch KI-Agenten zugute kommt, da alphabetische Sortierung betriebssystemübergreifend identisch ausfällt.

**Grenzen:** Bei vielen gleichzeitigen Projekten stößt die 7er-Begrenzung an Grenzen[^pixx-ordnerstruktur], und die Masse der Information liegt „wie bei einem Eisberg" in den unteren Ebenen verborgen. Typische Implementierungsfehler sind laut orgaMAX[^orgamax-ordnerstruktur]: inkonsistente Dateinamen, redundante Dokumente und ein Ordner „Sonstiges", der zum Entropie-Sammelbecken wird.

### 1.2 Johnny.Decimal

Johnny.Decimal[^johnnydecimal-sbs] teilt alles in maximal 10 Bereiche mit je 10 Kategorien, adressiert über das Format `XX.XX`. Das kaufbare Small Business System[^johnnydecimal-sbs] liefert 21 Kategorien und 300+ vordefinierte IDs für $330.

**KI-Kompatibilität:** Exzellent — das feste Muster `\d{2}\.\d{2}` ist trivial per Regex erkennbar. Agenten können Referenzen hardcoden, da Nummern stabil bleiben.

**Nachteile:** Neue Projekte lassen sich schwer integrieren[^luegering-johnnydecimal], da die Nummernstruktur beim Setup festgelegt wird. Archivierung ist umständlich, und die Nummern bieten außerhalb des Systems keinen Kontext — für den Austausch mit Steuerberatern oder externen Partnern problematisch.

### 1.3 PARA (Projects, Areas, Resources, Archives)

Tiago Fortes PARA-Methode[^clickup-para] sortiert nach Aktionalität statt Thema: Projects haben Deadlines, Areas sind laufende Verantwortungsbereiche, Resources Referenzmaterial, Archives inaktive Elemente. Die Methode ist toolagnostisch und funktioniert in jedem Dateisystem.

**Kritik:** PARA wurde für persönliches Wissensmanagement konzipiert, nicht für Unternehmensdokumentation[^lucaf-decimal]. Die Grenzen zwischen Kategorien sind in der Praxis unklar[^mattgiaro-para] — besonders Projects vs. Areas. Ein deutscher Produktivitätsberater[^tmt-para-gtd] bewertet den Verwaltungsaufwand als unverhältnismäßig und empfiehlt eine vereinfachte Variante.

### 1.4 Vergleichsmatrix

| Kriterium | 7-Ordner-System | Johnny.Decimal | PARA |
|---|---|---|---|
| Lernkurve | Niedrig | Mittel | Mittel |
| KI-Kompatibilität | Gut (nummeriert) | Sehr gut (Regex-fähig) | Mäßig (dynamisch) |
| GoBD-Eignung | Gut | Gut | Schwach |
| Flexibilität | Mittel | Niedrig | Hoch |
| Kosten | Kostenlos | $330 (SBS) | Kostenlos |
| Deutsche KMU-Praxis | Weit verbreitet | Nische | Kaum verbreitet |

**Fazit:** Für die meisten deutschen Kleinunternehmen ist das 7-Ordner-System mit numerischen Präfixen der beste Kompromiss. KI-Agenten bevorzugen hierarchische, filesystem-ähnliche Strukturen[^dust-filesystem] mit maximal 3–4 Ebenen Tiefe — genau das, was das 7-Ordner-System liefert.

## 2. GoBD-Compliance & Aufbewahrungspflichten

### 2.1 Neue Fristen seit BEG IV 2025

Das Vierte Bürokratieentlastungsgesetz (BEG IV)[^haufe-fristen], in Kraft seit 01.01.2025, verkürzt die Aufbewahrungsfrist für Buchungsbelege von 10 auf 8 Jahre[^ecovis-fristen]. Die drei Fristenstufen im Überblick:

| Frist | Dokumenttypen |
|---|---|
| **10 Jahre** | Handelsbücher, Inventare, Jahresabschlüsse, Eröffnungsbilanzen, Verfahrensdokumentation |
| **8 Jahre** | Rechnungen, Kontoauszüge, Quittungen, Lohnlisten, Lieferscheine |
| **6 Jahre** | Geschäftskorrespondenz ohne Belegfunktion |

**Wichtige Einschränkung:** Die 8-Jahres-Frist gilt nur für Rechnungen nach § 14b Abs. 1 UStG[^farbe-fristen]. Aufzeichnungen nach § 22 Abs. 1 UStG bleiben 10 Jahre aufbewahrungspflichtig. Wer unsicher ist, fährt mit der konservativen 10-Jahres-Frist am sichersten.

### 2.2 E-Rechnungspflicht 2025–2028

Seit 01.01.2025 müssen alle inländischen Unternehmen — einschließlich Kleinunternehmer nach § 19 UStG — E-Rechnungen empfangen können[^bmf-erechnung][^ihk-frankfurt-erechnung]. Ein E-Mail-Postfach genügt dafür bereits. Die Versandpflicht folgt gestaffelt:

| Phase | Zeitraum | Pflicht |
|---|---|---|
| Phase 1 | 2025–2026 | Nur Empfang; Papier und PDF weiterhin erlaubt für Versand |
| Phase 2 | Ab 01.01.2027 | E-Rechnungsversand für Unternehmen > 800.000 € Vorjahresumsatz |
| Phase 3 | Ab 01.01.2028 | E-Rechnungsversand für alle B2B-Unternehmen |

Entscheidend: Eine per E-Mail versandte PDF gilt seit 2025 nicht mehr als elektronische Rechnung[^ihk-darmstadt-erechnung]. Nur strukturierte Formate — XRechnung (XML) oder ZUGFeRD (PDF/A-3 mit eingebettetem XML) — erfüllen die Anforderungen. ZUGFeRD-Dateien müssen als vollständige PDF/A-3 mit intaktem XML gespeichert werden.

### 2.3 Verfahrensdokumentation

Die Verfahrensdokumentation ist für jedes Unternehmen Pflicht[^lexware-verfahrensdoku] — unabhängig von Größe oder Gewinnermittlungsart. Sie muss vier Bereiche abdecken: allgemeine Unternehmensbeschreibung, Anwenderdokumentation, technische Systemdokumentation und Betriebsdokumentation. Bei Mängeln drohen Hinzuschätzungen und die Verwerfung der Buchführung.

Für Kleinunternehmen gibt es fertige Mustervorlagen und günstige Tools wie dokutar (ab 3,90 €/Monat)[^dokutar-verfahrensdoku]. Mit der E-Rechnungspflicht muss die Verfahrensdokumentation auch den Prozess des E-Rechnungsempfangs abdecken.

> **[Under-sourced]** Ob ein reines Git-Repository mit Markdown-Dateien und signierter Commit-Historie als GoBD-konforme Verfahrensdokumentation akzeptiert wird, ist rechtlich ungeklärt. Einzelne Steuerberater berichten von Akzeptanz durch Finanzämter, aber es gibt keine offizielle Stellungnahme.

## 3. KI-Agenten-freundliche Dateisysteme

### 3.1 Markdown als Standardformat

Markdown ist das optimale Format für KI-Agenten-Zugriff[^hackernoon-markdown]. Konkrete Zahlen: Ein Blogpost verbraucht 16.180 Tokens in HTML vs. 3.150 Tokens in Markdown[^cloudflare-markdown] — 80 % Reduktion. Bei einer komplexen Produktseite sinkt der Verbrauch sogar um 99 %. Cloudflare hat im Februar 2026 „Markdown for Agents" als Infrastruktur-Feature gelauncht.

**Praxisempfehlung:** Markdown für alle internen, lebendigen Dokumente (Notizen, SOPs, Projektdokumentation). PDF nur für formale Endausgaben (Rechnungen, Verträge, Belege) und extern versandte Dokumente. Als reiner Text hängt Markdown von keinem spezifischen Programm ab[^techsistence-plaintext] — kein Vendor-Lock-in, auch in Jahrzehnten lesbar.

### 3.2 YAML-Frontmatter als Metadaten

YAML-Frontmatter — der Block zwischen `---` am Anfang einer Markdown-Datei — verwandelt Dokumente in abfragbare Datenobjekte. LLMs extrahieren strukturierte Key-Value-Paare aus YAML mit 30–40 % höherer Genauigkeit als aus Fließtext[^trysteakhouse-frontmatter].

```yaml
---
kunde: Mustermann GmbH
typ: Angebot
datum: 2026-04-01
status: aktiv
tags: [beratung, phase-1]
---
```

Claude Code nutzt dieses Muster bereits in SKILL.md-Dateien[^claude-skills]: Beim Start werden nur Name und Beschreibung geladen (~80 Tokens), der volle Inhalt erst bei Aktivierung. Dieses Progressive-Disclosure-Muster lässt sich auf Geschäftsdokumente übertragen.

### 3.3 AGENTS.md und CLAUDE.md

AGENTS.md[^agentsmd-official] ist der aufkommende Cross-Tool-Standard für KI-Agenten-Konfiguration — verwaltet von der Agentic AI Foundation unter der Linux Foundation[^linuxfoundation-agentic], genutzt in über 60.000 Projekten, unterstützt von Codex, Cursor, Gemini CLI, GitHub Copilot und weiteren.

Forschungsergebnisse sind gemischt: Eine ETH-Zürich-Studie[^infoq-context-files] fand, dass LLM-generierte Context-Dateien die Erfolgsrate sogar senken. Manuell geschriebene Dateien bringen marginale Verbesserung. Eine separate Studie zeigt jedoch 28 % schnellere Ausführung und 16 % weniger Output-Tokens[^arxiv-agentsmd]. Die Empfehlung: AGENTS.md manuell schreiben, schlank halten (unter 300 Zeilen), nur Informationen aufnehmen, die der Agent nicht selbst inferieren kann.

### 3.4 Git als Audit Trail

Git bietet kryptographische Hash-Ketten für manipulationssichere Aufzeichnungen[^kosli-git-audit] — dieselbe Basis wie Blockchain, aber mit Dokumentenorientierung. Für GoBD-Compliance muss Git durch signierte Commits, Branch-Protection und regelmäßige Backups ergänzt werden.

Für Kleinunternehmen mit weniger als ~1.000 Dokumenten kann ein Git-Repository mit Markdown-Dateien eine kostenlose Alternative zu DMS-Systemen[^graphlit-filesearch] sein — KI-Agenten navigieren direkt durch die Dateien, ohne RAG-Pipeline.

## 4. Dateinamen, Formate & Werkzeuge

### 4.1 Benennungskonventionen

Das ISO 8601 Datumsformat (YYYY-MM-DD)[^harvard-filenaming] ist der Goldstandard: Alphabetische Sortierung ergibt automatisch chronologische Sortierung. Die Harvard-Richtlinien empfehlen Dateinamen von 40–50 Zeichen mit ausschließlich alphanumerischen Zeichen, Bindestrichen und Unterstrichen.

Empfohlenes Schema für Geschäftsdokumente:

```
2026-04-01_Mustermann-GmbH_Angebot_v02.md
[Datum]_[Kunde/Projekt]_[Dokumenttyp]_[Version].[Format]
```

Unterstriche trennen Komponenten, Bindestriche verbinden Wörter innerhalb einer Komponente. Teamabstimmung ist entscheidend[^docuneers-dateinamen] — Konventionen, die nur der Gründer kennt, werden von Mitarbeitern und Steuerberatern nicht eingehalten.

### 4.2 DMS-Lösungen im Vergleich

| Lösung | Typ | Kosten | GoBD | DATEV | Zielgruppe |
|---|---|---|---|---|---|
| [Paperless-ngx](https://docs.paperless-ngx.com/) | Open Source, Self-Hosted | Kostenlos | Mit Konfiguration[^andersgood-paperless] | Über Bridge | Technikaffine |
| [ecoDMS](https://blog.ralf-peter-kleinert.de/allgemein/paperless-ngx-vs-ecodms-ein-vergleich/) | Kommerziell, Self-Hosted | 74,79 € einmalig | Ja (nativ) | Nein | Compliance-orientierte |
| [sevDesk](https://sevdesk.de/buchhaltungssoftware-kleinunternehmer/) | Cloud-SaaS | Ab ~15 €/Monat | Ja | Ja | Gründer & Freelancer |
| [DATEV Unternehmen online](https://steuerberater-tabak.com/datev-unternehmen-online/) | Cloud (über StB) | Ab 11 €/Monat | Ja | Nativ | StB-abhängige KMU |

Eine ausführliche Marktübersicht bietet ecmguide.de[^ecmguide-dms].

**Paperless-ngx** ist nach Installation nicht automatisch GoBD-konform[^andersgood-paperless]: Löschrechte müssen eingeschränkt, Logrotation deaktiviert und eine Verfahrensdokumentation erstellt werden. Wer Rechtssicherheit ohne Konfigurationsaufwand braucht, greift zu ecoDMS oder sevDesk.

**Empfehlung für technikaffine Gründer:** Paperless-ngx für OCR und Archivierung, sevDesk für Buchhaltung und E-Rechnungen, verbunden durch die Open-Source-Bridge paperlessngx-to-sevdesk[^github-paperless-sevdesk].

### 4.3 OCR & Digitalisierung

OCRmyPDF[^ocrmypdf-docs] (aktuell v17.4.0) ist das Standardwerkzeug für lokale Texterkennung. Es erzeugt PDF/A-2b für Langzeitarchivierung, korrigiert schiefe Scans automatisch und läuft vollständig lokal — kein Cloud-Upload sensibler Geschäftsdaten. Es ist zugleich das OCR-Backend von Paperless-ngx.

```bash
# Einzelnes Dokument mit OCR versehen und als PDF/A archivieren
ocrmypdf --language deu+eng --output-type pdfa-2 scan.pdf archiv.pdf
```

## Einschränkungen & offene Fragen

- **Keine Vergleichsstudien.** Es existieren keine unabhängigen empirischen Vergleiche der drei Ordnungssysteme. Alle Bewertungen stammen von Einzelnutzern oder Softwareanbietern.
- **KI-Kompatibilität ist theoretisch.** Empirische Benchmarks, die 7-Ordner-System, Johnny.Decimal und PARA spezifisch auf KI-Agenten-Tauglichkeit testen, fehlen. Die Einschätzungen in diesem Report sind aus allgemeinen KI-Dateisystem-Forschungen abgeleitet.
- **GoBD + Git ist rechtlich ungeklärt.** Ob Git-Repositories die Anforderungen an revisionssichere Archivierung erfüllen, wurde von keinem Finanzamt offiziell bestätigt.
- **Shadow-Text-Layer (.machine-readable/) hat keine etablierte Praxis.** Das Konzept existiert in der Fotografie (XMP-Sidecars) und Medizin (BIDS JSON), aber nicht als Muster für Geschäftsdokumente. YAML-Frontmatter direkt in Markdown-Dateien ist das nächste Äquivalent.
- **Deutsche Erfahrungsberichte zu Johnny.Decimal und PARA im B2B-Kontext sind praktisch nicht vorhanden.**

[^buero-kaizen-ordner]: [Büro-Kaizen — Ordnerstruktur](https://www.buero-kaizen.de/ordnerstruktur/) — Blogbeitrag, 2025
[^sekretaria-7ordner]: [Sekretaria — 7-Ordner-System](https://www.sekretaria.de/bueroorganisation/organisation/ablage/7-ordner-system/) — Blogbeitrag
[^haufe-fristen]: [Haufe — Aufbewahrungsfristen](https://www.haufe.de/finance/buchfuehrung-kontierung/aufbewahrungsfristen-welche-unterlagen-vernichtet-werden-koennen_186_432446.html) — Nachrichtenartikel, 2025
[^bmf-erechnung]: [BMF — FAQ E-Rechnung](https://www.bundesfinanzministerium.de/Content/DE/FAQ/e-rechnung.html) — Behördenbericht, 2025
[^ihk-frankfurt-erechnung]: [IHK Frankfurt — E-Rechnungspflicht](https://www.frankfurt-main.ihk.de/recht/uebersicht-alle-rechtsthemen/steuerrecht/umsatzsteuer-national/e-rechnungspflicht-ab-2025-6055774) — Behördenbericht, 2025
[^ihk-darmstadt-erechnung]: [IHK Darmstadt — E-Rechnung und Meldesystem](https://www.ihk.de/darmstadt/produktmarken/recht-und-fair-play/steuerinfo/bmf-plant-verpflichtende-erechnung-und-meldesystem-5784882) — Behördenbericht, 2025
[^cloudflare-markdown]: [Cloudflare — Markdown for Agents](https://blog.cloudflare.com/markdown-for-agents/) — Blogbeitrag, 2026
[^hackernoon-markdown]: [HackerNoon — Why AI Agents Choose Markdown](https://hackernoon.com/why-are-the-new-ai-agents-choosing-markdown-over-html) — Blogbeitrag, 2025
[^trysteakhouse-frontmatter]: [Steakhouse Blog — Front-Matter Standard](https://blog.trysteakhouse.com/blog/front-matter-standard-using-yaml-metadata-programmatically-control-crawler-behavior) — Blogbeitrag, 2025
[^linuxfoundation-agentic]: [Linux Foundation — Agentic AI Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation) — Pressemitteilung, 2025
[^agentsmd-official]: [AGENTS.md Official Website](https://agents.md/) — Offizielle Dokumentation, 2025
[^datev-schnittstellen]: [DATEV — Schnittstellen](https://www.datev.de/web/de/steuerberatung/wissen-weiterbildung/themen-im-fokus/schnittstellen) — Offizielle Dokumentation, 2025
[^github-paperless-sevdesk]: [GitHub — paperlessngx-to-sevdesk](https://github.com/lippoliv/paperlessngx-to-sevdesk) — Technischer Bericht
[^johnnydecimal-sbs]: [Johnny.Decimal — Small Business System](https://johnnydecimal.com/10-19-concepts/15-patterns-templates/15.04-small-business-system/) — Offizielle Dokumentation, 2026
[^pixx-ordnerstruktur]: [pixx.io — Digitale Ordnerstruktur](https://www.pixx.io/blog/digitale-ordnerstruktur) — Blogbeitrag
[^orgamax-ordnerstruktur]: [orgaMAX — Die perfekte Ordnerstruktur](https://blog.orgamax.de/unternehmer-news/die-perfekte-ordnerstruktur-f%C3%BCr-ihr-unternehmen-das-7-ordner-system) — Blogbeitrag
[^luegering-johnnydecimal]: [Constantin Lügering — Johnny Decimal Review](https://constantinluegering.de/en/johnny-decimal-is-a-great-guy-but-we-are-not-best-friends/) — Blogbeitrag
[^clickup-para]: [ClickUp — PARA Method](https://clickup.com/blog/para-method/) — Blogbeitrag
[^lucaf-decimal]: [Luca F. — Luca Decimal](https://lucaf.eu/2023/02/23/luca-decimal.html) — Blogbeitrag
[^mattgiaro-para]: [Matt Giaro — PARA Method Alternatives](https://mattgiaro.com/para-method-alternatives/) — Blogbeitrag
[^tmt-para-gtd]: [TMT Beratung — PARA und Getting Things Done](https://www.tmt-beratung.de/para-und-getting-things-done/) — Blogbeitrag
[^dust-filesystem]: [Dust — Teaching AI Agents to Navigate Data](https://dust.tt/blog/how-we-taught-ai-agents-to-navigate-company-data-like-a-filesystem) — Blogbeitrag, 2025
[^ecovis-fristen]: [Ecovis — Archivierungspflicht 2025](https://ecovis-kso.com/blog/aufbewahrungsfristen-2025-archivierungspflicht-fuer-geschaeftsunterlagen/) — Blogbeitrag, 2025
[^farbe-fristen]: [farbe.de — Aufbewahrungsfristen 8 oder 10 Jahre](https://www.farbe.de/aktuell/nachricht/artikel-1/aufbewahrungsfristen-gelten-acht-oder-zehn-jahre-in-unternehmen) — Nachrichtenartikel
[^lexware-verfahrensdoku]: [Lexware — Verfahrensdokumentation](https://www.lexware.de/wissen/buchhaltung-finanzen/verfahrensdokumentation/) — Blogbeitrag, 2025
[^dokutar-verfahrensdoku]: [dokutar — Verfahrensdokumentation für Kleinunternehmen](https://www.dokutar.de/blog/verfahrensdokumentation-fuer-kleinunternehmen/) — Blogbeitrag
[^techsistence-plaintext]: [Techsistence — Plain Text is What You Need](https://www.techsistence.com/p/plain-text-is-what-you-need-but-why) — Blogbeitrag
[^claude-skills]: [Claude Platform — Agent Skills Overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) — Offizielle Dokumentation
[^infoq-context-files]: [InfoQ — ETH Zürich Study on Context Files](https://www.infoq.com/news/2026/03/agents-context-file-value-review/) — Nachrichtenartikel, 2026
[^arxiv-agentsmd]: [arXiv — AGENTS.md Study](https://arxiv.org/html/2601.20404) — Fachartikel
[^kosli-git-audit]: [Kosli — Git as Compliance Audit Trail](https://www.kosli.com/blog/using-git-for-a-compliance-audit-trail/) — Technischer Bericht, 2024
[^graphlit-filesearch]: [Graphlit — File Search vs. RAG](https://www.graphlit.com/blog/file-search-vs-rag) — Blogbeitrag
[^harvard-filenaming]: [Harvard — File Naming Conventions](https://datamanagement.hms.harvard.edu/plan-design/file-naming-conventions) — Technischer Bericht
[^docuneers-dateinamen]: [Docuneers — Dateinamen-Konvention](https://www.docuneers.de/dateinamen-konvention-05-tipps-die-ordnung-ins-datenchaos-bringen/) — Blogbeitrag
[^ecmguide-dms]: [ecmguide.de — DMS für Selbstständige](https://www.ecmguide.de/dms/uebersicht-zu-dms-loesungen-fuer-selbststaendige-und-kleinbetriebe-25069/) — Blogbeitrag, 2025
[^andersgood-paperless]: [andersgood.de — Paperless-ngx GoBD-konform nutzen](https://andersgood.de/kurz-notiert/paperless-ngx-gobd-konform-nutzen) — Blogbeitrag, 2025
[^ocrmypdf-docs]: [OCRmyPDF — Dokumentation](https://ocrmypdf.readthedocs.io/en/latest/introduction.html) — Offizielle Dokumentation, 2025

*Erstellt mit [Deep Researcher](https://deep-research.leon.fm) von Leon Beckert*
