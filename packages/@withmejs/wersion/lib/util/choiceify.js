export function choicesify(array) {
    return array.map(iterm => {
        return {
            name: iterm,
            value: iterm
        }
    })
}

