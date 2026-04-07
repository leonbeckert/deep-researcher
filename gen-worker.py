#!/usr/bin/env python3
"""
Generate worker.js from tailwind-src.html + compiled Tailwind CSS.

Single source of truth for the landing page HTML is tailwind-src.html.
This script:
  1. Reads tailwind-src.html
  2. Runs build-css.sh to compile Tailwind v4 CSS
  3. Injects the CSS into the <style> placeholder
  4. Escapes backticks / ${ / non-ASCII for a JS template literal
  5. Writes worker.js with the CF Worker wrapper

Usage: python3 gen-worker.py
"""
import subprocess
from pathlib import Path

HERE = Path(__file__).parent
SRC_HTML = HERE / "tailwind-src.html"
OUT_JS = HERE / "worker.js"
CSS_PLACEHOLDER = "/* Tailwind CSS will be inlined here in worker.js */"

# 1. Read HTML
html = SRC_HTML.read_text(encoding="utf-8")

# 2. Build CSS
print("Building Tailwind CSS...")
css = subprocess.check_output(
    ["bash", "build-css.sh"], cwd=HERE, text=True
)
print(f"  CSS size: {len(css)} bytes")

# 3. Inject CSS
if CSS_PLACEHOLDER not in html:
    raise SystemExit(f"Placeholder not found in {SRC_HTML}: {CSS_PLACEHOLDER}")
html = html.replace(CSS_PLACEHOLDER, css)

# 4. Escape for JS template literal
# Template literals special chars: backtick, backslash, ${ sequence.
# Also escape non-ASCII to keep the source file ASCII-safe.
def escape_js(s: str) -> str:
    out = []
    i = 0
    while i < len(s):
        ch = s[i]
        if ch == "\\":
            out.append("\\\\")
        elif ch == "`":
            out.append("\\`")
        elif ch == "$" and i + 1 < len(s) and s[i + 1] == "{":
            out.append("\\$")
        elif ord(ch) < 128:
            out.append(ch)
        else:
            cp = ord(ch)
            if cp <= 0xFFFF:
                out.append(f"\\u{cp:04x}")
            else:
                # Surrogate pair
                cp -= 0x10000
                hi = 0xD800 + (cp >> 10)
                lo = 0xDC00 + (cp & 0x3FF)
                out.append(f"\\u{hi:04x}\\u{lo:04x}")
        i += 1
    return "".join(out)

escaped = escape_js(html)

# 5. Wrap in CF Worker boilerplate
worker = (
    "export default {\n"
    "  async fetch(request) {\n"
    "    const url = new URL(request.url);\n"
    "\n"
    "    if (url.pathname === '/download') {\n"
    "      return Response.redirect('https://github.com/leonbeckert/deep-researcher/releases/latest/download/deep-researcher.zip', 302);\n"
    "    }\n"
    "\n"
    "    if (url.pathname === '/github') {\n"
    "      return Response.redirect('https://github.com/leonbeckert/deep-researcher', 302);\n"
    "    }\n"
    "\n"
    "    return new Response(HTML, {\n"
    "      headers: { 'Content-Type': 'text/html; charset=utf-8' }\n"
    "    });\n"
    "  }\n"
    "};\n"
    "\n"
    f"const HTML = `{escaped}`;\n"
)

OUT_JS.write_text(worker, encoding="utf-8")
print(f"Wrote {OUT_JS} ({len(worker)} bytes)")
