/**
 * Loading Animations
 * Adds staggered fade-in animations to gallery items
 */

(function() {
  'use strict';
  
  function initLoadingAnimations() {
    // Add animation delays to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
      item.style.setProperty('--item-index', index);
    });
    
    // Lazy load images with Intersection Observer
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Load the image
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            
            // Stop observing this image
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
      
      // Observe all images with data-src
      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoadingAnimations);
  } else {
    initLoadingAnimations();
  }
  
})();
