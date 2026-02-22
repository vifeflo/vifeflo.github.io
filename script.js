document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Make lenis globally accessible for anchor links
    window.lenis = lenis;

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
                
                // Wait for menu to close before scrolling with Lenis
                setTimeout(() => {
                    const target = document.querySelector(href);
                    if (target && window.lenis) {
                        window.lenis.scrollTo(target, { offset: -80 });
                    }
                }, 100);
            }
        });
    });

    // Handle all anchor links with Lenis
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && !this.closest('.mobile-nav')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target && window.lenis) {
                    window.lenis.scrollTo(target, { offset: -80 });
                }
            }
        });
    });

    // Scroll reveal animations
    const fadeElements = document.querySelectorAll('.about, .about-inner > *, .experience, .exp-head, .timeline-item, .work-head, .projects-grid .project-card, .contact, .contact-left > *, .contact-right > *, .hero-carousel, .studyin-hero-container, .studyin-hero-top, .studyin-hero-bottom > *, .studyin-problem, .studyin-interviews, .studyin-persona, .studyin-development > .studyin-section-title, .studyin-development > .studyin-card, .key-feature, .uikit-hero-container, .uikit-hero-top, .uikit-hero-bottom > *, .uikit-section, .uikit-card, .brand-card, .token-card, .category-card, .states-group, .flow-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -120px 0px'
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


    // Image zoom functionality
    const zoomableImages = document.querySelectorAll('.studyin-showcase-image, .studyin-hero-image:not(.no-zoom), .key-feature-image, .key-feature-showcase-image, .uikit-hero-image, .brand-image, .tokens-image, .tokens-feature-image, .accessibility-image, .responsive-image, .category-image, .states-image, .flow-image, .flow-feature-image, .component-showcase-image');
    const allZoomableImages = Array.from(zoomableImages);
    
    // Image captions mapping
    const imageCaptions = {
        'StudyIn showcase light.png': "StudyIn's showcase (light mode)",
        'StudyIn%20showcase%20light.png': "StudyIn's showcase (light mode)",
        'StudyIn showcase dark.png': "StudyIn's showcase (dark mode)",
        'StudyIn%20showcase%20dark.png': "StudyIn's showcase (dark mode)",
        'studyin-hero.png': "StudyIn",
        'Studyin thumbnail.png': "StudyIn",
        'Studyin%20thumbnail.png': "StudyIn",
        'Flexible onboarding.png': "Flexible onboarding",
        'Flexible%20onboarding.png': "Flexible onboarding",
        'Home screen.png': "Home screen",
        'Home%20screen.png': "Home screen",
        'Grades.png': "Grades",
        'Schedule.png': "Schedule",
        'News.png': "News",
        'Profile.png': "Profile",
        'Real-time notifications.png': "Real-time notifications",
        'Real-time%20notifications.png': "Real-time notifications",
        // Basic UI Kit captions
        'basic-thumbnail.png': "Basic UI Kit",
        'Indigo.png': "Indigo",
        'Magenta.png': "Magenta",
        'Moss.png': "Moss",
        'Orange.png': "Orange",
        'Colors.png': "Colors",
        'Colors light.png': "Colors (Light Mode)",
        'Colors%20light.png': "Colors (Light Mode)",
        'Colors dark.png': "Colors (Dark Mode)",
        'Colors%20dark.png': "Colors (Dark Mode)",
        'Light.png': "Light Mode",
        'Dark.png': "Dark Mode",
        'Desktop.png': "Desktop",
        'Tablet.png': "Tablet",
        'Mobile.png': "Mobile",
        'Components and variations.png': "Components and variations",
        'Components%20and%20variations.png': "Components and variations",
        'Products.png': "Products",
        'New product.png': "New product",
        'New%20product.png': "New product",
        'Product added.png': "Product added",
        'Product%20added.png': "Product added",
        'Product info.png': "Product info",
        'Product%20info.png': "Product info"
    };
    
    const getImageCaption = (src) => {
        const filename = decodeURIComponent(src.split('/').pop());
        // Remove .png extension from caption if not in mapping
        const captionFromMap = imageCaptions[filename] || imageCaptions[src.split('/').pop()];
        if (captionFromMap) return captionFromMap;
        // Fallback: remove extension and format filename
        return filename.replace(/\.(png|jpg|jpeg|gif|webp)$/i, '').replace(/%20/g, ' ');
    };
    
    zoomableImages.forEach((img, index) => {
        img.style.cursor = 'zoom-in';
        
        img.addEventListener('click', () => {
            let currentIndex = index;
            let isFullSize = false;
            let isDragging = false;
            let hasDragged = false;
            let startX, startY, scrollLeft, scrollTop;
            
            // Create overlay
            const overlay = document.createElement('div');
            overlay.classList.add('image-zoom-overlay');
            
            // Create image container for scrolling
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-zoom-container');
            
            // Create zoomed image
            const zoomedImg = document.createElement('img');
            zoomedImg.src = img.src;
            zoomedImg.alt = img.alt;
            zoomedImg.classList.add('image-zoom-content');
            
            // Create close button
            const closeBtn = document.createElement('button');
            closeBtn.classList.add('image-zoom-close');
            closeBtn.innerHTML = '&times;';
            closeBtn.setAttribute('aria-label', 'Close zoom');
            
            // Create navigation buttons
            const prevBtn = document.createElement('button');
            prevBtn.classList.add('image-zoom-nav', 'image-zoom-prev');
            prevBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            prevBtn.setAttribute('aria-label', 'Previous image');
            
            const nextBtn = document.createElement('button');
            nextBtn.classList.add('image-zoom-nav', 'image-zoom-next');
            nextBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            nextBtn.setAttribute('aria-label', 'Next image');
            
            // Create zoom hint
            const zoomHint = document.createElement('div');
            zoomHint.classList.add('image-zoom-hint');
            zoomHint.textContent = 'Scroll to zoom • Click image to view full size';
            
            // Create image caption
            const imageCaption = document.createElement('div');
            imageCaption.classList.add('image-zoom-caption');
            imageCaption.textContent = getImageCaption(img.src);
            
            imageContainer.appendChild(zoomedImg);
            overlay.appendChild(imageContainer);
            overlay.appendChild(closeBtn);
            overlay.appendChild(zoomHint);
            overlay.appendChild(imageCaption);
            
            // Only show nav buttons if there are multiple images
            if (allZoomableImages.length > 1) {
                overlay.appendChild(prevBtn);
                overlay.appendChild(nextBtn);
            }
            
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';
            
            // Update navigation visibility and caption
            const updateNavVisibility = () => {
                if (allZoomableImages.length > 1) {
                    prevBtn.style.display = currentIndex > 0 ? 'flex' : 'none';
                    nextBtn.style.display = currentIndex < allZoomableImages.length - 1 ? 'flex' : 'none';
                }
            };
            updateNavVisibility();
            
            // Store original image dimensions and zoom state
            let originalWidth = 0;
            let originalHeight = 0;
            let zoomLevel = 0; // 0 = fit mode, then 0.25 to 4 for actual zoom levels
            const minZoom = 0.25;
            const maxZoom = 4;
            const zoomStep = 0.15;
            
            zoomedImg.onload = () => {
                originalWidth = zoomedImg.naturalWidth;
                originalHeight = zoomedImg.naturalHeight;
            };
            
            // Apply zoom using width/height
            const applyZoom = (level, centerScroll = false) => {
                zoomLevel = level;
                
                if (level === 0) {
                    // Reset to fit mode
                    zoomedImg.style.width = '';
                    zoomedImg.style.height = '';
                    overlay.classList.remove('full-size');
                    isFullSize = false;
                    imageContainer.scrollTop = 0;
                    imageContainer.scrollLeft = 0;
                    zoomHint.textContent = 'Scroll to zoom • Click image to view full size';
                } else {
                    // Apply zoom as actual dimensions
                    const newWidth = originalWidth * level;
                    const newHeight = originalHeight * level;
                    zoomedImg.style.width = newWidth + 'px';
                    zoomedImg.style.height = newHeight + 'px';
                    overlay.classList.add('full-size');
                    isFullSize = true;
                    
                    if (level >= 1) {
                        zoomHint.textContent = `Zoom: ${Math.round(level * 100)}% • Scroll to zoom • Drag to pan`;
                    } else {
                        zoomHint.textContent = `Zoom: ${Math.round(level * 100)}% • Scroll to zoom`;
                    }
                    
                    // Center the scroll position on first zoom
                    if (centerScroll) {
                        setTimeout(() => {
                            const scrollX = (imageContainer.scrollWidth - imageContainer.clientWidth) / 2;
                            const scrollY = (imageContainer.scrollHeight - imageContainer.clientHeight) / 2;
                            imageContainer.scrollLeft = Math.max(0, scrollX);
                            imageContainer.scrollTop = Math.max(0, scrollY);
                        }, 10);
                    }
                }
            };
            
            // Navigate to image
            const navigateToImage = (newIndex) => {
                if (newIndex >= 0 && newIndex < allZoomableImages.length) {
                    currentIndex = newIndex;
                    zoomedImg.src = allZoomableImages[currentIndex].src;
                    zoomedImg.alt = allZoomableImages[currentIndex].alt;
                    imageCaption.textContent = getImageCaption(allZoomableImages[currentIndex].src);
                    updateNavVisibility();
                    
                    // Reset zoom state when navigating
                    applyZoom(0);
                }
            };
            
            // Drag to pan functionality
            let dragStartTime = 0;
            
            const handleMouseDown = (e) => {
                if (!isFullSize) return;
                e.preventDefault();
                isDragging = true;
                hasDragged = false;
                dragStartTime = Date.now();
                imageContainer.classList.add('dragging');
                startX = e.pageX;
                startY = e.pageY;
                scrollLeft = imageContainer.scrollLeft;
                scrollTop = imageContainer.scrollTop;
            };
            
            const handleMouseUp = () => {
                if (isDragging) {
                    isDragging = false;
                    imageContainer.classList.remove('dragging');
                }
            };
            
            const handleMouseMove = (e) => {
                if (!isDragging) return;
                e.preventDefault();
                const dx = e.pageX - startX;
                const dy = e.pageY - startY;
                
                // Only count as drag if moved more than 5px
                if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                    hasDragged = true;
                }
                
                imageContainer.scrollLeft = scrollLeft - dx;
                imageContainer.scrollTop = scrollTop - dy;
            };
            
            imageContainer.addEventListener('mousedown', handleMouseDown);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mousemove', handleMouseMove);
            
            // Touch drag support
            const handleTouchStart = (e) => {
                if (!isFullSize) return;
                isDragging = true;
                hasDragged = false;
                dragStartTime = Date.now();
                startX = e.touches[0].pageX;
                startY = e.touches[0].pageY;
                scrollLeft = imageContainer.scrollLeft;
                scrollTop = imageContainer.scrollTop;
            };
            
            const handleTouchEnd = () => {
                isDragging = false;
            };
            
            const handleTouchMove = (e) => {
                if (!isDragging) return;
                const dx = e.touches[0].pageX - startX;
                const dy = e.touches[0].pageY - startY;
                
                if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                    hasDragged = true;
                }
                
                imageContainer.scrollLeft = scrollLeft - dx;
                imageContainer.scrollTop = scrollTop - dy;
            };
            
            imageContainer.addEventListener('touchstart', handleTouchStart);
            imageContainer.addEventListener('touchend', handleTouchEnd);
            imageContainer.addEventListener('touchmove', handleTouchMove);
            
            // Zoom with mouse wheel
            const handleWheel = (e) => {
                e.preventDefault();
                
                // Wait for image to load before zooming
                if (originalWidth === 0) {
                    originalWidth = zoomedImg.naturalWidth || zoomedImg.width;
                    originalHeight = zoomedImg.naturalHeight || zoomedImg.height;
                }
                
                // Store current scroll ratios to maintain position
                const scrollRatioX = imageContainer.scrollWidth > imageContainer.clientWidth 
                    ? imageContainer.scrollLeft / (imageContainer.scrollWidth - imageContainer.clientWidth) 
                    : 0.5;
                const scrollRatioY = imageContainer.scrollHeight > imageContainer.clientHeight 
                    ? imageContainer.scrollTop / (imageContainer.scrollHeight - imageContainer.clientHeight) 
                    : 0.5;
                
                let newZoom;
                const isZoomingIn = e.deltaY < 0;
                
                if (zoomLevel === 0) {
                    // From fit mode, go to 50% first
                    newZoom = minZoom;
                } else {
                    // Calculate new zoom
                    const delta = isZoomingIn ? zoomStep : -zoomStep;
                    newZoom = Math.max(minZoom, Math.min(maxZoom, zoomLevel + delta));
                    
                    // If zooming out below minZoom, go back to fit mode
                    if (!isZoomingIn && zoomLevel <= minZoom) {
                        newZoom = 0;
                    }
                }
                
                if (newZoom !== zoomLevel) {
                    const isFirstZoom = zoomLevel === 0;
                    applyZoom(newZoom, isFirstZoom);
                    
                    // Restore scroll position after zoom (if not first zoom and not fit mode)
                    if (!isFirstZoom && newZoom > 0) {
                        setTimeout(() => {
                            const newScrollX = scrollRatioX * (imageContainer.scrollWidth - imageContainer.clientWidth);
                            const newScrollY = scrollRatioY * (imageContainer.scrollHeight - imageContainer.clientHeight);
                            imageContainer.scrollLeft = Math.max(0, newScrollX);
                            imageContainer.scrollTop = Math.max(0, newScrollY);
                        }, 10);
                    }
                }
            };
            
            overlay.addEventListener('wheel', handleWheel, { passive: false });
            
            // Toggle full size on image click
            zoomedImg.addEventListener('click', (e) => {
                e.stopPropagation();
                // Don't toggle if we just finished dragging
                if (hasDragged) {
                    hasDragged = false;
                    return;
                }
                
                // Ensure we have dimensions
                if (originalWidth === 0) {
                    originalWidth = zoomedImg.naturalWidth || zoomedImg.width;
                    originalHeight = zoomedImg.naturalHeight || zoomedImg.height;
                }
                
                if (zoomLevel !== 0) {
                    // Reset to fit mode
                    applyZoom(0);
                } else {
                    // Zoom to 100% (real size)
                    applyZoom(1, true);
                }
            });
            
            // Navigation button events
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                navigateToImage(currentIndex - 1);
            });
            
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                navigateToImage(currentIndex + 1);
            });
            
            // Trigger animation
            requestAnimationFrame(() => {
                overlay.classList.add('active');
            });
            
            // Close function
            const closeOverlay = () => {
                overlay.classList.remove('active');
                // Clean up event listeners
                document.removeEventListener('mouseup', handleMouseUp);
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('keydown', handleKeydown);
                setTimeout(() => {
                    overlay.remove();
                    document.body.style.overflow = '';
                }, 300);
            };
            
            // Close on overlay click (not on image or buttons)
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay || e.target === closeBtn) {
                    closeOverlay();
                }
            });
            
            // Close on container click (clicking outside the image)
            imageContainer.addEventListener('click', (e) => {
                if (e.target === imageContainer) {
                    closeOverlay();
                }
            });
            
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeOverlay();
            });
            
            // Keyboard navigation
            const handleKeydown = (e) => {
                if (e.key === 'Escape') {
                    closeOverlay();
                    document.removeEventListener('keydown', handleKeydown);
                } else if (e.key === 'ArrowLeft') {
                    navigateToImage(currentIndex - 1);
                } else if (e.key === 'ArrowRight') {
                    navigateToImage(currentIndex + 1);
                }
            };
            document.addEventListener('keydown', handleKeydown);
        });
    });




