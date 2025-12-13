// Image Protection System
// Prevents right-click, drag, save, and adds copyright watermarks

(function() {
    'use strict';

    // Configuration
    const config = {
        watermarkText: '© The Purple Duchess',
        watermarkOpacity: 0.9,
        watermarkSize: '12px',
        watermarkColor: '#ffffff',
        preventRightClick: true,
        preventDrag: true,
        preventSelection: true,
        preventKeyboardShortcuts: true
    };

    // Add simple copyright watermark to bottom right
    function addWatermark(img) {
        if (img.dataset.protected === 'true') return;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Wait for image to load
        if (!img.complete) {
            img.onload = () => addWatermark(img);
            return;
        }
        
        // Set canvas size to match image
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        
        // Draw original image
        ctx.drawImage(img, 0, 0);
        
        // Add simple copyright in bottom right
        const fontSize = Math.max(canvas.width * 0.02, 12);
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        
        // Add semi-transparent background for text
        const textWidth = ctx.measureText(config.watermarkText).width;
        const padding = 8;
        const bgX = canvas.width - textWidth - padding * 2;
        const bgY = canvas.height - fontSize - padding * 2;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(bgX, bgY, textWidth + padding * 2, fontSize + padding * 2);
        
        // Add white copyright text
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText(config.watermarkText, canvas.width - padding, canvas.height - padding);
        
        // Replace image source with watermarked version
        img.src = canvas.toDataURL('image/jpeg', 0.9);
        img.dataset.protected = 'true';
        
        // Add protection attributes
        img.setAttribute('draggable', 'false');
        img.style.userSelect = 'none';
        img.style.webkitUserSelect = 'none';
        img.style.mozUserSelect = 'none';
        img.style.msUserSelect = 'none';
        img.style.pointerEvents = 'none';
    }

    // Disable right-click context menu
    function disableRightClick(e) {
        if (config.preventRightClick) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }

    // Disable drag and drop
    function disableDrag(e) {
        if (config.preventDrag) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }

    // Disable text selection
    function disableSelection(e) {
        if (config.preventSelection) {
            e.preventDefault();
            return false;
        }
    }

    // Disable keyboard shortcuts
    function disableKeyboardShortcuts(e) {
        if (!config.preventKeyboardShortcuts) return;
        
        // Disable common save/copy shortcuts
        if (e.ctrlKey || e.metaKey) {
            const key = e.key.toLowerCase();
            if (['s', 'a', 'c', 'v', 'x', 'p', 'f12'].includes(key)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }
        
        // Disable F12 (Developer Tools)
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+Shift+I (Developer Tools)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'i') {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+U (View Source)
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
            e.preventDefault();
            return false;
        }
    }

    // Protect all images on the page
    function protectImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Skip if already protected or is favicon
            if (img.dataset.protected === 'true' || img.src.includes('favicon')) return;
            
            // Add watermark
            addWatermark(img);
            
            // Add event listeners for protection
            img.addEventListener('contextmenu', disableRightClick);
            img.addEventListener('dragstart', disableDrag);
            img.addEventListener('selectstart', disableSelection);
            img.addEventListener('mousedown', disableSelection);
            
            // Wrap image in a protective container
            if (!img.parentElement.classList.contains('protected-image')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'protected-image';
                wrapper.style.cssText = `
                    position: relative;
                    display: inline-block;
                    user-select: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                `;
                
                img.parentNode.insertBefore(wrapper, img);
                wrapper.appendChild(img);
                
                // Add invisible overlay
                const overlay = document.createElement('div');
                overlay.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: transparent;
                    z-index: 1;
                    cursor: default;
                `;
                wrapper.appendChild(overlay);
                
                // Add protection events to wrapper and overlay
                [wrapper, overlay].forEach(el => {
                    el.addEventListener('contextmenu', disableRightClick);
                    el.addEventListener('dragstart', disableDrag);
                    el.addEventListener('selectstart', disableSelection);
                    el.addEventListener('mousedown', disableSelection);
                });
            }
        });
    }

    // Add global protection
    function addGlobalProtection() {
        // Disable right-click globally
        document.addEventListener('contextmenu', disableRightClick);
        
        // Disable keyboard shortcuts globally
        document.addEventListener('keydown', disableKeyboardShortcuts);
        
        // Disable text selection on images
        document.addEventListener('selectstart', function(e) {
            if (e.target.tagName === 'IMG') {
                disableSelection(e);
            }
        });
        
        // Disable drag on images
        document.addEventListener('dragstart', function(e) {
            if (e.target.tagName === 'IMG') {
                disableDrag(e);
            }
        });
        
        // Add CSS to prevent selection
        const style = document.createElement('style');
        style.textContent = `
            .protected-image img {
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
                -webkit-user-drag: none !important;
                -khtml-user-drag: none !important;
                -moz-user-drag: none !important;
                -o-user-drag: none !important;
                user-drag: none !important;
                pointer-events: none !important;
            }
            
            .protected-image {
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
            }
            
            /* Disable image saving via CSS */
            img[data-protected="true"] {
                -webkit-touch-callout: none !important;
                -webkit-user-select: none !important;
                -khtml-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Console warning
    function addConsoleWarning() {
        console.clear();
        console.log('%c⚠️ COPYRIGHT NOTICE ⚠️', 'color: #9b7ec4; font-size: 20px; font-weight: bold;');
        console.log('%cAll images on this site are protected by copyright.', 'color: #666; font-size: 14px;');
        console.log('%cUnauthorized downloading, copying, or distribution is prohibited.', 'color: #666; font-size: 14px;');
        console.log('%c© The Purple Duchess - All Rights Reserved', 'color: #9b7ec4; font-size: 12px;');
        
        // Clear console periodically
        setInterval(() => {
            console.clear();
            console.log('%c⚠️ COPYRIGHT NOTICE ⚠️', 'color: #9b7ec4; font-size: 20px; font-weight: bold;');
            console.log('%cAll images are protected by copyright.', 'color: #666; font-size: 14px;');
        }, 3000);
    }

    // Initialize protection when DOM is ready
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        addGlobalProtection();
        protectImages();
        addConsoleWarning();
        
        // Re-protect images when new ones are added
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        if (node.tagName === 'IMG') {
                            setTimeout(() => addWatermark(node), 100);
                        } else {
                            const images = node.querySelectorAll && node.querySelectorAll('img');
                            if (images) {
                                images.forEach(img => setTimeout(() => addWatermark(img), 100));
                            }
                        }
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Start protection
    init();

    // Additional protection against common bypass methods
    window.addEventListener('load', function() {
        // Disable print screen
        document.addEventListener('keyup', function(e) {
            if (e.key === 'PrintScreen') {
                navigator.clipboard.writeText('');
                alert('Screenshots are not allowed on this site.');
            }
        });
        
        // Detect developer tools
        let devtools = {open: false, orientation: null};
        const threshold = 160;
        
        setInterval(function() {
            if (window.outerHeight - window.innerHeight > threshold || 
                window.outerWidth - window.innerWidth > threshold) {
                if (!devtools.open) {
                    devtools.open = true;
                    console.clear();
                    document.body.innerHTML = '<div style="text-align:center;padding:50px;font-family:Arial;"><h1>⚠️ Developer Tools Detected</h1><p>This site\'s content is protected by copyright.</p><p>Please close developer tools to continue.</p></div>';
                }
            } else {
                if (devtools.open) {
                    devtools.open = false;
                    location.reload();
                }
            }
        }, 500);
    });

})();