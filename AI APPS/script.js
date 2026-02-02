document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lazy Loading Images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Provide a small fade-in effect when loaded
                    img.onload = () => {
                        img.style.opacity = 1;
                    };
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Scroll Animation (Fade up) using Intersection Observer
    const animateElements = document.querySelectorAll('.work-item, .process-card, .testimonial-card, .section-title');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => {
        el.classList.add('fade-up-init');
        scrollObserver.observe(el);
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Video Hover Interaction
    // 1. Select all videos with the specific class
    const videos = document.querySelectorAll('.work-video');

    // 2. Loop through each video and add the "listeners"
    videos.forEach(video => {

        // When mouse enters, play
        video.addEventListener('mouseenter', () => {
            video.play();
        });

        // When mouse leaves, pause
        video.addEventListener('mouseleave', () => {
            video.pause();
            // Optional: Reset video to start
            video.currentTime = 0;
            video.load(); // Keep this to ensure poster shows
        });

    });
});
