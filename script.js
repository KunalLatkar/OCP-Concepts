// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = body.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Copy Code Functionality
function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('code').textContent;

    navigator.clipboard.writeText(code).then(() => {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.classList.add('copied');

        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code:', err);
        button.innerHTML = '<i class="fas fa-times"></i> Failed';
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // Remove active class from all links
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');

            // Scroll to section
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight Active Section on Scroll
const sections = document.querySelectorAll('.content-section');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    let current = '';
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Throttle function for scroll events
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

window.addEventListener('scroll', throttle(highlightNavigation, 100));

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile Sidebar Toggle (for responsive design)
function createMobileMenuButton() {
    if (window.innerWidth <= 992) {
        if (!document.querySelector('.mobile-menu-btn')) {
            const menuBtn = document.createElement('button');
            menuBtn.className = 'mobile-menu-btn';
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            menuBtn.style.cssText = `
                position: fixed;
                top: 10px;
                left: 10px;
                z-index: 1001;
                background-color: var(--primary-color);
                color: white;
                border: none;
                width: 45px;
                height: 45px;
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                box-shadow: var(--shadow-hover);
            `;

            document.body.appendChild(menuBtn);

            menuBtn.addEventListener('click', () => {
                const sidebar = document.querySelector('.sidebar');
                sidebar.classList.toggle('open');

                // Close sidebar when clicking outside
                if (sidebar.classList.contains('open')) {
                    document.addEventListener('click', closeSidebarOnClickOutside);
                }
            });
        }
    } else {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        if (menuBtn) {
            menuBtn.remove();
        }
    }
}

function closeSidebarOnClickOutside(e) {
    const sidebar = document.querySelector('.sidebar');
    const menuBtn = document.querySelector('.mobile-menu-btn');

    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
        sidebar.classList.remove('open');
        document.removeEventListener('click', closeSidebarOnClickOutside);
    }
}

// Initialize mobile menu on load and resize
createMobileMenuButton();
window.addEventListener('resize', throttle(createMobileMenuButton, 200));

// Close mobile sidebar when a link is clicked
if (window.innerWidth <= 992) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.remove('open');
        });
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// Search Functionality (Optional Enhancement)
function addSearchFunctionality() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.style.cssText = `
        padding: 1rem;
        margin-bottom: 1rem;
    `;

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search topics...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        width: 100%;
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        background-color: var(--code-bg);
        color: var(--text-color);
        font-size: 0.95rem;
    `;

    searchContainer.appendChild(searchInput);

    const sidebarContent = document.querySelector('.sidebar-content');
    const heading = sidebarContent.querySelector('h3');
    heading.after(searchContainer);

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        navLinks.forEach(link => {
            const text = link.textContent.toLowerCase();
            const listItem = link.parentElement;

            if (text.includes(searchTerm)) {
                listItem.style.display = 'list-item';
            } else {
                listItem.style.display = 'none';
            }
        });
    });
}

// Initialize search
addSearchFunctionality();

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }

    // Escape to close mobile menu
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    }

    // T for theme toggle
    if (e.key === 't' || e.key === 'T') {
        if (!e.target.matches('input, textarea')) {
            themeToggle.click();
        }
    }
});

// Add keyboard shortcut hints
function addKeyboardHints() {
    const hints = document.createElement('div');
    hints.className = 'keyboard-hints';
    hints.style.cssText = `
        position: fixed;
        bottom: 1rem;
        left: 1rem;
        background-color: var(--surface-color);
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-size: 0.8rem;
        color: var(--text-secondary);
        box-shadow: var(--shadow);
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 999;
    `;
    hints.innerHTML = `
        <strong>Shortcuts:</strong>
        <kbd>T</kbd> Theme |
        <kbd>Ctrl+K</kbd> Search |
        <kbd>Esc</kbd> Close Menu
    `;

    document.body.appendChild(hints);

    // Show hints on first visit
    if (!localStorage.getItem('hintsShown')) {
        setTimeout(() => {
            hints.style.opacity = '1';
            setTimeout(() => {
                hints.style.opacity = '0';
                localStorage.setItem('hintsShown', 'true');
            }, 5000);
        }, 2000);
    }
}

addKeyboardHints();

// Console easter egg
console.log('%c🚀 OpenShift Learning Hub', 'font-size: 24px; font-weight: bold; color: #ee0000;');
console.log('%cWelcome to the OpenShift Learning Hub!', 'font-size: 14px; color: #0066cc;');
console.log('%cKeyboard Shortcuts:', 'font-size: 12px; font-weight: bold;');
console.log('%c  T - Toggle theme', 'font-size: 11px;');
console.log('%c  Ctrl+K - Focus search', 'font-size: 11px;');
console.log('%c  Esc - Close mobile menu', 'font-size: 11px;');

// Performance monitoring (optional)
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
        }, 0);
    });
}