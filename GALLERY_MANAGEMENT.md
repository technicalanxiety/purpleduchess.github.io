# Gallery Management Guide

## Overview
Your gallery updates automatically using GitHub Actions! Simply add artwork files and the system handles everything else.

## 🤖 Automated Publishing (Recommended)

### 🕐 How It Works
- **Schedule:** Every night at 2 AM UTC
- **Automatic:** Scans for new artwork and updates the gallery
- **Smart:** Only commits changes if new artwork is found

### 🎨 What Gets Automated
1. **Thumbnail Generation:** Creates 400x300 thumbnails for new artwork
2. **Gallery Updates:** Adds new pieces to the gallery automatically
3. **Metadata Creation:** Generates metadata files for artwork information
4. **Git Operations:** Commits and pushes changes automatically

## Adding New Artwork

### Simple Method (Recommended) - No .md files needed!
1. **Add your artwork file** to `assets/images/artwork/`
2. **Push to GitHub:**
   ```bash
   git add assets/images/artwork/your-new-image.jpg
   git commit -m "Add new artwork"
   git push
   ```
3. **Wait:** The next nightly run will automatically:
   - Generate thumbnails
   - Add to gallery with default title "Artwork X"
   - Create a `.md` template file you can customize later

**Result:** Shows as "Artwork 14", "Mixed Media", "2024" (you can edit the auto-generated `.md` file later)

### Advanced Method (Custom Metadata) - For specific titles/descriptions
1. **Add artwork file** to `assets/images/artwork/`
2. **Create metadata file** in `_artwork/` with same name:
   ```markdown
   ---
   title: Sunset Dreams
   medium: Oil Painting
   year: 2025
   date: 2025-01-15
   ---

   # Sunset Dreams

   **Medium:** Oil Painting  
   **Year:** 2025

   A beautiful landscape capturing the golden hour with warm, flowing brushstrokes.
   ```
3. **Push both files:**
   ```bash
   git add assets/images/artwork/IMG_4000.jpg _artwork/IMG_4000.md
   git commit -m "Add new artwork: Sunset Dreams"
   git push
   ```

**Result:** Shows as "Sunset Dreams", "Oil Painting", "2025" with your custom information

### Manual Trigger
Don't want to wait for nightly automation? Trigger manually:

1. Go to your GitHub repository
2. Click **Actions** tab
3. Select **Update Gallery Nightly**
4. Click **Run workflow**

## 🛠️ Manual Methods (Alternative)

### Using the Script (Semi-Automated)
```bash
./add-artwork.sh "IMG_4000.jpg" "Sunset Dreams" "Oil Painting" "2025"
```

This will:
1. ✅ Copy the original to `assets/images/artwork/`
2. ✅ Generate a 400x300 thumbnail in `assets/images/thumbnails/`
3. ✅ Create HTML snippet for you to copy into `index.html`

### Completely Manual Process
If you prefer full control:

1. **Add Original Image:**
   ```bash
   cp your-image.jpg assets/images/artwork/
   ```

2. **Generate Thumbnail:**
   ```bash
   magick assets/images/artwork/your-image.jpg -resize 400x300^ -gravity center -extent 400x300 -background white -quality 90 assets/images/thumbnails/your-image.jpg
   ```

3. **Add HTML to index.html:**
   Add this block between the `<!-- GALLERY_START -->` and `<!-- GALLERY_END -->` markers:
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

## File Structure

```
assets/images/
├── artwork/              # Add new artwork here
│   ├── IMG_5367.jpg     # Original high-res images
│   └── IMG_4000.jpg     # New artwork files
└── thumbnails/          # Auto-generated thumbnails
    ├── IMG_5367.jpg     # 400x300 thumbnails
    └── IMG_4000.jpg     # Created automatically

_artwork/                # Metadata files (optional)
├── IMG_5367.md         # Artwork information
└── IMG_4000.md         # Title, medium, year, description

.github/workflows/
└── update-gallery.yml  # Automation configuration

css/
└── style.css           # All styles and themes

js/
├── gallery.js          # Lightbox and watermarking
├── theme.js            # Theme toggle system
└── protection.js       # Image protection features
```

## Metadata Format

Create `.md` files in `_artwork/` to customize artwork information:

```markdown
---
title: Your Artwork Title
medium: Oil Painting | Acrylic Painting | Mixed Media | Digital Art | Charcoal Drawing
year: 2025
date: 2025-01-15
---

# Your Artwork Title

**Medium:** Oil Painting  
**Year:** 2025

Optional description of the artwork, inspiration, techniques used, etc.
```

## Default Behavior (No .md file needed!)

**You don't need to create `.md` files for every artwork!** The system works perfectly without them.

If no metadata file exists, the system will automatically:
- **Title:** "Artwork X" (numbered automatically based on total count)
- **Medium:** "Mixed Media" (safe default)
- **Year:** "2024" (current default)
- **Create:** A `.md` file template you can edit later if desired

**This means you can simply:**
1. Drop image files in `assets/images/artwork/`
2. Push to GitHub
3. Done! Everything else is automatic

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

## Supported Formats

- **Artwork:** JPG, JPEG, PNG, HEIC
- **Thumbnails:** Always converted to JPG for web optimization
- **Metadata:** Markdown files with YAML frontmatter

## Gallery Order

Artwork appears in the gallery based on:
1. **Filename order** (newest first)
2. **Alphabetical sorting** of filenames
3. **Most recent** artwork appears at the top

## Deployment Process

After adding artwork (manual methods):

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

## Troubleshooting

### Gallery Not Updating
1. Check the **Actions** tab for workflow status
2. Ensure artwork files are in `assets/images/artwork/`
3. Verify file formats are supported (JPG, PNG, HEIC)

### Missing Thumbnails
- **Automated:** The workflow will generate missing thumbnails on the next run
- **Manual:** Run `./generate-clean-thumbnails.sh` if it exists

### Incorrect Metadata
1. Edit the corresponding `.md` file in `_artwork/`
2. Push changes to trigger update
3. Or wait for next nightly run

### Build Failures
The `.nojekyll` file ensures GitHub Pages serves as static HTML. If builds fail:
1. Check HTML syntax in browser dev tools
2. Verify all image paths are correct
3. Ensure no Jekyll syntax remains in files

### Image Not Showing
1. Check file exists in both `artwork/` and `thumbnails/` folders
2. Verify HTML paths match actual filenames
3. Check browser console for 404 errors

### Manual Override
If you need to bypass automation:
1. Edit `index.html` directly between the gallery markers
2. The next automated run will preserve manual changes if the gallery markers are intact

## Benefits

✅ **Hands-off Publishing:** Just add files and push  
✅ **Consistent Quality:** Automated thumbnail generation  
✅ **No Manual HTML:** Gallery updates automatically  
✅ **Metadata Management:** Optional detailed artwork information  
✅ **Version Control:** All changes tracked in Git  
✅ **Reliable Schedule:** Never forget to update the gallery  

## Frequently Asked Questions

### Do I need to create .md files for every artwork?
**No!** The `.md` files are completely optional. Just add image files and the system creates everything automatically with sensible defaults.

### What happens if I don't create a .md file?
The artwork will appear with:
- Title: "Artwork X" (auto-numbered)
- Medium: "Mixed Media" 
- Year: "2024"
- The system creates a `.md` template you can edit later

### Can I customize the title and medium later?
**Yes!** Edit the auto-generated `.md` file in `_artwork/` folder anytime. The next automation run will use your changes.

### What's the easiest workflow?
1. Drop images in `assets/images/artwork/`
2. Push to GitHub
3. Done! Edit titles later if needed

### Should I use automation or manual methods?
**Automation is recommended** for most users. Use manual methods only if you need immediate updates or want full control over the HTML structure.

## Migration from Manual System

Your existing gallery will continue to work. The automation will:
- Preserve existing artwork
- Generate any missing thumbnails
- Create metadata files for existing pieces
- Maintain the same gallery structure and styling