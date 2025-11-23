# Quick Setup Guide

This guide will help you get your art portfolio up and running quickly.

## Initial Setup Checklist

### 1. Update Site Configuration

Edit `_config.yml`:

```yaml
# Update these fields
title: "Your Name"
subtitle: "Artist & Creator"
description: "Your portfolio description"
url: "https://www.yoursite.com"

# Update author information
author:
  name: "Your Name"
  avatar: "/assets/images/profile.jpg"
  bio: "Your artist bio"
  location: "Your Location"
```

### 2. Add Your Profile Image

- Place your profile photo at: `assets/images/profile.jpg`
- Recommended size: 300x300px square

### 3. Update About Page

Edit `_pages/about.md` with your:
- Artistic background
- Education and training
- Artistic philosophy
- Exhibitions and recognition
- Contact information

### 4. Add Your First Artwork

**Step 1:** Add images to `assets/images/artwork/`

**Step 2:** Create file `_artwork/my-first-piece.md`:

```markdown
---
title: "My First Piece"
date: 2024-11-23
image: /assets/images/artwork/my-first-piece.jpg
thumbnail: /assets/images/artwork/my-first-piece-thumb.jpg
medium: "Your Medium"
dimensions: "Size"
year: 2024
description: "Brief description"
---

Extended description and notes about the piece.
```

### 5. Customize Homepage

Edit `index.html`:
- Update hero image path
- Modify featured sections
- Adjust excerpt text

### 6. Update Navigation

Edit `_data/navigation.yml` to add/remove menu items.

## Image Preparation Tips

### Recommended Workflow

1. **Export from editing software**
   - Full resolution: 2000-3000px longest side
   - Format: JPG (quality 85-90%)
   - Color space: sRGB

2. **Create thumbnails**
   - Resize to 600px longest side
   - Same aspect ratio as original
   - Optimize for web

3. **Naming convention**
   ```
   artwork-title.jpg          # Full resolution
   artwork-title-thumb.jpg    # Thumbnail
   ```

### Batch Processing (Optional)

Using ImageMagick to create thumbnails:

```bash
# Install ImageMagick first
brew install imagemagick  # macOS

# Create thumbnails for all images
cd assets/images/artwork
for img in *.jpg; do
  convert "$img" -resize 600x600\> "${img%.jpg}-thumb.jpg"
done
```

## Testing Locally

1. **Install dependencies**
   ```bash
   bundle install
   ```

2. **Start local server**
   ```bash
   bundle exec jekyll serve --livereload
   ```

3. **Open browser**
   ```
   http://localhost:4000
   ```

4. **Make changes**
   - Edit files
   - Save
   - Browser auto-refreshes

## Deploying to GitHub Pages

### First Time Setup

1. **Create GitHub repository**
   - Name: `yourusername.github.io`
   - Public repository

2. **Push your code**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Source: Deploy from branch `main`
   - Save

4. **Wait for deployment**
   - Check Actions tab for build status
   - Site will be live at `https://yourusername.github.io`

### Custom Domain Setup (Optional)

1. **Update CNAME file**
   ```
   www.yourdomain.com
   ```

2. **Configure DNS**
   Add these records with your domain provider:
   ```
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   ```

3. **Enable HTTPS**
   - In GitHub Pages settings
   - Check "Enforce HTTPS"

## Common Tasks

### Adding Multiple Artworks

Create a script to generate templates:

```bash
#!/bin/bash
# save as: new-artwork.sh

TITLE="$1"
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
DATE=$(date +%Y-%m-%d)

cat > "_artwork/${DATE}-${SLUG}.md" << EOF
---
title: "${TITLE}"
date: ${DATE}
image: /assets/images/artwork/${SLUG}.jpg
thumbnail: /assets/images/artwork/${SLUG}-thumb.jpg
medium: ""
dimensions: ""
year: $(date +%Y)
description: ""
---

EOF

echo "Created: _artwork/${DATE}-${SLUG}.md"
```

Usage:
```bash
chmod +x new-artwork.sh
./new-artwork.sh "Sunset Dreams"
```

### Organizing by Year

Create subdirectories:
```
assets/images/artwork/
  ├── 2024/
  ├── 2023/
  └── 2022/
```

Update image paths in front matter:
```yaml
image: /assets/images/artwork/2024/piece-name.jpg
```

### Bulk Import

If you have many existing pieces:

1. Prepare a CSV with metadata
2. Use a script to generate markdown files
3. Batch process images for thumbnails
4. Commit all at once

## Next Steps

1. ✅ Complete initial setup
2. ✅ Add 3-5 pieces of artwork
3. ✅ Test locally
4. ✅ Deploy to GitHub Pages
5. ✅ Share your portfolio!

## Getting Help

- Check `README.md` for detailed documentation
- Review example artwork in `_artwork/` directory
- Inspect layout files in `_layouts/` for customization
- Test changes locally before deploying

## Maintenance

### Regular Updates

- Add new artwork as you create it
- Update About page with exhibitions/recognition
- Refresh homepage featured images seasonally
- Keep dependencies updated: `bundle update`

### Backup

- Repository is your backup (Git)
- Keep original high-res images separately
- Export site periodically: `bundle exec jekyll build`
