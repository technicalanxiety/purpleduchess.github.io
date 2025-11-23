/**
 * Image Protection Script
 * Prevents common methods of image theft including right-click, drag, and keyboard shortcuts
 */

(function() {
  'use strict';
  
  // Disable right-click on entire artwork hero section and all images
  document.addEventListener('contextmenu', function(e) {
    // Check if click is on image or within artwork hero
    if (e.target.tagName === 'IMG' || 
        e.target.closest('.artwork-hero') || 
        e.target.closest('.artwork-image') ||
        e.target.closest('.gallery-thumbnail')) {
      e.preventDefault();
      e.stopPropagation();
      alert('Image protection is enabled. Right-click is disabled on artwork images.');
      return false;
    }
  }, true); // Use capture phase
  
  // Disable dragging of images
  document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);
  
  // Disable selection on images
  document.addEventListener('selectstart', function(e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  });
  
  // Disable common keyboard shortcuts for saving images
  document.addEventListener('keydown', function(e) {
    // Disable Ctrl+S (Save) and Cmd+S
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      return false;
    }
    
    // Disable Ctrl+Shift+I (DevTools) and F12
    if ((e.ctrlKey && e.shiftKey && e.key === 'I') || e.key === 'F12') {
      e.preventDefault();
      return false;
    }
  });
  
  // Add watermark overlay to artwork images
  function addWatermark() {
    const artworkImages = document.querySelectorAll('.artwork-image, .gallery-thumbnail');
    
    artworkImages.forEach(function(img) {
      // Skip if watermark already added
      if (img.parentElement.classList.contains('watermarked')) {
        return;
      }
      
      // Create wrapper for watermark
      const wrapper = document.createElement('div');
      wrapper.className = 'image-wrapper watermarked';
      wrapper.style.position = 'relative';
      wrapper.style.display = 'inline-block';
      wrapper.style.maxWidth = '100%';
      
      // Wrap the image
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
      
      // Create watermark overlay
      const watermark = document.createElement('div');
      watermark.className = 'image-watermark';
      watermark.textContent = '© The Purple Duchess';
      watermark.style.position = 'absolute';
      watermark.style.bottom = '10px';
      watermark.style.right = '10px';
      watermark.style.color = 'rgba(255, 255, 255, 0.6)';
      watermark.style.fontSize = '14px';
      watermark.style.fontWeight = '600';
      watermark.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.8)';
      watermark.style.pointerEvents = 'none';
      watermark.style.userSelect = 'none';
      watermark.style.zIndex = '100';
      
      wrapper.appendChild(watermark);
      
      // Create invisible protective overlay
      const overlay = document.createElement('div');
      overlay.className = 'image-protection-overlay';
      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.right = '0';
      overlay.style.bottom = '0';
      overlay.style.zIndex = '50';
      overlay.style.cursor = 'default';
      
      wrapper.appendChild(overlay);
    });
  }
  
  // Run watermark function when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addWatermark);
  } else {
    addWatermark();
  }
  
  // Re-run on dynamic content changes
  const observer = new MutationObserver(addWatermark);
  observer.observe(document.body, { childList: true, subtree: true });
  
})();
