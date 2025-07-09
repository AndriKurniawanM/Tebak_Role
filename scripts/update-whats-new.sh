#!/usr/bin/env bash
set -e

# Jumlah commit terakhir yang ingin ditampilkan
COUNT=5

# Generate daftar commit
NEW_ENTRIES=$(git log -n $COUNT --pretty=format:'- %s (%ad)' --date=short)

# Ambil README asli
README="README.md"
TMP="${README}.tmp"

awk -v new="$NEW_ENTRIES" '
  /<!-- WHAT’S-NEW-START -->/ { print; print "## What’s New\n"; print new; skip=1; next }
  /<!-- WHAT’S-NEW-END -->/   { skip=0 }
  !skip { print }
' "$README" > "$TMP"

mv "$TMP" "$README"

