import * as fs from 'fs'
import * as path from 'path'
import * as util from 'util'

const readDirAsync = util.promisify(fs.readdir)
const readFileAsync = util.promisify(fs.readFile)

const checkForMetaHeads = async (dir) => {
  const files = await readDirAsync(dir)

  for (const file of files) {
    if (file.endsWith('+page.svelte')) {
      const filePath = path.join(dir, file)
      const content = await readFileAsync(filePath, 'utf8')

      // PostPage component contains MetaHead for post pages
      if (!content.includes('<MetaHead') && !content.includes('<PostPage')) {
        console.error(`Error: File '${filePath}' does not contain <MetaHead`)
      }
    }
  }

  // Recursively continue checking for MetaHead in subdirectories
  const subDirs = files.filter((file) => fs.lstatSync(path.join(dir, file)).isDirectory())
  for (const subDir of subDirs) {
    await checkForMetaHeads(path.join(dir, subDir))
  }
}

checkForMetaHeads('./src/routes')
  .then(() => {
    process.exit(0)
  })
  .catch(() => {
    throw new Error('Error: No MetaHead missing!')
  })
