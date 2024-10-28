window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    const logo = document.getElementById("logo");
    const mainContent = document.querySelector(".main-content");

    // Lock scrolling
    document.body.style.overflow = "hidden";

    // Start the fade out after the logo animation
    setTimeout(() => {
        logo.classList.add("fade-out");
        mainContent.classList.remove("opacity-0"); // Show main content
        mainContent.classList.add("fade-in");
    }, 7000); // 6 seconds to match the logo animation duration

    // Remove the preloader and unlock scrolling after fade out
    setTimeout(() => {
        preloader.style.display = "none";
        document.body.style.overflow = ""; // Unlock scrolling
    }, 8000); // 1 second after the fade-out to ensure the preloader is hidden
});
