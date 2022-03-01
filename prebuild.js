import { readFileSync, writeFileSync } from 'fs'

let config = readFileSync('./static/admin/config.yml', 'utf8')
config = config.replace('local_backend: true', 'local_backend: false')
writeFileSync('./static/admin/config.yml', config, 'utf8')
