import Enquirer from 'enquirer'
import fs from 'node:fs'
import path from 'node:path'
import shell from 'shelljs'
import { green, red, blue, yellow, cyan } from 'kolorist'
import { workspaces, rootDir } from '../getWorkspace.js'
import { choicesify } from '../util/choiceify.js'
import { filter } from '../util/filter.js'
import { changeName } from '../util/changName.js'

const enquirer = new Enquirer()
const pkgs = workspaces

export function add() {
    (async function () {

        let wersionDir = fs.existsSync(path.resolve(rootDir, ".wersion"))
        if (!wersionDir) {
            console.log(`${red('✖')} 👻 There is no .wersion folder, please run ${cyan("npx wersion init")} to set up`)
            return
        }

        const selectChoices = pkgs.map(iterm => {
            return {
                name: iterm.pkgName,
                value: iterm.pkgName
            }
        })

        console.log(selectChoices)

        await enquirer.prompt({
            type: "MultiSelect",
            name: "pkgs_selected",
            message: "👻 Please select some packages that will have a version bump",
            choices: selectChoices,
            limit: 10,
            validate: (e) => {
                if (e.length == 0) {
                    return "⚠️  Please select at least one package"
                }
                return true
            }
        })

        const majorChoices = choicesify(enquirer.answers.pkgs_selected)

        await enquirer.prompt({
            type: "MultiSelect",
            name: "pkgs_major",
            message: `👻 Please select some packages that will have a ${red("major")} bump`,
            choices: majorChoices
        })

        const minorChoices = choicesify(
            filter(enquirer.answers.pkgs_selected, enquirer.answers.pkgs_major)
        )

        await enquirer.prompt({
            type: () => {
                if (minorChoices.length === 0) {
                    return 0
                } else {
                    return "MultiSelect"
                }
            },
            name: "pkgs_minor",
            message: `👻 Please select some packages that will have a ${green("minor")} bump`,
            choices: minorChoices
        })

        const patchChoices = choicesify(
            filter(
                filter(enquirer.answers.pkgs_selected, enquirer.answers.pkgs_major),
                enquirer.answers.pkgs_minor
            )
        )

        await enquirer.prompt({
            type: () => {
                if (patchChoices.length === 0) {
                    return 0
                } else {
                    return "MultiSelect"
                }
            },
            name: "pkgs_patch",
            message: `👻 Please select some packages that will have a ${blue("patch")} bump`,
            choices: patchChoices
        })

        const prereleaseChoices = choicesify(
            filter(
                filter(
                    filter(enquirer.answers.pkgs_selected, enquirer.answers.pkgs_major),
                    enquirer.answers.pkgs_minor
                ), enquirer.answers.pkgs_patch
            )
        )

        await enquirer.prompt({
            type: () => {
                if (prereleaseChoices.length === 0) {
                    return 0
                } else {
                    return "MultiSelect"
                }
            },
            name: "pkgs_prerelease",
            message: `👻 Please select some packages that will have a ${yellow("prerelease")} bump`,
            choices: prereleaseChoices
        })


        await enquirer.prompt({
            type: () => {
                if (enquirer.answers.pkgs_prerelease !== undefined && enquirer.answers.pkgs_prerelease.length !== 0) {
                    return "form"
                } else {
                    return
                }
            },
            name: "prerelease_id",
            message: `👻 Please input a ${yellow("preid")} for following packages`,
            choices:
                () => {
                    if (enquirer.answers.pkgs_prerelease === undefined && enquirer.answers.pkgs_prerelease.length !== 0) {
                        return
                    } else {
                        return enquirer.answers.pkgs_prerelease.map(iterm => {
                            return {
                                name: iterm,
                                message: iterm,
                                initial: "alpha"
                            }
                        })
                    }
                }
        })

        let flag = false
        for (const key in enquirer.answers) {
            if (enquirer.answers[key].length !== 0 && (key !== "pkgs_selected")) {
                flag = true
            }
        }

        if (flag) {
            console.log(cyan("↘️ 👻 Following packages will have a version bump"))
            for (const key in enquirer.answers) {
                if (enquirer.answers[key].length !== 0 && (key !== "pkgs_selected") && (key !== "prerelease_id")) {
                    console.log(`📦 ${changeName(key)}: `, enquirer.answers[key])
                }
            }
            let json = JSON.stringify(enquirer.answers)
            shell.cd(`${rootDir}/.wersion`)
            shell.exec(`echo '${json}' > .wersionrc.json`)

        } else {
            console.log(red("⚠️ 👻 None of the packages will have a version bump"))
        }



    })()
}