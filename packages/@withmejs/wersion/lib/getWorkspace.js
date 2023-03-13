import { getPackages, getPackagesSync } from "@manypkg/get-packages";
import { findRoot, findRootSync } from '@manypkg/find-root'

const dir = await findRoot(process.cwd())
const rootDir = dir.rootDir
const getInfo = await getPackages(rootDir)

const workspaces = getInfo.packages.map(pkg => {
  return {
    pkgName: pkg.packageJson.name,
    pkgDir: pkg.dir,
    pkgVersion: pkg.packageJson.version
  }
})

export {
    workspaces,
    rootDir
}
