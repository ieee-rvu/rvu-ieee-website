/* Responsive Navbar code */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".navbar-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});
document.addEventListener("click", (event) => {
  if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
    navLinks.classList.remove("show");
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    navLinks.classList.remove("show");
  }
});

/* Image Carousel */
const carousel = document.querySelector(".carousel");
const nextButton = document.querySelector("#next-button");
const prevButton = document.querySelector("#prev-button");

const folderPath = "./Images/";
const imagePrefix = "i";
const imageExtension = ".webp";
const totalImages = 5;

let currentIndex = 0;
let autoSlideInterval;
const slideDuration = 4000;
const transitionTime = 500;

// Preload images for smoother transitions
function preloadImages() {
  for (let i = 1; i <= totalImages; i++) {
    const img = new Image();
    img.src = `${folderPath}${imagePrefix}${i}${imageExtension}`;
  }
}

function loadImages() {
  const fragment = document.createDocumentFragment();
  
  // Create the loop effect by appending first and last images
  const imageElements = [totalImages, ...Array.from({ length: totalImages }, (_, i) => i + 1), 1];

  imageElements.forEach(num => {
    const img = document.createElement("img");
    img.src = `${folderPath}${imagePrefix}${num}${imageExtension}`;
    img.alt = `Image ${num}`;
    img.style.width = "100%";
    img.style.objectFit = "cover";
    fragment.appendChild(img);
  });

  carousel.appendChild(fragment);
  carousel.style.transform = `translateX(-100%)`;
}

function updateCarousel(offset) {
  carousel.style.transition = `transform ${transitionTime}ms ease-in-out`;
  carousel.style.transform = `translateX(${offset}%)`;
}

function nextImage() {
  currentIndex++;
  updateCarousel(-100 * (currentIndex + 1));

  if (currentIndex >= totalImages) {
    setTimeout(() => {
      carousel.style.transition = "none";
      currentIndex = 0;
      carousel.style.transform = `translateX(-100%)`;
    }, transitionTime);
  }
  resetAutoSlide();
}

function prevImage() {
  currentIndex--;
  updateCarousel(-100 * (currentIndex + 1));

  if (currentIndex < 0) {
    setTimeout(() => {
      carousel.style.transition = "none";
      currentIndex = totalImages - 1;
      carousel.style.transform = `translateX(-${totalImages * 100}%)`;
    }, transitionTime);
  }
  resetAutoSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextImage, slideDuration);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Initialize the carousel
preloadImages();
loadImages();
startAutoSlide();

nextButton.addEventListener("click", nextImage);
prevButton.addEventListener("click", prevImage);

/* Counter clock code */
const conferenceDate = new Date('2026-01-01T00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = conferenceDate - now;
  
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = "Conference has started!";
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); 
