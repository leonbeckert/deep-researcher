// Dark mode variant — light text on dark background.
#set page(
  fill: luma(30),
  footer: context {
    set text(fill: luma(120), size: 8pt)
    line(length: 100%, stroke: 0.5pt + luma(80))
    v(4pt)
    grid(
      columns: (1fr, auto),
      [Deep Researcher · #link("https://deep-research.leon.fm")[deep-research.leon.fm]],
      counter(page).display(),
    )
  }
)

// Body text: off-white on dark background.
#set text(fill: luma(220))

// Headings: brighter than body for visual hierarchy.
#show heading: set text(fill: luma(240))

// Fix: Allow tables to break across pages.
#show figure.where(kind: table): set block(breakable: true)

// Table styling: visible borders and readable text on dark background.
#show table: set table(stroke: 0.5pt + luma(60))
#show table.cell: it => {
  set text(hyphenate: false)
  it
}

// Code blocks: slightly lighter fill to distinguish from page background.
#show raw.where(block: true): set block(fill: luma(40), inset: 8pt, radius: 3pt)
#show raw.where(block: true): set text(fill: luma(220))

// External links: lighter blue for WCAG AA contrast on dark.
#show link: it => {
  if type(it.dest) == str {
    text(fill: rgb("#60a5fa"), underline(it))
  } else {
    it
  }
}
