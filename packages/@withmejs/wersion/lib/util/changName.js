export function changeName(oldName){
    let newName = ["major", "minor", "patch", "prerelease"]
    let dict = ["pkgs_major", "pkgs_minor", "pkgs_patch","pkgs_prerelease"]
    return newName[dict.indexOf(oldName)]
}
