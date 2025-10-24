document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const menuButton = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const heroInner = document.querySelector('.hero-inner');
    const body = document.body;

    function closeMenu() {
        menuButton.classList.remove('active');
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        menuButton.setAttribute('aria-expanded', 'false');
        if (heroInner) heroInner.classList.remove('menu-open');
        body.style.overflowY = '';
    }

    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        const isExpanded = mobileMenu.classList.contains('active');
        menuButton.setAttribute('aria-expanded', isExpanded);
        if (isExpanded) {
            if (heroInner) heroInner.classList.add('menu-open');
            body.style.overflowY = 'hidden';
        } else {
            if (heroInner) heroInner.classList.remove('menu-open');
            body.style.overflowY = '';
        }
    });

    menuOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking on a link
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Scroll reveal animations
    const fadeElements = document.querySelectorAll('.about, .about-inner > *, .experience, .exp-head, .timeline-item, .work, .work-head, .projects-grid .project-card, .contact, .contact-left > *, .contact-right > *');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    // Resume dropdown functionality
    const resumeDropdowns = document.querySelectorAll('.resume-dropdown');
    
    resumeDropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.resume-toggle');
        const menu = dropdown.querySelector('.resume-menu');
        const menuItems = dropdown.querySelectorAll('.resume-menu-item');
        
        // Toggle dropdown
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            
            // Close all other dropdowns
            resumeDropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    const otherToggle = otherDropdown.querySelector('.resume-toggle');
                    const otherMenu = otherDropdown.querySelector('.resume-menu');
                    otherToggle.setAttribute('aria-expanded', 'false');
                    otherMenu.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            toggle.setAttribute('aria-expanded', !isExpanded);
            menu.classList.toggle('active');
            
            // Focus first menu item when opening
            if (!isExpanded) {
                setTimeout(() => menuItems[0]?.focus(), 100);
            }
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                toggle.setAttribute('aria-expanded', 'false');
                menu.classList.remove('active');
            }
        });
        
        // Keyboard navigation
        menuItems.forEach((item, index) => {
            item.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    menuItems[(index + 1) % menuItems.length]?.focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    menuItems[(index - 1 + menuItems.length) % menuItems.length]?.focus();
                } else if (e.key === 'Escape') {
                    toggle.setAttribute('aria-expanded', 'false');
                    menu.classList.remove('active');
                    toggle.focus();
                } else if (e.key === 'Tab' && !e.shiftKey && index === menuItems.length - 1) {
                    toggle.setAttribute('aria-expanded', 'false');
                    menu.classList.remove('active');
                }
            });
            
            // Don't prevent click on menu items - let the download happen
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                // Close dropdown after a small delay to allow download to start
                setTimeout(() => {
                    toggle.setAttribute('aria-expanded', 'false');
                    menu.classList.remove('active');
                }, 100);
            });
        });
    });
});