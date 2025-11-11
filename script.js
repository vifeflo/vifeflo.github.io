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
    document.querySelectorAll('.mobile-nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                closeMenu();
                
                // Wait for menu to close before scrolling
                setTimeout(() => {
                    const target = document.querySelector(href);
                    if (target) {
                        const targetPosition = target.offsetTop - 80; // Account for header
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 100);
            }
        });
    });

    // Scroll reveal animations
    const fadeElements = document.querySelectorAll('.about, .about-inner > *, .experience, .exp-head, .timeline-item, .work-head, .projects-grid .project-card, .contact, .contact-left > *, .contact-right > *, .hero-carousel');
    
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
                    otherMenu.classList.remove('align-right');
                }
            });
            
            // Toggle current dropdown
            toggle.setAttribute('aria-expanded', !isExpanded);
            menu.classList.toggle('active');
            
            // Dynamic alignment based on position
            if (!isExpanded) {
                // Check if dropdown would overflow to the right
                const dropdownRect = dropdown.getBoundingClientRect();
                const menuWidth = 200; // min-width from CSS
                const viewportWidth = window.innerWidth;
                const rightSpace = viewportWidth - dropdownRect.right;
                
                // If there's not enough space on the right, align to the right
                if (rightSpace < menuWidth) {
                    menu.classList.add('align-right');
                } else {
                    menu.classList.remove('align-right');
                }
                
                setTimeout(() => menuItems[0]?.focus(), 100);
            } else {
                menu.classList.remove('align-right');
            }
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                toggle.setAttribute('aria-expanded', 'false');
                menu.classList.remove('active');
                menu.classList.remove('align-right');
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
                    menu.classList.remove('align-right');
                    toggle.focus();
                } else if (e.key === 'Tab' && !e.shiftKey && index === menuItems.length - 1) {
                    toggle.setAttribute('aria-expanded', 'false');
                    menu.classList.remove('active');
                    menu.classList.remove('align-right');
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

    // Recalculate dropdown alignment on window resize
    window.addEventListener('resize', () => {
        resumeDropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.resume-toggle');
            const menu = dropdown.querySelector('.resume-menu');
            
            if (menu.classList.contains('active')) {
                const dropdownRect = dropdown.getBoundingClientRect();
                const menuWidth = 200; // min-width from CSS
                const viewportWidth = window.innerWidth;
                const rightSpace = viewportWidth - dropdownRect.right;
                
                if (rightSpace < menuWidth) {
                    menu.classList.add('align-right');
                } else {
                    menu.classList.remove('align-right');
                }
            }
        });
    });
});
    // Animated counters for achievements stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const suffix = entry.target.getAttribute('data-suffix') || '';
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.textContent = Math.floor(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target + suffix;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(number => {
        counterObserver.observe(number);
    });

    // Certification Accordion - Optimized
    const certCards = document.querySelectorAll('.certification-card');
    
    certCards.forEach(card => {
        const header = card.querySelector('.cert-header');
        
        header.addEventListener('click', () => {
            const isActive = card.classList.contains('active');
            
            // Simply toggle current card
            if (!isActive) {
                card.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
            } else {
                card.classList.remove('active');
                header.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Experience Timeline Accordion
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const yearElement = item.querySelector('.year');
        
        yearElement.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                yearElement.setAttribute('aria-expanded', 'true');
            } else {
                item.classList.remove('active');
                yearElement.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-left a[href^="#"], .contact-item[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            console.log('Clicked:', href); // Debug log
            
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                console.log('Target found:', target); // Debug log
                
                if (target) {
                    const targetPosition = target.offsetTop - 80; // Account for header
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

