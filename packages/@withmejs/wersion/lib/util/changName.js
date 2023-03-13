export function changeName(oldName) {
  let newName = ['major', 'minor', 'patch', 'prerelease', 'id']
  let dict = [
    'pkgs_major',
    'pkgs_minor',
    'pkgs_patch',
    'pkgs_prerelease',
    'prerelease_id',
  ]
  return newName[dict.indexOf(oldName)]
}
