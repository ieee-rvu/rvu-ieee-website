// Ensure the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {
    console.log('DOM loaded');

    // Wait for the entire window (including images, videos) to load
    window.onload = function() {
        console.log('Window loaded');
        
        // Add 'loaded' class to the body, which triggers the content appearance and removes preloader
        document.body.classList.add('loaded');

        // Start logo spin animation after page is fully loaded
        const logo = document.getElementById('logo');
        logo.style.animation = 'rotateLogo 5s infinite linear';
    };
});
