import sharp from 'sharp'
import fs from 'fs'

resize('./static/uploads/curators', 80, 80)

async function resize(directory, width, height) {
  let filenames = fs.readdirSync(directory)

  for (let filename of filenames) {
    let path = `${directory}/${filename}`
    let tempPath = `${directory}/temp-${filename}`
    await sharp(path).resize(width, height).toFile(tempPath)
    fs.renameSync(tempPath, path)
  }
}
