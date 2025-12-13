#!/bin/bash

# Add New Artwork Script for The Purple Duchess Gallery
# Usage: ./add-artwork.sh "image-file.jpg" "Artwork Title" "Medium" "Year"

if [ $# -ne 4 ]; then
    echo "Usage: $0 <image-file> <title> <medium> <year>"
    echo "Example: $0 IMG_4000.jpg \"Sunset Dreams\" \"Oil Painting\" \"2025\""
    exit 1
fi

IMAGE_FILE="$1"
TITLE="$2"
MEDIUM="$3"
YEAR="$4"

# Check if image file exists
if [ ! -f "$IMAGE_FILE" ]; then
    echo "Error: Image file '$IMAGE_FILE' not found!"
    exit 1
fi

# Get filename without extension for consistent naming
FILENAME=$(basename "$IMAGE_FILE")
NAME_NO_EXT="${FILENAME%.*}"

echo "Adding new artwork: $TITLE"
echo "File: $IMAGE_FILE"
echo "Medium: $MEDIUM"
echo "Year: $YEAR"
echo ""

# Step 1: Copy to artwork folder
echo "1. Copying original to artwork folder..."
cp "$IMAGE_FILE" "assets/images/artwork/"
if [ $? -eq 0 ]; then
    echo "   ✓ Copied to assets/images/artwork/$FILENAME"
else
    echo "   ✗ Failed to copy artwork file"
    exit 1
fi

# Step 2: Generate thumbnail
echo "2. Generating thumbnail..."
magick "assets/images/artwork/$FILENAME" -resize 400x300^ -gravity center -extent 400x300 -background white -quality 90 "assets/images/thumbnails/${NAME_NO_EXT}.jpg"
if [ $? -eq 0 ]; then
    echo "   ✓ Created thumbnail: assets/images/thumbnails/${NAME_NO_EXT}.jpg"
else
    echo "   ✗ Failed to generate thumbnail"
    exit 1
fi

# Step 3: Generate HTML snippet
echo "3. Generating HTML snippet..."
HTML_SNIPPET="
            <div class=\"artwork-item\" data-title=\"$TITLE\" data-medium=\"$MEDIUM\" data-year=\"$YEAR\">
                <div class=\"artwork-image\">
                    <img src=\"assets/images/thumbnails/${NAME_NO_EXT}.jpg\" 
                         data-full=\"assets/images/artwork/$FILENAME\"
                         alt=\"$TITLE\">
                </div>
                <div class=\"artwork-info\">
                    <h3>$TITLE</h3>
                    <p class=\"medium\">$MEDIUM</p>
                    <p class=\"year\">$YEAR</p>
                </div>
            </div>
"

# Save snippet to file for manual insertion
echo "$HTML_SNIPPET" > "new-artwork-snippet.html"
echo "   ✓ HTML snippet saved to: new-artwork-snippet.html"

echo ""
echo "🎨 Artwork processing complete!"
echo ""
echo "Next steps:"
echo "1. Copy the HTML snippet from 'new-artwork-snippet.html'"
echo "2. Add it to index.html in the gallery-container section"
echo "3. Commit and push changes:"
echo "   git add ."
echo "   git commit -m \"Add new artwork: $TITLE\""
echo "   git push origin main"
echo ""
echo "The HTML snippet to add:"
echo "$HTML_SNIPPET"