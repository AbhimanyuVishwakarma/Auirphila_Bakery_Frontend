// Slider/Carousel Functionality for AuIrphila Bakery

document.addEventListener('DOMContentLoaded', function() {
    // Get slider elements
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) return; // Exit if no slider on page
    
    const slides = sliderContainer.querySelectorAll('.slide');
    const prevBtn = sliderContainer.querySelector('.slider-arrow.prev');
    const nextBtn = sliderContainer.querySelector('.slider-arrow.next');
    const dots = sliderContainer.querySelectorAll('.dot');
    
    let currentSlide = 0;
    let slideInterval;
    const autoSlideDelay = 5000; // 5 seconds between slides
    
    // Initialize slider
    function initSlider() {
        // Set up initial state
        updateSlider();
        
        // Start auto-sliding
        startAutoSlide();
        
        // Add event listeners
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        // Add dot navigation
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                currentSlide = parseInt(this.getAttribute('data-index'));
                updateSlider();
                resetAutoSlide();
            });
        });
        
        // Pause auto-slide on hover
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
        
        // Swipe functionality for mobile
        setupSwipeDetection();
    }
    
    // Update slider display
    function updateSlider() {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show current slide
        slides[currentSlide].classList.add('active');
        
        // Update dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        dots[currentSlide].classList.add('active');
    }
    
    // Navigate to previous slide
    function prevSlide() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        updateSlider();
        resetAutoSlide();
    }
    
    // Navigate to next slide
    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        updateSlider();
        resetAutoSlide();
    }
    
    // Start auto-sliding
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, autoSlideDelay);
    }
    
    // Stop auto-sliding
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    
    // Reset auto-slide timer
    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
    
    // Setup swipe detection for mobile devices
    function setupSwipeDetection() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        sliderContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        sliderContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            const swipeThreshold = 50; // Minimum distance for swipe
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - go to next slide
                nextSlide();
            }
            
            if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - go to previous slide
                prevSlide();
            }
        }
    }
    
    // Initialize the slider
    initSlider();
});