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
// const carousel = document.querySelector(".carousel");
// const nextButton = document.querySelector("#next-button");
// const prevButton = document.querySelector("#prev-button");

// const folderPath = "./Images/";
// const imagePrefix = "i";
// const imageExtension = ".webp";
// const totalImages = 5;

// let currentIndex = 0;
// let autoSlideInterval;
// const slideDuration = 4000;
// const transitionTime = 500;

// // Preload images for smoother transitions
// function preloadImages() {
//   for (let i = 1; i <= totalImages; i++) {
//     const img = new Image();
//     img.src = `${folderPath}${imagePrefix}${i}${imageExtension}`;
//   }
// }

// function loadImages() {
//   const fragment = document.createDocumentFragment();

//   // Create the loop effect by appending first and last images
//   const imageElements = [
//     totalImages,
//     ...Array.from({ length: totalImages }, (_, i) => i + 1),
//     1,
//   ];

//   imageElements.forEach((num) => {
//     const img = document.createElement("img");
//     img.src = `${folderPath}${imagePrefix}${num}${imageExtension}`;
//     img.alt = `Image ${num}`;
//     img.style.width = "100%";
//     img.style.objectFit = "cover";
//     fragment.appendChild(img);
//   });

//   carousel.appendChild(fragment);
//   carousel.style.transform = `translateX(-100%)`;
// }

// function updateCarousel(offset) {
//   carousel.style.transition = `transform ${transitionTime}ms ease-in-out`;
//   carousel.style.transform = `translateX(${offset}%)`;
// }

// function nextImage() {
//   currentIndex++;
//   updateCarousel(-100 * (currentIndex + 1));

//   if (currentIndex >= totalImages) {
//     setTimeout(() => {
//       carousel.style.transition = "none";
//       currentIndex = 0;
//       carousel.style.transform = `translateX(-100%)`;
//     }, transitionTime);
//   }
//   resetAutoSlide();
// }

// function prevImage() {
//   currentIndex--;
//   updateCarousel(-100 * (currentIndex + 1));

//   if (currentIndex < 0) {
//     setTimeout(() => {
//       carousel.style.transition = "none";
//       currentIndex = totalImages - 1;
//       carousel.style.transform = `translateX(-${totalImages * 100}%)`;
//     }, transitionTime);
//   }
//   resetAutoSlide();
// }

// function startAutoSlide() {
//   autoSlideInterval = setInterval(nextImage, slideDuration);
// }

// function resetAutoSlide() {
//   clearInterval(autoSlideInterval);
//   startAutoSlide();
// }

// // Initialize the carousel
// preloadImages();
// loadImages();
// startAutoSlide();

// nextButton.addEventListener("click", nextImage);
// prevButton.addEventListener("click", prevImage);

/* Counter clock code */
// const conferenceDate = new Date("2026-01-01T00:00:00").getTime();

// function updateCountdown() {
//   const now = new Date().getTime();
//   const distance = conferenceDate - now;

//   const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   const hours = Math.floor(
//     (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//   );
//   const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//   document.getElementById("days").textContent = days
//     .toString()
//     .padStart(2, "0");
//   document.getElementById("hours").textContent = hours
//     .toString()
//     .padStart(2, "0");
//   document.getElementById("minutes").textContent = minutes
//     .toString()
//     .padStart(2, "0");
//   document.getElementById("seconds").textContent = seconds
//     .toString()
//     .padStart(2, "0");

//   if (distance < 0) {
//     clearInterval(countdownInterval);
//     document.getElementById("countdown").innerHTML = "Conference has started!";
//   }
// }

// const countdownInterval = setInterval(updateCountdown, 1000);
// updateCountdown();

// Committee page scripts

document.addEventListener("DOMContentLoaded", function () {
  fetchCommitteeData();
});

function fetchCommitteeData() {
  fetch("members.json")
    .then((response) => response.json())
    .then((data) => {
      displayCommittee(data);
    })
    .catch((error) => {
      console.error("Error loading committee data:", error);
    });
}

function displayCommittee(committeeData) {
  const container = document.querySelector(".new-committee-container");

  let currentlyOpenContent = null;

  committeeData.committee.forEach((group, index) => {
    const section = document.createElement("div");
    section.className = "committee-group";

    const title = document.createElement("h3");
    title.className = "committee-title";
    title.textContent = group.name;
    title.style.cursor = "pointer";

    const collapsibleContent = document.createElement("div");
    collapsibleContent.className = "collapsible-content";
    collapsibleContent.style.overflow = "hidden";
    collapsibleContent.style.transition = "max-height 0.6s ease";
    collapsibleContent.style.maxHeight = "0";

    if (group.members && group.members.length > 0) {
      const membersContainer = document.createElement("div");
      membersContainer.className = "committee-members";

      group.members.forEach((member) => {
        const memberCard = document.createElement("div");
        memberCard.className = "member-card";

        const image = document.createElement("img");
        image.className = "member-image";
        image.src = member.image;
        image.alt = member.name;
        memberCard.appendChild(image);

        const name = document.createElement("h3");
        name.className = "member-name";
        name.textContent = member.name;
        memberCard.appendChild(name);

        const email = document.createElement("p");
        email.className = "member-email";
        email.textContent = member.email;
        email.style.padding = "8px 12px";
        email.style.backgroundColor = "#f5f5f5";
        email.style.borderRadius = "4px";
        email.style.margin = "8px 0";
        email.style.fontStyle = "italic";
        email.style.color = "#00629b";
        memberCard.appendChild(email);

        const position = document.createElement("p");
        position.className = "member-position";
        position.textContent = member.position;
        memberCard.appendChild(position);

        membersContainer.appendChild(memberCard);
      });

      collapsibleContent.appendChild(membersContainer);
    }

    // 👉 Append roles section if exists
    if (group.roles && Array.isArray(group.roles) && group.roles.length > 0) {
      const rolesHeading = document.createElement("h3");
      rolesHeading.textContent = "";
      rolesHeading.style.textAlign = "center";
      rolesHeading.style.color = "#00629b";
      rolesHeading.style.marginTop = "1.5rem";

      const rolesList = document.createElement("ul");
      rolesList.style.listStyleType = "disc";
      rolesList.style.margin = "0 auto";
      rolesList.style.padding = "0 2rem";
      rolesList.style.maxWidth = "800px";

      group.roles.forEach((role) => {
        const roleItem = document.createElement("li");
        roleItem.textContent = role;
        roleItem.style.marginBottom = "0.5rem";
        rolesList.appendChild(roleItem);
      });

      collapsibleContent.appendChild(rolesHeading);
      collapsibleContent.appendChild(rolesList);
    }

    section.appendChild(title);
    section.appendChild(collapsibleContent);

    if (group.message) {
      const message = document.createElement("p");
      message.className = "committee-message";
      message.textContent = group.message;
      section.appendChild(message);
    }

    container.appendChild(section);

    if (index === 0) {
      collapsibleContent.style.maxHeight = `${collapsibleContent.scrollHeight}px`;
      currentlyOpenContent = collapsibleContent;
    }

    title.addEventListener("click", () => {
      if (collapsibleContent === currentlyOpenContent) return;

      if (currentlyOpenContent) {
        currentlyOpenContent.style.maxHeight = null;
      }

      collapsibleContent.style.maxHeight = `${collapsibleContent.scrollHeight}px`;
      currentlyOpenContent = collapsibleContent;
    });
  });
}
