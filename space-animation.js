// Select the div element
const container = document.getElementById("space-animation");

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);

// Starfield parameters
const starCount = 700;
const starField = {
    minZ: -200,
    maxZ: -1000,
    width: 1000,
    height: 1000,
    speed: 1.1
};

// Create stars
const starsGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(starCount * 3);
const opacities = new Float32Array(starCount); // Add opacity attribute for twinkling

// Function to generate a random position within our desired range
function generateStarPosition() {
    return {
        x: (Math.random() - 0.5) * starField.width,
        y: (Math.random() - 0.5) * starField.height,
        z: Math.random() * (starField.maxZ - starField.minZ) + starField.minZ
    };
}

// Initialize star positions and opacities
for (let i = 0; i < starCount; i++) {
    const pos = generateStarPosition();
    positions[i * 3] = pos.x;
    positions[i * 3 + 1] = pos.y;
    positions[i * 3 + 2] = pos.z;
    opacities[i] = Math.random(); // Random initial opacity
}

starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
starsGeometry.setAttribute("opacity", new THREE.BufferAttribute(opacities, 1));

// Create star material with custom shader for individual star opacity
const starsMaterial = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
        size: { value: 2.0 },
        color: { value: new THREE.Color(0xFFFFFF) },
    },
    vertexShader: `
        attribute float opacity;
        varying float vOpacity;
        void main() {
            vOpacity = opacity;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = 2.0 * (300.0 / -mvPosition.z);
        }
    `,
    fragmentShader: `
        varying float vOpacity;
        uniform vec3 color;
        void main() {
            float r = length(gl_PointCoord - vec2(0.5));
            if (r > 0.5) discard;
            gl_FragColor = vec4(color, vOpacity);
        }
    `
});

const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// Shooting star setup
class ShootingStar {
    constructor() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(2 * 3); // Two points for line
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const material = new THREE.LineBasicMaterial({
            color: 0xFFFFFF,
            transparent: true,
            opacity: 1
        });

        this.line = new THREE.Line(geometry, material);
        this.reset();
        scene.add(this.line);
    }

    reset() {
        const start = generateStarPosition();
        const angle = Math.random() * Math.PI * 2;
        const length = 50 + Math.random() * 100;
        
        const positions = this.line.geometry.attributes.position.array;
        positions[0] = start.x;
        positions[1] = start.y;
        positions[2] = start.z;
        positions[3] = start.x + Math.cos(angle) * length;
        positions[4] = start.y + Math.sin(angle) * length;
        positions[5] = start.z;
        
        this.line.geometry.attributes.position.needsUpdate = true;
        this.life = 1.0;
        this.speed = 0.02 + Math.random() * 0.03;
    }

    update() {
        this.life -= this.speed;
        this.line.material.opacity = this.life;
        
        if (this.life <= 0) {
            this.reset();
            return false;
        }
        return true;
    }
}

// Create shooting stars
const shootingStars = Array(3).fill(null).map(() => new ShootingStar());

// Set initial camera position
camera.position.z = 0;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update star positions and twinkle effect
    const positions = stars.geometry.attributes.position.array;
    const opacities = stars.geometry.attributes.opacity.array;
    
    for (let i = 0; i < starCount; i++) {
        // Update positions
        positions[i * 3 + 2] += starField.speed;

        // Reset stars that pass the camera
        if (positions[i * 3 + 2] > starField.minZ) {
            const pos = generateStarPosition();
            positions[i * 3] = pos.x;
            positions[i * 3 + 1] = pos.y;
            positions[i * 3 + 2] = starField.maxZ;
        }

        // Twinkle effect
        opacities[i] += (Math.random() - 0.5) * 0.1;
        opacities[i] = Math.max(0.2, Math.min(1, opacities[i]));
    }

    // Update shooting stars
    shootingStars.forEach(shootingStar => shootingStar.update());

    // Subtle camera movement
    camera.position.x += (Math.random() - 0.5) * 0.2;
    camera.position.y += (Math.random() - 0.5) * 0.2;

    // Update the geometry
    stars.geometry.attributes.position.needsUpdate = true;
    stars.geometry.attributes.opacity.needsUpdate = true;

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