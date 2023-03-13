import { workspaces, rootDir } from "../getWorkspace.js"
import shell from 'shelljs'
import fs from 'node:fs'
import path from 'node:path'

function version() {

    let wersionFile = path.resolve(rootDir, ".wersion", ".wersionrc.json")
    let json = fs.readFileSync(wersionFile ,"utf8")
    let bump = JSON.parse(json)
    console.log(bump)

    console.log(workspaces)

}

version()