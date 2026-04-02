#!/bin/bash

# Skills Dashboard Build Script
# Assembles all modules into final index.html

set -e

echo "🔧 Building Skills Dashboard..."

# Check if output directory exists
if [ ! -d "$1" ]; then
    echo "❌ Error: Output directory not found: $1"
    exit 1
fi

OUTPUT_DIR="$1"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "📁 Output directory: $OUTPUT_DIR"
echo "📂 References directory: $SCRIPT_DIR"

# Copy static files
echo "📋 Copying static files..."
cp "$SCRIPT_DIR/styles.css" "$OUTPUT_DIR/"
cp "$SCRIPT_DIR/main.js" "$OUTPUT_DIR/"

# Check if data.js exists
if [ -f "$OUTPUT_DIR/data.js" ]; then
    echo "✅ data.js found"
else
    echo "⚠️  Warning: data.js not found, will be generated"
fi

# Assemble index.html
echo "🔨 Assembling index.html..."

# Read base template
BASE_TEMPLATE=$(cat "$SCRIPT_DIR/_base.html")

# Replace title
BASE_TEMPLATE="${BASE_TEMPLATE/COURSE_TITLE/Skills Dashboard}"

# Create final index.html
echo "$BASE_TEMPLATE" > "$OUTPUT_DIR/index.html"

echo ""
echo "✅ Build complete!"
echo ""
echo "📦 Output files:"
echo "  - $OUTPUT_DIR/index.html"
echo "  - $OUTPUT_DIR/styles.css"
echo "  - $OUTPUT_DIR/main.js"
echo "  - $OUTPUT_DIR/data.js"
echo ""
echo "🌐 Open $OUTPUT_DIR/index.html in your browser to view the dashboard."
