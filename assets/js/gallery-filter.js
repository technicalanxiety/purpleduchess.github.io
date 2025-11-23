/**
 * Gallery Filtering and Search
 * Allows users to filter artwork by medium, year, series, and search by text
 */

(function() {
  'use strict';
  
  // Initialize filtering when DOM is ready
  function initFiltering() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;
    
    // Create filter controls
    createFilterControls();
    
    // Set up event listeners
    setupFilterListeners();
  }
  
  function createFilterControls() {
    const galleryPage = document.querySelector('.gallery-page');
    if (!galleryPage) return;
    
    // Create filter container
    const filterContainer = document.createElement('div');
    filterContainer.className = 'gallery-filters';
    filterContainer.innerHTML = `
      <div class="filter-group">
        <label for="search-input" class="filter-label">Search:</label>
        <input 
          type="text" 
          id="search-input" 
          class="filter-search" 
          placeholder="Search artwork..."
          aria-label="Search artwork by title or description"
        />
      </div>
      
      <div class="filter-group">
        <label for="medium-filter" class="filter-label">Medium:</label>
        <select id="medium-filter" class="filter-select" aria-label="Filter by medium">
          <option value="">All Mediums</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="year-filter" class="filter-label">Year:</label>
        <select id="year-filter" class="filter-select" aria-label="Filter by year">
          <option value="">All Years</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="series-filter" class="filter-label">Series:</label>
        <select id="series-filter" class="filter-select" aria-label="Filter by series">
          <option value="">All Series</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label class="filter-label" style="visibility: hidden;">Reset:</label>
        <button class="filter-reset" aria-label="Reset all filters">
          Reset Filters
        </button>
      </div>
      
      <div class="filter-results" role="status" aria-live="polite"></div>
    `;
    
    // Insert before gallery grid
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.parentNode.insertBefore(filterContainer, galleryGrid);
    
    // Populate filter options
    populateFilters();
  }
  
  function populateFilters() {
    const items = document.querySelectorAll('.gallery-item');
    const mediums = new Set();
    const years = new Set();
    const series = new Set();
    
    items.forEach(item => {
      const medium = item.dataset.medium;
      const year = item.dataset.year;
      const seriesName = item.dataset.series;
      
      if (medium && medium.trim()) mediums.add(medium);
      if (year && year.trim()) years.add(year);
      if (seriesName && seriesName.trim()) series.add(seriesName);
    });
    
    // Populate medium filter
    const mediumSelect = document.getElementById('medium-filter');
    Array.from(mediums).sort().forEach(medium => {
      const option = document.createElement('option');
      option.value = medium;
      option.textContent = medium;
      mediumSelect.appendChild(option);
    });
    
    // Populate year filter (newest first)
    const yearSelect = document.getElementById('year-filter');
    Array.from(years).sort().reverse().forEach(year => {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
    });
    
    // Populate series filter
    const seriesSelect = document.getElementById('series-filter');
    Array.from(series).sort().forEach(seriesName => {
      const option = document.createElement('option');
      option.value = seriesName;
      option.textContent = seriesName;
      seriesSelect.appendChild(option);
    });
  }
  
  function setupFilterListeners() {
    const searchInput = document.getElementById('search-input');
    const mediumFilter = document.getElementById('medium-filter');
    const yearFilter = document.getElementById('year-filter');
    const seriesFilter = document.getElementById('series-filter');
    const resetButton = document.querySelector('.filter-reset');
    
    if (searchInput) {
      searchInput.addEventListener('input', debounce(applyFilters, 300));
    }
    
    if (mediumFilter) {
      mediumFilter.addEventListener('change', applyFilters);
    }
    
    if (yearFilter) {
      yearFilter.addEventListener('change', applyFilters);
    }
    
    if (seriesFilter) {
      seriesFilter.addEventListener('change', applyFilters);
    }
    
    if (resetButton) {
      resetButton.addEventListener('click', resetFilters);
    }
  }
  
  function applyFilters() {
    const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
    const selectedMedium = document.getElementById('medium-filter')?.value || '';
    const selectedYear = document.getElementById('year-filter')?.value || '';
    const selectedSeries = document.getElementById('series-filter')?.value || '';
    
    const items = document.querySelectorAll('.gallery-item');
    let visibleCount = 0;
    
    items.forEach(item => {
      const title = item.dataset.title?.toLowerCase() || '';
      const description = item.dataset.description?.toLowerCase() || '';
      const medium = item.dataset.medium || '';
      const year = item.dataset.year || '';
      const series = item.dataset.series || '';
      
      // Check if item matches all filters
      const matchesSearch = !searchTerm || title.includes(searchTerm) || description.includes(searchTerm);
      const matchesMedium = !selectedMedium || medium === selectedMedium;
      const matchesYear = !selectedYear || year === selectedYear;
      const matchesSeries = !selectedSeries || series === selectedSeries;
      
      if (matchesSearch && matchesMedium && matchesYear && matchesSeries) {
        item.style.display = '';
        item.classList.add('filter-visible');
        visibleCount++;
      } else {
        item.style.display = 'none';
        item.classList.remove('filter-visible');
      }
    });
    
    // Update results count
    updateResultsCount(visibleCount, items.length);
  }
  
  function resetFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('medium-filter').value = '';
    document.getElementById('year-filter').value = '';
    document.getElementById('series-filter').value = '';
    applyFilters();
  }
  
  function updateResultsCount(visible, total) {
    const resultsDiv = document.querySelector('.filter-results');
    if (!resultsDiv) return;
    
    if (visible === total) {
      resultsDiv.textContent = `Showing all ${total} artworks`;
    } else {
      resultsDiv.textContent = `Showing ${visible} of ${total} artworks`;
    }
  }
  
  // Debounce helper for search input
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFiltering);
  } else {
    initFiltering();
  }
  
})();
