# Addyson Rinehart - Art Portfolio

A custom Jekyll-based art portfolio and virtual gallery showcasing original artwork by Addyson Rinehart.

## Overview

This site is built with Jekyll and uses a custom gallery structure optimized for visual presentation of artwork. The design focuses on clean, minimal layouts that let the art take center stage.

## Features

- **Custom Gallery System**: Collection-based organization for artwork (not blog posts)
- **Series Support**: Group related works into themed series
- **Responsive Grid Layouts**: Mobile-friendly masonry-style galleries
- **Individual Artwork Pages**: Full-width hero images with detailed metadata
- **Dark Theme**: Optimized for visual impact
- **Fast & Static**: GitHub Pages compatible

## Project Structure

```
├── _artwork/           # Individual artwork entries (collection)
├── _series/            # Series/collection pages
├── _pages/             # Static pages (About, Gallery)
├── _layouts/           # Custom layouts (artwork, gallery, series)
├── assets/
│   ├── css/           # Custom gallery styles
│   └── images/        # Artwork images and thumbnails
├── _config.yml        # Site configuration
└── index.html         # Homepage
```

## Local Development Setup

### Prerequisites

- Ruby 2.7 or higher
- Bundler gem
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/[username]/purpleduchess.github.io.git
   cd purpleduchess.github.io
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Run local server**
   ```bash
   bundle exec jekyll serve
   ```

4. **View in browser**
   Navigate to `http://localhost:4000`

### Development Commands

```bash
# Serve with live reload
bundle exec jekyll serve --livereload

# Build site (output to _site/)
bundle exec jekyll build

# Serve with drafts visible
bundle exec jekyll serve --drafts
```

## Adding New Artwork

### Step 1: Prepare Images

Place your artwork images in `assets/images/artwork/`:
- Full resolution image: `artwork-name.jpg`
- Thumbnail (optional): `artwork-name-thumb.jpg`

Recommended sizes:
- Full image: 2000px on longest side
- Thumbnail: 600px on longest side

### Step 2: Create Artwork Entry

Create a new file in `_artwork/` directory:

```markdown
---
title: "Your Artwork Title"
date: 2024-11-23
image: /assets/images/artwork/your-image.jpg
thumbnail: /assets/images/artwork/your-image-thumb.jpg
medium: "Acrylic on Canvas"
dimensions: "24\" x 36\""
year: 2024
series: "Series Name"  # Optional - links to series page
description: "Brief description of the piece"
---

Extended description and artist notes go here. This content appears
below the artwork image on the detail page.

You can use **markdown** formatting for emphasis, lists, etc.
```

### Step 3: Commit and Push

```bash
git add _artwork/your-new-piece.md assets/images/artwork/
git commit -m "Add new artwork: Your Artwork Title"
git push origin main
```

GitHub Pages will automatically rebuild and deploy your site.

## Creating a New Series

Create a file in `_series/` directory:

```markdown
---
title: "Series Name"
layout: series
description: "Brief description of the series theme"
---

Extended description of the series, your inspiration, techniques used, etc.

This content appears at the top of the series page, above the gallery
of all artwork tagged with this series name.
```

Then tag artwork with the series name in their front matter:
```yaml
series: "Series Name"
```

## Customization

### Site Configuration

Edit `_config.yml` to update:
- Site title and description
- Author information
- Social media links
- Navigation menu

### Styling

Custom gallery styles are in `assets/css/main.scss`. Key variables:
- Grid column width: `minmax(300px, 1fr)`
- Gallery item height: `400px`
- Spacing and gaps: `2rem`

### Navigation

Edit `_data/navigation.yml` to modify the main menu.

## Deployment

This site is configured for GitHub Pages deployment:

1. **Repository Settings**
   - Go to repository Settings > Pages
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`

2. **Custom Domain**
   - Domain configured in `CNAME` file: `www.purpleduchess.com`
   - Configure DNS with your domain provider

3. **Automatic Deployment**
   - Every push to `main` branch triggers rebuild
   - Site updates in 1-2 minutes

## File Organization Best Practices

### Artwork Files
- Use descriptive filenames: `sunset-dreams.jpg` not `img001.jpg`
- Keep consistent naming between full and thumbnail images
- Organize by year or series in subdirectories if needed

### Metadata
- Always include: title, date, image, medium
- Optional but recommended: dimensions, year, series, description
- Use consistent formatting for dimensions (e.g., `24" x 36"`)

## Troubleshooting

### Site not building
- Check GitHub Actions tab for build errors
- Validate YAML front matter syntax
- Ensure all image paths are correct

### Images not displaying
- Verify image paths start with `/assets/`
- Check file extensions match (case-sensitive)
- Ensure images are committed to repository

### Styles not applying
- Clear browser cache
- Check for SCSS syntax errors in `assets/css/main.scss`
- Verify Jekyll build completed successfully

## Support & Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## License

Site code: MIT License
Artwork: © Addyson Rinehart - All Rights Reserved
