# Gallery Management Guide

## Adding New Artwork

### Quick Method (Recommended)
Use the automated script to process new artwork:

```bash
./add-artwork.sh "IMG_4000.jpg" "Sunset Dreams" "Oil Painting" "2025"
```

This will:
1. ✅ Copy the original to `assets/images/artwork/`
2. ✅ Generate a 400x300 thumbnail in `assets/images/thumbnails/`
3. ✅ Create HTML snippet for you to copy into `index.html`

### Manual Method
If you prefer to do it manually:

1. **Add Original Image:**
   ```bash
   cp your-image.jpg assets/images/artwork/
   ```

2. **Generate Thumbnail:**
   ```bash
   magick assets/images/artwork/your-image.jpg -resize 400x300^ -gravity center -extent 400x300 -background white -quality 90 assets/images/thumbnails/your-image.jpg
   ```

3. **Add HTML to index.html:**
   Add this block inside the `<div class="gallery-container">` section:
   ```html
   <div class="artwork-item" data-title="Your Title" data-medium="Your Medium" data-year="2025">
       <div class="artwork-image">
           <img src="assets/images/thumbnails/your-image.jpg" 
                data-full="assets/images/artwork/your-image.jpg"
                alt="Your Title">
       </div>
       <div class="artwork-info">
           <h3>Your Title</h3>
           <p class="medium">Your Medium</p>
           <p class="year">2025</p>
       </div>
   </div>
   ```

## Organizing Artwork

### Recommended Order
Place new artwork at the **top** of the gallery (after the opening `<div class="gallery-container">` tag) so it appears first.

### Supported Formats
- **Original Images:** JPG, PNG, HEIC
- **Thumbnails:** Always converted to JPG for consistency

### File Naming
- Keep original filenames for consistency
- Thumbnails automatically use same name as original (converted to .jpg)

## Deployment Process

After adding artwork:

1. **Commit Changes:**
   ```bash
   git add .
   git commit -m "Add new artwork: [Title]"
   ```

2. **Push to GitHub:**
   ```bash
   git push origin main
   ```

3. **Verify Deployment:**
   - GitHub Pages will automatically deploy
   - Check your live site in 2-3 minutes

## Gallery Features

### Image Protection
- ✅ **Thumbnails:** Clean, no watermarks for smooth browsing
- ✅ **Lightbox:** Full-size images get copyright watermarks dynamically
- ✅ **Right-click Protection:** Disabled on all images
- ✅ **Keyboard Shortcuts:** Blocked (Ctrl+S, etc.)

### Responsive Design
- ✅ **Desktop:** Grid layout with hover effects
- ✅ **Mobile:** Single column, touch-friendly
- ✅ **Thumbnails:** Consistent 400x300 aspect ratio

### Theme System
- 🌼 **Daisy Mode:** Deep lavender backgrounds (default)
- 🌸 **Lavender Mode:** Immersive lavender experience
- Toggle in top navigation

## Troubleshooting

### Missing Thumbnails
If thumbnails don't appear:
```bash
# Regenerate all thumbnails
./generate-clean-thumbnails.sh
```

### Build Failures
The `.nojekyll` file ensures GitHub Pages serves as static HTML. If builds fail:
1. Check HTML syntax in browser dev tools
2. Verify all image paths are correct
3. Ensure no Jekyll syntax remains in files

### Image Not Showing
1. Check file exists in both `artwork/` and `thumbnails/` folders
2. Verify HTML paths match actual filenames
3. Check browser console for 404 errors

## File Structure
```
assets/images/
├── artwork/          # Original high-res images
├── thumbnails/       # 400x300 thumbnails (auto-generated)
└── favicon.svg       # Site icon

css/
└── style.css         # All styles and themes

js/
├── gallery.js        # Lightbox and watermarking
├── theme.js          # Light/dark theme toggle
└── protection.js     # Image protection features
```