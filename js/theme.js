// Theme Toggle Functionality
class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        // Get saved theme or default to light
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        // Apply the theme
        this.applyTheme(this.currentTheme);
        
        // Set up toggle button
        this.setupToggle();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.updateToggleIcon(theme);
        
        // Save to localStorage
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    }

    updateToggleIcon(theme) {
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '🌸' : '🌼';
        }
    }

    setupToggle() {
        const toggleButton = document.getElementById('theme-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
                this.applyTheme(newTheme);
                
                // Add a subtle animation
                toggleButton.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    toggleButton.style.transform = '';
                }, 150);
            });
        }
    }

    // Public method to get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }

    // Public method to set theme programmatically
    setTheme(theme) {
        if (theme === 'light' || theme === 'dark') {
            this.applyTheme(theme);
        }
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.themeManager = new ThemeManager();
    });
} else {
    window.themeManager = new ThemeManager();
}