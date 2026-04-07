#!/bin/bash
# Deep Researcher — Dependency Setup
# Works on macOS (Homebrew) and Linux (apt).
# On Windows, prints manual install instructions.
#
# Usage: bash setup.sh

set -e

echo ""
echo "Deep Researcher — Abhängigkeiten installieren"
echo "=============================================="
echo ""

OS="$(uname -s)"

check_or_install_mac() {
  local cmd="$1" pkg="$2"
  if command -v "$cmd" &>/dev/null; then
    echo "  ✓ $cmd"
  else
    echo "  ↓ $pkg installieren..."
    brew install "$pkg"
  fi
}

check_or_install_apt() {
  local cmd="$1" pkg="$2"
  if command -v "$cmd" &>/dev/null; then
    echo "  ✓ $cmd"
  else
    echo "  ↓ $pkg installieren..."
    sudo apt-get install -y -qq "$pkg"
  fi
}

install_macos() {
  echo "macOS erkannt — verwende Homebrew"
  echo ""

  if ! command -v brew &>/dev/null; then
    echo "Homebrew nicht gefunden. Installiere Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    echo ""
  fi

  check_or_install_mac pandoc pandoc
  check_or_install_mac typst typst
  check_or_install_mac pdftotext poppler
  check_or_install_mac tesseract tesseract
  check_or_install_mac node node
}

install_linux() {
  echo "Linux erkannt — verwende apt"
  echo ""

  sudo apt-get update -qq

  check_or_install_apt pandoc pandoc
  check_or_install_apt pdftotext poppler-utils
  check_or_install_apt tesseract tesseract-ocr
  check_or_install_apt node nodejs

  if ! command -v npm &>/dev/null; then
    echo "  ↓ npm installieren..."
    sudo apt-get install -y -qq npm
  fi

  # Typst — try snap first, then cargo
  if command -v typst &>/dev/null; then
    echo "  ✓ typst"
  elif command -v snap &>/dev/null; then
    echo "  ↓ typst installieren (snap)..."
    sudo snap install typst
  elif command -v cargo &>/dev/null; then
    echo "  ↓ typst installieren (cargo)..."
    cargo install typst-cli
  else
    echo "  ⚠ typst manuell installieren: https://github.com/typst/typst/releases"
  fi
}

install_windows() {
  echo "Windows erkannt."
  echo ""
  echo "Bitte installiere die folgenden Programme manuell:"
  echo ""
  echo "  winget install JohnMacFarlane.Pandoc"
  echo "  winget install Typst.Typst"
  echo "  winget install OpenJS.NodeJS"
  echo "  choco install poppler        (erfordert Chocolatey)"
  echo ""
  echo "Tesseract: https://github.com/UB-Mannheim/tesseract/wiki"
  echo ""
  echo "Nach der Installation dieses Skript erneut in Git Bash oder WSL ausfuehren."
  exit 1
}

case "$OS" in
  Darwin)                install_macos ;;
  Linux)                 install_linux ;;
  MINGW*|MSYS*|CYGWIN*) install_windows ;;
  *)
    echo "Unbekanntes Betriebssystem: $OS"
    echo "Unterstuetzte Systeme: macOS, Linux, Windows (manuell)"
    exit 1
    ;;
esac

echo ""

# LibreOffice — required for DOCX TOC (pandoc can't compute page numbers)
case "$OS" in
  Darwin)
    if ! command -v soffice &>/dev/null; then
      echo "  ↓ LibreOffice installieren (fuer DOCX TOC)..."
      brew install --cask libreoffice
    else
      echo "  ✓ libreoffice"
    fi
    ;;
  Linux)
    if ! command -v soffice &>/dev/null; then
      echo "  ↓ LibreOffice installieren (fuer DOCX TOC)..."
      sudo apt-get install -y -qq libreoffice
    else
      echo "  ✓ libreoffice"
    fi
    ;;
esac

# Playwright browser for JavaScript-heavy websites
echo "Playwright-Browser installieren..."
npx playwright install chromium 2>/dev/null || echo "  ⚠ Playwright wird bei erster Nutzung installiert"

# DOCX reference template
if [ ! -f "templates/reference.docx" ]; then
  echo "DOCX-Vorlage generieren..."
  mkdir -p templates
  pandoc -o templates/reference.docx --print-default-data-file reference.docx 2>/dev/null || \
    echo "  ⚠ DOCX-Vorlage wird spaeter generiert"
fi

# Output directory
mkdir -p output

echo ""
echo "=============================================="
echo "✅ Setup abgeschlossen!"
echo ""
echo "Starte mit: \"Recherchiere [dein Thema]\""
echo "=============================================="
