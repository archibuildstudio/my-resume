// script.js extracted from index.html
// Modal functionality
const modal = document.getElementById('imageModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementsByClassName('close-modal')[0];

// Function to show modal
function showModal(element) {
  modal.style.display = 'block';
  modalContent.innerHTML = ''; // Clear existing content

  if (element.tagName.toLowerCase() === 'video') {
    // Create new video element for modal
    const videoElement = document.createElement('video');
    videoElement.src = element.querySelector('source').src;
    videoElement.controls = true;
    videoElement.autoplay = true;
    videoElement.style.maxWidth = '90%';
    videoElement.style.maxHeight = '90vh';
    modalContent.appendChild(videoElement);
  } else {
    // Create new image element for modal
    const imgElement = document.createElement('img');
    imgElement.src = element.src;
    imgElement.alt = 'Expanded view';
    imgElement.style.maxWidth = '90%';
    imgElement.style.maxHeight = '90vh';
    modalContent.appendChild(imgElement);
  }
}

// Add click handlers to all media items
document.addEventListener('DOMContentLoaded', function() {
  const mediaItems = document.querySelectorAll('.media-item img, .media-item video');
  mediaItems.forEach(item => {
    item.addEventListener('click', function() {
      showModal(this);
    });
  });
});

// Close modal when clicking X or outside
closeModal.onclick = function() {
  modal.style.display = 'none';
  modalContent.innerHTML = ''; // Clear content when closing
}

modal.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
    modalContent.innerHTML = ''; // Clear content when closing
  }
}

// Show/hide back to top button
window.onscroll = function() {
  const backToTop = document.querySelector('.back-to-top');
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
};

// Matrix background animation
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Characters to use (mix of letters, numbers, and symbols)
let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()';
let charSize = 14;
let columns = canvas.width / charSize;
let drops = [];

// Initialize drops
for (let i = 0; i < columns; i++) {
  drops[i] = Math.random() * -canvas.height;
}

// Drawing function
function draw() {
  // Semi-transparent black to create fade effect
  ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#2f81f7'; // GitHub theme blue color
  ctx.font = charSize + 'px monospace';

  // Loop over drops
  for (let i = 0; i < drops.length; i++) {
    // Random character
    const char = chars[Math.floor(Math.random() * chars.length)];
    // Draw character
    ctx.fillText(char, i * charSize, drops[i]);
    // Reset drop or move it down
    if (drops[i] > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    // Move drop down at random speed
    drops[i] += Math.random() * 2 + 1;
  }
}

// Animation loop
function animate() {
  draw();
  requestAnimationFrame(animate);
}

// Start animation
animate();

// Device detection
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Adjust video autoplay on mobile
if (isMobile) {
  document.querySelectorAll('video').forEach(video => {
    video.setAttribute('playsinline', '');
    video.setAttribute('preload', 'none');
  });
}

// Adjust matrix animation for mobile
if (isMobile) {
  canvas.style.opacity = '0.05';
  charSize = 10;
}
