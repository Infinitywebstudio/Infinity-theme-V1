/**
 * Infinity 2025 Simple - Main JavaScript
 * Version: 1.0.0
 * Author: Infinity Studio
 */

(function() {
    'use strict';

    /**
     * Smooth scroll for anchor links
     */
    function smoothScrollInit() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Skip if it's just "#"
                if (href === '#') return;

                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Lazy loading for images
     * Uses native lazy loading with fallback
     */
    function lazyLoadInit() {
        // Check if browser supports native lazy loading
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        } else {
            // Fallback for older browsers
            const images = document.querySelectorAll('img[data-src]');

            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    /**
     * Mobile menu toggle
     * Placeholder for future implementation
     */
    function mobileMenuInit() {
        const header = document.querySelector('.site-header');
        const menuToggle = document.querySelector('.menu-toggle');

        if (!menuToggle) return;

        menuToggle.addEventListener('click', function() {
            header.classList.toggle('menu-open');
        });
    }

    /**
     * Add custom classes on scroll
     */
    function scrollHandlerInit() {
        let lastScroll = 0;
        const header = document.querySelector('.site-header');

        window.addEventListener('scroll', debounce(function() {
            const currentScroll = window.pageYOffset;

            // Add scrolled class when page is scrolled
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }, 100));
    }

    /**
     * Debounce utility function
     * Limits the rate at which a function can fire
     */
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

    /**
     * Initialize comment reply buttons
     */
    function commentsInit() {
        const replyLinks = document.querySelectorAll('.comment-reply-link');

        replyLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // WordPress handles this natively, this is just a placeholder
                // for custom functionality if needed
            });
        });
    }

    /**
     * Focus management for accessibility
     */
    function a11yInit() {
        // Skip link focus fix
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', function(e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            });
        }
    }

    /**
     * Initialize all functions when DOM is ready
     */
    function init() {
        smoothScrollInit();
        lazyLoadInit();
        mobileMenuInit();
        scrollHandlerInit();
        commentsInit();
        a11yInit();

        // Dispatch custom event when theme JS is ready
        document.dispatchEvent(new CustomEvent('infinityReady'));
    }

    // Initialize when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Make debounce available globally if needed
    window.infinityDebounce = debounce;

})();
