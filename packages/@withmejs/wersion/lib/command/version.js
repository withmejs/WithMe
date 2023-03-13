import { workspaces, rootDir } from '../getWorkspace.js'
import shell from 'shelljs'
import fs from 'node:fs'
import path from 'node:path'
import { red, green, blue, yellow, cyan } from 'kolorist'

export function version() {
  const wersionDir = path.resolve(rootDir, '.wersion')

  if (!fs.existsSync(wersionDir)) {
    console.log(
      `${red('✖')} 👻 ${red(
        'Error: '
      )}There is no .wersion folder, please run ${cyan(
        'npx wersion init'
      )} to set up`
    )
    return
  }

  let wersionFile = path.resolve(rootDir, '.wersion', '.wersionrc.json')

  let json, bump
  try {
    json = fs.readFileSync(wersionFile, 'utf8')
    if (json === '{}') {
      throw new Error()
    }
    bump = JSON.parse(json)
  } catch (error) {
    console.log(
      `${red('✖')} 👻 ${red(
        'Error: '
      )}You haven't added any packages that need to be bumped`
    )
    console.log(
      `⚙️ 👻 Please run ${cyan(
        'npx wersion add'
      )} to add some packages that need to be bumped`
    )
    return
  }

  plainChange(bump.major, 'major')
  plainChange(bump.minor, 'minor')
  plainChange(bump.patch, 'patch')
  preChange(bump.prerelease, 'prerelease', bump.id)
}

function findPreid(pkg, id) {
  let preid = ''
  for (const key in id) {
    if (pkg === key) {
      preid = id[key]
    }
  }
  return preid
}

function findDir(pkg) {
  let dir = ''
  workspaces.forEach((workspace) => {
    if (workspace.pkgName === pkg) {
      dir = workspace.pkgDir
    }
  })
  return dir
}

function findVersion(pkg) {
  let version = ''
  workspaces.forEach((workspace) => {
    if (workspace.pkgName === pkg) {
      version = workspace.pkgVersion
    }
  })
  return version
}

function plainChange(pkgs, version) {
  let color = [red, green, blue]
  let bumpVersion = ['major', 'minor', 'patch']

  let render = color[bumpVersion.indexOf(version)]

  if (pkgs !== undefined) {
    pkgs.forEach((pkg) => {
      shell.cd(findDir(pkg))
      console.log(
        `📦 ${cyan(`${pkg}@${findVersion(pkg)}`)} have a ${render(
          `${version}`
        )} bump`
      )
      shell.exec(`npm version ${version}`)
    })
  }
}

function preChange(pkgs, version, idMap) {
  if (pkgs !== undefined) {
    pkgs.forEach((pkg) => {
      let preid = findPreid(pkg, idMap)
      shell.cd(findDir(pkg))

      console.log(
        `📦 ${cyan(`${pkg}@${findVersion(pkg)}`)} have a ${yellow(
          `${version}`
        )} bump`
      )
      shell.exec(`npm version ${version} --preid=${preid}`)
    })
  }
}
