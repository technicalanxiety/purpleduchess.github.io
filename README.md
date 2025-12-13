# The Purple Duchess - Art Portfolio

A clean, modern art portfolio website built with vanilla HTML, CSS, and JavaScript. Optimized for GitHub Pages hosting.

## 🎨 Features

- **Clean Design** - Focus on showcasing artwork
- **Responsive Layout** - Works perfectly on all devices  
- **Image Protection** - Copyright watermarks and right-click protection
- **Lightbox Gallery** - Beautiful full-screen image viewing
- **Fast Loading** - Optimized thumbnails for quick browsing
- **Easy to Update** - Simple HTML structure, no build process

## 📁 Structure

```
├── index.html          # Main gallery page
├── about.html          # About the artist
├── contact.html        # Contact information
├── css/
│   └── style.css       # All styling
├── js/
│   ├── gallery.js      # Gallery and lightbox functionality
│   └── protection.js   # Image protection system
└── assets/
    └── images/
        ├── artwork/     # Full-resolution images
        ├── thumbnails/  # 400x300 thumbnails for gallery
        └── favicon.svg  # Site icon
```

## 🚀 Adding New Artwork

1. **Add full-resolution image** to `assets/images/artwork/`
2. **Generate thumbnail** (400x300) and add to `assets/images/thumbnails/`
3. **Add artwork item** to `index.html`:

```html
<div class="artwork-item" data-title="Your Title" data-medium="Medium" data-year="2024">
    <div class="artwork-image">
        <img src="assets/images/thumbnails/your-image.jpg" 
             data-full="assets/images/artwork/your-image.jpg"
             alt="Your Title">
    </div>
    <div class="artwork-info">
        <h3>Your Title</h3>
        <p class="medium">Medium</p>
        <p class="year">2024</p>
    </div>
</div>
```

## 🛡️ Image Protection

- **Watermarks** - Automatic copyright watermarks on all images
- **Right-click disabled** - Prevents easy saving
- **Keyboard shortcuts blocked** - Prevents Ctrl+S, Ctrl+A, etc.
- **Developer tools detection** - Warns when dev tools are opened
- **Drag & drop disabled** - Images cannot be dragged

## 📱 Responsive Design

- **Mobile-first** - Optimized for all screen sizes
- **Touch-friendly** - Easy navigation on mobile devices
- **Fast loading** - Optimized images and minimal code

## 🔧 Customization

### Colors
Edit the CSS custom properties in `css/style.css`:
- Primary color: `#9b7ec4` (purple)
- Background: `#fafafa` (light gray)
- Text: `#333` (dark gray)

### Adding Pages
Create new HTML files following the same structure as `about.html` and `contact.html`.

### Styling
All styles are in `css/style.css` - well organized and commented.

## 🌐 Deployment

This site works perfectly with GitHub Pages:

1. **Push to GitHub** - Commit all files to your repository
2. **Enable GitHub Pages** - Go to Settings > Pages
3. **Select source** - Choose "Deploy from a branch" and select `main`
4. **Custom domain** - Add your domain in the Pages settings

No build process required - GitHub Pages serves the files directly!

## 📄 License

© 2024 Addyson Rinehart. All rights reserved.