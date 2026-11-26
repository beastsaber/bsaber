import { writeFileSync } from 'node:fs'

const deployUrl = process.env.DEPLOY_PRIME_URL || 'https://bsaber.com'

writeFileSync(
  'src/lib/environmentVariables.ts',
  `export const DEPLOY_PRIME_URL = ${JSON.stringify(deployUrl)}\n`,
)

console.log(`Build URL: ${deployUrl}`)
