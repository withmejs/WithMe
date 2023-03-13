import { getPackages } from '@manypkg/get-packages'
import { findRoot } from '@manypkg/find-root'
import { cwd } from 'process'
const dir = await findRoot(cwd())
const rootDir = dir.rootDir
const getInfo = await getPackages(rootDir)

const workspaces = getInfo.packages.map((pkg) => {
  return {
    pkgName: pkg.packageJson.name,
    pkgDir: pkg.dir,
    pkgVersion: pkg.packageJson.version,
  }
})

export { workspaces, rootDir }
