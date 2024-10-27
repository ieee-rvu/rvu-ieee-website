// Select the div element
const container = document.getElementById("space-animation");

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);

// Starfield parameters
const starCount = 700; // Increased star count for better density
const starField = {
    minZ: -200,  // Closest stars to camera
    maxZ: -1000, // Farthest stars from camera
    width: 1000,  // Width of star field
    height: 1000, // Height of star field
    speed: 1.1     // Speed of movement
};

// Create stars
const starsGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(starCount * 3);

// Function to generate a random position within our desired range
function generateStarPosition() {
    return {
        x: (Math.random() - 0.5) * starField.width,
        y: (Math.random() - 0.5) * starField.height,
        z: Math.random() * (starField.maxZ - starField.minZ) + starField.minZ
    };
}

// Initialize star positions
for (let i = 0; i < starCount * 3; i += 3) {
    const pos = generateStarPosition();
    positions[i] = pos.x;
    positions[i + 1] = pos.y;
    positions[i + 2] = pos.z;
}

starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

// Create star material with improved visibility
const starsMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 2,
    sizeAttenuation: true, // Stars appear larger when closer
    transparent: true,
    opacity: 1
});

const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// Set initial camera position
camera.position.z = 0;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update star positions
    const positions = stars.geometry.attributes.position.array;
    
    for (let i = 0; i < positions.length; i += 3) {
        // Move stars toward camera
        positions[i + 2] += starField.speed;

        // If a star passes behind the camera or gets too close, reset it to the far end
        if (positions[i + 2] > starField.minZ) {
            const pos = generateStarPosition();
            positions[i] = pos.x;
            positions[i + 1] = pos.y;
            positions[i + 2] = starField.maxZ;
        }
    }

    // Add subtle camera movement for more dynamic effect
    camera.position.x += (Math.random() - 0.5) * 0.2;
    camera.position.y += (Math.random() - 0.5) * 0.2;

    // Update the geometry
    stars.geometry.attributes.position.needsUpdate = true;

    // Render the scene
    renderer.render(scene, camera);
}

// Start animation
animate();

// Handle window resizing
window.addEventListener("resize", () => {
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});