// Image Protection System
class ImageProtection {
    constructor() {
        this.init();
    }

    init() {
        this.disableRightClick();
        this.disableKeyboardShortcuts();
        this.disableDragAndDrop();
        this.addConsoleWarning();
        this.detectDevTools();
    }

    disableRightClick() {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
    }

    disableKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Disable common save/copy shortcuts
            if (e.ctrlKey || e.metaKey) {
                const key = e.key.toLowerCase();
                if (['s', 'a', 'c', 'v', 'x', 'p', 'u'].includes(key)) {
                    e.preventDefault();
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
        });
    }

    disableDragAndDrop() {
        document.addEventListener('dragstart', (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
                return false;
            }
        });

        document.addEventListener('selectstart', (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
                return false;
            }
        });
    }

    addConsoleWarning() {
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

    detectDevTools() {
        let devtools = { open: false };
        const threshold = 160;

        setInterval(() => {
            if (window.outerHeight - window.innerHeight > threshold || 
                window.outerWidth - window.innerWidth > threshold) {
                if (!devtools.open) {
                    devtools.open = true;
                    this.showDevToolsWarning();
                }
            } else {
                if (devtools.open) {
                    devtools.open = false;
                    this.hideDevToolsWarning();
                }
            }
        }, 500);
    }

    showDevToolsWarning() {
        const warning = document.createElement('div');
        warning.id = 'devtools-warning';
        warning.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                color: white;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                font-family: Arial, sans-serif;
            ">
                <h1 style="font-size: 3rem; margin-bottom: 1rem;">⚠️</h1>
                <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">Developer Tools Detected</h2>
                <p style="font-size: 1rem; text-align: center; max-width: 500px;">
                    This site's content is protected by copyright.<br>
                    Please close developer tools to continue.
                </p>
                <p style="font-size: 0.9rem; margin-top: 2rem; color: #9b7ec4;">
                    © The Purple Duchess - All Rights Reserved
                </p>
            </div>
        `;
        document.body.appendChild(warning);
    }

    hideDevToolsWarning() {
        const warning = document.getElementById('devtools-warning');
        if (warning) {
            warning.remove();
        }
    }
}

// Initialize protection when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ImageProtection();
});