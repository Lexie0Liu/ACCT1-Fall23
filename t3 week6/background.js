// Get the canvas and set up context
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to fill the window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Variables for dynamic background color
let hue = 220; // Start around 220 for darker blue tones

// Array to hold the moving shapes
let shapes = [];

// Create random shapes (circles) with trails
class Shape {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 3 + 2;
        this.dx = (Math.random() - 0.5) * 2;
        this.dy = (Math.random() - 0.5) * 2;
        this.color = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},0.7)`;
    }

    // Method to update the shape's position
    update() {
        this.x += this.dx;
        this.y += this.dy;

        // Bounce off walls
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.draw();
    }

    // Method to draw the shape
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Initialize shapes
function init() {
    shapes = [];
    for (let i = 0; i < 100; i++) {
        shapes.push(new Shape());
    }
}

// Function to update the background color over time
function updateBackgroundColor() {
    // Adjust the hue for a dynamic effect in darker blue tones
    hue += 0.1; // Slowly increment the hue for smooth transitions
    if (hue > 240) hue = 200; // Cycle between 200 (light dark blue) to 240 (deep dark blue)

    // Set the background color with lower lightness for darker tones
    ctx.fillStyle = `hsl(${hue}, 50%, 20%)`; // Use lower lightness (20%) for darker blues
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update background color
    updateBackgroundColor();

    // Fill the canvas with the new background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw each shape
    shapes.forEach(shape => shape.update());
}

init();
animate();
