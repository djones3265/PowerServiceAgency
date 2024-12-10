document.addEventListener('DOMContentLoaded', () => {
    const lazySection = document.querySelector('.lazy-section');

    const loadContent = (section) => {
        const src = section.dataset.src;

        fetch(src)
            .then(response => response.text())
            .then(data => {
                section.innerHTML = data; // Inject the fetched content
                section.classList.add('loaded'); // Add loaded class for fade-in animation
            })
            .catch(() => {
                section.innerHTML = '<div class="placeholder">Failed to load content.</div>';
            });
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadContent(entry.target);
            } else {
                // Fade out and remove content when scrolling away
                entry.target.classList.remove('loaded');
                setTimeout(() => {
                    entry.target.innerHTML = '<div class="placeholder">Loading services...</div>';
                }, 500); // Match the fade-out duration in CSS
            }
        });
    });

    observer.observe(lazySection);
});
