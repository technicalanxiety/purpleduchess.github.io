# Example: Adding New Artwork

## Scenario
You just finished a new oil painting and want to add it to your gallery.

## Step-by-Step Process

### 1. Prepare Your Image
- Save your artwork photo as `IMG_4000.jpg` in the project folder
- Make sure it's high quality (the original will be used for lightbox)

### 2. Run the Script
```bash
./add-artwork.sh "IMG_4000.jpg" "Moonlit Garden" "Oil Painting" "2025"
```

### 3. Script Output
```
Adding new artwork: Moonlit Garden
File: IMG_4000.jpg
Medium: Oil Painting
Year: 2025

1. Copying original to artwork folder...
   ✓ Copied to assets/images/artwork/IMG_4000.jpg
2. Generating thumbnail...
   ✓ Created thumbnail: assets/images/thumbnails/IMG_4000.jpg
3. Generating HTML snippet...
   ✓ HTML snippet saved to: new-artwork-snippet.html

🎨 Artwork processing complete!

Next steps:
1. Copy the HTML snippet from 'new-artwork-snippet.html'
2. Add it to index.html in the gallery-container section
3. Commit and push changes
```

### 4. Add to Gallery
Open `index.html` and add the generated HTML snippet at the **top** of the gallery (right after `<div class="gallery-container">`):

```html
<div class="gallery-container">
    <!-- ADD NEW ARTWORK HERE (at the top) -->
    <div class="artwork-item" data-title="Moonlit Garden" data-medium="Oil Painting" data-year="2025">
        <div class="artwork-image">
            <img src="assets/images/thumbnails/IMG_4000.jpg" 
                 data-full="assets/images/artwork/IMG_4000.jpg"
                 alt="Moonlit Garden">
        </div>
        <div class="artwork-info">
            <h3>Moonlit Garden</h3>
            <p class="medium">Oil Painting</p>
            <p class="year">2025</p>
        </div>
    </div>
    
    <!-- Existing artworks below... -->
```

### 5. Deploy
```bash
git add .
git commit -m "Add new artwork: Moonlit Garden"
git push origin main
```

### 6. Verify
- Visit your live site in 2-3 minutes
- Your new artwork should appear first in the gallery
- Click it to verify the lightbox and watermarking work

## Tips
- **Always add new artwork at the top** so it appears first
- **Use descriptive titles** that reflect the piece
- **Be consistent with medium names** (Oil Painting, Acrylic Painting, etc.)
- **Clean up** the `new-artwork-snippet.html` file after use