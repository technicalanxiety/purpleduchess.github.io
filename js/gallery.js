// Gallery and Lightbox Functionality
class ArtGallery {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightbox-image');
        this.lightboxTitle = document.getElementById('lightbox-title');
        this.lightboxMedium = document.getElementById('lightbox-medium');
        this.lightboxYear = document.getElementById('lightbox-year');
        this.lightboxClose = document.querySelector('.lightbox-close');
        
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Artwork item clicks
        document.querySelectorAll('.artwork-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.openLightbox(item);
            });
        });

        // Lightbox close events
        this.lightboxClose.addEventListener('click', () => this.closeLightbox());
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.lightbox.classList.contains('active')) {
                this.closeLightbox();
            }
        });
    }

    openLightbox(item) {
        const img = item.querySelector('img');
        const fullImageSrc = img.dataset.full;
        const title = item.dataset.title;
        const medium = item.dataset.medium;
        const year = item.dataset.year;

        // Set lightbox content
        this.lightboxImage.src = fullImageSrc;
        this.lightboxImage.alt = title;
        this.lightboxTitle.textContent = title;
        this.lightboxMedium.textContent = medium;
        this.lightboxYear.textContent = year;

        // Reset watermark status for new image
        this.lightboxImage.dataset.watermarked = 'false';

        // Show lightbox
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Watermark the lightbox image when it loads
        this.lightboxImage.onload = () => {
            console.log('Lightbox image loaded, applying watermark');
            this.addWatermarkToImage(this.lightboxImage);
        };

        // Also try immediately if image is already cached
        if (this.lightboxImage.complete && this.lightboxImage.naturalWidth > 0) {
            console.log('Lightbox image already loaded, applying watermark immediately');
            this.addWatermarkToImage(this.lightboxImage);
        }
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }


    


    addWatermarkToImage(img) {
        // Skip if already watermarked
        if (img.dataset.watermarked === 'true') {
            console.log('Already watermarked, skipping:', img.alt || img.src);
            return;
        }
        
        // Skip if image dimensions are not available
        if (!img.naturalWidth || !img.naturalHeight) {
            console.log('Image dimensions not available:', img.alt || img.src, 'naturalWidth:', img.naturalWidth, 'naturalHeight:', img.naturalHeight);
            return;
        }

        try {
            console.log('Watermarking image:', img.alt || img.src, `${img.naturalWidth}x${img.naturalHeight}`);
            
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set canvas size to match image
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;

            // Draw original image
            ctx.drawImage(img, 0, 0);

            // Add watermark
            const fontSize = Math.max(canvas.width * 0.02, 12);
            ctx.font = `${fontSize}px Arial`;
            ctx.textAlign = 'right';
            ctx.textBaseline = 'bottom';

            // Add semi-transparent background for text
            const watermarkText = '© The Purple Duchess';
            const textWidth = ctx.measureText(watermarkText).width;
            const padding = 8;
            const bgX = canvas.width - textWidth - padding * 2;
            const bgY = canvas.height - fontSize - padding * 2;

            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(bgX, bgY, textWidth + padding * 2, fontSize + padding * 2);

            // Add white copyright text
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.fillText(watermarkText, canvas.width - padding, canvas.height - padding);

            // Replace image source with watermarked version
            const watermarkedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
            
            // Mark as watermarked BEFORE changing src to prevent loops
            img.dataset.watermarked = 'true';
            img.src = watermarkedDataUrl;
            
            console.log('✓ Successfully watermarked:', img.alt || 'image');
        } catch (error) {
            console.error('✗ Watermarking failed for:', img.alt || img.src, error);
        }
    }
    

}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.artGallery = new ArtGallery();
    

});

