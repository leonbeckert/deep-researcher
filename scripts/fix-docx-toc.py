#!/usr/bin/env python3
"""Fix DOCX TOC page numbers using LibreOffice headless.

Installs a LO Basic macro, then runs it headless to open the document,
update all indexes (computing real page numbers via the layout engine),
and save. Exits with error if LibreOffice is not installed.

Usage: python3 scripts/fix-docx-toc.py output/topic/report.docx
"""

import os
import platform
import shutil
import subprocess
import sys
from pathlib import Path

# LibreOffice Basic macro that updates all TOC indexes and saves
MACRO_XBA = """\
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE script:module PUBLIC "-//OpenOffice.org//DTD OfficeDocument 1.0//EN" "module.dtd">
<script:module xmlns:script="http://openoffice.org/2000/script" \
script:name="UpdateTOC" script:language="StarBasic">
Sub Main
    Dim oDoc As Object
    Dim oIndexes As Object
    Dim i As Long

    oDoc = ThisComponent
    If IsNull(oDoc) Or IsEmpty(oDoc) Then Exit Sub

    oIndexes = oDoc.getDocumentIndexes()
    For i = 0 To oIndexes.Count - 1
        oIndexes.getByIndex(i).update()
    Next i

    oDoc.store()
    oDoc.close(True)

    Dim oDesktop As Object
    oDesktop = createUnoService("com.sun.star.frame.Desktop")
    oDesktop.terminate()
End Sub
</script:module>
"""


def find_lo_macro_dir() -> Path | None:
    """Find the LibreOffice user macro directory."""
    system = platform.system()
    home = Path.home()

    if system == "Darwin":
        base = home / "Library/Application Support/LibreOffice/4/user/basic/Standard"
    elif system == "Linux":
        base = home / ".config/libreoffice/4/user/basic/Standard"
    else:
        return None

    if not base.parent.exists():
        return None
    base.mkdir(parents=True, exist_ok=True)
    return base


def ensure_macro_installed() -> bool:
    """Install the UpdateTOC macro into LibreOffice's user profile."""
    macro_dir = find_lo_macro_dir()
    if macro_dir is None:
        return False

    macro_path = macro_dir / "UpdateTOC.xba"
    script_xlb = macro_dir / "script.xlb"

    macro_path.write_text(MACRO_XBA, encoding="utf-8")

    if script_xlb.exists():
        content = script_xlb.read_text(encoding="utf-8")
        if "UpdateTOC" not in content:
            content = content.replace(
                "</library:library>",
                ' <library:element library:name="UpdateTOC"/>\n</library:library>',
            )
            script_xlb.write_text(content, encoding="utf-8")
    else:
        script_xlb.write_text(
            '<?xml version="1.0" encoding="UTF-8"?>\n'
            '<!DOCTYPE library:library PUBLIC "-//OpenOffice.org//DTD OfficeDocument 1.0//EN" "library.dtd">\n'
            '<library:library xmlns:library="http://openoffice.org/2000/library" '
            'library:name="Standard" library:readonly="false" library:passwordprotected="false">\n'
            ' <library:element library:name="UpdateTOC"/>\n'
            "</library:library>\n",
            encoding="utf-8",
        )

    return True


def libreoffice_update_toc(docx_path: str) -> None:
    """Run LibreOffice headless with the UpdateTOC macro."""
    soffice = shutil.which("soffice") or shutil.which("libreoffice")
    if not soffice:
        print("ERROR: LibreOffice not found. Install it first:")
        print("  macOS:  brew install --cask libreoffice")
        print("  Linux:  sudo apt install libreoffice")
        print("  Or run: bash setup.sh")
        sys.exit(1)

    if not ensure_macro_installed():
        print("ERROR: Could not install LO macro (unsupported OS or no LO profile).")
        sys.exit(1)

    abs_path = os.path.abspath(docx_path)

    # Kill any stale LO instances that might block headless mode
    subprocess.run(["pkill", "-f", "soffice"], capture_output=True)

    try:
        result = subprocess.run(
            [
                soffice,
                "--headless",
                "--invisible",
                "--norestore",
                abs_path,
                "macro:///Standard.UpdateTOC.Main",
            ],
            capture_output=True,
            text=True,
            timeout=120,
        )

        if result.returncode != 0:
            stderr = result.stderr.strip()
            print(f"ERROR: LibreOffice failed (exit {result.returncode})")
            if stderr:
                print(f"  {stderr}")
            sys.exit(1)

        print(f"  TOC updated in {docx_path}")

    except subprocess.TimeoutExpired:
        print("ERROR: LibreOffice timed out after 120s")
        subprocess.run(["pkill", "-f", "soffice"], capture_output=True)
        sys.exit(1)


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: python3 scripts/fix-docx-toc.py <file.docx>")
        sys.exit(1)

    docx_path = sys.argv[1]
    if not os.path.exists(docx_path):
        print(f"ERROR: File not found: {docx_path}")
        sys.exit(1)

    print(f"Fixing TOC in {docx_path}...")
    libreoffice_update_toc(docx_path)


if __name__ == "__main__":
    main()
