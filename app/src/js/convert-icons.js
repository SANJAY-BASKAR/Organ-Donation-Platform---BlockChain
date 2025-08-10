const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Path to organ icons
const iconsDir = path.join(__dirname, '../images/organ-icons');

// Function to convert SVG to PNG
async function convertSvgToPng(svgFile) {
  try {
    const svgPath = path.join(iconsDir, svgFile);
    const pngFileName = svgFile.replace('.svg', '.png');
    const pngPath = path.join(iconsDir, pngFileName);
    
    await sharp(svgPath)
      .resize(200, 200) // Set appropriate size
      .toFile(pngPath);
    
    console.log(`Converted ${svgFile} to ${pngFileName}`);
  } catch (error) {
    console.error(`Error converting ${svgFile}:`, error);
  }
}

// Get all SVG files
const files = fs.readdirSync(iconsDir);
const svgFiles = files.filter(file => file.endsWith('.svg'));

// Convert each SVG file
(async () => {
  for (const svgFile of svgFiles) {
    await convertSvgToPng(svgFile);
  }
  console.log('All conversions completed');
})(); 