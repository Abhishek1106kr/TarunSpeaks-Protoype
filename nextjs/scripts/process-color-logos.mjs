import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const manifestPath = path.resolve(process.cwd(), '..', 'feedback', 'color-logos-manifest.json')
const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'))
const outputDir = path.resolve(process.cwd(), 'public/images/clients-color')

await fs.mkdir(outputDir, { recursive: true })

const processed = []

for (const logo of manifest.logos) {
  if (!logo.file) continue

  const sourcePath = path.join(manifest.sourceFolder, logo.file)
  const outputName = `${path.basename(logo.file, path.extname(logo.file))}.webp`
  const outputPath = path.join(outputDir, outputName)
  const isSvg = path.extname(logo.file).toLowerCase() === '.svg'

  const image = sharp(sourcePath, isSvg ? { density: 1200 } : undefined)
    .trim({
      background: { r: 255, g: 255, b: 255, alpha: 0 },
      threshold: 24,
    })
    .resize({ width: 380, height: 132, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 86 })

  await image.toFile(outputPath)
  const metadata = await sharp(outputPath).metadata()
  processed.push({ file: logo.file, output: `/images/clients-color/${outputName}`, width: metadata.width, height: metadata.height })
}

console.log(JSON.stringify(processed, null, 2))
