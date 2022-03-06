import sharp from 'sharp'

export async function resize(sourcePath, width, height) {
  sourcePath = sourcePath.replace('/static', 'static')
  const targetPath = sourcePath.replace('static/uploads/', 'static/images/')
  await sharp(sourcePath).resize(width, height).toFile(targetPath)
  return targetPath
}
