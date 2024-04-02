const generateCopyPastableHTML_stacked = (listings, username) => {
    let pastableString = ""

    if (listings.length > 0) {
        for (let i = 0; i < listings.length; i++) {
            const petName = listings[i].petName
            const petDetail = listings[i].petDetail
            const petSettings = {
                isCustom: listings[i].isCustom,
                hasAgeTrophy: listings[i].hasAgeTrophy,
                canInit: listings[i].canInit,
            }

            if (petSettings.isCustom) {
                pastableString += `<img src="https://images.neopets.com/caption/caption_1180.gif" style="width: 300px; height: 300px;">\n`
            } else {
                pastableString += `<a href="/petlookup.phtml?pet=${petName}">\n<img src="//pets.neopets.com/cpn/${petName}/1/4.png">\n</a><br>${petName} `
                if (petDetail != "") {
                    pastableString += ` - ${petDetail}\n`
                } else {
                    pastableString += `\n`
                }
            }

            if (petSettings.hasAgeTrophy) {
                pastableString += `<img src="https://images.neopets.com/games/trophies/trophy_oldpet_1.gif" style="width: 25px; height: 25px;"></img>\n`
            }
            if (!petSettings.canInit) {
                pastableString += `<img src="https://images.neopets.com/halloween/spooky_suprise/dd_close_box.png" style="width: 25px; height: 25px;"></img>\n`
            }

            if (i != listings.length - 1) {
                pastableString += `<br>\n`
            }


        }
        pastableString += `<h2 style="border-bottom: 1px solid #818589; margin-bottom: 25px; padding-bottom:5px;">\n<a href="https://www.neopets.com/neomessages.phtml?type=send&recipient=${username}">\n@${username}\n</a>\n</h2>`
    }

    return pastableString
}

const generateCopyPastableHTML_SBS = (listings, username) => {
    let pastableString = ""

    if (listings.length > 0) {
        const listing1 = listings[0]
        const listing2 = listings[1]

        // LISTING LEFT
        pastableString += `<div style="width: 100%; overflow: hidden;">`

        pastableString += `\n<div style="width: 48%; float: left;">\n<div style="padding-left: 15%;">\n`

        if (listing1.isCustom) {
            pastableString += `<img src="https://images.neopets.com/caption/caption_1180.gif" style="width: 300px; height: 300px;">\n`
        } else {
            pastableString += `<a href="/petlookup.phtml?pet=${listing1.petName}">\n<img src="http://pets.neopets.com/cpn/${listing1.petName}/1/4.png">\n</a>`
        }

        pastableString += `<br>${listing1.petName}`

        if (listing1.petDetail != "") {
            pastableString += ` - ${listing1.petDetail}\n`
        } else {
            pastableString += `\n`
        }

        if (listing1.hasAgeTrophy) {
            pastableString += `<img src="https://images.neopets.com/games/trophies/trophy_oldpet_1.gif" style="width: 25px; height: 25px;"></img>\n`
        }
        if (!listing1.canInit) {
            pastableString += `<img src="https://images.neopets.com/halloween/spooky_suprise/dd_close_box.png" style="width: 25px; height: 25px;"></img>\n`
        }

        pastableString += `</div></div>`


        // LISTING RIGHT
        pastableString += `\n<div style="width: 48%; float: right;">\n<div style="padding-right: 15%;">\n`

        if (listing2.isCustom) {
            pastableString += `<img src="https://images.neopets.com/caption/caption_1180.gif" style="width: 300px; height: 300px;">\n`
        } else {
            pastableString += `<a href="/petlookup.phtml?pet=${listing2.petName}">\n<img src="http://pets.neopets.com/cpn/${listing2.petName}/1/4.png">\n</a>`
        }
        pastableString += `<br>${listing2.petName}`

        if (listing2.petDetail != "") {
            pastableString += ` - ${listing2.petDetail}\n`
        } else {
            pastableString += `\n`
        }

        if (listing2.hasAgeTrophy) {
            pastableString += `<img src="https://images.neopets.com/games/trophies/trophy_oldpet_1.gif" style="width: 25px; height: 25px;"></img>\n`
        }
        if (!listing2.canInit) {
            pastableString += `<img src="https://images.neopets.com/halloween/spooky_suprise/dd_close_box.png" style="width: 25px; height: 25px;"></img>\n`
        }

        pastableString += `</div></div></div>\n`

        pastableString += `<br>`

        pastableString += `<h2 style="border-bottom: 1px solid #818589; margin-bottom: 25px; padding-bottom: 5px;">\n<a href="http://www.neopets.com/neomessages.phtml?type=send&recipient=${username}">\n@${username}\n</a>\n</h2>`
    }

    return pastableString
}

export {generateCopyPastableHTML_stacked, generateCopyPastableHTML_SBS}