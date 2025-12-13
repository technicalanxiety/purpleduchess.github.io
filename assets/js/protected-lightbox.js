// Protected Lightbox Viewer
// Secure image viewing with copyright protection

(function() {
    'use strict';

    class ProtectedLightbox {
        constructor() {
            this.isOpen = false;
            this.currentImage = null;
            this.overlay = null;
            this.init();
        }

        init() {
            this.createLightbox();
            this.bindEvents();
        }

        createLightbox() {
            // Create lightbox overlay
            this.overlay = document.createElement('div');
            this.overlay.className = 'protected-lightbox-overlay';
            this.overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                z-index: 9999;
                display: none;
                justify-content: center;
                align-items: center;
                user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
            `;

            // Create image container
            const container = document.createElement('div');
            container.className = 'lightbox-container';
            container.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
                user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
            `;

            // Create image element
            const img = document.createElement('img');
            img.className = 'lightbox-image';
            img.style.cssText = `
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                pointer-events: none;
                -webkit-user-drag: none;
                -khtml-user-drag: none;
                -moz-user-drag: none;
                -o-user-drag: none;
                user-drag: none;
            `;

            // Create close button
            const closeBtn = document.createElement('button');
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '×';
            closeBtn.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 30px;
                cursor: pointer;
                padding: 5px 10px;
                z-index: 10000;
            `;

            // Create copyright notice
            const copyright = document.createElement('div');
            copyright.className = 'lightbox-copyright';
            copyright.innerHTML = '© The Purple Duchess - All Rights Reserved';
            copyright.style.cssText = `
                position: absolute;
                bottom: -30px;
                left: 50%;
                transform: translateX(-50%);
                color: white;
                font-size: 12px;
                opacity: 0.8;
                user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
            `;

            // Create invisible protection overlay
            const protectionOverlay = document.createElement('div');
            protectionOverlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: transparent;
                z-index: 1;
                cursor: default;
            `;

            // Assemble lightbox
            container.appendChild(img);
            container.appendChild(closeBtn);
            container.appendChild(copyright);
            container.appendChild(protectionOverlay);
            this.overlay.appendChild(container);
            document.body.appendChild(this.overlay);

            // Store references
            this.lightboxImage = img;
            this.closeButton = closeBtn;
            this.protectionOverlay = protectionOverlay;
        }

        bindEvents() {
            // Close lightbox events
            this.closeButton.addEventListener('click', () => this.close());
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) this.close();
            });

            // Keyboard events
            document.addEventListener('keydown', (e) => {
                if (this.isOpen) {
                    if (e.key === 'Escape') this.close();
                    // Disable all other keys when lightbox is open
                    e.preventDefault();
                    return false;
                }
            });

            // Protection events for lightbox
            [this.lightboxImage, this.protectionOverlay].forEach(el => {
                el.addEventListener('contextmenu', this.preventAction);
                el.addEventListener('dragstart', this.preventAction);
                el.addEventListener('selectstart', this.preventAction);
                el.addEventListener('mousedown', this.preventAction);
            });

            // Bind to gallery images
            this.bindGalleryImages();
        }

        bindGalleryImages() {
            // Find all gallery images and bind click events
            const galleryImages = document.querySelectorAll('.project-item img, .gallery-item img, .project-image img');
            
            galleryImages.forEach(img => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.open(img.src, img.alt);
                });
            });
        }

        preventAction(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        open(src, alt) {
            if (this.isOpen) return;
            
            this.isOpen = true;
            this.lightboxImage.src = src;
            this.lightboxImage.alt = alt;
            this.overlay.style.display = 'flex';
            
            // Disable body scroll
            document.body.style.overflow = 'hidden';
            
            // Add watermark to lightbox image
            this.lightboxImage.onload = () => {
                this.addWatermarkToLightbox();
            };
        }

        close() {
            if (!this.isOpen) return;
            
            this.isOpen = false;
            this.overlay.style.display = 'none';
            
            // Re-enable body scroll
            document.body.style.overflow = '';
        }

        addWatermarkToLightbox() {
            const img = this.lightboxImage;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            
            // Draw original image
            ctx.drawImage(img, 0, 0);
            
            // Add simple copyright in bottom right (slightly larger for lightbox)
            const fontSize = Math.max(canvas.width * 0.025, 16);
            ctx.font = `${fontSize}px Arial`;
            ctx.textAlign = 'right';
            ctx.textBaseline = 'bottom';
            
            // Add semi-transparent background for text
            const copyrightText = '© The Purple Duchess';
            const textWidth = ctx.measureText(copyrightText).width;
            const padding = 12;
            const bgX = canvas.width - textWidth - padding * 2;
            const bgY = canvas.height - fontSize - padding * 2;
            
            ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            ctx.fillRect(bgX, bgY, textWidth + padding * 2, fontSize + padding * 2);
            
            // Add white copyright text
            ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            ctx.fillText(copyrightText, canvas.width - padding, canvas.height - padding);
            
            // Replace image
            img.src = canvas.toDataURL('image/jpeg', 0.9);
        }
    }

    // Initialize when DOM is ready
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        new ProtectedLightbox();
    }

    init();

})();