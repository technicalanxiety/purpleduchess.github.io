# Image Preparation Guide for Art Portfolio

This guide covers best practices for preparing artwork images for web display while maintaining visual quality.

## Image Requirements

### Full Resolution Images
- **Purpose**: Main artwork display on detail pages
- **Size**: 2000-3000px on longest side
- **Format**: JPG
- **Quality**: 85-90%
- **Color Space**: sRGB
- **File Size Target**: 200-800KB

### Thumbnails
- **Purpose**: Gallery grid display
- **Size**: 600px on longest side
- **Format**: JPG
- **Quality**: 80-85%
- **Color Space**: sRGB
- **File Size Target**: 50-150KB

## Naming Convention

Use descriptive, URL-friendly names:

```
✓ Good:
  sunset-dreams.jpg
  sunset-dreams-thumb.jpg
  urban-fragments-2024.jpg
  urban-fragments-2024-thumb.jpg

✗ Avoid:
  IMG_1234.jpg
  photo.jpg
  my artwork (1).jpg
```

## Export Settings by Software

### Photoshop

**Full Resolution:**
1. File > Export > Export As
2. Format: JPEG
3. Quality: 85-90%
4. Convert to sRGB: ✓
5. Resize: Longest side 2000-3000px
6. Metadata: Copyright only

**Thumbnail:**
1. Image > Image Size
2. Longest side: 600px
3. Resample: Bicubic Sharper
4. File > Export > Export As
5. Quality: 80-85%

### Lightroom

**Export Preset:**
```
Image Format: JPEG
Quality: 85
Color Space: sRGB
Resize to Fit: Long Edge
Long Edge: 2000 pixels
Resolution: 72 ppi
Sharpen For: Screen, Standard
```

**For Thumbnails:**
- Same settings but Long Edge: 600 pixels

### GIMP (Free Alternative)

**Full Resolution:**
1. Image > Scale Image
2. Width/Height: 2000px longest side
3. Interpolation: Cubic
4. File > Export As
5. Quality: 85-90%

**Thumbnail:**
1. Image > Scale Image
2. Width/Height: 600px longest side
3. File > Export As
4. Quality: 80-85%

## Command Line Tools

### ImageMagick (Recommended for Batch Processing)

**Install:**
```bash
# macOS
brew install imagemagick

# Ubuntu/Debian
sudo apt-get install imagemagick

# Windows
# Download from: https://imagemagick.org/script/download.php
```

**Single Image:**
```bash
# Create optimized full resolution
convert original.jpg -resize 2000x2000\> -quality 85 -colorspace sRGB artwork-name.jpg

# Create thumbnail
convert original.jpg -resize 600x600\> -quality 80 -colorspace sRGB artwork-name-thumb.jpg
```

**Batch Process All Images:**
```bash
#!/bin/bash
# Save as: process-images.sh

# Process all images in current directory
for img in *.jpg *.JPG *.jpeg *.JPEG; do
  # Skip if file doesn't exist (handles no match case)
  [ -f "$img" ] || continue
  
  # Get base name without extension
  base="${img%.*}"
  
  # Create URL-friendly name
  name=$(echo "$base" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
  
  # Create full resolution version
  convert "$img" -resize 2000x2000\> -quality 85 -colorspace sRGB "${name}.jpg"
  
  # Create thumbnail
  convert "$img" -resize 600x600\> -quality 80 -colorspace sRGB "${name}-thumb.jpg"
  
  echo "Processed: ${name}.jpg and ${name}-thumb.jpg"
done
```

Usage:
```bash
chmod +x process-images.sh
cd /path/to/your/images
./process-images.sh
```

### Using Python (PIL/Pillow)

**Install:**
```bash
pip install Pillow
```

**Script:**
```python
#!/usr/bin/env python3
"""
Batch process artwork images for web display
Creates optimized full-res and thumbnail versions
"""

from PIL import Image
import os
import sys

def process_image(input_path, output_dir="processed"):
    """
    Process a single image to create web-optimized versions
    
    Args:
        input_path: Path to original image file
        output_dir: Directory for processed images
    """
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Open and convert to RGB (handles RGBA, grayscale, etc.)
    img = Image.open(input_path).convert('RGB')
    
    # Get base filename without extension
    base_name = os.path.splitext(os.path.basename(input_path))[0]
    base_name = base_name.lower().replace(' ', '-')
    
    # Create full resolution version (max 2000px)
    img_full = img.copy()
    img_full.thumbnail((2000, 2000), Image.Resampling.LANCZOS)
    full_path = os.path.join(output_dir, f"{base_name}.jpg")
    img_full.save(full_path, 'JPEG', quality=85, optimize=True)
    print(f"Created: {full_path}")
    
    # Create thumbnail (max 600px)
    img_thumb = img.copy()
    img_thumb.thumbnail((600, 600), Image.Resampling.LANCZOS)
    thumb_path = os.path.join(output_dir, f"{base_name}-thumb.jpg")
    img_thumb.save(thumb_path, 'JPEG', quality=80, optimize=True)
    print(f"Created: {thumb_path}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python process_images.py image1.jpg [image2.jpg ...]")
        sys.exit(1)
    
    for image_path in sys.argv[1:]:
        if os.path.exists(image_path):
            process_image(image_path)
        else:
            print(f"File not found: {image_path}")
```

Usage:
```bash
python process_images.py *.jpg
```

## Quality Checklist

Before uploading images, verify:

- [ ] Image is sharp and in focus
- [ ] Colors look accurate (not oversaturated)
- [ ] File size is reasonable (< 1MB for full, < 200KB for thumb)
- [ ] Aspect ratio is preserved (no distortion)
- [ ] Filename is descriptive and URL-friendly
- [ ] Both full and thumbnail versions created
- [ ] Images display correctly in browser

## Color Management

### Why sRGB?

Web browsers expect sRGB color space. Using other color spaces (Adobe RGB, ProPhoto RGB) can cause colors to appear dull or incorrect.

### Converting to sRGB

**Photoshop:**
- Edit > Convert to Profile
- Destination: sRGB IEC61966-2.1

**GIMP:**
- Image > Mode > Assign Color Profile
- Select: sRGB

**ImageMagick:**
```bash
convert input.jpg -colorspace sRGB output.jpg
```

## Aspect Ratios

The gallery grid works best with:
- **Portrait**: 2:3, 3:4, 4:5
- **Landscape**: 3:2, 4:3, 16:9
- **Square**: 1:1

Extreme aspect ratios (very wide or very tall) may not display optimally in the grid layout.

## File Organization

Recommended structure:
```
assets/images/artwork/
├── 2024/
│   ├── piece-name.jpg
│   ├── piece-name-thumb.jpg
│   ├── another-piece.jpg
│   └── another-piece-thumb.jpg
├── 2023/
│   └── ...
└── series-name/
    └── ...
```

Or keep flat:
```
assets/images/artwork/
├── piece-name.jpg
├── piece-name-thumb.jpg
├── another-piece.jpg
└── another-piece-thumb.jpg
```

## Performance Tips

1. **Lazy Loading**: Images load as user scrolls (built into modern browsers)
2. **Compression**: Use tools like [TinyJPG](https://tinyjpg.com/) for additional compression
3. **CDN**: Consider using a CDN for faster global delivery (optional)
4. **WebP Format**: Modern format with better compression (requires additional setup)

## Troubleshooting

### Images appear dull or wrong colors
- Convert to sRGB color space
- Check monitor calibration

### File sizes too large
- Reduce quality setting (try 75-80%)
- Reduce dimensions slightly
- Use additional compression tools

### Images appear pixelated
- Increase source resolution
- Check resize algorithm (use Lanczos/Bicubic)
- Verify quality setting isn't too low

### Thumbnails look blurry
- Sharpen slightly after resizing
- Increase quality to 85%
- Use better resize algorithm

## Resources

- [ImageMagick Documentation](https://imagemagick.org/index.php)
- [Pillow Documentation](https://pillow.readthedocs.io/)
- [TinyJPG](https://tinyjpg.com/) - Online compression
- [Squoosh](https://squoosh.app/) - Online image optimizer
