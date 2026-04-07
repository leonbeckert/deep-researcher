// Page footer: attribution on every page.
#set page(
  footer: context {
    set text(fill: luma(160), size: 8pt)
    line(length: 100%, stroke: 0.5pt + luma(200))
    v(4pt)
    grid(
      columns: (1fr, auto),
      [Deep Researcher · #link("https://deep-research.leon.fm")[deep-research.leon.fm]],
      counter(page).display(),
    )
  }
)

// Fix: Allow tables to break across pages.
// Pandoc wraps tables in #figure(), which is non-breakable by default.
#show figure.where(kind: table): set block(breakable: true)

// Improve text handling in table cells — disable hyphenation to prevent
// mid-word breaks like "Re-port" in narrow columns.
#show table.cell: it => {
  set text(hyphenate: false)
  it
}

// Make external links visually distinguishable (blue + underline).
// Internal links (TOC entries, footnote back-references) are left unstyled.
#show link: it => {
  if type(it.dest) == str {
    text(fill: rgb("#2563eb"), underline(it))
  } else {
    it
  }
}
