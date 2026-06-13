/**
 * Script d'optimisation des images
 * Redimensionne et compresse toutes les images du projet pour le web.
 * Usage : node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

// Configuration par type d'image
const configs = {
  // Bannières hero : 1920px de large, qualité 82
  hero: { width: 1920, quality: 82, suffix: '' },
  // Images catégorie : 800px, qualité 82
  category: { width: 800, quality: 82, suffix: '' },
  // Images produit : 800px, qualité 80
  product: { width: 800, quality: 80, suffix: '' },
  // Images recette : 800px, qualité 82
  recipe: { width: 800, quality: 82, suffix: '' },
  // About : 1920px, qualité 82
  about: { width: 1920, quality: 82, suffix: '' },
};

// Mapping des fichiers vers leur type
const fileTypes = {
  'epices-hero.jpg': 'hero',
  'parfums-hero.jpg': 'hero',
  'cosmetiques-hero.jpg': 'hero',
  'about-hero.jpg': 'about',
  'epices-cat.jpg': 'category',
  'parfums-cat.jpg': 'category',
  'huiles-cat.jpg': 'category',
  'cremes-cat.jpg': 'category',
  'market-crafts.jpg': 'category',
  'market-woman.jpg': 'category',
};

// Tout le reste est "product" ou "recipe"
function getType(filename) {
  if (fileTypes[filename]) return fileTypes[filename];
  if (filename.startsWith('recette-')) return 'recipe';
  return 'product';
}

async function optimizeImage(filename) {
  const inputPath = path.join(IMAGES_DIR, filename);
  const type = getType(filename);
  const config = configs[type];

  // Fichier temporaire
  const tmpPath = inputPath + '.tmp';

  try {
    const metadata = await sharp(inputPath).metadata();
    const originalSize = fs.statSync(inputPath).size;

    // Si l'image est déjà plus petite que la cible, on la saute
    if (metadata.width <= config.width && originalSize < 200 * 1024) {
      console.log(`  ✓ ${filename} : déjà optimisé (${(originalSize / 1024).toFixed(0)} KB, ${metadata.width}px)`);
      return { filename, originalSize, newSize: originalSize, skipped: true };
    }

    await sharp(inputPath)
      .resize({ width: config.width, withoutEnlargement: true })
      .jpeg({ quality: config.quality, mozjpeg: true })
      .toFile(tmpPath);

    const newSize = fs.statSync(tmpPath).size;
    const reduction = ((1 - newSize / originalSize) * 100).toFixed(0);

    // Remplacer l'original
    fs.unlinkSync(inputPath);
    fs.renameSync(tmpPath, inputPath);

    console.log(`  ✓ ${filename} : ${(originalSize / 1024).toFixed(0)} KB → ${(newSize / 1024).toFixed(0)} KB (-${reduction}%, ${config.width}px)`);
    return { filename, originalSize, newSize, skipped: false };
  } catch (err) {
    console.error(`  ✗ ${filename} : ${err.message}`);
    // Nettoyer le fichier temporaire si existant
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    return { filename, originalSize: 0, newSize: 0, skipped: false, error: true };
  }
}

async function main() {
  console.log('\n🖼️  Optimisation des images...\n');

  const files = fs.readdirSync(IMAGES_DIR)
    .filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));

  console.log(`${files.length} images trouvées\n`);

  let totalOriginal = 0;
  let totalNew = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of files) {
    const result = await optimizeImage(file);
    if (result.error) {
      errors++;
    } else if (result.skipped) {
      skipped++;
    } else {
      totalOriginal += result.originalSize;
      totalNew += result.newSize;
    }
  }

  const reduction = totalOriginal > 0 ? ((1 - totalNew / totalOriginal) * 100).toFixed(0) : 0;

  console.log('\n📊 Résumé :');
  console.log(`   ${files.length} images traitées`);
  console.log(`   ${skipped} déjà optimisées`);
  console.log(`   ${errors} erreurs`);
  console.log(`   Taille totale : ${(totalOriginal / 1024 / 1024).toFixed(1)} MB → ${(totalNew / 1024 / 1024).toFixed(1)} MB (-${reduction}%)`);
  console.log('');
}

main().catch(console.error);
