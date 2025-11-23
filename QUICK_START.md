# Quick Start - Your Artwork is Ready!

## Current Status

✓ **13 artwork images** converted and organized in `assets/images/artwork/`
✓ **Gallery system** fully configured
✓ **Custom layouts** ready for use
✓ **Example artwork** entries as templates

## Your Images

All images have been moved to the correct location and HEIC files converted to JPG:

```
assets/images/artwork/
├── 761156456.233401.jpg
├── IMG_2266.jpg
├── IMG_2560.jpg
├── IMG_2572.png
├── IMG_2954.jpg
├── IMG_3020.jpg
├── IMG_3245.jpg
├── IMG_3934.jpg
├── IMG_3935.jpg
├── IMG_3936.jpg
├── IMG_3938.jpg
├── IMG_3943.jpg
└── IMG_5367.jpg
```

## Next Steps (Choose Your Approach)

### Option A: Quick & Simple (Recommended to Start)

1. **Rename one image** with a descriptive name:
   ```bash
   cd assets/images/artwork
   mv IMG_2266.jpg sunset-painting.jpg
   ```

2. **Create artwork entry** using the helper script:
   ```bash
   ./new-artwork.sh "Sunset Painting"
   ```

3. **Edit the generated file** `_artwork/2024-11-23-sunset-painting.md`:
   - Add medium (e.g., "Acrylic on Canvas")
   - Add dimensions (e.g., "24\" x 36\"")
   - Add description
   - Update image path to match renamed file

4. **Test locally**:
   ```bash
   bundle exec jekyll serve
   ```
   Open: http://localhost:4000

5. **Repeat** for 2-3 more pieces to see the gallery in action

### Option B: Batch Process All Images

1. **Create a renaming plan** - decide on descriptive names for each image
   
2. **Rename all images** at once:
   ```bash
   cd assets/images/artwork
   mv IMG_2266.jpg piece-name-1.jpg
   mv IMG_2560.jpg piece-name-2.jpg
   # ... etc
   ```

3. **Generate all artwork entries**:
   ```bash
   ./new-artwork.sh "Piece Name 1"
   ./new-artwork.sh "Piece Name 2"
   # ... etc
   ```

4. **Batch edit** all markdown files in `_artwork/` to add metadata

## Example Workflow (Step by Step)

Let's say you want to add "Urban Landscape" as your first piece:

```bash
# 1. Rename the image
cd assets/images/artwork
mv IMG_2266.jpg urban-landscape.jpg
cd ../..

# 2. Create the artwork entry
./new-artwork.sh "Urban Landscape"

# 3. Edit the file (opens in your default editor)
# File: _artwork/2024-11-23-urban-landscape.md
```

Edit to look like this:
```markdown
---
title: "Urban Landscape"
date: 2024-11-23
image: /assets/images/artwork/urban-landscape.jpg
thumbnail: /assets/images/artwork/urban-landscape.jpg
medium: "Mixed Media"
dimensions: "18\" x 24\""
year: 2024
series: ""
description: "A vibrant exploration of city textures and colors"
---

This piece captures the energy of urban environments through
layered textures and bold color choices. Created using a combination
of acrylic paint and collage elements.
```

```bash
# 4. Test it
bundle exec jekyll serve

# 5. View in browser
# Go to: http://localhost:4000/gallery/
```

## Image Optimization (Optional but Recommended)

Your images might be large. To optimize them:

### Using sips (built-in macOS):
```bash
cd assets/images/artwork

# Resize to max 2000px and optimize
for img in *.jpg; do
  sips -Z 2000 "$img" --out "${img%.jpg}-optimized.jpg"
done
```

### Or use online tools:
- https://tinyjpg.com/ (drag and drop)
- https://squoosh.app/ (more control)

## Cleaning Up

Remove the example artwork entries when ready:
```bash
rm _artwork/example-piece-*.md
```

## Testing Checklist

Before deploying, verify:

- [ ] At least 3-5 artwork pieces added
- [ ] Images display correctly in gallery grid
- [ ] Individual artwork pages load properly
- [ ] Navigation works (Gallery → Artwork → Back)
- [ ] Mobile view looks good (test in browser dev tools)
- [ ] About page updated with your info
- [ ] Homepage displays latest artwork

## Deploy to GitHub Pages

Once you're happy with the local preview:

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Add artwork gallery with initial pieces"

# Push to GitHub
git push origin main
```

GitHub Pages will automatically build and deploy your site in 1-2 minutes.

## Troubleshooting

### Images not showing in gallery
- Check image path starts with `/assets/`
- Verify filename matches exactly (case-sensitive)
- Ensure markdown file is in `_artwork/` directory

### Gallery looks empty
- Make sure you have `.md` files in `_artwork/`
- Check front matter has required fields (title, date, image)
- Look for YAML syntax errors

### Site won't build locally
- Run `bundle install` first
- Check for syntax errors in `_config.yml`
- Verify all front matter is valid YAML

## Quick Commands Reference

```bash
# Create new artwork entry
./new-artwork.sh "Artwork Title"

# Start local server
bundle exec jekyll serve

# Start with live reload
bundle exec jekyll serve --livereload

# Build site (output to _site/)
bundle exec jekyll build

# List all artwork files
ls -l _artwork/

# List all images
ls -l assets/images/artwork/
```

## What's Next?

1. **Add your artwork** (start with 3-5 pieces)
2. **Update About page** with your bio
3. **Test locally** to ensure everything works
4. **Deploy** to GitHub Pages
5. **Share** your portfolio!

Optional enhancements:
- Create series for related works
- Add more detailed descriptions
- Optimize all images for web
- Customize colors/styling
- Add social media links

## Need Help?

- See `README.md` for detailed documentation
- Check `IMAGE_GUIDE.md` for image preparation tips
- Review `GALLERY_SYSTEM.md` for technical details
- Look at example files in `_artwork/` for reference
