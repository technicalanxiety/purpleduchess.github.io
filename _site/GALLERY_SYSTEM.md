# Custom Gallery System Documentation

## Overview

This portfolio uses a custom-built gallery system optimized for showcasing artwork, designed specifically for artists and creators.

## Architecture

### Collections vs Posts

**Traditional Blog Approach (Avoided):**
- Date-based organization
- Chronological display
- Blog-focused features (reading time, comments, etc.)

**Custom Gallery Approach (Implemented):**
- Collection-based organization
- Flexible categorization by series/medium
- Visual-first presentation
- Timeless content structure

### Core Components

#### 1. Collections (_config.yml)

Two custom collections replace traditional posts:

```yaml
collections:
  artwork:
    output: true
    permalink: /gallery/:name/
  series:
    output: true
    permalink: /series/:name/
```

**Artwork Collection:**
- Individual pieces of art
- Each gets its own detail page
- Organized by metadata, not dates

**Series Collection:**
- Themed groups of related work
- Gallery pages showing all pieces in a series
- Flexible organization

#### 2. Custom Layouts

**artwork.html**
- Full-width hero image display
- Metadata section (medium, dimensions, year)
- Extended description area
- Series linking
- Navigation back to gallery

**gallery.html**
- Responsive grid layout
- Hover effects with overlays
- Thumbnail display
- Filtering capability

**series.html**
- Series description header
- Grid of all artwork in series
- Consistent with gallery layout

#### 3. Custom Styling (assets/css/main.scss)

**Gallery Grid:**
- CSS Grid layout
- Responsive breakpoints
- Auto-fill columns based on viewport
- Consistent spacing

**Gallery Items:**
- Card-based design
- Hover effects (lift and shadow)
- Image overlay with metadata
- Smooth transitions

**Artwork Detail:**
- Full-width hero section
- Centered content area
- Metadata display cards
- Mobile-responsive

## Data Structure

### Artwork Entry Front Matter

```yaml
---
title: "Artwork Title"           # Required: Display name
date: 2024-11-23                 # Required: For sorting
image: /assets/images/...        # Required: Full resolution
thumbnail: /assets/images/...    # Optional: Grid display
medium: "Acrylic on Canvas"      # Optional: Art medium
dimensions: "24\" x 36\""        # Optional: Physical size
year: 2024                       # Optional: Creation year
series: "Series Name"            # Optional: Links to series
description: "Brief desc"        # Optional: Short description
---

Extended content goes here...
```

### Series Entry Front Matter

```yaml
---
title: "Series Name"             # Required: Series identifier
layout: series                   # Required: Use series layout
description: "Brief desc"        # Optional: Series summary
---

Extended series description...
```

## How It Works

### Adding Artwork

1. **Create markdown file** in `_artwork/`
2. **Add front matter** with metadata
3. **Place images** in `assets/images/artwork/`
4. **Jekyll processes** and creates:
   - Individual artwork page at `/gallery/artwork-name/`
   - Thumbnail in gallery grid
   - Series association (if specified)

### Gallery Display

1. **Gallery page** (`_pages/gallery.md`) uses `gallery` layout
2. **Layout queries** all items in `site.artwork` collection
3. **Generates grid** with thumbnails
4. **Links** to individual artwork pages

### Series Grouping

1. **Artwork tagged** with `series: "Name"`
2. **Series page** queries artwork with matching series
3. **Displays filtered** gallery of series pieces
4. **Maintains** same visual style as main gallery

## Responsive Behavior

### Desktop (> 768px)
- 3-4 columns in gallery grid
- Hover effects show metadata overlay
- Full-width artwork images

### Tablet (768px - 480px)
- 2-3 columns in gallery grid
- Overlay always visible
- Optimized image sizes

### Mobile (< 480px)
- Single column layout
- Touch-friendly spacing
- Metadata always visible
- Simplified navigation

## Customization Points

### Grid Layout

Adjust column width in `assets/css/main.scss`:
```scss
.gallery-grid {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  // Change 300px to adjust minimum column width
}
```

### Thumbnail Height

Adjust in `assets/css/main.scss`:
```scss
.gallery-thumbnail {
  height: 400px;  // Change this value
  object-fit: cover;
}
```

### Hover Effects

Modify transitions and transforms:
```scss
.gallery-item {
  &:hover {
    transform: translateY(-5px);  // Lift amount
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);  // Shadow
  }
}
```

### Color Scheme

Theme uses the custom "purple-duchess" skin. Change in `_config.yml`:
```yaml
minimal_mistakes_skin: "purple-duchess"  # Custom dark purple theme
```

## Performance Considerations

### Image Loading
- Browser native lazy loading
- Thumbnails reduce initial load
- Full images only on detail pages

### Build Time
- Collections are static (built once)
- No dynamic queries at runtime
- Fast page generation

### Caching
- Static files cached by browser
- GitHub Pages CDN delivery
- Minimal JavaScript overhead

## Extending the System

### Adding Filters

Create filtered gallery pages:

```markdown
---
layout: gallery
title: "Paintings"
filter_by: "medium"
filter_value: "Acrylic on Canvas"
---
```

### Adding Metadata Fields

1. Add field to artwork front matter
2. Update `_layouts/artwork.html` to display
3. Optionally add to gallery overlay

Example - adding "price":
```yaml
# In artwork front matter
price: "$500"
```

```html
<!-- In _layouts/artwork.html -->
{% if page.price %}
  <span class="meta-item">
    <strong>Price:</strong> {{ page.price }}
  </span>
{% endif %}
```

### Custom Sorting

Modify gallery layout to sort by different criteria:

```liquid
{% assign sorted_artwork = site.artwork | sort: 'year' | reverse %}
```

### Search Functionality

Enable search in `_config.yml`:
```yaml
search: true
search_full_content: true
search_provider: lunr
```

## Comparison: Before vs After

### Before (Blog Structure)
- Posts in `_posts/` directory
- Date-based URLs
- Chronological organization
- Blog-focused layouts
- Reading time, comments, sharing

### After (Gallery Structure)
- Artwork in `_artwork/` collection
- Descriptive URLs
- Flexible organization
- Visual-first layouts
- Metadata-focused display

## Migration Path

If you have existing posts to convert:

1. **Move files** from `_posts/` to `_artwork/`
2. **Update front matter** to artwork schema
3. **Rename images** to match new convention
4. **Update internal links** if any
5. **Test locally** before deploying

## Maintenance

### Regular Tasks
- Add new artwork as created
- Update series descriptions
- Optimize images before upload
- Test responsive display
- Update About page

### Periodic Updates
- Update Jekyll and dependencies: `bundle update`
- Review and optimize image sizes
- Check for broken links
- Refresh featured content on homepage

## Troubleshooting

### Artwork not appearing in gallery
- Check file is in `_artwork/` directory
- Verify front matter has required fields
- Ensure date is valid format
- Check for YAML syntax errors

### Images not displaying
- Verify image paths start with `/assets/`
- Check file extensions match exactly
- Ensure images are committed to repo
- Test image URLs directly in browser

### Layout issues
- Clear browser cache
- Check for SCSS syntax errors
- Verify layout specified in front matter
- Test in different browsers

### Series not linking
- Ensure series name matches exactly (case-sensitive)
- Check series file exists in `_series/`
- Verify series layout is specified
- Test series page URL directly

## Best Practices

1. **Consistent Naming**: Use descriptive, URL-friendly filenames
2. **Image Optimization**: Always optimize before uploading
3. **Metadata Completeness**: Fill in all relevant fields
4. **Local Testing**: Test changes before pushing
5. **Version Control**: Commit regularly with clear messages
6. **Backup Originals**: Keep high-res originals separate
7. **Documentation**: Update docs when customizing

## Future Enhancements

Potential additions to consider:

- **Lightbox**: Full-screen image viewing with navigation
- **Filtering UI**: Client-side filtering by medium/year
- **Search**: Full-text search across artwork
- **Tags**: Additional categorization beyond series
- **Sold/Available**: Status tracking for pieces
- **Print Shop**: Integration with print-on-demand
- **Contact Form**: Inquiry form for commissions
- **Newsletter**: Email signup for updates
