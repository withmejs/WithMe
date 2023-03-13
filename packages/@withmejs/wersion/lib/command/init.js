import shell from 'shelljs'
import fs from 'node:fs'
import path from 'node:path'
import { yellow, cyan } from 'kolorist'
import { rootDir } from '../getWorkspace.js'
export function init() {
  const wersionDir = path.resolve(rootDir, '.wersion')

  if (fs.existsSync(wersionDir)) {
    console.log(
      `⚠️ 👻 ${yellow(
        'Warning'
      )}: You already have initialized, please run ${cyan(
        'npx wersion add'
      )} to add some packages that need to be bumped`
    )
  } else {
    shell.mkdir(wersionDir)
    shell.cd(wersionDir)
    shell.touch('.wersionrc.json')
  }
}
