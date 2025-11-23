#!/bin/bash

#
# Helper script to create new artwork entry
# Usage: ./new-artwork.sh "Artwork Title"
#
# This script generates a markdown template for a new artwork piece
# with pre-filled front matter and proper file naming conventions.
#

# Check if title argument is provided
if [ -z "$1" ]; then
  echo "Usage: ./new-artwork.sh \"Artwork Title\""
  echo "Example: ./new-artwork.sh \"Sunset Dreams\""
  exit 1
fi

# Get the title from command line argument
TITLE="$1"

# Generate URL-friendly slug from title
# Converts to lowercase and replaces spaces with hyphens
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-')

# Get current date in YYYY-MM-DD format
DATE=$(date +%Y-%m-%d)

# Get current year for the year field
YEAR=$(date +%Y)

# Define the output file path
OUTPUT_FILE="_artwork/${DATE}-${SLUG}.md"

# Create the markdown file with front matter template
cat > "$OUTPUT_FILE" << EOF
---
title: "${TITLE}"
date: ${DATE}
image: /assets/images/artwork/${SLUG}.jpg
thumbnail: /assets/images/artwork/${SLUG}-thumb.jpg
medium: ""
dimensions: ""
year: ${YEAR}
series: ""
description: ""
---

Extended description and artist notes about this piece.

You can include:
- Inspiration and creative process
- Techniques used
- Materials and methods
- Personal reflections
- Context or story behind the work
EOF

# Confirm creation
echo "✓ Created: ${OUTPUT_FILE}"
echo ""
echo "Next steps:"
echo "1. Add your images to assets/images/artwork/:"
echo "   - ${SLUG}.jpg (full resolution)"
echo "   - ${SLUG}-thumb.jpg (thumbnail)"
echo ""
echo "2. Edit ${OUTPUT_FILE} to add:"
echo "   - Medium (e.g., 'Acrylic on Canvas')"
echo "   - Dimensions (e.g., '24\" x 36\"')"
echo "   - Series name (if applicable)"
echo "   - Description and extended notes"
echo ""
echo "3. Test locally: bundle exec jekyll serve"
echo "4. Commit and push: git add . && git commit -m 'Add ${TITLE}' && git push"
