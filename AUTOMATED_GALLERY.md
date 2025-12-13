# Automated Gallery Management

## Overview
Your gallery now updates automatically using GitHub Actions! Simply add artwork files and the system handles everything else.

## How It Works

### 🕐 Nightly Updates
- **Schedule:** Every night at 2 AM UTC
- **Automatic:** Scans for new artwork and updates the gallery
- **Smart:** Only commits changes if new artwork is found

### 🎨 What Gets Automated
1. **Thumbnail Generation:** Creates 400x300 thumbnails for new artwork
2. **Gallery Updates:** Adds new pieces to the gallery automatically
3. **Metadata Creation:** Generates metadata files for artwork information
4. **Git Operations:** Commits and pushes changes automatically

## Adding New Artwork

### Simple Method (Recommended)
1. **Add your artwork file** to `assets/images/artwork/`
2. **Push to GitHub:**
   ```bash
   git add assets/images/artwork/your-new-image.jpg
   git commit -m "Add new artwork"
   git push
   ```
3. **Wait:** The next nightly run will automatically:
   - Generate thumbnails
   - Add to gallery
   - Create metadata file

### Advanced Method (Custom Metadata)
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

## Manual Trigger
You can trigger the gallery update manually without waiting for the nightly run:

1. Go to your GitHub repository
2. Click **Actions** tab
3. Select **Update Gallery Nightly**
4. Click **Run workflow**

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

## Default Behavior

If no metadata file exists, the system will:
- **Title:** "Artwork X" (numbered automatically)
- **Medium:** "Mixed Media"
- **Year:** "2024"
- **Create:** A metadata file you can edit later

## Supported Formats

- **Artwork:** JPG, JPEG, PNG, HEIC
- **Thumbnails:** Always converted to JPG for web optimization
- **Metadata:** Markdown files with YAML frontmatter

## Gallery Order

Artwork appears in the gallery based on:
1. **Filename order** (newest first)
2. **Alphabetical sorting** of filenames
3. **Most recent** artwork appears at the top

## Troubleshooting

### Gallery Not Updating
1. Check the **Actions** tab for workflow status
2. Ensure artwork files are in `assets/images/artwork/`
3. Verify file formats are supported (JPG, PNG, HEIC)

### Missing Thumbnails
The workflow will automatically generate missing thumbnails on the next run.

### Incorrect Metadata
1. Edit the corresponding `.md` file in `_artwork/`
2. Push changes to trigger update
3. Or wait for next nightly run

### Manual Override
If you need to bypass automation:
1. Edit `index.html` directly
2. The next automated run will preserve manual changes if the gallery markers are intact

## Benefits

✅ **Hands-off Publishing:** Just add files and push  
✅ **Consistent Quality:** Automated thumbnail generation  
✅ **No Manual HTML:** Gallery updates automatically  
✅ **Metadata Management:** Optional detailed artwork information  
✅ **Version Control:** All changes tracked in Git  
✅ **Reliable Schedule:** Never forget to update the gallery  

## Migration from Manual System

Your existing gallery will continue to work. The automation will:
- Preserve existing artwork
- Generate any missing thumbnails
- Create metadata files for existing pieces
- Maintain the same gallery structure and styling