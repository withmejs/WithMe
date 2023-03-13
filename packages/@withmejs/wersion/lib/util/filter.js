export function filter(srcArr, filterArr) {
    return srcArr.filter(iterm => {
        return !filterArr.includes(iterm)
    })
}