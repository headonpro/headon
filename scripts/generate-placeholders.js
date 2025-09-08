const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Function to create a placeholder image
function createPlaceholder(width, height, text, bgColor, outputPath) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);
  
  // Add text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 32px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);
  
  // Save to file
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Created: ${outputPath}`);
}

const projectsDir = path.join(__dirname, '..', 'public', 'images', 'projects');

// Create placeholder images
const images = [
  { name: 'football-before.jpg', width: 1920, height: 1080, text: 'Alte Website', bgColor: '#666666' },
  { name: 'football-after.jpg', width: 1920, height: 1080, text: 'Neue Website', bgColor: '#1034a6' },
  { name: 'app-screenshot.jpg', width: 750, height: 1624, text: 'FitTracker Pro', bgColor: '#ff8c00' },
];

images.forEach(img => {
  createPlaceholder(
    img.width,
    img.height,
    img.text,
    img.bgColor,
    path.join(projectsDir, img.name)
  );
});