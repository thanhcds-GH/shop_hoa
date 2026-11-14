import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = "D:/SHOP_HOA/fontend/public/images";
const outputDir = path.join(inputDir, "webp");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

function convertToWebp(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, path.basename(file, ext) + ".webp");

    sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath)
      .then(() => {
        console.log(`✅ Converted: ${file} -> ${outputPath}`);
      })
      .catch(err => {
        console.error(`❌ Error converting ${file}:`, err);
      });
  }
}

fs.readdirSync(inputDir).forEach(file => {
  convertToWebp(file);
});
