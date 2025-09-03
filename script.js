document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference.
    // Default to dark mode if no theme is set or if theme is 'dark'.
    // Only stay in light mode if 'light' is explicitly saved.
    if (localStorage.getItem('theme') !== 'light') {
        body.classList.add('dark-mode');
    }

    themeToggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // Save the user's preference in localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // On-scroll animations
    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    // Observe all cards and section titles
    const targets = document.querySelectorAll('.service-card, .project-card, #about h2, #services h2, #projects h2, #contact h2');
    targets.forEach(target => observer.observe(target));
});
