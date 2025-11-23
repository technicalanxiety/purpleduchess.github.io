#!/bin/bash

#
# Script to organize artwork files into proper structure
# Moves images to assets/images/artwork/
# Converts HEIC to JPG
# Creates markdown templates for each image
#

echo "Organizing artwork files..."
echo ""

# Create necessary directories
mkdir -p assets/images/artwork
mkdir -p _artwork_temp

# Counter for processed files
count=0

# Process each image file in _artwork directory
for file in _artwork/*.{jpeg,JPEG,jpg,JPG,png,PNG,heic,HEIC}; do
  # Skip if no files match
  [ -f "$file" ] || continue
  
  # Get filename without path
  filename=$(basename "$file")
  base="${filename%.*}"
  ext="${filename##*.}"
  
  # Convert to lowercase extension
  ext_lower=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
  
  echo "Processing: $filename"
  
  # Handle HEIC files (need conversion)
  if [ "$ext_lower" = "heic" ]; then
    echo "  ⚠ HEIC file detected - needs conversion to JPG"
    echo "  Please convert $filename to JPG format"
    echo "  Recommended tools:"
    echo "    - macOS: Open in Preview, Export as JPEG"
    echo "    - Online: https://heictojpg.com/"
    echo "    - Command line: brew install imagemagick && magick convert '$file' 'assets/images/artwork/${base}.jpg'"
    echo ""
    continue
  fi
  
  # Move image to proper location
  if [ "$ext_lower" = "jpeg" ] || [ "$ext_lower" = "jpg" ]; then
    mv "$file" "assets/images/artwork/${base}.jpg"
    echo "  ✓ Moved to: assets/images/artwork/${base}.jpg"
  elif [ "$ext_lower" = "png" ]; then
    mv "$file" "assets/images/artwork/${base}.png"
    echo "  ✓ Moved to: assets/images/artwork/${base}.png"
  fi
  
  count=$((count + 1))
  echo ""
done

echo "================================"
echo "Summary:"
echo "  Processed: $count files"
echo ""
echo "Next steps:"
echo "1. Convert any HEIC files to JPG"
echo "2. Rename images with descriptive names (not IMG_xxxx)"
echo "3. Run: ./new-artwork.sh \"Artwork Title\" for each piece"
echo "4. Optimize images (see IMAGE_GUIDE.md)"
