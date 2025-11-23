/**
 * Lightbox Image Viewer
 * Provides full-screen image viewing with keyboard navigation and zoom
 */

(function() {
  'use strict';
  
  // Create lightbox HTML structure
  function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox__overlay"></div>
      <div class="lightbox__content">
        <button class="lightbox__close" aria-label="Close lightbox">
          <span aria-hidden="true">&times;</span>
        </button>
        <button class="lightbox__prev" aria-label="Previous image">
          <span aria-hidden="true">‹</span>
        </button>
        <button class="lightbox__next" aria-label="Next image">
          <span aria-hidden="true">›</span>
        </button>
        <div class="lightbox__image-container">
          <img class="lightbox__image" src="" alt="" />
          <div class="lightbox__caption"></div>
        </div>
        <div class="lightbox__loader">Loading...</div>
      </div>
    `;
    document.body.appendChild(lightbox);
    return lightbox;
  }
  
  // Initialize lightbox
  let lightbox = null;
  let currentIndex = 0;
  let images = [];
  
  function initLightbox() {
    // Create lightbox if it doesn't exist
    if (!lightbox) {
      lightbox = createLightbox();
    }
    
    // Get all lightbox-enabled images
    images = Array.from(document.querySelectorAll('.artwork-image, .gallery-thumbnail'));
    
    // Add click handlers to images
    images.forEach((img, index) => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openLightbox(index);
      });
    });
    
    // Close button
    const closeBtn = lightbox.querySelector('.lightbox__close');
    closeBtn.addEventListener('click', closeLightbox);
    
    // Overlay click to close
    const overlay = lightbox.querySelector('.lightbox__overlay');
    overlay.addEventListener('click', closeLightbox);
    
    // Navigation buttons
    const prevBtn = lightbox.querySelector('.lightbox__prev');
    const nextBtn = lightbox.querySelector('.lightbox__next');
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
  }
  
  function openLightbox(index) {
    currentIndex = index;
    lightbox.classList.add('lightbox--active');
    document.body.style.overflow = 'hidden';
    showImage(currentIndex);
  }
  
  function closeLightbox() {
    lightbox.classList.remove('lightbox--active');
    document.body.style.overflow = '';
  }
  
  function showImage(index) {
    const img = images[index];
    const lightboxImg = lightbox.querySelector('.lightbox__image');
    const caption = lightbox.querySelector('.lightbox__caption');
    const loader = lightbox.querySelector('.lightbox__loader');
    
    // Show loader
    loader.style.display = 'block';
    lightboxImg.style.opacity = '0';
    
    // Get image source (use full resolution if available)
    let imgSrc = img.src;
    if (img.dataset.fullsize) {
      imgSrc = img.dataset.fullsize;
    }
    
    // Load image
    const tempImg = new Image();
    tempImg.onload = function() {
      lightboxImg.src = imgSrc;
      lightboxImg.alt = img.alt || 'Artwork';
      lightboxImg.style.opacity = '1';
      loader.style.display = 'none';
    };
    tempImg.src = imgSrc;
    
    // Set caption
    const title = img.alt || img.closest('.gallery-item')?.querySelector('.gallery-title')?.textContent || '';
    caption.textContent = title;
    
    // Update navigation button visibility
    updateNavButtons();
  }
  
  function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }
  
  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }
  
  function updateNavButtons() {
    const prevBtn = lightbox.querySelector('.lightbox__prev');
    const nextBtn = lightbox.querySelector('.lightbox__next');
    
    // Show/hide navigation if only one image
    if (images.length <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'block';
      nextBtn.style.display = 'block';
    }
  }
  
  function handleKeyboard(e) {
    if (!lightbox.classList.contains('lightbox--active')) return;
    
    switch(e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        showPrevImage();
        break;
      case 'ArrowRight':
        showNextImage();
        break;
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
  } else {
    initLightbox();
  }
  
})();
