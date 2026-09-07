#!/usr/bin/env sh
#
# optimize-images.sh — prepare phone photos for the web.
#
# Photos come off a phone at ~4MB each and carry GPS coordinates of the job
# site, which means customers' home addresses. This script fixes both problems.
#
#   Usage:  ./scripts/optimize-images.sh [source-dir] [output-dir]
#   Default: assets/img-src  ->  assets/img
#
# For each image it:
#   1. Resizes the longest edge to 1600px (never upscales).
#   2. Writes WebP at quality 80.
#   3. Writes JPEG at quality 82 as the fallback.
#   4. Strips all metadata, EXIF and GPS included. NON-NEGOTIABLE.
#
# Target: every image under 200KB, the hero under 250KB. The script reports
# anything that misses that and exits non-zero so a checkpoint can't pass
# quietly with a 900KB photo in it.
#
# Requires ImageMagick and cwebp:
#   macOS:  brew install imagemagick webp exiftool
#   Debian: sudo apt install imagemagick webp libimage-exiftool-perl

set -eu

SRC="${1:-assets/img-src}"
OUT="${2:-assets/img}"
MAX_EDGE=1600
WEBP_Q=80
JPEG_Q=82
BUDGET_KB=200
HERO_BUDGET_KB=250

# --- dependency check -------------------------------------------------------
missing=""
for cmd in cwebp; do
  command -v "$cmd" >/dev/null 2>&1 || missing="$missing $cmd"
done
if command -v magick >/dev/null 2>&1; then
  IM="magick"
elif command -v convert >/dev/null 2>&1; then
  IM="convert"
else
  missing="$missing imagemagick"
  IM=""
fi
if [ -n "$missing" ]; then
  echo "Missing required tools:$missing" >&2
  echo "  macOS:  brew install imagemagick webp exiftool" >&2
  echo "  Debian: sudo apt install imagemagick webp libimage-exiftool-perl" >&2
  exit 1
fi

[ -d "$SRC" ] || { echo "Source directory not found: $SRC" >&2; exit 1; }
mkdir -p "$OUT"

over_budget=0
processed=0

for f in "$SRC"/*; do
  [ -f "$f" ] || continue
  case "$(printf '%s' "$f" | tr '[:upper:]' '[:lower:]')" in
    *.jpg|*.jpeg|*.png|*.heic|*.webp) ;;
    *) continue ;;
  esac

  base=$(basename "$f")
  name="${base%.*}"

  # -strip removes EXIF, including GPS. -resize with '>' never upscales.
  "$IM" "$f" -auto-orient -strip -resize "${MAX_EDGE}x${MAX_EDGE}>" \
        -quality "$JPEG_Q" "$OUT/$name.jpg"

  cwebp -quiet -q "$WEBP_Q" -metadata none "$OUT/$name.jpg" -o "$OUT/$name.webp"

  # --- budget check ---------------------------------------------------------
  case "$name" in
    *hero*) budget=$HERO_BUDGET_KB ;;
    *)      budget=$BUDGET_KB ;;
  esac

  for out in "$OUT/$name.jpg" "$OUT/$name.webp"; do
    kb=$(( $(wc -c < "$out") / 1024 ))
    if [ "$kb" -gt "$budget" ]; then
      echo "  OVER BUDGET  $out — ${kb}KB (limit ${budget}KB)"
      over_budget=$((over_budget + 1))
    else
      echo "  ok           $out — ${kb}KB"
    fi
  done

  processed=$((processed + 1))
done

echo ""
echo "Processed $processed image(s) into $OUT/"

# --- EXIF verification ------------------------------------------------------
# The build spec treats this as a hard gate: exiftool must show no GPS data on
# any file before CP7 can pass.
if command -v exiftool >/dev/null 2>&1; then
  if exiftool -gps:all -q -q "$OUT" 2>/dev/null | grep -qi gps; then
    echo "FAIL: GPS data still present in $OUT — do not commit these files." >&2
    exit 1
  fi
  echo "EXIF check: no GPS data found."
else
  echo "WARNING: exiftool not installed — GPS data NOT verified." >&2
  echo "         Install it and re-check before CP7 can pass." >&2
fi

if [ "$over_budget" -gt 0 ]; then
  echo "FAIL: $over_budget file(s) over budget. Re-shoot or lower quality." >&2
  exit 1
fi
