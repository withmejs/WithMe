import shell from 'shelljs'
import fs from 'node:fs'
import path from 'node:path'
import { yellow, cyan } from 'kolorist'
import { rootDir } from '../getWorkspace.js'
export function init() {

    const wersionDir = path.resolve(rootDir, ".wersion")

    if (fs.existsSync(wersionDir)) {
        console.log(`⚠️  ${yellow("Warning")}: you already have initialized, please run ${cyan("wersion add")} to add some packages`)
    } else {
        shell.mkdir(wersionDir)
        shell.cd(wersionDir)
        shell.touch(".wersionrc.json")
    }
}